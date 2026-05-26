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

interface Props {
  products: Product[]
  categories: Category[]
}

const ECO_CATEGORIES = [
  {
    icon: "🌱",
    title: "Seed Paper Products",
    desc: "Notebooks, cards, and packaging made from seed-embedded paper. Plant and grow after use - compostable and zero-waste.",
    tag: "Zero Waste",
    href: "/collections/eco-friendly-gifts",
  },
  {
    icon: "🎋",
    title: "Bamboo Accessories",
    desc: "Pens, phone stands, desk organisers, and notebooks made from fast-growing bamboo. Durable, biodegradable, and premium-feel.",
    tag: "Biodegradable",
    href: "/collections/stationery",
  },
  {
    icon: "♻️",
    title: "Recycled Stationery",
    desc: "Notebooks and journals made from recycled paper and post-consumer waste. GSM quality matches virgin paper - no compromise on look or feel.",
    tag: "Recycled",
    href: "/collections/stationery",
  },
  {
    icon: "🪴",
    title: "Indoor Plant Kits",
    desc: "Succulents, ZZ plants, or air purifiers in branded pots. Long-lasting, air-cleaning, and a daily brand reminder on the desk.",
    tag: "Wellness",
    href: "/collections/eco-friendly-gifts",
  },
  {
    icon: "🧴",
    title: "Natural Wellness Kits",
    desc: "Herbal teas, organic honey, natural soaps, and aromatherapy items in kraft paper packaging. Chemical-free, allergen-labelled.",
    tag: "Organic",
    href: "/collections/hampers",
  },
  {
    icon: "🔋",
    title: "Durable Drinkware",
    desc: "Stainless steel and copper bottles replace hundreds of plastic bottles per year per employee. The most impactful sustainable swap.",
    tag: "Longevity",
    href: "/collections/drinkware",
  },
]

const ESG_CHECKLIST = [
  { item: "Material is biodegradable, recycled, or long-lasting (displaces single-use items)" },
  { item: "Packaging is plastic-free or recyclable (kraft paper, seed paper, recycled cardboard)" },
  { item: "Supplier provides chain-of-custody documentation on materials (on request)" },
  { item: "No single-use plastic wrapping or polybags" },
  { item: "Gift is practical - increases the chance it is kept and used, not discarded" },
  { item: "Carbon footprint considered: locally sourced where possible" },
]


const FAQ_ITEMS = [
  {
    q: "What are sustainable corporate gift options for Indian companies?",
    a: "The best sustainable corporate gifts are seed paper stationery, bamboo accessories, recycled notebooks, indoor plant kits, natural wellness hampers, and stainless steel or copper drinkware. All are available with logo branding from MintBox, MOQ from 25 units.",
  },
  {
    q: "Are eco-friendly corporate gifts more expensive?",
    a: "Sustainable gifts are typically 10–20% more expensive than conventional equivalents at similar quality. However, the gap is closing as demand grows. At ₹500–2,000 per unit, you can find premium eco-friendly options at price parity with standard corporate gifts.",
  },
  {
    q: "How do I verify if a corporate gift is truly eco-friendly?",
    a: "Use our ESG checklist: material is biodegradable or recycled; packaging is plastic-free; supplier can provide sourcing documentation; the item is practical enough to be kept and used (not thrown away). MintBox provides documentation on request for all eco-friendly product lines.",
  },
  {
    q: "What is the most popular sustainable corporate gift in India?",
    a: "Bamboo notebooks with branded covers are the highest-volume sustainable gift - premium look, sub-₹500 price point, and easy personalisation. Seed paper notepads and stainless steel bottles also rank highly for their zero-waste credentials and daily utility.",
  },
  {
    q: "Can I get eco-friendly corporate gifts with company logo?",
    a: "Yes. All MintBox eco-friendly products are available with logo branding - laser engraving on bamboo and drinkware, UV or screen printing on notebooks, and custom labels on packaging. Minimum order 25 units. Zero-waste packaging available on request.",
  },
]

export default function SustainableGiftsClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Sustainable Corporate Gifts", "item": "https://themintbox.in/guides/sustainable-corporate-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Sustainable Corporate Gifts for ESG-Conscious Companies",
        "description": "Eco-friendly and sustainable corporate gifts for ESG-conscious companies. Bamboo, seed kits, recycled stationery, and more. Bulk orders, pan-India delivery.",
        "url": "https://themintbox.in/guides/sustainable-corporate-gifts",
        "dateModified": "2026-05-26T00:00:00+05:30",
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
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
              <a href="/guides/corporate-gifting-handbook">Guides</a>
              <span className="cp-breadcrumb-sep">›</span>
              <span className="cp-breadcrumb-current">Sustainable Corporate Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">ESG &amp; Sustainability · Eco-Friendly Gifting</div>
            <h1 className="cp-hero-title">
              Sustainable Corporate Gifts<br />
              <em>for ESG-Conscious Companies</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Eco-friendly, biodegradable, and long-lasting gifts that reflect your brand values -
              bamboo, seed paper, recycled stationery, and more.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-hero-cta-primary">Browse Eco Gifts ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ MOQ 25 units</span>
              <span className="cp-hero-badge">✓ Plastic-free packaging</span>
              <span className="cp-hero-badge">✓ Logo branding available</span>
              <span className="cp-hero-badge">✓ GST invoicing</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" alt="Green sustainable corporate gifting" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80" alt="Sustainable bamboo corporate gift" className="cp-hero-img-actual" loading="lazy" />
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
            content="Sustainable corporate gifts include seed paper stationery, bamboo accessories, recycled notebooks, indoor plant kits, and stainless steel drinkware. All available with logo branding from MOQ 25 units. 10–20% price premium over conventional gifts - closing fast as demand grows."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "Plastic-free packaging on all eco-friendly orders",
              "Sourcing documentation available on request",
              "Laser engraving and UV printing on eco products",
              "Pan-India delivery with GST-compliant invoicing",
            ]}
          />
        </div>
      </div>

      {/* 3. STATS BAND */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">200+</div>
              <div className="cp-stat-label">Clients</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">50,000+</div>
              <div className="cp-stat-label">Gifts Delivered</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Plastic-Free</div>
              <div className="cp-stat-label">Packaging</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Pan-India</div>
              <div className="cp-stat-label">Delivery</div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. ECO CATEGORIES */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Gift Categories</div>
          <h2 className="cp-section-title">Sustainable Corporate Gift Categories</h2>
          <p className="cp-section-sub">
            Six categories of eco-friendly gifts - each available with logo branding from MOQ
            25 units.
          </p>
          <div className="cp-card-grid cp-card-grid--3">
            {ECO_CATEGORIES.map((cat) => (
              <div key={cat.title} className="cp-card">
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{cat.icon}</div>
                <div className="cp-card-title">{cat.title}</div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.72em',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    background: 'var(--forest-green, #1B4D3E)',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    marginBottom: '10px',
                  }}
                >
                  {cat.tag}
                </span>
                <p className="cp-card-desc">{cat.desc}</p>
                <a
                  href={cat.href}
                  style={{
                    display: 'inline-block',
                    marginTop: '12px',
                    fontSize: '0.85em',
                    fontWeight: 600,
                    color: 'var(--forest-green, #1B4D3E)',
                    textDecoration: 'none',
                  }}
                >
                  Explore →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ESG CHECKLIST */}
      <section className="cp-section cp-section--white">
        <div className="cp-container--narrow">
          <div className="cp-section-eyebrow">ESG Guide</div>
          <h2 className="cp-section-title">ESG Gift Checklist: Is Your Gift Truly Sustainable?</h2>
          <p className="cp-section-sub">
            Use this checklist to evaluate any corporate gift against sustainability criteria.
            MintBox eco-friendly products meet all six criteria.
          </p>
          <div className="cp-card" style={{ padding: '32px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {ESG_CHECKLIST.map((entry) => (
                <li
                  key={entry.item}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontSize: '0.95em',
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      fontWeight: 700,
                      color: '#2a7a4f',
                      fontSize: '1.05em',
                    }}
                  >
                    ✓
                  </span>
                  <span>{entry.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Eco Products</div>
          <h2 className="cp-section-title">Browse Sustainable Corporate Gift Products</h2>
          <p className="cp-section-sub">
            All eco-friendly products with logo branding available. Filter by price to match your
            per-head budget.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Sustainable Corporate Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80" alt="Sustainable eco-friendly corporate gifts including bamboo accessories and recycled stationery" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            Sustainable gifting is not a niche any more - it is the expectation for ESG-conscious
            companies. The shift from plastic to bamboo is the single highest-signal swap you can
            make in your gifting programme.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Eco-Friendly Gifting</div>
            <h2 className="cp-cta-title">Build Your<br />Sustainable Gift Programme</h2>
            <p className="cp-cta-sub">
              Tell us your ESG requirements, budget, and headcount - we will recommend eco-friendly
              products that meet your sustainability criteria and brand guidelines.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Eco Gift Quote"
              ctaLabel="Get Eco Quote"
              defaultOccasion="sustainable"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="catalog" />

      {/* 9. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Sustainable Corporate Gifts - Frequently Asked Questions"
          />
        </div>
      </section>

      {/* 10. RELATED LINKS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title">Related Guides</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Collections', title: 'Eco-Friendly Gifts', href: '/collections/eco-friendly-gifts' },
              { label: 'Ideas', title: 'Unique Corporate Gifts', href: '/guides/unique-corporate-gifts' },
              { label: 'Trends', title: 'Corporate Gifting Trends 2026', href: '/guides/corporate-gifting-trends-2026' },
              { label: 'Personalisation', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Eco Gifts', title: 'Eco-Friendly Corporate Gifts', href: '/collections/eco-friendly-gifts' },
            ].map((link) => (
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
