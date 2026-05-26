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

const CHAPTERS = [
  {
    num: '01',
    title: 'Why Corporate Gifting Matters',
    desc: 'Gifting builds relationships, reinforces culture, and keeps your brand visible long after the event. The right gift at the right moment is remembered far longer than its cost.',
    href: '#why-gifting',
  },
  {
    num: '02',
    title: 'Choosing the Right Gift',
    desc: 'Match the gift to the recipient, occasion, and company culture. Budget is only one dimension - relevance and quality matter more than price.',
    href: '#choosing-gifts',
  },
  {
    num: '03',
    title: 'Budget Planning & Pricing',
    desc: 'From ₹150 conference giveaways to ₹3,000 premium hampers. How to set a per-head budget and get the most from your gifting spend.',
    href: '#budget-planning',
  },
  {
    num: '04',
    title: 'Customisation & Branding',
    desc: 'Logo printing, name engraving, custom colours, and premium packaging. How to turn a good product into a brand experience.',
    href: '#customisation',
  },
  {
    num: '05',
    title: 'Bulk Ordering & Lead Times',
    desc: 'MOQs, bulk pricing tiers, production timelines, and how to plan ahead for Diwali, year-end, and large onboarding batches.',
    href: '#bulk-ordering',
  },
  {
    num: '06',
    title: 'Occasions & Gifting Calendar',
    desc: 'Diwali, onboarding, work anniversaries, client milestones, Christmas - the Indian corporate gifting calendar and what works for each moment.',
    href: '#occasions',
  },
]

const BUDGET_GUIDE = [
  {
    range: 'Under ₹500',
    label: 'Giveaways & Events',
    products: ['Branded pens', 'Custom notebooks', 'Ceramic mugs', 'Eco tote bags'],
    href: '/guides/corporate-gifts-under-500',
    bg: 'cp-img-mid',
  },
  {
    range: '₹500–₹1,000',
    label: 'Most Popular',
    products: ['Insulated bottles', 'Diary + pen sets', 'Premium onboarding kits', 'Wireless chargers'],
    href: '/guides/corporate-gifts-under-1000',
    bg: 'cp-img-green',
  },
  {
    range: '₹1,000–₹3,000',
    label: 'Premium & Clients',
    products: ['Curated hampers', 'Tech gadget sets', 'Wellness kits', 'Artisan gift boxes'],
    href: '/guides/corporate-gift-ideas-2026',
    bg: 'cp-img-gold',
  },
]

const OCCASIONS_GUIDE = [
  { emoji: '🪔', title: 'Diwali Gifting', desc: 'Most important Indian corporate gifting moment. Book 6–8 weeks early.', href: '/guides/diwali-corporate-gifts' },
  { emoji: '🎉', title: 'Employee Onboarding', desc: 'First impressions matter. Welcome kits set the tone from day one.', href: '/collections/employee-welcome-kit' },
  { emoji: '🤝', title: 'Client Gifting', desc: 'Strengthen key relationships with thoughtful, premium selections.', href: '/guides/corporate-gifts-for-clients' },
  { emoji: '🏆', title: 'Work Anniversaries', desc: 'Celebrate tenure milestones with personalised, lasting gifts.', href: '/guides/work-anniversary-gifts' },
  { emoji: '🎄', title: 'Christmas & Year-End', desc: 'International teams and MNCs gifting season - plan by November.', href: '/guides/christmas-corporate-gifts' },
  { emoji: '🌱', title: 'Sustainable Gifting', desc: 'ESG-aligned companies increasingly mandate eco-friendly choices.', href: '/guides/sustainable-corporate-gifts' },
]

const CATEGORIES = [
  { emoji: '☕', title: 'Drinkware', desc: 'Mugs, bottles, tumblers - the #1 category for brand recall.', href: '/collections/drinkware' },
  { emoji: '📓', title: 'Stationery', desc: 'Notebooks, planners, pens - timeless desk gifts.', href: '/collections/stationery' },
  { emoji: '📦', title: 'Hampers', desc: 'Curated multi-product sets for premium gifting occasions.', href: '/collections/hampers' },
  { emoji: '💻', title: 'Tech Gifts', desc: 'Wireless chargers, USB hubs, and desk accessories.', href: '/collections/tech-gifts' },
  { emoji: '🌿', title: 'Eco-Friendly', desc: 'Bamboo, recycled, and sustainable products for ESG programmes.', href: '/collections/eco-friendly-gifts' },
  { emoji: '🎒', title: 'Welcome Kits', desc: 'Everything a new hire needs from day one - boxed and branded.', href: '/collections/employee-welcome-kit' },
]

const COMPARISON_TABLE = [
  { type: 'Conference Giveaway', budget: '₹100–₹300', moq: '100+', lead: '3–5 days', best: 'Pens, notepads, tote bags' },
  { type: 'Team Event Gift', budget: '₹300–₹700', moq: '50+', lead: '5–7 days', best: 'Mugs, bottles, notebooks' },
  { type: 'Diwali / Festival', budget: '₹500–₹1,500', moq: '50+', lead: '7–14 days', best: 'Hampers, premium drinkware' },
  { type: 'Employee Onboarding', budget: '₹800–₹2,000', moq: '25+', lead: '5–10 days', best: 'Welcome kits, branded accessories' },
  { type: 'Client Gift', budget: '₹1,000–₹3,000', moq: '10+', lead: '7–10 days', best: 'Curated hampers, tech gadgets' },
  { type: 'CXO / Executive', budget: '₹3,000+', moq: '5+', lead: '10–15 days', best: 'Premium boxes, bespoke items' },
]

const FAQS = [
  {
    q: 'What is the minimum order quantity for corporate gifts?',
    a: 'Most products start at 25 units for bulk orders with logo printing. Premium hampers and onboarding kits are available from 10 units. Conference giveaways (pens, notepads) require a minimum of 100 units to unlock bulk pricing.',
  },
  {
    q: 'How do I choose the right corporate gift?',
    a: 'Start with the recipient (employee, client, or prospect), then match to occasion and budget. For employees, practical branded items (drinkware, stationery) score highest. For clients, curated hampers and premium tech gifts reinforce your brand positioning. See our <a href="/guides/how-to-choose-corporate-gifts">full guide on choosing corporate gifts</a>.',
  },
  {
    q: 'What is a typical corporate gifting budget per head?',
    a: 'Indian companies typically spend ₹300–₹500 for team events and conference giveaways, ₹500–₹1,500 for Diwali gifting, and ₹1,000–₹3,000 for client gifts. For premium or CXO-level gifting, ₹3,000–₹10,000 per recipient is common. See our <a href="/guides/corporate-gifting-budget">corporate gifting budget guide</a> for planning templates.',
  },
  {
    q: 'How long does it take to produce and deliver corporate gifts?',
    a: 'Standard lead times are 7–14 business days from order confirmation. Rush orders (3–5 days) are available for in-stock items with simple branding. For same-day delivery in Bangalore, see our <a href="/bangalore-corporate-gifting/same-day-delivery">same-day delivery service</a>.',
  },
  {
    q: 'Can I customise gifts with our company logo?',
    a: 'Yes. Over 85% of our products support logo customisation via pad printing, UV printing, engraving, or embroidery. Custom colour matching and full-wrap printing are available on select items. See our <a href="/customization/personalized-corporate-gifts">personalised gifts guide</a> for full options.',
  },
  {
    q: 'Do you provide GST invoices?',
    a: 'Yes. All orders include GST-compliant invoices. We are GST-registered and provide itemised bills suitable for corporate expense claims and procurement systems.',
  },
  {
    q: 'What are the most popular corporate gifts in India?',
    a: 'Drinkware (insulated bottles, mugs) consistently ranks #1 due to daily usage and long brand exposure. Stationery sets, onboarding kits, and eco-friendly hampers are close behind. For 2026 trends, see our <a href="/guides/corporate-gifting-trends-2026">corporate gifting trends guide</a>.',
  },
  {
    q: 'Do you deliver outside Bangalore?',
    a: 'Yes. MintBox delivers pan-India, including multi-city and multi-location shipments from a single purchase order. Typical delivery is 3–5 business days outside Bangalore, same-day for in-stock items within the city.',
  },
]


export default function CorporateGiftingHandbookClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Corporate Gifting Handbook", "item": "https://themintbox.in/guides/corporate-gifting-handbook" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "The Corporate Gifting Handbook: Complete Guide for Indian Businesses",
        "description": "The complete corporate gifting guide for Indian businesses - budgeting, choosing gifts, bulk ordering, customisation, and occasion planning. Updated for 2026.",
        "url": "https://themintbox.in/guides/corporate-gifting-handbook",
        "dateModified": "2026-05-26T00:00:00+05:30",
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-hero-inner--full" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="cp-breadcrumb-sep">›</span>
            <a href="/guides">Guides</a>
            <span className="cp-breadcrumb-sep">›</span>
            <span className="cp-breadcrumb-current">Corporate Gifting Handbook</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Complete Guide · 2026 Edition</div>
              <h1 className="cp-hero-title">
                The Corporate Gifting Handbook:<br />
                <em>Complete Guide for Indian Businesses</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                Everything you need to plan, budget, customise, and deliver corporate gifts
                at scale - from Diwali hampers to client gifts, onboarding kits to conference
                giveaways. Updated for 2026.
              </p>
              <div className="cp-hero-ctas">
                <a href="#chapters" className="cp-hero-cta-primary">Read the Handbook ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Get a Free Quote</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ Budget planning templates</span>
                <span className="cp-hero-badge">✓ Occasion-by-occasion guide</span>
                <span className="cp-hero-badge">✓ Customisation options</span>
                <span className="cp-hero-badge">✓ 2026 trends included</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80" alt="Corporate gifting guide and handbook" className="cp-hero-img-actual cp-hero-img-actual--tall" loading="lazy" />
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
            title="What is corporate gifting?"
            content="Corporate gifting is the practice of giving branded or curated gifts to employees, clients, and partners to build relationships, reinforce culture, and increase brand recall. In India, major gifting occasions include Diwali, employee onboarding, work anniversaries, client milestones, and year-end events. Budgets typically range from ₹150 per unit (conference giveaways) to ₹3,000+ per unit (premium client gifts)."
          />
          <EATSignal credentials={[
            'MintBox has fulfilled 10,000+ corporate gift orders across Bangalore and pan-India',
            '200+ products in stock - drinkware, stationery, hampers, tech, eco-friendly',
            'Bulk orders from 25 units with logo customisation included',
            'GST-compliant invoicing, dedicated account manager per order',
            'Same-day delivery available in Bangalore for in-stock items',
          ]} />
        </div>
      </div>

      {/* ── CHAPTER INDEX ── */}
      <section id="chapters" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">What's in This Guide</div>
          <h2 className="cp-section-title">Handbook Contents</h2>
          <p className="cp-section-sub">
            Jump to any chapter or read from start to finish. Each section links to
            in-depth guides for that topic.
          </p>
          <div className="cp-steps cp-steps--3" style={{ marginTop: '40px' }}>
            {CHAPTERS.map(ch => (
              <a key={ch.num} href={ch.href} className="cp-step" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="cp-step-num cp-step-num--gold">{ch.num}</div>
                <div className="cp-step-title">{ch.title}</div>
                <p className="cp-step-desc">{ch.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>


      {/* ── WHY GIFTING ── */}
      <section id="why-gifting" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Chapter 1</div>
          <h2 className="cp-section-title">Why Corporate Gifting Matters</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginTop: '40px' }}>
            {[
              { icon: '🤝', title: 'Builds Relationships', desc: 'A well-chosen gift creates a positive emotional touchpoint. Recipients associate the feeling of receiving the gift with your brand - for months, not minutes.' },
              { icon: '🏷️', title: 'Keeps Your Brand Visible', desc: 'A branded insulated bottle or notebook sits on a desk or kitchen counter for years. Daily use = daily brand impressions without ongoing ad spend.' },
              { icon: '💼', title: 'Reinforces Culture', desc: 'Onboarding kits and milestone gifts signal that your company invests in its people. This directly impacts engagement, retention, and referral rates.' },
              { icon: '📈', title: 'Measurable ROI', desc: "Client gifting consistently shows 3–5x return in lifetime value when done thoughtfully. It's not a cost centre - it's a relationship investment." },
            ].map(item => (
              <div key={item.title} className="cp-feature-card">
                <div className="cp-feature-card-icon" style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                <div className="cp-feature-card-title">{item.title}</div>
                <p className="cp-feature-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHOOSING GIFTS ── */}
      <section id="choosing-gifts" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Chapter 2</div>
          <h2 className="cp-section-title">How to Choose the Right Corporate Gift</h2>
          <p className="cp-section-sub">
            Three dimensions determine whether a corporate gift lands or gets forgotten.
            See our full <a href="/guides/how-to-choose-corporate-gifts" style={{ color: 'var(--cp-green)', textDecoration: 'underline' }}>guide to choosing corporate gifts</a> for decision frameworks.
          </p>
          <div className="cp-steps cp-steps--3" style={{ marginTop: '40px' }}>
            {[
              { num: '1', title: 'Who is the Recipient?', desc: 'Employee, client, or prospect? Seniority, role, and preferences matter. An engineer and a CFO have different "valuable" thresholds. Junior employees appreciate practical branded items; senior leaders expect curation.' },
              { num: '2', title: 'What is the Occasion?', desc: 'A Diwali gift signals celebration and warmth. An onboarding kit signals investment and belonging. A client gift signals gratitude and partnership. Match the emotional intent of the occasion to your product selection.' },
              { num: '3', title: 'What is the Budget Per Head?', desc: 'Budget guides category, not quality. ₹500 can be poorly spent on cheap plastic, or well spent on a quality ceramic mug with premium packaging. Set a realistic per-unit budget and maximise within it.' },
            ].map(s => (
              <div key={s.num} className="cp-step">
                <div className="cp-step-num cp-step-num--gold">{s.num}</div>
                <div className="cp-step-title">{s.title}</div>
                <p className="cp-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Category guide */}
          <div style={{ marginTop: '48px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', color: 'var(--cp-green)' }}>Browse by Category</h3>
            <div className="cp-related-grid">
              {CATEGORIES.map(cat => (
                <a key={cat.href} href={cat.href} className="cp-related-card">
                  <div className="cp-related-card-label" style={{ fontSize: '24px', marginBottom: '4px' }}>{cat.emoji}</div>
                  <div className="cp-related-card-title">{cat.title}</div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>{cat.desc}</div>
                  <div className="cp-related-card-arrow">→</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80" alt="Corporate gifting handbook and planning guide for Indian businesses" loading="lazy" />
      </figure>

      {/* ── BUDGET PLANNING ── */}
      <section id="budget-planning" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Chapter 3</div>
          <h2 className="cp-section-title">Budget Planning & Pricing</h2>
          <p className="cp-section-sub">
            Corporate gifting budgets vary widely by company size, occasion, and recipient tier.
            Use these ranges as starting points. See our <a href="/guides/corporate-gifting-budget" style={{ color: 'var(--cp-green)', textDecoration: 'underline' }}>budget planning guide</a> for detailed templates.
          </p>
          <div className="cp-budget-grid" style={{ marginTop: '40px' }}>
            {BUDGET_GUIDE.map(b => (
              <a key={b.href} href={b.href} className="cp-budget-card cp-budget-card--mid">
                <div className="cp-budget-label cp-budget-label--light">{b.label}</div>
                <div className="cp-budget-price cp-budget-price--light">{b.range}</div>
                <ul className="cp-budget-items">
                  {b.products.map(p => <li key={p} className="cp-budget-item cp-budget-item--light">{p}</li>)}
                </ul>
                <span className="cp-budget-cta cp-budget-cta--light">See options →</span>
              </a>
            ))}
          </div>

          {/* Comparison table */}
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '48px 0 20px', color: 'var(--cp-green)' }}>Budget by Gift Type</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'var(--cp-green)', color: '#fff' }}>
                  {['Gift Type', 'Budget / Unit', 'Min. Quantity', 'Lead Time', 'Best Products'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr key={row.type} style={{ background: i % 2 === 0 ? '#fff' : 'var(--cp-cream)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{row.type}</td>
                    <td style={{ padding: '12px 16px' }}>{row.budget}</td>
                    <td style={{ padding: '12px 16px' }}>{row.moq}</td>
                    <td style={{ padding: '12px 16px' }}>{row.lead}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CUSTOMISATION ── */}
      <section id="customisation" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Chapter 4</div>
          <h2 className="cp-section-title">Customisation & Branding</h2>
          <p className="cp-section-sub">
            Branded gifts outperform generic ones in recall and sentiment. Over 85% of MintBox products
            support logo customisation. See the full <a href="/customization/personalized-corporate-gifts" style={{ color: 'var(--cp-green)', textDecoration: 'underline' }}>personalised corporate gifts guide</a>.
          </p>
          <div className="cp-occasion-grid" style={{ marginTop: '40px' }}>
            {[
              { icon: '🖨️', title: 'Pad & UV Printing', desc: 'Logo printing on flat surfaces - mugs, bottles, notebooks, tote bags. Most cost-effective for large runs.' },
              { icon: '✂️', title: 'Laser Engraving', desc: 'Premium permanent marking on metal and wood products. No ink to fade - ideal for executive gifts.' },
              { icon: '🧵', title: 'Embroidery', desc: 'Logo stitching on caps, bags, and apparel. High-perceived-value, long-lasting brand placement.' },
              { icon: '📦', title: 'Custom Packaging', desc: 'Branded boxes, tissue paper, ribbon, and inserts. Packaging is the first impression - make it count.' },
            ].map(item => (
              <div key={item.title} className="cp-occasion-card" style={{ minHeight: '160px', cursor: 'default' }}>
                <div className="cp-occasion-card-overlay" />
                <div className="cp-occasion-card-content">
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
                  <div className="cp-occasion-card-title">{item.title}</div>
                  <div className="cp-occasion-card-sub">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BULK ORDERING ── */}
      <section id="bulk-ordering" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Chapter 5</div>
          <h2 className="cp-section-title">Bulk Ordering & Lead Times</h2>
          <p className="cp-section-sub">
            Planning ahead is the single most important factor in a successful corporate gifting programme.
            For Bangalore-based orders, explore our <a href="/bangalore-corporate-gifting/bulk-gifting" style={{ color: 'var(--cp-green)', textDecoration: 'underline' }}>bulk gifting service</a>.
          </p>
          <div className="cp-stats-grid cp-stats-grid--4" style={{ margin: '40px 0' }}>
            {[
              { val: '25', unit: '+', label: 'Minimum units for most products' },
              { val: '7–14', unit: '', label: 'Business days standard lead time' },
              { val: '3–5', unit: 'd', label: 'Rush lead time for in-stock items' },
              { val: '50%', unit: '', label: 'Advance payment, balance before dispatch' },
            ].map(s => (
              <div key={s.label} className="cp-stat-card">
                <div className="cp-stat-value">{s.val}<span className="cp-stat-unit">{s.unit}</span></div>
                <div className="cp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <p style={{ color: '#555', lineHeight: 1.7 }}>
            For large Diwali or year-end campaigns (500+ units), plan 6–8 weeks ahead.
            For ongoing onboarding batches (25–100 units), our standard 7–10 day turnaround works well.
            Same-day delivery is available in Bangalore for select in-stock products - see{' '}
            <a href="/bangalore-corporate-gifting/same-day-delivery" style={{ color: 'var(--cp-green)', textDecoration: 'underline' }}>same-day delivery</a>.
          </p>
        </div>
      </section>

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" alt="Office team planning corporate gifting programme" loading="lazy" />
      </figure>

      {/* ── OCCASIONS ── */}
      <section id="occasions" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Chapter 6</div>
          <h2 className="cp-section-title">Corporate Gifting Calendar: Occasions & Timing</h2>
          <p className="cp-section-sub">
            Every gifting moment has its own expectations and timelines. Plan ahead to avoid
            price spikes and production delays.
          </p>
          <div className="cp-related-grid" style={{ marginTop: '40px' }}>
            {OCCASIONS_GUIDE.map(occ => (
              <a key={occ.href} href={occ.href} className="cp-related-card">
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{occ.emoji}</div>
                <div className="cp-related-card-title">{occ.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>{occ.desc}</div>
                <div className="cp-related-card-arrow">→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Browse the Catalogue</div>
          <h2 className="cp-section-title">Explore Corporate Gifts</h2>
          <p className="cp-section-sub">
            All products are in stock, customisable, and available for bulk orders from 25 units.
            Filter by category or budget to find your perfect gift.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="All Corporate Gifts"
            maxPrice={5000}
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* ── QUOTE PULL ── */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            The right corporate gift says: we thought about you. That's what makes it memorable - not the price.
          </p>
          <cite className="cp-quote-cite">MintBox</cite>
        </div>
      </div>

      {/* ── BANGALORE CTA ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Based in Bangalore?</div>
          <h2 className="cp-section-title">Bangalore Corporate Gifting Services</h2>
          <p className="cp-section-sub">
            MintBox is headquartered in Bangalore. We offer same-day delivery, bulk fulfilment,
            and in-person sampling for Bangalore-based teams.
          </p>
          <div className="cp-related-grid">
            {[
              { label: 'Same-Day', title: 'Same-Day Delivery in Bangalore', href: '/bangalore-corporate-gifting/same-day-delivery' },
              { label: 'Bulk Orders', title: 'Bulk Corporate Gifting', href: '/bangalore-corporate-gifting/bulk-gifting' },
              { label: 'Suppliers', title: 'Corporate Gift Suppliers in Bangalore', href: '/bangalore-corporate-gifting/suppliers' },
              { label: 'All Services', title: 'Bangalore Corporate Gifting Hub', href: '/bangalore-corporate-gifting' },
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

      {/* ── CTA + FORM ── */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-cta-eyebrow">Ready to Gift?</div>
            <h2 className="cp-cta-title">Get a Free Corporate<br />Gifting Quote</h2>
            <p className="cp-cta-desc">
              Share your occasion, quantity, and budget - we'll send a curated recommendation
              with pricing within 4 business hours.
            </p>
            <div className="cp-cta-promises">
              {[
                'Curated product recommendation for your occasion',
                'Bulk pricing from 25 units',
                'Customisation options included',
                'Response within 4 business hours',
              ].map(p => (
                <div key={p} className="cp-cta-promise">
                  <span className="cp-cta-promise-dot" />
                  {p}
                </div>
              ))}
            </div>
          </div>
          <InlineQuoteForm
            title="Get Your Free Quote"
            subtitle="Tell us your occasion and quantity - we'll recommend the perfect gifts with pricing."
            ctaLabel="Get Free Quote"
            interestHint="Occasion, quantity, and budget range"
          />
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* ── FAQ ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <FAQSection
            items={FAQS}
            title="Corporate Gifting - Frequently Asked Questions"
            eyebrow="FAQ"
          />
        </div>
      </section>

      {/* ── EXPLORE MORE ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Continue Reading</div>
          <h2 className="cp-section-title" style={{ marginBottom: '28px' }}>Related Guides</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Budget', title: 'Corporate Gifts Under ₹1,000', href: '/guides/corporate-gifts-under-1000' },
              { label: 'Budget', title: 'Corporate Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
              { label: 'Budget', title: 'Budget Corporate Gifts', href: '/guides/budget-corporate-gifts' },
              { label: 'Etiquette', title: 'Corporate Gifting Etiquette', href: '/guides/corporate-gifting-etiquette' },
              { label: 'Employees', title: 'What to Gift Employees', href: '/guides/what-to-gift-employees' },
              { label: 'Trends', title: 'Corporate Gifting Trends 2026', href: '/guides/corporate-gifting-trends-2026' },
              { label: 'Unique', title: 'Unique Corporate Gift Ideas', href: '/guides/unique-corporate-gifts' },
              { label: 'Sustainable', title: 'Sustainable Corporate Gifts', href: '/guides/sustainable-corporate-gifts' },
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
