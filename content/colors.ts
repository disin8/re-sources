import type { IContent } from '@/types/content'

export const colorsLinks: IContent[] = [
  {
    name: 'Colourcontrast',
    description: 'Awesome palette for free',
    url: 'https://colourcontrast.cc/',
    image: '/images/colors/colourcontrast.webp',
    optional: 'free',
  },
  {
    name: 'Shadergradient',
    description: 'Moving gradients',
    url: 'https://www.shadergradient.co/',
    image: '/images/colors/shadergradient.webp',
    optional: 'free',
    isNew: true,
  },
  {
    name: 'UIcolors',
    description: 'Tailwind CSS colors palette',
    url: 'https://uicolors.app/',
    image: '/images/colors/uicolors.webp',
    optional: 'free',
    whiteBg: true,
  },
  {
    name: 'Color Hunt',
    description: 'Hand-picked color palettes insipration',
    url: 'https://colorhunt.co/',
    image: '/images/colors/colorhunt.webp',
    optional: 'free',
    whiteBg: true,
  },
  {
    name: 'MagicPattern',
    description: 'Beatiful & cool background with 10+ tools',
    url: 'https://www.magicpattern.design/',
    image: '/images/colors/magicpattern.webp',
    optional: 'paid',
    whiteBg: true,
  },
]
