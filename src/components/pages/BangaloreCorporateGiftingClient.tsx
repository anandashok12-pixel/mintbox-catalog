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

const SERVICES = [
  {
    icon: '⚡',
    title: 'Same-Day Delivery',
    desc: 'In-stock branded gifts delivered across Bangalore in 4–6 hours. Koramangala, Whitefield, HSR Layout, Electronic City and beyond.',
    href: '/bangalore-corporate-gifting/same-day-delivery',
    cta: 'View Same-Day Options →',
    bg: 'cp-img-green',
  },
  {
    icon: '📦',
    title: 'Bulk Corporate Gifting',
    desc: '100 to 10,000 units with transparent bulk pricing, dedicated account manager, and GST-compliant invoicing. Pan-India dispatch from Bangalore.',
    href: '/bangalore-corporate-gifting/bulk-gifting',
    cta: 'Get Bulk Pricing →',
    bg: 'cp-img-gold',
  },
  {
    icon: '🏭',
    title: 'Verified Local Suppliers',
    desc: "MintBox works with Bangalore's best corporate gift manufacturers. Shorter lead times, in-person sampling, and quality you can see before you order.",
    href: '/bangalore-corporate-gifting/suppliers',
    cta: 'Browse Suppliers →',
    bg: 'cp-img-warm',
  },
]

const AREAS_SERVED = [
  'Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City',
  'HSR Layout', 'Marathahalli', 'Jayanagar', 'JP Nagar',
  'Bannerghatta Road', 'Sarjapur Road', 'MG Road', 'Hebbal',
]

const WHY_MINTBOX = [
  {
    icon: '📍',
    title: 'Bangalore-Based',
    desc: 'Our operations and warehouse are in Bangalore. No third-party logistics for city deliveries - we control the end-to-end experience.',
  },
  {
    icon: '⏱️',
    title: 'Fast Turnaround',
    desc: 'Same-day delivery for in-stock items. Standard bulk orders in 7–10 business days. Rush orders (3–5 days) available for most products.',
  },
  {
    icon: '🎨',
    title: 'Logo Customisation',
    desc: 'Pad printing, UV printing, engraving, and embroidery on 85%+ of products. Branded gifts only - no generic gifting.',
  },
  {
    icon: '📄',
    title: 'GST-Compliant',
    desc: 'Full GST invoicing on every order. Compliant with corporate procurement systems. HSN codes and itemised billing included.',
  },
]

const INDUSTRIES = [
  { label: 'Tech & Startups', href: '/industry-solutions/startups', emoji: '💻' },
  { label: 'Tech Companies', href: '/industry-solutions/tech-companies', emoji: '🏢' },
  { label: 'Personalised Gifts', href: '/customization/personalized-corporate-gifts', emoji: '✏️' },
  { label: 'Eco-Friendly', href: '/collections/eco-friendly-gifts', emoji: '🌿' },
]

const FAQS = [
  {
    q: 'Does MintBox offer same-day corporate gift delivery in Bangalore?',
    a: 'Yes. For in-stock items, we offer same-day delivery across major Bangalore areas including Koramangala, Whitefield, HSR Layout, Electronic City, Indiranagar, and Marathahalli. Orders placed before 11 AM are typically delivered by 5–6 PM. See our <a href="/bangalore-corporate-gifting/same-day-delivery">same-day delivery page</a> for coverage and product availability.',
  },
  {
    q: 'What areas of Bangalore do you deliver to?',
    a: 'We deliver across Bangalore - Koramangala, Indiranagar, Whitefield, Electronic City, HSR Layout, Marathahalli, Jayanagar, JP Nagar, Bannerghatta Road, Sarjapur Road, MG Road, Hebbal, and surrounding areas. For locations outside Bangalore, we ship pan-India with 3–5 business day delivery.',
  },
  {
    q: 'What is the minimum order quantity for bulk gifting in Bangalore?',
    a: 'Minimum order is 25 units for most products with logo customisation. Some premium items are available from 10 units. For large corporate campaigns (500–10,000 units), contact us for custom pricing and dedicated account management. See our <a href="/bangalore-corporate-gifting/bulk-gifting">bulk gifting page</a>.',
  },
  {
    q: 'Can I visit your Bangalore office to see samples?',
    a: "Yes. As a Bangalore-based operation, we welcome in-person sampling appointments. Contact us to schedule a visit. We'll have relevant products from your shortlist ready for you to review.",
  },
  {
    q: 'Who are the best corporate gift suppliers in Bangalore?',
    a: 'MintBox works with verified Bangalore-based manufacturers specialising in drinkware, stationery, tech accessories, and hampers. Our <a href="/bangalore-corporate-gifting/suppliers">supplier guide</a> covers what to look for when evaluating local vendors - MOQ flexibility, branding capabilities, GST compliance, and quality assurance.',
  },
  {
    q: 'Do you provide GST invoices for Bangalore orders?',
    a: 'Yes. All MintBox orders include GST-compliant invoices with HSN codes and itemised billing - suitable for corporate expense claims and procurement systems in any company.',
  },
  {
    q: 'How early should I place a Diwali gifting order in Bangalore?',
    a: "For Diwali (typically October–November), order by September end for comfortable lead times. Bangalore suppliers get heavily booked in October. For orders of 500+ units, we recommend a 6–8 week lead time. Contact us early - we'll hold stock for confirmed orders.",
  },
]


export default function BangaloreCorporateGiftingClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Corporate Gifting in Bangalore", "item": "https://themintbox.in/bangalore-corporate-gifting" }
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
        <div className="cp-hero-inner--full" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="cp-breadcrumb-sep">›</span>
            <span className="cp-breadcrumb-current">Corporate Gifting in Bangalore</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Bangalore · Corporate Gifting</div>
              <h1 className="cp-hero-title">
                Corporate Gifting in Bangalore:<br />
                <em>Same-Day Delivery, Bulk Orders & Local Suppliers</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                MintBox is Bangalore's corporate gifting partner - 200+ branded gifts,
                same-day delivery across the city, bulk orders from 25 units, and
                GST-compliant invoicing on every order.
              </p>
              <div className="cp-hero-ctas">
                <a href="#services" className="cp-hero-cta-primary">Explore Services ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Get a Free Quote</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ Same-day delivery in Bangalore</span>
                <span className="cp-hero-badge">✓ Bulk from 25 units</span>
                <span className="cp-hero-badge">✓ GST invoicing</span>
                <span className="cp-hero-badge">✓ Pan-India dispatch</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80" alt="Corporate office in Bangalore" className="cp-hero-img-actual cp-hero-img-actual--tall" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Fast same-day corporate gift delivery" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80" alt="Corporate gift packages ready for delivery" className="cp-hero-img-actual" loading="lazy" />
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
            title="Corporate gifting in Bangalore - quick answer"
            content="MintBox offers same-day corporate gift delivery across Bangalore, bulk orders from 25 units with logo customisation, and works with verified local suppliers. Coverage includes Koramangala, Whitefield, HSR Layout, Electronic City, Indiranagar, Marathahalli, and all major tech corridors. GST-compliant invoicing included on every order."
          />
          <EATSignal credentials={[
            'Bangalore-based operations and warehouse - no third-party logistics for city deliveries',
            'Same-day delivery for in-stock items across major Bangalore areas',
            'Bulk orders from 25 to 10,000 units with volume pricing',
            '200+ products with logo customisation - drinkware, stationery, hampers, tech, eco',
            'GST-registered, itemised invoicing for corporate procurement',
          ]} />
        </div>
      </div>


      {/* ── STATS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            {[
              { val: '4–6', unit: 'h', label: 'Same-day delivery window in Bangalore' },
              { val: '25', unit: '+', label: 'Minimum units for bulk orders' },
              { val: '200', unit: '+', label: 'Products with logo customisation' },
              { val: '12', unit: '+', label: 'Bangalore areas served' },
            ].map(s => (
              <div key={s.label} className="cp-stat-card">
                <div className="cp-stat-value">{s.val}<span className="cp-stat-unit">{s.unit}</span></div>
                <div className="cp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Our Services</div>
          <h2 className="cp-section-title">Bangalore Corporate Gifting Services</h2>
          <p className="cp-section-sub">
            From urgent same-day orders to large-scale Diwali campaigns - MintBox handles
            every scale of corporate gifting in Bangalore.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '40px' }}>
            {SERVICES.map(svc => (
              <a key={svc.href} href={svc.href} className="cp-feature-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className={`cp-img-placeholder ${svc.bg}`} style={{ fontSize: '40px', height: '100px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {svc.icon}
                </div>
                <div className="cp-feature-card-title" style={{ fontSize: '1.15rem', marginBottom: '8px' }}>{svc.title}</div>
                <p className="cp-feature-card-desc" style={{ marginBottom: '16px' }}>{svc.desc}</p>
                <span style={{ color: 'var(--cp-green)', fontWeight: 600, fontSize: '0.9rem' }}>{svc.cta}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80" alt="Corporate office in Bangalore - MintBox gifting partner" loading="lazy" />
      </figure>

      {/* ── AREAS SERVED ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Delivery Coverage</div>
          <h2 className="cp-section-title">Bangalore Areas We Serve</h2>
          <p className="cp-section-sub">
            Same-day and next-day delivery across all major Bangalore business districts and residential areas.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '32px' }}>
            {AREAS_SERVED.map(area => (
              <span key={area} className="cp-hero-badge" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
                📍 {area}
              </span>
            ))}
          </div>
          <p style={{ marginTop: '24px', color: '#555', fontSize: '0.9rem' }}>
            Don't see your area? <a href="/contact" style={{ color: 'var(--cp-green)', textDecoration: 'underline' }}>Contact us</a> - we likely deliver there too.
          </p>
        </div>
      </section>

      {/* ── WHY MINTBOX ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Why MintBox</div>
          <h2 className="cp-section-title">Why Bangalore Companies Choose MintBox</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginTop: '40px' }}>
            {WHY_MINTBOX.map(item => (
              <div key={item.title} className="cp-feature-card">
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                <div className="cp-feature-card-title">{item.title}</div>
                <p className="cp-feature-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Browse Products</div>
          <h2 className="cp-section-title">In-Stock Corporate Gifts - Available for Bangalore Delivery</h2>
          <p className="cp-section-sub">
            All products below are in stock and available for same-day or next-day delivery in Bangalore,
            or bulk fulfilment pan-India.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Available Gifts"
            maxPrice={5000}
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80" alt="Bulk corporate gift packages ready for Bangalore delivery" loading="lazy" />
      </figure>

      {/* ── INDUSTRIES ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Industry Solutions</div>
          <h2 className="cp-section-title">Gifting for Bangalore's Industries</h2>
          <p className="cp-section-sub">
            Bangalore's tech ecosystem has distinct gifting needs - functional, branded, and scalable.
          </p>
          <div className="cp-related-grid" style={{ marginTop: '32px' }}>
            {INDUSTRIES.map(ind => (
              <a key={ind.href} href={ind.href} className="cp-related-card">
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{ind.emoji}</div>
                <div className="cp-related-card-title">{ind.label}</div>
                <div className="cp-related-card-arrow">→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE PULL ── */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            Bangalore's startup culture deserves a gifting partner that moves as fast as it does.
          </p>
          <cite className="cp-quote-cite">MintBox - Gifting for Bangalore's Pace</cite>
        </div>
      </div>

      {/* ── CTA + FORM ── */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-cta-eyebrow">Bangalore Orders</div>
            <h2 className="cp-cta-title">Get a Free Quote for<br />Bangalore Corporate Gifting</h2>
            <p className="cp-cta-desc">
              Share your occasion, quantity, and delivery timeline - we'll respond within 4 business hours
              with a curated recommendation and pricing.
            </p>
            <div className="cp-cta-promises">
              {[
                'Same-day delivery available for in-stock items',
                'Bulk pricing from 25 units',
                'Logo customisation on all orders',
                'GST invoice included',
              ].map(p => (
                <div key={p} className="cp-cta-promise">
                  <span className="cp-cta-promise-dot" />
                  {p}
                </div>
              ))}
            </div>
          </div>
          <InlineQuoteForm
            title="Get a Bangalore Gifting Quote"
            subtitle="Tell us your occasion and delivery area - we'll confirm availability and pricing within 4 hours."
            ctaLabel="Get Free Quote"
            interestHint="Delivery area in Bangalore, occasion, quantity"
          />
        </div>
      </section>

      <MidPageCTA variant="whatsapp" />

      {/* ── FAQ ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <FAQSection
            items={FAQS}
            title="Bangalore Corporate Gifting - FAQs"
            eyebrow="FAQ"
          />
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title" style={{ marginBottom: '28px' }}>Related Guides & Collections</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Handbook', title: 'The Corporate Gifting Handbook', href: '/guides/corporate-gifting-handbook' },
              { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
              { label: 'Budget', title: 'Corporate Gifts Under ₹1,000', href: '/guides/corporate-gifts-under-1000' },
              { label: 'Diwali', title: 'Diwali Corporate Gifts', href: '/guides/diwali-corporate-gifts' },
              { label: 'Trends', title: 'Corporate Gifting Trends 2026', href: '/guides/corporate-gifting-trends-2026' },
              { label: 'Personalised', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
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
