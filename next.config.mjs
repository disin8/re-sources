/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // Legacy category slugs. These URLs are already indexed by Google, so they
      // must 301 to the canonical slugs rather than 404.
      { source: '/typography', destination: '/fonts', permanent: false, statusCode: 301 },
      { source: '/colors', destination: '/color-palettes', permanent: false, statusCode: 301 },
      { source: '/tools', destination: '/developer-tools', permanent: false, statusCode: 301 },
      { source: '/ai-tools', destination: '/ai-design-tools', permanent: false, statusCode: 301 },
      { source: '/animations', destination: '/animation-tools', permanent: false, statusCode: 301 },
      { source: '/inspiration', destination: '/design-inspiration', permanent: false, statusCode: 301 },
      { source: '/localization', destination: '/localization-tools', permanent: false, statusCode: 301 },
      { source: '/deploy', destination: '/deployment-tools', permanent: false, statusCode: 301 },
      { source: '/testing', destination: '/testing-tools', permanent: false, statusCode: 301 },

      // Legacy resource detail paths were served as /<category>/<slug>.
      { source: '/typography/:slug', destination: '/resources/:slug', permanent: false, statusCode: 301 },
      { source: '/colors/:slug', destination: '/resources/:slug', permanent: false, statusCode: 301 },
      { source: '/tools/:slug', destination: '/resources/:slug', permanent: false, statusCode: 301 },
      { source: '/ai-tools/:slug', destination: '/resources/:slug', permanent: false, statusCode: 301 },
      { source: '/animations/:slug', destination: '/resources/:slug', permanent: false, statusCode: 301 },
      { source: '/inspiration/:slug', destination: '/resources/:slug', permanent: false, statusCode: 301 },
      { source: '/localization/:slug', destination: '/resources/:slug', permanent: false, statusCode: 301 },
      { source: '/deploy/:slug', destination: '/resources/:slug', permanent: false, statusCode: 301 },
      { source: '/testing/:slug', destination: '/resources/:slug', permanent: false, statusCode: 301 },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      {
        source: '/feed.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600' }],
      },
      {
        source: '/api/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600' }],
      },
    ]
  },
}

export default nextConfig
