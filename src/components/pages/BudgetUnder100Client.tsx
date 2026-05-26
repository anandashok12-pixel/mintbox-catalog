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

const PRICE_TIERS = [
  {
    label: '₹25–₹50',
    icon: '✏️',
    price: 'From ₹25/unit',
    variant: 'cp-budget-card--subtle',
    labelVariant: 'cp-budget-label--dark',
    priceVariant: 'cp-budget-price--dark',
    itemVariant: 'cp-budget-item--dark',
    ctaVariant: 'cp-budget-cta--dark',
    items: ['Pens', 'Seed packets', 'Badges', 'Lanyards'],
    desc: 'Mass giveaways - perfect for large-scale conferences and events where volume matters and every rupee counts.',
    link: '/collections/corporate-gifts',
  },
  {
    label: '₹50–₹75',
    icon: '📋',
    price: '₹50–₹75/unit',
    variant: 'cp-budget-card--mid',
    labelVariant: 'cp-budget-label--light',
    priceVariant: 'cp-budget-price--light',
    itemVariant: 'cp-budget-item--light',
    ctaVariant: 'cp-budget-cta--light',
    items: ['Small notebooks', 'Eco pouches', 'Mini hand sanitiser kits'],
    desc: 'Event essentials - branded utility items with strong recall value, ideal for conferences and team days.',
    link: '/collections/stationery',
  },
  {
    label: '₹75–₹100',
    icon: '💾',
    price: '₹75–₹100/unit',
    variant: 'cp-budget-card--premium',
    labelVariant: 'cp-budget-label--light',
    priceVariant: 'cp-budget-price--light',
    itemVariant: 'cp-budget-item--light',
    ctaVariant: 'cp-budget-cta--light',
    items: ['Ceramic magnets', 'USB drives (4GB)', 'Multi-tools'],
    desc: 'Quality giveaways - a step up in perceived value without breaking the bank, great for tech events and trade shows.',
    link: '/collections/tech-gifts',
  },
]

const COMPARISON_TABLE = [
  { item: 'Branded ballpoint pen', idealFor: 'Mass events', price: '₹25–₹40' },
  { item: 'Seed paper pack', idealFor: 'Eco events', price: '₹35–₹55' },
  { item: 'Badge/button pin', idealFor: 'Conferences', price: '₹30–₹50' },
  { item: 'Printed keychain', idealFor: 'Brand recall', price: '₹40–₹65' },
  { item: 'Mini sticky notes', idealFor: 'Office utility', price: '₹45–₹70' },
  { item: 'Tyvek wallet', idealFor: 'Novelty', price: '₹55–₹80' },
  { item: 'Small notebook (A6)', idealFor: 'Note-taking', price: '₹60–₹90' },
  { item: 'USB 4GB drive', idealFor: 'Tech giveaway', price: '₹75–₹100' },
]

const BULK_TIERS = [
  { qty: '100', label: 'Starter', saving: 'Base price', desc: 'MOQ met on most products. Logo printing available.', featured: false },
  { qty: '250–499', label: 'Growing', saving: '8–12% off', desc: 'Early savings kick in. Great for departmental or event buys.', featured: false },
  { qty: '500–999', label: 'Popular', saving: '18–25% off', desc: 'Significant per-unit savings, priority production slot.', featured: true },
  { qty: '1,000+', label: 'Enterprise', saving: '28–40% off', desc: 'Best pricing, dedicated account manager, flexible delivery.', featured: false },
]

const FAQ_ITEMS = [
  {
    q: 'What are the best corporate gifts under ₹100?',
    a: 'Branded ballpoint pens (₹25–₹45), seed paper notepads (₹45–₹80), printed keychains (₹40–₹65), and small A6 notebooks (₹60–₹90) offer the highest perceived value at this price. Pair with a custom sleeve or printed bag for maximum impact.',
  },
  {
    q: "What's the MOQ for gifts under ₹100?",
    a: 'Most items have an MOQ of 100 units for printed orders. For very low-cost items like pens and badges, 250 units may be required to cover setup costs. Volume discounts kick in meaningfully at 500+.',
  },
  {
    q: 'Can I get logo printing for gifts under ₹100?',
    a: 'Yes. Pad printing, screen printing, and digital printing are included in the listed price at 100+ units. Multi-colour prints or full-wrap designs cost extra and are typically more appropriate for higher-priced items.',
  },
  {
    q: 'Is packaging available for sub-₹100 gifts?',
    a: 'Basic poly-bag or OPP pouch packaging is included. Branded boxes or custom sleeves are available but add ₹15–₹40 per unit - often worth it for onboarding kits even on small items.',
  },
  {
    q: 'How long does production take for bulk orders of 500–1,000 units?',
    a: 'Standard production for 500–1,000 units is 5–7 business days. For 1,000+ units, add 3–4 days. Rush orders available. Bangalore delivery is 1–2 days after dispatch; Pan-India 3–5 days.',
  },
  {
    q: 'Can I mix products in a large event order?',
    a: 'Yes. Mixed SKUs are welcome with a 100-unit minimum per product. Orders with 5+ SKUs may need an additional 2–3 days for coordination. A dedicated account manager is assigned for orders above ₹50,000.',
  },
]

const RELATED_LINKS = [
  { label: 'Budget Guide', title: 'Corporate Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
  { label: 'Budget Guide', title: 'Corporate Gifts Under ₹1,000', href: '/guides/corporate-gifts-under-1000' },
  { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
  { label: 'Collections', title: 'Stationery Collection', href: '/collections/stationery' },
  { label: 'Eco', title: 'Eco-Friendly Gifts', href: '/collections/eco-friendly-gifts' },
  { label: 'Bulk Gifting', title: 'Bulk Gifting Guide', href: '/bangalore-corporate-gifting/bulk-gifting' },
]


export default function BudgetUnder100Client({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Corporate Gifts Under ₹100", "item": "https://themintbox.in/guides/corporate-gifts-under-100" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Corporate Gifts Under ₹100: Affordable Bulk Ideas for 2026",
        "description": "Best corporate gifts under ₹100 for large-scale events and giveaways. Pens, seed packets, badges, stickers - logo-printed from 100 units. Pan-India bulk delivery.",
        "url": "https://themintbox.in/guides/corporate-gifts-under-100",
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
            <a href="/guides/corporate-gifting-handbook">Guides</a>
            <span className="cp-breadcrumb-sep">›</span>
            <span className="cp-breadcrumb-current">Corporate Gifts Under ₹100</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Budget Guide · Updated May 2026</div>
              <h1 className="cp-hero-title">
                Corporate Gifts Under ₹100:<br />
                <em>Affordable Bulk Ideas for 2026</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                Impactful gifting at ₹25–₹100 per unit. Branded pens, seed packets, stickers, and more.
                Ideal for large-scale events, conferences, and bulk giveaways from 100 units.
              </p>
              <div className="cp-hero-ctas">
                <a href="#products" className="cp-hero-cta-primary">See Products Under ₹100 ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Get Bulk Quote</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ From ₹25/unit</span>
                <span className="cp-hero-badge">✓ MOQ from 100 units</span>
                <span className="cp-hero-badge">✓ Logo printing included</span>
                <span className="cp-hero-badge">✓ Pan-India delivery</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80" alt="Quality pen and stationery corporate gift" className="cp-hero-img-actual cp-hero-img-actual--tall" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" alt="Green sustainable corporate gifting" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&w=800&q=80" alt="Corporate gifting planning and stationery" className="cp-hero-img-actual" loading="lazy" />
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
            content="Corporate gifts under ₹100 are high-volume giveaway items - branded pens, seed packets, badges, notebooks, and stickers - ideal for conferences, events, and large teams of 500+. At 500+ units, per-unit costs can drop below ₹40. Logo printing is standard. Production takes 5–7 business days; Pan-India delivery 3–5 days."
          />
          <EATSignal credentials={[
            'Gifts priced ₹25–₹100 per unit, bulk-ready',
            'MOQ 100 units, volume discounts from 500+',
            'Logo printing included in listed price at 100+ units',
            'Perfect for events, conferences, mass giveaways',
            'GST invoicing, transparent no-surprise pricing',
          ]} />
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid">
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹25<span className="cp-stat-unit">/unit</span></div>
              <div className="cp-stat-label">Starting price</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">100<span className="cp-stat-unit"> units</span></div>
              <div className="cp-stat-label">Minimum order quantity</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">500<span className="cp-stat-unit">+ units</span></div>
              <div className="cp-stat-label">Unlocks deepest discounts</div>
            </div>
          </div>
        </div>
      </section>


      {/* ── PRICE TIER CARDS ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Price Breakdown</div>
          <h2 className="cp-section-title">What You Get at Each Budget Level</h2>
          <p className="cp-section-sub">
            Even within ₹100, there are meaningful differences. Here is what each sub-bracket delivers.
          </p>
          <div className="cp-budget-grid">
            {PRICE_TIERS.map(tier => (
              <a key={tier.label} href={tier.link} className={`cp-budget-card ${tier.variant}`} style={{ textDecoration: 'none' }}>
                <div className={`cp-budget-label ${tier.labelVariant}`}>{tier.label}</div>
                <div className={`cp-budget-price ${tier.priceVariant}`}>{tier.price}</div>
                <ul className="cp-budget-items">
                  {tier.items.map(item => (
                    <li key={item} className={`cp-budget-item ${tier.itemVariant}`}>{item}</li>
                  ))}
                </ul>
                <span className={`cp-budget-cta ${tier.ctaVariant}`}>See options →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Products Under ₹100</div>
          <h2 className="cp-section-title">Browse Products Under ₹100</h2>
          <p className="cp-section-sub">
            All products below are under ₹100 per unit. Use the search or category tabs to narrow your shortlist.
            Click any product to add it to your quote pack.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Browse Products Under ₹100"
            maxPrice={100}
            showPriceFilter={false}
            showSearch={true}
          />
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <figure className="cp-editorial-img">
            <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" alt="Budget planning workspace for bulk corporate gifting" loading="lazy" />
          </figure>
          <div className="cp-section-eyebrow">Comparison Guide</div>
          <h2 className="cp-section-title">Top Picks Under ₹100 at a Glance</h2>
          <p className="cp-section-sub">
            Indicative per-unit prices at 500+ units. All figures include standard logo printing at that quantity.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Ideal For</th>
                  <th>Logo?</th>
                  <th>Price at 500+ units</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map(row => (
                  <tr key={row.item}>
                    <td>{row.item}</td>
                    <td style={{ fontWeight: 300 }}>{row.idealFor}</td>
                    <td>
                      <span className="cp-table-badge cp-table-badge--yes">Yes</span>
                    </td>
                    <td style={{ fontWeight: 500, color: 'var(--forest-green,#1B4D3E)' }}>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '14px', fontSize: '13px', color: 'rgba(26,26,24,0.45)', fontWeight: 300 }}>
            * Prices are indicative and vary by material spec and customisation. <a href="/contact" style={{ color: 'var(--forest-green,#1B4D3E)' }}>Request a quote</a> for exact pricing.
          </p>
        </div>
      </section>

      {/* ── QUOTE PULL BAND ── */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            At 1,000 units, a ₹60 branded gift costs ₹60,000 total - less than a single conference booth.
            Maximum impressions, minimum spend.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Philosophy</cite>
        </div>
      </div>

      {/* ── BULK PRICING TIERS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <figure className="cp-editorial-img">
            <img src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=80" alt="Quality stationery pen - a classic budget corporate gift" loading="lazy" />
          </figure>
          <div className="cp-section-eyebrow">Volume Discounts</div>
          <h2 className="cp-section-title">The More You Order, the More You Save</h2>
          <p className="cp-section-sub">
            Bulk pricing tiers apply across all products under ₹100. Discounts are per-unit and stack
            with any promotional offers.
          </p>
          <div className="cp-tier-grid">
            {BULK_TIERS.map((tier, i) => (
              <div
                key={tier.qty}
                className={`cp-tier-cell${tier.featured ? ' cp-tier-cell--featured' : ''}`}
                style={i > 0 && !tier.featured ? { background: 'white' } : {}}
              >
                <div className={`cp-tier-label ${tier.featured ? 'cp-tier-label--light' : 'cp-tier-label--dark'}`}>
                  {tier.label}
                </div>
                <div className={`cp-tier-qty ${tier.featured ? 'cp-tier-qty--light' : 'cp-tier-qty--dark'}`}>
                  {tier.qty}<span style={{ fontSize: '16px' }}> units</span>
                </div>
                <div className={`cp-tier-saving${!tier.featured ? ' cp-tier-saving--muted' : ''}`}>
                  {tier.saving}
                </div>
                <div className={`cp-tier-desc ${tier.featured ? 'cp-tier-desc--light' : 'cp-tier-desc--dark'}`}>
                  {tier.desc}
                </div>
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
            <div className="cp-cta-eyebrow">Bulk Pricing</div>
            <h2 className="cp-cta-title">Get Bulk Pricing<br />Under ₹100</h2>
            <p className="cp-cta-sub">
              Tell us your quantity, products of interest, and timeline - we will send back
              an itemised bulk quote within 4 hours.
            </p>
          </div>
          <InlineQuoteForm
            title="Get Bulk Pricing Under ₹100"
            subtitle="Tell us what you need and we will come back with a detailed quote within 4 hours."
            ctaLabel="Get Bulk Quote"
            defaultOccasion="corporate_event"
          />
        </div>
      </section>

      <MidPageCTA variant="catalog" />

      {/* ── FAQ ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <FAQSection
            items={FAQ_ITEMS}
            title="Corporate Gifts Under ₹100 - FAQs"
            eyebrow="FAQ"
          />
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title" style={{ marginBottom: '28px' }}>Related Guides</h2>
          <div className="cp-related-grid">
            {RELATED_LINKS.map(link => (
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
