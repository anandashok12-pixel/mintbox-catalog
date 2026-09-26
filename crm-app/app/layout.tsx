import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MintBox CRM',
  description: 'MintBox sales queue and deal pipeline',
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
