import { Card } from '@/components/card'
import { contentLinks } from '@/content'
import Link from 'next/link'

async function getData() {
  return Object.fromEntries(Object.entries(contentLinks).map(([key, links]) => [key, links.slice(0, 4)]))
}

export default async function IndexPage() {
  const tools = await getData()

  return (
    <section className="h-full w-full p-6">
      <h1 className="font-semibold text-2xl leading-9 px-3">The best design resources for developers</h1>
      <h3 className="text-xl text-gray-400 dark:text-neutral-600 font-normal leading-8 px-3 pb-[40px]">Curated list of resources of over the internet.</h3>
      {Object.entries(tools).map(([url, links]) => (
        <div key={url}>
          <div className="flex justify-between items-center">
            <h5 className="font-semibold text-base capitalize leading-9 px-3">{url}</h5>
            <Link href={url} className="text-sm text-gray-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">View all</Link>
          </div>
          <div className="w-full grid gap-x-2 gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2 pb-[20px]">
            {links.map(link => (
              <Card description={link.description} name={link.name} image={link.image} url={link.url} key={link.name} optional={link.optional} isNew={link.isNew} whiteBg={link.whiteBg} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
