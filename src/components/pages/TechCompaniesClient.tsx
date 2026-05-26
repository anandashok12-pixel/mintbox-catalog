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

const GIFT_CATEGORIES = [
  {
    icon: '⚡',
    bg: 'cp-img-green',
    title: 'Tech Accessories',
    desc: 'Wireless chargers, cable organisers, multi-port hubs, laptop stands - logo-engraved and built for daily desk use.',
  },
  {
    icon: '💧',
    bg: 'cp-img-mid',
    title: 'Quality Drinkware',
    desc: 'Insulated bottles, tumbler mugs, French press kits - for desk and WFH use, used daily and seen by everyone.',
  },
  {
    icon: '👕',
    bg: 'cp-img-warm',
    title: 'Team Swag',
    desc: 'Hoodies, quarter-zips, tees, caps - printed with company logo and team name. Culture-forward and worn with pride.',
  },
  {
    icon: '📓',
    bg: 'cp-img-gold',
    title: 'Premium Notebooks',
    desc: 'Hardcover journals, notebooks with pen sets - ideal for onboarding packs and work anniversary gifts.',
  },
]

const OCCASION_TABLE = [
  { occasion: 'Employee Onboarding', gift: 'Notebook + bottle + tee combo', budget: '₹800–₹1,500', moq: '10 units' },
  { occasion: 'Work Anniversary', gift: 'Premium insulated bottle or engraved pen', budget: '₹500–₹1,500', moq: '1 unit' },
  { occasion: 'Diwali Gifting', gift: 'Hamper with drinkware + snacks', budget: '₹1,000–₹3,000', moq: '25 units' },
  { occasion: 'Conference/Event', gift: 'Branded tote + USB + pen', budget: '₹400–₹700', moq: '50 units' },
  { occasion: 'Client Appreciation', gift: 'Premium tech kit or curated hamper', budget: '₹2,000–₹5,000', moq: '1 unit' },
  { occasion: 'Team Win Celebration', gift: 'Swag box with tee + mug + snack', budget: '₹600–₹1,200', moq: '10 units' },
]

const BUDGET_TIERS = [
  {
    label: '₹500–₹1,000',
    price: '₹500–₹1,000',
    desc: 'Individual utility items, tees, notebooks.',
    items: ['Branded tees', 'Notebooks', 'Ceramic mugs', 'Eco tote bags'],
    featured: false,
    cta: 'View options',
  },
  {
    label: '₹1,000–₹2,500',
    price: '₹1,000–₹2,500',
    desc: 'Combo kits, onboarding packs, quality drinkware.',
    items: ['Onboarding kits', 'Insulated bottles', 'Tech combo packs', 'Swag boxes'],
    featured: true,
    cta: 'Most popular',
  },
  {
    label: '₹2,500–₹5,000',
    price: '₹2,500–₹5,000',
    desc: 'Premium hampers, tech accessories, personalised items.',
    items: ['Wireless chargers', 'Premium hampers', 'Personalised kits', 'Luxury drinkware'],
    featured: false,
    cta: 'View options',
  },
]

const FAQS = [
  {
    q: 'What are the best corporate gifts for tech employees?',
    a: "Tech employees value practical, quality items they use daily - insulated drinkware, wireless chargers, quality notebooks, and branded apparel. Avoid overly corporate items (plaques, frames) in favour of functional gifts that signal your culture. At ₹800–₹1,200/head, you can build a strong onboarding kit.",
  },
  {
    q: 'Can you deliver gifts to remote tech employees across India?',
    a: "Yes. We handle individual delivery to 500+ cities across India. Provide a spreadsheet of names and addresses and we'll dispatch individually packed gifts with personalised notes.",
  },
  {
    q: 'Do you offer personalisation for large tech teams (500+ employees)?',
    a: 'Yes - name personalisation is available on notebooks, bottles, and custom cards. For 500+ unit orders, we offer bulk name personalisation from a CSV. This adds 5–7 days to production.',
  },
  {
    q: "What's the lead time for onboarding kits?",
    a: 'Standard onboarding kits take 7–12 days from approval. For rolling onboarding (5–10 people per month), we can pre-build and stock kits for same-week dispatch as new hires join.',
  },
  {
    q: 'Are tech accessories (chargers, cables) branded with our logo?',
    a: 'Yes. Wireless chargers, cable organisers, and USB drives can be laser-engraved or pad-printed with your logo. Print area varies by item - our design team will share a placement guide with your mockup.',
  },
  {
    q: 'Do you provide GST invoices and support purchase orders?',
    a: 'Yes. All orders come with GSTIN-compliant invoices. We accept purchase orders from companies with a credit line. Net-30 and net-60 terms are available for enterprise tech clients.',
  },
]


export default function TechCompaniesClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Industry Solutions", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 3, "name": "Tech Companies", "item": "https://themintbox.in/industry-solutions/tech-companies" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Corporate Gifts for Tech Companies: Premium Picks for 2026",
        "description": "Premium corporate gifts for IT and tech companies - branded tech accessories, quality drinkware, eco kits. Bulk orders, GST invoicing. Bangalore & Pan-India.",
        "url": "https://themintbox.in/industry-solutions/tech-companies",
        "dateModified": "2026-05-26T00:00:00+05:30",
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2, padding: '0 40px' }}>
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="cp-breadcrumb-sep">›</span>
            <a href="/industry-solutions">Industry Solutions</a>
            <span className="cp-breadcrumb-sep">›</span>
            <span className="cp-breadcrumb-current">Tech Companies</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Industry Solutions · IT & Tech</div>
              <h1 className="cp-hero-title">
                Corporate Gifts for Tech Companies:<br />
                <em>Premium Picks for 2026</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                Branded tech accessories, quality drinkware, and team swag for India's fastest-growing tech companies.
                Bulk orders for 500+ employees, individual delivery to remote teams, and culture-forward curation.
              </p>
              <div className="cp-hero-ctas">
                <a href="#products" className="cp-hero-cta-primary">See Tech Gifts ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ Tech accessory specialists</span>
                <span className="cp-hero-badge">✓ Remote team delivery</span>
                <span className="cp-hero-badge">✓ MOQ from 25 units</span>
                <span className="cp-hero-badge">✓ GST invoicing</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Fast same-day corporate gift delivery" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80" alt="Custom branded corporate water bottle" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80" alt="Branded merchandise corporate gift" className="cp-hero-img-actual" loading="lazy" />
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
            content="Corporate gifts for tech companies include branded wireless chargers, premium notebooks, quality stainless bottles, noise-cancelling earbuds, and eco kits - items that resonate with engineers and product managers. Budget range: ₹500–₹5,000 per head depending on seniority. MOQ is 25 units; delivery across India for distributed teams."
          />
          <EATSignal credentials={[
            'Tech-specific gifting for 50+ Bangalore IT companies',
            'Remote team delivery to 500+ cities in India',
            'Premium tech accessories and quality drinkware',
            'Bulk orders from 25 units with individual delivery',
            'GST invoicing and purchase order support',
          ]} />
        </div>
      </div>


      {/* ── STATS ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">50<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Tech clients in Bangalore</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹500<span className="cp-stat-unit">/head</span></div>
              <div className="cp-stat-label">Starting budget</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">25<span className="cp-stat-unit"> units</span></div>
              <div className="cp-stat-label">Minimum order quantity</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">500<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Delivery cities across India</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GIFT CATEGORIES ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Gift Categories</div>
          <h2 className="cp-section-title">What Tech Teams Actually Want</h2>
          <p className="cp-section-sub">
            Four categories that resonate with engineers, PMs, and designers - practical, daily-use gifts
            that carry your brand without feeling corporate.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {GIFT_CATEGORIES.map(cat => (
              <div key={cat.title} className="cp-card">
                <div className={`cp-card-icon ${cat.bg}`} style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {cat.icon}
                </div>
                <div className="cp-card-title">{cat.title}</div>
                <p className="cp-card-desc">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1200&q=80" alt="Tech industry corporate gifting - branded merchandise for IT companies" loading="lazy" />
      </figure>

      {/* ── PRODUCT SHOWCASE ── */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Products</div>
          <h2 className="cp-section-title">Browse Tech Company Gift Options</h2>
          <p className="cp-section-sub">
            All products below are curated for tech teams - practical, brandable, and quality-forward.
            Click any product to add it to your quote.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Corporate Gifts for Tech Companies"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* ── OCCASION TABLE ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Gift by Occasion</div>
          <h2 className="cp-section-title">The Right Gift for Every Tech Occasion</h2>
          <p className="cp-section-sub">
            Recommended gifts, budgets, and MOQs by occasion. Prices are per unit at the stated minimum quantity.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Occasion</th>
                  <th>Recommended Gift</th>
                  <th>Budget/Head</th>
                  <th>MOQ</th>
                </tr>
              </thead>
              <tbody>
                {OCCASION_TABLE.map(row => (
                  <tr key={row.occasion}>
                    <td style={{ fontWeight: 500 }}>{row.occasion}</td>
                    <td style={{ fontWeight: 300 }}>{row.gift}</td>
                    <td style={{ fontWeight: 500, color: 'var(--forest-green,#1B4D3E)' }}>{row.budget}</td>
                    <td>{row.moq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '14px', fontSize: '13px', color: 'rgba(26,26,24,0.45)', fontWeight: 300 }}>
            * Prices are indicative at the stated MOQ. <a href="/contact" style={{ color: 'var(--forest-green,#1B4D3E)' }}>Request a quote</a> for exact pricing.
          </p>
        </div>
      </section>

      {/* ── QUOTE PULL ── */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            The best tech company swag isn't the flashiest - it's the thing an engineer uses every day
            and that quietly makes them proud to work there.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Philosophy</cite>
        </div>
      </div>

      {/* ── BUDGET TIERS ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Budget Planning</div>
          <h2 className="cp-section-title">Gift Options at Every Budget Level</h2>
          <p className="cp-section-sub">
            Whether you're gifting all 500 employees or just the engineering leads, there's a
            quality option at every price point.
          </p>
          <div className="cp-budget-grid">
            {BUDGET_TIERS.map(tier => (
              <div key={tier.label} className={`cp-budget-card${tier.featured ? ' cp-budget-card--featured' : ''}`}>
                <div className="cp-budget-label">{tier.label}</div>
                <div className="cp-budget-price">{tier.price}</div>
                <p className="cp-budget-desc">{tier.desc}</p>
                <ul className="cp-budget-items">
                  {tier.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href="#quote" className="cp-budget-cta">{tier.cta}</a>
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
            <div className="cp-cta-eyebrow">Tech Gifting Programme</div>
            <h2 className="cp-cta-title">Build Your Tech Team<br />Gifting Programme</h2>
            <p className="cp-cta-desc">
              Tell us your team size, gifting occasions, and budget - we'll build a
              custom programme with product recommendations and volume pricing.
            </p>
            <div className="cp-cta-promises">
              {[
                'Tech-specific product curation',
                'Individual delivery to remote employees',
                'GST invoice and PO support',
                'Quote within 4 business hours',
              ].map(p => (
                <div key={p} className="cp-cta-promise">
                  <span className="cp-cta-promise-dot" />
                  {p}
                </div>
              ))}
            </div>
          </div>
          <InlineQuoteForm
            title="Build Your Tech Team Gifting Programme"
            subtitle="Tell us your team size and gifting occasions and we'll send back tailored recommendations."
            ctaLabel="Get Tech Gifting Quote"
            defaultOccasion="welcome_kit"
          />
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* ── FAQ ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <FAQSection
            items={FAQS}
            title="Corporate Gifts for Tech Companies - FAQs"
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
              { label: 'Industry Solutions', title: 'Corporate Gifts for Startups', href: '/industry-solutions/startups' },
              { label: 'Collections', title: 'Employee Welcome Kit', href: '/collections/employee-welcome-kit' },
              { label: 'Collections', title: 'Tech Gifts Collection', href: '/collections/tech-gifts' },
              { label: 'Personalisation', title: 'Personalised Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Bangalore', title: 'Bulk Gifting', href: '/bangalore-corporate-gifting/bulk-gifting' },
              { label: 'Collections', title: 'All Collections', href: '/collections/corporate-gifts' },
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
