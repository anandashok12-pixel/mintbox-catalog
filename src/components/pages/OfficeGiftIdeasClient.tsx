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

const GIFT_CLUSTERS = [
  {
    cluster: "Everyday Appreciation",
    eyebrow: "Cluster 1 · No Occasion Needed",
    intro: "Small gifts that mark good work in the moment - the highest-ROI gifting an office does, because the timing does the talking.",
    items: [
      {
        name: "Handwritten Thank-You Card + Chocolate Box",
        price: "₹200–400",
        desc: "The cheapest gift on this list and often the most remembered. The card carries the weight; the chocolate makes it a moment.",
      },
      {
        name: "Desk Plant in a Ceramic Planter",
        price: "₹250–500",
        desc: "A succulent or money plant survives office neglect and sits in view for years. Quietly says the company noticed.",
      },
      {
        name: "Premium Coffee or Chai Sampler",
        price: "₹300–600",
        desc: "Three or four single-origin sachets in a small box. Works for every diet, every desk, every personality.",
      },
      {
        name: "Insulated Travel Mug",
        price: "₹400–800",
        desc: "The upgrade from the standard office mug - keeps chai hot through back-to-back meetings and travels on the commute.",
      },
      {
        name: "Team Snack Box",
        price: "₹500–1,000",
        desc: "One shared box for a team that shipped something. Appreciation that gets eaten together beats five separate trinkets.",
      },
    ],
  },
  {
    cluster: "Festivals",
    eyebrow: "Cluster 2 · Diwali, Christmas & More",
    intro: "Festival gifts are the biggest line item in most office gifting budgets - plan them by the calendar, order early, and match the occasion.",
    items: [
      {
        name: "Diwali Dry-Fruit Box",
        price: "₹800–1,500",
        desc: "The festival standard for a reason - universally welcome, family-shareable, and courier-safe. Order by October 15 for Diwali delivery.",
      },
      {
        name: "Festive Sweets + Diya Hamper",
        price: "₹600–1,200",
        desc: "Traditional sweets with a pair of decorative diyas. Feels rooted rather than generic - a strong pick for client-facing teams too.",
      },
      {
        name: "Scented Candle Gift Set",
        price: "₹400–900",
        desc: "Works across Diwali, Christmas, and New Year without being tied to any single festival. Safe, warm, and easy to bulk-brand on the box.",
      },
      {
        name: "Secret Santa Gifts Under ₹500",
        price: "₹200–500",
        desc: "Quirky mugs, fun socks, mini games - the December ritual runs on a strict budget cap. Set ₹500 and let personality do the rest.",
      },
      {
        name: "New Year Planner + Pen Set",
        price: "₹500–1,000",
        desc: "A dated planner and a decent metal pen in the first week of January lands better than anything given in the December rush.",
      },
    ],
  },
  {
    cluster: "Milestones",
    eyebrow: "Cluster 3 · Anniversaries, Farewells & Promotions",
    intro: "Milestone gifts carry more emotional weight than any other office gift - they mark a person, not a date on the calendar.",
    items: [
      {
        name: "Engraved Copper Water Bottle",
        price: "₹650–1,200",
        desc: "Name and year engraved - the classic work anniversary gift. A daily-use object that doubles as a keepsake.",
      },
      {
        name: "Framed Team Photo",
        price: "₹300–700",
        desc: "For promotions and project wins. Costs little, means a lot, and survives every desk move that follows.",
      },
      {
        name: "Farewell Memory Book",
        price: "₹800–1,500",
        desc: "A printed book of notes and photos from the whole team. The single most-kept farewell gift - people store these for decades.",
      },
      {
        name: "Personalised Desk Nameplate",
        price: "₹500–1,000",
        desc: "For promotions and new managers - a wooden or acrylic nameplate with the new title makes the step-up feel official.",
      },
      {
        name: "Milestone Gift Hamper",
        price: "₹1,500–3,000",
        desc: "For the big ones - 5 and 10 year anniversaries, major promotions. A curated hamper scaled to the moment, presented in front of the team.",
      },
    ],
  },
  {
    cluster: "Team Events",
    eyebrow: "Cluster 4 · Offsites, Annual Days & Competitions",
    intro: "Event gifts work differently - they are worn, won, or shared on the day, and the branding earns its place instead of intruding.",
    items: [
      {
        name: "Branded T-Shirts or Hoodies",
        price: "₹350–1,200",
        desc: "The offsite staple. Spend on fabric quality over print size - a hoodie people wear on weekends is marketing money cannot buy.",
      },
      {
        name: "Trophies & Mementos",
        price: "₹400–1,200",
        desc: "For sports days, hackathons, and annual-day awards. Engraved acrylic or wood keeps cost sane across many winners.",
      },
      {
        name: "Game-Night Prize Bundle",
        price: "₹300–800",
        desc: "Mini board games, playing cards, and snack packs as quiz or tournament prizes - small stakes that make participation fun.",
      },
      {
        name: "Offsite Kit: Cap + Bottle + Tote",
        price: "₹600–1,200",
        desc: "A practical three-piece kit handed out at check-in. Everything gets used during the event itself, which is the point.",
      },
      {
        name: "Event-Day Snack Hamper",
        price: "₹500–900",
        desc: "A per-person snack box for annual days and family events. Easy to distribute, zero sizing issues, always finished.",
      },
    ],
  },
]

const BUDGET_MATRIX = [
  {
    occasion: "Birthdays",
    budget: "₹300–800",
    note: "Keep it consistent across the team - same budget for everyone, personalised card each time. Consistency matters more than the amount.",
    href: null as string | null,
    linkText: null as string | null,
  },
  {
    occasion: "Festivals (Diwali, Christmas)",
    budget: "₹500–1,500",
    note: "The biggest annual spend. Bulk-order company-wide by mid-October for Diwali.",
    href: "/guides/diwali-gifts-for-employees",
    linkText: "See Diwali gifts for employees",
  },
  {
    occasion: "Work Anniversaries",
    budget: "₹500–10,000 (tiered)",
    note: "Scale with tenure - ₹500–1,000 at year one up to ₹5,000+ at year ten.",
    href: "/guides/work-anniversary-gifts",
    linkText: "See anniversary gifts by milestone",
  },
  {
    occasion: "Farewells",
    budget: "₹500–2,500",
    note: "Usually team-pooled rather than company-funded. A memory element beats a price tag.",
    href: "/guides/farewell-gifts-for-colleagues",
    linkText: "See 25 farewell gift ideas",
  },
  {
    occasion: "Secret Santa",
    budget: "₹300–500 cap",
    note: "A hard cap keeps it fair and fun. Announce the cap when names are drawn.",
    href: "/guides/secret-santa-gifts-for-colleagues",
    linkText: "See Secret Santa ideas under ₹500",
  },
  {
    occasion: "Spot Recognition",
    budget: "₹200–600",
    note: "Speed beats size - a small gift within 48 hours of the win outperforms a bigger one at quarter end.",
    href: null,
    linkText: null,
  },
]

const ALL_ITEMS_FLAT = GIFT_CLUSTERS.flatMap((c) => c.items)

const FAQ_ITEMS = [
  {
    q: "What are good office gift ideas for employees?",
    a: "The most reliable office gifts are daily-use items: insulated mugs and bottles (₹400–1,200), desk plants (₹250–500), quality notebooks and pens (₹300–800), and snack or coffee boxes (₹300–1,000). Match the gift to the occasion - small and immediate for appreciation, bigger and personalised for milestones like anniversaries and farewells.",
  },
  {
    q: "What office gifts will staff actually use?",
    a: "Usage surveys consistently favour practical items over novelties: travel mugs, water bottles, tote bags, power banks, and desk plants all see daily use. The items that get binned are logo-heavy trinkets with no function. Rule of thumb: if you would not use it yourself, do not order 200 of them.",
  },
  {
    q: "How much should an office spend on gifts per occasion?",
    a: "Typical Indian office benchmarks: birthdays ₹300–800, festival gifts ₹500–1,500 per employee, work anniversaries tiered from ₹500 (year 1) to ₹5,000+ (year 10), farewells ₹500–2,500, and Secret Santa capped at ₹300–500. Annual gifting budgets commonly total ₹2,000–5,000 per employee per year.",
  },
  {
    q: "How do I order office gifts in bulk?",
    a: "Shortlist 2–3 items, request samples, confirm branding mockups, then place a bulk order against a GST invoice. Most suppliers work from MOQ 25–50 units with 3–7 day turnaround; add buffer for festivals. For choosing between options, our <a href=\"/guides/how-to-choose-corporate-gifts\">guide to choosing corporate gifts</a> has a step-by-step framework.",
  },
  {
    q: "Can MintBox handle recurring office gifting across occasions?",
    a: "Yes. MintBox runs standing arrangements for offices - pre-approved gift tiers for birthdays, anniversaries, and festivals with ready stock, MOQ 10, quotes within 24 hours, and 3–5 business day turnaround per batch. One brief covers the whole year instead of a scramble before every occasion.",
  },
]

export default function OfficeGiftIdeasClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "Office Gift Ideas", "item": "https://themintbox.in/guides/office-gift-ideas" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "20 Office Gift Ideas for Every Occasion (2026)",
        "description": "Office gift ideas for every occasion - everyday appreciation, festivals, milestones, and team events, with budgets per occasion and bulk ordering tips.",
        "url": "https://themintbox.in/guides/office-gift-ideas",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "20 Office Gift Ideas for Every Occasion",
        "itemListElement": ALL_ITEMS_FLAT.map((item, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": `${item.name} — ${item.price}`,
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
              <span className="cp-breadcrumb-current">Office Gift Ideas</span>
            </nav>
            <div className="cp-hero-eyebrow">Office Gifting · All Occasions · 2026</div>
            <h1 className="cp-hero-title">
              20 Office Gift Ideas<br />
              <em>For Every Occasion (2026)</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              The best office gift ideas depend on the occasion - a spot thank-you needs a
              different gift than a 10-year anniversary. Here are 20 ideas organised across four
              occasion clusters, each with a realistic ₹ budget for Indian offices.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See All 20 Ideas ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 4 occasion clusters</span>
              <span className="cp-hero-badge">✓ MOQ 10 units</span>
              <span className="cp-hero-badge">✓ Budget per occasion</span>
              <span className="cp-hero-badge">✓ GST invoicing</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Modern office where team gift ideas are exchanged" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80" alt="Wrapped office gift ideas ready for an office occasion" className="cp-hero-img-actual" loading="lazy" />
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
            content="The best office gift ideas match the occasion: desk plants and coffee samplers (₹250–600) for everyday appreciation, dry-fruit boxes (₹800–1,500) for festivals, engraved bottles and memory books (₹650–1,500) for milestones, and branded hoodies or offsite kits (₹350–1,200) for team events. Budget ₹2,000–5,000 per employee per year across all occasions."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ office gifts delivered since 2019",
              "In-house branding and personalisation",
              "3–5 business day bulk turnaround",
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

      {/* 4. THE MAIN LIST — 4 OCCASION CLUSTERS */}
      {GIFT_CLUSTERS.map((cluster, ci) => (
        <section
          key={cluster.cluster}
          id={ci === 0 ? 'list' : undefined}
          className={`cp-section ${ci % 2 === 0 ? 'cp-section--cream' : 'cp-section--white'}`}
        >
          <div className="cp-container">
            <div className="cp-section-eyebrow">{cluster.eyebrow}</div>
            <h2 className="cp-section-title">{cluster.cluster}: Office Gift Ideas {ci * 5 + 1}–{ci * 5 + 5}</h2>
            <p className="cp-section-sub">{cluster.intro}</p>
            <div className="cp-card-grid cp-card-grid--2">
              {cluster.items.map((item, i) => (
                <div key={item.name} className="cp-card">
                  <div className="cp-card-title">
                    {ci * 5 + i + 1}. {item.name}
                    <span
                      style={{
                        marginLeft: '10px',
                        fontSize: '0.85em',
                        fontWeight: 400,
                        color: 'var(--forest-green, #1B4D3E)',
                        opacity: 0.75,
                      }}
                    >
                      {item.price}
                    </span>
                  </div>
                  <p className="cp-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 5. OCCASION → BUDGET MATRIX */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Budget Planner</div>
          <h2 className="cp-section-title">How Much to Spend: Budget by Occasion</h2>
          <p className="cp-section-sub">
            The fastest way to get office gifting wrong is inconsistent budgets. Use these bands
            as a policy, write them down, and apply them evenly.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {BUDGET_MATRIX.map((row) => (
              <div key={row.occasion} className="cp-card">
                <div className="cp-card-title">
                  {row.occasion}
                  <span
                    style={{
                      marginLeft: '10px',
                      fontSize: '0.85em',
                      fontWeight: 400,
                      color: 'var(--forest-green, #1B4D3E)',
                      opacity: 0.75,
                    }}
                  >
                    {row.budget}
                  </span>
                </div>
                <p className="cp-card-desc">
                  {row.note}
                  {row.href ? (
                    <>
                      {' '}
                      <a href={row.href}>{row.linkText} →</a>
                    </>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Office Gifts Catalog</div>
          <h2 className="cp-section-title">Browse Office Gift Products</h2>
          <p className="cp-section-sub">
            In-stock gifts suited to every office occasion. Filter by price to match your budget band.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Office Gift Ideas"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" alt="Office interior where staff gift ideas come to life across occasions" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            Offices that gift well do not spend more - they decide budgets by occasion once a
            year and never improvise. The policy is the gift strategy.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Office Gifting</div>
            <h2 className="cp-cta-title">Plan a Full Year<br />of Office Gifting</h2>
            <p className="cp-cta-sub">
              Tell us your team size and the occasions you cover - we will map gift tiers and
              budgets for the year and send a consolidated quote within {QUOTE_TIME}.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Office Gifting Quote"
              ctaLabel="Get Office Gifts Quote"
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
            title="Office Gift Ideas - Frequently Asked Questions"
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
              { label: 'Farewells', title: 'Farewell Gifts for Colleagues', href: '/guides/farewell-gifts-for-colleagues' },
              { label: 'Recognition', title: 'Employee Appreciation Gifts', href: '/guides/employee-appreciation-gifts' },
              { label: 'December', title: 'Secret Santa Gifts for Colleagues', href: '/guides/secret-santa-gifts-for-colleagues' },
              { label: 'Mega List', title: 'Corporate Gift Items List: 50 Ideas', href: '/guides/corporate-gift-items-list' },
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
