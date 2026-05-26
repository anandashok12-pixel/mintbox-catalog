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

const BOTTLE_TYPES = [
  { name: "Stainless Steel Bottles", capacity: "500ml – 1L", finish: "Matte, gloss, or powder coat", branding: "Laser engraving or UV print", price: "₹350–₹700", best: "All-staff gifting, budget-conscious orders" },
  { name: "Copper Bottles", capacity: "1L", finish: "Hammered or smooth", branding: "Laser engraving", price: "₹600–₹1,200", best: "Premium gifting, Ayurvedic wellness angle" },
  { name: "Insulated Tumbler", capacity: "450ml – 600ml", finish: "Matte or metallic", branding: "UV print or engraving", price: "₹500–₹900", best: "Coffee-drinkers, client gifts, executive teams" },
  { name: "Branded Sipper", capacity: "700ml – 1L", finish: "Plastic-free, BPA-free", branding: "Full wrap print or logo", price: "₹200–₹500", best: "Large teams, field staff, events" },
]

const CUSTOMISATION_STEPS = [
  { num: "1", title: "Choose Bottle Type & Quantity", desc: "Select from stainless steel, copper, or insulated. Share quantity (MOQ: 25 units). Volume discounts from 100+ units." },
  { num: "2", title: "Share Your Artwork", desc: "Send your logo in AI, EPS, or high-res PNG. We handle colour matching and placement preview." },
  { num: "3", title: "Approve Mockup", desc: "We send a digital mockup within 24 hours. Physical sample available for orders of 100+." },
  { num: "4", title: "Production & Delivery", desc: "7–10 business days for standard runs. Same-day Bangalore delivery for in-stock items. Pan-India tracked shipping." },
]

const FAQ_ITEMS = [
  { q: "What types of customized water bottles does MintBox offer?", a: "MintBox offers stainless steel bottles, copper bottles, insulated tumblers, and BPA-free sippers. All can be branded with your logo via laser engraving, UV printing, or full-wrap printing. MOQ is 25 units." },
  { q: "What is the minimum order quantity for custom water bottles?", a: "The minimum order is 25 units for most bottle types. For bulk orders of 500+ units, we offer additional volume pricing and priority production slots." },
  { q: "How is branding applied to water bottles?", a: "We use laser engraving for a premium permanent finish, UV printing for full-colour logos, and screen printing for text-heavy designs. The method depends on the bottle material and your artwork." },
  { q: "How long does it take to produce customized water bottles?", a: "Standard orders are ready in 7–10 business days from artwork approval. Rush orders may be accommodated for Bangalore deliveries - contact us to check availability." },
  { q: "Can I get a sample before placing a bulk order?", a: "Yes. Physical samples are available for orders of 100+ units. For smaller orders, we provide a digital mockup within 24 hours of receiving your artwork." },
]

const RELATED = [
  { href: '/collections/drinkware', label: 'Drinkware Collection' },
  { href: '/collections/drinkware/personalized-coffee-mugs', label: 'Personalized Coffee Mugs' },
  { href: '/customization/personalized-corporate-gifts', label: 'Personalized Corporate Gifts' },
  { href: '/collections/corporate-gifts', label: 'All Corporate Gifts' },
  { href: '/guides/corporate-gifts-under-1000', label: 'Budget' },
]


export default function CustomWaterBottlesClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Drinkware", "item": "https://themintbox.in/collections/drinkware" },
          { "@type": "ListItem", "position": 3, "name": "Customized Water Bottles", "item": "https://themintbox.in/collections/drinkware/customized-water-bottles" },
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
              <span className="cp-breadcrumb-current">Customized Water Bottles</span>
            </nav>
            <h1 className="cp-hero-title">Customized Water Bottles for Corporate Gifting</h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Logo-branded bottles for your team - stainless steel, copper, and insulated. MOQ 25 units, pan-India delivery.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-hero-cta-primary">Browse Bottles</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80" alt="Custom branded corporate water bottle" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=800&q=80" alt="Premium water bottle corporate gift" className="cp-hero-img-actual" loading="lazy" />
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
            content="MintBox offers customized stainless steel, copper, and insulated water bottles with logo engraving or UV printing. MOQ from 25 units. Price from ₹200 per unit. Turnaround 7–10 business days. Pan-India delivery."
          />
          <EATSignal credentials={[
            "4 bottle types: stainless steel, copper, insulated, and sipper",
            "MOQ from 25 units with volume discounts at 100+",
            "Laser engraving, UV printing, and full-wrap print options",
            "Digital mockup within 24 hours of artwork submission",
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
              <div className="cp-stat-value">7–10</div>
              <div className="cp-stat-label">Day Turnaround</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Pan-India</div>
              <div className="cp-stat-label">Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BOTTLE TYPES TABLE */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Product Types</div>
          <h2 className="cp-section-title">Types of Customized Water Bottles</h2>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Finish</th>
                  <th>Branding Method</th>
                  <th>Price Range</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                {BOTTLE_TYPES.map(row => (
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

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80" alt="Custom branded corporate water bottles with logo engraving" loading="lazy" />
      </figure>

      {/* 5. PRODUCT SHOWCASE */}
      <section className="cp-section cp-section--white" id="products">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Browse</div>
          <h2 className="cp-section-title">Browse Customized Water Bottles</h2>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Customized Water Bottles"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* 6. CUSTOMISATION STEPS */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Our Process</div>
          <h2 className="cp-section-title">How to Order Customized Water Bottles</h2>
          <div className="cp-steps cp-steps--4">
            {CUSTOMISATION_STEPS.map(step => (
              <div key={step.num} className="cp-step">
                <div className="cp-step-num cp-step-num--gold">{step.num}</div>
                <div className="cp-step-title">{step.title}</div>
                <p className="cp-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            A branded water bottle sits on every desk and travels to every meeting - 700+ brand impressions a year for a one-time cost of ₹350.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section className="cp-cta-section" id="quote">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Get a Quote</div>
            <h2 className="cp-cta-title">Ready to Order<br />Customized Water Bottles?</h2>
            <p className="cp-cta-sub">
              Share your quantity, bottle type, and logo. We will respond with pricing and a free digital mockup within 4 hours.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Bottle Pricing"
              ctaLabel="Request Bottle Quote"
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
            title="Customized Water Bottles - Frequently Asked Questions"
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
