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

const MUG_TYPES = [
  { name: "Ceramic Mugs", capacity: "300ml – 400ml", finish: "Gloss or matte glaze", branding: "Full-colour sublimation print", price: "₹150–₹350", best: "Desk gifts, large all-staff orders, events" },
  { name: "Enamel Mugs", capacity: "350ml – 500ml", finish: "Speckled enamel coating", branding: "Screen print or pad print", price: "₹250–₹500", best: "Outdoor events, camps, rustic aesthetic brands" },
  { name: "Stainless Steel Travel Mugs", capacity: "350ml – 450ml", finish: "Matte or brushed steel", branding: "Laser engraving or UV print", price: "₹400–₹800", best: "Premium desks, client gifts, WFH teams" },
  { name: "Double-Wall Glass Mugs", capacity: "300ml – 400ml", finish: "Clear borosilicate glass", branding: "Etched or printed", price: "₹300–₹600", best: "Minimalist brands, design-forward offices" },
]

const PERSONALISATION_OPTIONS = [
  { option: "Company Logo", desc: "Your logo printed or engraved on the mug body. Full-colour or single-colour options." },
  { option: "Employee Name", desc: "Individual name printing on each mug - ideal for onboarding kits and personal appreciation gifts." },
  { option: "Custom Message", desc: "A tagline, motivational quote, or inside joke. Works best on ceramic with sublimation printing." },
  { option: "Pantone Colour Match", desc: "Mug body colour matched to your brand palette. Available on ceramic and steel variants." },
  { option: "Gift Packaging", desc: "Individual box packaging with tissue and ribbon. Add a branded note card per mug." },
]

const FAQ_ITEMS = [
  { q: "What types of personalized mugs does MintBox offer?", a: "MintBox offers ceramic mugs, enamel mugs, stainless steel travel mugs, and double-wall glass mugs. All can be branded with your logo via sublimation printing, laser engraving, or screen printing. MOQ from 25 units." },
  { q: "Can mugs be personalized with individual employee names?", a: "Yes. Individual name personalisation is available for orders of 25+ units. Each mug can have a unique name printed or engraved alongside your company logo. This is popular for onboarding kits and appreciation gifts." },
  { q: "What is the minimum order for personalized coffee mugs?", a: "The minimum order quantity is 25 units. Volume pricing applies from 100 units. For mixed personalisation (different names), no extra MOQ is required." },
  { q: "How long does production take for branded mugs?", a: "Standard orders are ready in 7–10 business days from artwork approval. For ceramic sublimation, allow an extra 2–3 business days. Rush Bangalore delivery is available for in-stock items." },
  { q: "What file format do I need for mug logo printing?", a: "We accept AI, EPS, or high-resolution PNG files (300 DPI+). For sublimation, SVG or vector formats give the sharpest results. Our design team can prepare a free mockup before production." },
]

const RELATED = [
  { href: '/collections/drinkware', label: 'Drinkware Collection' },
  { href: '/collections/drinkware/customized-water-bottles', label: 'Customized Water Bottles' },
  { href: '/customization/personalized-corporate-gifts', label: 'Personalized Corporate Gifts' },
  { href: '/collections/corporate-gifts', label: 'All Corporate Gifts' },
  { href: '/guides/corporate-gifts-under-1000', label: 'Budget' },
]


export default function PersonalizedMugsClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Drinkware", "item": "https://themintbox.in/collections/drinkware" },
          { "@type": "ListItem", "position": 3, "name": "Personalized Coffee Mugs", "item": "https://themintbox.in/collections/drinkware/personalized-coffee-mugs" },
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
              <a href="/collections/drinkware">Drinkware</a>
              <span className="cp-breadcrumb-sep">›</span>
              <span className="cp-breadcrumb-current">Personalized Coffee Mugs</span>
            </nav>
            <h1 className="cp-hero-title">Personalized Coffee Mugs for Corporate Gifting</h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Logo-branded mugs your team will use every day - ceramic, enamel, and steel. MOQ 25 units.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-hero-cta-primary">Browse Mugs</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" alt="Branded corporate coffee mug gift" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80" alt="Premium tea mug personalised gift" className="cp-hero-img-actual" loading="lazy" />
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
            content="MintBox offers personalized corporate coffee mugs - ceramic, enamel, stainless steel, and glass - with logo printing or employee name personalisation. MOQ from 25 units. Price from ₹150. Turnaround 7–10 business days."
          />
          <EATSignal credentials={[
            "4 mug types: ceramic, enamel, stainless steel, and glass",
            "Individual employee name printing from 25 units",
            "Full-colour sublimation, laser engraving, and screen print options",
            "Free digital mockup within 24 hours of artwork submission",
            "Pan-India delivery in 7–10 business days",
          ]} />
        </div>
      </div>


      {/* 3. STATS BAND */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">25</div>
              <div className="cp-stat-label">MOQ</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">50,000<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Gifts Delivered</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Full-Colour</div>
              <div className="cp-stat-label">Print Available</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">7–10</div>
              <div className="cp-stat-label">Day Turnaround</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MUG TYPES TABLE */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Product Types</div>
          <h2 className="cp-section-title">Types of Personalized Corporate Mugs</h2>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Finish</th>
                  <th>Branding</th>
                  <th>Price Range</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                {MUG_TYPES.map(row => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.capacity}</td>
                    <td>{row.finish}</td>
                    <td>{row.branding}</td>
                    <td>{row.price}</td>
                    <td>{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. PERSONALISATION OPTIONS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Options</div>
          <h2 className="cp-section-title">Personalisation Options</h2>
          <div className="cp-cards-grid cp-cards-grid--2">
            {PERSONALISATION_OPTIONS.map(item => (
              <div key={item.option} className="cp-card">
                <div className="cp-card-title">{item.option}</div>
                <p className="cp-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80" alt="Personalised branded corporate coffee mugs for gifting" loading="lazy" />
      </figure>

      {/* 6. PRODUCT SHOWCASE */}
      <section className="cp-section cp-section--cream" id="products">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Browse</div>
          <h2 className="cp-section-title">Browse Personalized Coffee Mugs</h2>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Personalized Coffee Mugs"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            A mug with your logo is used 2–3 times a day. Over a year, that is 700+ brand impressions - for a one-time cost of ₹200.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section className="cp-cta-section" id="quote">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Get a Quote</div>
            <h2 className="cp-cta-title">Ready to Order<br />Personalized Mugs?</h2>
            <p className="cp-cta-sub">
              Share your quantity, mug type, and logo. We will respond with pricing and a free digital mockup within 4 hours.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Mug Pricing"
              ctaLabel="Request Mug Quote"
              defaultOccasion="welcome_kit"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="catalog" />

      {/* 9. FAQ */}
      <section className="cp-section cp-section--white">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Personalized Coffee Mugs - Frequently Asked Questions"
          />
        </div>
      </section>

      {/* 10. RELATED LINKS */}
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

      {/* 11. LAST UPDATED */}
      <div className="cp-container--narrow" style={{ padding: '0 24px' }}>
        <LastUpdatedDate date="2026-05-25" />
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
