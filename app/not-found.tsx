import Link from 'next/link'
import { contentLinks } from '@/content'

async function getData() {
  return Object.values(contentLinks).map(links => links.slice(0, 3))
}

export default async function NotFound() {
  return (
    <section className="h-full w-full p-6">
      <div className="px-3 flex items-center flex-col py-[40px]">
        <h1 className="font-semibold text-4xl md:text-7xl capitalize leading-14 px-3 text-center">
          Not Found.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 dark:text-neutral-600 font-normal leading-8 pt-8 text-center">There's nothing here. :(</p>
      </div>
      <hr />
      <div>
      </div>
    </section>
  )
}
