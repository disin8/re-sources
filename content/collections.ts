import type { Collection } from '@/types/content'

export const collections: Collection[] = [
  {
    slug: 'free-fonts-for-saas-landing-pages',
    title: 'Best Free Fonts for SaaS Landing Pages',
    description:
      'Free, commercial-use fonts that hold up in a hero headline, a pricing table and a product screenshot caption — plus the pairing rules that make them work together.',
    intro:
      'A landing page needs three typographic jobs done well: a headline that survives at large sizes, a UI face that stays legible at 14px, and a monospace for code and numbers. The fonts below cover those roles, are free for commercial use, and are variable where it matters — so you can set a whole scale from one file. The pairing notes explain which combinations are known to work.',
    resources: [
      'fontshare',
      'geist',
      'uncut',
    ],
    updatedAt: '2026-10-06',
  },
  {
    slug: 'tailwind-color-tools',
    title: 'Tailwind Color Tools and Palette Generators',
    description:
      'Tools for generating accessible palettes and exporting them straight into a Tailwind CSS theme, with contrast checking built in.',
    intro:
      'Tailwind ships a default palette, but the defaults are not tuned for every product — a dark interface often needs a ramp with different contrast at the extremes. These tools let you generate a custom ramp, verify it against WCAG, and export it as a theme.extend block or as CSS custom properties you can map onto Tailwind colour keys. Start with the tonal ramp generators, then validate with a contrast checker.',
    resources: [
      'ui-colors',
      'colourcontrast',
    ],
    updatedAt: '2026-10-05',
  },
  {
    slug: 'svg-icon-libraries-for-react',
    title: 'SVG Icon Libraries for React and Next.js',
    description:
      'Open-source icon sets that ship as tree-shakeable React components, with consistent geometry and permissive licences.',
    intro:
      'The important question with an icon set is not how many icons it has, but whether the package tree-shakes and whether the geometry stays consistent when you mix two sets. Every library below ships React components that accept SVG props for stroke width and colour. Pick one as your system set and treat the others as exceptions rather than as a second system.',
    resources: [
      'phosphor-icons',
      'feather-icons',
    ],
    updatedAt: '2026-10-05',
  },
  {
    slug: 'ai-tools-for-web-designers',
    title: 'AI Tools for Web Designers and Frontend Developers',
    description:
      'Generative tools that produce assets a web build can actually ship — editable vectors, imagery with readable text, and UI scaffolding.',
    intro:
      'The useful split in AI tooling is between generating a final asset and generating a starting point. Final-asset tools produce something you ship directly; starting-point tools produce something you refine. Both appear here, labelled with which they are. Note the licensing line on each card — free tiers from most of these providers do not grant commercial rights.',
    resources: [
      'midjourney',
      'krea',
    ],
    updatedAt: '2026-10-04',
  },
  {
    slug: 'free-mockup-generators',
    title: 'Free Mockup Generators for App Screenshots',
    description:
      'Generators that turn a URL or screenshot into a device mockup — free tiers, paid tiers and what each one is actually good at.',
    intro:
      'Most mockup needs are one of three things: a device frame around a screenshot, a browser window around a landing page, or a 3D render for a launch asset. Each generator below is listed with the case it handles best. Where a free tier allows the export without a watermark, that is noted on the card.',
    resources: [
      'shots',
      'mockuphone',
      'morflax',
    ],
    updatedAt: '2026-10-02',
  },
]
