import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  // drizzle-kit is loaded at runtime by @payloadcms/drizzle's pushDevSchema
  // via a dynamic require. Without externalising it Turbopack tries to bundle
  // it into the serverless function and the dynamic path can't be resolved
  // ("Cannot find module 'drizzle-kit-<hash>/api'") — so the schema push
  // silently fails on Vercel. Marking it external keeps it in node_modules
  // for the function to require directly.
  serverExternalPackages: ['drizzle-kit'],
  // Redirect www → apex. NOTE: this only fires if the request actually
  // reaches the app. If www.themintbox.in 503s at the edge, the `www`
  // domain still needs to be added/assigned to this project in the Vercel
  // dashboard (Project → Domains) for this redirect to take effect.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.themintbox.in' }],
        destination: 'https://themintbox.in/:path*',
        permanent: true,
      },
    ]
  },
  images: {
    // AVIF first (smaller), WebP fallback for older browsers.
    formats: ['image/avif', 'image/webp'],
    // Cache optimized variants for 31 days — product images change rarely;
    // when they do, the source URL changes (new blob hash) so cache busts naturally.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      // Public Vercel Blob store (current)
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'public.blob.vercel-storage.com',
      },
      // Private Vercel Blob store (legacy — assets uploaded before store migration)
      {
        protocol: 'https',
        hostname: '*.private.blob.vercel-storage.com',
      },
      // Some legacy media docs store URLs that point back at the deployed app's
      // own /api/media/file/... route instead of the blob CDN. Allow the prod
      // host + Vercel preview deploys + localhost for dev.
      { protocol: 'https', hostname: 'mintbox-catalog.vercel.app' },
      { protocol: 'https', hostname: '*.vercel.app' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
}

export default withPayload(nextConfig)
