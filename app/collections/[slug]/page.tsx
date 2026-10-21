import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card } from '@/components/card'
import { absoluteUrl, siteConfig } from '@/config/site'
import { getCollection, getCollectionResources, getCollections } from '@/content'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getCollections().map(collection => ({ slug: collection.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = getCollection(slug)

  if (!collection) {
    return {}
  }

  return {
    title: collection.title,
    description: collection.description,
    keywords: collection.resources,
    alternates: {
      canonical: `/collections/${collection.slug}`,
    },
    openGraph: {
      title: `${collection.title} — ${siteConfig.name}`,
      description: collection.description,
      url: absoluteUrl(`/collections/${collection.slug}`),
      type: 'article',
    },
    twitter: {
      title: `${collection.title} — ${siteConfig.name}`,
      description: collection.description,
      card: 'summary_large_image',
    },
  }
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params
  const collection = getCollection(slug)

  if (!collection) {
    notFound()
  }

  const resources = getCollectionResources(collection)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': absoluteUrl('/') },
      { '@type': 'ListItem', 'position': 2, 'name': 'Collections', 'item': absoluteUrl('/collections') },
      { '@type': 'ListItem', 'position': 3, 'name': collection.title, 'item': absoluteUrl(`/collections/${collection.slug}`) },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': collection.title,
    'description': collection.description,
    'numberOfItems': resources.length,
    'itemListElement': resources.map((resource, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': resource.name,
      'url': absoluteUrl(`/resources/${resource.slug}`),
    })),
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': collection.title,
    'description': collection.description,
    'url': absoluteUrl(`/collections/${collection.slug}`),
    'dateModified': collection.updatedAt,
    'author': {
      '@type': 'Person',
      'name': siteConfig.author.name,
      'url': siteConfig.author.url,
    },
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': itemListSchema.itemListElement,
    },
  }

  return (
    <section className="h-full w-full p-6 max-w-[1200px]">
      <nav aria-label="Breadcrumb" className="text-xs text-gray-400 mb-4">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/collections" className="hover:text-gray-700 dark:hover:text-gray-200">Collections</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 dark:text-neutral-300">{collection.title}</span>
      </nav>

      <h1 className="font-semibold text-2xl md:text-3xl leading-9 px-3 max-w-[900px]">
        {collection.title}
      </h1>
      <p className="text-base text-gray-500 dark:text-neutral-400 leading-7 px-3 pt-3 max-w-[760px]">
        {collection.description}
      </p>

      <div className="px-3 pt-4 text-xs text-gray-400">
        {resources.length}
        {' resources · updated '}
        {collection.updatedAt}
      </div>

      <div className="mt-8 max-w-[820px]">
        <p className="text-sm text-gray-600 dark:text-neutral-300 leading-7">{collection.intro}</p>
      </div>

      <div className="w-full grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
        {resources.map(resource => (
          <Card key={resource.slug} resource={resource} />
        ))}
      </div>

      <div className="mt-12 pb-[80px]">
        <h2 className="font-semibold text-base px-3">More curated collections</h2>
        <div className="flex flex-wrap gap-2 px-3 pt-3">
          {getCollections()
            .filter(item => item.slug !== collection.slug)
            .map(item => (
              <Link
                key={item.slug}
                href={`/collections/${item.slug}`}
                className="text-xs px-2.5 py-1 rounded-full border border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-neutral-300 hover:border-gray-400"
              >
                {item.title}
              </Link>
            ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </section>
  )
}
