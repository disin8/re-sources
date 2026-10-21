import type { MetadataRoute } from 'next'
import { categories } from '@/config/categories'
import { absoluteUrl, SITE_URL } from '@/config/site'
import { allResources, getCollections } from '@/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const isPreview = process.env.VERCEL_ENV === 'preview'

  if (isPreview) {
    return []
  }

  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/about'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: absoluteUrl('/submit'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: absoluteUrl('/collections'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(category => ({
    url: absoluteUrl(`/${category.slug}`),
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const collectionRoutes: MetadataRoute.Sitemap = getCollections().map(collection => ({
    url: absoluteUrl(`/collections/${collection.slug}`),
    lastModified: new Date(collection.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const resourceRoutes: MetadataRoute.Sitemap = allResources.map(resource => ({
    url: absoluteUrl(`/resources/${resource.slug}`),
    lastModified: new Date(resource.reviewedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...collectionRoutes, ...resourceRoutes]
}

export const dynamic = 'force-static'

export function generateSitemapUrl() {
  return `${SITE_URL}/sitemap.xml`
}
