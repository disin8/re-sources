import type { Collection, IContent } from '@/types/content'
import { aiDesignToolsResources } from './ai-design-tools'
import { animationToolsResources } from './animation-tools'
import { collections } from './collections'
import { colorPalettesResources } from './color-palettes'
import { deploymentToolsResources } from './deployment-tools'
import { designInspirationResources } from './design-inspiration'
import { developerToolsResources } from './developer-tools'
import { fontsResources } from './fonts'
import { iconsLinks } from './icons'
import { localizationToolsResources } from './localization-tools'
import { mockupsLinks } from './mockups'
import { testingToolsResources } from './testing-tools'

export { collections } from './collections'

export const contentLinks: Record<string, IContent[]> = {
  'fonts': fontsResources,
  'color-palettes': colorPalettesResources,
  'developer-tools': developerToolsResources,
  'icons': iconsLinks,
  'ai-design-tools': aiDesignToolsResources,
  'animation-tools': animationToolsResources,
  'mockups': mockupsLinks,
  'design-inspiration': designInspirationResources,
  'localization-tools': localizationToolsResources,
  'deployment-tools': deploymentToolsResources,
  'testing-tools': testingToolsResources,
}

export const allResources: IContent[] = Object.values(contentLinks).flat(1)

const resourcesBySlug = new Map(allResources.map(resource => [resource.slug, resource]))

export function getResourcesByCategory(category: string): IContent[] {
  return contentLinks[category] ?? []
}

export function getResource(slug: string): IContent | undefined {
  return resourcesBySlug.get(slug)
}

export function getCategoryOfResource(resource: IContent): string | undefined {
  return Object.entries(contentLinks).find(([, resources]) => resources.some(item => item.slug === resource.slug))?.[0]
}

export function getCollections(): Collection[] {
  return collections
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find(collection => collection.slug === slug)
}

export function getCollectionResources(collection: Collection): IContent[] {
  return collection.resources
    .map(slug => resourcesBySlug.get(slug))
    .filter((resource): resource is IContent => Boolean(resource))
}

export function getNewestResources(limit = 4): IContent[] {
  return [...allResources]
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt) || b.reviewedAt.localeCompare(a.reviewedAt))
    .slice(0, limit)
}

export function getFeaturedResources(limit = 8): IContent[] {
  return allResources.filter(resource => resource.featured).slice(0, limit)
}

export function getLastReviewedAt(): string {
  return allResources.reduce(
    (latest, resource) => (resource.reviewedAt > latest ? resource.reviewedAt : latest),
    '',
  )
}

export const catalogStats = {
  resources: allResources.length,
  categories: Object.keys(contentLinks).length,
  collections: collections.length,
  free: allResources.filter(resource => resource.price === 'free').length,
  openSource: allResources.filter(resource => resource.license === 'open-source').length,
}
