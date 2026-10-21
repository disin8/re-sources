import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/config/site'
import { getCollectionResources, getCollections } from '@/content'

export const metadata: Metadata = {
  title: 'Curated Collections — Design Resource Shortlists',
  description:
    'Hand-picked shortlists of design resources for developers — free fonts for SaaS landing pages, Tailwind color tools, SVG icon libraries for React and more.',
  alternates: {
    canonical: '/collections',
  },
  openGraph: {
    title: 'Curated Collections — Design Resource Shortlists',
    description:
      'Hand-picked shortlists of design resources for developers, grouped by the job you are trying to do.',
    url: absoluteUrl('/collections'),
    type: 'website',
  },
  twitter: {
    title: 'Curated Collections — Design Resource Shortlists',
    description:
      'Hand-picked shortlists of design resources for developers, grouped by the job you are trying to do.',
    card: 'summary_large_image',
  },
}

export default function CollectionsIndexPage() {
  const collections = getCollections()

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Curated design resource collections',
    'description': 'Hand-picked shortlists of design resources for developers.',
    'numberOfItems': collections.length,
    'itemListElement': collections.map((collection, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': collection.title,
      'url': absoluteUrl(`/collections/${collection.slug}`),
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': absoluteUrl('/') },
      { '@type': 'ListItem', 'position': 2, 'name': 'Collections', 'item': absoluteUrl('/collections') },
    ],
  }

  return (
    <section className="h-full w-full p-6 max-w-[1200px]">
      <nav aria-label="Breadcrumb" className="text-xs text-gray-400 mb-4">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 dark:text-neutral-300">Collections</span>
      </nav>

      <h1 className="font-semibold text-2xl md:text-3xl leading-9 px-3 max-w-[900px]">
        Curated design resource collections
      </h1>
      <p className="text-base text-gray-500 dark:text-neutral-400 leading-7 px-3 pt-3 max-w-[760px]">
        Shortlists built around a specific job rather than a category. Each one explains what the resources
        are for, why they are in the list, and how they compare.
      </p>

      <div className="w-full grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-8 pb-[80px]">
        {collections.map((collection) => {
          const resources = getCollectionResources(collection)

          return (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="p-5 rounded-lg border border-gray-100 dark:border-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-900/40 transition-colors flex flex-col"
            >
              <h2 className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-5">
                {collection.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-neutral-400 leading-5 mt-2 flex-1">
                {collection.description}
              </p>
              <p className="text-xs text-gray-400 mt-4">
                {resources.length}
                {' resources · updated '}
                {collection.updatedAt}
              </p>
            </Link>
          )
        })}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </section>
  )
}
