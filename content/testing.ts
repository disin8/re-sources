import type { IContent } from '@/types/content'

export const testingLinks: IContent[] = [
  {
    name: 'browserling',
    description: `Online cross-browsing testing`,
    url: 'https://www.browserling.com/',
    image: '/images/testing/browserling.webp',
    optional: 'free',
    whiteBg: true,
  },
  {
    name: 'developer.samsung',
    description: `Samsung devices for testing mobile apps`,
    url: 'https://developer.samsung.com/remotetestlab/devices',
    image: '/images/testing/samsung-devices.webp',
    optional: 'free',
    whiteBg: true,
  },
  {
    name: 'browserstack',
    description: `App & Browser Testing Made Easy`,
    url: 'https://www.browserstack.com/',
    image: '/images/testing/browserstack.webp',
    optional: 'paid',
    whiteBg: true,
  },
]
