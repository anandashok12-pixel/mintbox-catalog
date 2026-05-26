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

const COMPANY_SIZE_CARDS = [
  {
    icon: '🚀',
    bg: 'cp-img-green',
    title: 'Startups (10–50 employees)',
    budget: '₹25,000–₹1,50,000 / year',
    desc: 'Focus on onboarding kits (₹1,000–₹1,500/kit) and Diwali (₹500–₹800/head). Skip mass events; invest in meaningful onboarding.',
  },
  {
    icon: '🏢',
    bg: 'cp-img-mid',
    title: 'Mid-size (50–500 employees)',
    budget: '₹1.5L–₹25L / year',
    desc: 'Occasions: Diwali (largest allocation), onboarding, work anniversaries. At 100+ units, bulk discounts reduce per-unit cost by 15–25%.',
  },
  {
    icon: '🏛️',
    bg: 'cp-img-gold',
    title: 'Enterprise (500+ employees)',
    budget: '₹25L–₹2Cr+ / year',
    desc: 'Use tiered gifting: ₹400–₹800 for all-staff, ₹1,500–₹3,000 for managers, ₹3,000–₹10,000 for VPs and above.',
  },
]

const ALLOCATION_TABLE = [
  { occasion: 'Diwali (all-staff)', budget: '₹500–₹1,500', pct: '40–60%' },
  { occasion: 'Employee Onboarding Kit', budget: '₹750–₹2,000', pct: '10–25%' },
  { occasion: 'Work Anniversary (1–5 yr)', budget: '₹500–₹1,000', pct: '5–10%' },
  { occasion: 'Work Anniversary (5–10 yr)', budget: '₹1,000–₹3,000', pct: '5–8%' },
  { occasion: 'Client Appreciation', budget: '₹1,500–₹5,000', pct: '8–15%' },
  { occasion: 'Conference Giveaways', budget: '₹200–₹500', pct: '3–8%' },
  { occasion: 'Team Events/Celebrations', budget: '₹400–₹800', pct: '3–5%' },
  { occasion: 'Recognition Awards', budget: '₹800–₹2,500', pct: '5–10%' },
  { occasion: 'New Year/Festive', budget: '₹300–₹600', pct: '2–5%' },
]

const BULK_TIERS = [
  { qty: '50–99 units', discount: 'Standard', desc: 'Base bulk rate with listed pricing.', featured: false },
  { qty: '100–249 units', discount: '10–15% saving', desc: 'Mid-tier savings on most categories.', featured: false },
  { qty: '250–499 units', discount: '18–22% saving', desc: 'Significant per-unit savings, priority production slot.', featured: true },
  { qty: '500+ units', discount: '25–35% saving', desc: 'Best pricing, dedicated account manager, flexible delivery.', featured: false },
]

const FAQS = [
  {
    q: 'How much should a company budget for corporate gifts per employee per year?',
    a: 'Indian companies typically allocate ₹500–₹2,500 per employee annually. Diwali takes the largest share (₹500–₹1,500 per person). Onboarding kits for new hires add ₹750–₹2,000 per joiner. Adjust for company size: startups often budget higher per head for impact; enterprises use tiered approaches by seniority.',
  },
  {
    q: 'Is corporate gifting a tax-deductible expense in India?',
    a: 'Gifts to employees above ₹5,000 per year are treated as perquisites and subject to TDS under Section 17(2). Client gifts are generally deductible as business expenses under Section 37(1) if they are reasonable and business-purpose-driven. Consult your CA for specific treatment.',
  },
  {
    q: 'How do I calculate the ROI of corporate gifting?',
    a: 'ROI from gifting is indirect: employee retention improvement (reduced attrition costs), client renewal rates, referral rates, and brand perception surveys. Benchmark: companies that gift well report 15–20% better retention in gifted cohorts. The cost of replacing one employee (3–6 months salary) dwarfs an annual gifting spend.',
  },
  {
    q: 'What percentage of the annual HR budget should go to gifting?',
    a: 'Typically 2–5% of the total HR budget. For a 100-person company with ₹10L in HR budget, ₹20,000–₹50,000 annually is appropriate. Fast-growing companies in competitive talent markets often allocate 5–8%.',
  },
  {
    q: 'How can I reduce gifting costs without reducing impact?',
    a: 'Three approaches: (1) Consolidate occasions - Diwali one big gift rather than 3 small ones; (2) Order in bulk - 15–35% savings from 100+ units; (3) Invest in packaging - a ₹50 kraft box elevates a ₹300 gift to feel like a ₹600 one.',
  },
  {
    q: 'Is it better to give everyone the same gift or tier by seniority?',
    a: 'Both work. Same gift signals equality and simplicity. Tiered gifting acknowledges contribution - more expensive gifts for longer-tenured or senior staff. A common approach: one base gift for all-staff (Diwali), tiered for anniversaries and recognition.',
  },
]


export default function GiftingBudgetClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Corporate Gifting Budget", "item": "https://themintbox.in/guides/corporate-gifting-budget" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Corporate Gifting Budget: How to Plan & Optimise Your Spend",
        "description": "How to plan a corporate gifting budget - by company size, occasion, and ROI. Includes budget templates, per-employee benchmarks, and bulk pricing guide.",
        "url": "https://themintbox.in/guides/corporate-gifting-budget",
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
              <span className="cp-breadcrumb-current">Corporate Gifting Budget</span>
            </nav>
            <div className="cp-hero-eyebrow">Planning Guide · Budgets &amp; ROI</div>
            <h1 className="cp-hero-title">
              Corporate Gifting Budget:<br />
              <em>How to Plan &amp; Optimise Your Spend</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              A practical framework for planning corporate gifting budgets - benchmarks by company size,
              per-occasion allocation, bulk pricing formulas, and ROI considerations.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-hero-cta-primary">See Products ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Budget Plan</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Per-employee benchmarks</span>
              <span className="cp-hero-badge">✓ By occasion &amp; company size</span>
              <span className="cp-hero-badge">✓ ROI framework</span>
              <span className="cp-hero-badge">✓ Free budget template</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" alt="Corporate gifting budget planning workspace" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" alt="Budget planning for corporate gifting" className="cp-hero-img-actual" loading="lazy" />
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
            content="Indian companies typically allocate ₹500–₹2,500 per employee per year for gifting. The largest share (40–60%) goes to Diwali; the rest covers onboarding kits, work anniversaries, and client gifting. Budget ₹500–₹800 per head for standard occasions; ₹1,500–₹3,000 for premium. At 100+ units, bulk discounts of 15–25% significantly improve cost-per-impression."
          />
          <EATSignal credentials={[
            'Budget planning support for 500+ corporates',
            '₹1Cr+ in gifting budgets managed',
            'Free consultation and planning templates',
            'Transparent pricing - no hidden setup fees',
            'Volume pricing published openly',
          ]} />
        </div>
      </div>

      {/* 3. STATS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹500<span className="cp-stat-unit">–₹2,500</span></div>
              <div className="cp-stat-label">per employee per year (benchmark)</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">40<span className="cp-stat-unit">–60%</span></div>
              <div className="cp-stat-label">Diwali allocation</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">15<span className="cp-stat-unit">–35%</span></div>
              <div className="cp-stat-label">bulk discount from 100 units</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Zero</div>
              <div className="cp-stat-label">hidden fees</div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. BUDGET BY COMPANY SIZE */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">By Company Size</div>
          <h2 className="cp-section-title">Budget Benchmarks by Company Size</h2>
          <p className="cp-section-sub">
            Gifting budgets scale with headcount. Use these benchmarks as a starting point,
            then adjust for your industry and talent market.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {COMPANY_SIZE_CARDS.map(card => (
              <div key={card.title} className="cp-card">
                <div className={`cp-card-icon ${card.bg}`} style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {card.icon}
                </div>
                <div className="cp-card-title">{card.title}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--forest-green,#1B4D3E)', marginBottom: '10px' }}>
                  {card.budget}
                </div>
                <p className="cp-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Products</div>
          <h2 className="cp-section-title">Browse Corporate Gift Products</h2>
          <p className="cp-section-sub">
            Explore our full range across budget tiers. Use the filters to narrow by price or category.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Corporate Gift Products"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* 6. ALLOCATION TABLE */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <figure className="cp-editorial-img">
            <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" alt="Corporate gifting budget planning and financial workspace" loading="lazy" />
          </figure>
          <div className="cp-section-eyebrow">Budget Allocation</div>
          <h2 className="cp-section-title">How to Allocate Your Annual Gifting Budget</h2>
          <p className="cp-section-sub">
            Indicative per-head spend and percentage share of annual gifting budget, by occasion.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Occasion</th>
                  <th>Budget / Head</th>
                  <th>% of Annual Budget</th>
                </tr>
              </thead>
              <tbody>
                {ALLOCATION_TABLE.map(row => (
                  <tr key={row.occasion}>
                    <td>{row.occasion}</td>
                    <td style={{ fontWeight: 500, color: 'var(--forest-green,#1B4D3E)' }}>{row.budget}</td>
                    <td>{row.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '14px', fontSize: '13px', color: 'rgba(26,26,24,0.45)', fontWeight: 300 }}>
            * Percentages are indicative. Exact allocation depends on company size, culture, and growth stage.
          </p>
        </div>
      </section>

      {/* 7. QUOTE PULL */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            Gifting ROI isn't measured in referrals or sales (though those come). It's measured in the
            employee who stayed because they felt valued - and the client who renewed because they felt appreciated.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Philosophy</cite>
        </div>
      </div>

      {/* 8. BULK PRICING TIERS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Volume Discounts</div>
          <h2 className="cp-section-title">How Bulk Pricing Saves Your Budget</h2>
          <p className="cp-section-sub">
            Consolidating your gifting orders unlocks significant per-unit savings.
            The more you order, the less you pay per gift.
          </p>
          <div className="cp-tier-grid">
            {BULK_TIERS.map(tier => (
              <div
                key={tier.qty}
                className={`cp-tier-cell${tier.featured ? ' cp-tier-cell--featured' : ''}`}
              >
                <div className={`cp-tier-qty${tier.featured ? ' cp-tier-qty--light' : ' cp-tier-qty--dark'}`}>
                  {tier.qty}
                </div>
                <div className={`cp-tier-discount${tier.featured ? '' : ' cp-tier-saving--muted'}`}>
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

      {/* 9. CTA + FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Budget Planning</div>
            <h2 className="cp-cta-title">Plan Your<br />Gifting Budget</h2>
            <p className="cp-cta-sub">
              Tell us your headcount, occasions, and budget range - we will send back a
              structured gifting plan with product recommendations and bulk pricing within 4 hours.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Plan Your Gifting Budget"
              ctaLabel="Get a Budget Plan"
              defaultOccasion="other"
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
            title="Corporate Gifting Budget - Frequently Asked Questions"
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
              { label: 'Budget Guide', title: 'Corporate Gifts Under ₹1,000', href: '/guides/corporate-gifts-under-1000' },
              { label: 'Budget Guide', title: 'Corporate Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
              { label: 'Planning Guide', title: 'How to Choose Corporate Gifts', href: '/guides/how-to-choose-corporate-gifts' },
              { label: 'Bangalore', title: 'Bulk Corporate Gifting', href: '/bangalore-corporate-gifting/bulk-gifting' },
              { label: 'Seasonal', title: 'Diwali Corporate Gifts', href: '/guides/diwali-corporate-gifts' },
              { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
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
        <LastUpdatedDate date="2026-05-26" />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
