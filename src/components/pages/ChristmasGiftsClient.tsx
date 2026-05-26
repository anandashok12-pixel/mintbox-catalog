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

const CHRISTMAS_PACKAGES = [
  {
    name: "Festive Essentials",
    price: "₹500–1,000",
    items: [
      "Branded mug or bottle",
      "Hot chocolate or tea mix",
      "Cookie assortment",
      "Branded gift bag",
    ],
    best: "Large all-staff gifting",
    featured: false,
  },
  {
    name: "Premium Festive Hamper",
    price: "₹1,000–2,500",
    items: [
      "Branded drinkware",
      "Artisan chocolates or cookies",
      "Scented candle or diffuser",
      "Personalised note card",
      "Gift box with ribbon",
    ],
    best: "Mid-tier employees and regular clients",
    featured: true,
  },
  {
    name: "Luxury Christmas Box",
    price: "2,500–5,000",
    items: [
      "Premium copper or insulated bottle",
      "Artisan chocolates + wine alternatives",
      "Desk accessory or tech gift",
      "Personalised branding",
      "Rigid box with tissue and ribbon",
    ],
    best: "Senior leadership, key accounts, VIP clients",
    featured: false,
  },
]

const PLANNING_TIMELINE = [
  {
    num: "1",
    title: "November 1–15",
    desc: "Finalise budget per recipient tier, shortlist items, request samples. This is the latest start for large orders (500+).",
  },
  {
    num: "2",
    title: "November 15–30",
    desc: "Confirm order, share artwork. Production begins. For custom branding, artwork approval before November 20 is critical.",
  },
  {
    num: "3",
    title: "December 1–10",
    desc: "Quality check, packaging, and dispatch for outstation deliveries. Same-day Bangalore delivery available all of December.",
  },
  {
    num: "4",
    title: "December 20–24",
    desc: "Final delivery window. Orders placed after December 15 risk delays - plan early.",
  },
]


const FAQ_ITEMS = [
  {
    q: "What are good Christmas corporate gifts in India?",
    a: "Christmas corporate gifts in India work best when they combine festivity with practicality. Top picks: premium hampers with chocolates and artisan items (₹1,000–2,500), branded drinkware (₹500–1,500), and curated festive boxes with personalised notes. Order by November 30 for December 24 delivery.",
  },
  {
    q: "When should I order Christmas corporate gifts?",
    a: "Order by November 15 for large orders (200+) and by November 30 for orders under 200 units. Production takes 7–10 business days, and December logistics are constrained. MintBox manages December capacity proactively for repeat clients.",
  },
  {
    q: "What Christmas gifts are suitable for all religions?",
    a: "Choose secular gifting themes: premium drinkware, artisan hampers with chocolates, desk accessories, and tech gifts. Avoid explicitly religious imagery unless your team or client culture welcomes it. Focus on warmth, appreciation, and quality - the festive spirit transcends any specific tradition.",
  },
  {
    q: "How much should I spend on Christmas corporate gifts?",
    a: "₹500–1,000 for all-staff gifts, ₹1,000–2,500 for regular clients and mid-level employees, ₹2,500–5,000 for key accounts and senior leadership. December is a strong time to invest - end-of-year gifts are the most remembered.",
  },
  {
    q: "Can I mix personalisation across a large Christmas order?",
    a: "Yes. MintBox handles mixed personalisation - different names across a bulk order - at no extra MOQ. For 25–500 units with individual name printing, allow 2–3 extra business days for personalisation runs.",
  },
]

export default function ChristmasGiftsClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Christmas Corporate Gifts", "item": "https://themintbox.in/guides/christmas-corporate-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Christmas Corporate Gifts for Employees & Clients",
        "description": "Corporate Christmas gifts for Indian businesses - curated hampers, branded gifts, and festive sets. Order early, pan-India delivery from MintBox.",
        "url": "https://themintbox.in/guides/christmas-corporate-gifts",
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
              <span className="cp-breadcrumb-current">Christmas Corporate Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">Seasonal Guide · Christmas &amp; Year-End Gifting</div>
            <h1 className="cp-hero-title">
              Christmas Corporate Gifts<br />
              <em>for Employees &amp; Clients</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Curated hampers, branded gifts, and festive sets for Indian businesses. Order early -
              December production slots fill fast. Pan-India delivery from MintBox.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-hero-cta-primary">Browse Christmas Gifts ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Order by Nov 30</span>
              <span className="cp-hero-badge">✓ ₹500–5,000/head</span>
              <span className="cp-hero-badge">✓ Pan-India delivery</span>
              <span className="cp-hero-badge">✓ GST invoicing</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80" alt="Christmas corporate gift set" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80" alt="Corporate gift packages ready for delivery" className="cp-hero-img-actual" loading="lazy" />
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
            content="The best Christmas corporate gifts are festive hampers, premium drinkware, and personalised gift boxes. Budget: ₹500–1,000 for all-staff, ₹2,500–5,000 for key clients. Order by November 30 - December production slots fill fast."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "December capacity managed proactively for repeat clients",
              "Mixed-name personalisation on bulk orders",
              "Pan-India delivery with city-wise tracking",
              "GST-compliant invoicing for all orders",
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
              <div className="cp-stat-value">6+</div>
              <div className="cp-stat-label">Years in Business</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">48hr</div>
              <div className="cp-stat-label">Turnaround</div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. CHRISTMAS PACKAGES */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Package Options</div>
          <h2 className="cp-section-title">Christmas Gift Package Options</h2>
          <p className="cp-section-sub">
            Three tiers to match every recipient group - from all-staff to VIP clients and senior
            leadership.
          </p>
          <div className="cp-budget-grid">
            {CHRISTMAS_PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`cp-budget-card${pkg.featured ? ' cp-budget-card--featured' : ''}`}
              >
                <div className="cp-budget-label">{pkg.price}</div>
                <div className="cp-budget-price">{pkg.name}</div>
                <ul
                  style={{
                    margin: '12px 0',
                    paddingLeft: '16px',
                    fontSize: '0.9em',
                    lineHeight: 1.7,
                  }}
                >
                  {pkg.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p
                  className="cp-budget-desc"
                  style={{ marginTop: '8px', fontStyle: 'italic', fontSize: '0.85em' }}
                >
                  Best for: {pkg.best}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PLANNING TIMELINE */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Planning Guide</div>
          <h2 className="cp-section-title">Christmas Gifting Timeline</h2>
          <p className="cp-section-sub">
            Follow this timeline to guarantee on-time delivery - even for large orders with full
            custom branding.
          </p>
          <div className="cp-steps">
            {PLANNING_TIMELINE.map((step) => (
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

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Christmas Products</div>
          <h2 className="cp-section-title">Browse Christmas Corporate Gift Products</h2>
          <p className="cp-section-sub">
            All products suitable for Christmas and year-end gifting. Filter by price to match your
            per-head budget.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Christmas Corporate Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80" alt="Festive Christmas corporate gift boxes and hampers with ribbons and wrapping" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            End-of-year gifts are the most remembered gifts a company gives. The right Christmas
            gift closes the year on a high - and opens the new year with goodwill.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Christmas Gifting</div>
            <h2 className="cp-cta-title">Plan Your<br />Christmas Gifting</h2>
            <p className="cp-cta-sub">
              Tell us your headcount, budget per head, and delivery cities - we will come back
              with a curated Christmas proposal and mockup within 4 hours.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Christmas Gift Quote"
              ctaLabel="Get Christmas Quote"
              defaultOccasion="christmas"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* 9. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Christmas Corporate Gifts - Frequently Asked Questions"
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
              { label: 'Seasonal', title: 'Diwali Corporate Gifts', href: '/guides/diwali-corporate-gifts' },
              { label: 'Client Gifts', title: 'Corporate Gifts for Clients', href: '/guides/corporate-gifts-for-clients' },
              { label: 'Ideas', title: 'Unique Corporate Gifts', href: '/guides/unique-corporate-gifts' },
              { label: 'Etiquette', title: 'Corporate Gifting Etiquette', href: '/guides/corporate-gifting-etiquette' },
              { label: 'Handbook', title: 'The Corporate Gifting Handbook', href: '/guides/corporate-gifting-handbook' },
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
