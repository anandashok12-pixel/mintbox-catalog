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
import LastUpdatedDate, { formatMonthYear } from '@/components/content/LastUpdatedDate'
import MidPageCTA from '@/components/content/MidPageCTA'
import { QUOTE_TIME, REPLY_TIME } from '@/lib/businessFacts'

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

const COMPANIES = [
  {
    rank: "1",
    name: "MintBox",
    desc: "Curated corporate gifting from a Bangalore HQ with pan-India delivery. Around 200 products across welcome kits, festive hampers, drinkware, and tech - branded and personalised in-house, MOQ 10 units, quotes within 24 hours, GST invoicing standard.",
    region: "HQ in Bangalore; ships pan-India. Honest note: the giants below beat us on raw catalog size - we compete on curation, small MOQs, and speed, not on listing 10,000 SKUs.",
  },
  {
    rank: "2",
    name: "OffiNeeds",
    desc: "One of India's biggest corporate gifting and office merchandise players, known for enormous catalogs and the capacity to run very large enterprise gifting programmes end to end.",
    region: "Strong Bangalore roots with pan-India enterprise reach. Pick them for multi-city programmes in the thousands of units.",
  },
  {
    rank: "3",
    name: "Consortium Gifts",
    desc: "A corporate gifting veteran with decades of trade history and a wide manufacturer network, which shows on custom-manufactured and unusual items.",
    region: "Known as a Delhi NCR stalwart serving large corporates across metros.",
  },
  {
    rank: "4",
    name: "PrintStop",
    desc: "A print-led merchandise and corporate kits company with a polished online ordering platform. Known for print quality and easy repeat ordering.",
    region: "Known as a Mumbai-based player with pan-India shipping. Strong for print-heavy onboarding kits and stationery.",
  },
  {
    rank: "5",
    name: "BoxUp Luxury Gifting",
    desc: "A luxury gifting specialist known for genuinely premium hampers and top-tier presentation. The go-to name when the brief is CXO and VIP client gifting.",
    region: "Bangalore-rooted with delivery across major metros. Pick them when budget per unit is ₹3,000+ and unboxing matters most.",
  },
  {
    rank: "6",
    name: "Vistaprint India",
    desc: "The Indian arm of the global self-serve printing platform. No sales calls, no MOQ negotiations - upload artwork, order 5 or 500 units online.",
    region: "Online-only, ships nationwide. Pick them for tiny one-off orders below every other vendor's MOQ.",
  },
  {
    rank: "7",
    name: "Giftana",
    desc: "An online corporate gifting marketplace known for a broad festive and employee-gifting range with straightforward e-commerce ordering.",
    region: "Online-first with pan-India delivery; commonly used for Diwali and year-end bulk orders.",
  },
  {
    rank: "8",
    name: "Blinkstore",
    desc: "A print-on-demand and merchandise platform known for letting companies spin up branded merch - tees, mugs, hoodies - without holding inventory.",
    region: "Online-first, nationwide fulfilment. Suits startups that want merch stores rather than one-time gift orders.",
  },
  {
    rank: "9",
    name: "IGP Business",
    desc: "The corporate arm of the IGP gifting marketplace, known for festive hampers, personalised gifts, and consumer-grade variety applied to corporate orders.",
    region: "Known for wide festive coverage and strong Delhi NCR and Mumbai presence with pan-India courier reach.",
  },
  {
    rank: "10",
    name: "FNP Corporate",
    desc: "The B2B arm of Ferns N Petals, known for flowers, plants, cakes, and festive hampers - useful when gifting leans celebratory or perishable.",
    region: "Delhi NCR heritage with one of the widest same-day consumer delivery networks in India.",
  },
  {
    rank: "11",
    name: "Swageazy",
    desc: "A swag automation platform known for global merchandise fulfilment - useful for distributed and remote-first teams that need kits shipped to home addresses.",
    region: "Online-first; known for serving startups with employees across India and abroad.",
  },
  {
    rank: "12",
    name: "Nurserylive Corporate",
    desc: "The corporate gifting arm of the plants marketplace - the deepest live-plant gifting range in the market, with the logistics to actually deliver plants safely.",
    region: "Ships pan-India. Pick them when the entire programme is green gifting at scale.",
  },
]

const SHORTLIST_STEPS = [
  {
    step: "1",
    title: "Check MOQ fit first",
    desc: "MOQs range from zero (self-serve platforms) to 25 (MintBox) to 100+ (enterprise vendors). If a vendor's minimum is triple your headcount, stop reading their catalog - nothing else about them matters for this order.",
  },
  {
    step: "2",
    title: "Demand customisation proof",
    desc: "Ask for photos of real delivered orders, not mockups - and ideally a physical sample. Logo printing quality varies wildly between vendors, and a blurry logo on 500 bottles is an expensive way to find out.",
  },
  {
    step: "3",
    title: "Confirm GST invoicing",
    desc: "Any serious corporate vendor issues GST-compliant invoices, but confirm the format and GSTIN details before paying an advance. If you are gifting employees or clients, also read up on how GST treats gifts before you finalise budgets.",
  },
  {
    step: "4",
    title: "Map logistics coverage",
    desc: "Multi-city team? Ask exactly which pin codes the vendor ships to, who pays per-location courier charges, and what happens to damaged units. Home-address delivery for remote employees is a different capability from bulk office drops - verify both.",
  },
  {
    step: "5",
    title: "Test the sample policy",
    desc: "Good vendors send paid samples and adjust before the bulk run; great ones credit the sample cost against your order. A vendor who refuses samples on a 500-unit order is asking you to gamble your budget.",
  },
]

const FAQ_ITEMS = [
  {
    q: "Which is the best corporate gifting company in India?",
    a: "There is no single best - it depends on order size, budget, and cities. For curated gifting at small MOQs with fast quotes, MintBox competes strongly. For enterprise-scale programmes, OffiNeeds and Consortium Gifts are known for capacity. For luxury, BoxUp specialises at the premium end. Shortlist two or three against your specific brief using MOQ, customisation proof, GST invoicing, logistics, and sample policy.",
  },
  {
    q: "What MOQ do corporate gifting companies require?",
    a: "It varies from no minimum (self-serve platforms like Vistaprint) to 10 units (MintBox) to 100+ units at enterprise-focused vendors. Customised products generally carry higher minimums than off-the-shelf items because branding setup has fixed costs. Below roughly 25 units, expect near-retail pricing.",
  },
  {
    q: "Do corporate gifting companies deliver pan-India?",
    a: "Most established players do, including everyone on this list - but coverage quality differs. Ask about specific pin codes, per-location delivery charges, courier-safety for fragile or perishable items, and home-address delivery for remote employees. Vendors headquartered in one metro often quote longer timelines for other regions.",
  },
  {
    q: "How much should a company budget for corporate gifting?",
    a: "Common Indian benchmarks: ₹300-800 per employee for festival gifting at volume, ₹1,000-2,500 for welcome kits and milestone gifts, and ₹2,000-10,000 for client and leadership gifting. Annual per-employee gifting spend typically lands between ₹2,000 and ₹5,000 across all occasions. Our <a href=\"/guides/corporate-gifting-handbook\">corporate gifting handbook</a> covers budgeting in depth.",
  },
  {
    q: "Can MintBox handle a pan-India gifting programme from Bangalore?",
    a: "Yes. We fulfil from Bangalore and courier pan-India, including individual home-address deliveries for remote teams. Standard bulk turnaround is 3-5 business days plus transit, with a 48-hour express option. You get one GST invoice regardless of how many cities we ship to.",
  },
]

export default function TopCompaniesIndiaClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "Top Gifting Companies in India", "item": "https://themintbox.in/guides/top-corporate-gifting-companies-india" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Top 12 Corporate Gifting Companies in India (2026)",
        "description": "The 12 best corporate gifting companies in India, ranked with regional strengths, MOQs, and specialities - plus a 5-step vendor shortlist checklist.",
        "url": "https://themintbox.in/guides/top-corporate-gifting-companies-india",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Top 12 Corporate Gifting Companies in India (2026)",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "MintBox" },
          { "@type": "ListItem", "position": 2, "name": "OffiNeeds" },
          { "@type": "ListItem", "position": 3, "name": "Consortium Gifts" },
          { "@type": "ListItem", "position": 4, "name": "PrintStop" },
          { "@type": "ListItem", "position": 5, "name": "BoxUp Luxury Gifting" },
          { "@type": "ListItem", "position": 6, "name": "Vistaprint India" },
          { "@type": "ListItem", "position": 7, "name": "Giftana" },
          { "@type": "ListItem", "position": 8, "name": "Blinkstore" },
          { "@type": "ListItem", "position": 9, "name": "IGP Business" },
          { "@type": "ListItem", "position": 10, "name": "FNP Corporate" },
          { "@type": "ListItem", "position": 11, "name": "Swageazy" },
          { "@type": "ListItem", "position": 12, "name": "Nurserylive Corporate" }
        ]
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
              <span className="cp-breadcrumb-current">Top Gifting Companies in India</span>
            </nav>
            <div className="cp-hero-eyebrow">Vendor Guide · Pan-India · 2026</div>
            <h1 className="cp-hero-title">
              Top 12 Corporate Gifting Companies in India<br />
              <em>Ranked by Speciality (2026)</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              The corporate gifting companies in India worth shortlisting in 2026 - ranked with
              regional strengths, specialities, and honest notes on who each vendor actually suits,
              from 25-unit startup orders to 10,000-unit enterprise programmes.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See the Ranking ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 12 vendors ranked</span>
              <span className="cp-hero-badge">✓ Regional notes included</span>
              <span className="cp-hero-badge">✓ 5-step shortlist checklist</span>
              <span className="cp-hero-badge">✓ Updated {formatMonthYear(PAGE_UPDATED)}</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Office of a corporate gifting company in India" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80" alt="Corporate gift handover from an Indian gifting vendor" className="cp-hero-img-actual" loading="lazy" />
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
            content="Top corporate gifting companies in India for 2026 include OffiNeeds (enterprise scale), Consortium Gifts (Delhi NCR veteran), PrintStop (print-led kits, Mumbai), BoxUp (luxury hampers), Vistaprint (small self-serve orders), and MintBox (curated gifting from Bangalore, MOQ 10, pan-India delivery). Shortlist by MOQ fit, customisation proof, GST invoicing, logistics coverage, and sample policy."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ gifts delivered since 2019",
              "Pan-India delivery fulfilled from Bangalore",
              "In-house branding, engraving, and personalisation",
              "GST-compliant invoicing on every order",
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
              <div className="cp-stat-label">Corporate Clients</div>
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
              <div className="cp-stat-value">24hr</div>
              <div className="cp-stat-label">Quote Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE RANKED LIST */}
      <section id="list" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The Ranking</div>
          <h2 className="cp-section-title">The 12 Best Corporate Gifting Companies in India</h2>
          <p className="cp-section-sub">
            Full disclosure: MintBox publishes this guide. We have listed ourselves where we
            genuinely compete and noted what competitors do better. Descriptions reflect what each
            company is publicly known for - we have not invented numbers for anyone.
          </p>
          <div className="cp-steps">
            {COMPANIES.map((c) => (
              <div key={c.rank} className="cp-step">
                <div className="cp-step-num">{c.rank}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{c.name}</div>
                  <div className="cp-step-desc">{c.desc}</div>
                  <div className="cp-step-desc" style={{ marginTop: '4px', fontStyle: 'italic', opacity: 0.85 }}>
                    {c.region}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SHORTLIST CHECKLIST */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Shortlisting</div>
          <h2 className="cp-section-title">How to Shortlist a Corporate Gifting Partner: 5 Checks</h2>
          <p className="cp-section-sub">
            Run every vendor - including us - through these five checks before you commit budget.
            For the product side of the decision, our guide on{' '}
            <a href="/guides/how-to-choose-corporate-gifts">how to choose corporate gifts</a>{' '}
            pairs well with this list.
          </p>
          <div className="cp-steps">
            {SHORTLIST_STEPS.map((s) => (
              <div key={s.step} className="cp-step">
                <div className="cp-step-num">{s.step}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{s.title}</div>
                  <div className="cp-step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The MintBox Catalog</div>
          <h2 className="cp-section-title">Browse Corporate Gifts That Ship Pan-India</h2>
          <p className="cp-section-sub">
            Every product below can be branded in-house and delivered anywhere in India from our
            Bangalore facility.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Corporate Gifts Across India"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&w=1200&q=80" alt="Planning a pan-India corporate gifting programme with a gifting company" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            Every vendor on this list can send you a gift. The difference shows up in week three -
            when the sample needs a revision, the courier loses a box, or finance asks for a
            consolidated GST invoice. Shortlist for how vendors handle problems, not just products.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Get Comparing</div>
            <h2 className="cp-cta-title">Put MintBox<br />on Your Shortlist</h2>
            <p className="cp-cta-sub">
              Send your quantity, budget, and delivery cities - we reply within {REPLY_TIME} and send a full
              quote within {QUOTE_TIME}. On orders of 100+ units, we can courier a sample before you commit to the bulk run.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a Pan-India Quote"
              ctaLabel="Request My Quote"
              defaultOccasion="corporate_event"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="samples" />

      {/* 9. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Corporate Gifting Companies in India - FAQs"
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
              { label: 'Bangalore', title: 'Top Gifting Companies in Bangalore', href: '/bangalore-corporate-gifting/top-companies' },
              { label: 'Suppliers', title: 'Corporate Gift Suppliers in Bangalore', href: '/bangalore-corporate-gifting/suppliers' },
              { label: 'Handbook', title: 'The Corporate Gifting Handbook', href: '/guides/corporate-gifting-handbook' },
              { label: 'Choosing', title: 'How to Choose Corporate Gifts', href: '/guides/how-to-choose-corporate-gifts' },
              { label: 'Trends', title: 'Corporate Gifting Trends 2026', href: '/guides/corporate-gifting-trends-2026' },
              { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
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
