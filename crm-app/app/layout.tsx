import type { Metadata, Viewport } from 'next'
import { PwaSetup } from '@/components/PwaSetup'
import './globals.css'

export const metadata: Metadata = {
  title: 'MintBox CRM',
  description: 'MintBox sales queue and deal pipeline',
  robots: { index: false, follow: false },
  applicationName: 'MintBox CRM',
  appleWebApp: { capable: true, title: 'MintBox CRM', statusBarStyle: 'black-translucent' },
}

export const viewport: Viewport = {
  themeColor: '#22223f',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <PwaSetup />
      </body>
    </html>
  )
}
