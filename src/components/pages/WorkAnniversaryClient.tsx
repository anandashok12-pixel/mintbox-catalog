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

const MILESTONE_TIERS = [
  {
    years: "1 Year",
    title: "First Anniversary",
    budget: "₹500–1,000",
    ideas: "Branded notebook + pen, coffee mug, personalised sticker pack",
    note: "Focus on acknowledgement - a personal note matters more than the gift at year one.",
  },
  {
    years: "3 Years",
    title: "Rising Star",
    budget: "₹1,000–2,500",
    ideas: "Premium drinkware, leather desk accessories, curated care kit",
    note: "By year 3, you know their preferences. Personal elements land well.",
  },
  {
    years: "5 Years",
    title: "Half-Decade",
    budget: "₹2,500–5,000",
    ideas: "Luxury hamper, engraved copper set, branded premium bag",
    note: "A milestone moment. Consider a team celebration + gift for maximum impact.",
  },
  {
    years: "10 Years",
    title: "Decade of Service",
    budget: "₹5,000–10,000",
    ideas: "Premium artisan box, high-end tech gift, personalised experience",
    note: "Ten years deserves a ceremony, not just a package. Stage the presentation.",
  },
  {
    years: "15+ Years",
    title: "Long-Service Award",
    budget: "₹10,000+",
    ideas: "Custom luxury item, named recognition plaque, premium collection box",
    note: "This is a legacy moment - invest in quality and ceremony proportionally.",
  },
]

const PERSONALISATION_IDEAS = [
  {
    idea: "Name-Engraved Drinkware",
    desc: "Engrave the employee's name and year on a copper bottle or tumbler. A desk object they'll keep for years.",
  },
  {
    idea: "Custom Photo Book or Collage",
    desc: "A printed photo book of work highlights and team moments. Emotional, unique, and impossible to replicate.",
  },
  {
    idea: "Personalised Note from Leadership",
    desc: "A handwritten or signed note from the CEO or direct manager - the highest-impact element at any budget level.",
  },
  {
    idea: "Year-Of-Joining Keepsake",
    desc: "A gift that references their start year - subtle but deeply personal for long-tenured employees.",
  },
  {
    idea: "Team-Signed Card",
    desc: "A printed card signed by the whole team. Combine with any gift to transform it from transactional to meaningful.",
  },
]


const FAQ_ITEMS = [
  {
    q: "What are good work anniversary gifts for employees?",
    a: "Work anniversary gifts should be personalised and milestone-appropriate. For 1 year: ₹500–1,000 (branded notebook, mug). For 5 years: ₹2,500–5,000 (luxury hamper, engraved item). For 10 years: ₹5,000–10,000 (premium artisan box, high-end tech). Always include a personal note from leadership.",
  },
  {
    q: "How much should I spend on a work anniversary gift?",
    a: "Year 1: ₹500–1,000. Year 3: ₹1,000–2,500. Year 5: ₹2,500–5,000. Year 10: ₹5,000–10,000. Year 15+: ₹10,000+. The budget should scale with tenure - consistency matters, so establish a policy and stick to it.",
  },
  {
    q: "Should work anniversary gifts be personalised?",
    a: "Yes - personalisation is what transforms a work anniversary gift from a transaction into a moment. At minimum, include a personal note from the manager or CEO. For 5+ year milestones, name engraving or a team-signed card elevates the experience significantly.",
  },
  {
    q: "What is a good 5-year work anniversary gift?",
    a: "A luxury hamper (₹2,500–4,000), an engraved copper gift set, or a branded premium bag are strong 5-year anniversary gifts. Add a personalised note from the CEO and a team celebration to make it a true milestone moment.",
  },
  {
    q: "Can MintBox handle bulk work anniversary orders?",
    a: "Yes. If you have 10–50 anniversaries per quarter, MintBox can maintain a standing arrangement - pre-approved gift tiers, ready stock, and 3–5 business day turnaround per batch. Contact us to set up a rolling programme.",
  },
]

export default function WorkAnniversaryClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Work Anniversary Gifts", "item": "https://themintbox.in/guides/work-anniversary-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Work Anniversary Gifts for Employees: Ideas by Milestone",
        "description": "Celebrate work anniversaries with memorable corporate gifts. Ideas by milestone year from MintBox - personalised, branded, and GST-compliant.",
        "url": "https://themintbox.in/guides/work-anniversary-gifts",
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
              <span className="cp-breadcrumb-current">Work Anniversary Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">Employee Recognition · Milestone Gifts</div>
            <h1 className="cp-hero-title">
              Work Anniversary Gifts for Employees:<br />
              <em>Ideas by Milestone</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Celebrate every work anniversary - from year 1 to year 15+ - with gifts that match the
              milestone. Personalised, branded, and GST-compliant from MintBox.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-hero-cta-primary">Browse Anniversary Gifts ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Year 1 to 15+ covered</span>
              <span className="cp-hero-badge">✓ MOQ 25 units</span>
              <span className="cp-hero-badge">✓ Name engraving available</span>
              <span className="cp-hero-badge">✓ GST invoicing</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Team celebrating work anniversary milestone" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80" alt="Corporate gift packages ready for delivery" className="cp-hero-img-actual" loading="lazy" />
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
            content="The best work anniversary gifts scale with tenure - a personalised note + branded mug for year 1 (₹500–1,000), luxury hamper for year 5 (₹2,500–5,000), and premium artisan box for year 10 (₹5,000+). Personalisation - a name, a note, a shared memory - matters more than the gift price."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ anniversary and recognition gifts fulfilled",
              "Name engraving and personalisation in-house",
              "3–5 business day turnaround for rolling programmes",
              "GST-compliant invoicing for all orders",
            ]}
          />
        </div>
      </div>

      {/* 3. STATS BAND */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">200+</div>
              <div className="cp-stat-label">Clients</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">50,000+</div>
              <div className="cp-stat-label">Gifts Delivered</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">6+</div>
              <div className="cp-stat-label">Years in Business</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">48hr</div>
              <div className="cp-stat-label">Turnaround</div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. MILESTONE TIERS */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">By Milestone Year</div>
          <h2 className="cp-section-title">Anniversary Gift Ideas by Milestone Year</h2>
          <p className="cp-section-sub">
            Match the gift to the milestone. Budget, ideas, and personalisation approach for each
            anniversary tier.
          </p>
          <div className="cp-steps">
            {MILESTONE_TIERS.map((tier) => (
              <div key={tier.years} className="cp-step">
                <div className="cp-step-num">{tier.years}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">
                    {tier.title}
                    <span
                      style={{
                        marginLeft: '12px',
                        fontSize: '0.85em',
                        fontWeight: 400,
                        color: 'var(--forest-green, #1B4D3E)',
                        opacity: 0.75,
                      }}
                    >
                      {tier.budget}
                    </span>
                  </div>
                  <div className="cp-step-desc">
                    <strong>Ideas:</strong> {tier.ideas}
                  </div>
                  <div
                    className="cp-step-desc"
                    style={{ marginTop: '4px', fontStyle: 'italic', opacity: 0.8 }}
                  >
                    {tier.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PERSONALISATION IDEAS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Personalisation</div>
          <h2 className="cp-section-title">Make It Personal: Anniversary Gift Personalisation Ideas</h2>
          <p className="cp-section-sub">
            The right personal touch turns a good gift into an unforgettable moment. These ideas
            work at any budget level.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {PERSONALISATION_IDEAS.map((item) => (
              <div key={item.idea} className="cp-card">
                <div className="cp-card-title">{item.idea}</div>
                <p className="cp-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Anniversary Products</div>
          <h2 className="cp-section-title">Browse Work Anniversary Gift Products</h2>
          <p className="cp-section-sub">
            All products suitable for employee anniversary recognition. Filter by price to match
            your milestone tier.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Work Anniversary Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" alt="Team celebrating a work anniversary milestone with branded gift presentation" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            Work anniversaries are the one moment employees expect their company to notice them.
            A well-chosen gift says: we remember, we value, and we want you to stay.
          </p>
          <cite className="cp-quote-cite">MintBox Employee Recognition Insight</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Anniversary Gifting</div>
            <h2 className="cp-cta-title">Plan Your<br />Anniversary Programme</h2>
            <p className="cp-cta-sub">
              Tell us your team size, anniversary frequency, and budget per tier - we will design
              a rolling anniversary gifting programme with ready stock and 3-day turnaround.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Anniversary Gift Quote"
              ctaLabel="Get Anniversary Quote"
              defaultOccasion="work-anniversary"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* 9. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Work Anniversary Gifts - Frequently Asked Questions"
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
              { label: 'Employee Gifts', title: 'What to Gift Employees', href: '/guides/what-to-gift-employees' },
              { label: 'Onboarding', title: 'Corporate Gifts for New Employees', href: '/guides/corporate-gifts-for-new-employees' },
              { label: 'Etiquette', title: 'Corporate Gifting Etiquette', href: '/guides/corporate-gifting-etiquette' },
              { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
              { label: 'New Hires', title: 'Corporate Gifts for New Employees', href: '/guides/corporate-gifts-for-new-employees' },
            ].map((link) => (
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
