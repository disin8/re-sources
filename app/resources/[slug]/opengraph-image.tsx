import { ImageResponse } from 'next/og'
import { getCategory } from '@/config/categories'
import { getResource } from '@/content'
import { priceLabels } from '@/lib/labels'

export const alt = 'Design resource'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function ResourceOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const resource = getResource(slug)

  if (!resource) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0d0d0d',
            color: '#ffffff',
            fontSize: '64px',
            fontFamily: 'sans-serif',
          }}
        >
          re • sources
        </div>
      ),
      size,
    )
  }

  const category = getCategory(resource.slug)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0d0d0d',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              border: '2px solid #3a3a3a',
              borderRadius: '999px',
              padding: '10px 24px',
              color: '#f5f5f5',
              fontSize: '26px',
              letterSpacing: '1px',
            }}
          >
            RE • SOURCES
          </div>
          {category && (
            <div style={{ display: 'flex', color: '#737373', fontSize: '26px' }}>
              {'/ '}
              {category.navLabel.toLowerCase()}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: '80px',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-2px',
              maxWidth: '1040px',
            }}
          >
            {resource.name}
          </div>
          <div style={{ color: '#a3a3a3', fontSize: '32px', lineHeight: 1.35, maxWidth: '980px' }}>
            {resource.description}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              display: 'flex',
              background: '#799dff',
              color: '#ffffff',
              borderRadius: '999px',
              padding: '10px 22px',
              fontSize: '24px',
            }}
          >
            {priceLabels[resource.price]}
          </div>
          <div
            style={{
              display: 'flex',
              border: '2px solid #3a3a3a',
              color: '#d4d4d4',
              borderRadius: '999px',
              padding: '10px 22px',
              fontSize: '24px',
            }}
          >
            {resource.licenseLabel}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
