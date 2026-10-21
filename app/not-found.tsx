import type { Metadata } from 'next'
import { Card } from '@/components/card'
import { allResources } from '@/content'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: {
    index: false,
    follow: true,
  },
}

export default async function NotFound() {
  const links = [...allResources].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, 3)

  return (
    <section className="h-full w-full p-6 max-w-[1200px]">
      <div className="px-3 flex items-center flex-col py-20">
        <h1 className="font-semibold text-4xl md:text-7xl capitalize leading-14 px-3 text-center">
          Not Found.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 dark:text-neutral-600 font-normal leading-8 pt-8 text-center">
          This page does not exist — but the catalog is still here.
        </p>
      </div>
      <hr />
      <div className="mt-12">
        <h2 className="font-medium text-1xl md:text-3xl mb-8">
          Check out our latest tools
        </h2>
        <div className="w-full grid gap-x-2 gap-y-3 md:grid-cols-2 lg:grid-cols-3 mt-2 pb-[20px]">
          {links.map(link => (
            <Card key={link.slug} resource={link} />
          ))}
        </div>
      </div>
    </section>
  )
}
