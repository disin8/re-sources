import type { IContent } from '@/types/content'

export const localizationToolsResources: IContent[] = [
  {
    slug: 'crowdin',
    name: 'Crowdin',
    description: 'Translation management with a generous free tier.',
    details:
      'Crowdin is the most accessible entry point into managed localisation: upload a source file, it extracts strings into a translation platform, and translations flow back as downloadable files. It handles over 40 file formats, has a glossary and a translation memory, and offers string-by-string in-context screenshots. The free tier covers open source projects and small volumes.',
    url: 'https://crowdin.com/',
    image: '/images/localization-tools/crowdin.webp',
    type: 'saas',
    price: 'freemium',
    license: 'proprietary',
    licenseLabel: 'Free tier, paid plans',
    platforms: ['web', 'api'],
    tags: ['translation management', 'glossary', 'memory', 'file formats'],
    addedAt: '2024-08-12',
    reviewedAt: '2026-09-25',
    featured: true,
  },
  {
    slug: 'gridly',
    name: 'Gridly',
    description: 'Content and translation management for product teams.',
    details:
      'Gridly pairs translation management with content management, so marketing copy, in-product content and UI strings can all be handled in one place. It supports more than 40 languages, includes a translation memory and glossary, and offers a Figma plugin so designers can send copy for translation without leaving the file. Worth a look when translation and content are handled by different people.',
    url: 'https://www.gridly.com/',
    image: '/images/localization-tools/gridly.webp',
    type: 'saas',
    price: 'freemium',
    license: 'proprietary',
    licenseLabel: 'Free tier, paid plans',
    platforms: ['web', 'figma', 'api'],
    tags: ['content management', 'figma', 'memory', 'glossary'],
    addedAt: '2024-08-12',
    reviewedAt: '2026-09-25',
    whiteBg: true,
  },
]
