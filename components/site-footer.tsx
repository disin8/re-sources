import Link from 'next/link'
import { categories } from '@/config/categories'
import { siteConfig } from '@/config/site'
import { allResources, getLastReviewedAt } from '@/content'

export function SiteFooter() {
  const lastReviewed = getLastReviewedAt()

  return (
    <footer className="w-full border-t border-gray-100 dark:border-neutral-900 mt-10">
      <div className="px-3 py-8 grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            re • sources
          </p>
          <p className="text-xs text-gray-500 dark:text-neutral-400 leading-5 mt-2 max-w-[280px]">
            A hand-checked directory of design tools and resources for building modern web products.
            Every entry records its license, price and last review date.
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Curated by
            {' '}
            <a
              href={siteConfig.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-200"
            >
              {siteConfig.author.name}
            </a>
          </p>
        </div>

        <nav aria-label="Categories">
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Categories
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3">
            {categories.map(category => (
              <li key={category.slug}>
                <Link
                  href={`/${category.slug}`}
                  className="text-xs text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {category.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Site">
          <p className="text-xs uppercase tracking-wide text-gray-400">
            About
          </p>
          <ul className="flex flex-col gap-1.5 mt-3">
            <li>
              <Link href="/about" className="text-xs text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-gray-200">
                How we choose resources
              </Link>
            </li>
            <li>
              <Link href="/collections" className="text-xs text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-gray-200">
                Curated collections
              </Link>
            </li>
            <li>
              <Link href="/submit" className="text-xs text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-gray-200">
                Submit a resource
              </Link>
            </li>
            <li>
              <Link href="/feed.xml" className="text-xs text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-gray-200">
                RSS feed
              </Link>
            </li>
            <li>
              <a
                href={siteConfig.links.api}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                JSON API
              </a>
            </li>
            <li>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="px-3 py-4 border-t border-gray-100 dark:border-neutral-900 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-gray-400">
        <p>
          {allResources.length}
          {' resources · reviewed weekly · last checked '}
          {lastReviewed}
        </p>
        <p>
          © 2026
          {' '}
          {siteConfig.author.name}
          {' · '}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 dark:hover:text-gray-200"
          >
            Twitter
          </a>
        </p>
      </div>
    </footer>
  )
}
