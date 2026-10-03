'use client'

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
    sub: 'Tell us what you need and get a detailed quote. We reply within 1 hour on business days. Minimum order 10 units.',
    primary: { label: 'Request a quote →', href: '/contact' },
    secondary: { label: 'Chat on WhatsApp', href: 'https://wa.me/919886537631' },
    accent: '#b8972e',
  },
  catalog: {
    eyebrow: '500+ Curated Products',
    headline: 'Find the perfect gift for every occasion',
    sub: 'From Diwali hampers to onboarding kits - browse collections filtered by budget, occasion, and category.',
    primary: { label: 'View Full Catalog →', href: '/catalog' },
    secondary: { label: 'Request a quote', href: '/contact' },
    accent: '#4a7c59',
  },
  whatsapp: {
    eyebrow: 'Quick response on WhatsApp',
    headline: 'Questions? Ask us on WhatsApp.',
    sub: 'Chat directly with our gifting team on WhatsApp. No bots, no waiting, just real answers.',
    primary: { label: 'Chat on WhatsApp →', href: 'https://wa.me/919886537631' },
    secondary: { label: 'Request a quote', href: '/contact' },
    accent: '#25d366',
  },
  samples: {
    eyebrow: 'Before You Commit',
    headline: 'Order a sample kit first',
    sub: 'Receive physical samples of our top-rated products before finalising your bulk order. Shipped within 3 days.',
    primary: { label: 'Request a quote →', href: '/contact' },
    secondary: { label: 'View Catalog', href: '/catalog' },
    accent: '#b8972e',
  },
}

const external = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

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
          <a href={c.primary.href} {...external(c.primary.href)} className="cp-midcta-btn-primary" style={{ background: c.accent }}>{c.primary.label}</a>
          <a href={c.secondary.href} {...external(c.secondary.href)} className="cp-midcta-btn-secondary">{c.secondary.label}</a>
        </div>
      </div>
      <div className="cp-midcta-pattern" aria-hidden="true" />
    </section>
  )
}
