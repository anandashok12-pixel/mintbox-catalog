import type { Metadata } from 'next'
import '../globals.css'
import './landing.css'

export const metadata: Metadata = {
  title: 'MintBox — Premium Corporate Gifting',
  description:
    'Curated corporate gifting packs for every occasion. Discover premium gifts, build your pack, and request custom pricing.',
  openGraph: {
    title: 'MintBox — Premium Corporate Gifting',
    description: 'Curated corporate gifting catalog with premium products.',
    siteName: 'MintBox',
  },
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Libre Baskerville — headings */}
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Satoshi — body */}
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
