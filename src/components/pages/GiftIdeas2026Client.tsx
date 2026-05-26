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

interface Props {
  products: Product[]
  categories: Category[]
}

const TREND_CARDS = [
  { icon: "🌱", title: "Eco-Friendly Gifting", desc: "Seed kits, bamboo products, recycled stationery. Employees and clients notice when brands walk the talk on sustainability.", href: "/collections/eco-friendly-gifts" },
  { icon: "💻", title: "Productivity Tech Gifts", desc: "Wireless chargers, cable organisers, laptop stands, and noise-cancelling earbuds. Remote-first culture drives demand for home office gear.", href: "/collections/tech-gifts" },
  { icon: "🧘", title: "Wellness & Self-Care Kits", desc: "Herbal teas, aromatherapy sets, journals, and mindfulness accessories. Corporate wellness budgets are growing in 2026.", href: "/collections/hampers" },
  { icon: "🎨", title: "Deep Personalisation", desc: "Beyond logo printing - name-engraved items, custom colour variants, handwritten notes. Personalisation is the top factor in gift satisfaction scores.", href: "/customization/personalized-corporate-gifts" },
  { icon: "🍵", title: "Premium Drinkware", desc: "Copper bottles, insulated tumblers, artisan mugs. Drinkware with quality branding stays on desks for years - maximum brand visibility.", href: "/collections/drinkware" },
  { icon: "📦", title: "Curated Hampers", desc: "Thoughtfully assembled gift boxes combining 3–5 items. Hampers outperform single-item gifts on emotional impact and perceived value.", href: "/collections/hampers" },
]

const BUDGET_IDEAS = [
  { range: "Under ₹500", ideas: "Branded stationery set, seed kit, desk plant, mugs", link: "/guides/corporate-gifts-under-500" },
  { range: "₹500–₹1,000", ideas: "Drinkware + notebook combo, care kit, wellness hamper", link: "/guides/corporate-gifts-under-1000" },
  { range: "₹1,000–₹2,500", ideas: "Premium hamper, copper bottle, personalised leather notebook", link: "/guides/budget-corporate-gifts" },
  { range: "₹2,500–₹5,000", ideas: "Luxury hamper, tech + drinkware bundle, customised gift set", link: "/collections/corporate-gifts" },
  { range: "₹5,000+", ideas: "Premium customised box, high-end tech, artisan collections", link: "/collections/corporate-gifts" },
]


const FAQ_ITEMS = [
  { q: "What are the best corporate gift ideas for 2026?", a: "The top trends for 2026 are eco-friendly gifts, tech accessories, wellness kits, and personalised items. Hampers combining 3–5 thoughtfully curated items outperform single-item gifts on satisfaction. Budget sweet spot: ₹800–₹2,000 per person." },
  { q: "What corporate gifts are trending in India in 2026?", a: "Eco-friendly products (seed kits, bamboo), premium drinkware (copper bottles, insulated tumblers), and home office accessories (wireless chargers, laptop stands) are the top trends. Wellness kits are growing fast as corporate wellbeing programs expand." },
  { q: "What is a good corporate gift for clients in 2026?", a: "For clients, premium hampers (₹2,000–₹5,000) with branded drinkware, artisan sweets, and a personalised note perform best. For high-value clients, engraved copper sets or luxury gift boxes with name personalisation make a lasting impression." },
  { q: "How much should companies spend on corporate gifts in 2026?", a: "For employees, ₹500–₹2,000 is standard. For key clients, ₹2,000–₹5,000. For C-suite gifting, ₹5,000+. Trends show companies are spending 15–20% more in 2026 vs 2024, with a shift toward quality over quantity." },
  { q: "When should I order 2026 Diwali corporate gifts?", a: "Order by end of September 2026 to ensure production capacity. For large orders (500+ units), August is safer. MintBox maintains dedicated capacity for repeat clients - set up a standing order to guarantee allocation." },
]

export default function GiftIdeas2026Client({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Corporate Gift Ideas 2026", "item": "https://themintbox.in/guides/corporate-gift-ideas-2026" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Corporate Gift Ideas 2026: Trends, Budgets & Top Picks",
        "description": "Top corporate gift ideas for 2026: eco-friendly, tech, wellness, and personalised gifting trends. Curated for Indian businesses. Bulk from 25 units.",
        "url": "https://themintbox.in/guides/corporate-gift-ideas-2026",
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
              <span className="cp-breadcrumb-current">Corporate Gift Ideas 2026</span>
            </nav>
            <div className="cp-hero-eyebrow">Gifting Guide · 2026</div>
            <h1 className="cp-hero-title">
              Corporate Gift Ideas 2026:<br />
              <em>Trends, Budgets &amp; Top Picks</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              The definitive guide to corporate gifting in 2026 - eco-friendly, tech, wellness, and
              personalised gifting trends curated for Indian businesses. Budget ₹500–₹5,000.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-hero-cta-primary">Browse Products ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 200+ Clients</span>
              <span className="cp-hero-badge">✓ 50,000+ Gifts</span>
              <span className="cp-hero-badge">✓ Pan-India Delivery</span>
              <span className="cp-hero-badge">✓ GST Invoicing</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80" alt="Corporate gift packages ready for delivery" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" alt="Green sustainable corporate gifting" className="cp-hero-img-actual" loading="lazy" />
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
            content="The top corporate gifting trends in 2026 are eco-friendly products, productivity tech accessories, wellness kits, and premium personalised items. Budget sweet spot: ₹800–₹2,000 for employees, ₹2,000–₹5,000 for clients."
          />
          <EATSignal credentials={[
            '200+ corporate clients served',
            '50,000+ gifts delivered pan-India',
            '6+ years of corporate gifting expertise',
            'Eco-friendly, tech, wellness, and personalised options',
            'Same-day sampling available in Bangalore',
          ]} />
        </div>
      </div>

      {/* 3. STATS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">200+</div>
              <div className="cp-stat-label">clients served</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">50,000+</div>
              <div className="cp-stat-label">gifts delivered</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">6+<span className="cp-stat-unit"> yrs</span></div>
              <div className="cp-stat-label">in corporate gifting</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Pan-India</div>
              <div className="cp-stat-label">delivery coverage</div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. 2026 TRENDS */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">2026 Gifting Trends</div>
          <h2 className="cp-section-title">Top Corporate Gifting Trends for 2026</h2>
          <p className="cp-section-sub">
            Six major trends are reshaping corporate gifting in India in 2026.
            Here is what forward-thinking companies are choosing.
          </p>
          <div className="cp-card-grid cp-card-grid--3">
            {TREND_CARDS.map(card => (
              <div key={card.title} className="cp-card">
                <div className="cp-card-icon">{card.icon}</div>
                <div className="cp-card-title">{card.title}</div>
                <p className="cp-card-desc">{card.desc}</p>
                <a href={card.href} className="cp-card-link">Explore →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BUDGET IDEAS TABLE */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <figure className="cp-editorial-img">
            <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1200&q=80" alt="Corporate gift packages curated for 2026" loading="lazy" />
          </figure>
          <div className="cp-section-eyebrow">Budget Guide</div>
          <h2 className="cp-section-title">Corporate Gift Ideas by Budget</h2>
          <p className="cp-section-sub">
            Find the right gift for your per-head spend. All options include logo branding and packaging.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Budget Range</th>
                  <th>Gift Ideas</th>
                  <th>See Gifts</th>
                </tr>
              </thead>
              <tbody>
                {BUDGET_IDEAS.map(row => (
                  <tr key={row.range}>
                    <td style={{ fontWeight: 600, color: 'var(--forest-green,#1B4D3E)' }}>{row.range}</td>
                    <td style={{ fontWeight: 300 }}>{row.ideas}</td>
                    <td>
                      <a href={row.link} className="cp-table-link">See Gifts →</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Product Catalogue</div>
          <h2 className="cp-section-title">Browse Corporate Gift Products</h2>
          <p className="cp-section-sub">
            Filter by budget and category to find the right gift for your team or clients.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Corporate Gift Products 2026"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      <figure className="cp-editorial-img" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Modern office workspace - where corporate gifting decisions are made" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band cp-quote-band--green">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            In 2026, the best corporate gifts are those that reflect your brand values -
            sustainable, thoughtful, and personalised. Generic gifts are forgettable.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Get Started</div>
            <h2 className="cp-cta-title">Plan Your 2026<br />Corporate Gifting</h2>
            <p className="cp-cta-sub">
              Share your headcount, budget per head, and delivery timeline - we will
              respond with a curated proposal within 4 hours.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a 2026 Gifting Quote"
              ctaLabel="Get Quote"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="catalog" />

      {/* 9. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Corporate Gift Ideas 2026 - Frequently Asked Questions"
          />
        </div>
      </section>

      {/* 10. RELATED LINKS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title">Related Guides</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Trends', title: 'Corporate Gifting Trends 2026', href: '/guides/corporate-gifting-trends-2026' },
              { label: 'Ideas', title: 'Unique Corporate Gifts', href: '/guides/unique-corporate-gifts' },
              { label: 'Clients', title: 'Corporate Gifts for Clients', href: '/guides/corporate-gifts-for-clients' },
              { label: 'Seasonal', title: 'Diwali Corporate Gifts', href: '/guides/diwali-corporate-gifts' },
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
