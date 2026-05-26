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

const ZONES = [
  {
    icon: '🏙',
    title: 'Central Bangalore',
    areas: ['Koramangala', 'Indiranagar', 'MG Road', 'UB City', 'Cunningham Road'],
    bg: 'cp-img-green',
  },
  {
    icon: '💻',
    title: 'East & Tech Corridor',
    areas: ['Whitefield', 'Marathahalli', 'Varthur', 'KR Puram', 'Sarjapur Road'],
    bg: 'cp-img-gold',
  },
  {
    icon: '🏢',
    title: 'South Bangalore',
    areas: ['Electronic City', 'HSR Layout', 'BTM Layout', 'Bannerghatta Road', 'Jayanagar'],
    bg: 'cp-img-warm',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Place Order by 11 AM',
    desc: 'WhatsApp or call with your order list, delivery address, and quantity. For pre-printed items, share your logo file if not already on record.',
  },
  {
    num: '02',
    title: 'Confirm & Pay',
    desc: 'We confirm stock, share invoice, and collect advance payment. Rush fee added to total.',
  },
  {
    num: '03',
    title: 'Pack & Dispatch',
    desc: 'Orders are picked, packed with basic branded packaging, and dispatched by 2 PM.',
  },
  {
    num: '04',
    title: 'Deliver by 6 PM',
    desc: 'Our logistics partner delivers to your office. Signature required. Same-day tracking via WhatsApp.',
  },
]

const AVAILABILITY_TABLE = [
  { type: 'Plain stock (no logo)', available: true, notes: 'All items, no lead time' },
  { type: 'Pre-branded MintBox items', available: true, notes: 'MintBox branding, not custom' },
  { type: 'Custom logo printing', available: false, notes: 'Min 3-day production' },
  { type: 'Laser engraving', available: false, notes: 'Min 5-day production' },
  { type: 'Custom hampers', available: true, notes: 'Assembly only, plain items' },
  { type: 'Custom packaging (boxes)', available: false, notes: 'Min 5-day production' },
  { type: 'Name personalisation', available: false, notes: 'Min 7-day production' },
]

const FAQS = [
  {
    q: 'What is the cutoff time for same-day delivery in Bangalore?',
    a: 'Orders placed and confirmed (with payment) by 11 AM on weekdays are eligible for same-day delivery. Weekend same-day delivery is available for orders placed by 9 AM with prior arrangement. Peak periods (Diwali, year-end) may require 12–24 hours notice.',
  },
  {
    q: 'Which areas in Bangalore do you cover for same-day delivery?',
    a: 'We cover Koramangala, Indiranagar, HSR Layout, BTM Layout, Whitefield, Marathahalli, Electronic City, MG Road, Jayanagar, Sarjapur Road, Hebbal, and Yeshwanthpur. Areas beyond the outer ring road may incur an additional ₹200–₹500 delivery charge.',
  },
  {
    q: 'Can I get custom-branded gifts delivered the same day?',
    a: 'Custom logo printing and engraving require a minimum of 3–5 business days. For same-day orders, choose from our pre-branded or plain stock. If you need custom branding urgently, we can arrange a 2-day express production run.',
  },
  {
    q: 'What is the rush delivery fee?',
    a: 'Same-day delivery starts at ₹500 for up to 10 items within 15 km of our warehouse. Larger orders (50+ units) or distant zones (Electronic City, Whitefield) are quoted separately. Fees are shown upfront before confirmation.',
  },
  {
    q: "What if my order isn't delivered by 6 PM?",
    a: "We guarantee delivery by 6 PM or we waive the rush fee. In rare cases (traffic, incorrect address), we'll notify you via WhatsApp with an updated ETA. Our on-time delivery rate for same-day orders is 96%.",
  },
  {
    q: 'Can I order by WhatsApp?',
    a: 'Yes. WhatsApp is our preferred channel for same-day orders - faster than email and easier for last-minute changes. Message us at +91 86182 37189 with your order list, delivery address, and preferred time window.',
  },
]


export default function SameDayDeliveryClient({
  products,
  categories,
}: {
  products: Product[]
  categories: Category[]
}) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Bangalore Corporate Gifting", "item": "https://themintbox.in/bangalore-corporate-gifting" },
          { "@type": "ListItem", "position": 3, "name": "Same-Day Delivery", "item": "https://themintbox.in/bangalore-corporate-gifting/same-day-delivery" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "MintBox",
        "description": "Corporate gifting company based in Bangalore, India - same-day delivery, bulk orders from 25 units, logo customisation.",
        "url": "https://themintbox.in",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bangalore",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        },
        "areaServed": "Bangalore, Karnataka, India",
        "priceRange": "₹₹"
      }) }} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2, padding: '0 40px' }}>
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="cp-breadcrumb-sep">›</span>
            <a href="/bangalore-corporate-gifting">Bangalore Corporate Gifting</a>
            <span className="cp-breadcrumb-sep">›</span>
            <span className="cp-breadcrumb-current">Same-Day Delivery</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Bangalore Delivery · Same Day & Express</div>
              <h1 className="cp-hero-title">
                Same-Day Corporate Gift<br />
                <em>Delivery in Bangalore</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                Order before 11 AM, delivered to your Bangalore office by 6 PM. In-stock branded gifts - bottles,
                notebooks, hampers, tech accessories - available for express dispatch. No custom printing on same-day
                orders; pre-printed and plain stock available.
              </p>
              <div className="cp-hero-ctas">
                <a href="#products" className="cp-hero-cta-primary">Browse In-Stock Gifts ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Request Same-Day Quote</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ Order by 11 AM, deliver by 6 PM</span>
                <span className="cp-hero-badge">✓ Koramangala · Whitefield · HSR · Electronic City</span>
                <span className="cp-hero-badge">✓ Pre-printed & branded stock</span>
                <span className="cp-hero-badge">✓ WhatsApp order support</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80" alt="Bulk corporate gift boxes and hampers" className="cp-hero-img-actual cp-hero-img-actual--tall" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Same-day corporate gift delivery" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Fast same-day corporate gift delivery" className="cp-hero-img-actual" loading="lazy" />
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
            content="Same-day corporate gift delivery in Bangalore is available for in-stock items ordered by 11 AM on weekdays. Delivery covers major areas: Koramangala, Whitefield, HSR Layout, Indiranagar, Electronic City, and Marathahalli. Custom printing is not available for same-day; choose pre-branded or plain items. Rush fee is ₹500–₹1,500 depending on quantity and distance."
          />
          <EATSignal
            credentials={[
              'Same-day delivery to 15+ Bangalore zones',
              'In-stock ready items with pre-applied branding',
              'WhatsApp order support: +91 86182 37189',
              'Trusted by 200+ Bangalore corporates for urgent needs',
              'Order by 11 AM for 6 PM delivery guarantee',
            ]}
          />
        </div>
      </div>


      {/* ── STATS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">4–6</div>
              <div className="cp-stat-unit">hours</div>
              <div className="cp-stat-label">delivery window</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">15+</div>
              <div className="cp-stat-unit">zones</div>
              <div className="cp-stat-label">Bangalore coverage</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹500</div>
              <div className="cp-stat-unit">starts at</div>
              <div className="cp-stat-label">express delivery fee</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">100+</div>
              <div className="cp-stat-unit">SKUs</div>
              <div className="cp-stat-label">in-stock ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ZONES COVERED ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Coverage Map</div>
          <h2 className="cp-section-title">Zones We Cover for Same-Day</h2>
          <p className="cp-section-sub">
            We deliver to all major Bangalore business districts. Areas on or within the outer ring road
            are covered at the standard rush fee; outer zones may incur a small surcharge.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {ZONES.map(zone => (
              <div key={zone.title} className="cp-card">
                <div className={`cp-card-icon ${zone.bg}`} style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {zone.icon}
                </div>
                <div className="cp-card-title">{zone.title}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {zone.areas.map(area => (
                    <li
                      key={area}
                      style={{
                        fontSize: '13px',
                        color: 'rgba(26,26,24,0.6)',
                        fontWeight: 300,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span style={{ color: 'var(--gold,#B8972E)', fontSize: '11px' }}>✓</span> {area}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The Process</div>
          <h2 className="cp-section-title">How Same-Day Delivery Works</h2>
          <p className="cp-section-sub">
            Four steps from order to delivery - all completed within the same business day when you order by 11 AM.
          </p>
          <div className="cp-steps">
            {STEPS.map(step => (
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

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Same-day corporate gift delivery across Bangalore" loading="lazy" />
      </figure>

      {/* ── PRODUCT SHOWCASE ── */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">In-Stock Gifts</div>
          <h2 className="cp-section-title">Browse In-Stock Same-Day Gifts</h2>
          <p className="cp-section-sub">
            All products below are available for same-day dispatch. Filter by category or search by name.
            Add items to your quote and we will confirm availability instantly via WhatsApp.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="In-Stock Corporate Gifts - Same-Day Dispatch"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* ── AVAILABILITY TABLE ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">What's Available</div>
          <h2 className="cp-section-title">Same-Day Availability at a Glance</h2>
          <p className="cp-section-sub">
            Not every gift type is possible for same-day. Use this table to plan your order correctly.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Gift Type</th>
                  <th>Same-Day Available</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {AVAILABILITY_TABLE.map(row => (
                  <tr key={row.type}>
                    <td>{row.type}</td>
                    <td>
                      <span className={`cp-table-badge ${row.available ? 'cp-table-badge--yes' : 'cp-table-badge--extra'}`}>
                        {row.available ? '✓ Yes' : '✗ No'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 300 }}>{row.notes}</td>
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
            "Need 50 welcome kits by Thursday morning? WhatsApp us by 11 AM today - we'll confirm stock,
            price, and delivery window within the hour."
          </p>
          <a href="#quote" className="cp-quote-band-cta">Request Same-Day Quote →</a>
        </div>
      </div>

      {/* ── CTA + FORM ── */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-cta-eyebrow">Express Delivery</div>
            <h2 className="cp-cta-title">Request Same-Day<br />Delivery Quote</h2>
            <p className="cp-cta-sub">
              Share your order list, quantity, and delivery address. We will confirm stock and
              dispatch time within the hour.
            </p>
            <div className="cp-quote-form-panel" />
          </div>
          <InlineQuoteForm
            title="Request Same-Day Delivery Quote"
            subtitle="Order by 11 AM for 6 PM delivery anywhere in Bangalore. Tell us what you need."
            ctaLabel="Get Same-Day Quote"
            defaultOccasion="corporate_event"
          />
        </div>
      </section>

      <MidPageCTA variant="whatsapp" />

      {/* ── FAQ ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <FAQSection
            items={FAQS}
            title="Same-Day Corporate Gift Delivery - FAQs"
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
              { label: 'Bangalore', title: 'All Bangalore Corporate Gifting', href: '/bangalore-corporate-gifting' },
              { label: 'Bangalore', title: 'Bulk Gifting Bangalore', href: '/bangalore-corporate-gifting/bulk-gifting' },
              { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
              { label: 'Drinkware', title: 'Branded Drinkware', href: '/collections/drinkware' },
              { label: 'Hampers', title: 'Corporate Hampers', href: '/collections/hampers' },
              { label: 'Budget Guide', title: 'Budget Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
              { label: 'Bangalore Hub', title: 'Corporate Gifting in Bangalore', href: '/bangalore-corporate-gifting' },
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
        <LastUpdatedDate date="2026-05-25" />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
