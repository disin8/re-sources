'use client'

import { track } from '@vercel/analytics'
import { useEffect } from 'react'

export function AnalyticsTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const link = target.closest<HTMLAnchorElement>('a[data-resource-slug]')
      if (!link) {
        return
      }

      track('resource_click', {
        slug: link.dataset.resourceSlug ?? '',
        category: link.dataset.resourceCategory ?? '',
        price: link.dataset.resourcePrice ?? '',
        license: link.dataset.resourceLicense ?? '',
        position: link.dataset.resourcePosition ?? '',
      })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
