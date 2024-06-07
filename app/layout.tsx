import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { ThemeProvider } from '@/components/theme-provider'
import { Sidebar } from '@/components/sidebar'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SiteHeader />
            <main className="h-full flex flex-row pt-[66px]">
              <Sidebar />
              <div className="px-[12px] py-8 h-full w-full md:ml-[250px]">{children}</div>
              <Analytics />
              <SpeedInsights />
            </main>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
