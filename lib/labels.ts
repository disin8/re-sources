import type { IContent } from '@/types/content'

export const priceLabels: Record<IContent['price'], string> = {
  free: 'Free',
  freemium: 'Freemium',
  paid: 'Paid',
  subscription: 'Subscription',
}

export const typeLabels: Record<IContent['type'], string> = {
  'font-library': 'Font library',
  'generator': 'Generator',
  'saas': 'SaaS',
  'open-source': 'Open source',
  'plugin': 'Plugin',
  'collection': 'Collection',
  'marketplace': 'Marketplace',
}

export const platformLabels: Record<IContent['platforms'][number], string> = {
  'web': 'Web',
  'figma': 'Figma',
  'macos': 'macOS',
  'windows': 'Windows',
  'linux': 'Linux',
  'browser': 'Browser extension',
  'desktop': 'Desktop',
  'mobile': 'Mobile',
  'android': 'Android',
  'ios': 'iOS',
  'api': 'API',
  'cli': 'CLI',
  'ci': 'CI',
  'self-hosted': 'Self-hosted',
}

export const licenseLabels: Record<IContent['license'], string> = {
  'open-source': 'Open source',
  'commercial': 'Commercial use allowed',
  'personal': 'Personal use only',
  'proprietary': 'Proprietary',
  'free': 'Free to use',
}
