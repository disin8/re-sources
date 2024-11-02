import { Card } from '@/components/card'
import { contentLinks } from '@/content'
import { notFound } from 'next/navigation'

async function getData(slug: string) {
  const links = contentLinks[slug as keyof typeof contentLinks]

  return links
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const links = await getData(params.slug)

  if (!links) {
    notFound()
  }

  return (
    <section className="h-full w-full p-6">
      <h1 className="font-semibold text-2xl capitalize leading-9 px-3">{params.slug}</h1>
      <div
        className="w-full grid gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-8 pb-[80px]"
      >
        {links.map(link => (
          <Card description={link.description} name={link.name} image={link.image} url={link.url} key={link.name} optional={link.optional} isNew={link.isNew} whiteBg={link.whiteBg} />
        ))}
      </div>
    </section>
  )
}
