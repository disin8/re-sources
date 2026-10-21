import { categories } from '@/config/categories'
import { allResources, contentLinks } from '@/content'

export const revalidate = 3600

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') ?? undefined
  const price = searchParams.get('price') ?? undefined
  const type = searchParams.get('type') ?? undefined
  const tag = searchParams.get('tag') ?? undefined
  const q = searchParams.get('q')?.toLowerCase().trim()

  let resources = category && contentLinks[category] ? contentLinks[category] : allResources

  if (price) {
    resources = resources.filter(resource => resource.price === price)
  }
  if (type) {
    resources = resources.filter(resource => resource.type === type)
  }
  if (tag) {
    resources = resources.filter(resource => resource.tags.includes(tag))
  }
  if (q) {
    resources = resources.filter(resource =>
      [resource.name, resource.description, resource.details, ...resource.tags].join(' ').toLowerCase().includes(q))
  }

  return Response.json(
    {
      total: resources.length,
      categories: categories.map(category => ({ slug: category.slug, name: category.navLabel, count: contentLinks[category.slug]?.length ?? 0 })),
      resources: resources.map(resource => ({
        slug: resource.slug,
        name: resource.name,
        description: resource.description,
        details: resource.details,
        url: resource.url,
        type: resource.type,
        price: resource.price,
        license: resource.license,
        licenseLabel: resource.licenseLabel,
        platforms: resource.platforms,
        tags: resource.tags,
        addedAt: resource.addedAt,
        reviewedAt: resource.reviewedAt,
      })),
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    },
  )
}
