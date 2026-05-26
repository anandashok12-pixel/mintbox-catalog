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

const OCCASIONS = [
  {
    emoji: '🎉',
    label: 'Employee Onboarding',
    title: 'Welcome Kits That Impress',
    desc: 'Make day one unforgettable with a curated onboarding pack.',
    href: '/collections/employee-welcome-kit',
    bg: 'cp-img-green',
  },
  {
    emoji: '🪔',
    label: 'Diwali Gifting',
    title: 'Celebrate With the Whole Team',
    desc: "India's biggest gifting moment, done with taste and scale.",
    href: '/guides/diwali-corporate-gifts',
    bg: 'cp-img-gold',
  },
  {
    emoji: '🤝',
    label: 'Client Gifting',
    title: 'Strengthen Every Relationship',
    desc: 'Premium gifts that reinforce your brand with key accounts.',
    href: '/guides/corporate-gifts-for-clients',
    bg: 'cp-img-warm',
  },
  {
    emoji: '🏆',
    label: 'Recognition & Milestones',
    title: 'Celebrate Work Anniversaries',
    desc: 'Tenure milestones and recognition moments, gifted right.',
    href: '/guides/work-anniversary-gifts',
    bg: 'cp-img-mid',
  },
]

const HOW_IT_WORKS = [
  { num: '1', title: 'Browse & Pick', desc: 'Explore 200+ products and add your favourites to a pack.' },
  { num: '2', title: 'Share Requirements', desc: 'Tell us quantity, occasion, delivery, and any customisation needs.' },
  { num: '3', title: 'Receive Bulk Quote', desc: 'We respond within 4 hours with itemised pricing and lead times.' },
]

const FAQS = [
  {
    q: 'What is the minimum order quantity?',
    a: 'Minimum order quantity is 25 units for most products with logo printing. Some premium items (custom hampers, luxury sets) can be ordered from 10 units. High-volume giveaway items (pens, seed packets) typically require 100 units minimum. <a href="/contact">Contact us</a> for specific MOQs by product.',
  },
  {
    q: 'Can I mix products in a single order?',
    a: 'Yes. You can build a hamper or kit with multiple products. Each product retains its own MOQ; mixed packs typically require a minimum of 25 sets total.',
  },
  {
    q: 'Do all products support logo customisation?',
    a: 'About 85% of products in our catalog support at least one form of customisation (printing, engraving, or embroidery). Products marked "Customisable" support branding. See our <a href="/customization/personalized-corporate-gifts">Personalised Gifts guide</a> for full details.',
  },
  {
    q: 'How does your bulk pricing work?',
    a: "Pricing is tiered: the more units you order, the lower the per-unit cost. You'll see indicative prices in the catalogue; send a quote request for exact volume pricing.",
  },
  {
    q: 'Do you deliver outside Bangalore?',
    a: 'Yes. We fulfil Pan-India, including multi-city and multi-location shipments for large teams. Delivery timelines vary by location - typically 3–5 business days outside Bangalore.',
  },
  {
    q: 'Can I request samples before placing a bulk order?',
    a: 'Yes. Sample orders (1–3 units) are available for most products. Sample cost is adjusted against the bulk order value when you proceed.',
  },
  {
    q: 'What payment terms do you offer?',
    a: 'Standard terms are 50% advance + 50% before dispatch. For orders above ₹5 lakh or regular customers, we may extend net 15–30 day credit terms. All invoices are GST-compliant.',
  },
]


export default function CollectionsHubClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Catalogue", "item": "https://themintbox.in/catalog" },
          { "@type": "ListItem", "position": 3, "name": "Corporate Gift Collections", "item": "https://themintbox.in/collections/corporate-gifts" },
        ]
      }) }} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-hero-inner--full" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="cp-breadcrumb-sep">›</span>
            <a href="/catalog">Catalogue</a>
            <span className="cp-breadcrumb-sep">›</span>
            <span className="cp-breadcrumb-current">Corporate Gift Collections</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Gift Collections</div>
              <h1 className="cp-hero-title">
                Corporate Gift Collections:<br />
                <em>Hampers, Kits & Curated Sets</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                Browse 200+ corporate gifts organised by category, occasion, and budget.
                From ₹150 conference giveaways to ₹3,000 premium hampers - all customisable,
                all bulk-ready.
              </p>
              <div className="cp-hero-ctas">
                <a href="#products" className="cp-hero-cta-primary">Browse All Products ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Request Full Catalogue</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ 200+ products</span>
                <span className="cp-hero-badge">✓ 6 categories</span>
                <span className="cp-hero-badge">✓ Bulk from 25 units</span>
                <span className="cp-hero-badge">✓ Pan-India delivery</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80" alt="Corporate gift packages ready for delivery" className="cp-hero-img-actual cp-hero-img-actual--tall" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80" alt="Bulk corporate gift boxes and hampers" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=800&q=80" alt="Curated corporate gift collections" className="cp-hero-img-actual" loading="lazy" />
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
            content="MintBox offers 200+ corporate gifts across drinkware, stationery, tech gadgets, hampers, eco-friendly items, and apparel - all available with logo customisation. Pricing starts at ₹150 per unit; bulk orders from 25 units. Filter by category, occasion, and budget. Same-day delivery available in Bangalore for in-stock items."
          />
          <EATSignal credentials={[
            '200+ products across 6 categories - all in stock',
            'Bulk orders from 25 units, volume discounts from 100+',
            'Logo customisation on 85%+ of products',
            'Same-day delivery in Bangalore for in-stock items',
            'GST-compliant invoicing, dedicated account manager',
          ]} />
        </div>
      </div>


      {/* ── STATS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">200<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Curated products in stock</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">6</div>
              <div className="cp-stat-label">Product categories</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹150<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Starting price per unit</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">24<span className="cp-stat-unit">h</span></div>
              <div className="cp-stat-label">Quote turnaround time</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE (ALL PRODUCTS) ── */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Full Catalogue</div>
          <h2 className="cp-section-title">Shop by Category</h2>
          <p className="cp-section-sub">
            Use the filters below to narrow by category, keyword, or budget. Click any product
            for details and add to your quote pack.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="All Corporate Gifts"
            maxPrice={10000}
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* ── OCCASIONS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Shop by Occasion</div>
          <h2 className="cp-section-title">Every Gifting Moment, Covered</h2>
          <p className="cp-section-sub">
            Whether it's onboarding a new hire or celebrating Diwali with 500 employees,
            MintBox has a curated collection for the moment.
          </p>
          <div className="cp-occasion-grid">
            {OCCASIONS.map(occ => (
              <a key={occ.href} href={occ.href} className="cp-occasion-card" style={{ minHeight: '220px' }}>
                <div className={`cp-occasion-card-bg cp-img-placeholder ${occ.bg}`} style={{ fontSize: '64px' }}>
                  {occ.emoji}
                </div>
                <div className="cp-occasion-card-overlay" />
                <div className="cp-occasion-card-content">
                  <div className="cp-occasion-card-label">{occ.label}</div>
                  <div className="cp-occasion-card-title">{occ.title}</div>
                  <div className="cp-occasion-card-sub">{occ.desc}</div>
                </div>
              </a>
            ))}
          </div>
          <figure className="cp-editorial-img">
            <img src="https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=1200&q=80" alt="Curated corporate gift collections for every occasion and budget" loading="lazy" />
          </figure>
        </div>
      </section>

      {/* ── BUDGET TIERS ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Shop by Budget</div>
          <h2 className="cp-section-title">Great Gifts at Every Price Point</h2>
          <p className="cp-section-sub">
            Quality gifting doesn't require a large per-head budget. Use these starting points
            to guide your shortlist.
          </p>
          <div className="cp-budget-grid">
            <a href="/guides/corporate-gifts-under-500" className="cp-budget-card cp-budget-card--subtle">
              <div className="cp-budget-label cp-budget-label--dark">Budget</div>
              <div className="cp-budget-price cp-budget-price--dark">Under ₹500</div>
              <ul className="cp-budget-items">
                {['Ceramic mugs', 'Branded pens', 'Custom notebooks', 'Eco tote bags'].map(i => (
                  <li key={i} className="cp-budget-item cp-budget-item--dark">{i}</li>
                ))}
              </ul>
              <span className="cp-budget-cta cp-budget-cta--dark">See options →</span>
            </a>
            <a href="/guides/corporate-gifts-under-1000" className="cp-budget-card cp-budget-card--mid">
              <div className="cp-budget-label cp-budget-label--light">Most Popular</div>
              <div className="cp-budget-price cp-budget-price--light">₹500–₹1,000</div>
              <ul className="cp-budget-items">
                {['Insulated bottles', 'Diary + pen sets', 'Onboarding kits', 'Premium mugs'].map(i => (
                  <li key={i} className="cp-budget-item cp-budget-item--light">{i}</li>
                ))}
              </ul>
              <span className="cp-budget-cta cp-budget-cta--light">See options →</span>
            </a>
            <a href="/guides/corporate-gift-ideas-2026" className="cp-budget-card cp-budget-card--premium">
              <div className="cp-budget-label cp-budget-label--light">Premium</div>
              <div className="cp-budget-price cp-budget-price--light">₹1,000+</div>
              <ul className="cp-budget-items">
                {['Curated hampers', 'Tech gadget sets', 'Wellness kits', 'CXO gift boxes'].map(i => (
                  <li key={i} className="cp-budget-item cp-budget-item--light">{i}</li>
                ))}
              </ul>
              <span className="cp-budget-cta cp-budget-cta--light">See options →</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── QUOTE PULL ── */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            The best corporate gift is one your recipient uses every day - and sees your brand every time they do.
          </p>
          <cite className="cp-quote-cite">MintBox</cite>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">How to Order</div>
          <h2 className="cp-section-title">From Browsing to Delivered in 3 Steps</h2>
          <p className="cp-section-sub" style={{ marginBottom: '52px' }}>
            No minimum spend. No complicated procurement processes. Just great gifts, delivered.
          </p>
          <div className="cp-steps cp-steps--3">
            {HOW_IT_WORKS.map(s => (
              <div key={s.num} className="cp-step">
                <div className="cp-step-num cp-step-num--gold">{s.num}</div>
                <div className="cp-step-title">{s.title}</div>
                <p className="cp-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + FORM ── */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-cta-eyebrow">Full Catalogue</div>
            <h2 className="cp-cta-title">Request the Full<br />MintBox Catalogue</h2>
            <p className="cp-cta-desc">
              Get our complete product catalogue with bulk pricing, MOQ tables, customisation options,
              and current lead times - all in one PDF, sent straight to your inbox.
            </p>
            <div className="cp-cta-promises">
              {[
                'Complete 200+ product catalogue',
                'Bulk pricing from 50 units',
                'Customisation options per category',
                'Sent within 2 hours of request',
              ].map(p => (
                <div key={p} className="cp-cta-promise">
                  <span className="cp-cta-promise-dot" />
                  {p}
                </div>
              ))}
            </div>
          </div>
          <InlineQuoteForm
            title="Request Full Catalogue"
            subtitle="Share your email and we'll send the full catalogue with pricing within 2 hours."
            ctaLabel="Send Me the Catalogue"
            interestHint="I'm interested in: (categories / occasions / budget range)"
          />
        </div>
      </section>

      <MidPageCTA variant="catalog" />

      {/* ── FAQ ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <FAQSection
            items={FAQS}
            title="Corporate Gift Collections - FAQs"
            eyebrow="FAQ"
          />
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title" style={{ marginBottom: '28px' }}>Related Guides & Categories</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Personalisation', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Drinkware', title: 'Corporate Mugs & Drinkware', href: '/collections/drinkware' },
              { label: 'Hampers', title: 'Corporate Gift Hampers', href: '/collections/hampers' },
              { label: 'Budget', title: 'Corporate Gifts Under ₹1,000', href: '/guides/corporate-gifts-under-1000' },
              { label: 'Onboarding', title: 'Employee Welcome & Joining Kits', href: '/collections/employee-welcome-kit' },
              { label: 'Bangalore', title: 'Corporate Gifting in Bangalore', href: '/bangalore-corporate-gifting' },
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
