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

interface Category { id: string; name: string; emoji?: string | null; slug: string }
interface Product {
  id: string; name: string; price: number; emoji?: string | null
  image?: { url?: string | null; sizes?: { card?: { url?: string | null } } } | null
  description: string; features?: Array<{ feature: string; id?: string }> | null
  moq?: number | null; customisable?: boolean | null; inStock?: boolean | null
  category: Category | string
}
interface Props { products: Product[]; categories: Category[] }

const WHAT_TO_LOOK_FOR = [
  {
    icon: "🏷️",
    title: "MOQ Flexibility",
    desc: "Look for suppliers who can handle both small orders (25–50 units) and large runs (500+). Rigid MOQs of 500+ exclude most SMEs.",
  },
  {
    icon: "🎨",
    title: "Branding Capability",
    desc: "Your supplier should offer logo printing, embossing, UV printing, and packaging customisation - not just generic products.",
  },
  {
    icon: "📄",
    title: "GST Compliance",
    desc: "All corporate purchases need proper GST invoicing. Verify your supplier is GST-registered and provides itemised bills.",
  },
  {
    icon: "⚡",
    title: "Turnaround Time",
    desc: "Standard orders should be ready in 7–10 business days. Suppliers who promise less than 3 days may cut corners on quality.",
  },
  {
    icon: "📦",
    title: "Packaging Quality",
    desc: "Premium packaging protects products in transit and elevates unboxing. Ask for samples before placing a bulk order.",
  },
  {
    icon: "🤝",
    title: "Account Management",
    desc: "A dedicated point of contact saves time. Avoid suppliers who make you repeat your requirements every order.",
  },
]

const MINTBOX_ADVANTAGES = [
  { label: "MOQ", value: "From 25 units" },
  { label: "Turnaround", value: "7–10 business days" },
  { label: "Branding", value: "Logo print, emboss, UV, packaging" },
  { label: "GST", value: "Compliant invoicing on every order" },
  { label: "Delivery", value: "Pan-India + same-day Bangalore" },
  { label: "Account Manager", value: "Dedicated for every client" },
]

const PRODUCT_CATEGORIES = [
  { name: "Drinkware", items: "Stainless steel bottles, copper bottles, mugs, tumblers", href: "/collections/drinkware" },
  { name: "Stationery", items: "Notebooks, pens, planners, desk sets", href: "/collections/stationery" },
  { name: "Hampers", items: "Sweets, dry fruits, branded item combos", href: "/collections/hampers" },
  { name: "Tech Gifts", items: "Wireless chargers, phone stands, cable organisers", href: "/collections/tech-gifts" },
  { name: "Welcome Kits", items: "Onboarding boxes for new employees", href: "/collections/employee-welcome-kit" },
  { name: "Eco-Friendly", items: "Seed kits, bamboo products, recycled items", href: "/collections/eco-friendly-gifts" },
]

const FAQ_ITEMS = [
  {
    q: "Who are the best corporate gift suppliers in Bangalore?",
    a: "MintBox is a leading Bangalore-based corporate gift supplier with 200+ clients across India. We offer branded drinkware, stationery, hampers, tech gifts, and custom welcome kits with GST-compliant invoicing and pan-India delivery.",
  },
  {
    q: "What is the minimum order quantity for corporate gifts in Bangalore?",
    a: "MintBox accepts orders from 25 units. Most categories have no fixed upper limit. For orders of 500+, we offer additional customisation and volume pricing.",
  },
  {
    q: "How long does corporate gift production take in Bangalore?",
    a: "Standard branded orders take 7–10 business days. For urgent requirements, same-day and next-day delivery is available within Bangalore for in-stock items. Speak to our team about expedited production.",
  },
  {
    q: "Do Bangalore corporate gift suppliers provide GST invoices?",
    a: "MintBox is GST-registered and provides compliant invoices for every order. This is essential for corporate tax filing and internal procurement processes. Many smaller suppliers are unregistered - always verify before ordering.",
  },
  {
    q: "Can corporate gift suppliers in Bangalore deliver pan-India?",
    a: "Yes. MintBox delivers across India with tracked logistics. For large dispersed teams (remote employees or multi-city offices), we offer individual delivery to each employee's address with their gift.",
  },
]


export default function SuppliersClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Bangalore Corporate Gifting", "item": "https://themintbox.in/bangalore-corporate-gifting" },
          { "@type": "ListItem", "position": 3, "name": "Suppliers", "item": "https://themintbox.in/bangalore-corporate-gifting/suppliers" }
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
            <span className="cp-breadcrumb-current">Suppliers</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Bangalore · Corporate Gift Suppliers</div>
              <h1 className="cp-hero-title">
                Corporate Gift Suppliers in Bangalore:<br />
                <em>Why MintBox Stands Out</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                {"Bangalore's most trusted corporate gifting partner - branded merchandise, bulk orders, GST invoicing, and pan-India delivery."}
              </p>
              <div className="cp-hero-ctas">
                <a href="#products" className="cp-hero-cta-primary">Browse Products ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ MOQ from 25 units</span>
                <span className="cp-hero-badge">✓ Dedicated account manager</span>
                <span className="cp-hero-badge">✓ GST invoicing</span>
                <span className="cp-hero-badge">✓ Pan-India delivery</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80" alt="Corporate gift packages ready for delivery" className="cp-hero-img-actual cp-hero-img-actual--tall" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80" alt="Modern corporate office building" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80" alt="Bulk corporate gift boxes and hampers" className="cp-hero-img-actual" loading="lazy" />
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
            content="MintBox is a Bangalore-based corporate gift supplier offering branded merchandise, custom hampers, and bulk gifting with GST-compliant invoicing, dedicated account managers, and pan-India delivery. MOQ from 25 units."
          />
          <EATSignal
            credentials={[
              'Bangalore-based corporate gift supplier since 2019',
              '200+ corporate clients across India',
              '50,000+ gifts delivered pan-India',
              'GST-registered with compliant invoicing on every order',
              'Dedicated account manager for every client',
            ]}
          />
        </div>
      </div>


      {/* ── STATS BAND ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">200+</div>
              <div className="cp-stat-unit">Corporate Clients</div>
              <div className="cp-stat-label">served across India</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">50,000+</div>
              <div className="cp-stat-unit">Gifts Delivered</div>
              <div className="cp-stat-label">and counting</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">25</div>
              <div className="cp-stat-unit">MOQ (Minimum)</div>
              <div className="cp-stat-label">units per order</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Pan-India</div>
              <div className="cp-stat-unit">Delivery</div>
              <div className="cp-stat-label">tracked logistics</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT TO LOOK FOR ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Supplier Checklist</div>
          <h2 className="cp-section-title">What to Look for in a Corporate Gift Supplier</h2>
          <p className="cp-section-sub">
            Six criteria to evaluate before you commit to a supplier - and how MintBox measures up on each.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {WHAT_TO_LOOK_FOR.map(item => (
              <div key={item.title} className="cp-card">
                <div className="cp-card-icon cp-img-green" style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {item.icon}
                </div>
                <div className="cp-card-title">{item.title}</div>
                <div className="cp-card-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MINTBOX AT A GLANCE TABLE ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">At a Glance</div>
          <h2 className="cp-section-title">MintBox at a Glance</h2>
          <p className="cp-section-sub">
            Key numbers and capabilities at a glance - everything you need to know before placing an order.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <tbody>
                {MINTBOX_ADVANTAGES.map(row => (
                  <tr key={row.label}>
                    <td style={{ fontWeight: 600 }}>{row.label}</td>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1556742212-5b321f3c261b?auto=format&fit=crop&w=1200&q=80" alt="Corporate gift supplier meeting and business partnership in Bangalore" loading="lazy" />
      </figure>

      {/* ── PRODUCT CATEGORIES ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">What We Supply</div>
          <h2 className="cp-section-title">Our Corporate Gift Categories</h2>
          <p className="cp-section-sub">
            {"Six product categories covering every corporate occasion - from everyday desk gifts to premium client hampers."}
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {PRODUCT_CATEGORIES.map(cat => (
              <a key={cat.href} href={cat.href} className="cp-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="cp-card-title">{cat.name}</div>
                <div className="cp-card-desc">{cat.items}</div>
                <div style={{ marginTop: '12px', color: 'var(--cp-green, #2d7a4f)', fontWeight: 600, fontSize: '14px' }}>
                  Browse {cat.name} →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Product Catalogue</div>
          <h2 className="cp-section-title">Browse Corporate Gift Products</h2>
          <p className="cp-section-sub">
            All products available for corporate orders. Filter by category or price, add to your quote list,
            and we will confirm pricing and timelines within 24 hours.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Corporate Gifts - Bottles, Notebooks, Tech, Hampers & More"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* ── QUOTE BAND ── */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <p className="cp-quote-band-text">
            {"Ready to order branded corporate gifts? Share your brief and we'll send a full quote with production timeline within 24 hours."}
          </p>
          <a href="#quote" className="cp-quote-band-cta">Get a Quote →</a>
        </div>
      </div>

      {/* ── INLINE QUOTE FORM ── */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-cta-eyebrow">Corporate Gifting</div>
            <h2 className="cp-cta-title">Get a<br />Supplier Quote</h2>
            <p className="cp-cta-sub">
              {"Tell us your quantity, occasion, and budget. We'll send a full quote with branded options and production timeline within 24 hours."}
            </p>
          </div>
          <InlineQuoteForm
            title="Get a Quote"
            subtitle="Share your quantity and occasion - quote within 24 hours, dedicated account manager assigned."
            ctaLabel="Request Supplier Quote"
            defaultOccasion="other"
          />
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* ── FAQ ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <FAQSection
            items={FAQ_ITEMS}
            title="Corporate Gift Suppliers in Bangalore - FAQs"
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
              { title: 'Bangalore Corporate Gifting', href: '/bangalore-corporate-gifting' },
              { title: 'Bulk Gifting Bangalore', href: '/bangalore-corporate-gifting/bulk-gifting' },
              { title: 'Same-Day Delivery Bangalore', href: '/bangalore-corporate-gifting/same-day-delivery' },
              { title: 'Corporate Gift Collections', href: '/collections/corporate-gifts' },
              { title: 'Corporate Gifting in Bangalore', href: '/bangalore-corporate-gifting' },
            ].map(link => (
              <a key={link.href} href={link.href} className="cp-related-card">
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
