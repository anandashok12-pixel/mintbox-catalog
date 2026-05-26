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

const DOS_DONTS = [
  { type: 'do', item: "Time gifts around major festivals: Diwali, Holi, Dussehra, Christmas" },
  { type: 'do', item: "Keep budgets consistent across the same level - inequity causes resentment" },
  { type: 'do', item: "Add a personalised note or name on packaging - it costs almost nothing" },
  { type: 'do', item: "Choose GST-compliant gifts with proper invoicing for corporate compliance" },
  { type: 'do', item: "Wrap thoughtfully - presentation signals how much you value the recipient" },
  { type: "don't", item: "Avoid alcohol for all-staff gifts (dietary and religious restrictions)" },
  { type: "don't", item: "Don't send cash equivalents - gift cards are acceptable, cash is not" },
  { type: "don't", item: "Avoid overly personal items (perfume, clothing) for professional relationships" },
  { type: "don't", item: "Don't gift leather to recipients who may object on religious grounds" },
  { type: "don't", item: "Never send gifts without verifying your company's anti-bribery policy first" },
]

const BUDGET_TIERS = [
  { range: "₹200–₹500", label: "All-Staff / Large Teams", example: "Branded stationery, desk accessories, mugs" },
  { range: "₹500–₹1,500", label: "Mid-Level Professionals", example: "Hampers, premium drinkware, care kits" },
  { range: "₹1,500–₹5,000", label: "Senior Management / Clients", example: "Luxury sets, copper items, curated hampers" },
  { range: "₹5,000+", label: "C-Suite / Key Partners", example: "Custom luxury items, branded experience boxes" },
]

const TIMING_CALENDAR = [
  { month: "August–September", event: "Onam, Early Diwali prep", note: "Order early - October slots fill fast" },
  { month: "October–November", event: "Diwali (peak season)", note: "Most popular gifting window. Book 6–8 weeks ahead." },
  { month: "December", event: "Christmas & Year-End", note: "Second highest demand. Good for client appreciation." },
  { month: "January–February", event: "Republic Day, Pongal, New Year", note: "Lower demand - good for work anniversaries" },
  { month: "March", event: "Holi", note: "Colourful, festive theme gifts - sweets and hampers" },
  { month: "Year-Round", event: "Onboarding, Birthdays, Promotions", note: "Personalise - name, role, department" },
]

const FAQ_ITEMS = [
  {
    q: "What is the right budget for corporate gifts in India?",
    a: "For all-staff Diwali gifts, ₹500–₹1,500 per person is the most common range. For key clients or senior leadership, ₹2,000–₹5,000 is appropriate. Always keep budgets consistent within the same employee level.",
  },
  {
    q: "Can we gift alcohol as a corporate gift?",
    a: "It is advisable to avoid alcohol for all-staff gifts due to religious and dietary restrictions. For C-suite or specific client gifts where preferences are known, premium non-alcoholic alternatives like artisan hampers are a safer choice.",
  },
  {
    q: "When should corporate gifts be given?",
    a: "The main gifting occasions in India are Diwali (October–November), Holi (March), Christmas (December), and Republic Day (January). Work anniversaries, onboarding, and promotions are also strong gifting moments year-round.",
  },
  {
    q: "Should corporate gifts be personalised?",
    a: "Yes - even minimal personalisation (a name printed on packaging, a handwritten note, or a branded message card) dramatically improves how the gift is received. Personalisation signals intent and care, not just transaction.",
  },
  {
    q: "Are there any GST rules for corporate gifting?",
    a: "Gifts up to ₹50,000 per employee per year are exempt from GST perquisite treatment. Gifts above this value may be treated as a taxable benefit. Always get GST-compliant invoices from your vendor - MintBox provides these automatically.",
  },
]


export default function EtiquetteGuideClient({ products, categories }: Props) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Etiquette", "item": "https://themintbox.in/guides/corporate-gifting-etiquette" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Corporate Gifting Etiquette in India: The Complete Guide",
        "description": "Learn corporate gifting etiquette for India: timing, budgets, personalisation, cultural dos and don'ts. A practical guide for HR, admin, and procurement teams.",
        "url": "https://themintbox.in/guides/corporate-gifting-etiquette",
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
              <a href="/">Home</a> › <a href="/guides/corporate-gifting-handbook">Guides</a> › Etiquette
            </div>
            <h1 className="cp-hero-title">Corporate Gifting Etiquette in India: The Complete Guide</h1>
            <p className="cp-hero-subtitle">
              Timing, budgets, cultural dos and don'ts - everything HR and admin teams need to gift with confidence.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-btn-primary">Browse Recommended Gifts</a>
              <a href="#quote" className="cp-btn-secondary">Request a Quote</a>
            </div>
          </div>
        </section>

        {/* AEO Band */}
        <section className="cp-aeo-band">
          <div className="cp-container">
            <QuickAnswerBox
              title="Quick Answer"
              content="Corporate gifting etiquette in India means gifting during festivals (Diwali, Holi), keeping budgets transparent and equitable, personalising when possible, and avoiding culturally sensitive items. Wrap beautifully - presentation signals respect."
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

        {/* Dos and Don'ts */}
        <section className="cp-section">
          <div className="cp-container">
            <h2 className="cp-section-title">Corporate Gifting Dos and Don'ts in India</h2>
            <p className="cp-section-intro">
              India's corporate culture blends Western business norms with deep festival traditions and religious sensitivities.
              Getting this balance right is what separates a gift that builds relationships from one that creates awkwardness.
            </p>
            <div className="cp-two-col">
              <div className="cp-card" style={{ borderTop: '3px solid var(--forest-green)' }}>
                <h3 style={{ color: 'var(--forest-green)', marginBottom: '16px' }}>✓ Do</h3>
                <ul className="cp-feature-list">
                  {DOS_DONTS.filter(d => d.type === 'do').map((d, i) => (
                    <li key={i}>{d.item}</li>
                  ))}
                </ul>
              </div>
              <div className="cp-card" style={{ borderTop: '3px solid #c0392b' }}>
                <h3 style={{ color: '#c0392b', marginBottom: '16px' }}>✗ Don't</h3>
                <ul className="cp-feature-list">
                  {DOS_DONTS.filter(d => d.type === "don't").map((d, i) => (
                    <li key={i}>{d.item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <figure className="cp-editorial-img">
          <img src="https://images.unsplash.com/photo-1556742212-5b321f3c261b?auto=format&fit=crop&w=1200&q=80" alt="Professional corporate gifting etiquette guide for Indian businesses" loading="lazy" />
        </figure>

        {/* Product Showcase */}
        <section className="cp-section cp-section-alt" id="products">
          <div className="cp-container">
            <h2 className="cp-section-title">Etiquette-Safe Gift Recommendations</h2>
            <p className="cp-section-intro">
              All MintBox products are culturally neutral, customisable, and GST-compliant - safe choices for any team size or seniority level.
            </p>
          </div>
          <ContentProductShowcase products={products} categories={categories} />
        </section>

        {/* Budget Tiers */}
        <section className="cp-section">
          <div className="cp-container">
            <h2 className="cp-section-title">Budget Guidelines by Recipient Level</h2>
            <div className="cp-table-wrap">
              <table className="cp-table">
                <thead>
                  <tr>
                    <th>Budget Range</th>
                    <th>Recipient Level</th>
                    <th>Example Items</th>
                  </tr>
                </thead>
                <tbody>
                  {BUDGET_TIERS.map((tier, i) => (
                    <tr key={i}>
                      <td><strong>{tier.range}</strong></td>
                      <td>{tier.label}</td>
                      <td>{tier.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Gifting Calendar */}
        <section className="cp-section cp-section-alt">
          <div className="cp-container">
            <h2 className="cp-section-title">India Corporate Gifting Calendar</h2>
            <div className="cp-steps">
              {TIMING_CALENDAR.map((item, i) => (
                <div key={i} className="cp-step">
                  <div className="cp-step-num">{i + 1}</div>
                  <div className="cp-step-content">
                    <h3 className="cp-step-title">{item.month} - {item.event}</h3>
                    <p className="cp-step-desc">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <figure className="cp-editorial-img">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" alt="Corporate team following gifting etiquette for professional business relationships" loading="lazy" />
        </figure>

        {/* Quote Band */}
        <section className="cp-quote-band">
          <div className="cp-container">
            <h2 className="cp-quote-title">Need Etiquette-Compliant Corporate Gifts?</h2>
            <p className="cp-quote-sub">
              We handle GST invoicing, cultural sensitivity checks, packaging, and on-time delivery across India.
            </p>
            <a href="#quote" className="cp-btn-primary">Get a Custom Quote</a>
          </div>
        </section>

        {/* Inline Quote Form */}
        <section className="cp-section" id="quote">
          <div className="cp-container">
            <h2 className="cp-section-title">Request Etiquette-Ready Corporate Gifts</h2>
            <InlineQuoteForm
              title="Tell Us About Your Gifting Need"
              subtitle="We'll recommend appropriate gifts and handle GST-compliant invoicing."
            />
          </div>
        </section>

        <MidPageCTA variant="quote" />

        {/* FAQ */}
        <FAQSection
          title="Corporate Gifting Etiquette FAQs"
          items={FAQ_ITEMS}
        />

        {/* Related Links */}
        <section className="cp-section">
          <div className="cp-container">
            <h2 className="cp-section-title">Related Guides</h2>
            <div className="cp-related-grid">
              <a href="/guides/corporate-gifting-handbook" className="cp-related-card">
                <span className="cp-related-emoji">📖</span>
                <span className="cp-related-title">Corporate Gifting Handbook</span>
              </a>
              <a href="/guides/what-to-gift-employees" className="cp-related-card">
                <span className="cp-related-emoji">👥</span>
                <span className="cp-related-title">What to Gift Employees</span>
              </a>
              <a href="/guides/corporate-gifts-under-1000" className="cp-related-card">
                <span className="cp-related-emoji">💰</span>
                <span className="cp-related-title">Gifts Under ₹1,000</span>
              </a>
              <a href="/guides/diwali-corporate-gifts" className="cp-related-card">
                <span className="cp-related-emoji">🪔</span>
                <span className="cp-related-title">Diwali Corporate Gifts</span>
              </a>
              <a href="/guides/corporate-gifting-handbook" className="cp-related-card">
                <span className="cp-related-emoji">📖</span>
                <span className="cp-related-title">The Corporate Gifting Handbook</span>
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
