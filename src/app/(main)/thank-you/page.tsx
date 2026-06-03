import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

export const metadata: Metadata = {
  title: 'Thank You | MintBox',
  description: 'Your enquiry has been received. Our team will be in touch within 4 hours.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: '1.5rem' }}>🎁</div>
          <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, color: '#1B2A22', marginBottom: '1rem', lineHeight: 1.2 }}>
            We&apos;ve received your request
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#4B5563', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Our team will reach out within <strong>4 business hours</strong> with a tailored quote.
            Keep an eye on your inbox — or ping us on WhatsApp if you need a faster response.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            <a
              href="https://wa.me/918618237189"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#25D366', color: '#fff', padding: '0.8rem 1.8rem', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}
            >
              Chat on WhatsApp →
            </a>
            <Link
              href="/catalog"
              style={{ color: '#1B4D3E', fontSize: '0.9rem', textDecoration: 'underline' }}
            >
              Browse the catalog while you wait
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
