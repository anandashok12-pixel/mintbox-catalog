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

const ECO_CATEGORIES = [
  {
    icon: '🌱',
    bg: 'cp-img-green',
    title: 'Seed Paper Items',
    desc: 'Notebooks, note cards, and pens that grow into plants when planted.',
    price: '₹80–₹200',
  },
  {
    icon: '🎋',
    bg: 'cp-img-mid',
    title: 'Bamboo Products',
    desc: 'Pens, pen holders, trays, frames - sustainable and premium-looking.',
    price: '₹80–₹350',
  },
  {
    icon: '👜',
    bg: 'cp-img-warm',
    title: 'Jute & Natural Fibre',
    desc: 'Tote bags, pouches, wine bags - reusable and biodegradable.',
    price: '₹120–₹400',
  },
  {
    icon: '📋',
    bg: 'cp-img-green',
    title: 'Recycled Paper Stationery',
    desc: 'Notebooks and pads made from post-consumer waste.',
    price: '₹100–₹300',
  },
  {
    icon: '🪴',
    bg: 'cp-img-mid',
    title: 'Plant Kits',
    desc: 'Desk plants, succulent sets, herb growing kits.',
    price: '₹200–₹600',
  },
  {
    icon: '♻️',
    bg: 'cp-img-warm',
    title: 'Organic & Reusable',
    desc: 'Beeswax wraps, organic cotton bags, reusable straws.',
    price: '₹150–₹400',
  },
]

const OCCASIONS_TABLE = [
  { occasion: 'Earth Day Events', gift: 'Seed paper kit + jute bag', price: '₹300–₹500', moq: '50' },
  { occasion: 'Onboarding', gift: 'Eco kit: bamboo pen + recycled notebook + tote', price: '₹400–₹700', moq: '25' },
  { occasion: 'ESG Report Launch', gift: 'Plant kit + seed paper notebook', price: '₹400–₹800', moq: '25' },
  { occasion: 'Client Appreciation', gift: 'Premium bamboo set + plant', price: '₹600–₹1,500', moq: '10' },
  { occasion: 'Conference', gift: 'Seed paper pad + bamboo pen', price: '₹150–₹300', moq: '100' },
  { occasion: 'All-Company Diwali', gift: 'Eco hamper: jute bag + candle + plant', price: '₹600–₹1,200', moq: '25' },
]

const BULK_TIERS = [
  { qty: '50–99 units', discount: 'Base price', desc: 'Base eco rate. MOQ met on all products.', featured: false },
  { qty: '100–249 units', discount: '8–12% off', desc: 'Mid-tier savings with priority eco sourcing.', featured: false },
  { qty: '250–499 units', discount: '15–20% off', desc: 'Significant savings and ESG documentation included.', featured: true },
  { qty: '500+ units', discount: '25–35% off', desc: 'Best pricing, dedicated account manager, flexible delivery.', featured: false },
]

const FAQS = [
  {
    q: 'Are eco-friendly corporate gifts as durable as regular gifts?',
    a: 'Yes. Bamboo products are more durable than plastic. Jute bags are stronger than polypropylene. Recycled paper notebooks have the same paper quality as virgin paper. Seed paper items are naturally fragile (by design - they\'re meant to be planted), but they come with planting instructions.',
  },
  {
    q: 'Can I get an ESG certificate or sustainability documentation for my procurement report?',
    a: 'Yes. MintBox provides material origin certificates, sustainability data sheets, and product composition reports for eco items. These can be included in your CSR/ESG reporting. Request documentation at the time of ordering.',
  },
  {
    q: 'Are the eco gifts more expensive than regular corporate gifts?',
    a: 'Eco items are typically 10–25% higher than non-eco equivalents. However, premium eco items (bamboo pens, seed notebooks) are often perceived as higher-value by recipients, making cost-per-impression similar or better.',
  },
  {
    q: "What's the most impactful eco gift?",
    a: 'Desktop plant kits (grow-your-own herbs or succulents) have the highest recipient engagement - they keep growing, and every day the recipient tends to them, they think of your brand. Seed paper notebooks are the best value eco gift: practical, plantable, and memorable.',
  },
  {
    q: 'Can eco gifts be customised with company branding?',
    a: 'Yes. All eco items support logo printing, stamping, or screen printing. Bamboo and wood items support laser engraving. Seed paper can be custom-shaped and printed with your logo and message in eco-friendly inks.',
  },
  {
    q: 'Are these gifts suitable for international recipients?',
    a: "Most eco items (bamboo, jute, recycled paper) are fine for international shipping. Plant kits with soil may be restricted by customs in some countries. Check destination country's import regulations before including live plant material in international gifts.",
  },
]


export default function EcoFriendlyClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Collections", "item": "https://themintbox.in/collections/corporate-gifts" },
          { "@type": "ListItem", "position": 3, "name": "Eco-Friendly Gifts", "item": "https://themintbox.in/collections/eco-friendly-gifts" },
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
              <span className="cp-breadcrumb-current">Eco-Friendly Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">Collections · Sustainability</div>
            <h1 className="cp-hero-title">
              Eco-Friendly Corporate Gifts:<br />
              <em>Sustainable Gifting for 2026</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Planet-conscious corporate gifts for ESG-aligned companies - seed paper notebooks,
              bamboo pens, jute totes, recycled kits, and grow-your-own plant sets. All branded, all sustainable.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-hero-cta-primary">Browse Eco Gifts ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get Eco Gift Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 100% sustainable materials</span>
              <span className="cp-hero-badge">✓ From ₹150/unit</span>
              <span className="cp-hero-badge">✓ Logo-branded</span>
              <span className="cp-hero-badge">✓ ESG-documentation available</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80" alt="Eco-friendly sustainable gift wrapping" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80" alt="Sustainable packaging for corporate gifts" className="cp-hero-img-actual" loading="lazy" />
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
            content="Eco-friendly corporate gifts include seed paper notebooks, bamboo pens, jute tote bags, recycled stationery kits, and plant-your-own sets - all branded with your logo. Budget range: ₹150–₹1,500 per unit. Ideal for ESG-focused companies, sustainability events, and environmentally conscious clients. MOQ is 25 units."
          />
          <EATSignal credentials={[
            '100% sustainable and recycled materials',
            'ESG-documentation available for procurement',
            'Branded items without compromise on sustainability',
            'Perfect for green companies, B-corps, and ESG initiatives',
            'MOQ 50 units, competitive bulk pricing',
          ]} />
        </div>
      </div>


      {/* 3. STATS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">25<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">eco SKUs available</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹150<span className="cp-stat-unit">/unit</span></div>
              <div className="cp-stat-label">starting price</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">50<span className="cp-stat-unit"> units</span></div>
              <div className="cp-stat-label">minimum order quantity</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">ESG</div>
              <div className="cp-stat-label">documentation available</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ECO CATEGORIES */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Gift Categories</div>
          <h2 className="cp-section-title">Six Eco Gift Categories</h2>
          <p className="cp-section-sub">
            From seed paper that grows into plants to bamboo stationery and jute totes - every
            category is fully brandable and sustainably sourced.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {ECO_CATEGORIES.map(cat => (
              <div key={cat.title} className="cp-card">
                <div className={`cp-card-icon ${cat.bg}`} style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {cat.icon}
                </div>
                <div className="cp-card-title">{cat.title}</div>
                <p className="cp-card-desc">{cat.desc}</p>
                <span className="cp-card-tag">{cat.price}</span>
              </div>
            ))}
          </div>
          <figure className="cp-editorial-img">
            <img src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80" alt="Eco-friendly sustainable corporate gifts including bamboo products and seed paper" loading="lazy" />
          </figure>
        </div>
      </section>

      {/* 5. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Products</div>
          <h2 className="cp-section-title">Browse Eco-Friendly Corporate Gifts</h2>
          <p className="cp-section-sub">
            Explore our full eco range. All products are sustainably sourced and support logo branding.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Eco-Friendly Corporate Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* 6. OCCASIONS TABLE */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Use Cases</div>
          <h2 className="cp-section-title">Eco Gifts for Every Corporate Occasion</h2>
          <p className="cp-section-sub">
            Match the right eco gift to the moment. Prices shown are per-unit at minimum order quantity.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Occasion</th>
                  <th>Recommended Gift</th>
                  <th>Price / Unit</th>
                  <th>MOQ</th>
                </tr>
              </thead>
              <tbody>
                {OCCASIONS_TABLE.map(row => (
                  <tr key={row.occasion}>
                    <td>{row.occasion}</td>
                    <td style={{ fontWeight: 300 }}>{row.gift}</td>
                    <td style={{ fontWeight: 500, color: 'var(--forest-green,#1B4D3E)' }}>{row.price}</td>
                    <td>{row.moq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. QUOTE PULL */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            {
              "Eco gifts aren't a compromise - they're a statement. When your team unboxes a seed paper notebook, they know your company means what it says about sustainability."
            }
          </p>
          <cite className="cp-quote-cite">MintBox Sustainability Philosophy</cite>
        </div>
      </div>

      {/* 8. BULK PRICING TIERS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Volume Discounts</div>
          <h2 className="cp-section-title">Bulk Pricing for Eco Gifts</h2>
          <p className="cp-section-sub">
            Sustainable gifting at scale is cost-effective. The more you order, the less you pay per unit.
          </p>
          <div className="cp-tier-grid">
            {BULK_TIERS.map(tier => (
              <div
                key={tier.qty}
                className={`cp-tier-cell${tier.featured ? ' cp-tier-cell--featured' : ''}`}
              >
                <div className={`cp-tier-qty${tier.featured ? ' cp-tier-qty--light' : ' cp-tier-qty--dark'}`}>
                  {tier.qty}
                </div>
                <div className={`cp-tier-discount${tier.featured ? '' : ' cp-tier-saving--muted'}`}>
                  {tier.discount}
                </div>
                <div className={`cp-tier-desc${tier.featured ? ' cp-tier-desc--light' : ' cp-tier-desc--dark'}`}>
                  {tier.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA + FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Sustainable Gifting</div>
            <h2 className="cp-cta-title">Build Your Eco<br />Gifting Programme</h2>
            <p className="cp-cta-sub">
              Tell us your occasion, quantity, and sustainability goals - we will recommend
              the right eco gift mix with branding options and ESG documentation within 4 hours.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Build Your Eco Gifting Programme"
              ctaLabel="Get Eco Gift Quote"
              defaultOccasion="other"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="catalog" />

      {/* 10. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQS}
            eyebrow="FAQ"
            title="Eco-Friendly Corporate Gifts - Frequently Asked Questions"
          />
        </div>
      </section>

      {/* 11. RELATED LINKS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title">Related Collections</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
              { label: 'Collections', title: 'Stationery', href: '/collections/stationery' },
              { label: 'Budget Guide', title: 'Corporate Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
              { label: 'Industry', title: 'Gifting for Startups', href: '/industry-solutions/startups' },
              { label: 'Personalisation', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Planning Guide', title: 'How to Choose Corporate Gifts', href: '/guides/how-to-choose-corporate-gifts' },
              { label: 'Sustainable', title: 'Sustainable Corporate Gifts Guide', href: '/guides/sustainable-corporate-gifts' },
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
