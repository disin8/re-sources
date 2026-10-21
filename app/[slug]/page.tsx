import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card } from '@/components/card'
import { collectFilterOptions, type FilterKey, ResourceFilters, type SortKey, sortResources } from '@/components/resource-filters'
import { categories, categorySeoTitles, getCategory } from '@/config/categories'
import { absoluteUrl } from '@/config/site'
import { getResourcesByCategory } from '@/content'
import { licenseLabels, platformLabels, priceLabels, typeLabels } from '@/lib/labels'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export function generateStaticParams() {
  return categories.map(category => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)

  if (!category) {
    return {}
  }

  const title = categorySeoTitles[category.slug] ?? category.title

  return {
    title,
    description: category.description,
    keywords: category.keywords,
    alternates: {
      canonical: `/${category.slug}`,
    },
    openGraph: {
      title: `${title} — re • sources`,
      description: category.description,
      url: absoluteUrl(`/${category.slug}`),
      type: 'website',
    },
    twitter: {
      title: `${title} — re • sources`,
      description: category.description,
      card: 'summary_large_image',
    },
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const query = await searchParams
  const category = getCategory(slug)

  if (!category) {
    notFound()
  }

  const resources = getResourcesByCategory(category.slug)
  const activePrice = typeof query.price === 'string' ? query.price : undefined
  const activeType = typeof query.type === 'string' ? query.type : undefined
  const activeLicense = typeof query.license === 'string' ? query.license : undefined
  const activePlatform = typeof query.platform === 'string' ? query.platform : undefined
  const activeTag = typeof query.tag === 'string' ? query.tag : undefined
  const search = typeof query.q === 'string' ? query.q.toLowerCase().trim() : undefined
  const rawSort = typeof query.sort === 'string' ? query.sort : undefined
  const sort: SortKey = rawSort === 'newest' || rawSort === 'az' ? rawSort : 'popular'

  const filtered = resources.filter((resource) => {
    if (activePrice && resource.price !== activePrice) {
      return false
    }
    if (activeType && resource.type !== activeType) {
      return false
    }
    if (activeLicense && resource.license !== activeLicense) {
      return false
    }
    if (activePlatform && !resource.platforms.includes(activePlatform as never)) {
      return false
    }
    if (activeTag && !resource.tags.includes(activeTag)) {
      return false
    }
    if (search) {
      const haystack = [resource.name, resource.description, resource.details, ...resource.tags].join(' ').toLowerCase()
      if (!haystack.includes(search)) {
        return false
      }
    }
    return true
  })

  const optionSource = resources
  const rawOptions = collectFilterOptions(optionSource)
  const options = {
    price: rawOptions.price.map(option => ({ ...option, label: priceLabels[option.value as keyof typeof priceLabels] ?? option.value })),
    license: rawOptions.license.map(option => ({ ...option, label: licenseLabels[option.value as keyof typeof licenseLabels] ?? option.value })),
    type: rawOptions.type.map(option => ({ ...option, label: typeLabels[option.value as keyof typeof typeLabels] ?? option.value })),
    platform: rawOptions.platform.map(option => ({ ...option, label: platformLabels[option.value as keyof typeof platformLabels] ?? option.value })),
    tag: rawOptions.tag,
  }

  const active: Partial<Record<FilterKey, string>> = {
    price: activePrice,
    license: activeLicense,
    type: activeType,
    platform: activePlatform,
    tag: activeTag,
  }

  const sorted = sortResources(filtered, sort)

  const latestReviewed = resources.reduce((latest, resource) => (resource.reviewedAt > latest ? resource.reviewedAt : latest), '')

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': absoluteUrl('/') },
      { '@type': 'ListItem', 'position': 2, 'name': category.navLabel, 'item': absoluteUrl(`/${category.slug}`) },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': category.title,
    'description': category.description,
    'numberOfItems': filtered.length,
    'itemListElement': sorted.map((resource, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': resource.name,
      'url': absoluteUrl(`/resources/${resource.slug}`),
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': category.faq.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  }

  return (
    <section className="h-full w-full p-6 max-w-[1200px]">
      <nav aria-label="Breadcrumb" className="text-xs text-gray-400 mb-4">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 dark:text-neutral-300">{category.navLabel}</span>
      </nav>

      <h1 className="font-semibold text-2xl md:text-3xl leading-9 px-3 max-w-[900px]">{category.title}</h1>

      <div className="px-3 pt-4 max-w-[760px] space-y-3">
        {category.intro.map(paragraph => (
          <p key={paragraph} className="text-sm text-gray-500 dark:text-neutral-400 leading-6">{paragraph}</p>
        ))}
      </div>

      <p className="px-3 pt-4 text-xs text-gray-400">
        {resources.length}
        {' '}
        resources
        {' · '}
        last reviewed
        {' '}
        {latestReviewed || '—'}
        {' · '}
        curated by
        {' '}
        <Link href="/about" className="underline underline-offset-2 hover:text-gray-600">re • sources editors</Link>
      </p>

      <div className="px-3">
        <form action={`/${category.slug}`} method="get" className="flex gap-2 pt-2">
          <input
            type="search"
            name="q"
            defaultValue={search ?? ''}
            placeholder={`Search ${category.navLabel.toLowerCase()}...`}
            aria-label={`Search ${category.navLabel}`}
            className="w-full max-w-[320px] rounded-lg border border-gray-200 dark:border-neutral-800 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-gray-400 dark:focus:border-neutral-600"
          />
          <button
            type="submit"
            className="rounded-lg border border-gray-200 dark:border-neutral-800 px-3 py-1.5 text-sm text-gray-600 dark:text-neutral-300 hover:border-gray-400"
          >
            Search
          </button>
        </form>
      </div>

      <div className="px-3">
        <ResourceFilters category={category.slug} active={active} options={options} sort={sort} />
      </div>

      {filtered.length === 0
        ? (
            <p className="px-3 py-10 text-sm text-gray-400">
              Nothing matches these filters.
              {' '}
              <Link href={`/${category.slug}`} className="underline underline-offset-2">Reset filters</Link>
            </p>
          )
        : (
            <div className="w-full grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 pb-[80px]">
              {sorted.map(resource => (
                <Card key={resource.slug} resource={resource} category={category.slug} />
              ))}
            </div>
          )}

      {category.faq.length > 0 && (
        <div className="pb-[80px] max-w-[760px]">
          <h2 className="font-semibold text-lg px-3 pt-6 pb-2">Frequently asked questions</h2>
          {category.faq.map(item => (
            <div key={item.question} className="px-3 py-3 border-b border-gray-100 dark:border-neutral-900">
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100">{item.question}</h3>
              <p className="text-sm text-gray-500 dark:text-neutral-400 leading-6 mt-1">{item.answer}</p>
            </div>
          ))}
        </div>
      )}

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  )
}
