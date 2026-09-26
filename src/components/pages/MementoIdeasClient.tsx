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

const MEMENTO_IDEAS = [
  {
    name: 'Crystal Awards',
    price: '₹800–2,500',
    desc: 'The ceremony classic - laser-etched crystal catches stage lighting and photographs beautifully, which matters because award photos outlive the event. Best for annual-day top honours and client appreciation. Order sturdy presentation boxes; crystal handed over in bubble wrap undoes the effect.',
  },
  {
    name: 'Wooden Plaques',
    price: '₹500–1,500',
    desc: 'Warm, durable, and increasingly the sustainable-choice signal at corporate events. Engraved sheesham or engineered-wood plaques suit long-service awards and speaker felicitations. They also age better on office walls than acrylic ever does.',
  },
  {
    name: 'Acrylic Trophies',
    price: '₹400–1,200',
    desc: 'The volume workhorse - light, shatterproof, and printable in full colour, making them the practical pick when you need 50 identical sales-contest trophies. Modern cut-out shapes have shed the cheap look acrylic had a decade ago.',
  },
  {
    name: 'Engraved Metal Desk Mementos',
    price: '₹600–1,500',
    desc: 'Brushed steel or brass paperweights, card holders, and desk bars engraved with a name and milestone. They live on the desk in daily view rather than in a drawer - the entire point of a memento. Strong choice for promotions.',
  },
  {
    name: 'Photo-Frame Mementos',
    price: '₹400–1,000',
    desc: 'A framed team photo or event still with an engraved title plate. The emotional pick for farewells and project-completion mementos - the photo does the remembering for you. Print at proper resolution; a pixelated memory is worse than none.',
  },
  {
    name: 'Eco Plantable Mementos',
    price: '₹300–800',
    desc: 'Seed-paper certificates, mementos with embedded saplings, or engraved bamboo blocks. They align the award with sustainability goals and give ESG-conscious companies a story to tell on stage. Best for CSR events and green-initiative recognitions.',
  },
  {
    name: 'Medal Sets for Sports Days',
    price: '₹150–400 per medal',
    desc: 'Gold-silver-bronze sets with printed ribbons for corporate sports days, marathons, and hackathons. Buy 10–15% extra - team events always surface an unplanned category. Custom ribbon text costs little and lifts the whole set.',
  },
  {
    name: 'Caricature and Custom Art Awards',
    price: '₹800–2,000',
    desc: 'A commissioned caricature or illustrated award mounted on wood or acrylic - the memento people actually laugh, gasp, and post about. Ideal for fun categories at annual days and personality awards. Allow 1–2 weeks for the artwork itself.',
  },
  {
    name: 'LED Display Mementos',
    price: '₹1,200–2,500',
    desc: 'Edge-lit acrylic on an LED base that glows with the engraved design - the contemporary pick for tech-company awards and product-launch commemorations. It doubles as desk decor, which keeps the memento visibly alive after the event.',
  },
  {
    name: 'Personalised Nameplates',
    price: '₹500–1,200',
    desc: 'An engraved wood-and-brass desk nameplate marking a promotion or new role. It is a memento disguised as office furniture - used every single day and quietly prestigious. A favourite for manager-level promotion gifts.',
  },
  {
    name: 'Milestone Shields',
    price: '₹700–1,800',
    desc: 'The traditional shield format for 5, 10, and 15-year service milestones - familiar, formal, and photograph-ready at felicitation ceremonies. Pair with a personal gift so the recipient gets both a symbol and something they will use.',
  },
  {
    name: 'Premium Boxed Medallions',
    price: '₹1,500–3,500',
    desc: 'A die-struck metal medallion in a velvet-lined presentation box - the gravitas option for founder felicitations, chief-guest honours, and landmark company anniversaries. The unboxing is the ceremony; invest in the box accordingly.',
  },
]

const OCCASION_CARDS = [
  {
    idea: 'Annual Day',
    desc: 'Crystal awards for top honours, acrylic trophies for volume categories, caricature awards for the fun ones. Mix formats by category weight so the big awards feel visibly bigger.',
  },
  {
    idea: 'Sales Awards',
    desc: 'Engraved metal desk mementos and LED display pieces - objects that sit in daily view and quietly remind the floor who hit the number. Pair with an appreciation gift for the top tier.',
  },
  {
    idea: 'Promotions',
    desc: 'Personalised nameplates and metal desk mementos - a memento that marks the new role every day. Presented by the manager in front of the team, not couriered.',
  },
  {
    idea: 'Farewells',
    desc: 'Photo-frame mementos and milestone shields carrying years of service. Combine with ideas from our farewell gifts guide so the keepsake comes with something personal.',
  },
  {
    idea: 'Event Speakers and Chief Guests',
    desc: 'Premium boxed medallions, wooden plaques, or eco plantable mementos - portable, dignified, and airline-luggage-safe. Engrave the event name and date, never just the company logo.',
  },
]

const INSCRIPTION_LINES = [
  {
    idea: 'Long-Service Milestone',
    desc: '"Ten years of showing up, stepping up, and lifting everyone around you. With gratitude - [Company], 2016–2026."',
  },
  {
    idea: 'Sales / Performance Award',
    desc: '"Highest Peak, FY 2025–26. Awarded to [Name], who made the impossible number look inevitable."',
  },
  {
    idea: 'Farewell Memento',
    desc: '"For [Name] - every team you join gets luckier. Thank you for [Years] remarkable years. Team [Company]."',
  },
  {
    idea: 'Speaker / Chief Guest',
    desc: '"In appreciation of [Name], for insight generously shared. [Event Name], Bangalore, 2026."',
  },
  {
    idea: 'Project Completion',
    desc: '"Project [Name] - delivered. To the team that built it: this one is yours. [Company], 2026."',
  },
]

const FAQ_ITEMS = [
  {
    q: 'What are good memento ideas for an annual day function?',
    a: 'For annual days, use a mix: crystal awards (₹800–2,500) for top honours, acrylic trophies (₹400–1,200) for volume categories like team awards, and caricature or custom art awards (₹800–2,000) for fun categories. Engrave the winner name, category, and year on each - undated mementos lose their meaning within months.',
  },
  {
    q: 'How much do corporate mementos cost?',
    a: 'Corporate mementos in India typically run ₹300–800 for eco and photo-frame options, ₹400–1,200 for acrylic trophies, ₹500–1,500 for wooden plaques, ₹800–2,500 for crystal awards, and ₹1,500–3,500 for premium boxed medallions. Bulk orders of 25+ units usually bring per-piece costs down 15–30% versus retail.',
  },
  {
    q: 'What engraving options are available for mementos?',
    a: 'Laser engraving works on wood, metal, glass, and acrylic and is the standard for names and logos; UV printing adds full-colour artwork on acrylic and metal; etching gives crystal its frosted premium finish. Keep inscriptions under 20 words - name, achievement, date - and always proof a digital mockup before the batch runs.',
  },
  {
    q: 'What is the bulk timeline for corporate mementos and awards?',
    a: 'Standard bulk turnaround is 3–5 business days after artwork approval, with 48-hour express possible for simpler formats like acrylic and wooden plaques. Add 1–2 weeks for custom artwork such as caricature awards. For an annual day, lock winner names at least one week before the event - engraving is the step you cannot rush on the morning of.',
  },
  {
    q: 'Can MintBox produce engraved mementos in bulk?',
    a: 'Yes. MintBox produces engraved mementos and awards with in-house engraving and personalisation - MOQ 10 units, digital proofs before production, 3–5 business day standard turnaround (48-hour express available), GST-compliant invoicing, and pan-India delivery from Bangalore. Quotes come back within 24 hours.',
  },
]

export default function MementoIdeasClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "Corporate Memento Ideas", "item": "https://themintbox.in/guides/corporate-memento-ideas" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "12 Corporate Memento & Award Ideas for Events",
        "description": "12 corporate memento and award ideas for annual days, sales awards, and farewells - crystal, wood, acrylic, and eco options with prices and engraving tips.",
        "url": "https://themintbox.in/guides/corporate-memento-ideas",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "12 Corporate Memento & Award Ideas",
        "itemListElement": MEMENTO_IDEAS.map((item, i) => ({
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
              <span className="cp-breadcrumb-current">Corporate Memento Ideas</span>
            </nav>
            <div className="cp-hero-eyebrow">Awards · Events · Recognition · 2026</div>
            <h1 className="cp-hero-title">
              12 Corporate Memento &amp; Award Ideas<br />
              <em>For Annual Days, Awards &amp; Milestones</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              The right corporate memento outlives the event - it sits on a desk for years telling
              everyone who walks past what its owner achieved. Here are 12 memento ideas from
              ₹150 medals to ₹3,500 boxed medallions, mapped to occasions, with engraving lines
              that actually read well and the lead times to plan around.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See All 12 Ideas ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get an Awards Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Crystal, wood, acrylic &amp; eco</span>
              <span className="cp-hero-badge">✓ In-house engraving</span>
              <span className="cp-hero-badge">✓ Digital proof before production</span>
              <span className="cp-hero-badge">✓ 48hr express available</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80" alt="Corporate memento and award presentation at a company event" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&w=800&q=80" alt="Planning engraved corporate mementos for an annual day" className="cp-hero-img-actual" loading="lazy" />
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
            content="The best corporate memento ideas by occasion: crystal awards (₹800–2,500) for annual-day honours, acrylic trophies (₹400–1,200) for volume categories, wooden plaques (₹500–1,500) for long service, engraved metal desk mementos (₹600–1,500) for promotions, and premium boxed medallions (₹1,500–3,500) for chief guests. Engrave name, achievement, and date - and allow 3–5 business days after artwork approval."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ gifts and awards delivered since 2019",
              "In-house engraving and personalisation",
              "Digital proofs approved before every batch",
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
          <h2 className="cp-section-title">12 Corporate Memento Ideas, Ranked by Versatility</h2>
          <p className="cp-section-sub">
            Every format below is bulk-friendly and engravable. Prices are per piece at typical
            corporate quantities (minimum order 10 units).
          </p>
          <div className="cp-steps">
            {MEMENTO_IDEAS.map((item, i) => (
              <div key={item.name} className="cp-step">
                <div className="cp-step-num">{i + 1}</div>
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
                  <div className="cp-step-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OCCASION MAPPING */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">By Occasion</div>
          <h2 className="cp-section-title">Which Memento for Which Occasion</h2>
          <p className="cp-section-sub">
            Format follows occasion. A caricature award lands at an annual day and dies at a
            felicitation - here is the quick mapping.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {OCCASION_CARDS.map((item) => (
              <div key={item.idea} className="cp-card">
                <div className="cp-card-title">{item.idea}</div>
                <p className="cp-card-desc">
                  {item.idea === 'Farewells' ? (
                    <>
                      Photo-frame mementos and milestone shields carrying years of service. Combine
                      with ideas from our{' '}
                      <a href="/guides/farewell-gifts-for-colleagues">farewell gifts for colleagues</a>{' '}
                      guide so the keepsake comes with something personal.
                    </>
                  ) : item.idea === 'Sales Awards' ? (
                    <>
                      Engraved metal desk mementos and LED display pieces - objects that sit in
                      daily view and quietly remind the floor who hit the number. Pair with an{' '}
                      <a href="/guides/employee-appreciation-gifts">employee appreciation gift</a>{' '}
                      for the top tier.
                    </>
                  ) : (
                    item.desc
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INSCRIPTION LINES */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Engraving Copy</div>
          <h2 className="cp-section-title">Five Inscription Lines That Actually Read Well</h2>
          <p className="cp-section-sub">
            Most memento inscriptions are written in a hurry the week of the event. Steal these
            instead - keep it under 20 words, name the achievement, and always include the year.
            For tenure-based inscriptions, our{' '}
            <a href="/guides/work-anniversary-gifts">work anniversary gifts</a> guide covers
            milestone wording by year. Standard engraving adds no extra lead time at MintBox;
            custom artwork adds 1–2 weeks.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {INSCRIPTION_LINES.map((item) => (
              <div key={item.idea} className="cp-card">
                <div className="cp-card-title">{item.idea}</div>
                <p className="cp-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Awards &amp; Keepsakes</div>
          <h2 className="cp-section-title">Browse Memento &amp; Award Products</h2>
          <p className="cp-section-sub">
            Curated products that work as corporate mementos, awards, and event keepsakes - filter
            by price to match your award tiers.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Corporate Mementos"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Office shelf displaying engraved corporate mementos and awards" loading="lazy" />
      </figure>

      {/* 8. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            A trophy without a name and a date is decor. Engrave who, what, and when - and the
            memento keeps doing its job on that desk for the next decade.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 9. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Event Awards</div>
            <h2 className="cp-cta-title">Awards for Your<br />Next Event, Sorted</h2>
            <p className="cp-cta-sub">
              Share your event date, award categories, and winner count - we will send format
              options, digital proofs, and a production timeline that comfortably beats your
              ceremony date.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Memento Quote"
              ctaLabel="Get Awards Quote"
              defaultOccasion="corporate_event"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="whatsapp" />

      {/* 10. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Corporate Mementos - Frequently Asked Questions"
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
              { label: 'Milestones', title: 'Work Anniversary Gifts', href: '/guides/work-anniversary-gifts' },
              { label: 'Recognition', title: 'Employee Appreciation Gifts', href: '/guides/employee-appreciation-gifts' },
              { label: 'Farewells', title: 'Farewell Gifts for Colleagues', href: '/guides/farewell-gifts-for-colleagues' },
              { label: 'Events', title: 'Office Inauguration Gifts', href: '/guides/office-inauguration-gifts' },
              { label: 'Standout', title: 'Unique Corporate Gifts', href: '/guides/unique-corporate-gifts' },
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
