import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card } from '@/components/card'
import { getCategory } from '@/config/categories'
import { absoluteUrl, siteConfig } from '@/config/site'
import { allResources, getCategoryOfResource, getResource, getResourcesByCategory } from '@/content'
import { platformLabels, priceLabels, typeLabels } from '@/lib/labels'

interface PageProps {
  params: Promise<{ slug: string }>
}

function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function generateStaticParams() {
  return allResources.map(resource => ({ slug: resource.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const resource = getResource(slug)

  if (!resource) {
    return {}
  }

  const categorySlug = getCategoryOfResource(resource)
  const category = categorySlug ? getCategory(categorySlug) : undefined

  const title = category
    ? `${resource.name} — ${category.navLabel} for Developers`
    : `${resource.name} — Design Resource for Developers`
  const description = resource.description

  return {
    title,
    description,
    keywords: [...resource.tags, resource.type.replace('-', ' '), priceLabels[resource.price]],
    alternates: {
      canonical: `/resources/${resource.slug}`,
    },
    openGraph: {
      title: `${resource.name} — re • sources`,
      description,
      url: absoluteUrl(`/resources/${resource.slug}`),
      type: 'article',
    },
    twitter: {
      title: `${resource.name} — re • sources`,
      description,
      card: 'summary_large_image',
    },
  }
}

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params
  const resource = getResource(slug)

  if (!resource) {
    notFound()
  }

  const categorySlug = getCategoryOfResource(resource)
  const category = categorySlug ? getCategory(categorySlug) : undefined
  const related = categorySlug
    ? getResourcesByCategory(categorySlug).filter(item => item.slug !== resource.slug).slice(0, 4)
    : []

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': `${resource.name} — ${resource.description}`,
    'description': resource.details,
    'url': absoluteUrl(`/resources/${resource.slug}`),
    'dateModified': resource.reviewedAt,
    'datePublished': resource.addedAt,
    'author': {
      '@type': 'Person',
      'name': siteConfig.author.name,
      'url': siteConfig.author.url,
    },
    'mainEntity': {
      '@type': 'SoftwareApplication',
      'name': resource.name,
      'description': resource.description,
      'url': resource.url,
      'applicationCategory': typeLabels[resource.type],
      'operatingSystem': resource.platforms.map(platform => platformLabels[platform]).join(', '),
      'offers': {
        '@type': 'Offer',
        'url': resource.url,
        'description': priceLabels[resource.price],
      },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': absoluteUrl('/') },
      ...(category
        ? [{ '@type': 'ListItem', 'position': 2, 'name': category.navLabel, 'item': absoluteUrl(`/${category.slug}`) }]
        : []),
      { '@type': 'ListItem', 'position': category ? 3 : 2, 'name': resource.name, 'item': absoluteUrl(`/resources/${resource.slug}`) },
    ],
  }

  return (
    <section className="h-full w-full p-6 max-w-[900px]">
      <nav aria-label="Breadcrumb" className="text-xs text-gray-400 mb-4">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
        <span className="mx-2">/</span>
        {category && (
          <>
            <Link href={`/${category.slug}`} className="hover:text-gray-700 dark:hover:text-gray-200">{category.navLabel}</Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-gray-600 dark:text-neutral-300">{resource.name}</span>
      </nav>

      <h1 className="font-semibold text-2xl md:text-3xl leading-9 px-3">{resource.name}</h1>
      <p className="text-sm md:text-base text-gray-500 dark:text-neutral-400 leading-6 px-3 pt-2">{resource.description}</p>

      <div className="px-3 pt-4 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-neutral-400">
        <span className="border border-gray-200 dark:border-neutral-800 rounded px-2 py-1">{priceLabels[resource.price]}</span>
        <span className="border border-gray-200 dark:border-neutral-800 rounded px-2 py-1">{typeLabels[resource.type]}</span>
        {/* The specific licence (MIT, ISC, "commercial use allowed") rather than
            the generic licence category, which would duplicate the type badge. */}
        <span className="border border-gray-200 dark:border-neutral-800 rounded px-2 py-1">{resource.licenseLabel}</span>
        {resource.platforms.map(platform => (
          <span key={platform} className="border border-gray-200 dark:border-neutral-800 rounded px-2 py-1">{platformLabels[platform]}</span>
        ))}
      </div>

      <p className="px-3 pt-5 text-sm text-gray-600 dark:text-neutral-300 leading-7">{resource.details}</p>

      <p className="px-3 pt-4 text-xs text-gray-400">
        License:
        {' '}
        {resource.licenseLabel}
        {' · '}
        added
        {' '}
        <time dateTime={resource.addedAt}>{formatDate(resource.addedAt)}</time>
        {' · '}
        last reviewed
        {' '}
        <time dateTime={resource.reviewedAt}>{formatDate(resource.reviewedAt)}</time>
      </p>

      <div className="px-3 pt-5">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          data-resource-slug={resource.slug}
          data-resource-category={categorySlug ?? ''}
          data-resource-price={resource.price}
          data-resource-license={resource.license}
          className="inline-flex items-center rounded-lg bg-[var(--brand-solid)] px-4 py-2 text-sm text-white hover:opacity-90"
        >
          Open
          {' '}
          {resource.name}
        </a>
      </div>

      {resource.tags.length > 0 && (
        <div className="px-3 pt-5 flex flex-wrap gap-2">
          {resource.tags.map(tag => (
            <Link
              key={tag}
              href={`/${categorySlug ?? ''}?tag=${encodeURIComponent(tag)}`}
              className="text-xs text-gray-500 dark:text-neutral-400 border border-gray-200 dark:border-neutral-800 rounded px-2 py-1 hover:border-gray-400"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      {related.length > 0 && (
        <div className="pt-10 pb-[60px]">
          <h2 className="font-semibold text-base px-3">
            More in
            {' '}
            {category?.navLabel}
          </h2>
          <div className="w-full grid gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 mt-3">
            {related.map(item => (
              <Card key={item.slug} resource={item} />
            ))}
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </section>
  )
}
