import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  images: {
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
    ],
  },
}

export default withPayload(nextConfig)
