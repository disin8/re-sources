import type { IContent } from '@/types/content'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type FilterKey = 'price' | 'license' | 'type' | 'platform' | 'tag'

export type SortKey = 'popular' | 'newest' | 'az'

export const sortLabels: Record<SortKey, string> = {
  popular: 'Popular',
  newest: 'Newest',
  az: 'A–Z',
}

export interface FilterOption {
  value: string
  label?: string
  count: number
}

export function buildFilterHref(category: string, active: Partial<Record<FilterKey, string>>, key: FilterKey, value?: string) {
  const params = new URLSearchParams()

  for (const [filterKey, filterValue] of Object.entries(active)) {
    if (filterKey !== key && filterValue) {
      params.set(filterKey, filterValue)
    }
  }

  if (value) {
    params.set(key, value)
  }

  const query = params.toString()
  return query ? `/${category}?${query}` : `/${category}`
}

export function buildSortHref(category: string, active: Partial<Record<FilterKey, string>>, sort: SortKey) {
  const params = new URLSearchParams()

  for (const [filterKey, filterValue] of Object.entries(active)) {
    if (filterValue) {
      params.set(filterKey, filterValue)
    }
  }

  params.set('sort', sort)

  return `/${category}?${params.toString()}`
}

export function ResourceFilters({
  category,
  active,
  options,
  sort,
}: {
  category: string
  active: Partial<Record<FilterKey, string>>
  options: Partial<Record<FilterKey, FilterOption[]>>
  sort?: SortKey
}) {
  const groups = (Object.keys(options) as FilterKey[]).filter(key => (options[key]?.length ?? 0) > 1)
  const activeCount = Object.values(active).filter(Boolean).length

  return (
    <div className="flex flex-col gap-3 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {(['popular', 'newest', 'az'] as SortKey[]).map(value => (
            <Link
              key={value}
              href={buildSortHref(category, active, value)}
              aria-current={sort === value ? 'true' : undefined}
              className={cn(
                'text-xs px-2.5 py-1 rounded-full border transition-colors',
                sort === value
                  ? 'border-transparent bg-[var(--brand-solid)] text-white'
                  : 'border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-neutral-300 hover:border-gray-400',
              )}
            >
              {sortLabels[value]}
            </Link>
          ))}
        </div>

        {activeCount > 0 && (
          <Link
            href={`/${category}`}
            className="text-xs text-gray-400 underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-200"
          >
            Clear
            {' '}
            {activeCount}
            {' '}
            filter
            {activeCount > 1 ? 's' : ''}
          </Link>
        )}
      </div>

      {groups.map(key => (
        <div key={key} className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-gray-400 w-16 shrink-0">{key}</span>
          <Link
            href={buildFilterHref(category, active, key)}
            className={cn(
              'text-xs px-2.5 py-1 rounded-full border transition-colors',
              !active[key]
                ? 'border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-neutral-300 hover:border-gray-400'
                : 'border-transparent bg-[var(--brand-solid)] text-white',
            )}
          >
            All
          </Link>
          {options[key]?.map(option => (
            <Link
              key={option.value}
              href={buildFilterHref(category, active, key, option.value)}
              aria-current={active[key] === option.value ? 'true' : undefined}
              className={cn(
                'text-xs px-2.5 py-1 rounded-full border transition-colors',
                active[key] === option.value
                  ? 'border-transparent bg-[var(--brand-solid)] text-white'
                  : 'border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-neutral-300 hover:border-gray-400',
              )}
            >
              {option.label ?? option.value}
              <span className="ml-1 opacity-60">{option.count}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

export function collectFilterOptions(resources: IContent[]) {
  const countBy = (values: string[]) => {
    const counts = new Map<string, number>()
    for (const value of values) {
      counts.set(value, (counts.get(value) ?? 0) + 1)
    }
    return counts
  }

  const priceCounts = countBy(resources.map(resource => resource.price))
  const licenseCounts = countBy(resources.map(resource => resource.license))
  const typeCounts = countBy(resources.map(resource => resource.type))
  const platformCounts = countBy(resources.flatMap(resource => resource.platforms))
  const tagCounts = countBy(resources.flatMap(resource => resource.tags))

  return {
    price: [...priceCounts.entries()].map(([value, count]) => ({ value, count })),
    license: [...licenseCounts.entries()].map(([value, count]) => ({ value, count })),
    type: [...typeCounts.entries()].map(([value, count]) => ({ value, count })),
    platform: [...platformCounts.entries()].map(([value, count]) => ({ value, count })),
    tag: [...tagCounts.entries()].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count).slice(0, 12),
  }
}

export function sortResources(resources: IContent[], sort: SortKey = 'popular') {
  const list = [...resources]

  switch (sort) {
    case 'newest':
      return list.sort((a, b) => b.addedAt.localeCompare(a.addedAt) || b.reviewedAt.localeCompare(a.reviewedAt))
    case 'az':
      return list.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return list.sort((a, b) => {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1
        }
        return b.reviewedAt.localeCompare(a.reviewedAt)
      })
  }
}
