import { Card } from '@/components/card'
import { contentLinks } from '@/content'

async function getData() {
  const flatLinks = Object.values(contentLinks).flat(1)
  const newLinks = flatLinks.filter(link => link.isNew)
  const oldLinks = flatLinks.filter(link => !link.isNew)
  return [...newLinks, ...oldLinks].slice(0, 3)
}

export default async function NotFound() {
  const links = await getData()

  return (
    <section className="h-full w-full p-6">
      <div className="px-3 flex items-center flex-col py-20">
        <h1 className="font-semibold text-4xl md:text-7xl capitalize leading-14 px-3 text-center">
          Not Found.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 dark:text-neutral-600 font-normal leading-8 pt-8 text-center">There's nothing here. :(</p>
      </div>
      <hr />
      <div className="mt-12">
        <h2 className="font-medium text-1xl md:text-3xl mb-8">
          Check out our latest tools
        </h2>
        <div className="w-full grid gap-x-2 gap-y-3 md:grid-cols-2 lg:grid-cols-3 mt-2 pb-[20px]">

          {links.map(link => (
            <Card description={link.description} name={link.name} image={link.image} url={link.url} key={link.name} optional={link.optional} isNew={link.isNew} whiteBg={link.whiteBg} />
          ))}
        </div>
      </div>
    </section>
  )
}
