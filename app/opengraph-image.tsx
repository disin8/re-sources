import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

export const alt = 're • sources — curated design resources for developers'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
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
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: '76px',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-2px',
              maxWidth: '960px',
            }}
          >
            Find the right design resource for your next project
          </div>
          <div
            style={{
              color: '#a3a3a3',
              fontSize: '34px',
              lineHeight: 1.35,
              maxWidth: '900px',
            }}
          >
            Fonts, colors, icons, AI tools, mockups and animations — filtered by license, price and use case.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', color: '#737373', fontSize: '26px' }}>
          <div style={{ display: 'flex', width: '8px', height: '8px', borderRadius: '999px', background: '#799dff' }} />
          <div style={{ display: 'flex' }}>
            {`${siteConfig.description.slice(0, 96)}...`}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
