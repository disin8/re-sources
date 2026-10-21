
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://re-sources.vercel.app').replace(/\/$/, '')

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 're • sources',
  shortName: 're-sources',
  description:
    'A hand-checked directory of design tools and resources for building modern web products — fonts, color palettes, icons, AI tools, mockups and animation libraries, filtered by license, price and use case.',
  url: SITE_URL,
  locale: 'en_US',
  language: 'en',
 
  author: {
    name: 'Dmitry Sin',
    url: 'https://github.com/disin8',
    role: 'Editor',
  },
  links: {
    twitter: 'https://twitter.com/di_sin8',
    github: 'https://github.com/disin8/re-sources',
    submit: '/submit',
    about: '/about',
    feed: '/feed.xml',
    api: '/api/resources',
  },
  reviewCadence: 'weekly',
} as const

export function absoluteUrl(path: string = '/') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
