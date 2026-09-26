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

const GIFT_TIERS = [
  {
    id: 'spot',
    eyebrow: 'Tier 1 · ₹300–800',
    title: 'Employee Appreciation Gifts for Spot Awards',
    sub: 'Spot awards work because they arrive within days of the moment - a saved deadline, a rescued client call, a teammate helped quietly. Keep the gift small and the praise specific: one written sentence naming exactly what they did multiplies the impact of anything below.',
    items: [
      {
        name: 'Handwritten Note + Premium Chocolate',
        price: '₹300–500',
        desc: "The minimum viable recognition, and it works. The manager writes three sentences about the specific thing the employee did, clipped to a good chocolate box. The note gets kept longer than the chocolate - which tells you which part matters.",
      },
      {
        name: 'Branded Mug + Coffee Voucher Combo',
        price: '₹300–600',
        desc: 'A quality mug with a cafe voucher tucked inside - a small ritual gift that says "take a break, you earned it". Works especially well when handed over publicly in a team meeting rather than left at a desk.',
      },
      {
        name: 'Desk Plant with a Praise Tag',
        price: '₹300–600',
        desc: "A succulent or money plant with a printed tag carrying the manager's one-line praise. It sits on the desk for months as a visible, living marker of recognition - which is precisely what spot awards are for.",
      },
      {
        name: 'Food or Movie Voucher',
        price: '₹500–800',
        desc: "A dinner or movie voucher extends the appreciation to the employee's evening and family. Choose platforms with wide acceptance so redemption is effortless - a voucher that expires unused converts recognition into mild resentment.",
      },
      {
        name: 'Stationery Upgrade Kit',
        price: '₹400–800',
        desc: 'A premium notebook, a properly good pen, and desk accessories in one pouch. Practical recognition for the meticulous performer whose notes everyone borrows before audits and reviews.',
      },
    ],
  },
  {
    id: 'quarterly',
    eyebrow: 'Tier 2 · ₹800–2,000',
    title: 'Quarterly Award Gifts',
    sub: 'Quarterly awards recognise sustained performance, so the gift should be something that lasts a quarter and beyond. This is the tier where personalisation - a name, not a logo - starts being expected.',
    items: [
      {
        name: 'Name-Engraved Insulated Bottle',
        price: '₹800–1,200',
        desc: "A double-walled steel bottle engraved with the employee's name travels desk-gym-home daily. Engraved drinkware in this range is available in the MintBox catalog with in-house engraving. The name is the point: it marks the award as theirs, not inventory.",
      },
      {
        name: 'Premium Journal + Pen Set',
        price: '₹800–1,500',
        desc: `A leather-finish journal with a weighted pen signals "your thinking is valued" - fitting for the analyst or planner behind the quarter's best work. Add a handwritten first-page note from the manager before wrapping.`,
      },
      {
        name: 'Wellness Kit',
        price: '₹1,000–2,000',
        desc: 'A curated box - herbal teas, a scented candle, a massage roller, dark chocolate - that says the company noticed the effort and cares about the recovery. Lands especially well after high-burn quarters like year-end closings.',
      },
      {
        name: 'Team Lunch + Small Gift Combo',
        price: '₹1,000–1,500 per person',
        desc: 'When the whole pod delivered, recognise the whole pod: a team lunch plus a small individual keepsake each. Shared recognition builds the exact behaviour - collaboration - most award programmes claim to want.',
      },
      {
        name: 'Tech Accessory',
        price: '₹1,000–2,000',
        desc: 'A wireless charger, entry-level earbuds, or a quality mouse - the useful-every-day tier of tech. Buy current-generation from known brands with India warranties; a glitchy award gift is worse than none.',
      },
    ],
  },
  {
    id: 'annual',
    eyebrow: 'Tier 3 · ₹2,000+',
    title: 'Annual Award Gifts',
    sub: 'Annual awards are the ceremony tier - presented on stage or on the all-hands call, with the story of what the person did told out loud. The gift should be built to be kept for years.',
    items: [
      {
        name: 'Engraved Award + Gift Combo',
        price: '₹2,000–4,000',
        desc: "A crystal or wooden award engraved with the employee's name and achievement, paired with a personal gift so they receive both a symbol and a thing they will use. Rendered with an in-prose link to the corporate memento ideas guide below.",
      },
      {
        name: 'Luxury Gift Hamper',
        price: '₹2,500–5,000',
        desc: 'Gourmet food, premium drinkware, a leather accessory, and a handwritten note from leadership in one presentation-grade box. MintBox curates annual-award hampers at this tier with 3–5 day turnaround. Choose a theme that matches the person, not the inventory.',
      },
      {
        name: 'Premium Leather Accessory',
        price: '₹2,000–4,000',
        desc: 'A leather portfolio, laptop sleeve, or bag - carried into every client meeting for years. Skip the company logo at this tier; initials embossed discreetly read far more premium than branding.',
      },
      {
        name: 'Experience Gift',
        price: '₹2,500–6,000',
        desc: 'A weekend stay voucher, a fine-dining experience for two, or an activity day. Experiences generate the stories people retell - which quietly markets your recognition programme better than any poster.',
      },
      {
        name: 'Smartwatch or Premium Tech',
        price: '₹3,000–6,000',
        desc: "The headline gift for the year's top performers - a smartwatch, premium earbuds, or a high-end mechanical keyboard. Announce it with the award, deliver it personalised, and it becomes the benchmark the whole team aims for next year.",
      },
    ],
  },
]

const CALENDAR_STEPS = [
  {
    step: 'Monthly: Spot Awards on Demand',
    desc: 'Give managers a small standing budget (₹300–800 per award) they can use within 48 hours of the moment - no approval chain. Speed is the whole value of a spot award; a form that takes two weeks kills it.',
  },
  {
    step: 'Quarterly: Nominated Awards',
    desc: 'Peer or manager nominations, 3–5 winners per quarter, gifts in the ₹800–2,000 band, announced at the quarterly all-hands with the story of what each person did. The story is the recognition; the gift is the anchor.',
  },
  {
    step: 'Annual: Ceremony-Tier Awards',
    desc: 'Top performers, long-service milestones, and values awards at ₹2,000+ with an engraved keepsake, presented on stage. Pair with our work anniversary tiers so tenure and performance recognition reinforce each other.',
  },
  {
    step: 'Budget: ₹2,000–5,000 per Employee per Year',
    desc: 'A typical Indian R&R gifting budget runs ₹2,000–5,000 per employee annually across all tiers. Committing the number upfront protects the programme from becoming the first casualty of a tight quarter.',
  },
  {
    step: 'Always: Pair the Gift with Written Praise',
    desc: 'Every gift at every tier ships with specific, written, named praise - what the person did, why it mattered, signed by a human. A gift without the words is a transaction; the words make it recognition.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'What are good employee appreciation gift ideas?',
    a: 'Match the gift to the recognition moment: spot awards work at ₹300–800 (handwritten note + chocolate, mug + voucher combo), quarterly awards at ₹800–2,000 (engraved bottle, wellness kit, journal set), and annual awards at ₹2,000+ (luxury hamper, leather accessory, experience gift). At every tier, pairing the gift with specific written praise matters more than the price.',
  },
  {
    q: 'What is the difference between appreciation gifts and rewards?',
    a: 'Rewards are earned against pre-announced criteria - hit the target, get the incentive - and function like compensation. Appreciation gifts are discretionary and personal: they recognise effort, behaviour, or a moment the criteria never anticipated. Programmes need both, but appreciation gifts drive belonging in a way formula-based rewards cannot.',
  },
  {
    q: 'What budget should we set per employee per year for appreciation gifts?',
    a: 'A typical Indian R&R gifting budget is ₹2,000–5,000 per employee per year, split across monthly spot awards (₹300–800 each), quarterly awards (₹800–2,000), and annual awards (₹2,000+). Startups often start at the lower end with higher-frequency, lower-value recognition - frequency beats size for day-to-day morale.',
  },
  {
    q: 'How are employee appreciation gifts treated for tax and GST?',
    a: 'Under GST, gifts to an employee up to ₹50,000 per employee per financial year are not treated as a "supply", but input tax credit on goods given as gifts is blocked - so the GST paid becomes a cost. Keep a gift register and invoices for audit. Full details in our <a href="/guides/gst-on-corporate-gifts">GST on corporate gifts</a> guide - and confirm treatment with your chartered accountant.',
  },
  {
    q: 'Can MintBox run a standing employee appreciation programme?',
    a: 'Yes. MintBox sets up standing R&R arrangements - pre-approved gift options per tier, ready stock, in-house engraving and personalisation, and 3–5 business day turnaround per batch (48-hour express available). MOQ starts at 10 units with GST-compliant invoicing, and quotes come back within 24 hours.',
  },
]

export default function AppreciationGiftsClient({ products, categories }: Props) {
  const allItems = GIFT_TIERS.flatMap((tier) => tier.items)

  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "Employee Appreciation Gifts", "item": "https://themintbox.in/guides/employee-appreciation-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "15 Employee Appreciation Gift Ideas HR Teams Swear By",
        "description": "15 employee appreciation gift ideas mapped to spot, quarterly, and annual awards with ₹ budgets - plus how to build an R&R gifting calendar that actually lasts.",
        "url": "https://themintbox.in/guides/employee-appreciation-gifts",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "15 Employee Appreciation Gift Ideas",
        "itemListElement": allItems.map((item, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": `${item.name} (${item.price})`,
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
              <span className="cp-breadcrumb-current">Employee Appreciation Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">Recognition &amp; Rewards · 2026</div>
            <h1 className="cp-hero-title">
              15 Employee Appreciation Gift Ideas<br />
              <em>HR Teams Swear By</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              The best employee appreciation gifts are mapped to the moment - a ₹400 spot award
              within 48 hours of a great save beats a ₹4,000 gift that arrives at random. Here are
              15 ideas across spot, quarterly, and annual award tiers, plus the R&amp;R calendar
              that keeps recognition running all year.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See All 15 Ideas ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Programme Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Mapped to award tiers</span>
              <span className="cp-hero-badge">✓ ₹300 to ₹6,000 budgets</span>
              <span className="cp-hero-badge">✓ Engraving in-house</span>
              <span className="cp-hero-badge">✓ Standing programmes available</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80" alt="Team celebrating an employee appreciation award moment" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1556742212-5b321f3c261b?auto=format&fit=crop&w=800&q=80" alt="Manager handing over an employee appreciation gift" className="cp-hero-img-actual" loading="lazy" />
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
            content="The best employee appreciation gifts match the recognition tier: spot awards at ₹300–800 (handwritten note + chocolate, mug + voucher), quarterly awards at ₹800–2,000 (engraved bottle, wellness kit), and annual awards at ₹2,000+ (luxury hamper, experience gift, smartwatch). Budget ₹2,000–5,000 per employee per year, and pair every gift with specific written praise."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ recognition gifts fulfilled since 2019",
              "In-house engraving and personalisation",
              "Standing R&R programmes with ready stock",
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

      {/* 4. THE MAIN LIST — 15 IDEAS IN 3 TIERS */}
      {GIFT_TIERS.map((tier, tierIndex) => {
        const startNum = GIFT_TIERS.slice(0, tierIndex).reduce((sum, t) => sum + t.items.length, 0)
        return (
          <section
            key={tier.id}
            id={tierIndex === 0 ? 'list' : undefined}
            className={`cp-section ${tierIndex % 2 === 0 ? 'cp-section--cream' : 'cp-section--white'}`}
          >
            <div className="cp-container">
              <div className="cp-section-eyebrow">{tier.eyebrow}</div>
              <h2 className="cp-section-title">{tier.title}</h2>
              <p className="cp-section-sub">{tier.sub}</p>
              <div className="cp-steps">
                {tier.items.map((item, i) => (
                  <div key={item.name} className="cp-step">
                    <div className="cp-step-num">{startNum + i + 1}</div>
                    <div className="cp-step-content">
                      <div className="cp-step-title">
                        {item.name}
                        <span
                          style={{
                            marginLeft: '12px',
                            fontSize: '0.85em',
                            fontWeight: 400,
                            color: 'var(--forest-green, #1B4D3E)',
                            opacity: 0.75,
                          }}
                        >
                          {item.price}
                        </span>
                      </div>
                      <div className="cp-step-desc">
                        {item.name === 'Engraved Award + Gift Combo' ? (
                          <>
                            A crystal or wooden award engraved with the employee&apos;s name and
                            achievement, paired with a personal gift so they receive both a symbol
                            and a thing they will use. Our{' '}
                            <a href="/guides/corporate-memento-ideas">corporate memento ideas</a>{' '}
                            guide covers trophy and plaque options in depth.
                          </>
                        ) : (
                          item.desc
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* 5. R&R CALENDAR */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The System</div>
          <h2 className="cp-section-title">Building an R&amp;R Gifting Calendar That Lasts</h2>
          <p className="cp-section-sub">
            One-off appreciation fades; a calendar compounds. This cadence keeps recognition
            predictable for finance and surprising for employees - and it slots neatly alongside{' '}
            <a href="/guides/work-anniversary-gifts">work anniversary gifts</a>, which run on
            tenure rather than performance.
          </p>
          <div className="cp-steps">
            {CALENDAR_STEPS.map((item, i) => (
              <div key={item.step} className="cp-step">
                <div className="cp-step-num">{i + 1}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{item.step}</div>
                  <div className="cp-step-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Recognition Products</div>
          <h2 className="cp-section-title">Browse Employee Appreciation Gift Products</h2>
          <p className="cp-section-sub">
            Curated products for every recognition tier - filter by price to match spot, quarterly,
            or annual award budgets.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Employee Appreciation Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" alt="HR team planning an employee appreciation gifting programme" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            Employees do not remember the fourth branded mug. They remember the Tuesday their
            manager handed them a gift with a note naming exactly what they did the previous
            Friday. Speed and specificity beat spend, every time.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Recognition Programmes</div>
            <h2 className="cp-cta-title">Set Up Your<br />R&amp;R Gift Programme</h2>
            <p className="cp-cta-sub">
              Tell us your headcount, award tiers, and annual budget per employee - we will design
              a standing recognition gifting programme with pre-approved options, ready stock, and
              batch turnaround.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Appreciation Gift Quote"
              ctaLabel="Get Programme Quote"
              defaultOccasion="recognition"
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
            title="Employee Appreciation Gifts - Frequently Asked Questions"
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
              { label: 'Milestones', title: 'Work Anniversary Gifts', href: '/guides/work-anniversary-gifts' },
              { label: 'Farewells', title: 'Farewell Gifts for Colleagues', href: '/guides/farewell-gifts-for-colleagues' },
              { label: 'Awards', title: 'Corporate Memento Ideas', href: '/guides/corporate-memento-ideas' },
              { label: 'Office', title: 'Office Gift Ideas', href: '/guides/office-gift-ideas' },
              { label: 'Tax', title: 'GST on Corporate Gifts', href: '/guides/gst-on-corporate-gifts' },
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
