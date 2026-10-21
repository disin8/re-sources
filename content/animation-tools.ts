import type { IContent } from '@/types/content'

export const animationToolsResources: IContent[] = [
  {
    slug: 'motion-zajno',
    name: 'Motion Zajno',
    description: 'UI and UX animation case studies with live demos.',
    details:
      'Motion Zajno is a study library rather than a tool: each entry breaks down a real UI animation and shows it running, with notes on the reasoning behind the timing and easing. It is the fastest way to build intuition about what makes interface motion feel right, and every case includes a live demo you can inspect.',
    url: 'https://motion.zajno.com/',
    image: '/images/animation-tools/motion-zajno.png',
    type: 'collection',
    price: 'free',
    license: 'free',
    licenseLabel: 'Free to read',
    platforms: ['web'],
    tags: ['case studies', 'easing', 'timing', 'learning'],
    addedAt: '2024-08-12',
    reviewedAt: '2026-10-06',
  },
  {
    slug: 'animations-dev',
    name: 'animations.dev',
    description: 'Curated vault of animation inspiration and tools.',
    details:
      'The animations.dev vault collects animation references, techniques and libraries in one browsable place, with links grouped by the kind of effect you are trying to achieve. It is a discovery tool — useful when you know the effect you want but not which library or technique handles it well.',
    url: 'https://animations.dev/',
    image: '/images/animation-tools/animations.webp',
    type: 'collection',
    price: 'free',
    license: 'free',
    licenseLabel: 'Free to read',
    platforms: ['web'],
    tags: ['vault', 'reference', 'inspiration', 'techniques'],
    addedAt: '2024-08-12',
    reviewedAt: '2026-10-06',
    isNew: true,
  },
]
