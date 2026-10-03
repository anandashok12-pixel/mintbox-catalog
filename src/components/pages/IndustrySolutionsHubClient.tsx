'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

const INDUSTRIES = [
  {
    emoji: '🚀',
    title: 'Corporate Gifts for Startups',
    desc: 'Culture-fit gifting for fast-growing teams - onboarding kits, milestone gifts, and founder-approved swag.',
    href: '/industry-solutions/startups',
  },
  {
    emoji: '💻',
    title: 'Corporate Gifts for Tech Companies',
    desc: 'Premium picks for engineering and product teams - practical, well-branded, and easy to order in bulk.',
    href: '/industry-solutions/tech-companies',
  },
]

export default function IndustrySolutionsHubClient() {
  return (
    <div className="cp-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://themintbox.in' },
              { '@type': 'ListItem', position: 2, name: 'Industry Solutions', item: 'https://themintbox.in/industry-solutions' },
            ],
          }),
        }}
      />
      <Navbar />

      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-container--narrow" style={{ position: 'relative', zIndex: 2, padding: '0 24px' }}>
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="cp-breadcrumb-sep">›</span>
            <span className="cp-breadcrumb-current">Industry Solutions</span>
          </nav>
          <div className="cp-hero-eyebrow">Solutions by Industry</div>
          <h1 className="cp-hero-title">Corporate Gifting,{' '}<br />Tailored to Your Industry</h1>
          <div className="cp-hero-rule" />
          <p className="cp-hero-sub">
            Gifting that fits how your industry actually works - from startup culture kits to
            enterprise-scale client gifting.
          </p>
        </div>
      </section>

      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <h2 className="cp-section-title">Find Your Industry</h2>
          <div className="cp-cards-grid cp-cards-grid--2">
            {INDUSTRIES.map(industry => (
              <a key={industry.href} href={industry.href} className="cp-card">
                <div className="cp-card-icon">{industry.emoji}</div>
                <div className="cp-card-title">{industry.title}</div>
                <p className="cp-card-desc">{industry.desc}</p>
                <span className="cp-card-tag">View solution</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <h2 className="cp-section-title" style={{ marginBottom: '28px' }}>Related Pages</h2>
          <div className="cp-related-grid">
            {[
              { label: 'By Role', title: 'Solutions for HR, Sales & Founders', href: '/solutions' },
              { label: 'Guides', title: 'All Corporate Gifting Guides', href: '/guides' },
              { label: 'Catalogue', title: 'Browse the Full Catalogue', href: '/catalog' },
              { label: 'Collections', title: 'Corporate Gift Collections', href: '/collections/corporate-gifts' },
            ].map(link => (
              <a key={link.href} href={link.href} className="cp-related-card">
                <div className="cp-related-card-label">{link.label}</div>
                <div className="cp-related-card-title">{link.title}</div>
                <div className="cp-related-card-arrow">→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
