import './globals.css'
import { libreBaskerville } from './(main)/fonts'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found | MintBox',
  description: 'The page you are looking for does not exist.',
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className={libreBaskerville.variable}>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAF8F4',
          color: '#1A1A18',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <main style={{ maxWidth: 520, padding: '48px 24px', textAlign: 'center' }}>
          <p style={{ fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1B4D3E', margin: 0 }}>
            Error 404
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-libre-baskerville), Georgia, serif',
              fontSize: 'clamp(32px, 6vw, 44px)',
              lineHeight: 1.15,
              margin: '12px 0 16px',
            }}
          >
            This page is not here
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, margin: '0 0 28px', color: 'rgba(26,26,24,0.75)' }}>
            The link may be old or mistyped. Browse our catalogue or head back to the home page.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/catalog" style={{ padding: '12px 24px', borderRadius: 8, background: '#1B4D3E', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
              Browse catalogue
            </Link>
            <Link href="/" style={{ padding: '12px 24px', borderRadius: 8, border: '1px solid #1B4D3E', color: '#1B4D3E', textDecoration: 'none', fontWeight: 600 }}>
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}
