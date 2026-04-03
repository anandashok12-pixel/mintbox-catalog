import type { Metadata } from 'next'
import '../globals.css'

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
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@300;400;500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
