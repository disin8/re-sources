import type { IContent } from '@/types/content'

export const deploymentToolsResources: IContent[] = [
  {
    slug: 'ngrok',
    name: 'ngrok',
    description: 'Exposes a local server over a public URL.',
    details:
      'ngrok creates a public URL that forwards to a port on your machine, which makes a local development server reachable for a client review, a webhook test or a colleague without deploying anything. It also captures and replays request logs, which turns webhook debugging from guesswork into a readable trail. The free tier allows one active endpoint; paid plans add reserved domains and more.',
    url: 'https://ngrok.com/',
    image: '/images/deployment-tools/ngrok.webp',
    type: 'saas',
    price: 'freemium',
    license: 'proprietary',
    licenseLabel: 'Free tier, paid plans',
    platforms: ['web', 'desktop', 'api'],
    tags: ['tunnel', 'webhooks', 'local server', 'logging'],
    addedAt: '2024-08-12',
    reviewedAt: '2026-09-25',
    isNew: true,
  },
]
