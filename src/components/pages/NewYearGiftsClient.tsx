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

const IDEAS = [
  {
    name: "2027 Planners & Diaries",
    price: "₹300–900",
    desc: "The classic for a reason - but do it well. A dated 2027 planner with quality paper, a ribbon marker and the recipient's name debossed on the cover gets used daily for a year; a flimsy freebie diary gets binned by February.",
  },
  {
    name: "Custom-Branded Desk Calendars",
    price: "₹150–400",
    desc: "The cheapest way to keep your brand on 365 desks all year. Invest in good design and useful extras - holiday lists, quarter markers - so it earns its desk space.",
  },
  {
    name: "Motivational Desk Items",
    price: "₹300–800",
    desc: "An engraved quote block, a goal-tracker stand or a minimalist desk sign. Skip generic hustle slogans; a line tied to your company values reads far less like clip art.",
  },
  {
    name: "Premium Notebooks",
    price: "₹400–1,000",
    desc: "Undated, thread-bound, thick paper - a notebook good enough that people hesitate to write in it. Pairs naturally with a pen for a clean sub-₹1,000 kit.",
  },
  {
    name: "Wellness Kits",
    price: "₹800–1,800",
    desc: "Herbal teas, a candle, a sleep or stress balm and a self-care card. January is resolution season - a wellness kit meets employees exactly where their head already is.",
  },
  {
    name: "Smart Water Bottles",
    price: "₹800–1,500",
    desc: "Temperature-display or hydration-reminder bottles ride the January health wave. Choose models with replaceable lids and BIS-certified electronics for bulk orders.",
  },
  {
    name: "Resolution Journals",
    price: "₹350–700",
    desc: "Guided journals with prompts for quarterly goals and weekly reviews. More personal than a planner and a natural fit for companies with OKR or goal-setting cultures.",
  },
  {
    name: "Team Experience Vouchers",
    price: "₹1,000–3,000",
    desc: "A team lunch, escape room or workshop voucher redeemed in January doubles as a kickoff event. Gifting a shared memory beats gifting fifteen separate objects.",
  },
  {
    name: "Gourmet New-Year Hamper",
    price: "₹1,000–2,500",
    desc: "Chocolate, specialty coffee, cookies and honey in a keepsake box - the festive hamper, minus the Diwali iconography. MintBox assembles these to budget at an MOQ of 10 units.",
  },
  {
    name: "Tech Accessories",
    price: "₹500–1,500",
    desc: "Wireless chargers, cable organisers and USB hubs are the most reliably used gifts in any corporate catalog. A subtle laser-etched logo keeps them classy.",
  },
  {
    name: "Plant Kits for New Beginnings",
    price: "₹400–900",
    desc: "A grow-it-yourself herb kit or a small succulent with a \"new beginnings\" card. Cheap, symbolic and photogenic - these show up in team channels within the hour.",
  },
  {
    name: "Branded Hoodies",
    price: "₹700–1,500",
    desc: "January is the one month Indian offices are actually cold - hoodie timing is perfect. Spend on fabric weight (330 GSM+) and keep branding small; a hoodie people wear outside work is the win.",
  },
  {
    name: "Coffee Kits",
    price: "₹600–1,400",
    desc: "A filter coffee or specialty pour-over kit with a mug - fuel for the back-to-work grind. Locally roasted beans give it a story a generic gift box lacks.",
  },
  {
    name: "Fitness Bands",
    price: "₹1,500–3,000",
    desc: "The premium tier of resolution-season gifting. Best offered as one option in a choice-based programme, since many employees already wear a device.",
  },
  {
    name: "Gratitude Card + Gift Combo",
    price: "₹250–600",
    desc: "A handwritten thank-you for the year gone by, paired with any small gift - chocolate, a notebook, a desk plant. The card does the heavy lifting; the gift is the excuse to send it.",
  },
]

const STRATEGY_POINTS = [
  {
    title: "Why Companies Are Shifting Budget to New Year",
    desc: "Diwali is crowded - your gift is one of a dozen arriving the same week. A New Year gift arrives alone, in the first week of January, when inboxes and desks are empty. Several MintBox clients now split festive budgets 60/40 between Diwali and New Year.",
  },
  {
    title: "The Split That Works",
    desc: "Keep Diwali for clients and tradition; use New Year for employees and momentum. Diwali gifting carries cultural weight, while New Year gifting - planners, wellness, goals - naturally points forward into the work year.",
  },
  {
    title: "Order by Early December",
    desc: "For delivery in the first week of January, place bulk orders by December 5–10. Customisation, December holidays and year-end courier load all eat lead time; standard bulk turnaround is 3–5 business days plus shipping.",
  },
  {
    title: "The Gifting Window: Mid-Dec to Mid-Jan",
    desc: "New Year gifts land well anytime from mid-December (paired with year-end thanks) to mid-January (a kickoff gesture). After January 15, the moment has passed - hold the budget for Republic Day-week appreciation instead.",
  },
]

const FAQ_ITEMS = [
  {
    q: "What are good New Year gifts for employees?",
    a: "The strongest picks for 2027: a premium dated planner (₹300–900), a wellness kit (₹800–1,800), a gourmet New-Year hamper (₹1,000–2,500), branded hoodies for the January cold, and tech accessories like wireless chargers. Pair any of them with a short handwritten note about the year ahead - that is what gets remembered.",
  },
  {
    q: "What should we send clients for the New Year?",
    a: "For clients, lean premium and useful: a leather-bound 2027 diary with their name, a coffee or tea kit, or a gourmet hamper. New Year client gifts arrive when no one else is gifting, so even a ₹800–1,500 gift stands out more than it would at Diwali. See our <a href=\"/guides/corporate-gifts-for-clients\">client gifting guide</a> for tiering budgets.",
  },
  {
    q: "When should New Year corporate gifts be sent?",
    a: "The window runs mid-December to mid-January. Sending in the last week of December pairs the gift with year-end gratitude; the first week of January frames it as a kickoff. Either way, place bulk orders by early December - customisation plus holiday courier load means 2–3 weeks of real lead time.",
  },
  {
    q: "Are planners and diaries still a good corporate gift?",
    a: "Yes - if the quality is real. Planner sales keep growing because paper planning survived the app era. The failure mode is the thin freebie diary with a giant logo. Spend ₹400+, deboss the recipient's name instead of just your brand, and it gets used for 12 months.",
  },
  {
    q: "How much should we budget per employee for New Year gifts?",
    a: "Most companies spend ₹300–800 per employee for a single useful item, or ₹1,000–2,500 for a hamper or kit. If Diwali gifting already happened in November, a modest, well-executed New Year gesture works better than a second big spend - the note matters more than the number.",
  },
  {
    q: "Can MintBox deliver New Year gifts across India in January?",
    a: "Yes. MintBox ships pan-India from Bangalore with per-recipient tracking, and same-day delivery is available within Bangalore. For first-week-of-January delivery, confirm your order by early December; quotes go out within 24 hours and MOQ is 10 units.",
  },
]

export default function NewYearGiftsClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "New Year Corporate Gifts", "item": "https://themintbox.in/guides/new-year-corporate-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "15 New Year Corporate Gifts to Start 2027 Right",
        "description": "15 New Year corporate gifts to start 2027 right - planners, wellness kits, hampers and tech, with price ranges, MOQ and an ordering timeline for December.",
        "url": "https://themintbox.in/guides/new-year-corporate-gifts",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "15 New Year Corporate Gifts to Start 2027 Right",
        "itemListElement": IDEAS.map((idea, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": `${idea.name} — ${idea.price}`,
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
              <span className="cp-breadcrumb-current">New Year Corporate Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">Year-End Gifting · 2027 Kickoff</div>
            <h1 className="cp-hero-title">
              15 New Year Corporate Gifts<br />
              <em>to Start 2027 Right</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              The best New Year corporate gifts arrive when no one else is gifting - the first
              week of January. Here are 15 ideas for employees and clients, from ₹150 desk
              calendars to ₹3,000 fitness bands, with the early-December ordering deadline
              that makes January delivery possible.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See All 15 Ideas ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Order by early December</span>
              <span className="cp-hero-badge">✓ MOQ 10 units</span>
              <span className="cp-hero-badge">✓ Name personalisation in-house</span>
              <span className="cp-hero-badge">✓ Pan-India delivery</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&w=800&q=80" alt="Planning the year ahead with new year corporate gifts and 2027 planners" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" alt="Coffee kit gift for the back-to-work January grind" className="cp-hero-img-actual" loading="lazy" />
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
            content="The best New Year corporate gifts for 2027: premium dated planners (₹300–900), wellness kits (₹800–1,800), gourmet hampers (₹1,000–2,500), branded hoodies, smart water bottles and tech accessories. Send between mid-December and mid-January, and place bulk orders by early December to clear customisation and holiday courier delays."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ gifts delivered since 2019",
              "Name personalisation and branding in-house",
              "3–5 business day standard bulk turnaround",
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
              <div className="cp-stat-label">Express Turnaround</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE MAIN LIST */}
      <section id="list" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The List</div>
          <h2 className="cp-section-title">15 New Year Corporate Gifts for 2027</h2>
          <p className="cp-section-sub">
            Ordered from everyday-budget to premium. For a broader look at what is working
            this year, see our <a href="/guides/corporate-gift-ideas-2026">corporate gift ideas
            for 2026</a> - and if your exchange happens before Christmas, start with
            {' '}<a href="/guides/christmas-corporate-gifts">Christmas corporate gifts</a> instead.
          </p>
          <div className="cp-steps">
            {IDEAS.map((idea, i) => (
              <div key={idea.name} className="cp-step">
                <div className="cp-step-num">{i + 1}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">
                    {idea.name}
                    <span
                      style={{
                        marginLeft: '12px',
                        fontSize: '0.85em',
                        fontWeight: 400,
                        color: 'var(--forest-green, #1B4D3E)',
                        opacity: 0.75,
                      }}
                    >
                      {idea.price}
                    </span>
                  </div>
                  <div className="cp-step-desc">{idea.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STRATEGY SECTION */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Budget Strategy</div>
          <h2 className="cp-section-title">Diwali vs New Year: How to Split Your Gifting Budget</h2>
          <p className="cp-section-sub">
            More companies are moving part of their festive budget from November to January -
            and the timing math backs the shift.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {STRATEGY_POINTS.map((point) => (
              <div key={point.title} className="cp-card">
                <div className="cp-card-title">{point.title}</div>
                <p className="cp-card-desc">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">2027-Ready Products</div>
          <h2 className="cp-section-title">Browse New Year Gift Products</h2>
          <p className="cp-section-sub">
            Planners, drinkware, tech and hamper components ready for January delivery.
            Filter by price to match your budget per head.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="New Year Corporate Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1200&q=80" alt="Fresh workspace set up with new year corporate gifts for the 2027 kickoff" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            A Diwali gift says thank you for the year that was. A New Year gift says we are
            glad you are here for the year ahead - and it arrives in a week when yours is the
            only gift on the desk.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>2027 Kickoff</div>
            <h2 className="cp-cta-title">Plan Your New Year<br />Gifting Now</h2>
            <p className="cp-cta-sub">
              Tell us your headcount, budget per gift and whether you need December or January
              delivery - we will send a detailed quote within {QUOTE_TIME}.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a New Year Gifting Quote"
              ctaLabel="Get New Year Quote"
              defaultOccasion="year_end"
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
            title="New Year Corporate Gifts - Frequently Asked Questions"
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
              { label: 'December', title: 'Christmas Corporate Gifts', href: '/guides/christmas-corporate-gifts' },
              { label: 'Office Fun', title: 'Secret Santa Gifts for Colleagues', href: '/guides/secret-santa-gifts-for-colleagues' },
              { label: 'Ideas', title: 'Corporate Gift Ideas 2026', href: '/guides/corporate-gift-ideas-2026' },
              { label: 'Trends', title: 'Corporate Gifting Trends 2026', href: '/guides/corporate-gifting-trends-2026' },
              { label: 'Occasions', title: 'Office Gift Ideas', href: '/guides/office-gift-ideas' },
              { label: 'Collection', title: 'Stationery & Planners', href: '/collections/stationery' },
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
