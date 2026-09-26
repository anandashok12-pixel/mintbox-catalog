'use client'

import { MIN_ORDER_UNITS, QUOTE_TIME, REPLY_TIME, SAMPLE_MIN_UNITS } from '@/lib/businessFacts'

type Variant = 'quote' | 'catalog' | 'whatsapp' | 'samples'

const CONFIG: Record<Variant, {
  eyebrow: string; headline: string; sub: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  accent: string;
}> = {
  quote: {
    eyebrow: 'Free Quote · No Commitments',
    headline: 'Ready to place an order?',
    sub: `Tell us what you need. We reply within ${REPLY_TIME} and send a priced quote within ${QUOTE_TIME}. Orders from ${MIN_ORDER_UNITS} units.`,
    primary: { label: 'Request a Free Quote →', href: '/contact' },
    secondary: { label: 'Browse Catalog', href: '/catalog' },
    accent: '#b8972e',
  },
  catalog: {
    eyebrow: '200+ Curated Products',
    headline: 'Find the perfect gift for every occasion',
    sub: 'From Diwali hampers to onboarding kits - browse collections filtered by budget, occasion, and category.',
    primary: { label: 'View Full Catalog →', href: '/catalog' },
    secondary: { label: 'Get a Quote', href: '/contact' },
    accent: '#4a7c59',
  },
  whatsapp: {
    eyebrow: `Quick Response · Reply within ${REPLY_TIME}`,
    headline: 'Questions? Talk to a real person.',
    sub: `Chat directly with our gifting team on WhatsApp. No bots, just real answers within ${REPLY_TIME}.`,
    primary: { label: 'Chat on WhatsApp →', href: 'https://wa.me/919886537631' },
    secondary: { label: 'Call Us Instead', href: 'tel:+919886537631' },
    accent: '#25d366',
  },
  samples: {
    eyebrow: 'Before You Commit',
    headline: 'Order a sample kit first',
    sub: `For orders of ${SAMPLE_MIN_UNITS}+ units, we send physical samples of your shortlisted products before you finalise. Shipped within 3 days.`,
    primary: { label: 'Request Sample Kit →', href: '/contact' },
    secondary: { label: 'View Catalog', href: '/catalog' },
    accent: '#b8972e',
  },
}

export default function MidPageCTA({ variant = 'quote' }: { variant?: Variant }) {
  const c = CONFIG[variant]
  return (
    <section className="cp-midcta">
      <div className="cp-midcta-accent-bar" style={{ background: c.accent }} />
      <div className="cp-midcta-inner">
        <p className="cp-midcta-eyebrow">{c.eyebrow}</p>
        <h2 className="cp-midcta-headline">{c.headline}</h2>
        <p className="cp-midcta-sub">{c.sub}</p>
        <div className="cp-midcta-actions">
          <a href={c.primary.href} className="cp-midcta-btn-primary" style={{ background: c.accent }}>{c.primary.label}</a>
          <a href={c.secondary.href} className="cp-midcta-btn-secondary">{c.secondary.label}</a>
        </div>
      </div>
      <div className="cp-midcta-pattern" aria-hidden="true" />
    </section>
  )
}
