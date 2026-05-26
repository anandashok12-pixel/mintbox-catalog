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
  category: { id: string; name: string; emoji?: string | null; slug: string } | string
}

const SUBCATEGORIES = [
  {
    icon: '⚡',
    bg: 'cp-img-green',
    title: 'Wireless Chargers',
    desc: '10W fast charge, pad print or laser engrave. ₹400–₹1,200.',
  },
  {
    icon: '🔌',
    bg: 'cp-img-gold',
    title: 'Cable Kits',
    desc: '3-in-1 cables and organiser pouches - practical for every desk. ₹250–₹600.',
  },
  {
    icon: '💾',
    bg: 'cp-img-warm',
    title: 'USB Drives',
    desc: '4GB–64GB, metal body, laser engraved logo. ₹100–₹400.',
  },
  {
    icon: '💻',
    bg: 'cp-img-mid',
    title: 'Laptop Accessories',
    desc: 'Stands, keyboard rests, mouse pads - all brandable. ₹300–₹1,500.',
  },
  {
    icon: '🎧',
    bg: 'cp-img-green',
    title: 'Earphones',
    desc: 'Wired and wireless Bluetooth earbuds with logo print. ₹500–₹3,000.',
  },
  {
    icon: '🔋',
    bg: 'cp-img-gold',
    title: 'Power Banks',
    desc: '5,000mAh–20,000mAh, logo printed, pan-India delivery. ₹600–₹2,500.',
  },
]

const OCCASIONS_TABLE = [
  { occasion: 'Employee Onboarding', gift: 'Cable kit + notebook', budget: '₹400–₹800', moq: '10' },
  { occasion: 'Work Anniversary', gift: 'Engraved wireless charger', budget: '₹600–₹1,500', moq: '1' },
  { occasion: 'Diwali', gift: 'Power bank + earbuds combo', budget: '₹1,000–₹2,500', moq: '25' },
  { occasion: 'Client Appreciation', gift: 'Premium laptop stand + accessories', budget: '₹1,500–₹4,000', moq: '1' },
  { occasion: 'Conference', gift: 'USB drive + branded pouch', budget: '₹200–₹500', moq: '50' },
  { occasion: 'Team Celebration', gift: 'Wireless charger + cable kit', budget: '₹700–₹1,500', moq: '10' },
]

const BULK_TIERS = [
  { qty: '25–49 units', discount: 'Base pricing', desc: 'Standard rate, all options available', featured: false },
  { qty: '50–99 units', discount: '8–12% off', desc: 'Good for team gifts and seasonal runs', featured: false },
  { qty: '100–249 units', discount: '15–22% off', desc: 'Most popular range for Diwali and onboarding', featured: true },
  { qty: '250+ units', discount: '25–35% off', desc: 'Enterprise bulk pricing, dedicated PM', featured: false },
]

const FAQS = [
  {
    q: 'Are the electronics in the tech gifts certified and safe?',
    a: 'Yes. All electronics (chargers, earbuds, power banks) carry CE marking and comply with BIS standards for India. We provide product safety certificates on request for corporate procurement.',
  },
  {
    q: 'Can I get custom engravings on tech accessories?',
    a: 'Laser engraving is available on metal items (USB drives, wireless chargers, laptop stands, power banks). Pad printing and screen printing are available on plastic items. Engravings are permanent and do not affect device functionality.',
  },
  {
    q: "What's the warranty on electronic gifts?",
    a: 'All electronics carry a 6-month or 1-year warranty depending on the product. Warranty cards are included in packaging. Claims are handled directly through MintBox - no need to involve end recipients in the process.',
  },
  {
    q: 'Can I customise the packaging for tech gifts?',
    a: 'Yes. Tech gifts can be packed in branded rigid boxes, custom foam inserts, or individual branded pouches. For premium client gifts, we recommend a rigid magnetic-closure box with custom foam - it elevates perceived value significantly.',
  },
  {
    q: 'What tech gifts work for remote employees?',
    a: "Cable kits, portable power banks, wireless chargers, and noise-cancelling earbuds are all excellent remote-work gifts. They're practical for home offices and shipped individually to employee addresses with personalised notes.",
  },
  {
    q: 'What budget should I plan per head for tech gifts?',
    a: '₹400–₹800 per head for solid tech accessories (cable kit or wireless charger); ₹800–₹2,000 for premium combos (earbuds + charger); ₹2,000–₹5,000 for VIP gifting (premium earbuds, laptop stand). Tech gifts have higher perceived value than equivalent-priced drinkware.',
  },
]


export default function TechGiftsCollectionClient({ products }: { products: Product[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Collections", "item": "https://themintbox.in/collections/corporate-gifts" },
          { "@type": "ListItem", "position": 3, "name": "Tech Gifts", "item": "https://themintbox.in/collections/tech-gifts" },
        ]
      }) }} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2, padding: '0 40px' }}>
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="cp-breadcrumb-sep">›</span>
            <a href="/collections/corporate-gifts">Collections</a>
            <span className="cp-breadcrumb-sep">›</span>
            <span className="cp-breadcrumb-current">Tech Gifts</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Category · Tech Accessories</div>
              <h1 className="cp-hero-title">
                Corporate Tech Gifts: Gadgets &amp; Accessories<br />
                <em>for Modern Teams</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                Premium branded tech gifts for IT companies, product teams, and remote workers - wireless chargers,
                cable organisers, USB drives, laptop accessories, and noise-cancelling earbuds. Logo-engraved from 25 units.
              </p>
              <div className="cp-hero-ctas">
                <a href="#products" className="cp-hero-cta-primary">Browse Tech Gifts ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ 35+ tech SKUs</span>
                <span className="cp-hero-badge">✓ Laser engraving available</span>
                <span className="cp-hero-badge">✓ From ₹150/unit</span>
                <span className="cp-hero-badge">✓ Premium gifting</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Fast same-day corporate gift delivery" className="cp-hero-img-actual cp-hero-img-actual--tall" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=800&q=80" alt="Premium tech gadget corporate gift" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Laptop and tech corporate gift set" className="cp-hero-img-actual" loading="lazy" />
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
            content="Corporate tech gifts include branded wireless chargers (₹400–₹1,200), cable kits (₹250–₹600), USB drives (₹100–₹400), laptop stands (₹500–₹1,500), and Bluetooth earbuds (₹800–₹3,000). All available with laser engraving or pad printing. MOQ is 25 units. Tech gifts are particularly effective for IT companies and distributed teams."
          />
          <EATSignal
            credentials={[
              '35+ tech accessory SKUs',
              'Laser engraving on metal/premium items',
              'Tested and certified electronics (CE/BIS)',
              'Premium gifting from ₹400–₹5,000/head',
              'Remote team delivery across India',
            ]}
          />
        </div>
      </div>


      {/* ── STATS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">35+</div>
              <div className="cp-stat-unit">SKUs</div>
              <div className="cp-stat-label">tech accessories</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹150</div>
              <div className="cp-stat-unit">per unit</div>
              <div className="cp-stat-label">starting price</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">25</div>
              <div className="cp-stat-unit">units</div>
              <div className="cp-stat-label">minimum order</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">✓</div>
              <div className="cp-stat-unit">available</div>
              <div className="cp-stat-label">laser engraving</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUB-CATEGORIES ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">What We Offer</div>
          <h2 className="cp-section-title">Tech Gift Categories</h2>
          <p className="cp-section-sub">
            Six categories of branded tech accessories - each with logo customisation options and volume pricing.
            Mix and match for curated gift sets or order individual categories at scale.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {SUBCATEGORIES.map(cat => (
              <div key={cat.title} className="cp-card">
                <div className={`cp-card-icon ${cat.bg}`} style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {cat.icon}
                </div>
                <div className="cp-card-title">{cat.title}</div>
                <div className="cp-card-desc">{cat.desc}</div>
              </div>
            ))}
          </div>
          <figure className="cp-editorial-img">
            <img src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1200&q=80" alt="Premium tech corporate gifts including wireless chargers, earbuds and USB drives" loading="lazy" />
          </figure>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Product Catalogue</div>
          <h2 className="cp-section-title">Browse Tech Gifts</h2>
          <p className="cp-section-sub">
            Filter by product type or search by name. Add items to your quote - we confirm pricing and availability within 2 hours.
          </p>
          <ContentProductShowcase
            products={products}
            categories={[]}
            heading="Corporate Tech Gifts - Wireless Chargers, Earbuds, USB Drives & More"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* ── OCCASIONS TABLE ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Gift by Occasion</div>
          <h2 className="cp-section-title">Tech Gifts for Every Corporate Occasion</h2>
          <p className="cp-section-sub">
            The right tech gift depends on the occasion, recipient, and budget. Use this table as a starting point.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Occasion</th>
                  <th>Recommended Gift</th>
                  <th>Budget</th>
                  <th>MOQ</th>
                </tr>
              </thead>
              <tbody>
                {OCCASIONS_TABLE.map(row => (
                  <tr key={row.occasion}>
                    <td>{row.occasion}</td>
                    <td style={{ fontWeight: 400 }}>{row.gift}</td>
                    <td>
                      <span className="cp-table-badge cp-table-badge--yes">{row.budget}</span>
                    </td>
                    <td style={{ fontWeight: 300 }}>{row.moq} units</td>
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
            "A wireless charger with your logo sits on an engineer's desk, in plain sight, 8 hours a day.
            That's 2,000+ brand impressions a year from one ₹600 gift."
          </p>
          <a href="#quote" className="cp-quote-band-cta">Get Tech Gift Pricing →</a>
        </div>
      </div>

      {/* ── BULK TIERS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Volume Pricing</div>
          <h2 className="cp-section-title">Bulk Discounts on Tech Gifts</h2>
          <p className="cp-section-sub">
            Volume discounts apply automatically across the tech catalogue. Mix SKUs within a category to qualify for the same tier.
          </p>
          <div className="cp-tier-grid">
            {BULK_TIERS.map(tier => (
              <div key={tier.qty} className={`cp-tier-cell${tier.featured ? ' cp-tier-cell--featured' : ''}`}>
                <div className="cp-tier-qty">{tier.qty}</div>
                <div className="cp-tier-discount">{tier.discount}</div>
                <div className="cp-tier-desc">{tier.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + FORM ── */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-cta-eyebrow">Tech Gifts</div>
            <h2 className="cp-cta-title">Get Tech Gift<br />Pricing</h2>
            <p className="cp-cta-sub">
              Share your quantity, occasion, and preferred budget. We will send you a curated shortlist
              with bulk pricing within 2 hours.
            </p>
            <div className="cp-quote-form-panel" />
          </div>
          <InlineQuoteForm
            title="Get Tech Gift Pricing"
            subtitle="Tell us your quantity and occasion - we will send curated options with bulk pricing."
            ctaLabel="Request Tech Quote"
            defaultOccasion="welcome_kit"
          />
        </div>
      </section>

      <MidPageCTA variant="catalog" />

      {/* ── FAQ ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <FAQSection
            items={FAQS}
            title="Corporate Tech Gifts - FAQs"
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
              { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
              { label: 'Collections', title: 'Branded Drinkware', href: '/collections/drinkware' },
              { label: 'Industry', title: 'Gifting for Startups', href: '/industry-solutions/startups' },
              { label: 'Industry', title: 'Gifting for Tech Companies', href: '/industry-solutions/tech-companies' },
              { label: 'Guides', title: 'Corporate Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
              { label: 'Customisation', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Tech Cos', title: 'Corporate Gifts for Tech Companies', href: '/industry-solutions/tech-companies' },
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
        <LastUpdatedDate date="2026-05-26" />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
