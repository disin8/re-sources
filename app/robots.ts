import type { MetadataRoute } from 'next'
import { absoluteUrl, SITE_URL } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === 'preview'

  if (isPreview) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  }
}
