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

const BUDGET_CARDS = [
  {
    label: '₹500–₹800',
    title: 'Standard Diwali',
    desc: 'Ceramic mug + sweets box + branded card. Good for large all-staff gifting.',
    href: '/guides/corporate-gifts-under-1000',
    featured: false,
  },
  {
    label: '₹800–₹1,500',
    title: 'Premium Diwali',
    desc: 'Stainless bottle + dry fruits + sweets + packaging. The sweet spot for 50–200 employees.',
    href: '/collections/hampers',
    featured: true,
  },
  {
    label: '₹1,500–₹3,000',
    title: 'Luxury Diwali',
    desc: 'Copper bottle or tumbler + premium dry fruits + artisan sweets + rigid gift box. For clients and senior leadership.',
    href: '/collections/hampers',
    featured: false,
  },
]

const PLANNING_STEPS = [
  {
    num: '1',
    title: 'August–September',
    desc: 'Decide on budget per head, quantity, and gift theme. Share brand guidelines.',
  },
  {
    num: '2',
    title: 'September 30 (deadline)',
    desc: 'Place order for 200+ units. Production slots start filling. Delay beyond this risks delays.',
  },
  {
    num: '3',
    title: 'October 1–10',
    desc: 'Final sampling, mockup approval, and order confirmation for 25–200 unit orders.',
  },
  {
    num: '4',
    title: 'October 15–20',
    desc: 'Production window for most orders. Packaging and assembly.',
  },
  {
    num: '5',
    title: 'October 25–31',
    desc: 'Dispatch. Bangalore delivery by Oct 29; Pan-India by Nov 1.',
  },
]

const GIFT_IDEAS_TABLE = [
  { gift: 'Sweets + Mug Kit', includes: 'Artisan sweets + ceramic mug + card', price: '₹500–₹800', moq: '25' },
  { gift: 'Diwali Hamper (standard)', includes: 'Bottle + dry fruits + sweets + box', price: '₹800–₹1,500', moq: '25' },
  { gift: 'Diwali Hamper (premium)', includes: 'Copper bottle + premium sweets + rigid box', price: '₹1,500–₹2,500', moq: '25' },
  { gift: 'Eco Diwali Set', includes: 'Bamboo pen + seed notebook + plant kit', price: '₹600–₹1,000', moq: '50' },
  { gift: 'Drinkware Gift Set', includes: 'Tumbler or insulated bottle + box', price: '₹700–₹1,500', moq: '25' },
  { gift: 'Luxury Gifting', includes: 'Curated 5-item hamper + premium packaging', price: '₹2,500–₹5,000', moq: '10' },
]


const FAQS = [
  {
    q: 'When should I order Diwali 2026 corporate gifts?',
    a: 'Diwali 2026 falls on November 1. For 100+ units, place orders by September 30. For 25–99 units, by October 10. Last-minute orders (October 15+) can still be fulfilled for plain stock or pre-made hampers, but customisation options are limited. Rush production is available at a 20% surcharge.',
  },
  {
    q: "What's the most popular Diwali corporate gift?",
    a: 'Drinkware + sweets hampers (stainless bottle or copper bottle with artisan sweets and dry fruits) are the most-ordered Diwali gifts. Premium packaging (rigid gift box, tissue, ribbon) is essential - Diwali is the one occasion where packaging matters as much as the gift.',
  },
  {
    q: 'Are FSSAI-certified food items available for Diwali hampers?',
    a: 'Yes. All sweet and food items in MintBox hampers are FSSAI-certified and come with appropriate shelf life and allergen labelling. We source from vetted food suppliers. Certificates are available on request.',
  },
  {
    q: 'Can I include alcohol in Diwali hampers?',
    a: 'We do not include alcohol in corporate hampers. Instead, premium alternatives include single-origin coffee sets, specialty teas, artisan chocolates, and aged cheese - all well-received for professional gifting.',
  },
  {
    q: 'Do you handle Diwali delivery to multiple cities?',
    a: 'Yes. Pan-India Diwali delivery is standard. Provide a city-wise breakdown and we coordinate dispatch to arrive before Diwali. Bangalore: 1–2 days; metro cities: 2–4 days; tier-2: 4–7 days. Tracking information is shared via email/WhatsApp.',
  },
  {
    q: 'Can Diwali hampers be personalised with employee names?',
    a: 'Yes. Name personalisation on gift boxes, cards, and certain products (notebooks, bottles) is available. Provide names list 2 weeks before delivery. Personalisation adds ₹50–₹100 per hamper and 5–7 days to production.',
  },
]

export default function DiwaliCorporateClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Diwali Corporate Gifts", "item": "https://themintbox.in/guides/diwali-corporate-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Diwali Corporate Gifts 2026: Best Ideas for Every Budget",
        "description": "Best Diwali corporate gifts for 2026 - hampers, drinkware, sweets kits, and eco sets. Budget ₹500–₹3,000 per head. Order early to avoid delays. Pan-India.",
        "url": "https://themintbox.in/guides/diwali-corporate-gifts",
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
              <span className="cp-breadcrumb-current">Diwali Corporate Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">Seasonal Guide · Diwali 2026</div>
            <h1 className="cp-hero-title">
              Diwali Corporate Gifts 2026:<br />
              <em>Best Ideas for Every Budget</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Make Diwali 2026 memorable with curated corporate hampers, branded drinkware, sweet kits,
              and eco sets. Budget ₹500–₹3,000 per head. Order by October 15 - production slots fill fast.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-hero-cta-primary">Browse Diwali Gifts ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get Diwali Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Order by Oct 15, 2026</span>
              <span className="cp-hero-badge">✓ ₹500–₹3,000/head</span>
              <span className="cp-hero-badge">✓ Pan-India delivery</span>
              <span className="cp-hero-badge">✓ GST invoicing</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80" alt="Diwali corporate gifts with festive diyas" className="cp-hero-img-actual" loading="lazy" />
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
            content="Diwali 2026 falls on November 1. Corporate Diwali gifts are typically ordered 3–4 weeks in advance (by October 10–15). Budget ₹500–₹1,500 for all-staff; ₹1,500–₹3,000 for managers and clients. Popular options: gift hampers, branded drinkware, sweet kits, and eco sets. Bulk discounts available from 25 units."
          />
          <EATSignal credentials={[
            '500+ Diwali orders fulfilled annually',
            'October slots fill by September - early orders recommended',
            'Custom hampers with branded packaging',
            'Pan-India delivery before Diwali',
            'FSSAI-certified sweet and food hampers',
          ]} />
        </div>
      </div>

      {/* 3. STATS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">3–4<span className="cp-stat-unit"> weeks</span></div>
              <div className="cp-stat-label">lead time required</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹500<span className="cp-stat-unit">/head</span></div>
              <div className="cp-stat-label">starting budget</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">25<span className="cp-stat-unit"> units</span></div>
              <div className="cp-stat-label">minimum order quantity</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Nov 1</div>
              <div className="cp-stat-label">Diwali 2026</div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. BUDGET OPTIONS */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Gift Options by Budget</div>
          <h2 className="cp-section-title">Diwali Gift Options for Every Budget</h2>
          <p className="cp-section-sub">
            Choose a tier that fits your per-head spend. All options include branded packaging
            and can be customised with your company logo.
          </p>
          <div className="cp-budget-grid">
            {BUDGET_CARDS.map(card => (
              <a
                key={card.label}
                href={card.href}
                className={`cp-budget-card${card.featured ? ' cp-budget-card--featured' : ''}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div className={`cp-budget-label${card.featured ? '' : ''}`}>{card.label}</div>
                <div className="cp-budget-price">{card.title}</div>
                <p className="cp-budget-desc">{card.desc}</p>
                <span className="cp-budget-cta">See options →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Diwali Products</div>
          <h2 className="cp-section-title">Browse Diwali Corporate Gift Products</h2>
          <p className="cp-section-sub">
            All products suitable for Diwali gifting. Filter by price to match your per-head budget.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Diwali Corporate Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* 6. PLANNING TIMELINE */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Planning Timeline</div>
          <h2 className="cp-section-title">Diwali 2026 Gifting Timeline</h2>
          <p className="cp-section-sub">
            Follow this timeline to guarantee delivery before Diwali - even for large orders with full customisation.
          </p>
          <div className="cp-steps">
            {PLANNING_STEPS.map(step => (
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

      {/* 7. COMPARISON TABLE */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Comparison Guide</div>
          <h2 className="cp-section-title">2026 Diwali Gift Ideas at a Glance</h2>
          <p className="cp-section-sub">
            Prices are per-head at 25+ units with standard branded packaging included.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Gift</th>
                  <th>Includes</th>
                  <th>Price / Head</th>
                  <th>MOQ</th>
                </tr>
              </thead>
              <tbody>
                {GIFT_IDEAS_TABLE.map(row => (
                  <tr key={row.gift}>
                    <td>{row.gift}</td>
                    <td style={{ fontWeight: 300 }}>{row.includes}</td>
                    <td style={{ fontWeight: 500, color: 'var(--forest-green,#1B4D3E)' }}>{row.price}</td>
                    <td>{row.moq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1200&q=80" alt="Festive Diwali corporate gift hampers with diyas and branded packaging" loading="lazy" />
      </figure>

      {/* 8. QUOTE PULL */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            Diwali gifting isn't optional for Indian companies - it's the most-anticipated employee benefit
            of the year. The gift quality signals how much you value your team.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 9. CTA + FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Diwali 2026</div>
            <h2 className="cp-cta-title">Plan Your<br />Diwali Gifting</h2>
            <p className="cp-cta-sub">
              Tell us your headcount, budget per head, and delivery cities - we will come back
              with a curated Diwali proposal and mockup within 4 hours.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Plan Your Diwali Gifting"
              ctaLabel="Get Diwali Quote"
              defaultOccasion="diwali"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* 10. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQS}
            eyebrow="FAQ"
            title="Diwali Corporate Gifts 2026 - Frequently Asked Questions"
          />
        </div>
      </section>

      {/* 11. RELATED LINKS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title">Related Guides</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Seasonal', title: 'Diwali Gifts for Employees', href: '/guides/diwali-gifts-for-employees' },
              { label: 'Collections', title: 'Gift Hampers', href: '/collections/hampers' },
              { label: 'Budget Guide', title: 'Corporate Gifts Under ₹1,000', href: '/guides/corporate-gifts-under-1000' },
              { label: 'Bangalore', title: 'Bulk Corporate Gifting', href: '/bangalore-corporate-gifting/bulk-gifting' },
              { label: 'Personalisation', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
              { label: 'Employees', title: 'Diwali Gifts for Employees', href: '/guides/diwali-gifts-for-employees' },
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
