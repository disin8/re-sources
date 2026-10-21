import type { Metadata } from 'next'
import Link from 'next/link'
import { categories } from '@/config/categories'
import { absoluteUrl, siteConfig } from '@/config/site'
import { allResources } from '@/content'

export const metadata: Metadata = {
  title: 'About — how we curate and verify design resources',
  description:
    'How re • sources picks design tools for developers: the criteria, the weekly review cadence, license checks and who maintains the catalog.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About re • sources',
    description: 'How the catalog is curated, verified and updated every week.',
    url: absoluteUrl('/about'),
    type: 'article',
  },
}

const criteria = [
  {
    title: 'It solves one concrete job',
    body: 'A tool has to remove a specific step from a web project — shipping a font, checking contrast, generating a device frame. “Everything for everyone” is not a category here.',
  },
  {
    title: 'The license is stated and stable',
    body: 'We record the license of every resource, and we only claim a specific license when the vendor publishes it. Free-for-personal-use tools are labelled as such instead of being presented as free.',
  },
  {
    title: 'The free tier is honest',
    body: 'A free plan that times out after three exports is not a free plan. The pricing column separates free, freemium, paid and subscription products.',
  },
  {
    title: 'It works in a browser',
    body: 'Everything in the catalog is reachable from a browser, and most of it works without an account, unless it is an API or a hosted product.',
  },
  {
    title: 'The link keeps working',
    body: 'Every URL is checked on a weekly cadence. Dead or redirected links are updated or removed before they reach the catalog.',
  },
]

export default function AboutPage() {
  const freeCount = allResources.filter(resource => resource.price === 'free' || resource.price === 'freemium').length

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How are the resources selected?',
        'answer': 'Each tool has to solve one concrete job in a web project, state its license, keep a usable free tier or a clear price, and stay reachable in a browser.',
      },
      {
        '@type': 'Question',
        'name': 'How often is the catalog updated?',
        'answer': 'Links, pricing and license terms are re-checked every week. Each resource page shows the date of the last manual review.',
      },
      {
        '@type': 'Question',
        'name': 'Can I submit a resource?',
        'answer': 'Yes. Open a pull request or an issue on the GitHub repository with the tool name, URL, license and a one-line description of what it does.',
      },
    ],
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': siteConfig.name,
    'url': absoluteUrl('/'),
    'logo': absoluteUrl('/favicon.ico'),
    'founder': {
      '@type': 'Person',
      'name': siteConfig.author.name,
      'url': siteConfig.author.url,
    },
  }

  return (
    <section className="h-full w-full p-6 max-w-[820px]">
      <h1 className="font-semibold text-2xl md:text-3xl leading-9 px-3">About re • sources</h1>

      <div className="px-3 pt-4 space-y-3 text-sm text-gray-600 dark:text-neutral-300 leading-7">
        <p>
          re • sources is a hand-checked directory of design tools and resources for building modern web products — fonts, color
          palettes, icons, AI tools, mockups, animation libraries, localization and testing tools.
        </p>
        <p>
          The catalog currently holds
          {' '}
          {allResources.length}
          {' '}
          resources across
          {' '}
          {categories.length}
          {' '}
          categories;
          {' '}
          {freeCount}
          {' '}
          of them are free or have a free tier. Every entry lists its license, pricing model, platforms and the date it was last
          reviewed, so you can pick a tool without a second round of legal research.
        </p>
      </div>

      <h2 className="font-semibold text-lg px-3 pt-8">How we choose</h2>
      <div className="px-3 pt-2 space-y-4">
        {criteria.map(criterion => (
          <div key={criterion.title}>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{criterion.title}</p>
            <p className="text-sm text-gray-500 dark:text-neutral-400 leading-6 mt-1">{criterion.body}</p>
          </div>
        ))}
      </div>

      <h2 className="font-semibold text-lg px-3 pt-8">Update cadence</h2>
      <p className="px-3 pt-2 text-sm text-gray-500 dark:text-neutral-400 leading-7">
        The catalog is reviewed weekly: dead links are replaced, pricing changes are recorded, and resources whose license changed
        are relabelled. Every resource page shows its last review date, and the most recent additions are listed on the
        {' '}
        <Link href="/" className="underline underline-offset-2">
          homepage
        </Link>
        .
      </p>

      <h2 className="font-semibold text-lg px-3 pt-8">Who maintains it</h2>
      <p className="px-3 pt-2 text-sm text-gray-500 dark:text-neutral-400 leading-7">
        The catalog is edited by
        {' '}
        <a href={siteConfig.author.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          {siteConfig.author.name}
        </a>
        {' '}
        — the same person who ships the open-source
        {' '}
        <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          source repository
        </a>
        . Found a broken license, a wrong price or a dead link? Open an issue — corrections are applied in the next review cycle.
      </p>

      <div className="px-3 pt-6">
        <Link
          href={siteConfig.links.submit}
          className="inline-flex items-center rounded-lg bg-[var(--brand-solid)] px-4 py-2 text-sm text-white hover:opacity-90"
        >
          Submit a resource
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  )
}
