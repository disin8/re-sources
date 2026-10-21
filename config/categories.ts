import type { Category } from '@/types/content'

export const categories: Category[] = [
  {
    slug: 'fonts',
    navLabel: 'Fonts',
    title: 'Free Fonts for Developers & Designers — Curated Font Library',
    description:
      'Browse hand-picked free and premium fonts for web projects, with license, variable font and pricing details for every family.',
    intro: [
      'Typography is the one decision every interface inherits. This list covers fonts that can be used in production without legal guesswork: each entry states the license, the pricing model and the formats you get.',
      'Use the filters to narrow the list by price, platform and use case — from variable fonts for design systems to pixel typefaces for technical interfaces.',
    ],
    icon: 'type',
    keywords: [
      'free fonts',
      'web fonts',
      'font library',
      'variable fonts',
      'commercial use fonts',
      'google fonts alternatives',
      'typeface foundry',
    ],
    order: 1,
    faq: [
      {
        question: 'Which font resources in this list are free for commercial use?',
        answer:
          'Every entry states its license explicitly. Entries marked "Commercial use allowed" can be shipped on client work without an extra fee, while paid foundries require a license per project.',
      },
      {
        question: 'Are variable fonts included?',
        answer:
          'Yes. Several of the listed libraries ship variable fonts with adjustable weight, width and optical size axes, which is the practical choice for design systems and performance budgets.',
      },
      {
        question: 'How often is this list checked?',
        answer:
          'Links and license terms are re-verified on a weekly cadence. Each card shows the date of the last manual check.',
      },
    ],
  },
  {
    slug: 'color-palettes',
    navLabel: 'Color palettes',
    title: 'Color Palettes & Tailwind Color Tools for Developers',
    description:
      'Accessible color palettes, contrast checkers and Tailwind CSS color generators — every tool states its license and pricing model upfront.',
    intro: [
      'Color is where design systems either hold together or fall apart. The tools here help you generate palettes, check contrast against WCAG thresholds and export tokens for Tailwind, CSS or Figma.',
      'Pick a generator for speed or a contrast checker for accessibility reviews — then export the result directly into the token format your project already uses.',
    ],
    icon: 'colors',
    keywords: [
      'color palettes',
      'tailwind css colors',
      'contrast checker',
      'accessible colors',
      'wcag contrast',
      'gradient generator',
      'color palette generator',
    ],
    order: 2,
    faq: [
      {
        question: 'Do these tools check WCAG contrast ratios?',
        answer:
          'Yes. The dedicated contrast checkers validate foreground and background pairs against WCAG 2.1 AA and AAA thresholds for normal and large text.',
      },
      {
        question: 'Can I export palettes for Tailwind CSS?',
        answer:
          'Several entries export ready-to-paste Tailwind color scales, CSS custom properties or design tokens in JSON format.',
      },
    ],
  },
  {
    slug: 'developer-tools',
    navLabel: 'Developer tools',
    title: 'Free Developer Tools for Web Projects — Curated Toolkit',
    description:
      'Everyday utilities for frontend work: converters, image optimizers, browser support tables, scheduling APIs and form builders that developers actually keep open.',
    intro: [
      'Small utilities that save a lookup: format converters, image optimizers, browser compatibility tables and product APIs you can call in an afternoon.',
      'Each entry lists what it does, what it costs and whether a free tier is enough for a side project.',
    ],
    icon: 'tools',
    keywords: [
      'developer tools',
      'free online tools',
      'image optimizer',
      'browser support',
      'file converter',
      'scheduling api',
      'form builder',
    ],
    order: 3,
    faq: [
      {
        question: 'Do these tools require an account?',
        answer:
          'Most of the single-purpose utilities work without registration. The APIs and form builders listed here do require a free account before you can use them in production.',
      },
      {
        question: 'Can I self-host any of these?',
        answer:
          'The open-source entries are marked as such in the license column and can be self-hosted. The rest are hosted services with their own terms.',
      },
    ],
  },
  {
    slug: 'icons',
    navLabel: 'Icons',
    title: 'Free SVG Icons, Icon Libraries & Icon Tools',
    description:
      'SVG icon sets, Figma plugins and icon managers with clear licensing — find icons you can ship in a commercial project without a second license round.',
    intro: [
      'Icons are a licensing minefield: a set that looks free may forbid commercial use. Every entry here states the license before you download anything.',
      'Browse static SVG sets, animated icon libraries, Figma plugins and desktop managers for building a consistent icon system.',
    ],
    icon: 'icons',
    keywords: [
      'svg icons',
      'free icon library',
      'icon set',
      'animated icons',
      'figma icon plugin',
      'icon manager',
      'open source icons',
    ],
    order: 4,
    faq: [
      {
        question: 'Which icon sets are open source?',
        answer:
          'Entries with an MIT or equivalent license in the license column can be used in commercial products, including paid ones, without further permission.',
      },
      {
        question: 'Do any of these include animated icons?',
        answer:
          'Yes — one of the listed libraries focuses on animated SVG icons that can be triggered by hover, scroll or click.',
      },
    ],
  },
  {
    slug: 'ai-design-tools',
    navLabel: 'AI design tools',
    title: 'AI Design Tools for Images, Video and Interface Mockups',
    description:
      'AI generators for imagery, video and interface concepts, compared by pricing model and output format so you know what you pay for before you render.',
    intro: [
      'AI tooling moves fast, so this list focuses on what each service actually produces: still images, video, upscaling or style references — and what it costs per month.',
      'Use it for concept work, placeholder art and moodboards. For production UI, the mockup and icon categories are usually the faster path.',
    ],
    icon: 'aitools',
    keywords: [
      'ai image generator',
      'ai video tools',
      'ai design tools',
      'text to image',
      'ai mockup generator',
      'generative ai for designers',
    ],
    order: 5,
    faq: [
      {
        question: 'Do these tools have free tiers?',
        answer:
          'Most offer a limited free tier with watermarked or lower-resolution output. The pricing column marks which ones are usable for free without a subscription.',
      },
      {
        question: 'Can I use AI-generated assets commercially?',
        answer:
          'That depends on the provider and your plan, so check the terms of the service you pick. This list does not replace reading those terms.',
      },
    ],
  },
  {
    slug: 'animation-tools',
    navLabel: 'Animation tools',
    title: 'Web Animation Libraries & Micro-interaction Tools',
    description:
      'Libraries and reference vaults for UI animation: scroll effects, transitions and micro-interactions, with the framework and licensing details included.',
    intro: [
      'Animation is the difference between an interface that feels solid and one that feels like a template. These entries cover the libraries and the reference material worth studying.',
      'Each one lists the framework it targets, the license and whether the pricing model fits an indie project.',
    ],
    icon: 'activity',
    keywords: [
      'web animation',
      'animation library',
      'micro-interactions',
      'scroll animations',
      'motion design',
      'react animation',
    ],
    order: 6,
    faq: [
      {
        question: 'Do these work with React and Tailwind?',
        answer:
          'Most of them are framework-agnostic or ship a React binding, and the tags on each card show the stack it is used with.',
      },
      {
        question: 'Is animation on the web worth the performance cost?',
        answer:
          'Short, GPU-friendly transitions on transform and opacity are cheap. The listed references focus on that style of motion rather than heavy scroll hijacking.',
      },
    ],
  },
  {
    slug: 'mockups',
    navLabel: 'Mockups',
    title: 'Device Mockups, Screenshots & Presentation Mockup Generators',
    description:
      'Generate device mockups, app screenshots and branded presentations in minutes — compare pricing, formats and licensing for every generator.',
    intro: [
      'Mockups are how a design becomes shareable. This list covers browser and device frames, app store screenshot generators and branded presentation kits.',
      'All generators here can be tested before you pay, and each card shows the pricing model and the output formats you get.',
    ],
    icon: 'wallpaper',
    keywords: [
      'device mockup',
      'app screenshot generator',
      'mockup generator',
      'ui mockup',
      'presentation mockup',
      'branding mockup',
    ],
    order: 7,
    faq: [
      {
        question: 'Can I generate mockups without Photoshop?',
        answer:
          'Yes. Every entry in this list runs in the browser: pick a frame, drop in a screenshot and export a PNG or a layered template.',
      },
      {
        question: 'Can I upload my own device frames?',
        answer:
          'Several generators support custom frames or your own device models, which matters if you ship a product on hardware that is not in the default library.',
      },
    ],
  },
  {
    slug: 'design-inspiration',
    navLabel: 'Design inspiration',
    title: 'Web Design Inspiration, Award Sites & Interaction Demos',
    description:
      'Awarded websites, curated interaction demos and case studies — sources of layout, typography and motion ideas for the next project you ship.',
    intro: [
      'Inspiration is a dependency, not a shortcut. These sites are organised by what you need: award winners, interaction demos, or curated collections of techniques.',
      'Every entry is free to browse and states whether it allows commercial reuse of the showcased work.',
    ],
    icon: 'inspiration',
    keywords: [
      'web design inspiration',
      'website awards',
      'ui inspiration',
      'interaction design examples',
      'landing page inspiration',
      'codepen inspiration',
    ],
    order: 8,
    faq: [
      {
        question: 'Can I reuse the work I find on these sites?',
        answer:
          'You can look, but copying a showcased site is not the same as using a licensed asset. Use these for direction, and the fonts, icons and mockup tools here for production.',
      },
      {
        question: 'How do I keep track of the ideas I find?',
        answer:
          'Use the browser or bookmarking tool of your choice. The catalogs in the other categories are for assets you are allowed to ship.',
      },
    ],
  },
  {
    slug: 'localization-tools',
    navLabel: 'Localization tools',
    title: 'Localization & Translation Management Tools',
    description:
      'Platforms for translating, reviewing and shipping product copy, compared on pricing model, integrations and translation memory support.',
    intro: [
      'Localization is a product problem before it is a translation problem. These platforms cover string management, translator workflows and release tracking.',
      'Each entry states the pricing model and whether a free tier is enough for a small product.',
    ],
    icon: 'localization',
    keywords: [
      'localization tools',
      'translation management',
      'i18n platform',
      'translate website',
      'translation memory',
      'string management',
    ],
    order: 9,
    faq: [
      {
        question: 'Do these platforms support translation memory and glossaries?',
        answer:
          'Yes. Reusing previous translations is the main cost lever for multilingual products, and the entries here support reusable terminology and context.',
      },
      {
        question: 'Which one fits a small team?',
        answer:
          'Both entries listed here have free tiers for small projects, with paid plans unlocking more translators, seats and integrations.',
      },
    ],
  },
  {
    slug: 'deployment-tools',
    navLabel: 'Deployment tools',
    title: 'Deployment Tunnels & Preview Environments for Web Apps',
    description:
      'Expose local servers to the internet and give reviewers a shareable URL — the tooling that makes design review and client handoff painless.',
    intro: [
      'A preview URL ends the "let me pull that branch" loop. The tools here turn a local dev server into a shareable HTTPS link, with notes on pricing and limits.',
      'They pair well with the mockup and testing sections when a client needs to review a build before it ships.',
    ],
    icon: 'rocket',
    keywords: [
      'deployment tunnel',
      'preview url',
      'share local server',
      'staging environment',
      'ngrok alternative',
      'client review link',
    ],
    order: 10,
    faq: [
      {
        question: 'Can I share a local server without a VPS?',
        answer:
          'Yes. These services create a public HTTPS URL that forwards to a port on your machine, which is enough for design review and quick client sign-off.',
      },
      {
        question: 'Is there a free tier?',
        answer:
          'There is a free tier with bandwidth limits, which suits occasional reviews. Continuous traffic needs a paid plan.',
      },
    ],
  },
  {
    slug: 'testing-tools',
    navLabel: 'Testing tools',
    title: 'Cross-Browser, Real Device & App Testing Tools',
    description:
      'Test in real browsers and on physical devices: cloud device labs, browser farms and mobile app testing with clear pricing and coverage details.',
    intro: [
      'A layout that works in your browser and breaks on a real Android device is not done. These tools let you check the matrix before your users do.',
      'Each entry lists what the service covers — browsers, real devices, app automation — and how the pricing scales.',
    ],
    icon: 'testing',
    keywords: [
      'cross-browser testing',
      'browser testing',
      'real device testing',
      'mobile app testing',
      'screenshot testing',
      'device lab',
    ],
    order: 11,
    faq: [
      {
        question: 'Do these run on real devices or emulators?',
        answer:
          'Both kinds are covered. Cloud device labs run on physical hardware, while browser farms run on virtualised browser engines — the card tags say which one a service provides.',
      },
      {
        question: 'Is a free plan enough for a small team?',
        answer:
          'For occasional checks, yes. Continuous testing across a device matrix needs a paid seat-based plan.',
      },
    ],
  },
]

export const categorySeoTitles: Record<string, string> = {
  'fonts': 'Free Fonts for Developers & Designers',
  'color-palettes': 'Color Palettes & Tailwind Color Tools',
  'developer-tools': 'Free Developer Tools for Web Projects',
  'icons': 'Free SVG Icons & Icon Libraries',
  'ai-design-tools': 'AI Design Tools for Images & Video',
  'animation-tools': 'Web Animation Libraries & Micro-interactions',
  'mockups': 'Device Mockups & Screenshot Generators',
  'design-inspiration': 'Web Design Inspiration & Award Sites',
  'localization-tools': 'Localization & Translation Management',
  'deployment-tools': 'Deployment Tunnels & Preview Environments',
  'testing-tools': 'Cross-Browser & Real Device Testing Tools',
}

export const categorySlugs = categories.map(category => category.slug)

export function getCategory(slug: string) {
  return categories.find(category => category.slug === slug)
}
