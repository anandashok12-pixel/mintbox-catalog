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
    emoji: '🍶',
    title: 'Stainless Steel Bottles',
    desc: '350ml–1L, insulated, double-wall vacuum construction.',
    price: '₹200–₹600',
    bg: 'cp-img-green',
  },
  {
    emoji: '☕',
    title: 'Ceramic Mugs',
    desc: '300ml–500ml, custom colour, sublimation print options.',
    price: '₹120–₹350',
    bg: 'cp-img-warm',
  },
  {
    emoji: '🥤',
    title: 'Travel Tumblers',
    desc: 'Spill-proof, car-compatible, insulated for hot and cold.',
    price: '₹350–₹800',
    bg: 'cp-img-mid',
  },
  {
    emoji: '💧',
    title: 'Glass Bottles',
    desc: 'BPA-free glass with protective sleeve - eco-friendly choice.',
    price: '₹250–₹500',
    bg: 'cp-img-gold',
  },
  {
    emoji: '☕',
    title: 'French Press Kits',
    desc: '2-cup and 4-cup, branded with logo - premium client gift.',
    price: '₹400–₹900',
    bg: 'cp-img-green',
  },
  {
    emoji: '🏺',
    title: 'Copper Bottles',
    desc: 'Ayurvedic-style copper bottles for premium gifting occasions.',
    price: '₹350–₹700',
    bg: 'cp-img-warm',
  },
]

const OCCASIONS_TABLE = [
  { occasion: 'Employee Onboarding', recommended: 'Stainless bottle + mug combo', budget: '₹350–₹700', moq: '10' },
  { occasion: 'Diwali Gifting', recommended: 'Copper bottle or tumbler in gift box', budget: '₹400–₹900', moq: '25' },
  { occasion: 'Work Anniversary', recommended: 'Engraved premium bottle', budget: '₹500–₹1,200', moq: '1' },
  { occasion: 'Client Appreciation', recommended: 'French press or luxury tumbler', budget: '₹600–₹1,500', moq: '1' },
  { occasion: 'Conference Giveaway', recommended: 'Branded ceramic mug', budget: '₹150–₹300', moq: '50' },
  { occasion: 'Remote Team', recommended: 'Individual bottles shipped directly', budget: '₹300–₹600', moq: '10' },
  { occasion: 'Sports / Wellness', recommended: 'BPA-free large bottle (750ml+)', budget: '₹250–₹500', moq: '25' },
]

const BULK_TIERS = [
  { range: '25–49 units', discount: 'Base price', tag: '', highlighted: false },
  { range: '50–99 units', discount: '8–12% off', tag: '', highlighted: false },
  { range: '100–249 units', discount: '15–20% off', tag: 'Most Popular', highlighted: true },
  { range: '250+ units', discount: '25–35% off', tag: '', highlighted: false },
]

const FAQ_ITEMS = [
  {
    q: 'What drinkware is best for corporate gifting?',
    a: 'Insulated stainless steel bottles (350ml–750ml) deliver the highest perceived value and daily utility at ₹250–₹600. Ceramic mugs are budget-friendly (₹120–₹300) and ideal for office use. Tumblers suit senior gifting and client appreciation at ₹400–₹800.',
  },
  {
    q: 'Can I get custom logo printing on all drinkware?',
    a: 'Yes. Screen printing, pad printing, and laser engraving are available on most items. Ceramic mugs support full-wrap sublimation printing (all-over colour). Metal items use laser engraving or pad print. Minimum order is 25 units for printing.',
  },
  {
    q: 'Are the bottles BPA-free and food-safe?',
    a: 'Yes. All MintBox drinkware uses food-grade stainless steel (18/8 grade), BPA-free plastic components, and food-safe ceramic glazing. We can provide material safety certificates for corporate procurement on request.',
  },
  {
    q: "What's the difference between insulated and non-insulated bottles?",
    a: 'Insulated (double-wall vacuum) bottles keep drinks cold for 24h and hot for 12h - best for outdoor/wellness gifting. Non-insulated bottles are lighter and cost less (₹150–₹250) - good for budget giveaways or events.',
  },
  {
    q: 'Can I include a custom gift box or packaging?',
    a: 'Yes. Custom kraft boxes, rigid gift boxes, and branded pouches are available from ₹30–₹80 per unit extra. For premium gifting (tumblers, French press), we recommend a rigid gift box - it significantly elevates perceived value.',
  },
  {
    q: "What's the lead time for large drinkware orders?",
    a: 'Standard production: 7–10 business days. For 250+ units: 12–15 days. Express (5–7 days) available at 20% surcharge. Same-day delivery in Bangalore for pre-printed stock only.',
  },
]

const RELATED = [
  { href: '/collections/corporate-gifts', label: 'All Collections' },
  { href: '/collections/stationery', label: 'Stationery' },
  { href: '/collections/tech-gifts', label: 'Tech Gifts' },
  { href: '/collections/hampers', label: 'Hampers' },
  { href: '/guides/corporate-gifts-under-500', label: 'Under ₹500' },
  { href: '/customization/personalized-corporate-gifts', label: 'Personalised Gifts' },
  { href: '/guides/corporate-gifting-handbook', label: 'Handbook' },
]


export default function DrinkwareCollectionClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Collections", "item": "https://themintbox.in/collections/corporate-gifts" },
          { "@type": "ListItem", "position": 3, "name": "Drinkware", "item": "https://themintbox.in/collections/drinkware" },
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
              <span className="cp-breadcrumb-current">Drinkware</span>
            </nav>
            <div className="cp-hero-eyebrow">Category · Drinkware</div>
            <h1 className="cp-hero-title">
              Corporate Drinkware Gifts:<br />
              <em>Bottles, Mugs &amp; Tumblers</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Premium branded drinkware for corporate gifting - insulated stainless steel bottles,
              ceramic mugs, travel tumblers, and French press kits. Logo printing from 25 units.
              Used every day; seen by colleagues every day.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-hero-cta-primary">Browse Drinkware ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get Drinkware Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 40+ drinkware SKUs</span>
              <span className="cp-hero-badge">✓ Logo printing from 25 units</span>
              <span className="cp-hero-badge">✓ BPA-free &amp; food-safe</span>
              <span className="cp-hero-badge">✓ Starts at ₹150/unit</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80" alt="Premium tea mug personalised gift" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80" alt="Custom branded corporate water bottle" className="cp-hero-img-actual" loading="lazy" />
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
            content="Corporate drinkware gifts include branded stainless steel bottles (₹150–₹600), ceramic mugs (₹120–₹350), insulated tumblers (₹300–₹800), and travel cups - all available with logo printing or laser engraving. MOQ is 25 units. Drinkware is the most-gifted corporate category because recipients use it daily, keeping your brand visible."
          />
          <EATSignal credentials={[
            '40+ drinkware SKUs in stock',
            'BPA-free, food-safe materials',
            'Logo printing included from 25 units',
            'Insulated options for hot and cold beverages',
            'Delivered Pan-India in 7–10 days',
          ]} />
        </div>
      </div>


      {/* 3. STATS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">40<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Drinkware SKUs in stock</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹150<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Starting price per unit</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">25</div>
              <div className="cp-stat-label">Units MOQ for logo printing</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">700<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Brand impressions per year per bottle</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT SHOWCASE */}
      <section className="cp-section cp-section--cream" id="products">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Browse</div>
          <h2 className="cp-section-title">Browse Drinkware Products</h2>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Drinkware Collection"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* 5. SUB-CATEGORIES */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Product Types</div>
          <h2 className="cp-section-title">Six Drinkware Formats for Every Occasion</h2>
          <p className="cp-section-sub">
            From budget ceramic mugs for conference giveaways to copper bottles for premium festive gifting
            - every format is available with your logo.
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
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80" alt="Branded corporate drinkware collection including mugs, bottles and tumblers" loading="lazy" />
          </figure>
        </div>
      </section>

      {/* 6. OCCASIONS TABLE */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Use Cases</div>
          <h2 className="cp-section-title">Drinkware for Every Gifting Occasion</h2>
          <p className="cp-section-sub">
            Match the right drinkware to the moment. Budget and MOQ shown are per-unit estimates for reference.
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
            A bottle with your logo gets used 2–3 times a day. Over a year, that is 700+ brand impressions - for a one-time cost of ₹300.
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
            <h2 className="cp-cta-title">Ready to Order<br />Branded Drinkware?</h2>
            <p className="cp-cta-sub">
              Share your quantity, occasion, and logo - we will respond with pricing and a free digital mockup within 4 hours.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Drinkware Pricing"
              ctaLabel="Request Drinkware Quote"
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
            title="Corporate Drinkware - Frequently Asked Questions"
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
