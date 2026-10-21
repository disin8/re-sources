export type ResourceType
  = | 'font-library'
    | 'generator'
    | 'saas'
    | 'open-source'
    | 'plugin'
    | 'collection'
    | 'marketplace'

export type PriceTier = 'free' | 'freemium' | 'paid' | 'subscription'

export type LicenseKind = 'open-source' | 'commercial' | 'personal' | 'proprietary' | 'free'

export type Platform
  = | 'web'
    | 'figma'
    | 'macos'
    | 'windows'
    | 'linux'
    | 'browser'
    | 'desktop'
    | 'mobile'
    | 'android'
    | 'ios'
    | 'api'
    | 'cli'
    | 'ci'
    | 'self-hosted'

export interface IContent {
  slug: string
  name: string
  description: string
  details: string
  url: string
  image?: string
  type: ResourceType
  price: PriceTier
  license: LicenseKind
  licenseLabel: string
  platforms: Platform[]
  tags: string[]
  addedAt: string
  reviewedAt: string
  featured?: boolean
  isNew?: boolean
  whiteBg?: boolean
}

export interface Category {
  slug: string
  navLabel: string
  title: string
  description: string
  intro: string[]
  icon: string
  keywords: string[]
  order: number
  faq: { question: string, answer: string }[]
}

export interface Collection {
  slug: string
  title: string
  description: string
  intro: string
  resources: string[]
  updatedAt: string
}
