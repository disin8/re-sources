'use client'

import { useState } from 'react'

const repoUrl = 'https://github.com/disin8/re-sources'

export function SubmitForm() {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [license, setLicense] = useState('')

  const buildIssueUrl = () => {
    const body = [
      '**Name:**',
      name,
      '',
      '**URL:**',
      url,
      '',
      '**What it does:**',
      description,
      '',
      '**License / pricing:**',
      license || '(unknown)',
      '',
      '_Submitted from the re • sources website._',
    ].join('\n')

    const params = new URLSearchParams({
      title: `Resource submission: ${name || 'new resource'}`,
      body,
    })

    return `${repoUrl}/issues/new?${params.toString()}`
  }

  const inputClass = 'w-full rounded-lg border border-gray-200 dark:border-neutral-800 bg-transparent px-3 py-2 text-sm outline-none focus:border-gray-400 dark:focus:border-neutral-600'

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault()
        window.open(buildIssueUrl(), '_blank', 'noopener,noreferrer')
      }}
    >
      <div>
        <label htmlFor="resource-name" className="block text-xs text-gray-500 dark:text-neutral-400 mb-1">Name</label>
        <input
          id="resource-name"
          required
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="e.g. Radix Colors"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="resource-url" className="block text-xs text-gray-500 dark:text-neutral-400 mb-1">URL</label>
        <input
          id="resource-url"
          required
          type="url"
          value={url}
          onChange={event => setUrl(event.target.value)}
          placeholder="https://"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="resource-description" className="block text-xs text-gray-500 dark:text-neutral-400 mb-1">What it does</label>
        <textarea
          id="resource-description"
          required
          rows={3}
          value={description}
          onChange={event => setDescription(event.target.value)}
          placeholder="One line on the job it does for a web project."
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="resource-license" className="block text-xs text-gray-500 dark:text-neutral-400 mb-1">License and pricing</label>
        <input
          id="resource-license"
          value={license}
          onChange={event => setLicense(event.target.value)}
          placeholder="e.g. MIT, free for commercial use"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-[var(--brand-solid)] px-4 py-2 text-sm text-white hover:opacity-90"
      >
        Open prefilled GitHub issue
      </button>
    </form>
  )
}
