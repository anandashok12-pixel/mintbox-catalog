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

const KIT_TIERS = [
  {
    name: "Essential Welcome Kit",
    price: "₹500–₹800",
    items: ["Branded notebook (A5)", "Quality ballpoint pen", "Sticker pack or magnet", "Welcome card with manager's note"],
    featured: false,
  },
  {
    name: "Standard Welcome Kit",
    price: "₹800–₹1,500",
    items: ["Branded notebook + pen", "Stainless steel mug or bottle", "Sticky note set", "Branded tote bag", "Welcome letter"],
    featured: true,
  },
  {
    name: "Premium Welcome Kit",
    price: "₹1,500–₹2,500",
    items: ["Premium notebook (hardbound)", "Branded water bottle", "Wireless earbuds or phone stand", "Desk organiser", "Personalised welcome note", "Custom rigid gift box"],
    featured: false,
  },
]

const ONBOARDING_STEPS = [
  { num: "1", title: "Define the Kit Budget", desc: "Decide per-head budget. We recommend ₹1,000–₹1,500 for most mid-sized companies." },
  { num: "2", title: "Choose 3–5 Core Items", desc: "Notebook + pen + drinkware is the base. Add tech accessories or branded apparel based on budget." },
  { num: "3", title: "Add Personalisation", desc: "At minimum, add the employee's name to the outer box. Consider printing their name on the notebook cover." },
  { num: "4", title: "Write a Welcome Note", desc: "Include a personal note from the manager or CEO. This single element has the highest emotional impact." },
  { num: "5", title: "Order in Batches", desc: "Place standing orders for 10–20 kits at a time if you hire regularly. MintBox maintains inventory for recurring clients." },
]

const FAQ_ITEMS = [
  {
    q: "What should be included in a new employee welcome kit?",
    a: "A standard welcome kit includes: a branded notebook, quality pen, stainless steel mug or bottle, and a personalised welcome note. For remote employees, add a laptop stand or cable organiser. The key is to include practical items they will use daily.",
  },
  {
    q: "What is the ideal budget for a new employee welcome kit?",
    a: "₹800–₹1,500 per kit is the most common range. This covers a notebook, pen, branded drinkware, and a tote or box. For senior hires, ₹2,000–₹3,000 with premium items and rigid gift box packaging is appropriate.",
  },
  {
    q: "Should new employee gifts be personalised?",
    a: "Yes - personalisation is especially important for onboarding gifts. At minimum, print the employee's name on the outer packaging. Printing their name on the notebook cover or mug transforms it from a generic kit to a genuine welcome gesture.",
  },
  {
    q: "How far in advance should I order new employee kits?",
    a: "For standard kits, 7–10 business days is sufficient. For personalised kits with custom printing, allow 10–15 business days. If you hire in bulk (annual intake, campus drives), order 4–6 weeks ahead.",
  },
  {
    q: "Can MintBox handle recurring welcome kit orders?",
    a: "Yes. MintBox maintains standing stock for regular corporate clients. You can place rolling orders of 5–20 kits per month with a 3–5 business day turnaround. Contact us to set up a recurring arrangement.",
  },
]


export default function NewEmployeeGiftsClient({ products, categories }: Props) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Corporate Gifts for New Employees", "item": "https://themintbox.in/guides/corporate-gifts-for-new-employees" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Corporate Gifts for New Employees: Welcome Kits That Make an Impression",
        "description": "Create the perfect new employee welcome kit. Branded onboarding gifts from ₹500 that make a strong first impression. Bulk from 10 units, pan-India delivery.",
        "url": "https://themintbox.in/guides/corporate-gifts-for-new-employees",
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
              <a href="/">Home</a> › <a href="/guides/corporate-gifting-handbook">Guides</a> › Corporate Gifts for New Employees
            </div>
            <h1 className="cp-hero-title">Corporate Gifts for New Employees: Welcome Kits That Make an Impression</h1>
            <p className="cp-hero-subtitle">
              Make new employees feel valued from day one with a branded welcome kit that communicates culture, care, and belonging.
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
              content="The best new employee gifts are branded welcome kits: a personalised notebook, branded mug or bottle, quality pen, and a welcome note - all in a branded box. Budget ₹800–₹2,000 per kit. Personalise with the employee's name for maximum impact."
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

        {/* Kit Tiers */}
        <section className="cp-section">
          <div className="cp-container">
            <h2 className="cp-section-title">Welcome Kit Options by Budget</h2>
            <p className="cp-section-intro">
              Choose a tier that matches your budget and culture ambition. All kits are fully branded and can be personalised with the employee name.
            </p>
            <div className="cp-steps">
              {KIT_TIERS.map((tier, i) => (
                <div key={i} className={`cp-step${tier.featured ? ' cp-featured' : ''}`}>
                  <div className="cp-step-num">{i + 1}</div>
                  <div className="cp-step-content">
                    <h3 className="cp-step-title">{tier.name} <span style={{ fontWeight: 400, fontSize: '0.9em' }}>- {tier.price}</span></h3>
                    <ul className="cp-step-desc" style={{ margin: 0, paddingLeft: '20px' }}>
                      {tier.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                    {tier.featured && (
                      <span style={{ display: 'inline-block', marginTop: '8px', background: 'var(--forest-green)', color: '#fff', fontSize: '12px', padding: '2px 10px', borderRadius: '12px' }}>Most Popular</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <figure className="cp-editorial-img">
          <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80" alt="New employee onboarding welcome kit making a strong first impression" loading="lazy" />
        </figure>

        {/* Product Showcase */}
        <section className="cp-section cp-section-alt" id="products">
          <div className="cp-container">
            <h2 className="cp-section-title">Browse Welcome Kit Items</h2>
            <p className="cp-section-intro">
              All products can be added to a welcome kit. Logo branding, name personalisation, and gift box packaging available on every order.
            </p>
          </div>
          <ContentProductShowcase products={products} categories={categories} />
        </section>

        {/* How to Build Your Kit */}
        <section className="cp-section">
          <div className="cp-container">
            <h2 className="cp-section-title">How to Build Your Welcome Kit</h2>
            <p className="cp-section-intro">
              Follow these five steps to design a welcome kit that makes a lasting first impression.
            </p>
            <div className="cp-steps">
              {ONBOARDING_STEPS.map((step, i) => (
                <div key={i} className="cp-step">
                  <div className="cp-step-num">{step.num}</div>
                  <div className="cp-step-content">
                    <h3 className="cp-step-title">{step.title}</h3>
                    <p className="cp-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <figure className="cp-editorial-img">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" alt="Team meeting to discuss new employee welcome kit programme" loading="lazy" />
        </figure>

        {/* Quote Band */}
        <section className="cp-quote-band">
          <div className="cp-container">
            <h2 className="cp-quote-title">Design Your New Employee Welcome Kit</h2>
            <p className="cp-quote-sub">
              Tell us your team size, budget, and brand - we will curate a kit that makes every new hire feel genuinely welcomed.
            </p>
            <a href="#quote" className="cp-btn-primary">Get a Custom Quote</a>
          </div>
        </section>

        {/* Inline Quote Form */}
        <section className="cp-section" id="quote">
          <div className="cp-container">
            <h2 className="cp-section-title">Request Your Welcome Kit</h2>
            <InlineQuoteForm
              title="Tell Us About Your Onboarding Gift Need"
              subtitle="We will recommend the right items, handle personalisation, and deliver to individual addresses."
            />
          </div>
        </section>

        <MidPageCTA variant="quote" />

        {/* FAQ */}
        <FAQSection
          title="New Employee Welcome Kit FAQs"
          items={FAQ_ITEMS}
        />

        {/* Related Links */}
        <section className="cp-section">
          <div className="cp-container">
            <h2 className="cp-section-title">Related Guides</h2>
            <div className="cp-related-grid">
              <a href="/guides/what-to-gift-employees" className="cp-related-card">
                <span className="cp-related-emoji">👥</span>
                <span className="cp-related-title">What to Gift Employees</span>
              </a>
              <a href="/collections/employee-welcome-kit" className="cp-related-card">
                <span className="cp-related-emoji">🎁</span>
                <span className="cp-related-title">Employee Welcome Kit Collection</span>
              </a>
              <a href="/guides/corporate-gifting-etiquette" className="cp-related-card">
                <span className="cp-related-emoji">📋</span>
                <span className="cp-related-title">Corporate Gifting Etiquette</span>
              </a>
              <a href="/guides/corporate-gifts-under-1000" className="cp-related-card">
                <span className="cp-related-emoji">💰</span>
                <span className="cp-related-title">Corporate Gifts Under ₹1,000</span>
              </a>
              <a href="/guides/what-to-gift-employees" className="cp-related-card">
                <span className="cp-related-emoji">🎁</span>
                <span className="cp-related-title">What to Gift Employees</span>
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
