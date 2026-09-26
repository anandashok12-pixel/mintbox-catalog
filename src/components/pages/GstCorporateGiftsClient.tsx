'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { GoogleReviews } from '@/components/GoogleReviews'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import ContentProductShowcase from '@/components/content/ContentProductShowcase'
import FAQSection from '@/components/content/FAQSection'
import InlineQuoteForm from '@/components/content/InlineQuoteForm'
import QuickAnswerBox from '@/components/content/QuickAnswerBox'
import EATSignal from '@/components/content/EATSignal'
import LastUpdatedDate from '@/components/content/LastUpdatedDate'
import MidPageCTA from '@/components/content/MidPageCTA'
import { QUOTE_TIME } from '@/lib/businessFacts'

const PAGE_UPDATED = '2026-07-03'

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

const GST_RULES = [
  {
    title: "Employee gifts up to ₹50,000 per employee per financial year are not a 'supply'",
    desc: "Under Schedule I of the CGST Act, gifts from an employer to an employee are not treated as a supply as long as their total value stays within ₹50,000 per employee per financial year. Cross that threshold and the gifts can be treated as a supply - which is why HR teams track cumulative gift value per employee, not per occasion.",
  },
  {
    title: "Input tax credit (ITC) on gifts is blocked - Section 17(5)(h)",
    desc: "Section 17(5)(h) of the CGST Act blocks input tax credit on goods disposed of by way of gift. In plain terms: you pay GST when you buy the gifts, but you generally cannot claim that GST back as credit. The GST you pay on gift purchases is a real cost - budget for it as part of the landed price.",
  },
  {
    title: "Client gifts: ITC is blocked, so the tax is part of your gift cost",
    desc: "The same Section 17(5)(h) blocking applies to gifts given to clients and business partners. There is no employee-style threshold to work with here - treat the GST paid on client gifts as a non-recoverable cost when you set your per-client budget.",
  },
  {
    title: "Branded promotional giveaways are generally treated as gifts for ITC purposes",
    desc: "Putting your logo on an item does not automatically make it 'marketing spend' in GST terms. Free promotional giveaways are generally also treated as gifts, with ITC blocked accordingly - CBIC Circular No. 92/11/2019-GST discusses how various promotional schemes are treated. If your giveaway programme is large, get the structure reviewed professionally.",
  },
  {
    title: "Keep a gift register and proper invoices for audit",
    desc: "Maintain a simple register: recipient, occasion, item, value, date - plus GST-compliant purchase invoices from your vendor. It is the difference between a five-minute audit query and a long one, and it is how you evidence that per-employee totals stayed within the ₹50,000 threshold.",
  },
]

const TAX_SMART_IDEAS = [
  {
    name: "Festive Snack & Dry-Fruit Boxes — ₹500–1,200",
    desc: "Consumables at modest per-unit values keep per-employee gift totals comfortably low for the year while still landing well at Diwali or year-end.",
  },
  {
    name: "Branded Drinkware — ₹300–800",
    desc: "Bottles and mugs are the workhorse corporate gift: useful, brandable, and inexpensive enough that even quarterly gifting stays far from any threshold.",
  },
  {
    name: "Gifts Under ₹500, Done Well — ₹150–500",
    desc: "A curated under-₹500 gift (see our corporate gifts under ₹500 guide) proves budget and thoughtfulness are not opposites - and keeps registers simple.",
  },
  {
    name: "Spread Gifting Across the Year — ₹300–800 per moment",
    desc: "Four smaller recognition moments often beat one large year-end gift - for morale and for keeping cumulative per-employee value modest and well-documented.",
  },
  {
    name: "Personalised Stationery Sets — ₹250–700",
    desc: "Notebooks and pen sets with name personalisation feel premium at low unit cost. High perceived value per rupee is the tax-smart gifter's best friend.",
  },
  {
    name: "Desk Plants & Planters — ₹200–500",
    desc: "Low-cost, high-warmth, and universally office-appropriate. A plant plus a handwritten note is one of the best value-to-cost ratios in gifting.",
  },
  {
    name: "Sweets & Regional Treats — ₹300–900",
    desc: "Festive sweets and regional specialities are consumed, appreciated, and modestly priced - the classic Diwali choice for a reason.",
  },
  {
    name: "Team Snack Hampers (Shared) — ₹800–1,500 per team",
    desc: "One hamper shared by a pod spreads the value across several people while creating a shared moment - efficient on both budget and logistics.",
  },
  {
    name: "Wellness Kits — ₹500–1,200",
    desc: "Self-care kits with teas, candles, or wellness items stay in the mid-budget band and suit appreciation programmes that run all year.",
  },
  {
    name: "Keep a Running Per-Employee Total — ₹0",
    desc: "The smartest 'idea' costs nothing: a spreadsheet tracking cumulative gift value per employee per financial year, so the ₹50,000 Schedule I threshold is never an accidental surprise.",
  },
]

const FAQ_ITEMS = [
  {
    q: "Is GST applicable on gifts to employees?",
    a: "Under Schedule I of the CGST Act, gifts from an employer to an employee are not treated as a supply if their total value is within ₹50,000 per employee per financial year. Beyond that threshold, the gifts can be treated as a supply. Separately, input tax credit on goods given as gifts is blocked under Section 17(5)(h). This is general information, not tax advice - confirm treatment with your chartered accountant.",
  },
  {
    q: "Can I claim ITC on Diwali gifts for employees or clients?",
    a: "Generally no. Section 17(5)(h) of the CGST Act blocks input tax credit on goods disposed of by way of gift - which covers typical <a href=\"/guides/diwali-gifts-for-clients\">Diwali gifts for clients</a> and employees. Treat the GST paid on gift purchases as part of your gifting cost when planning budgets.",
  },
  {
    q: "What is the GST treatment of gifts to clients?",
    a: "Gifts to clients do not get the employee-specific ₹50,000 Schedule I threshold. The practical impact is on credit: ITC on goods gifted to clients is blocked under Section 17(5)(h), so the GST you pay when purchasing client gifts is a non-recoverable cost. Keep invoices and a gift register for audit.",
  },
  {
    q: "Do branded promotional items count as gifts under GST?",
    a: "Generally yes for ITC purposes - free promotional giveaways are typically treated as gifts, so input tax credit is blocked even when the item carries your logo. CBIC Circular No. 92/11/2019-GST discusses how various promotional schemes are treated. If giveaways are a big part of your marketing, have a professional review the structure.",
  },
  {
    q: "Does MintBox provide GST-compliant invoices for corporate gift orders?",
    a: "Yes. Every MintBox order ships with a GST-compliant invoice with your company GSTIN, itemised line items, and HSN details - the paperwork your finance team needs for its records and gift register. Quotes within 24 hours, MOQ 10 units.",
  },
  {
    q: "Is this page tax advice?",
    a: "No. This guide is general information, not tax advice - GST positions depend on your facts and can change. Confirm the treatment of your specific gifting programme with your chartered accountant before acting.",
  },
]

export default function GstCorporateGiftsClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "GST on Corporate Gifts", "item": "https://themintbox.in/guides/gst-on-corporate-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "GST on Corporate Gifts in India: Rules + 10 Tax-Smart Gift Ideas (2026)",
        "description": "Plain-English guide to GST on corporate gifts in India - the ₹50,000 employee rule, blocked ITC under Section 17(5)(h), and 10 tax-smart gift ideas.",
        "url": "https://themintbox.in/guides/gst-on-corporate-gifts",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "10 Tax-Smart Corporate Gift Ideas",
        "itemListElement": TAX_SMART_IDEAS.map((item, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": item.name,
        })),
      }) }} />
      <Navbar />
      <main id="main">

      {/* 1. HERO */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-hero-inner">
          <div>
            <nav className="cp-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="cp-breadcrumb-sep">›</span>
              <a href="/guides">Guides</a>
              <span className="cp-breadcrumb-sep">›</span>
              <span className="cp-breadcrumb-current">GST on Corporate Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">Compliance · Finance & HR</div>
            <h1 className="cp-hero-title">
              GST on Corporate Gifts in India:<br />
              <em>Rules + 10 Tax-Smart Gift Ideas (2026)</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              GST on corporate gifts confuses even experienced finance teams: when is a gift a
              "supply", and can you claim the credit back? Here are the rules in plain English -
              the ₹50,000 employee threshold, the ITC block, and what they mean for your gifting
              budget - followed by 10 gift ideas that keep things simple.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">Read the Rules ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ GST-compliant invoicing</span>
              <span className="cp-hero-badge">✓ Plain-English rules</span>
              <span className="cp-hero-badge">✓ MOQ 10 units</span>
              <span className="cp-hero-badge">✓ Not tax advice</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&w=800&q=80" alt="Finance team planning GST on corporate gifts budget" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1556742212-5b321f3c261b?auto=format&fit=crop&w=800&q=80" alt="Business handshake over a corporate gifting agreement" className="cp-hero-img-actual" loading="lazy" />
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
            content="GST on corporate gifts has two key rules: gifts to an employee totalling up to ₹50,000 per employee per financial year are not treated as a supply under Schedule I of the CGST Act, and input tax credit on goods given as gifts - to employees or clients - is blocked under Section 17(5)(h). So the GST paid on gift purchases is a real, non-recoverable cost."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients invoiced GST-compliantly",
              "50,000+ gifts delivered since 2019",
              "Itemised, HSN-coded invoices on every order",
              "Quote within 24 hours, MOQ 10 units",
              "General information only - not tax advice",
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
              <div className="cp-stat-value">100%</div>
              <div className="cp-stat-label">GST-Compliant Invoicing</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">24hr</div>
              <div className="cp-stat-label">Quote Turnaround</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE RULES */}
      <section id="list" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The Rules, Plainly</div>
          <h2 className="cp-section-title">GST on Corporate Gifts: 5 Rules Every Buyer Should Know</h2>
          <p className="cp-section-sub">
            Five rules cover nearly every corporate gifting decision. Understand these before you
            set your <a href="/guides/corporate-gifting-budget">corporate gifting budget</a> -
            because the ITC block changes what a gift really costs.
          </p>
          <div className="cp-steps">
            {GST_RULES.map((rule, i) => (
              <div key={rule.title} className="cp-step">
                <div className="cp-step-num">{i + 1}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{rule.title}</div>
                  <div className="cp-step-desc">{rule.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="cp-section-sub" style={{ marginTop: '24px', fontStyle: 'italic' }}>
            This guide is general information, not tax advice - confirm treatment with your
            chartered accountant.
          </p>
        </div>
      </section>

      {/* 5. TAX-SMART IDEAS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Practical Picks</div>
          <h2 className="cp-section-title">10 Tax-Smart Corporate Gift Ideas</h2>
          <p className="cp-section-sub">
            Ideas that keep per-employee values modest, records simple, and recipients happy.
            Most sit in the same range as our{' '}
            <a href="/guides/corporate-gifts-under-500">corporate gifts under ₹500</a> picks.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {TAX_SMART_IDEAS.map((item) => (
              <div key={item.name} className="cp-card">
                <div className="cp-card-title">{item.name}</div>
                <p className="cp-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Browse Products</div>
          <h2 className="cp-section-title">Corporate Gifts With GST-Compliant Invoicing</h2>
          <p className="cp-section-sub">
            Every order ships with an itemised, HSN-coded GST invoice - filter by price to stay
            within your per-employee band.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Corporate Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Office finance desk where GST on corporate gifts is planned and recorded" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            The most expensive corporate gift is the one whose GST treatment nobody thought about
            until the audit. A gift register and clean invoices cost nothing - skip them and the
            gift keeps giving, to the wrong side of the ledger.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Compliant Gifting</div>
            <h2 className="cp-cta-title">Gift Well.<br />Invoice Properly.</h2>
            <p className="cp-cta-sub">
              Tell us your budget per recipient and your finance team's requirements - we will
              quote within {QUOTE_TIME} with itemised, GST-compliant invoicing on every order.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a GST-Invoiced Quote"
              ctaLabel="Get Quote"
              defaultOccasion="other"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="whatsapp" />

      {/* 9. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="GST on Corporate Gifts - Frequently Asked Questions"
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
              { label: 'Etiquette', title: 'Corporate Gifting Etiquette', href: '/guides/corporate-gifting-etiquette' },
              { label: 'Budgeting', title: 'Corporate Gifting Budget Guide', href: '/guides/corporate-gifting-budget' },
              { label: 'Diwali', title: 'Diwali Gifts for Clients', href: '/guides/diwali-gifts-for-clients' },
              { label: 'Clients', title: 'Corporate Gifts for Clients', href: '/guides/corporate-gifts-for-clients' },
              { label: 'Handbook', title: 'Corporate Gifting Handbook', href: '/guides/corporate-gifting-handbook' },
              { label: 'Recognition', title: 'Employee Appreciation Gifts', href: '/guides/employee-appreciation-gifts' },
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
        <LastUpdatedDate date={PAGE_UPDATED} />
      </div>

      <GoogleReviews theme="light" initialCount={3} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
