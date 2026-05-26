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

interface Props { products: Product[]; categories: Category[] }

const TRENDS_2026 = [
  {
    rank: "01",
    title: "Sustainability as Default",
    desc: "Eco-friendly products are no longer niche - they are expected. Seed kits, bamboo stationery, and recycled packaging are the baseline for ESG-conscious companies in 2026.",
    growth: "↑ 34% YoY demand",
    href: "/collections/eco-friendly-gifts",
  },
  {
    rank: "02",
    title: "Deep Personalisation",
    desc: "Beyond logo printing: name engraving, custom colour matching, employee-specific messaging. Companies investing in individual personalisation see 40% higher satisfaction scores.",
    growth: "↑ 28% YoY demand",
    href: "/customization/personalized-corporate-gifts",
  },
  {
    rank: "03",
    title: "Remote Work Gift Sets",
    desc: "Home office kits (laptop stands, wireless chargers, ergonomic accessories) continue to grow as hybrid and remote work becomes permanent across Indian tech companies.",
    growth: "↑ 22% YoY demand",
    href: "/collections/tech-gifts",
  },
  {
    rank: "04",
    title: "Wellness & Mindfulness Gifting",
    desc: "Herbal teas, aromatherapy kits, journals, and mental health-focused boxes. Corporate wellness budgets increased 18% in 2025 - gifting follows the spend.",
    growth: "↑ 19% YoY demand",
    href: "/collections/hampers",
  },
  {
    rank: "05",
    title: "Premium Drinkware Dominance",
    desc: "Copper bottles, insulated tumblers, and artisan mugs remain the top single-category corporate gift. Drinkware stays on desks for 2–3 years, delivering sustained brand exposure.",
    growth: "Consistent #1 category",
    href: "/collections/drinkware",
  },
  {
    rank: "06",
    title: "Experience Boxes Over Single Items",
    desc: "Curated theme boxes ('Coffee Lover Kit', 'WFH Starter Pack', 'Wellness Box') outperform single items on perceived value and emotional resonance. The unboxing experience matters.",
    growth: "↑ 31% YoY demand",
    href: "/collections/hampers",
  },
]

const WHAT_TO_AVOID_2026 = [
  "Generic plastic items with logo-only branding",
  "Sweets without allergen labelling",
  "Calendar or diary gifts (heavy competition, low differentiation)",
  "Single-use plastic packaging",
  "Late Diwali gifting (after Lakshmi Puja)",
]


const FAQ_ITEMS = [
  { q: "What are the top corporate gifting trends for 2026?", a: "The top trends in 2026 are: sustainability (eco-friendly products are expected), deep personalisation (names + custom messages), remote work gift sets, wellness kits, premium drinkware, and curated experience boxes. Personalised and sustainable gifts consistently earn stronger recipient responses than generic branded merchandise." },
  { q: "Is eco-friendly corporate gifting growing in India?", a: "Yes. Demand for eco-friendly corporate gifts grew 34% YoY in 2025. In 2026, ESG-conscious companies treat sustainability as a baseline - not a differentiator. Seed kits, bamboo products, and recycled packaging are the fastest-growing subcategories." },
  { q: "What corporate gift categories are declining in 2026?", a: "Diaries and calendars (intense competition, low differentiation), generic plastic items with logo-only branding, and single-use packaging are seeing declining satisfaction scores. The market is shifting toward quality, sustainability, and personalisation." },
  { q: "How is the Indian corporate gifting market growing?", a: "The Indian corporate gifting market is estimated at ₹2.3 lakh crore and growing at 12–15% annually. Premium and personalised gifting is outpacing the overall market, with Bangalore, Mumbai, and Delhi NCR as the top three markets." },
  { q: "What is the biggest trend shift in corporate gifting for 2026?", a: "The biggest shift is from transactional gifting (bulk commodity items with logos) to relational gifting (personalised, curated, story-driven gifts). Companies treating gifts as brand touchpoints see measurably stronger client and employee retention." },
]

export default function GiftingTrendsClient({ products, categories }: Props) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Gifting Trends 2026", "item": "https://themintbox.in/guides/corporate-gifting-trends-2026" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Corporate Gifting Trends 2026: What Indian Companies Are Ordering",
        "description": "The top corporate gifting trends for 2026: sustainability, personalisation, tech gifts, and wellness. MintBox insight for Indian HR and procurement teams.",
        "url": "https://themintbox.in/guides/corporate-gifting-trends-2026",
        "dateModified": "2026-05-26T00:00:00+05:30",
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="cp-hero">
          <div className="cp-hero-bg cp-img-green" aria-hidden="true" />
          <div className="cp-container">
            <div className="cp-breadcrumb">
              <a href="/">Home</a> › <a href="/guides/corporate-gifting-handbook">Guides</a> › Gifting Trends 2026
            </div>
            <h1 className="cp-hero-title">Corporate Gifting Trends 2026: What Indian Companies Are Ordering</h1>
            <p className="cp-hero-subtitle">
              Sustainability, deep personalisation, remote work kits, and wellness boxes - the six trends reshaping Indian corporate gifting in 2026.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-btn-primary">Browse Trending Gifts</a>
              <a href="#quote" className="cp-btn-secondary">Get Quote</a>
            </div>
          </div>
        </section>

        {/* AEO Band */}
        <section className="cp-aeo-band">
          <div className="cp-container">
            <QuickAnswerBox
              title="Quick Answer"
              content="The top corporate gifting trends for 2026 are eco-friendly products, deep personalisation, remote work kits, wellness boxes, premium drinkware, and curated experience boxes. Sustainability has become an expectation. Companies shifting to personalised, story-driven gifting see 20–40% higher satisfaction."
            />
            <EATSignal />
          </div>
        </section>


        {/* Stats */}
        <section className="cp-stats-band">
          <div className="cp-container">
            <div className="cp-stats-grid">
              <div className="cp-stat"><span className="cp-stat-num">200+</span><span className="cp-stat-label">Corporate Clients</span></div>
              <div className="cp-stat"><span className="cp-stat-num">50,000+</span><span className="cp-stat-label">Gifts Delivered</span></div>
              <div className="cp-stat"><span className="cp-stat-num">6</span><span className="cp-stat-label">Years Data</span></div>
              <div className="cp-stat"><span className="cp-stat-num">Pan-India</span><span className="cp-stat-label">Delivery</span></div>
            </div>
          </div>
        </section>

        {/* Trends Section */}
        <section className="cp-section">
          <div className="cp-container">
            <h2 className="cp-section-title">6 Corporate Gifting Trends Defining 2026</h2>
            <div className="cp-steps">
              {TRENDS_2026.map((trend, i) => (
                <div key={i} className="cp-step" style={{ alignItems: 'flex-start', gap: '24px' }}>
                  <div
                    style={{
                      fontSize: '48px',
                      fontWeight: 800,
                      color: 'var(--gold)',
                      lineHeight: 1,
                      minWidth: '64px',
                      flexShrink: 0,
                    }}
                  >
                    {trend.rank}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{trend.title}</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>{trend.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          background: 'var(--forest-green)',
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '20px',
                        }}
                      >
                        {trend.growth}
                      </span>
                      <a href={trend.href} style={{ color: 'var(--forest-green)', fontWeight: 600, fontSize: '14px' }}>
                        See Products →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <figure className="cp-editorial-img">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" alt="Team office meeting discussing corporate gifting trends for 2026" loading="lazy" />
        </figure>

        {/* What to Avoid */}
        <section className="cp-section cp-section-alt">
          <div className="cp-container">
            <h2 className="cp-section-title">What to Avoid in 2026</h2>
            <div className="cp-card" style={{ borderTop: '3px solid #c0392b', maxWidth: '640px', margin: '0 auto' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {WHAT_TO_AVOID_2026.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#c0392b', fontWeight: 700, fontSize: '18px', lineHeight: 1.4, flexShrink: 0 }}>✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="cp-section" id="products">
          <div className="cp-container">
            <h2 className="cp-section-title">Shop 2026 Trending Corporate Gifts</h2>
            <p className="cp-section-intro">
              All products align with the sustainability, personalisation, and quality-first trends defining corporate gifting in 2026.
            </p>
          </div>
          <ContentProductShowcase products={products} categories={categories} />
        </section>

        <figure className="cp-editorial-img">
          <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" alt="Modern office workspace reflecting 2026 corporate gifting trends" loading="lazy" />
        </figure>

        {/* Quote Band */}
        <section className="cp-quote-band">
          <div className="cp-container">
            <h2 className="cp-quote-title">Stay Ahead of the Trends</h2>
            <p className="cp-quote-sub">
              Our team curates trend-forward gifting programmes for Indian corporates - sustainable, personalised, and delivered on time.
            </p>
            <a href="#quote" className="cp-btn-primary">Get a Custom Quote</a>
          </div>
        </section>

        {/* Inline Quote Form */}
        <section className="cp-section" id="quote">
          <div className="cp-container">
            <h2 className="cp-section-title">Request 2026-Trend Corporate Gifts</h2>
            <InlineQuoteForm
              title="Tell Us About Your Gifting Programme"
              subtitle="We'll match your budget and brand to the right 2026 gifting trends."
            />
          </div>
        </section>

        <MidPageCTA variant="catalog" />

        {/* FAQ */}
        <FAQSection
          title="Corporate Gifting Trends 2026 - FAQs"
          items={FAQ_ITEMS}
        />

        {/* Related Links */}
        <section className="cp-section">
          <div className="cp-container">
            <h2 className="cp-section-title">Related Guides</h2>
            <div className="cp-related-grid">
              <a href="/guides/corporate-gift-ideas-2026" className="cp-related-card">
                <span className="cp-related-emoji">💡</span>
                <span className="cp-related-title">Corporate Gift Ideas 2026</span>
              </a>
              <a href="/guides/unique-corporate-gifts" className="cp-related-card">
                <span className="cp-related-emoji">✨</span>
                <span className="cp-related-title">Unique Corporate Gifts</span>
              </a>
              <a href="/guides/corporate-gifts-for-clients" className="cp-related-card">
                <span className="cp-related-emoji">🤝</span>
                <span className="cp-related-title">Corporate Gifts for Clients</span>
              </a>
              <a href="/collections/eco-friendly-gifts" className="cp-related-card">
                <span className="cp-related-emoji">🌱</span>
                <span className="cp-related-title">Eco-Friendly Gifts</span>
              </a>
            </div>
          </div>
        </section>

        <LastUpdatedDate date="2026-05-25" />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
