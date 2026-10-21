import { type NextRequest, NextResponse } from 'next/server'

const canonicalUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://re-sources.vercel.app').replace(/\/$/, '')
const canonicalHost = new URL(canonicalUrl).host
const isProduction = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production'

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '[::1]'])

function isLocalHost(host: string) {
  const hostname = host.split(':')[0]
  return LOCAL_HOSTS.has(hostname) || hostname.endsWith('.localhost')
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const requestHost = request.headers.get('host') ?? ''

  if (requestHost && !isLocalHost(requestHost) && requestHost !== canonicalHost) {
    const url = request.nextUrl.clone()
    url.host = canonicalHost
    url.protocol = canonicalUrl.startsWith('https') ? 'https' : 'http'
    url.pathname = pathname
    url.search = search
    return NextResponse.redirect(url, 301)
  }

  const response = NextResponse.next()

  if (!isProduction) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Run on every request except static assets and image files, which do not
     * need the canonical redirect and would only slow the response down.
     */
    '/((?!_next/static|_next/image|favicon.ico|logos|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml|webmanifest)$).*)',
  ],
}
