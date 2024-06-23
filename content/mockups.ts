import type { IContent } from '@/types/content'

export const mockupsLinks: IContent[] = [
  {
    name: 'Shots',
    description: 'Create amazing mockups',
    url: 'https://shots.so/',
    image: '/images/mockups/shots.webp',
    optional: 'free',
  },
  {
    name: 'Previewed',
    description: 'Mockup generator for your app',
    url: 'https://previewed.app/',
    image: '/images/mockups/previewed.webp',
    optional: 'paid',
    whiteBg: true,
  },
  {
    name: 'Morflax',
    description: 'Generate 3D device mockup in a quick and engaging way',
    url: 'https://things.morflax.com/',
    image: '/images/mockups/morflax.webp',
    optional: 'free & paid',
    whiteBg: true,
  },
]
