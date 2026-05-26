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
    label: 'Under ₹100',
    icon: '✏️',
    price: 'From ₹25/unit',
    variant: 'cp-budget-card--subtle',
    labelVariant: 'cp-budget-label--dark',
    priceVariant: 'cp-budget-price--dark',
    itemVariant: 'cp-budget-item--dark',
    ctaVariant: 'cp-budget-cta--dark',
    items: ['Pens', 'Seed packets', 'Badges', 'Keychains'],
    desc: 'Event giveaways - ideal for large-scale conferences and mass-distribution where per-head spend must stay minimal.',
    link: '/guides/corporate-gifts-under-100',
  },
  {
    label: '₹100–₹250',
    icon: '📓',
    price: '₹100–₹250/unit',
    variant: 'cp-budget-card--mid',
    labelVariant: 'cp-budget-label--light',
    priceVariant: 'cp-budget-price--light',
    itemVariant: 'cp-budget-item--light',
    ctaVariant: 'cp-budget-cta--light',
    items: ['Notebooks', 'Mugs', 'Small eco kits', 'Bottle openers'],
    desc: 'Everyday utility - the sweet spot for team gifts, onboarding kits, and festive giveaways with real brand impact.',
    link: '/collections/corporate-gifts',
  },
  {
    label: '₹250–₹500',
    icon: '💧',
    price: '₹250–₹500/unit',
    variant: 'cp-budget-card--premium',
    labelVariant: 'cp-budget-label--light',
    priceVariant: 'cp-budget-price--light',
    itemVariant: 'cp-budget-item--light',
    ctaVariant: 'cp-budget-cta--light',
    items: ['Stainless bottles', 'Combo sets', 'Tote + notebook bundles'],
    desc: 'Meaningful tokens - quality gifts that feel premium without straining budgets, ideal for recognition and clients.',
    link: '/collections/drinkware',
  },
]

const COMPARISON_TABLE = [
  { item: 'Branded ballpoint pen', idealFor: 'Events, stationery', price: '₹25–₹60' },
  { item: 'Seed paper notepad', idealFor: 'Eco-conscious teams', price: '₹80–₹120' },
  { item: 'Jute tote bag', idealFor: 'Conferences, retail', price: '₹120–₹180' },
  { item: 'Ceramic mug (300ml)', idealFor: 'Onboarding, desks', price: '₹150–₹250' },
  { item: 'Bamboo pen + stand', idealFor: 'Premium desks', price: '₹180–₹280' },
  { item: 'Cotton tee (S–XL)', idealFor: 'Team merch, events', price: '₹250–₹400' },
  { item: 'Stainless steel bottle (350ml)', idealFor: 'Wellness, tech', price: '₹280–₹450' },
  { item: 'Eco starter kit (pen+bag+pad)', idealFor: 'Onboarding', price: '₹350–₹500' },
]

const BULK_TIERS = [
  { qty: '50', label: 'Starter', saving: 'Base price', desc: 'MOQ met on most products. Logo printing available.', featured: false },
  { qty: '100–249', label: 'Popular', saving: '10–15% off', desc: 'Logo printing included at no extra cost for most items.', featured: true },
  { qty: '250–499', label: 'Value', saving: '18–22% off', desc: 'Significant per-unit savings with priority production slot.', featured: false },
  { qty: '500+', label: 'Enterprise', saving: '25–35% off', desc: 'Best pricing, dedicated account manager, flexible delivery.', featured: false },
]

const FAQ_ITEMS = [
  {
    q: 'What corporate gifts are available under ₹500?',
    a: "At ₹500, you have access to branded pens, notebooks, ceramic mugs, jute bags, eco starter kits, and small stainless-steel bottles. These items offer strong logo visibility and daily utility. At 100+ units, packaging upgrades (custom sleeve, branded box) are often included free.",
  },
  {
    q: 'Is logo printing possible on gifts under ₹500?',
    a: 'Yes. Screen printing, pad printing, and digital printing are standard at this price point. At 50+ units, printing is included in the listed price for most items. Engraving (for metal items) is available at a small extra cost.',
  },
  {
    q: "What's the minimum order quantity (MOQ) for budget gifts?",
    a: 'MOQ is 50 units for most items in the sub-₹500 range. Some items (pens, seed packets) can go as low as 100 units for printed orders. Orders under 50 units carry a small setup fee.',
  },
  {
    q: 'How long does production take?',
    a: 'Standard production is 7–10 business days from order confirmation. Rush orders (4–6 days) are available at a 15–20% surcharge. Delivery across Bangalore is 1–2 days; Pan-India 3–5 days.',
  },
  {
    q: 'Can I mix different products in one order?',
    a: 'Yes. Mixed orders are available with a 100-unit minimum per product. Each SKU needs its own logo file and production run, so lead times may extend by 2–3 days for mixed orders.',
  },
  {
    q: 'Are GST invoices provided?',
    a: 'Yes. All orders come with a GST-compliant tax invoice. Provide your GSTIN at checkout for input tax credit (ITC) eligibility. Net-30 payment terms are available for verified corporate accounts.',
  },
]

const RELATED_LINKS = [
  { label: 'Budget Guide', title: 'Corporate Gifts Under ₹100', href: '/guides/corporate-gifts-under-100' },
  { label: 'Budget Guide', title: 'Corporate Gifts Under ₹1,000', href: '/guides/corporate-gifts-under-1000' },
  { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
  { label: 'Bulk Gifting', title: 'Bulk Gifting Guide', href: '/bangalore-corporate-gifting/bulk-gifting' },
  { label: 'Personalisation', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
  { label: 'Eco', title: 'Eco-Friendly Gifts', href: '/collections/eco-friendly-gifts' },
]


export default function BudgetUnder500Client({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Corporate Gifts Under ₹500", "item": "https://themintbox.in/guides/corporate-gifts-under-500" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Corporate Gifts Under ₹500: Best Budget Picks for 2026",
        "description": "Quality corporate gifts under ₹500 with logo printing. Budget picks from ₹75/unit - notebooks, bottles, eco kits. Bulk pricing from 50 units. Pan-India delivery.",
        "url": "https://themintbox.in/guides/corporate-gifts-under-500",
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
            <span className="cp-breadcrumb-current">Corporate Gifts Under ₹500</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Budget Guide · Updated May 2026</div>
              <h1 className="cp-hero-title">
                Corporate Gifts Under ₹500:<br />
                <em>Best Budget Picks for 2026</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                High-impact gifting at ₹75–₹500 per unit. Logo printing, eco options, and bulk discounts
                from 50 units. Ideal for events, onboarding, and year-round recognition.
              </p>
              <div className="cp-hero-ctas">
                <a href="#products" className="cp-hero-cta-primary">See Products Under ₹500 ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Get Bulk Quote</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ All under ₹500/unit</span>
                <span className="cp-hero-badge">✓ Logo printing from 50 units</span>
                <span className="cp-hero-badge">✓ MOQ from 50 units</span>
                <span className="cp-hero-badge">✓ GST invoicing</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80" alt="Premium corporate stationery notebook" className="cp-hero-img-actual cp-hero-img-actual--tall" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" alt="Branded corporate coffee mug gift" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80" alt="Custom branded corporate water bottle" className="cp-hero-img-actual" loading="lazy" />
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
            content="Corporate gifts under ₹500 include notebooks, branded pens, eco kits, seed packets, and utility items - all available with logo printing. At 100+ units, per-unit costs drop 15–25%, making well-packaged ₹300–₹450 gifts realistic. Standard production takes 7–10 business days; Pan-India delivery 3–5 days after dispatch."
          />
          <EATSignal credentials={[
            'All listed products priced ≤ ₹500 per unit',
            'Logo printing from 50 units - no setup fee at 100+',
            '150+ budget-friendly SKUs across 6 categories',
            '7–10 day production, Pan-India delivery',
            'GST-compliant invoicing, transparent pricing',
          ]} />
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid">
            <div className="cp-stat-card">
              <div className="cp-stat-value">150<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Products under ₹500</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹75<span className="cp-stat-unit">/unit</span></div>
              <div className="cp-stat-label">Starting price</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">50<span className="cp-stat-unit"> units</span></div>
              <div className="cp-stat-label">Minimum order quantity</div>
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
            Not all sub-₹500 gifts are equal. Here is a realistic breakdown of what is available across three sub-brackets.
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
          <div className="cp-section-eyebrow">Products Under ₹500</div>
          <h2 className="cp-section-title">Browse Products Under ₹500</h2>
          <p className="cp-section-sub">
            All products below are under ₹500 per unit. Use the search or category tabs to narrow your shortlist.
            Click any product to add it to your quote pack.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Browse Products Under ₹500"
            maxPrice={500}
            showPriceFilter={false}
            showSearch={true}
          />
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <figure className="cp-editorial-img">
            <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1200&q=80" alt="Corporate gift packages ready for bulk delivery" loading="lazy" />
          </figure>
          <div className="cp-section-eyebrow">Comparison Guide</div>
          <h2 className="cp-section-title">Top Picks Under ₹500 at a Glance</h2>
          <p className="cp-section-sub">
            Indicative per-unit prices at 100+ units. All figures include standard logo printing at that quantity.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Ideal For</th>
                  <th>Logo?</th>
                  <th>Price at 100+ units</th>
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
            A ₹300 gift with your logo on it does more for brand recall than a ₹3,000 generic one.
            Thoughtfulness scales on budget.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Philosophy</cite>
        </div>
      </div>

      {/* ── BULK PRICING TIERS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Volume Discounts</div>
          <h2 className="cp-section-title">The More You Order, the More You Save</h2>
          <p className="cp-section-sub">
            Bulk pricing tiers apply across all products under ₹500. Discounts are per-unit and stack
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
            <h2 className="cp-cta-title">Get Bulk Pricing<br />Under ₹500</h2>
            <p className="cp-cta-sub">
              Tell us your quantity, products of interest, and timeline - we will send back
              an itemised bulk quote within 4 hours.
            </p>
          </div>
          <InlineQuoteForm
            title="Get Bulk Pricing Under ₹500"
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
            title="Corporate Gifts Under ₹500 - FAQs"
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
