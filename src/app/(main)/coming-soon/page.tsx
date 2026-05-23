import type { Metadata } from 'next'
import Link from 'next/link'
import '../landing.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Coming soon - MintBox',
  description: 'This page is on its way. Get in touch in the meantime.',
}

export default function ComingSoonPage() {
  return (
    <>
      <Navbar />
      <main style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '140px 1.5rem 80px',
        background: '#FAFAF7',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 520 }}>
          <div style={{
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold, #B8972E)',
            marginBottom: '1.25rem',
            fontWeight: 400,
          }}>Hold tight</div>
          <h1 style={{
            fontFamily: '"Libre Baskerville", serif',
            fontSize: 'clamp(40px, 5vw, 60px)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: 'var(--forest-deep, #122E25)',
            margin: '0 0 1.25rem',
            letterSpacing: '-0.01em',
          }}>Coming soon.</h1>
          <p style={{
            fontFamily: '"Satoshi", sans-serif',
            fontSize: 17,
            lineHeight: 1.7,
            color: '#444',
            margin: '0 0 2rem',
          }}>
            We&rsquo;re still setting this up. In the meantime, browse the catalogue or send us a
            message - we reply within four working hours.
          </p>
          <div style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <Link href="/catalog" className="hero-btn-primary">Browse catalogue</Link>
            <Link href="/contact" className="hero-btn-secondary">Get in touch</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
