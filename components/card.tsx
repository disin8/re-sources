import type { IContent } from '@/types/content'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const priceLabels: Record<IContent['price'], string> = {
  free: 'Free',
  freemium: 'Freemium',
  paid: 'Paid',
  subscription: 'Subscription',
}

export function Card({ resource, category }: { resource: IContent, category?: string }) {
  const { name, description, url, image, price, license, licenseLabel, tags, isNew, whiteBg, featured } = resource

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${name} — ${description}`}
      data-resource-slug={resource.slug}
      data-resource-category={category ?? ''}
      data-resource-price={price}
      data-resource-license={license}
    >
      <div className="group p-3 transition-all rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-900 hover:scale-101 active:scale-99 ease-in-out h-full flex flex-col">
        <div className="relative">
          <div className="relative overflow-hidden rounded-md border border-gray-100 dark:border-neutral-900 select-none aspect-video bg-gray-50 dark:bg-neutral-900">
            {image
              ? (
                  <Image
                    alt={`${name} preview`}
                    src={image}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    quality={85}
                    loading="lazy"
                    className="rounded-lg object-cover object-center group-hover:scale-105 transition ease-in-out delay-250"
                  />
                )
              : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-gray-300 dark:text-neutral-700 select-none">
                    {name.slice(0, 1).toUpperCase()}
                  </div>
                )}
          </div>
          {/*
            Badges sit on top of screenshots that can be light or dark,
            so they use a solid dark scrim to keep the white label readable.
          */}
          <div className={cn('text-white absolute bottom-2 left-2 rounded-lg inline-block px-2 py-1 text-xs bg-black/70', whiteBg && 'bg-black/60')}>
            {priceLabels[price]}
          </div>
          {featured && (
            <div className="text-white absolute top-2 left-2 rounded-lg inline-block px-2 py-1 text-xs bg-black/70">
              pick
            </div>
          )}
          {isNew && (
            <div className="text-white absolute top-2 right-2 rounded-lg inline-block px-2 py-1 text-xs bg-[var(--brand-solid)]">
              new
            </div>
          )}
        </div>

        <div className="mt-3 flex items-start w-full flex-1">
          <div className="w-full">
            <p className="text-sm text-gray-1000 dark:text-gray-100 leading-5 font-medium">
              {name}
            </p>
            <p className="text-sm text-gray-400 leading-5 mt-1">
              {description}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="text-[11px] leading-4 text-gray-500 dark:text-neutral-500 border border-gray-200 dark:border-neutral-800 rounded px-1.5 py-0.5">
                {licenseLabel}
              </span>
              {tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[11px] leading-4 text-gray-500 dark:text-neutral-500 border border-gray-200 dark:border-neutral-800 rounded px-1.5 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
