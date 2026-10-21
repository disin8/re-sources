import { ImageResponse } from 'next/og'
import { categories, getCategory } from '@/config/categories'

export const alt = 're • sources'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function CategoryOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategory(slug)

  if (!category) {
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

  const count = categories.find(item => item.slug === slug)?.order ?? 0

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
              padding: '12px 28px',
              color: '#f5f5f5',
              fontSize: '30px',
              letterSpacing: '1px',
            }}
          >
            RE • SOURCES
          </div>
          <div style={{ display: 'flex', color: '#737373', fontSize: '28px' }}>
            {'/ '}
            {category.navLabel.toLowerCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: '74px',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-2px',
              maxWidth: '1000px',
            }}
          >
            {category.title}
          </div>
          <div style={{ color: '#a3a3a3', fontSize: '32px', lineHeight: 1.35, maxWidth: '940px' }}>
            {category.description}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', color: '#737373', fontSize: '26px' }}>
          <div style={{ display: 'flex', width: '8px', height: '8px', borderRadius: '999px', background: '#799dff' }} />
          <div style={{ display: 'flex' }}>{`Curated design resources for developers · category ${count} of ${categories.length}`}</div>
        </div>
      </div>
    ),
    size,
  )
}
