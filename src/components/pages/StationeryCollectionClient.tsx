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

const SUBCATEGORIES = [
  {
    emoji: '📓',
    title: 'Notebooks & Journals',
    desc: 'A5/A4, hardcover/softcover, ruled and dotted options.',
    price: '₹100–₹500',
    bg: 'cp-img-green',
  },
  {
    emoji: '🖊',
    title: 'Pens & Writing',
    desc: 'Ballpoints, gel pens, bamboo pens, and rollerball sets.',
    price: '₹25–₹400',
    bg: 'cp-img-warm',
  },
  {
    emoji: '📅',
    title: 'Planners & Organisers',
    desc: 'Weekly/monthly, dated/undated, financial year options.',
    price: '₹200–₹700',
    bg: 'cp-img-mid',
  },
  {
    emoji: '📝',
    title: 'Sticky Notes & Pads',
    desc: 'Mini and full-size, custom shapes and branded prints.',
    price: '₹45–₹120',
    bg: 'cp-img-gold',
  },
  {
    emoji: '🖥',
    title: 'Desk Sets',
    desc: 'Pen holder + notepad + desk calendar combos, gift-ready.',
    price: '₹300–₹800',
    bg: 'cp-img-green',
  },
  {
    emoji: '🌱',
    title: 'Eco Stationery',
    desc: 'Seed paper notebooks, recycled pads, bamboo pens - for ESG-conscious teams.',
    price: '₹80–₹350',
    bg: 'cp-img-warm',
  },
]

const OCCASIONS_TABLE = [
  { occasion: 'Onboarding Kit', recommended: 'Notebook + pen + planner', budget: '₹350–₹700', moq: '10' },
  { occasion: 'Conference Giveaway', recommended: 'Branded pen + notepad', budget: '₹80–₹200', moq: '100' },
  { occasion: 'Client Gift', recommended: 'Premium hardcover notebook + pen set', budget: '₹400–₹900', moq: '1' },
  { occasion: 'Diwali', recommended: 'Elegant planner + pen in gift box', budget: '₹500–₹1,200', moq: '25' },
  { occasion: 'Team Event', recommended: 'Branded sticky notes + pen', budget: '₹100–₹200', moq: '50' },
  { occasion: 'Work Anniversary', recommended: 'Premium leather-look journal', budget: '₹500–₹1,500', moq: '1' },
]

const BULK_TIERS = [
  { range: '50–99 units', discount: 'Base price', tag: '', highlighted: false },
  { range: '100–249 units', discount: '8–12% off', tag: '', highlighted: false },
  { range: '250–499 units', discount: '15–20% off', tag: 'Most Popular', highlighted: true },
  { range: '500+ units', discount: '25–35% off', tag: '', highlighted: false },
]

const FAQ_ITEMS = [
  {
    q: 'What stationery items work best for corporate gifting?',
    a: 'Hardcover A5 notebooks (₹150–₹400) offer the best combination of utility and perceived value. Pair with a quality pen (₹100–₹200) for onboarding kits. For budget gifting, branded ballpoint pens (₹25–₹60) are reliable mass-giveaway items.',
  },
  {
    q: 'Can notebooks be custom printed with company branding?',
    a: 'Yes. Notebooks and journals support full-cover printing, debossing, and spot-UV finish. Inside pages can include custom welcome messages, goals templates, or branded patterns. Setup takes 2–3 extra days for custom interiors.',
  },
  {
    q: 'Are eco-friendly stationery options available?',
    a: 'Yes. We offer seed paper notebooks, recycled paper notepads, bamboo pens, plantable seed pencils, and notebooks made from agro-waste. Eco stationery is popular with ESG-conscious companies and sustainability-focused teams.',
  },
  {
    q: "What's the minimum order for custom-printed notebooks?",
    a: 'MOQ for custom-printed notebooks is 50 units. For standard logo printing on existing designs, 50 units is required. Custom interior layouts (goals pages, branded templates) require 100 units minimum.',
  },
  {
    q: 'Can I mix notebook sizes and types in one order?',
    a: 'Yes, with a 50-unit minimum per SKU. Mixed orders with 3+ SKUs may take 2–3 extra days. A dedicated account manager will coordinate and ensure consistent branding across all items.',
  },
  {
    q: 'Are planners available for the new financial year?',
    a: 'Yes. Dated planners for the 2026–27 financial year (April–March) and calendar year (Jan–Dec) are available. Custom-dated planners with your company calendar, holidays, and branded monthly spreads require 100 units minimum and 15-day lead time.',
  },
]

const RELATED = [
  { href: '/collections/drinkware', label: 'Drinkware' },
  { href: '/collections/corporate-gifts', label: 'All Collections' },
  { href: '/guides/corporate-gifts-under-100', label: 'Under ₹100' },
  { href: '/collections/eco-friendly-gifts', label: 'Eco-Friendly' },
  { href: '/customization/personalized-corporate-gifts', label: 'Personalised' },
  { href: '/collections/hampers', label: 'Hampers' },
  { href: '/guides/corporate-gifting-handbook', label: 'Handbook' },
]


export default function StationeryCollectionClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Collections", "item": "https://themintbox.in/collections/corporate-gifts" },
          { "@type": "ListItem", "position": 3, "name": "Stationery", "item": "https://themintbox.in/collections/stationery" },
        ]
      }) }} />
      <Navbar />

      {/* 1. HERO */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-hero-inner">
          <div>
            <nav className="cp-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="cp-breadcrumb-sep">›</span>
              <a href="/collections/corporate-gifts">Collections</a>
              <span className="cp-breadcrumb-sep">›</span>
              <span className="cp-breadcrumb-current">Stationery</span>
            </nav>
            <div className="cp-hero-eyebrow">Category · Stationery</div>
            <h1 className="cp-hero-title">
              Corporate Stationery Gifts:<br />
              <em>Notebooks, Pens &amp; Desk Sets</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Branded notebooks, quality pens, planners, sticky notes, and desk sets for offices,
              onboarding kits, and client gifts. Logo printing from 50 units. Items employees
              actually use daily.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-hero-cta-primary">Browse Stationery ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get Stationery Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 50+ stationery SKUs</span>
              <span className="cp-hero-badge">✓ Logo printing from 50 units</span>
              <span className="cp-hero-badge">✓ Eco-friendly options</span>
              <span className="cp-hero-badge">✓ Starts at ₹25/unit</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80" alt="Premium corporate stationery notebook" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80" alt="Personalised pen stationery gift" className="cp-hero-img-actual" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AEO BAND */}
      <div className="cp-aeo-band">
        <div className="cp-container--narrow">
          <QuickAnswerBox
            title="Quick Answer"
            content="Corporate stationery gifts include branded notebooks (₹100–₹500), quality pen sets (₹50–₹400), planners, sticky note pads, and complete desk sets. MOQ is 50 units. Stationery is ideal for onboarding kits, conference giveaways, and client appreciation - practical gifts that stay on desks and carry your logo daily."
          />
          <EATSignal credentials={[
            '50+ stationery SKUs from notebooks to desk organizers',
            'Eco-friendly options (recycled paper, bamboo pens)',
            'Logo printing on all items from 50 units',
            'Perfect for onboarding, conferences, and client gifting',
            'Ships Pan-India in 7–10 days',
          ]} />
        </div>
      </div>


      {/* 3. STATS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">50<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Stationery SKUs in stock</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹25<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Starting price per unit</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">50</div>
              <div className="cp-stat-label">Units MOQ for logo printing</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Eco</div>
              <div className="cp-stat-label">Bamboo, recycled &amp; seed paper options</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT SHOWCASE */}
      <section className="cp-section cp-section--cream" id="products">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Browse</div>
          <h2 className="cp-section-title">Browse Stationery Products</h2>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Stationery Collection"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* 5. SUB-CATEGORIES */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Product Types</div>
          <h2 className="cp-section-title">Stationery Formats for Corporate Gifting</h2>
          <p className="cp-section-sub">
            From budget ballpoint pens for conference bags to premium hardcover journals for client appreciation
            - all available with your logo.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {SUBCATEGORIES.map(sub => (
              <div key={sub.title} className="cp-card">
                <div className={`cp-img-placeholder ${sub.bg}`} style={{ height: '80px', borderRadius: '10px', marginBottom: '16px', fontSize: '32px' }}>
                  {sub.emoji}
                </div>
                <div className="cp-card-title">{sub.title}</div>
                <p className="cp-card-desc">{sub.desc}</p>
                <span className="cp-card-tag">{sub.price}</span>
              </div>
            ))}
          </div>
          <figure className="cp-editorial-img">
            <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80" alt="Premium branded corporate stationery including notebooks, pens and planners" loading="lazy" />
          </figure>
        </div>
      </section>

      {/* 6. OCCASIONS TABLE */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Use Cases</div>
          <h2 className="cp-section-title">Stationery for Every Gifting Occasion</h2>
          <p className="cp-section-sub">
            Match the right stationery to the moment. Budget and MOQ shown are per-unit estimates for reference.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Occasion</th>
                  <th>Recommended</th>
                  <th>Budget</th>
                  <th>MOQ</th>
                </tr>
              </thead>
              <tbody>
                {OCCASIONS_TABLE.map(row => (
                  <tr key={row.occasion}>
                    <td>{row.occasion}</td>
                    <td>{row.recommended}</td>
                    <td>{row.budget}</td>
                    <td>{row.moq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. QUOTE PULL BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            A branded notebook used daily for a year puts your logo in front of its owner 250 days a year. No ad channel achieves that at ₹200.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. BULK PRICING TIERS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Volume Pricing</div>
          <h2 className="cp-section-title">Bulk Pricing Tiers</h2>
          <p className="cp-section-sub">
            The more you order, the better the per-unit price. All tiers include logo printing.
          </p>
          <div className="cp-budget-grid">
            {BULK_TIERS.map(tier => (
              <div
                key={tier.range}
                className={`cp-budget-card ${tier.highlighted ? 'cp-budget-card--mid' : 'cp-budget-card--subtle'}`}
              >
                {tier.tag && (
                  <div className={`cp-budget-label ${tier.highlighted ? 'cp-budget-label--light' : 'cp-budget-label--dark'}`}>
                    {tier.tag}
                  </div>
                )}
                <div className={`cp-budget-price ${tier.highlighted ? 'cp-budget-price--light' : 'cp-budget-price--dark'}`}>
                  {tier.range}
                </div>
                <div className={`cp-budget-item ${tier.highlighted ? 'cp-budget-item--light' : 'cp-budget-item--dark'}`} style={{ fontWeight: 600, fontSize: '18px', marginTop: '8px' }}>
                  {tier.discount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA + FORM */}
      <section className="cp-cta-section" id="quote">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Get a Quote</div>
            <h2 className="cp-cta-title">Ready to Order<br />Branded Stationery?</h2>
            <p className="cp-cta-sub">
              Share your quantity, occasion, and logo - we will respond with pricing and a free digital mockup within 4 hours.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Stationery Pricing"
              ctaLabel="Request Stationery Quote"
              defaultOccasion="welcome_kit"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="catalog" />

      {/* 10. FAQ */}
      <section className="cp-section cp-section--white">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Corporate Stationery - Frequently Asked Questions"
          />
        </div>
      </section>

      {/* 11. RELATED LINKS */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title">Related Collections</h2>
          <div className="cp-related-grid">
            {RELATED.map(r => (
              <a key={r.href} href={r.href} className="cp-related-card">
                {r.label}
                <span className="cp-related-card-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 12. LAST UPDATED */}
      <div className="cp-container--narrow" style={{ padding: '0 24px' }}>
        <LastUpdatedDate date="2026-05-25" />
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
