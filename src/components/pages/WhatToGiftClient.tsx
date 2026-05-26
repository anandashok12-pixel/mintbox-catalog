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

const OCCASION_IDEAS = [
  { occasion: "Diwali / Festivals", budget: "₹500–₹2,000", ideas: "Hampers, branded mugs, stationery sets, copper bottles, sweets + dry fruits" },
  { occasion: "Work Anniversary (1–3 yrs)", budget: "₹1,000–₹2,500", ideas: "Personalised drinkware, leather desk accessories, premium notebooks" },
  { occasion: "Work Anniversary (5+ yrs)", budget: "₹3,000–₹7,000", ideas: "Luxury hamper, engraved copper set, branded laptop bag" },
  { occasion: "Employee Appreciation Day", budget: "₹300–₹800", ideas: "Desk plants, seed kits, branded stationery, care packs" },
  { occasion: "New Joinee Welcome Kit", budget: "₹800–₹2,000", ideas: "Welcome box: notebook + pen + mug + sticky notes + branded bag" },
  { occasion: "Promotion / Achievement", budget: "₹2,000–₹5,000", ideas: "Premium hamper, engraved item, luxury care box with personal note" },
  { occasion: "Team Outings / Events", budget: "₹200–₹600", ideas: "Branded totes, water bottles, caps, matching team accessories" },
]

const BY_TEAM_SIZE = [
  { size: "5–25 employees", tip: "Go fully personalised - names, roles, departments. Use this for senior or core team gifting." },
  { size: "25–100 employees", tip: "Semi-personalised - branded packaging with name stickers. Curate 2–3 tier options by level." },
  { size: "100–500 employees", tip: "Standardise by department or band. Same gift, different colour or packaging variants." },
  { size: "500+ employees", tip: "Bulk catalogue approach with fixed SKUs. Prioritise logistics efficiency and consistent packaging." },
]

const FAQ_ITEMS = [
  {
    q: "What are the best corporate gifts for employees in India?",
    a: "The best employee gifts are practical and branded: stainless steel bottles, premium notebooks, desk accessories, and festive hampers. For Diwali, hampers with sweets, dry fruits, and a branded item are the most popular choice. For all occasions, personalisation with a name or note significantly improves reception.",
  },
  {
    q: "How much should I spend on employee gifts?",
    a: "For all-staff gifts, ₹500–₹1,500 per person is the standard range. For work anniversaries (5+ years), ₹3,000–₹7,000 is appropriate. For senior management or top performers, ₹5,000–₹10,000 shows genuine appreciation.",
  },
  {
    q: "What gifts are appropriate for all religions and dietary preferences?",
    a: "Safe choices include: branded stationery, drinkware (non-leather), desk accessories, books, plant kits, and tech accessories. Avoid: alcohol, leather items, and food gifts without labelling. Hampers with vegetarian-certified sweets and dry fruits are widely accepted.",
  },
  {
    q: "Should I personalise employee gifts?",
    a: "Yes - even adding a name or department to the packaging transforms a generic gift into a personal moment. MintBox offers name printing, custom notes, and logo branding on most products at no significant extra cost for orders of 25+.",
  },
  {
    q: "What is the most popular employee gift for Diwali?",
    a: "Hampers combining a branded drinkware item (bottle or mug), premium dry fruits, artisan sweets, and a MintBox branded box are the most ordered Diwali gift. Budget: ₹800–₹1,500 per unit for mid-sized teams.",
  },
]


export default function WhatToGiftClient({ products, categories }: Props) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "What to Gift Employees", "item": "https://themintbox.in/guides/what-to-gift-employees" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "What to Gift Employees: Ideas by Occasion, Budget & Team Size",
        "description": "Discover what to gift employees for Diwali, work anniversaries, and appreciation events. Curated corporate gift ideas from MintBox, Bangalore.",
        "url": "https://themintbox.in/guides/what-to-gift-employees",
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
              <a href="/">Home</a> › <a href="/guides/corporate-gifting-handbook">Guides</a> › What to Gift Employees
            </div>
            <h1 className="cp-hero-title">What to Gift Employees: Ideas by Occasion, Budget &amp; Team Size</h1>
            <p className="cp-hero-subtitle">
              From Diwali hampers to work anniversary sets - curated gift ideas for every team size, budget, and milestone.
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
              content="The best employee gifts are practical, branded, and appropriate to the occasion - drinkware and stationery for all-staff events (₹500–₹1,500), premium hampers for milestones (₹1,500–₹5,000), and personalised luxury sets for high performers (₹5,000+)."
            />
            <EATSignal />
          </div>
        </section>


        {/* Stats Band */}
        <section className="cp-stats-band">
          <div className="cp-container">
            <div className="cp-stats-grid">
              <div className="cp-stat"><span className="cp-stat-num">200+</span><span className="cp-stat-label">Corporate Clients</span></div>
              <div className="cp-stat"><span className="cp-stat-num">50,000+</span><span className="cp-stat-label">Gifts Delivered</span></div>
              <div className="cp-stat"><span className="cp-stat-num">6+</span><span className="cp-stat-label">Years Experience</span></div>
              <div className="cp-stat"><span className="cp-stat-num">48hr</span><span className="cp-stat-label">Turnaround</span></div>
            </div>
          </div>
        </section>

        {/* Occasions Table */}
        <section className="cp-section">
          <div className="cp-container">
            <h2 className="cp-section-title">What to Gift by Occasion</h2>
            <p className="cp-section-intro">
              Different occasions call for different gift strategies. Use this table to match the right gift to the moment.
            </p>
            <div className="cp-table-wrap">
              <table className="cp-table">
                <thead>
                  <tr>
                    <th>Occasion</th>
                    <th>Budget</th>
                    <th>Gift Ideas</th>
                  </tr>
                </thead>
                <tbody>
                  {OCCASION_IDEAS.map((row, i) => (
                    <tr key={i}>
                      <td><strong>{row.occasion}</strong></td>
                      <td>{row.budget}</td>
                      <td>{row.ideas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <figure className="cp-editorial-img">
          <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1200&q=80" alt="Corporate gift packages curated for employee appreciation occasions" loading="lazy" />
        </figure>

        {/* Product Showcase */}
        <section className="cp-section cp-section-alt" id="products">
          <div className="cp-container">
            <h2 className="cp-section-title">Browse Employee Gift Ideas</h2>
            <p className="cp-section-intro">
              All products are customisable with your logo, personalised packaging, and GST-compliant invoicing included.
            </p>
          </div>
          <ContentProductShowcase products={products} categories={categories} />
        </section>

        {/* By Team Size */}
        <section className="cp-section">
          <div className="cp-container">
            <h2 className="cp-section-title">Gifting by Team Size</h2>
            <p className="cp-section-intro">
              Your gifting strategy should scale with your headcount. Here is how to approach it at each size.
            </p>
            <div className="cp-steps">
              {BY_TEAM_SIZE.map((item, i) => (
                <div key={i} className="cp-step">
                  <div className="cp-step-num">{i + 1}</div>
                  <div className="cp-step-content">
                    <h3 className="cp-step-title">{item.size}</h3>
                    <p className="cp-step-desc">{item.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <figure className="cp-editorial-img">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" alt="Office team discussing what to gift employees for Diwali and work anniversaries" loading="lazy" />
        </figure>

        {/* Quote Band */}
        <section className="cp-quote-band">
          <div className="cp-container">
            <h2 className="cp-quote-title">Ready to Gift Your Employees?</h2>
            <p className="cp-quote-sub">
              Tell us your team size, occasion, and budget - we will curate the right gift set and handle all logistics.
            </p>
            <a href="#quote" className="cp-btn-primary">Get a Custom Quote</a>
          </div>
        </section>

        {/* Inline Quote Form */}
        <section className="cp-section" id="quote">
          <div className="cp-container">
            <h2 className="cp-section-title">Request Employee Gifts</h2>
            <InlineQuoteForm
              title="Tell Us About Your Gifting Need"
              subtitle="We will recommend the right gifts and handle branding, packaging, and delivery."
            />
          </div>
        </section>

        <MidPageCTA variant="quote" />

        {/* FAQ */}
        <FAQSection
          title="Employee Gifting FAQs"
          items={FAQ_ITEMS}
        />

        {/* Related Links */}
        <section className="cp-section">
          <div className="cp-container">
            <h2 className="cp-section-title">Related Guides</h2>
            <div className="cp-related-grid">
              <a href="/guides/corporate-gifting-etiquette" className="cp-related-card">
                <span className="cp-related-emoji">📋</span>
                <span className="cp-related-title">Corporate Gifting Etiquette</span>
              </a>
              <a href="/guides/corporate-gifts-for-new-employees" className="cp-related-card">
                <span className="cp-related-emoji">👋</span>
                <span className="cp-related-title">Gifts for New Employees</span>
              </a>
              <a href="/guides/corporate-gifts-under-1000" className="cp-related-card">
                <span className="cp-related-emoji">💰</span>
                <span className="cp-related-title">Corporate Gifts Under ₹1,000</span>
              </a>
              <a href="/guides/diwali-corporate-gifts" className="cp-related-card">
                <span className="cp-related-emoji">🪔</span>
                <span className="cp-related-title">Diwali Corporate Gifts</span>
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
