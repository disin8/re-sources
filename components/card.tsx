import Image from 'next/image'
import Link from 'next/link'
import type { ICard } from '@/types/card'

export function Card({ url, description, image, name }: ICard) {
  return (
    <Link href={url} target="_blank">
      <div
        className="group p-3 transition-all rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-900 hover:scale-101 active:scale-99 ease-in-out"
      >
        <div
          className="relative overflow-hidden rounded-md border border-gray-100 dark:border-neutral-900 select-none aspect-video"
        >
          <Image
            alt={description}
            src={image}
            fill
            loading="lazy"
            className="rounded-lg object-cover object-left group-hover:scale-105 transition ease-in-out delay-250"
          />
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
