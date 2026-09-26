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

const IDEAS = [
  {
    name: "Self-Care & Wellness Hamper",
    price: "₹800–2,000",
    desc: "Herbal teas, an aromatherapy candle, bath salts and a good chocolate - rest as a gift, not another obligation. MintBox builds these with gender-neutral packaging, because thoughtful does not have to mean floral.",
  },
  {
    name: "Premium Journal + Pen",
    price: "₹500–1,200",
    desc: "A thread-bound journal with thick paper and a pen that feels substantial. A gift that assumes the recipient has ideas worth writing down - which is precisely the message the day calls for.",
  },
  {
    name: "Indoor Plant + Ceramic Planter",
    price: "₹400–900",
    desc: "A snake plant, jade or pothos in a well-made planter. Low maintenance, lasts for years, and works identically for a first-year analyst and a VP - useful when gifting across levels.",
  },
  {
    name: "Silk or Handloom Stole",
    price: "₹800–2,000",
    desc: "A handwoven stole from Indian handloom clusters - elegant, seasonless and it supports craftswomen in the supply chain, which gives the gift a story worth telling on the card.",
  },
  {
    name: "Book + Coffee Set",
    price: "₹600–1,400",
    desc: "A well-reviewed book - biography, fiction, business, ideally offered as a pick-one-of-three - with a bag of locally roasted coffee. A quiet, respectful gift that treats the recipient as a reader, not a demographic.",
  },
  {
    name: "Spa or Salon Voucher",
    price: "₹1,000–3,000",
    desc: "A flexible-value voucher at a reputed chain the recipient books on her own time. Keep it optional within a choice-based programme - relaxing for many, not for all.",
  },
  {
    name: "Ergonomic Desk Upgrade",
    price: "₹800–2,500",
    desc: "A laptop stand, ergonomic cushion or footrest - a gift that improves every single working day. Rarely gifted, immediately used, and it signals you care about her comfort at work, not just the photo op.",
  },
  {
    name: "Personalised Stationery Set",
    price: "₹400–900",
    desc: "Notecards, a notepad and a pen printed with her name. Personalisation at this budget outperforms generic gifts at twice the price - names beat logos every time.",
  },
  {
    name: "Gourmet Chocolate Box",
    price: "₹400–1,000",
    desc: "Single-origin or artisanal chocolate in a rigid gift box. A classic that works - as long as it is good chocolate and not a supermarket assortment in festive shrink-wrap.",
  },
  {
    name: "Skill Workshop Pass",
    price: "₹1,000–5,000",
    desc: "A paid seat at a pottery, photography, personal-finance or leadership workshop of her choice. The strongest signal on this list: the company is investing in her growth, not just marking a date.",
  },
  {
    name: "Canvas or Leather Tote Bag",
    price: "₹500–1,200",
    desc: "A structured tote sturdy enough for a laptop, in neutral colours. Skip the giant logo - a small woven label keeps it something people actually carry.",
  },
  {
    name: "Insulated Tumbler",
    price: "₹500–1,000",
    desc: "A double-walled tumbler that keeps coffee hot through back-to-back meetings. Available with name engraving in the MintBox catalog from ₹500 at an MOQ of 10.",
  },
  {
    name: "Custom Nameplate",
    price: "₹500–1,000",
    desc: "An engraved wooden or acrylic desk nameplate with her name and designation. A small object with a big subtext: you belong here, visibly.",
  },
  {
    name: "Donation in Her Name",
    price: "Any budget",
    desc: "A contribution to a girls' education or women's livelihood NGO, with a card naming her and what the donation funded. Pair it with a small physical gift so the gesture still feels personal.",
  },
  {
    name: "Team Experience",
    price: "₹800–2,000 per head",
    desc: "A team lunch, workshop or outing on or around March 8 - celebration as shared time rather than distributed objects. Works best alongside, not instead of, individual recognition.",
  },
]

const AVOID_POINTS = [
  {
    title: "Kitchen-Stereotype Gifts",
    desc: "No cookware, kitchen appliances or grocery hampers gifted because the recipient is a woman. A gift that assumes her place is in the kitchen undoes whatever goodwill the day was meant to build - it is the single most-cited Women's Day gifting mistake.",
  },
  {
    title: "Pink-Washing",
    desc: "Taking a generic gift, wrapping it in pink and calling it a Women's Day gift. Colour is not thoughtfulness. If the same gift in blue would look lazy, it is lazy in pink too - choose the gift for the person, then wrap it well.",
  },
  {
    title: "Appearance-Only Assumptions",
    desc: "Defaulting every woman to makeup or beauty kits assumes interests she never stated. Beauty gifts are fine as one option in a choice-based programme - as the only option, they reduce colleagues to a stereotype.",
  },
  {
    title: "The Token Gesture",
    desc: "A rose and a cupcake at reception, a mandatory photo, and nothing else all year reads as performance, not appreciation. If the gift is not backed by real recognition - or better, real policy - skip the photo op and keep the budget for something honest.",
  },
]

const PROGRAMME_PRINCIPLES = [
  {
    title: "Pair the Gift with Real Action",
    desc: "The gift lands differently when it accompanies substance: a mentorship programme announcement, flexible-work improvements, or a session led by senior women in the company sharing real career paths. Gift plus policy is memorable; gift alone is decoration.",
  },
  {
    title: "Offer a Choice",
    desc: "Let each employee pick from 2–3 options - say, a wellness hamper, a workshop pass or an ergonomic upgrade. Choice removes the guesswork, respects individual preferences, and quietly fixes the stereotype problem at the root.",
  },
  {
    title: "Celebrate Contribution, Not Gender Clichés",
    desc: "Write cards about specific work - the migration she led, the account she saved - rather than generic lines about grace and multitasking. Specific praise is the cheapest, most effective upgrade to any Women's Day programme.",
  },
]

const FAQ_ITEMS = [
  {
    q: "What are good Women's Day gifts for employees?",
    a: "The best Women's Day gifts for employees are thoughtful and stereotype-free: self-care hampers (₹800–2,000), premium journals, indoor plants, skill workshop passes (₹1,000–5,000), ergonomic desk upgrades and handloom stoles. Offering a choice of 2–3 options works better than any single gift - see our broader guide to <a href=\"/guides/what-to-gift-employees\">what to gift employees</a> for year-round ideas.",
  },
  {
    q: "How much should we budget for Women's Day gifts?",
    a: "Most companies spend ₹500–1,500 per employee, with ₹800–1,200 as the comfortable middle. Premium options like workshop passes or spa vouchers run ₹1,000–3,000. Spend less on the object and more on specificity - a ₹600 gift with a personal note about her actual work beats a ₹2,000 generic hamper.",
  },
  {
    q: "What should companies avoid gifting on Women's Day?",
    a: "Avoid kitchen appliances and cookware (gifting them because the recipient is a woman is the classic stereotype mistake), pink-washed generic items, beauty products as the default-only option, and token gestures with no recognition behind them. When in doubt, ask: would this gift make sense for any valued colleague? If not, rethink it.",
  },
  {
    q: "When should we order Women's Day gifts?",
    a: "Women's Day is 8 March every year. For customised gifts - engraving, branded packaging, curated hampers - place bulk orders by late February. Standard bulk turnaround is 3–5 business days, so ordering by February 25 comfortably covers pan-India delivery before March 8.",
  },
  {
    q: "Are Women's Day gifts appropriate for a mixed or small team?",
    a: "Yes, if handled with care. Keep the gifting quiet and personal rather than a staged ceremony, and pair it with a team-wide gesture - a lunch or a talk - so the day is about inclusion rather than singling people out. Many teams also fold it into a broader <a href=\"/guides/employee-appreciation-gifts\">employee appreciation programme</a> in March.",
  },
  {
    q: "Can MintBox build custom Women's Day gift sets?",
    a: "Yes. MintBox curates Women's Day gift sets from ₹400 to ₹3,000 per unit at an MOQ of 10 - with choice-based options, name personalisation and gender-neutral premium packaging done in-house in Bangalore. Quotes within 24 hours; order by late February for March 8 delivery.",
  },
]

export default function WomensDayGiftsClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "Women's Day Gifts for Employees", "item": "https://themintbox.in/guides/womens-day-gifts-for-employees" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "15 Women's Day Gift Ideas for Employees (2026)",
        "description": "15 thoughtful Women's Day gift ideas for employees in 2026 - wellness hampers, workshops and desk upgrades, plus what to avoid so it never feels tokenistic.",
        "url": "https://themintbox.in/guides/womens-day-gifts-for-employees",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "15 Women's Day Gift Ideas for Employees (2026)",
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
              <span className="cp-breadcrumb-current">Women&apos;s Day Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">8 March · Employee Recognition</div>
            <h1 className="cp-hero-title">
              15 Women&apos;s Day Gift Ideas for Employees<br />
              <em>Thoughtful, Not Tokenistic (2026)</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              The best Women&apos;s Day gifts for employees respect the person before the
              occasion. Here are 15 ideas - wellness hampers, workshop passes, ergonomic
              upgrades and more, from ₹400 to ₹5,000 - plus the stereotype traps to avoid
              and how to run a programme that does not feel like a photo op.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See All 15 Ideas ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Zero stereotype gifts</span>
              <span className="cp-hero-badge">✓ Order by late February</span>
              <span className="cp-hero-badge">✓ Choice-based options</span>
              <span className="cp-hero-badge">✓ MOQ 10 units</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80" alt="Women colleagues celebrating Women's Day at the office" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" alt="Indoor plant gift - a thoughtful Women's Day gift for employees" className="cp-hero-img-actual" loading="lazy" />
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
            content="The best Women's Day gifts for employees in 2026 are thoughtful and stereotype-free: self-care hampers (₹800–2,000), skill workshop passes (₹1,000–5,000), premium journals, indoor plants, ergonomic desk upgrades and handloom stoles. Avoid kitchen appliances and pink-washed generic gifts, offer a choice where possible, and order by late February for March 8."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ gifts delivered since 2019",
              "Choice-based gifting programmes supported",
              "Name personalisation and packaging in-house",
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
          <h2 className="cp-section-title">15 Women&apos;s Day Gifts for Employees That Get It Right</h2>
          <p className="cp-section-sub">
            Every idea below passes one test: it would make sense as a gift for any valued
            colleague. Several also work year-round - our guide to
            {' '}<a href="/guides/unique-corporate-gifts">unique corporate gifts</a> has more
            in the same spirit.
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

      {/* 5. WHAT TO AVOID */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The Honest Part</div>
          <h2 className="cp-section-title">What to Avoid: The Gifts That Backfire</h2>
          <p className="cp-section-sub">
            More Women&apos;s Day goodwill is lost to a bad gift than saved by a good one.
            Four traps come up every March - all four are avoidable.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {AVOID_POINTS.map((point) => (
              <div key={point.title} className="cp-card">
                <div className="cp-card-title">{point.title}</div>
                <p className="cp-card-desc">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROGRAMME PRINCIPLES */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Beyond the Gift</div>
          <h2 className="cp-section-title">How to Run a Women&apos;s Day Programme That Does Not Feel Tokenistic</h2>
          <p className="cp-section-sub">
            The gift is the smallest part of a good programme. Three principles separate the
            ones employees appreciate from the ones they screenshot for the group chat.
          </p>
          <div className="cp-steps">
            {PROGRAMME_PRINCIPLES.map((principle, i) => (
              <div key={principle.title} className="cp-step">
                <div className="cp-step-num">{i + 1}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{principle.title}</div>
                  <div className="cp-step-desc">{principle.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Curated Products</div>
          <h2 className="cp-section-title">Browse Women&apos;s Day Gift Products</h2>
          <p className="cp-section-sub">
            Journals, drinkware, wellness items and hamper components that work for
            choice-based Women&apos;s Day programmes. Filter by price to fit your budget.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Women's Day Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80" alt="Thoughtfully wrapped Women's Day gifts for employees ready for March 8" loading="lazy" />
      </figure>

      {/* 8. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            The test for a Women&apos;s Day gift is simple: would it still be a good gift for
            any colleague you respect? If the answer is yes, wrap it. If the answer is
            &quot;well, she is a woman, so...&quot; - start over.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 9. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>March 8, 2026</div>
            <h2 className="cp-cta-title">Plan Your Women&apos;s Day<br />Programme</h2>
            <p className="cp-cta-sub">
              Tell us your headcount and budget - we will propose 2–3 choice-based gift
              options with personalisation, packed and delivered before March 8.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a Women's Day Quote"
              ctaLabel="Get Women's Day Quote"
              defaultOccasion="corporate_event"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="samples" />

      {/* 10. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Women's Day Gifts for Employees - Frequently Asked Questions"
          />
        </div>
      </section>

      {/* 11. RELATED LINKS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title">Related Guides</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Recognition', title: 'Employee Appreciation Gifts', href: '/guides/employee-appreciation-gifts' },
              { label: 'Employees', title: 'What to Gift Employees', href: '/guides/what-to-gift-employees' },
              { label: 'Occasions', title: 'Office Gift Ideas', href: '/guides/office-gift-ideas' },
              { label: 'Farewells', title: 'Farewell Gifts for Colleagues', href: '/guides/farewell-gifts-for-colleagues' },
              { label: 'Collection', title: 'All Corporate Gifts', href: '/collections/corporate-gifts' },
              { label: 'Stand Out', title: 'Unique Corporate Gifts', href: '/guides/unique-corporate-gifts' },
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
