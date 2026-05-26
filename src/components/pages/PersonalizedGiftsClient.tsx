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

const METHODS = [
  {
    icon: '🖨',
    title: 'Digital & Screen Printing',
    desc: 'Full-colour logos on mugs, bottles, bags and boxes. Sharp edges, vibrant colours, fade-resistant.',
    tag: 'Most popular',
  },
  {
    icon: '✒️',
    title: 'Laser Engraving',
    desc: 'Permanent, premium-feel engraving on metal drinkware, pens and desk accessories. Zero colour fade.',
    tag: 'Premium look',
  },
  {
    icon: '🧵',
    title: 'Embroidery',
    desc: 'Raised, textured logo application on apparel, tote bags and caps. Ideal for a luxury brand feel.',
    tag: 'Apparel & bags',
  },
  {
    icon: '📦',
    title: 'Custom Packaging',
    desc: 'Branded boxes, tissue paper, ribbons and personalised gift cards - even without product customisation.',
    tag: 'Always free',
  },
]

const HOW_IT_WORKS = [
  { num: '1', title: 'Choose Products', desc: 'Browse and shortlist from 200+ customisable items.' },
  { num: '2', title: 'Share Your Brief', desc: 'Upload logo, pick method, state quantity & deadline.' },
  { num: '3', title: 'Receive Mockups', desc: 'Free digital mockups delivered within 24 hours.' },
  { num: '4', title: 'Approve & Confirm', desc: 'Review, request tweaks, and confirm the order.' },
  { num: '5', title: 'Production & Delivery', desc: 'Packed and dispatched Pan-India, GST invoice included.' },
]

const MOQ_TABLE = [
  { product: 'Ceramic / Travel Mugs', moq: '50 units', method: 'Print', cost: '₹0 at 50+' },
  { product: 'Steel Water Bottles', moq: '50 units', method: 'Engrave / Print', cost: '₹0 at 50+' },
  { product: 'Notebooks & Diaries', moq: '25 units', method: 'Print / Foil', cost: '₹0 at 25+' },
  { product: 'Tote Bags', moq: '50 units', method: 'Print / Embroidery', cost: '₹0 at 50+' },
  { product: 'Pens (metal)', moq: '50 units', method: 'Engrave / Print', cost: '₹0 at 100+' },
  { product: 'T-Shirts / Polos', moq: '30 units', method: 'Embroidery / Print', cost: '₹0 at 30+' },
  { product: 'Custom Gift Boxes', moq: '25 units', method: 'Full-wrap Print', cost: '₹0 at 25+' },
  { product: 'Power Banks', moq: '50 units', method: 'Print / Engrave', cost: '₹25–₹50 below 50' },
]

const GALLERY = [
  { emoji: '☕', bg: 'cp-img-green', label: 'Branded mugs' },
  { emoji: '📓', bg: 'cp-img-warm', label: 'Custom notebooks' },
  { emoji: '💧', bg: 'cp-img-mid', label: 'Engraved bottles' },
  { emoji: '👜', bg: 'cp-img-gold', label: 'Logo tote bags' },
  { emoji: '📦', bg: 'cp-img-green', label: 'Gift boxes' },
]

const FAQS = [
  {
    q: 'What is the minimum order for personalised gifts?',
    a: 'Most products require a minimum of 50 units for logo printing or engraving. Notebooks and custom boxes start from 25 units. We occasionally accommodate smaller batches (20–49 units) for a small setup fee - <a href="/contact">contact us</a> to check availability.',
  },
  {
    q: 'How long does the mockup process take?',
    a: 'We deliver free digital mockups within 24 business hours of receiving your logo file and brief. You can request unlimited revisions before approving.',
  },
  {
    q: 'What logo file formats do you accept?',
    a: "We accept AI, EPS, SVG, and high-resolution PNG (300 dpi+). JPEG and low-res files can cause print quality issues - we'll flag this before proceeding. If you only have a PDF with vector elements, that works too.",
  },
  {
    q: 'Can I personalise with employee names?',
    a: 'Yes. Name personalisation is available on mugs, notebooks, bottles, and custom cards. This adds 5–7 business days to the production timeline and a small per-unit cost (₹30–₹80 depending on method and quantity).',
  },
  {
    q: 'Does personalisation add to the product cost?',
    a: 'For orders of 50+ units, standard logo printing or engraving is included in the listed product price. Name personalisation, full-wrap designs, and sub-50 unit orders carry an additional setup/per-unit fee.',
  },
  {
    q: 'What is the production and delivery timeline?',
    a: 'Standard personalised orders take 7–10 business days from order confirmation. Rush orders (4–6 days) are available at an express surcharge. Delivery across Bangalore is 1–2 days after dispatch; Pan-India is 3–5 days.',
  },
  {
    q: 'Can I see a physical sample before placing a bulk order?',
    a: 'Yes, we can arrange a printed sample for most products. Sample cost (₹200–₹500) is adjusted against the bulk order value if you proceed.',
  },
  {
    q: 'Is GST invoicing available?',
    a: 'Absolutely. All orders come with a full GST-compliant tax invoice. We are GST-registered and provide itemised breakdowns for procurement and expense purposes.',
  },
]


export default function PersonalizedGiftsClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Customisation", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 3, "name": "Personalised Corporate Gifts", "item": "https://themintbox.in/customization/personalized-corporate-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Personalised Corporate Gifts: Make Every Gift On-Brand",
        "description": "Custom-branded corporate gifts with logo printing, laser engraving, and embroidery. Minimum 50 units. Free mockup in 24 hours. Bangalore-based, Pan-India delivery.",
        "url": "https://themintbox.in/customization/personalized-corporate-gifts",
        "dateModified": "2026-05-26T00:00:00+05:30",
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-hero-inner">
          <div>
            <nav className="cp-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="cp-breadcrumb-sep">›</span>
              <span className="cp-breadcrumb-current">Personalised Corporate Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">Customisation & Personalisation</div>
            <h1 className="cp-hero-title">
              Personalised Corporate Gifts:<br />
              <em>Make Every Gift On-Brand</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              From laser-engraved steel bottles to full-wrap printed gift boxes - add your logo,
              brand colours, and employee names to 200+ curated gifts. Free digital mockup within 24 hours.
            </p>
            <div className="cp-hero-ctas">
              <a href="#quote" className="cp-hero-cta-primary">
                Upload Logo · Free Mockup
              </a>
              <a href="#products" className="cp-hero-cta-secondary">
                Browse Customisable Products ↓
              </a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Free digital mockups</span>
              <span className="cp-hero-badge">✓ MOQ from 25 units</span>
              <span className="cp-hero-badge">✓ GST invoicing</span>
              <span className="cp-hero-badge">✓ Pan-India delivery</span>
            </div>
            </div>

          {/* Hero visual */}
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" alt="Branded corporate coffee mug gift" className="cp-hero-img-actual cp-hero-img-actual--tall" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80" alt="Premium corporate stationery notebook" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80" alt="Custom branded corporate water bottle" className="cp-hero-img-actual" loading="lazy" />
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
            content="Personalised corporate gifts are branded items - bottles, notebooks, apparel - with your company logo or employee names. MOQ starts at 25 units; free digital mockups within 24 hours. Logo printing is included at no extra cost for orders of 50+ units. Production takes 7–10 business days; Pan-India delivery 3–5 days after dispatch."
          />
          <EATSignal credentials={[
            '200+ customisable products across 6 categories',
            'Free digital mockup within 24 business hours',
            'Logo printing included at 50+ units - no setup fee',
            '500+ corporate clients across Bangalore and India',
            'GST-compliant invoicing, net-30 terms available',
          ]} />
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid">
            <div className="cp-stat-card">
              <div className="cp-stat-value">200<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Customisable products across 6 categories</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">24<span className="cp-stat-unit">h</span></div>
              <div className="cp-stat-label">Free digital mockup turnaround</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹0</div>
              <div className="cp-stat-label">Extra cost for logo printing at 50+ units</div>
            </div>
          </div>
        </div>
      </section>


      {/* ── METHODS ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Personalisation Methods</div>
          <h2 className="cp-section-title">Four Ways to Put Your Brand on a Gift</h2>
          <p className="cp-section-sub">
            Each method has its ideal product fit and price point. MintBox recommends the
            right technique for your product, quantity, and brand guidelines.
          </p>
          <div className="cp-cards-grid">
            {METHODS.map(m => (
              <div key={m.title} className="cp-card">
                <div className="cp-card-icon">{m.icon}</div>
                <div className="cp-card-title">{m.title}</div>
                <p className="cp-card-desc">{m.desc}</p>
                <span className="cp-card-tag">{m.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Customisable Products</div>
          <h2 className="cp-section-title">Browse & Build Your Personalised Pack</h2>
          <p className="cp-section-sub">
            Every product below supports logo printing, engraving, or custom packaging.
            Click any item to view details and add to your quote pack.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Customisable Products"
            onlyCustomisable={true}
            maxPrice={10000}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1200&q=80" alt="Personalised corporate gifts with custom logo branding on drinkware and notebooks" loading="lazy" />
      </figure>

      {/* ── QUOTE PULL ── */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            A gift with your employee's name on it costs almost the same as a generic one -
            but the impression it leaves is priceless.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Philosophy</cite>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Our Process</div>
          <h2 className="cp-section-title">From Logo to Doorstep in 5 Steps</h2>
          <p className="cp-section-sub" style={{ marginBottom: '52px' }}>
            Simple, transparent, and fully managed from brief to delivery.
          </p>
          <div className="cp-steps">
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

      {/* ── GALLERY ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Examples</div>
          <h2 className="cp-section-title">What Personalised MintBox Gifts Look Like</h2>
          <div className="cp-gallery-grid" style={{ marginTop: '32px' }}>
            {GALLERY.map((g, i) => (
              <div key={i} className={`cp-gallery-item`}>
                <div
                  className={`cp-img-placeholder ${g.bg}`}
                  style={{ minHeight: i === 0 ? '412px' : '200px', borderRadius: '12px', flexDirection: 'column', gap: '12px' }}
                >
                  <span style={{ fontSize: i === 0 ? '56px' : '40px' }}>{g.emoji}</span>
                  <span style={{ fontSize: '12px', color: 'rgba(245,240,230,0.4)', fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>{g.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOQ & PRICING TABLE ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">MOQ & Pricing</div>
          <h2 className="cp-section-title">Personalisation at Every Scale</h2>
          <p className="cp-section-sub">
            Customisation cost is zero at the stated MOQ. Below that, a small setup fee applies.
            All prices are per-unit estimates; bulk discounts stack.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Min. Order</th>
                  <th>Method</th>
                  <th>Customisation Cost</th>
                </tr>
              </thead>
              <tbody>
                {MOQ_TABLE.map(row => (
                  <tr key={row.product}>
                    <td>{row.product}</td>
                    <td>{row.moq}</td>
                    <td>{row.method}</td>
                    <td>
                      <span className={`cp-table-badge ${row.cost.startsWith('₹0') ? 'cp-table-badge--free' : 'cp-table-badge--extra'}`}>
                        {row.cost}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '16px', fontSize: '13px', color: 'rgba(26,26,24,0.45)', fontWeight: 300 }}>
            * Name personalisation available on all products from ₹30–₹80/unit depending on quantity. Costs quoted are for logo/brand mark only.
          </p>
        </div>
      </section>

      {/* ── CTA + FORM ── */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-cta-eyebrow">Free Mockup</div>
            <h2 className="cp-cta-title">Upload Your Logo.<br />We'll Handle the Rest.</h2>
            <p className="cp-cta-desc">
              Share your logo and tell us what you need. We'll come back with a free digital mockup
              within 24 hours - no commitment required.
            </p>
            <div className="cp-cta-promises">
              {[
                'Free mockup within 24 business hours',
                'No payment until you approve the design',
                'Bulk pricing quote included',
                'GST-compliant invoice on every order',
              ].map(p => (
                <div key={p} className="cp-cta-promise">
                  <span className="cp-cta-promise-dot" />
                  {p}
                </div>
              ))}
            </div>
          </div>
          <InlineQuoteForm
            title="Upload Logo · Free Mockup"
            subtitle="Fill in the form and share your logo file via the notes field or email it after - we'll confirm receipt."
            ctaLabel="Get Free Mockup"
            defaultOccasion=""
            interestHint="I'd like a free mockup for: "
          />
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* ── FAQ ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <FAQSection
            items={FAQS}
            title="Personalised Corporate Gifts - FAQs"
            eyebrow="FAQ"
          />
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title" style={{ marginBottom: '28px' }}>Related Guides</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Collections', title: 'Browse All Corporate Gift Collections', href: '/collections/corporate-gifts' },
              { label: 'Budget Guide', title: 'Corporate Gifts Under ₹1,000', href: '/guides/corporate-gifts-under-1000' },
              { label: 'Drinkware', title: 'Custom Branded Mugs & Drinkware', href: '/collections/drinkware' },
              { label: 'Onboarding', title: 'Employee Welcome & Joining Kits', href: '/collections/employee-welcome-kit' },
              { label: 'Hampers', title: 'Corporate Gift Hampers - Curated & Delivered', href: '/collections/hampers' },
              { label: 'Bangalore', title: 'Corporate Gifting in Bangalore', href: '/bangalore-corporate-gifting' },
              { label: 'Handbook', title: 'The Corporate Gifting Handbook', href: '/guides/corporate-gifting-handbook' },
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
