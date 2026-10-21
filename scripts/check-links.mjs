#!/usr/bin/env node
/**
 * Catalog integrity + external link check.
 *
 * Two passes:
 *   1. Static integrity — duplicate slugs, missing required fields, missing
 *      local image/logo assets, broken collection references. Always runs and
 *      is fast enough for a pre-commit hook.
 *   2. External links — HEAD/GET every outbound URL. Slower, so it is
 *      opt-in via `--links` (used by CI) or by default when `--all` is passed.
 *
 * Usage:
 *   node scripts/check-links.mjs           # integrity only
 *   node scripts/check-links.mjs --links   # integrity + external links
 *
 * Exit code 1 on any failure so it can gate CI.
 */
import { existsSync } from 'node:fs'
import { readFile, readdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = join(root, 'content')

const argv = process.argv.slice(2)
const CHECK_LINKS = argv.includes('--links') || argv.includes('--all')
const CONCURRENCY = 10
const TIMEOUT_MS = 15000

const CONTENT_FILES = (await readdir(contentDir)).filter(
  file => file.endsWith('.ts') && !['index.ts', 'collections.ts', 'without-screenshots.ts'].includes(file),
)

const problems = []
const externalUrls = new Set()

const slugOwners = new Map()
const requiredFields = ['slug', 'name', 'description', 'details', 'url', 'type', 'price', 'license', 'licenseLabel', 'platforms', 'tags', 'addedAt', 'reviewedAt']
const validValues = {
  'type': ['font-library', 'generator', 'saas', 'open-source', 'plugin', 'collection', 'marketplace'],
  'price': ['free', 'freemium', 'paid', 'subscription'],
  'license': ['open-source', 'commercial', 'personal', 'proprietary', 'free'],
}

for (const file of CONTENT_FILES) {
  const source = await readFile(join(contentDir, file), 'utf8')

  const entries = source.split(/\n  \{\n/).slice(1)

  for (const entry of entries) {
    const slug = entry.match(/slug:\s*'([^']+)'/)?.[1]
    if (!slug) {
      problems.push(`${file}: an entry has no slug`)
      continue
    }

    if (slugOwners.has(slug)) {
      problems.push(`duplicate slug "${slug}" in ${file} and ${slugOwners.get(slug)}`)
    } else {
      slugOwners.set(slug, file)
    }

    for (const field of requiredFields) {
      if (!new RegExp(`\\b${field}:`).test(entry)) {
        problems.push(`${file}/${slug}: missing "${field}"`)
      }
    }

    for (const [field, allowed] of Object.entries(validValues)) {
      const value = entry.match(new RegExp(`\\b${field}:\\s*'([^']+)'`))?.[1]
      if (value && !allowed.includes(value)) {
        problems.push(`${file}/${slug}: invalid ${field} "${value}"`)
      }
    }

    const url = entry.match(/url:\s*'([^']+)'/)?.[1]
    if (url) {
      if (!url.startsWith('http')) {
        problems.push(`${file}/${slug}: url must be absolute, got "${url}"`)
      } else {
        externalUrls.add(url)
      }
    }

    const image = entry.match(/image:\s*'([^']+)'/)?.[1]
    if (!image) {
      problems.push(`${file}/${slug}: has no screenshot`)
    } else if (!image.startsWith('/')) {
      problems.push(`${file}/${slug}: asset path must be root-relative, got "${image}"`)
    } else if (!existsSync(join(root, 'public', image))) {
      problems.push(`${file}/${slug}: missing local asset ${image}`)
    }

    const addedAt = entry.match(/addedAt:\s*'([^']+)'/)?.[1]
    const reviewedAt = entry.match(/reviewedAt:\s*'([^']+)'/)?.[1]
    for (const [label, value] of [['addedAt', addedAt], ['reviewedAt', reviewedAt]]) {
      if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        problems.push(`${file}/${slug}: ${label} must be YYYY-MM-DD, got "${value}"`)
      }
    }
    if (addedAt && reviewedAt && reviewedAt < addedAt) {
      problems.push(`${file}/${slug}: reviewedAt (${reviewedAt}) is before addedAt (${addedAt})`)
    }

    const description = entry.match(/description:\s*\n?\s*'([^']*)'/)?.[1]
    if (description && description.length > 140) {
      problems.push(`${file}/${slug}: description is ${description.length} chars (max 140)`)
    }
  }
}

const collectionsSource = await readFile(join(contentDir, 'collections.ts'), 'utf8')
for (const match of collectionsSource.matchAll(/resources:\s*\[([\s\S]*?)\]/g)) {
  for (const ref of match[1].matchAll(/'([^']+)'/g)) {
    if (!slugOwners.has(ref[1])) {
      problems.push(`collection references unknown resource "${ref[1]}"`)
    }
  }
}

if (problems.length) {
  console.log(`\nIntegrity problems (${problems.length}):`)
  for (const problem of problems) console.log(`  ${problem}`)
  process.exitCode = 1
} else {
  console.log(`Integrity check passed — ${slugOwners.size} resources, no problems.`)
}


if (!CHECK_LINKS) {
  console.log('\nSkipping external link check (pass --links to enable).')
  process.exit(process.exitCode ?? 0)
}

async function check(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    let response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml',
      },
    })
    if (response.status === 405) {
      response = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'user-agent': 'Mozilla/5.0 (compatible; re-sources-link-check/1.0)' },
      })
    }
    return { url, status: response.status, ok: response.status < 400, finalUrl: response.url }
  } catch (error) {
    const message = error?.name === 'AbortError' ? `timeout after ${TIMEOUT_MS}ms` : error?.message || String(error)
    const isDnsFailure = /ENOTFOUND|EAI_AGAIN|getaddrinfo/i.test(message)
    return { url, status: 0, ok: !isDnsFailure, blocked: !isDnsFailure, error: message }
  } finally {
    clearTimeout(timer)
  }
}

async function pool(items, worker) {
  const results = []
  let index = 0
  const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (index < items.length) {
      const current = index++
      results[current] = await worker(items[current])
      process.stdout.write(`\rChecked ${results.filter(Boolean).length}/${items.length}`)
    }
  })
  await Promise.all(runners)
  process.stdout.write('\n')
  return results
}

const urls = [...externalUrls]
console.log(`\nChecking ${urls.length} external URLs with concurrency ${CONCURRENCY}...\n`)

const results = await pool(urls, check)
const blocked = results.filter(result => result.blocked || [401, 403, 429].includes(result.status))
const failures = results.filter(
  result => !result.ok && !result.blocked && ![401, 403, 429].includes(result.status),
)
const redirects = results.filter(
  result => result.ok && result.finalUrl && result.finalUrl.replace(/\/$/, '') !== result.url.replace(/\/$/, ''),
)

if (redirects.length) {
  console.log(`\nRedirects (${redirects.length}) — update the canonical URL:`)
  for (const redirect of redirects) console.log(`  ${redirect.status}  ${redirect.url}\n        -> ${redirect.finalUrl}`)
}

if (blocked.length) {
  console.log(`\nBlocked by the site (${blocked.length}) — verify manually, not treated as failures:`)
  for (const item of blocked) {
    console.log(`  ${item.status || 'ERR'}  ${item.url}${item.error ? ` — ${item.error}` : ''}`)
  }
}

if (failures.length) {
  console.log(`\nFailures (${failures.length}):`)
  for (const failure of failures) {
    console.log(`  ${failure.status || 'ERR'}  ${failure.url}${failure.error ? ` — ${failure.error}` : ''}`)
  }
  process.exitCode = 1
} else {
  console.log('\nAll external links are reachable.')
}

process.exit(process.exitCode ?? 0)
