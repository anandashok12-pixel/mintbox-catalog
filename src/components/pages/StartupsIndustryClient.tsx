'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import ContentProductShowcase from '@/components/content/ContentProductShowcase'
import FAQSection from '@/components/content/FAQSection'
import InlineQuoteForm from '@/components/content/InlineQuoteForm'
import QuickAnswerBox from '@/components/content/QuickAnswerBox'
import EATSignal from '@/components/content/EATSignal'
import LastUpdatedDate from '@/components/content/LastUpdatedDate'
import MidPageCTA from '@/components/content/MidPageCTA'

interface Category {
  id: string
  name: string
  emoji?: string | null
  slug: string
}

interface Product {
  id: string
  name: string
  price: number
  emoji?: string | null
  image?: { url?: string | null; sizes?: { card?: { url?: string | null } } } | null
  description: string
  features?: Array<{ feature: string; id?: string }> | null
  moq?: number | null
  customisable?: boolean | null
  inStock?: boolean | null
  category: Category | string
}

const USE_CASES = [
  {
    icon: '🎁',
    label: 'Employee Onboarding',
    sub: "Make Day 1 unforgettable. Welcome kits with notebooks, bottles, tees, and a handwritten card.",
    bg: 'cp-img-green',
  },
  {
    icon: '👕',
    label: 'Team Swag',
    sub: 'Branded hoodies, totes, caps and mugs that the team actually wants to wear.',
    bg: 'cp-img-gold',
  },
  {
    icon: '🤝',
    label: 'Investor & Client Gifting',
    sub: 'Premium hampers, curated kits for board meetings, demos, and partnership milestones.',
    bg: 'cp-img-warm',
  },
  {
    icon: '🚀',
    label: 'Launch & Event Giveaways',
    sub: 'Conference bags, seed packets, tees, and USBs for product launches and meetups.',
    bg: 'cp-img-mid',
  },
]

const BUDGET_TIERS = [
  {
    range: '₹250–₹500',
    stage: 'Seed stage',
    items: 'Eco notebooks, printed pens, tote + mug combo',
    note: 'Perfect for early team onboarding',
    featured: false,
  },
  {
    range: '₹500–₹1,500',
    stage: 'Series A/B',
    items: 'Quality bottles + notebooks + tee combo',
    note: 'The sweet spot for team gifts',
    featured: true,
  },
  {
    range: '₹1,500–₹2,500',
    stage: 'Growth stage',
    items: 'Premium hampers, hardcover notebooks, stainless drinkware + tech accessory',
    note: 'Impress investors and senior hires',
    featured: false,
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Share Your Brief',
    desc: 'Tell us your occasion (onboarding, event, client), team size, and budget per head.',
  },
  {
    num: '02',
    title: 'Culture Fit Curation',
    desc: "We shortlist 3 options that match your brand's values and aesthetic.",
  },
  {
    num: '03',
    title: 'Review Samples',
    desc: 'We courier physical samples before production (2–3 days).',
  },
  {
    num: '04',
    title: 'Approve & Produce',
    desc: 'Confirm, pay deposit, and we start production (7–10 days).',
  },
  {
    num: '05',
    title: 'Deliver',
    desc: 'Packaged gifts delivered to your office or individual addresses across India.',
  },
]

const COMPARISON_TABLE = [
  { aspect: 'MOQ', startup: '10–25 units', enterprise: '100–500 units' },
  { aspect: 'Budget/head', startup: '₹250–₹1,500', enterprise: '₹500–₹5,000' },
  { aspect: 'Turnaround', startup: '7–10 days', enterprise: '14–21 days' },
  { aspect: 'Personalisation', startup: 'Team name/logo', enterprise: 'Individual names' },
  { aspect: 'Packaging', startup: 'Minimal, cool', enterprise: 'Premium, corporate' },
  { aspect: 'Approval process', startup: 'Founder-led', enterprise: 'Committee approval' },
]

const FAQS = [
  {
    q: "What's the minimum order for startup gifting?",
    a: 'Most items have an MOQ of 10–25 units, designed for startups doing rolling onboarding or small team gifting. Some premium items (custom hoodies, hardcover notebooks) require 50 units minimum. Volume discounts start at 50+ units.',
  },
  {
    q: "What's a good budget per head for startup onboarding kits?",
    a: '₹500–₹1,500 per head is the sweet spot for most seed-to-Series B startups. At ₹750/head for a 20-person kit, you can include a quality notebook, bottle, and branded tee - gifts that feel intentional and premium, not generic.',
  },
  {
    q: "Can I get gifts that reflect my startup's brand values?",
    a: "Yes. Our culture-curation service helps you select items that align with your brand identity - sustainable options for ESG-conscious startups, tech accessories for product companies, minimalist stationery for design-forward brands. Share your brand guide and we'll match accordingly.",
  },
  {
    q: 'Do you handle repeat onboarding orders?',
    a: 'Absolutely. Many startup clients set up a standing order - we stock their onboarding kit items and dispatch in batches of 5–10 as new hires join. One setup, rolling fulfilment. Contact us to set up a recurring order account.',
  },
  {
    q: 'Can I include a personalised note or card with each kit?',
    a: 'Yes. Handwritten notes (from a note template you provide) and printed cards are standard. Digital gifting cards (email + physical) are also available for distributed teams.',
  },
  {
    q: 'Is GST invoicing available for startup purchases?',
    a: 'Yes. All orders come with GST-compliant invoices. Share your GSTIN for ITC eligibility. Net-30 payment terms are available for Series A+ startups with a PO.',
  },
]


export default function StartupsIndustryClient({
  products,
  categories,
}: {
  products: Product[]
  categories: Category[]
}) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Industry Solutions", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 3, "name": "Startups", "item": "https://themintbox.in/industry-solutions/startups" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Corporate Gifts for Startups: Build Culture, Not Just Swag",
        "description": "Startup-specific corporate gifting - onboarding kits, team swag, investor gifts. Budget-conscious, brand-forward, and fast. MOQ from 10 units. Bangalore & Pan-India.",
        "url": "https://themintbox.in/industry-solutions/startups",
        "dateModified": "2026-05-26T00:00:00+05:30",
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2, padding: '0 40px' }}>
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="cp-breadcrumb-sep">›</span>
            <a href="/industry-solutions">Industry Solutions</a>
            <span className="cp-breadcrumb-sep">›</span>
            <span className="cp-breadcrumb-current">Startups</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Industry Solutions · Startups & Scale-Ups</div>
              <h1 className="cp-hero-title">
                Corporate Gifts for Startups:<br />
                <em>Build Culture, Not Just Swag</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                Onboarding kits, team swag, investor gifts, and event giveaways - designed for fast-moving startups.
                MOQ from 10 units, transparent pricing, and turnaround in 7 days. No filler, no generic gifts.
              </p>
              <div className="cp-hero-ctas">
                <a href="#products" className="cp-hero-cta-primary">Browse Startup Gifts ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Get a Startup Quote</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ MOQ from 10 units</span>
                <span className="cp-hero-badge">✓ Culture-fit curation</span>
                <span className="cp-hero-badge">✓ 7-day turnaround</span>
                <span className="cp-hero-badge">✓ GST invoicing</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80" alt="Corporate gift packages ready for delivery" className="cp-hero-img-actual cp-hero-img-actual--tall" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80" alt="Branded merchandise corporate gift" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Startup team gifting celebration" className="cp-hero-img-actual" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AEO BAND ── */}
      <div className="cp-aeo-band">
        <div className="cp-container--narrow">
          <QuickAnswerBox
            title="Quick Answer"
            content="Corporate gifts for startups are culture-forward branded items - welcome kits, team hoodies, eco notebooks, and quality tech accessories - that communicate company values, not just logo placement. MOQ starts at 10 units for most items. Budget range: ₹250–₹2,500 per head. Turnaround is 7–12 days; express available."
          />
          <EATSignal
            credentials={[
              'MOQ from 10 units - perfect for fast-growing teams',
              '50+ startup clients across Bengaluru',
              'Culture-curation service: we match gifts to your brand values',
              'Same week turnaround for in-stock items',
              'GST invoicing, startup-friendly net-30 payment terms',
            ]}
          />
        </div>
      </div>


      {/* ── STATS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">10</div>
              <div className="cp-stat-unit">units</div>
              <div className="cp-stat-label">minimum order</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">7</div>
              <div className="cp-stat-unit">days</div>
              <div className="cp-stat-label">standard turnaround</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹250</div>
              <div className="cp-stat-unit">per head</div>
              <div className="cp-stat-label">starting budget</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">50+</div>
              <div className="cp-stat-unit">clients</div>
              <div className="cp-stat-label">startup clients served</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Use Cases</div>
          <h2 className="cp-section-title">What Startups Gift - and When</h2>
          <p className="cp-section-sub">
            From Day 1 welcome kits to investor hampers, every gifting moment is an opportunity to
            communicate your culture and brand.
          </p>
          <div className="cp-occasion-grid">
            {USE_CASES.map(uc => (
              <div key={uc.label} className="cp-occasion-card">
                <div className={`cp-img-placeholder ${uc.bg}`} style={{ height: '120px', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>
                  {uc.icon}
                </div>
                <div className="cp-occasion-overlay">
                  <div className="cp-occasion-label">{uc.label}</div>
                  <div className="cp-occasion-sub">{uc.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUDGET TIERS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Budget Guide</div>
          <h2 className="cp-section-title">Recommended Budgets by Stage</h2>
          <p className="cp-section-sub">
            What you can achieve at each funding stage - from seed through growth.
          </p>
          <div className="cp-tier-grid">
            {BUDGET_TIERS.map(tier => (
              <div
                key={tier.range}
                className={`cp-tier-cell ${tier.featured ? 'cp-tier-cell--featured' : ''}`}
              >
                <div className={`cp-tier-label ${tier.featured ? 'cp-tier-label--light' : 'cp-tier-label--dark'}`}>
                  {tier.stage}
                </div>
                <div className={`cp-tier-qty ${tier.featured ? 'cp-tier-qty--light' : 'cp-tier-qty--dark'}`}>
                  {tier.range}
                </div>
                <div className={`cp-tier-discount ${tier.featured ? '' : 'cp-tier-saving--muted'}`}>
                  {tier.items}
                </div>
                <div className={`cp-tier-desc ${tier.featured ? 'cp-tier-desc--light' : 'cp-tier-desc--dark'}`}>
                  {tier.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" alt="Startup team gifting and onboarding kits" loading="lazy" />
      </figure>

      {/* ── PRODUCT SHOWCASE ── */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Startup Gift Catalogue</div>
          <h2 className="cp-section-title">Browse Gifts for Startups</h2>
          <p className="cp-section-sub">
            Culture-forward branded gifts starting at MOQ 10. Filter by category or budget to find the
            right items for your team.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Corporate Gifts for Startups"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Our Process</div>
          <h2 className="cp-section-title">How Startup Gifting Works at MintBox</h2>
          <p className="cp-section-sub">
            From brief to delivery in 7–12 days. A simple, founder-friendly process with no committee
            sign-offs required.
          </p>
          <div className="cp-steps">
            {STEPS.map(step => (
              <div key={step.num} className="cp-step">
                <div className="cp-step-num">{step.num}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{step.title}</div>
                  <div className="cp-step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Startup vs Enterprise</div>
          <h2 className="cp-section-title">Startup Gifting vs Enterprise Gifting</h2>
          <p className="cp-section-sub">
            Startup gifting is different. Lower MOQs, faster decisions, and culture-first curation -
            not the same playbook as a 10,000-person corporate.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Startup Gifting</th>
                  <th>Enterprise Gifting</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map(row => (
                  <tr key={row.aspect}>
                    <td>{row.aspect}</td>
                    <td style={{ fontWeight: 500, color: 'var(--forest-green,#1B4D3E)' }}>{row.startup}</td>
                    <td style={{ fontWeight: 300 }}>{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── QUOTE PULL BAND ── */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <p className="cp-quote-band-text">
            "Your company culture starts on Day 1. The welcome kit isn't swag - it's a signal to your
            new hire about who you are."
          </p>
          <a href="#quote" className="cp-quote-band-cta">Build Your Onboarding Kit →</a>
        </div>
      </div>

      {/* ── CTA + FORM ── */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-cta-eyebrow">Startup Gifting</div>
            <h2 className="cp-cta-title">Build Your Startup<br />Gifting Programme</h2>
            <p className="cp-cta-sub">
              Share your occasion, team size, and budget. We will come back with 3 curated options
              and a quote within 4 hours.
            </p>
            <div className="cp-quote-form-panel" />
          </div>
          <InlineQuoteForm
            title="Build Your Startup Gifting Programme"
            subtitle="MOQ from 10 units. Tell us your occasion, team size, and budget - we'll curate and quote within 4 hours."
            ctaLabel="Get Startup Quote"
            defaultOccasion="welcome_kit"
          />
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* ── FAQ ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <FAQSection
            items={FAQS}
            title="Corporate Gifts for Startups - FAQs"
            eyebrow="FAQ"
          />
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title" style={{ marginBottom: '28px' }}>Related Pages</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Industry', title: 'Tech Companies Gifting', href: '/industry-solutions/tech-companies' },
              { label: 'Collections', title: 'Employee Welcome Kit', href: '/collections/employee-welcome-kit' },
              { label: 'Personalisation', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Bangalore', title: 'Same-Day Delivery Bangalore', href: '/bangalore-corporate-gifting/same-day-delivery' },
              { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
              { label: 'Budget Guide', title: 'Budget Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
              { label: 'Handbook', title: 'The Corporate Gifting Handbook', href: '/guides/corporate-gifting-handbook' },
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

      <div className="cp-container--narrow" style={{ padding: '0 24px' }}>
        <LastUpdatedDate date="2026-05-25" />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
