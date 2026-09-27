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

const PAGE_UPDATED = '2026-09-27'

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
    label: '₹434–₹799',
    title: 'Team tier',
    desc: 'Dry-fruit boxes, eco desk sets and tote combos. Good for all-staff gifting.',
    href: '/diwali-corporate-gifts#hampers',
    featured: false,
  },
  {
    label: '₹800–₹1,299',
    title: 'Manager tier',
    desc: 'Bottle and mug hampers with dry fruits, lamps or chocolates. The sweet spot for managers and top performers.',
    href: '/diwali-corporate-gifts#hampers',
    featured: true,
  },
  {
    label: '₹1,300–₹2,170',
    title: 'Leadership & client tier',
    desc: 'Pure copper sets, 7-in-1 tech hampers and executive combos. For clients and senior leadership.',
    href: '/diwali-corporate-gifts#hampers',
    featured: false,
  },
]

const PLANNING_STEPS = [
  {
    num: '1',
    title: 'Now to mid-October',
    desc: 'Fix headcount, budget per head and delivery cities. Shortlist hampers and share your logo for a branding mockup.',
  },
  {
    num: '2',
    title: 'By Friday, 24 October',
    desc: 'Approve the mockup and confirm the order. Orders confirmed by this date are guaranteed to arrive before Diwali with full logo branding.',
  },
  {
    num: '3',
    title: '7–10 working days after confirmation',
    desc: 'Assembly, quality checks and dispatch from Bengaluru to one office or many cities, with tracking shared on WhatsApp.',
  },
  {
    num: '4',
    title: '25–31 October',
    desc: 'Ready-stock hampers with a printed insert card. Logo-printed boxes depend on print slot availability.',
  },
  {
    num: '5',
    title: '1 November onward',
    desc: 'Bengaluru rush orders from available stock only. Confirm on WhatsApp before ordering. Diwali is Sunday, 8 November 2026.',
  },
]

const GIFT_IDEAS_TABLE = [
  { gift: 'Dry fruit combo box', includes: '4 or 6 dry fruits in a printed rigid box', price: '₹280–₹2,015', moq: '10' },
  { gift: 'Eco Diwali set', includes: 'Husk mug, seed stationery, wooden desk set or jute tote', price: '₹434–₹1,211', moq: '10' },
  { gift: 'Diyas, candles & urli sets', includes: 'Scented candles, urlis, diyas and diffusers', price: '₹199–₹1,899', moq: '10' },
  { gift: 'Drinkware hamper', includes: 'Bottle or tumbler + mug + dry fruits or lamp', price: '₹770–₹1,400', moq: '10' },
  { gift: 'Copper gift set', includes: 'Copper bottle + tumblers + presentation box', price: '₹1,015–₹2,170', moq: '10' },
  { gift: 'Tech & executive hamper', includes: 'Laptop stand, wireless charger, power bank or wallet set', price: '₹1,197–₹1,631', moq: '10' },
]


const FAQS = [
  {
    q: 'When should I order Diwali 2026 corporate gifts?',
    a: 'Diwali 2026 falls on Sunday, 8 November. Orders confirmed by Friday, 24 October are guaranteed to arrive before Diwali with full logo branding, and dispatch takes 7 to 10 working days after confirmation. Orders confirmed between 25 and 31 October are fulfilled from ready stock with a printed insert card. From 1 November, only Bengaluru rush orders from available stock are possible.',
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
    a: 'Yes. Recipient names can go on the insert card, and on bottles, notebooks or mugs in select hampers. Share the names list when you confirm the order. Personalisation cost depends on quantity and print method and is confirmed in your quote.',
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
          { "@type": "ListItem", "position": 3, "name": "Diwali Corporate Gift Ideas", "item": "https://themintbox.in/guides/diwali-corporate-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Diwali Corporate Gift Ideas 2026: How to Plan, Budget and Order",
        "description": "Diwali corporate gift ideas for 2026 by budget, with a planning timeline. Diwali is Sunday 8 November; confirm by 24 October for guaranteed delivery. MOQ 10 units.",
        "url": "https://themintbox.in/guides/diwali-corporate-gifts",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
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
              <span className="cp-breadcrumb-current">Diwali Corporate Gift Ideas</span>
            </nav>
            <div className="cp-hero-eyebrow">Seasonal Guide · Diwali 2026</div>
            <h1 className="cp-hero-title">
              Diwali Corporate Gift Ideas 2026:<br />
              <em>How to Plan, Budget and Order</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Gift ideas by budget, a planning timeline and ordering deadlines for Diwali 2026 (Sunday,
              8 November). Ready to order? See all 120{' '}
              <a href="/diwali-corporate-gifts">corporate Diwali gift hampers</a> with full contents and per-unit prices.
            </p>
            <div className="cp-hero-ctas">
              <a href="/diwali-corporate-gifts" className="cp-hero-cta-primary">See 120 Diwali Hampers →</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get Diwali Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Confirm by 24 Oct for guaranteed delivery</span>
              <span className="cp-hero-badge">✓ MOQ 10 units</span>
              <span className="cp-hero-badge">✓ Pan-India delivery</span>
              <span className="cp-hero-badge">✓ GST invoicing</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://tsg7nlowf2bnsaf0.public.blob.vercel-storage.com/diwali-dk16.jpg" alt="Premium copper Diwali hamper with bottle, tumbler, lamp and dry fruits by MintBox" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://tsg7nlowf2bnsaf0.public.blob.vercel-storage.com/diwali-dk04.jpg" alt="6-in-1 Diwali combo with dry fruits, LED lamp and diyas by MintBox" className="cp-hero-img-actual" loading="lazy" />
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
            content="Diwali 2026 falls on Sunday, 8 November. Confirm corporate Diwali gift orders by 24 October for guaranteed pre-Diwali delivery with logo branding; dispatch takes 7 to 10 working days. Most companies spend ₹500 to ₹1,300 per employee and ₹1,300 to ₹2,200 per client. Popular options: dry fruit boxes, copper drinkware sets, diya and candle sets, eco sets and tech hampers. Minimum order is 10 units per hamper, with volume pricing for 100+ units."
          />
          <EATSignal credentials={[
            '120 ready-to-gift Diwali hampers with full contents listed',
            'Assembled and quality-checked in Bengaluru',
            'Logo on box, printed insert card and name personalisation',
            'Sealed, FSSAI-compliant dry fruits and branded chocolates',
            'GST invoice on every order, pan-India dispatch with tracking',
          ]} />
        </div>
      </div>

      {/* 3. STATS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">7–10<span className="cp-stat-unit"> days</span></div>
              <div className="cp-stat-label">dispatch after confirmation</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">24<span className="cp-stat-unit"> Oct</span></div>
              <div className="cp-stat-label">last date for guaranteed delivery</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">10<span className="cp-stat-unit"> units</span></div>
              <div className="cp-stat-label">minimum order quantity</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Nov 8</div>
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
            These are the same three tiers used on our{' '}
            <a href="/diwali-corporate-gifts">Diwali gift hampers</a> page. Every hamper ships in a
            printed gift box and can carry your company logo.
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
            Per-unit prices at the 10-unit minimum, exclusive of GST, with a printed gift box included. Full contents for every hamper are on the <a href="/diwali-corporate-gifts">corporate Diwali gifts</a> page.
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
        <img src="https://tsg7nlowf2bnsaf0.public.blob.vercel-storage.com/diwali-dk08.jpg" alt="Festive Diwali corporate gift box with bamboo bottle, mug and chocolates by MintBox" loading="lazy" />
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
            title="Diwali Corporate Gift Ideas 2026: Frequently Asked Questions"
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
              { label: 'Shop', title: 'Corporate Diwali Gift Hampers 2026', href: '/diwali-corporate-gifts' },
              { label: 'Seasonal', title: 'Diwali Gifts for Employees', href: '/guides/diwali-gifts-for-employees' },
              { label: 'Collections', title: 'Gift Hampers', href: '/collections/hampers' },
              { label: 'Budget Guide', title: 'Corporate Gifts Under ₹1,000', href: '/guides/corporate-gifts-under-1000' },
              { label: 'Bangalore', title: 'Bulk Corporate Gifting', href: '/bangalore-corporate-gifting/bulk-gifting' },
              { label: 'Personalisation', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
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
        <LastUpdatedDate date={PAGE_UPDATED} />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
