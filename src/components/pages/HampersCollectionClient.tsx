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

const HAMPER_THEMES = [
  {
    emoji: '🎉',
    title: 'Onboarding Welcome Kit',
    desc: 'Notebook + bottle + tee + welcome card - a memorable day-one experience.',
    price: '₹1,000–₹2,500',
    bg: 'cp-img-green',
  },
  {
    emoji: '🪔',
    title: 'Diwali Celebration',
    desc: 'Drinkware + sweets + dry fruits + candle in festive packaging.',
    price: '₹1,200–₹3,000',
    bg: 'cp-img-gold',
  },
  {
    emoji: '🤝',
    title: 'Client Appreciation',
    desc: 'Premium bottle + notebook + gourmet snacks for key accounts.',
    price: '₹1,500–₹5,000',
    bg: 'cp-img-warm',
  },
  {
    emoji: '🏆',
    title: 'Work Anniversary',
    desc: 'Engraved bottle or pen + planner + personal note card.',
    price: '₹800–₹2,000',
    bg: 'cp-img-mid',
  },
  {
    emoji: '🌿',
    title: 'Team Wellness',
    desc: 'Herbal teas + bottle + stress kit + journal - for a healthier team.',
    price: '₹1,000–₹2,500',
    bg: 'cp-img-green',
  },
  {
    emoji: '♻️',
    title: 'Eco-Conscious Set',
    desc: 'Bamboo pen + seed notebook + jute bag + plant kit - for purpose-led brands.',
    price: '₹800–₹1,800',
    bg: 'cp-img-warm',
  },
]

const OCCASIONS_TABLE = [
  { occasion: 'Diwali', recommended: 'Drinkware + sweets + gift box', budget: '₹1,000–₹3,000', moq: '25' },
  { occasion: 'Onboarding', recommended: '4–5 item welcome kit', budget: '₹1,000–₹2,500', moq: '10' },
  { occasion: 'Client Appreciation', recommended: 'Premium 3-item set', budget: '₹1,500–₹5,000', moq: '1' },
  { occasion: 'Work Anniversary', recommended: 'Personalised 3-item set', budget: '₹800–₹2,000', moq: '1' },
  { occasion: 'Conference VIP', recommended: 'Tech + drinkware + note', budget: '₹1,500–₹3,000', moq: '10' },
  { occasion: 'Year-End Team', recommended: 'Swag box + treats', budget: '₹800–₹2,000', moq: '10' },
  { occasion: 'Investor / Board', recommended: 'Luxury curated set', budget: '₹3,000–₹10,000', moq: '1' },
]

const BULK_TIERS = [
  { range: '25–49 units', discount: 'Base price', tag: '', highlighted: false },
  { range: '50–99 units', discount: '8–10% off', tag: '', highlighted: false },
  { range: '100–249 units', discount: '15–20% off', tag: 'Most Popular', highlighted: true },
  { range: '250+ units', discount: '25–35% off', tag: '', highlighted: false },
]

const FAQ_ITEMS = [
  {
    q: "What's included in a typical corporate gift hamper?",
    a: 'A standard hamper includes 3–5 items (1 drinkware piece, 1 stationery item, 1 snack or treat, and packaging with a branded note card). The exact contents depend on the occasion and budget. All items can carry your logo; packaging includes your brand colours and message.',
  },
  {
    q: 'Can I customise the items inside the hamper?',
    a: 'Yes, fully. Choose from our curated themes or build your own from 200+ products. Specify quantities per item, preferred colours, logo placement, and packaging style. A design mockup is provided before production.',
  },
  {
    q: 'Are single hampers available (not just bulk)?',
    a: 'Yes. For VIP clients, senior leaders, or board members, single hampers are available with premium same-day delivery in Bangalore. Single hampers use pre-assembled themes with minor customisation - full custom requires 10+ units.',
  },
  {
    q: 'What packaging options are available?',
    a: 'Standard hampers come in kraft paper boxes with tissue paper and ribbon. Premium options include rigid magnetic-closure gift boxes (+₹80–₹200), branded wooden crates (+₹200–₹500), and custom-printed wrap (+₹30–₹60). Premium packaging significantly elevates the unboxing experience.',
  },
  {
    q: 'How far in advance should I order Diwali hampers?',
    a: 'Order at least 3–4 weeks before Diwali (target: early-to-mid October for a November Diwali). During Diwali, production slots fill up by late October. For 200+ hampers, we recommend placing orders by September 30.',
  },
  {
    q: 'Can hampers be delivered to individual employee addresses?',
    a: "Yes. Provide a spreadsheet of names and addresses and we will ship individually packed, personalised hampers with each recipient's name on the note card. Individual delivery rates vary by city - typically ₹80–₹150 per hamper outside Bangalore.",
  },
]

const RELATED = [
  { href: '/collections/corporate-gifts', label: 'All Collections' },
  { href: '/collections/drinkware', label: 'Drinkware' },
  { href: '/guides/diwali-corporate-gifts', label: 'Diwali Gifts' },
  { href: '/collections/eco-friendly-gifts', label: 'Eco-Friendly' },
  { href: '/customization/personalized-corporate-gifts', label: 'Personalised' },
  { href: '/collections/employee-welcome-kit', label: 'Welcome Kit' },
  { href: '/guides/diwali-corporate-gifts', label: 'Diwali' },
]


export default function HampersCollectionClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Collections", "item": "https://themintbox.in/collections/corporate-gifts" },
          { "@type": "ListItem", "position": 3, "name": "Gift Hampers", "item": "https://themintbox.in/collections/hampers" },
        ]
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
              <a href="/collections/corporate-gifts">Collections</a>
              <span className="cp-breadcrumb-sep">›</span>
              <span className="cp-breadcrumb-current">Gift Hampers</span>
            </nav>
            <div className="cp-hero-eyebrow">Category · Gift Hampers</div>
            <h1 className="cp-hero-title">
              Corporate Gift Hampers:<br />
              <em>Curated Sets for Every Occasion</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Curated corporate gift hampers for Diwali, employee onboarding, client appreciation,
              and recognition. Each hamper is thoughtfully assembled, branded, and delivered with
              premium packaging across India.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-hero-cta-primary">Browse Hampers ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Curate a Hamper</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 30+ curated hamper sets</span>
              <span className="cp-hero-badge">✓ Custom branding on every item</span>
              <span className="cp-hero-badge">✓ Premium packaging included</span>
              <span className="cp-hero-badge">✓ Pan-India delivery</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80" alt="Corporate gift packages ready for delivery" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80" alt="Bulk corporate gift boxes and hampers" className="cp-hero-img-actual" loading="lazy" />
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
            content="Corporate gift hampers are curated sets of 3–6 branded items in premium packaging - typically combining drinkware, stationery, snacks, and a personalised note. Popular for Diwali (₹800–₹3,000), onboarding (₹1,000–₹2,500), and client appreciation (₹1,500–₹5,000). MOQ is 25 units; single hampers available for VIP gifting."
          />
          <EATSignal credentials={[
            '30+ curated hamper themes',
            'Premium packaging included in every hamper',
            'Branding on all items, not just the box',
            'MOQ 25 units, single pieces available for VIPs',
            'Pan-India delivery with tracking',
          ]} />
        </div>
      </div>


      {/* 3. STATS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">30<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Curated hamper themes</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">3–6</div>
              <div className="cp-stat-label">Items per hamper</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹800<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Starting price per hamper</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Pan-India</div>
              <div className="cp-stat-label">Delivery with tracking</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT SHOWCASE */}
      <section className="cp-section cp-section--cream" id="products">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Browse</div>
          <h2 className="cp-section-title">Browse Hamper Products</h2>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Hampers Collection"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* 5. HAMPER THEMES */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Curated Themes</div>
          <h2 className="cp-section-title">Curated Hamper Themes by Occasion</h2>
          <p className="cp-section-sub">
            Start with a curated theme or build your own. Every hamper includes branding on all items and premium packaging.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {HAMPER_THEMES.map(theme => (
              <div key={theme.title} className="cp-card">
                <div className={`cp-img-placeholder ${theme.bg}`} style={{ height: '80px', borderRadius: '10px', marginBottom: '16px', fontSize: '32px' }}>
                  {theme.emoji}
                </div>
                <div className="cp-card-title">{theme.title}</div>
                <p className="cp-card-desc">{theme.desc}</p>
                <span className="cp-card-tag">{theme.price}</span>
              </div>
            ))}
          </div>
          <figure className="cp-editorial-img">
            <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80" alt="Curated corporate gift hamper with premium packaging and branded items" loading="lazy" />
          </figure>
        </div>
      </section>

      {/* 6. OCCASIONS TABLE */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Use Cases</div>
          <h2 className="cp-section-title">Hampers for Every Corporate Occasion</h2>
          <p className="cp-section-sub">
            Match the right hamper to the moment. Budget and MOQ shown are per-hamper estimates for reference.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Occasion</th>
                  <th>Recommended</th>
                  <th>Budget</th>
                  <th>MOQ</th>
                </tr>
              </thead>
              <tbody>
                {OCCASIONS_TABLE.map(row => (
                  <tr key={row.occasion}>
                    <td>{row.occasion}</td>
                    <td>{row.recommended}</td>
                    <td>{row.budget}</td>
                    <td>{row.moq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. QUOTE PULL BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            The hamper is the unboxing experience. When the recipient opens it, that first impression - the packaging, the items, the note - is your brand speaking directly to them.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Philosophy</cite>
        </div>
      </div>

      {/* 8. BULK PRICING TIERS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Volume Pricing</div>
          <h2 className="cp-section-title">Bulk Pricing Tiers</h2>
          <p className="cp-section-sub">
            The more hampers you order, the better the per-unit price. Packaging and branding are included in all tiers.
          </p>
          <div className="cp-budget-grid">
            {BULK_TIERS.map(tier => (
              <div
                key={tier.range}
                className={`cp-budget-card ${tier.highlighted ? 'cp-budget-card--mid' : 'cp-budget-card--subtle'}`}
              >
                {tier.tag && (
                  <div className={`cp-budget-label ${tier.highlighted ? 'cp-budget-label--light' : 'cp-budget-label--dark'}`}>
                    {tier.tag}
                  </div>
                )}
                <div className={`cp-budget-price ${tier.highlighted ? 'cp-budget-price--light' : 'cp-budget-price--dark'}`}>
                  {tier.range}
                </div>
                <div className={`cp-budget-item ${tier.highlighted ? 'cp-budget-item--light' : 'cp-budget-item--dark'}`} style={{ fontWeight: 600, fontSize: '18px', marginTop: '8px' }}>
                  {tier.discount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA + FORM */}
      <section className="cp-cta-section" id="quote">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Get a Quote</div>
            <h2 className="cp-cta-title">Ready to Curate<br />Your Corporate Hamper?</h2>
            <p className="cp-cta-sub">
              Tell us your occasion, quantity, and budget - we will come back with a curated hamper proposal and mockup within 4 hours.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Curate Your Hamper"
              ctaLabel="Request Hamper Quote"
              defaultOccasion="diwali"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="catalog" />

      {/* 10. FAQ */}
      <section className="cp-section cp-section--white">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Corporate Gift Hampers - Frequently Asked Questions"
          />
        </div>
      </section>

      {/* 11. RELATED LINKS */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title">Related Collections</h2>
          <div className="cp-related-grid">
            {RELATED.map(r => (
              <a key={r.href} href={r.href} className="cp-related-card">
                {r.label}
                <span className="cp-related-card-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 12. LAST UPDATED */}
      <div className="cp-container--narrow" style={{ padding: '0 24px' }}>
        <LastUpdatedDate date="2026-05-25" />
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
