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
  category: { id: string; name: string; emoji?: string | null; slug: string } | string
}

const WHY_BULK = [
  {
    icon: '📊',
    bg: 'cp-img-green',
    title: 'Transparent Pricing',
    desc: 'Published bulk pricing, no hidden setup fees, no surprise invoices. What you see is what you pay.',
  },
  {
    icon: '👤',
    bg: 'cp-img-gold',
    title: 'Dedicated Account Manager',
    desc: 'Single point of contact for quotes, samples, production updates, and delivery coordination.',
  },
  {
    icon: '✅',
    bg: 'cp-img-warm',
    title: 'Quality Assurance',
    desc: 'Every batch inspected before dispatch. Photo proof of the full batch shared before delivery.',
  },
  {
    icon: '🚚',
    bg: 'cp-img-mid',
    title: 'Flexible Delivery',
    desc: 'Multi-city, multi-address, staggered dispatch - all from one purchase order and one invoice.',
  },
]

const PRICING_TIERS = [
  {
    qty: '100–249 units',
    discount: '10–15% off',
    desc: 'Base bulk pricing - great for team events and smaller Diwali runs',
    featured: false,
  },
  {
    qty: '250–499 units',
    discount: '18–22% off',
    desc: 'Scale tier - popular for mid-size Diwali campaigns and onboarding programs',
    featured: false,
  },
  {
    qty: '500–999 units',
    discount: '25–30% off',
    desc: 'Large scale - significant savings, dedicated production manager assigned',
    featured: true,
  },
  {
    qty: '1,000+ units',
    discount: '30–40% off',
    desc: 'Enterprise - maximum discounts, dedicated PM, custom SLA, net-30 terms',
    featured: false,
  },
]

const ORDER_STEPS = [
  {
    num: '01',
    title: 'Submit a Brief',
    desc: 'Share the products, quantity, occasion, budget, and delivery deadline. A form or WhatsApp message works.',
  },
  {
    num: '02',
    title: 'Receive a Quote Within 24 Hours',
    desc: 'We send a detailed quote with bulk pricing, customisation options, and a production timeline.',
  },
  {
    num: '03',
    title: 'Approve Sample',
    desc: 'A physical sample is couriered to you. Approval or feedback turnaround is 1–2 weeks.',
  },
  {
    num: '04',
    title: 'Confirm Order and Pay Milestone',
    desc: 'Sign off on the sample, confirm quantity, and pay the production advance (typically 50%).',
  },
  {
    num: '05',
    title: 'Production and Delivery',
    desc: 'Full production and quality check completed in 10–21 days. Delivery tracking shared for every shipment.',
  },
]

const OCCASIONS_TABLE = [
  { occasion: 'Diwali (full company)', qty: '200–2,000', budget: '₹500–₹2,000', lead: '3–4 weeks' },
  { occasion: 'Employee Onboarding', qty: '50–500/batch', budget: '₹750–₹2,000', lead: '7–10 days' },
  { occasion: 'Conference / Event', qty: '200–1,000', budget: '₹200–₹600', lead: '10–14 days' },
  { occasion: 'Client Appreciation', qty: '50–200', budget: '₹1,500–₹5,000', lead: '7–12 days' },
  { occasion: 'Sales Team Incentive', qty: '100–500', budget: '₹1,000–₹3,000', lead: '10–15 days' },
  { occasion: 'Year-End Recognition', qty: '100–500', budget: '₹800–₹2,500', lead: '10–14 days' },
]

const FAQS = [
  {
    q: 'What is the minimum quantity for bulk pricing?',
    a: 'Bulk pricing starts at 100 units. Below 100 units, standard pricing applies with a small-batch fee. Volume discounts are tiered - 10–15% off at 100–249 units, 18–22% at 250–499 units, 25–30% at 500–999 units, and 30–40% at 1,000+.',
  },
  {
    q: 'Is a dedicated account manager assigned for large orders?',
    a: 'Yes. Orders above ₹1 lakh (approximately 100–200 units depending on the product) receive a dedicated account manager who handles quoting, sampling, production updates, and delivery coordination. You get a single WhatsApp contact for the entire order.',
  },
  {
    q: 'Can I order multiple products under one purchase order?',
    a: 'Yes. Mixed-product bulk orders are common - for example, 500 bottles + 500 notebooks under one PO with one invoice. Each product has its own MOQ (typically 50–100 units per SKU for bulk runs). A coordinator manages the parallel production tracks.',
  },
  {
    q: 'Do you provide GST invoicing for bulk corporate orders?',
    a: 'Yes. All orders come with GST-compliant tax invoices. Provide your GSTIN at the time of order. For large orders (₹5L+), we can structure invoicing in milestone tranches. Net-30 and net-60 payment terms are available for companies with a standing PO.',
  },
  {
    q: 'How do you handle quality for bulk orders?',
    a: 'Every production batch goes through a 3-step QC process: raw material check, mid-production spot check, and final batch inspection before packaging. Photo evidence is shared with the account manager before dispatch. Returns/remakes are honoured within 7 days of delivery.',
  },
  {
    q: 'Can bulk gifts be delivered to multiple cities simultaneously?',
    a: 'Yes. Multi-city delivery (Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune, etc.) is standard for large orders. Provide a city-wise breakdown in a spreadsheet. All deliveries go out in one coordinated dispatch - arrival windows vary by city (Bangalore: 1–2 days, metro cities: 2–4 days, tier-2: 4–7 days).',
  },
]


export default function BulkGiftingClient({ products }: { products: Product[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Bangalore Corporate Gifting", "item": "https://themintbox.in/bangalore-corporate-gifting" },
          { "@type": "ListItem", "position": 3, "name": "Bulk Corporate Gifting", "item": "https://themintbox.in/bangalore-corporate-gifting/bulk-gifting" }
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
            <span className="cp-breadcrumb-current">Bulk Gifting</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Bangalore · Bulk Gifting Services</div>
              <h1 className="cp-hero-title">
                Bulk Corporate Gifting in Bangalore:<br />
                <em>From 100 to 10,000 Units</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                Scale your corporate gifting with transparent bulk pricing, a dedicated account manager,
                and reliable Pan-India delivery. Serving Bangalore's fastest-growing companies since 2019.
              </p>
              <div className="cp-hero-ctas">
                <a href="#products" className="cp-hero-cta-primary">Browse Products ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Get Bulk Pricing</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ 100 to 10,000+ units</span>
                <span className="cp-hero-badge">✓ Dedicated account manager</span>
                <span className="cp-hero-badge">✓ GST invoicing</span>
                <span className="cp-hero-badge">✓ Pan-India delivery</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80" alt="Bulk corporate gift boxes and hampers" className="cp-hero-img-actual cp-hero-img-actual--tall" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80" alt="Modern corporate office building" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&w=800&q=80" alt="Corporate gifting planning and stationery" className="cp-hero-img-actual" loading="lazy" />
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
            content="Bulk corporate gifting in Bangalore starts at 100 units with volume discounts of 15–35% vs. standard pricing. MintBox assigns a dedicated account manager for orders above ₹1 lakh. Production takes 10–15 days for 100–500 units and 15–21 days for 500+. GST-compliant invoicing and net-30 terms available for verified corporate accounts."
          />
          <EATSignal
            credentials={[
              'Serving Bangalore corporates since 2019',
              'Orders from 100 to 10,000+ units managed annually',
              'Dedicated account manager for every bulk order',
              'Transparent pricing - bulk rates published, no surprises',
              '₹1Cr+ in bulk gifting managed',
            ]}
          />
        </div>
      </div>


      {/* ── STATS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">100–</div>
              <div className="cp-stat-unit">10,000 units</div>
              <div className="cp-stat-label">order range</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">15–35%</div>
              <div className="cp-stat-unit">off</div>
              <div className="cp-stat-label">volume discount</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">10–15</div>
              <div className="cp-stat-unit">days</div>
              <div className="cp-stat-label">production time</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹1Cr+</div>
              <div className="cp-stat-unit">managed</div>
              <div className="cp-stat-label">bulk gifting value</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY BULK WITH MINTBOX ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Why MintBox</div>
          <h2 className="cp-section-title">Why Bulk Gift with MintBox</h2>
          <p className="cp-section-sub">
            Four reasons Bangalore's fastest-growing companies trust MintBox for large-scale gifting.
          </p>
          <div className="cp-cards-grid cp-cards-grid--2">
            {WHY_BULK.map(item => (
              <div key={item.title} className="cp-card">
                <div className={`cp-card-icon ${item.bg}`} style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {item.icon}
                </div>
                <div className="cp-card-title">{item.title}</div>
                <div className="cp-card-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BULK PRICING TIERS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Volume Pricing</div>
          <h2 className="cp-section-title">Bulk Pricing Tiers</h2>
          <p className="cp-section-sub">
            Discounts scale automatically with quantity. Mix products under one PO - we apply the tier based on total units.
          </p>
          <div className="cp-tier-grid">
            {PRICING_TIERS.map(tier => (
              <div key={tier.qty} className={`cp-tier-cell${tier.featured ? ' cp-tier-cell--featured' : ''}`}>
                <div className="cp-tier-qty">{tier.qty}</div>
                <div className="cp-tier-discount">{tier.discount}</div>
                <div className="cp-tier-desc">{tier.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80" alt="Bulk corporate gift packages and hampers ready for dispatch" loading="lazy" />
      </figure>

      {/* ── HOW LARGE ORDERS WORK ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The Process</div>
          <h2 className="cp-section-title">How Large Orders Work</h2>
          <p className="cp-section-sub">
            Five steps from brief to delivery. Your account manager handles every stage - you stay updated without chasing.
          </p>
          <div className="cp-steps">
            {ORDER_STEPS.map(step => (
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

      {/* ── PRODUCT SHOWCASE ── */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Product Catalogue</div>
          <h2 className="cp-section-title">Browse Bulk Gift Options</h2>
          <p className="cp-section-sub">
            All products available for bulk orders. Add to your quote list and we will confirm bulk pricing
            and production timelines within 24 hours.
          </p>
          <ContentProductShowcase
            products={products}
            categories={[]}
            heading="Bulk Corporate Gifts - Bottles, Notebooks, Tech, Hampers & More"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* ── OCCASIONS TABLE ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Planning Guide</div>
          <h2 className="cp-section-title">Bulk Order by Occasion</h2>
          <p className="cp-section-sub">
            Reference guide for quantities, budgets, and lead times by occasion. Use this to start your brief.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Occasion</th>
                  <th>Typical Quantity</th>
                  <th>Budget / Unit</th>
                  <th>Lead Time</th>
                </tr>
              </thead>
              <tbody>
                {OCCASIONS_TABLE.map(row => (
                  <tr key={row.occasion}>
                    <td>{row.occasion}</td>
                    <td style={{ fontWeight: 300 }}>{row.qty}</td>
                    <td>
                      <span className="cp-table-badge cp-table-badge--yes">{row.budget}</span>
                    </td>
                    <td style={{ fontWeight: 300 }}>{row.lead}</td>
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
            "At 500 units, a ₹800 gift per head costs ₹4 lakh total - the same as a modest team offsite.
            The difference: 500 people take a piece of your culture home with them."
          </p>
          <a href="#quote" className="cp-quote-band-cta">Request Bulk Quote →</a>
        </div>
      </div>

      {/* ── CTA + FORM ── */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-cta-eyebrow">Bulk Gifting</div>
            <h2 className="cp-cta-title">Get Bulk<br />Pricing</h2>
            <p className="cp-cta-sub">
              Share your quantity, occasion, and budget. We will send a full quote with
              bulk pricing and production timeline within 24 hours.
            </p>
            <div className="cp-quote-form-panel" />
          </div>
          <InlineQuoteForm
            title="Get Bulk Pricing"
            subtitle="Tell us your quantity and occasion - bulk quote within 24 hours, dedicated account manager assigned."
            ctaLabel="Request Bulk Quote"
            defaultOccasion="other"
          />
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* ── FAQ ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <FAQSection
            items={FAQS}
            title="Bulk Corporate Gifting - FAQs"
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
              { label: 'Bangalore', title: 'Same-Day Delivery Bangalore', href: '/bangalore-corporate-gifting/same-day-delivery' },
              { label: 'Bangalore', title: 'All Bangalore Corporate Gifting', href: '/bangalore-corporate-gifting' },
              { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
              { label: 'Guides', title: 'Diwali Corporate Gifts', href: '/guides/diwali-corporate-gifts' },
              { label: 'Customisation', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Guides', title: 'Budget Corporate Gifts', href: '/guides/budget-corporate-gifts' },
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
        <LastUpdatedDate date="2026-05-26" />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
