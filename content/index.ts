import type { IContent } from '@/types/content'
import { aitoolsLinks } from './aitools'
import { animationsLinks } from './animations'
import { colorsLinks } from './colors'
import { iconsLinks } from './icons'
import { inspirationLinks } from './inspiration'
import { localizationLinks } from './localization'
import { mockupsLinks } from './mockups'
import { toolsLinks } from './tools'
import { typographyLinks } from './typography'

export const contentLinks: Record<string, IContent[]> = {
  'typography': typographyLinks,
  'colors': colorsLinks,
  'tools': toolsLinks,
  'icons': iconsLinks,
  'ai-tools': aitoolsLinks,
  'animations': animationsLinks,
  'mockups': mockupsLinks,
  'inspiration': inspirationLinks,
  'localization': localizationLinks,
}
