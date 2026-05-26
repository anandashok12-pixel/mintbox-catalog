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

const GIFT_TIERS = [
  {
    tier: "Standard Client Gift",
    range: "₹1,000–2,000",
    occasions: "Diwali, New Year, project completion",
    examples: "Premium drinkware, branded notebook + pen set, dry fruit hamper",
    featured: false,
  },
  {
    tier: "Premium Client Gift",
    range: "₹2,000–5,000",
    occasions: "Key account appreciation, contract renewal, festive gifts",
    examples: "Curated hamper (3–5 items), copper gift set, luxury care box",
    featured: true,
  },
  {
    tier: "Luxury Client Gift",
    range: "₹5,000–10,000+",
    occasions: "Annual appreciation, strategic partner gifts",
    examples: "Artisan premium box, engraved sets, high-end tech + gourmet hamper",
    featured: false,
  },
]

const WHAT_CLIENTS_NOTICE = [
  { icon: "🎁", title: "Packaging Quality", desc: "Clients see the box before the gift. A premium rigid box with tissue and ribbon signals that you value the relationship." },
  { icon: "✍️", title: "Personalised Note", desc: "A hand-written or printed note from the account manager or CEO is the single highest-impact element - more than the gift itself." },
  { icon: "🏷️", title: "Brand Coherence", desc: "Your gift should feel like it comes from your brand. Colour palette, tone, and materials should reflect your company identity." },
  { icon: "⏱️", title: "Timing", desc: "Early Diwali gifting (before Dhanteras) signals premium positioning. Late gifts feel like afterthoughts." },
  { icon: "🌏", title: "Cultural Sensitivity", desc: "Avoid alcohol, leather, and food with undisclosed ingredients. When in doubt, go with drinkware, stationery, or hampers with labelled contents." },
]

const CLIENT_GIFT_IDEAS = [
  { name: "Premium Hamper Box", desc: "Dry fruits, artisan sweets, copper bottle or mug, all in a rigid branded box.", price: "₹2,000–4,000", href: "/collections/hampers" },
  { name: "Copper Gift Set", desc: "Copper water bottle with engraved logo + copper tumbler + box packaging.", price: "₹1,500–3,000", href: "/collections/drinkware" },
  { name: "Luxury Stationery Set", desc: "Premium hardbound notebook + brass pen + leather card holder + branded box.", price: "₹1,500–3,000", href: "/collections/stationery" },
  { name: "Tech Appreciation Kit", desc: "Wireless charger + laptop stand + cable organiser in branded packaging.", price: "₹2,500–4,500", href: "/collections/tech-gifts" },
  { name: "Artisan Tea Collection", desc: "Curated loose-leaf teas + ceramic mug + honey + branded tray in gift box.", price: "₹1,200–2,500", href: "/collections/hampers" },
]


const FAQ_ITEMS = [
  { q: "What are the best corporate gifts for clients in India?", a: "Premium hampers, copper gift sets, luxury stationery, and curated tech kits perform best for clients. At ₹2,000–5,000, include a personalised note and premium packaging. Timing matters - Diwali gifts should arrive before Dhanteras." },
  { q: "How much should I spend on client corporate gifts?", a: "For standard client appreciation, ₹1,000–2,000 is appropriate. For key accounts or strategic partners, ₹2,000–5,000. For top-tier relationships, ₹5,000–10,000+. Invest 20–30% of the budget in packaging." },
  { q: "Should client gifts be personalised?", a: "Absolutely. A personalised note from the account manager or CEO is the highest-impact element in a client gift - more than the item itself. Name engraving or brand-matched colours further elevate the experience." },
  { q: "Are corporate gifts for clients tax-deductible?", a: "Client gifts can be claimed as a business expense under marketing or client entertainment. Gifts above ₹5,000 per client per year may attract fringe benefit considerations. Always consult your CA and use GST-compliant invoices from your vendor." },
  { q: "When should client corporate gifts be sent?", a: "Diwali (early, before Dhanteras), New Year (December 25–January 5), and at key milestones (contract renewal, project completion) are the strongest moments. Avoid generic calendar events - tie the gift to a genuine relationship moment." },
]

export default function ClientGiftsClient({ products, categories }: Props) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Corporate Gifts for Clients", "item": "https://themintbox.in/guides/corporate-gifts-for-clients" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Corporate Gifts for Clients: Premium Ideas That Build Relationships",
        "description": "Impress clients with premium corporate gifts. Personalised, branded, and GST-compliant gifting from MintBox - hampers, drinkware, and custom sets.",
        "url": "https://themintbox.in/guides/corporate-gifts-for-clients",
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
              <a href="/">Home</a> › <a href="/guides/corporate-gifting-handbook">Guides</a> › Corporate Gifts for Clients
            </div>
            <h1 className="cp-hero-title">Corporate Gifts for Clients: Premium Ideas That Build Relationships</h1>
            <p className="cp-hero-subtitle">
              Impress your most important clients with premium, personalised, and GST-compliant gifts - delivered on time across India.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-btn-primary">Browse Gifts</a>
              <a href="#quote" className="cp-btn-secondary">Get Quote</a>
            </div>
          </div>
        </section>

        {/* AEO Band */}
        <section className="cp-aeo-band">
          <div className="cp-container">
            <QuickAnswerBox
              title="Quick Answer"
              content="The best corporate gifts for clients are premium hampers, copper gift sets, and curated experience boxes - personalised with a note and delivered in quality packaging. Budget ₹2,000–5,000 for key accounts. Always include a personalised note - it has more impact than the gift itself."
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
              <div className="cp-stat"><span className="cp-stat-num">6+</span><span className="cp-stat-label">Years Experience</span></div>
              <div className="cp-stat"><span className="cp-stat-num">100%</span><span className="cp-stat-label">GST Compliant</span></div>
            </div>
          </div>
        </section>


        {/* Gift Tiers */}
        <section className="cp-section">
          <div className="cp-container">
            <h2 className="cp-section-title">Client Gift Tiers by Budget</h2>
            <div className="cp-cards-grid">
              {GIFT_TIERS.map((tier, i) => (
                <div
                  key={i}
                  className="cp-card"
                  style={tier.featured ? { borderTop: '3px solid var(--gold)', background: 'var(--cream-light)' } : { borderTop: '3px solid var(--forest-green)' }}
                >
                  {tier.featured && (
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                      Most Popular
                    </div>
                  )}
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{tier.tier}</h3>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--forest-green)', marginBottom: '12px' }}>{tier.range}</div>
                  <p style={{ marginBottom: '8px' }}><strong>Occasions:</strong> {tier.occasions}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}><strong>Examples:</strong> {tier.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Clients Notice */}
        <section className="cp-section cp-section-alt">
          <div className="cp-container">
            <h2 className="cp-section-title">What Clients Actually Notice About Corporate Gifts</h2>
            <div className="cp-cards-grid">
              {WHAT_CLIENTS_NOTICE.map((item, i) => (
                <div key={i} className="cp-card">
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Gift Ideas Table */}
        <section className="cp-section">
          <div className="cp-container">
            <figure className="cp-editorial-img">
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80" alt="Premium corporate gift selection for client relationships" loading="lazy" />
            </figure>
            <h2 className="cp-section-title">Top Corporate Gift Ideas for Clients</h2>
            <div className="cp-table-wrap">
              <table className="cp-table">
                <thead>
                  <tr>
                    <th>Gift</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {CLIENT_GIFT_IDEAS.map((idea, i) => (
                    <tr key={i}>
                      <td><strong>{idea.name}</strong></td>
                      <td>{idea.desc}</td>
                      <td>{idea.price}</td>
                      <td><a href={idea.href} style={{ color: 'var(--forest-green)', fontWeight: 600 }}>View →</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="cp-section cp-section-alt" id="products">
          <div className="cp-container">
            <h2 className="cp-section-title">Browse Client Gift Products</h2>
            <p className="cp-section-intro">
              Every MintBox product is customisable, GST-compliant, and available with premium branded packaging - ideal for client gifting.
            </p>
          </div>
          <ContentProductShowcase products={products} categories={categories} />
        </section>

        {/* Quote Band */}
        <section className="cp-quote-band">
          <div className="cp-container">
            <h2 className="cp-quote-title">Ready to Gift Your Clients?</h2>
            <p className="cp-quote-sub">
              Share your requirements and we will curate the right gift at the right budget - with GST invoice and on-time delivery guaranteed.
            </p>
            <a href="#quote" className="cp-btn-primary">Get a Custom Quote</a>
          </div>
        </section>

        {/* Inline Quote Form */}
        <section className="cp-section" id="quote">
          <div className="cp-container">
            <h2 className="cp-section-title">Request Client Corporate Gifts</h2>
            <InlineQuoteForm
              title="Tell Us About Your Client Gifting Need"
              subtitle="We'll recommend the right gifts for your client relationships and budget."
            />
          </div>
        </section>

        <MidPageCTA variant="quote" />

        {/* FAQ */}
        <FAQSection
          title="Corporate Gifts for Clients - FAQs"
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
              <a href="/guides/corporate-gifting-etiquette" className="cp-related-card">
                <span className="cp-related-emoji">📋</span>
                <span className="cp-related-title">Corporate Gifting Etiquette</span>
              </a>
              <a href="/collections/hampers" className="cp-related-card">
                <span className="cp-related-emoji">🎁</span>
                <span className="cp-related-title">Hampers Collection</span>
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
