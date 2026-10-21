import { absoluteUrl, siteConfig } from '@/config/site'
import { allResources } from '@/content'

export const dynamic = 'force-static'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const items = [...allResources]
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt) || b.reviewedAt.localeCompare(a.reviewedAt))
    .slice(0, 50)

  const buildDate = new Date().toUTCString()

  const entries = items
    .map(resource => `    <item>
      <title>${escapeXml(`${resource.name} — ${resource.description}`)}</title>
      <link>${absoluteUrl(`/resources/${resource.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/resources/${resource.slug}`)}</guid>
      <description>${escapeXml(resource.details)}</description>
      <category>${escapeXml(resource.type)}</category>
      <pubDate>${new Date(resource.addedAt).toUTCString()}</pubDate>
    </item>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${absoluteUrl('/')}</link>
    <atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(siteConfig.description)}</description>
    <language>${siteConfig.language}</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <managingEditor>${siteConfig.author.name}</managingEditor>
${entries}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
