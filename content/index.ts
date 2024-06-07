import { aitoolsLinks } from './aitools'
import { colorsLinks } from './colors'
import { iconsLinks } from './icons'
import { toolsLinks } from './tools'
import { typographyLinks } from './typography'
import type { IContent } from '@/types/content'

export const contentLinks: Record<string, IContent[]> = {
  'typography': typographyLinks,
  'colors': colorsLinks,
  'tools': toolsLinks,
  'icons': iconsLinks,
  'ai-tools': aitoolsLinks,
}
