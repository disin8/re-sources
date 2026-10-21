import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import { Sidebar } from '@/components/sidebar'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { ThemeProvider } from '@/components/theme-provider'
import { absoluteUrl, SITE_URL, siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'google354ef6537d2d6965.html',
    yandex: 'c81920c4302c67cd',
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl('/'),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    title: siteConfig.name,
    description: siteConfig.description,
    card: 'summary_large_image',
    creator: '@di_sin8',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0d' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': siteConfig.name,
  'alternateName': siteConfig.shortName,
  'url': SITE_URL,
  'description': siteConfig.description,
  'inLanguage': siteConfig.language,
  'publisher': {
    '@type': 'Person',
    'name': siteConfig.author.name,
    'url': siteConfig.author.url,
  },
  'potentialAction': {
    '@type': 'SearchAction',
    'target': `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang={siteConfig.language} suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--brand-solid)] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
            >
              Skip to content
            </a>
            <SiteHeader />
            <main id="main-content" className="h-full flex flex-row pt-[66px]">
              <Sidebar />
              <div className="px-[12px] py-8 h-full w-full md:ml-[250px] flex flex-col">
                <div className="flex-1">{children}</div>
                <SiteFooter />
              </div>
              <Analytics />
              <SpeedInsights />
              <AnalyticsTracker />
            </main>
          </ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
        </body>
      </html>
    </>
  )
}
