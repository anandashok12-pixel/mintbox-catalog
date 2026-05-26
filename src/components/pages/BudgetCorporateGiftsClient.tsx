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

const PRICE_LEVELS = [
  {
    range: 'Under ₹100/head',
    use: 'Event Giveaways',
    desc: 'Branded pens, badges, seed packets. Best for 500+ unit orders. Not suitable for premium occasions.',
    icon: '✏️',
    bg: 'cp-img-warm',
  },
  {
    range: '₹100–₹500/head',
    use: 'Standard Utility',
    desc: 'Notebooks, mugs, totes, eco kits. Works for team events, department gifts, or large-team Diwali.',
    icon: '📓',
    bg: 'cp-img-mid',
  },
  {
    range: '₹500–₹1,500/head',
    use: 'The Sweet Spot',
    desc: 'Quality bottles, combo kits, onboarding packs. Strong perceived value, personalisation included.',
    icon: '💧',
    bg: 'cp-img-green',
  },
  {
    range: '₹1,500–₹3,000/head',
    use: 'Premium Occasion',
    desc: 'Curated hampers, premium drinkware, hardcover notebooks. For clients, senior staff, and milestones.',
    icon: '🎁',
    bg: 'cp-img-gold',
  },
  {
    range: '₹3,000–₹5,000+/head',
    use: 'VIP Gifting',
    desc: 'Premium tech accessories, luxury hampers, personalised items. For board gifts, investors, and top performers.',
    icon: '⭐',
    bg: 'cp-img-warm',
  },
]

const OCCASION_TABLE = [
  { occasion: 'Mass event giveaway', budget: '₹100–₹200', items: 'Pens, badges, seed packets', minUnits: '500' },
  { occasion: 'Department Diwali', budget: '₹300–₹500', items: 'Mug + notebook + sweet hamper', minUnits: '50' },
  { occasion: 'Full-company Diwali', budget: '₹500–₹1,000', items: 'Bottle + snack hamper', minUnits: '100' },
  { occasion: 'New employee onboarding', budget: '₹750–₹1,500', items: 'Welcome kit (4–5 items)', minUnits: '10' },
  { occasion: 'Work anniversary (3–5 yr)', budget: '₹500–₹1,000', items: 'Engraved bottle or pen + card', minUnits: '1' },
  { occasion: 'Work anniversary (10+ yr)', budget: '₹1,500–₹3,000', items: 'Premium hamper or tech gift', minUnits: '1' },
  { occasion: 'Client appreciation', budget: '₹1,500–₹5,000', items: 'Curated hamper + premium packaging', minUnits: '1' },
  { occasion: 'Conference giveaway', budget: '₹200–₹500', items: 'Tote + pen + notebook', minUnits: '100' },
  { occasion: 'Team celebration', budget: '₹600–₹1,200', items: 'Swag box (tee + mug + snack)', minUnits: '10' },
]

const BULK_TIERS = [
  {
    qty: '50–99',
    label: 'Base',
    discount: 'Listed price',
    desc: 'Base bulk rate. MOQ met on most products.',
    featured: false,
  },
  {
    qty: '100–249',
    label: 'Growing',
    discount: '5–10% off',
    desc: 'Mid-tier savings. Logo printing included at no extra cost.',
    featured: false,
  },
  {
    qty: '250–499',
    label: 'Popular',
    discount: '15–20% off',
    desc: 'Significant savings with priority production slot.',
    featured: true,
  },
  {
    qty: '500+',
    label: 'Enterprise',
    discount: '25–35% off',
    desc: 'Best pricing, dedicated account manager, flexible delivery.',
    featured: false,
  },
]

const FAQS = [
  {
    q: 'How much should a company spend on corporate gifts per employee?',
    a: "Indian companies typically budget ₹500–₹2,500 per employee per year for gifting. Diwali is the biggest occasion (₹500–₹1,500 per person); onboarding kits range from ₹500–₹2,000. Adjust by seniority - frontline staff at ₹500–₹800, managers at ₹1,000–₹2,000, executives at ₹2,000+.",
  },
  {
    q: 'How can I make a budget gift feel premium?',
    a: "Three levers: packaging (branded box or sleeve), personalisation (name or logo), and presentation (handwritten card, ribbon). A ₹300 mug in a branded kraft box with a note feels like a ₹800 gift. Presentation multiplies perceived value far more than the product itself.",
  },
  {
    q: "What's the best gift for a budget of ₹500 per person for 200 employees?",
    a: "At ₹500 for 200 people (₹1L total), a quality ceramic mug or stainless bottle with logo printing, packed in a branded sleeve with a note card, is ideal. Bulk pricing at 200 units drops the per-unit cost significantly, leaving room for better packaging.",
  },
  {
    q: 'Are there hidden costs I should budget for (packaging, setup, delivery)?',
    a: "MintBox pricing is all-inclusive - logo printing, basic packaging, and standard delivery are included in the listed price. Additional costs include custom packaging boxes (₹30–₹80/unit), rush production (15–20% surcharge), name personalisation (₹30–₹80/unit), and express delivery.",
  },
  {
    q: 'Can I split my budget across multiple gift tiers for different seniority levels?',
    a: "Yes and recommended. Many clients use a tiered approach: ₹300 for all-staff (Diwali), ₹800 for managers, ₹2,000 for VPs and above. We handle multi-tier orders from a single purchase order with separate delivery instructions per tier.",
  },
  {
    q: 'Is there a minimum order value?',
    a: 'The minimum order value is ₹5,000. This covers orders as small as 10 units at ₹500 each. For very small quantities (1–5 units), a small-order fee of ₹500 applies.',
  },
]


export default function BudgetCorporateGiftsClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Budget Corporate Gifts", "item": "https://themintbox.in/guides/budget-corporate-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Budget Corporate Gifts: Smart Gifting Without Overspending",
        "description": "How to buy quality corporate gifts on a budget. Compare price tiers, see what's achievable at each level, and get bulk pricing. Free quote in 24 hours.",
        "url": "https://themintbox.in/guides/budget-corporate-gifts",
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
            <a href="/guides/corporate-gifting-handbook">Guides</a>
            <span className="cp-breadcrumb-sep">›</span>
            <span className="cp-breadcrumb-current">Budget Corporate Gifts</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Gifting Guide · Budgeting & Planning</div>
              <h1 className="cp-hero-title">
                Budget Corporate Gifts:<br />
                <em>Smart Gifting Without Overspending</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                A practical framework for planning corporate gifting budgets - by team size, occasion,
                and price tier. Covers ₹100 to ₹5,000 per head with real examples, bulk pricing, and what to avoid.
              </p>
              <div className="cp-hero-ctas">
                <a href="#products" className="cp-hero-cta-primary">Browse Budget Gifts ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Get Bulk Pricing</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ ₹100–₹5,000/head covered</span>
                <span className="cp-hero-badge">✓ Bulk pricing calculator</span>
                <span className="cp-hero-badge">✓ Real examples</span>
                <span className="cp-hero-badge">✓ Free quote</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" alt="Budget planning for corporate gifting" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80" alt="Corporate gift packages ready for delivery" className="cp-hero-img-actual" loading="lazy" />
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
            content="Indian companies typically spend ₹500–₹2,500 per employee per year on corporate gifting. The sweet spot is ₹750–₹1,500 for standard occasions (Diwali, work anniversaries) and ₹250–₹500 for events and giveaways. Budget gifts feel premium when packaging, personalisation, and presentation are prioritised over the item itself."
          />
          <EATSignal credentials={[
            '500+ corporate clients across India',
            'Managed ₹1Cr+ in gifting budgets',
            'Transparent pricing - no hidden setup fees',
            'Budget guidance included with every quote',
            'Flexible payment: advance, milestone, or net-30',
          ]} />
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹100<span className="cp-stat-unit">–₹5,000</span></div>
              <div className="cp-stat-label">Full budget range covered</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">500<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Happy clients across India</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹1Cr<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Gifting budgets managed</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Zero</div>
              <div className="cp-stat-label">Hidden fees</div>
            </div>
          </div>
        </div>
      </section>


      {/* ── PRICE LEVELS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Price Breakdown</div>
          <h2 className="cp-section-title">What You Get at Each Budget Level</h2>
          <p className="cp-section-sub">
            Not all budgets are equal - here is a realistic breakdown of what quality and category
            you can expect at each spend level.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {PRICE_LEVELS.map(level => (
              <div key={level.range} className="cp-card">
                <div className={`cp-card-icon ${level.bg}`} style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {level.icon}
                </div>
                <div className="cp-card-title">{level.range}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--gold,#B8972E)', marginBottom: '8px' }}>{level.use}</div>
                <p className="cp-card-desc">{level.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Browse Products</div>
          <h2 className="cp-section-title">Budget Corporate Gifts - Full Range</h2>
          <p className="cp-section-sub">
            Filter by price to find gifts that match your budget. All products support bulk ordering
            and logo customisation.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Budget Corporate Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* ── OCCASION TABLE ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <figure className="cp-editorial-img">
            <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" alt="Corporate gifting budget planning and finance workspace" loading="lazy" />
          </figure>
          <div className="cp-section-eyebrow">Budget Planning by Occasion</div>
          <h2 className="cp-section-title">Recommended Budget by Occasion</h2>
          <p className="cp-section-sub">
            Use this table as a starting point for your gifting budget. Adjust up by 20% for premium
            packaging and personalisation.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Occasion</th>
                  <th>Recommended Budget</th>
                  <th>Items That Work</th>
                  <th>Min Units</th>
                </tr>
              </thead>
              <tbody>
                {OCCASION_TABLE.map(row => (
                  <tr key={row.occasion}>
                    <td style={{ fontWeight: 500 }}>{row.occasion}</td>
                    <td style={{ fontWeight: 500, color: 'var(--forest-green,#1B4D3E)' }}>{row.budget}</td>
                    <td style={{ fontWeight: 300 }}>{row.items}</td>
                    <td>{row.minUnits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '14px', fontSize: '13px', color: 'rgba(26,26,24,0.45)', fontWeight: 300 }}>
            * Budgets are per-unit estimates. <a href="/contact" style={{ color: 'var(--forest-green,#1B4D3E)' }}>Request a quote</a> for exact pricing at your quantity.
          </p>
        </div>
      </section>

      {/* ── QUOTE PULL ── */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            The mistake most companies make is spending 80% of the budget on the product and 20% on presentation.
            Flip that ratio and your ₹400 gift will feel like ₹1,200.
          </p>
          <cite className="cp-quote-cite">MintBox Packaging Philosophy</cite>
        </div>
      </div>

      {/* ── BULK PRICING TIERS ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Volume Discounts</div>
          <h2 className="cp-section-title">The More You Order, the More You Save</h2>
          <p className="cp-section-sub">
            Bulk pricing tiers apply across all products. The larger your order, the lower
            the per-unit cost - and the more room you have for premium packaging.
          </p>
          <div className="cp-tier-grid">
            {BULK_TIERS.map(tier => (
              <div
                key={tier.qty}
                className={`cp-tier-cell${tier.featured ? ' cp-tier-cell--featured' : ''}`}
              >
                <div className={`cp-tier-label${tier.featured ? ' cp-tier-label--light' : ' cp-tier-label--dark'}`}>
                  {tier.label}
                </div>
                <div className={`cp-tier-qty${tier.featured ? ' cp-tier-qty--light' : ' cp-tier-qty--dark'}`}>
                  {tier.qty} <span style={{ fontSize: '16px' }}>units</span>
                </div>
                <div className={`cp-tier-discount${!tier.featured ? ' cp-tier-saving--muted' : ''}`}>
                  {tier.discount}
                </div>
                <div className={`cp-tier-desc${tier.featured ? ' cp-tier-desc--light' : ' cp-tier-desc--dark'}`}>
                  {tier.desc}
                </div>
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
            <div className="cp-cta-eyebrow">Free Budgeting Help</div>
            <h2 className="cp-cta-title">Plan Your<br />Gifting Budget</h2>
            <p className="cp-cta-desc">
              Tell us your team size, occasion, and budget per head - we'll send back a
              curated shortlist with exact pricing and bulk discounts applied.
            </p>
            <div className="cp-cta-promises">
              {[
                'Itemised quote within 4 business hours',
                'Bulk discount applied automatically',
                'No hidden setup or packaging fees',
                'Multi-tier gifting supported (by seniority)',
              ].map(p => (
                <div key={p} className="cp-cta-promise">
                  <span className="cp-cta-promise-dot" />
                  {p}
                </div>
              ))}
            </div>
          </div>
          <InlineQuoteForm
            title="Plan Your Gifting Budget"
            subtitle="Share your budget range and team size - we'll match the best options with bulk pricing."
            ctaLabel="Get Budget Quote"
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
            title="Budget Corporate Gifts - FAQs"
            eyebrow="FAQ"
          />
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title" style={{ marginBottom: '28px' }}>Related Guides</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Budget Guide', title: 'Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
              { label: 'Budget Guide', title: 'Gifts Under ₹1,000', href: '/guides/corporate-gifts-under-1000' },
              { label: 'Gifting Guide', title: 'How to Choose Corporate Gifts', href: '/guides/how-to-choose-corporate-gifts' },
              { label: 'Bangalore', title: 'Bulk Gifting Guide', href: '/bangalore-corporate-gifting/bulk-gifting' },
              { label: 'Personalisation', title: 'Personalised Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Collections', title: 'All Collections', href: '/collections/corporate-gifts' },
              { label: 'Under ₹500', title: 'Corporate Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
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
