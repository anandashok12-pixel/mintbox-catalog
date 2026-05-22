import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
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
