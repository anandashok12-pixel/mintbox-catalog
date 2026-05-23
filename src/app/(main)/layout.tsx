import type { Metadata } from 'next'
import '../globals.css'
import './landing.css'
import { libreBaskerville } from './fonts'

export const metadata: Metadata = {
  title: 'MintBox - Premium Corporate Gifting',
  description:
    'Curated corporate gifting packs for every occasion. Discover premium gifts, build your pack, and request custom pricing.',
  openGraph: {
    title: 'MintBox - Premium Corporate Gifting',
    description: 'Curated corporate gifting catalog with premium products.',
    siteName: 'MintBox',
  },
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={libreBaskerville.variable}>
      <head>
        {/* Satoshi (body) - not on Google Fonts, served by Fontshare.
            preconnect lets the browser open the TLS/DNS in parallel with the HTML parse. */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
