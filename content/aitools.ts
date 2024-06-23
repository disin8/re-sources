import type { IContent } from '@/types/content'

export const aitoolsLinks: IContent[] = [
  {
    name: 'Suno',
    description: 'Make a song about anything',
    url: 'https://suno.com/',
    image: '/images/aitools/suno.webp',
    optional: 'subscription',
  },
  {
    name: 'Midjourney',
    description: 'Generative and creative images',
    url: 'https://www.midjourney.com/',
    image: '/images/aitools/midjourney.webp',
    optional: 'paid',
  },
  {
    name: 'Krea',
    description: 'Generate AI images and video',
    url: 'https://www.krea.ai/',
    image: '/images/aitools/krea.webp',
    optional: 'subscription',
  },
]
