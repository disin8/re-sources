import Link from 'next/link'
import { contentLinks } from '@/content'

async function getData(slug: string) {
  const links = contentLinks[slug as keyof typeof contentLinks]

  return links
}

export default async function Page({ params }: { params: { slug: string } }) {
  const links = await getData(params.slug)

  return (
    <section className="h-full w-full">
      <h1 className="font-semibold text-2xl capitalize leading-9 px-3">{params.slug}</h1>
      <div
        className="w-full grid gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3 mt-8 pb-[80px]"
      >
        {links?.length && links.map(link => (
          <Link href={link.url}>
            <div
              className="group p-3 transition-all rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-900 hover:scale-101 active:scale-99 ease-in-out"
            >
              <div
                className="relative overflow-hidden rounded-md border border-gray-100 dark:border-neutral-900 select-none aspect-video"
              >
              </div>
              <div className="mt-2 flex items-center w-full">
                <div
                  className="flex items-start h-full w-full gap-2"
                >
                  <div className="w-full">
                    <p
                      className="text-sm text-gray-1000 leading-5"
                    >
                      {link.name}
                    </p>
                    <p
                      className="text-sm text-gray-400 leading-5"
                    >
                      {link.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
