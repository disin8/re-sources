import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/card'
import { categories } from '@/config/categories'
import { absoluteUrl, siteConfig } from '@/config/site'
import { allResources, catalogStats, contentLinks, getCollections } from '@/content'

export const metadata: Metadata = {
  title: 'Curated Design Resources for Developers — Fonts, Colors, Icons & AI Tools',
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Curated design resources for developers',
    description: siteConfig.description,
    url: absoluteUrl('/'),
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    title: 'Curated design resources for developers',
    description: siteConfig.description,
    card: 'summary_large_image',
  },
}

export default async function IndexPage() {
  const featured = allResources.filter(resource => resource.featured).slice(0, 8)
  const latest = [...allResources]
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt) || b.reviewedAt.localeCompare(a.reviewedAt))
    .slice(0, 4)
  const lastReviewed = allResources.reduce((latestDate, resource) => (resource.reviewedAt > latestDate ? resource.reviewedAt : latestDate), '')
  const freeCount = allResources.filter(resource => resource.price === 'free' || resource.price === 'freemium').length
  const collections = getCollections()

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': siteConfig.name,
    'description': siteConfig.description,
    'url': absoluteUrl('/'),
    'dateModified': lastReviewed,
    'author': {
      '@type': 'Person',
      'name': siteConfig.author.name,
      'url': siteConfig.author.url,
    },
    'numberOfItems': allResources.length,
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': categories.map((category, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': category.navLabel,
        'url': absoluteUrl(`/${category.slug}`),
      })),
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': siteConfig.name,
    'url': absoluteUrl('/'),
    'inLanguage': siteConfig.language,
    'publisher': {
      '@type': 'Person',
      'name': siteConfig.author.name,
      'url': siteConfig.author.url,
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${absoluteUrl('/fonts')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <section className="h-full w-full p-6 max-w-[1200px]">
      <h1 className="font-semibold text-2xl md:text-4xl leading-10 md:leading-12 px-3 max-w-[860px]">
        Find the right design resource for your next web project
      </h1>
      <p className="text-base md:text-lg text-gray-500 dark:text-neutral-400 font-normal leading-7 px-3 pt-3 max-w-[760px]">
        Fonts, color palettes, icons, AI tools, mockups and animation libraries — every entry checked for
        license, price and use case, so you can ship it without a legal round-trip.
      </p>

      <div className="px-3 pt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400">
        <span>
          {catalogStats.resources}
          {' resources'}
        </span>
        <span>
          {categories.length}
          {' categories'}
        </span>
        <span>
          {freeCount}
          {' free or freemium'}
        </span>
        <span>
          {catalogStats.openSource}
          {' open source'}
        </span>
        <span>
          last reviewed
          {' '}
          {lastReviewed}
        </span>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between px-3">
          <h2 className="font-semibold text-base">Browse by category</h2>
          <Link href="/about" className="text-sm text-gray-500 dark:text-neutral-400 hover:text-black dark:hover:text-white">
            How we choose
          </Link>
        </div>
        <div className="w-full grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-3">
          {categories.map(category => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="p-4 rounded-lg border border-gray-100 dark:border-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-900/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{category.navLabel}</p>
                <span className="text-xs text-gray-400">
                  {contentLinks[category.slug]?.length ?? 0}
                  {' tools'}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-neutral-400 leading-5 mt-2">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {collections.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between px-3">
            <h2 className="font-semibold text-base">Curated collections</h2>
            <Link href="/collections" className="text-sm text-gray-500 dark:text-neutral-400 hover:text-black dark:hover:text-white">
              All collections
            </Link>
          </div>
          <div className="w-full grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-3">
            {collections.map(collection => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="p-4 rounded-lg border border-gray-100 dark:border-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-900/40 transition-colors"
              >
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-5">{collection.title}</p>
                <p className="text-sm text-gray-500 dark:text-neutral-400 leading-5 mt-2">{collection.description}</p>
                <span className="text-xs text-gray-400 mt-3 block">
                  {collection.resources.length}
                  {' resources'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {featured.length > 0 && (
        <div className="mt-10">
          <h2 className="font-semibold text-base px-3">Editor picks</h2>
          <div className="w-full grid gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 mt-3">
            {featured.map(resource => (
              <Card key={resource.slug} resource={resource} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 pb-[60px]">
        <div className="flex items-center justify-between px-3">
          <h2 className="font-semibold text-base">Recently added</h2>
        </div>
        <div className="w-full grid gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 mt-3">
          {latest.map(resource => (
            <Card key={resource.slug} resource={resource} />
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </section>
  )
}
