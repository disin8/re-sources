import type { IContent } from '@/types/content'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function Card({ url, description, image, name, optional, isNew, whiteBg }: IContent) {
  return (
    <Link href={url} target="_blank">
      <div
        className="group p-3 transition-all rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-900 hover:scale-101 active:scale-99 ease-in-out"
      >
        <div className="relative">

          <div
            className="relative overflow-hidden rounded-md border border-gray-100 dark:border-neutral-900 select-none aspect-video"
          >
            <Image
              alt={description}
              src={image}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              quality={85}
              loading="lazy"
              className="rounded-lg object-cover object-center group-hover:scale-105 transition ease-in-out delay-250"
            />
          </div>
          <div className={cn('text-white absolute bottom-2 left-2 backdrop-blur-sm bg-white/15 rounded-lg inline-block px-2 py-1', whiteBg && 'bg-black/15')}>
            {optional}
          </div>
          {isNew && (
            <div className="text-white absolute top-2 right-2 backdrop-blur-sm bg-[#799dff]/50 rounded-lg inline-block px-2 py-1">
              new
            </div>
          )}
        </div>

        <div className="mt-2 flex items-center w-full">
          <div
            className="flex items-start h-full w-full gap-2"
          >
            <div className="w-full">
              <p
                className="text-sm text-gray-1000 leading-5"
              >
                {name}
              </p>
              <p
                className="text-sm text-gray-400 leading-5"
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
