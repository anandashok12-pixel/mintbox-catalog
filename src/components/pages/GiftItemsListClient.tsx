'use client'

import type { ReactNode } from 'react'
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

interface GiftItem {
  name: string
  price: string
  desc: string
}

interface GiftCategory {
  category: string
  eyebrow: string
  intro: ReactNode
  items: GiftItem[]
}

const GIFT_CATEGORIES: GiftCategory[] = [
  {
    category: "Drinkware",
    eyebrow: "Category 1 of 8 · 8 Items",
    intro: (
      <>
        Drinkware is the highest-usage corporate gift category - a good bottle or mug sits on a
        desk every single day. Browse ready-to-brand options in the{' '}
        <a href="/collections/drinkware">MintBox drinkware collection</a>.
      </>
    ),
    items: [
      { name: "Engraved Copper Water Bottle", price: "₹650–900", desc: "The classic milestone gift - engraves beautifully and lasts years." },
      { name: "Insulated Steel Tumbler", price: "₹450–800", desc: "Keeps chai hot through meetings; the most reordered drinkware item." },
      { name: "Ceramic Coffee Mug", price: "₹150–350", desc: "The budget staple - spend on print quality, not volume discounts." },
      { name: "Smart Temperature Bottle", price: "₹1,200–2,500", desc: "LED temperature display on the lid; the tech-wellness crossover gift." },
      { name: "Glass Sipper with Sleeve", price: "₹250–500", desc: "Clean, plastic-free look that suits health-conscious teams." },
      { name: "Travel French Press", price: "₹800–1,500", desc: "Brew-anywhere gift for the coffee-serious - memorable at modest cost." },
      { name: "Stainless Hip Flask-Style Bottle", price: "₹400–700", desc: "Slim pocket bottle for commuters; engraves well on the flat face." },
      { name: "Tea Infuser Bottle", price: "₹500–900", desc: "Built-in strainer for loose-leaf drinkers - pairs well with a tea sampler." },
    ],
  },
  {
    category: "Stationery",
    eyebrow: "Category 2 of 8 · 8 Items",
    intro: (
      <>
        Stationery stays the most cost-effective bulk category - useful, brandable, and light to
        ship. Most of these fit inside{' '}
        <a href="/guides/corporate-gifts-under-500">corporate gift budgets under ₹500</a>, or
        browse the <a href="/collections/stationery">stationery collection</a>.
      </>
    ),
    items: [
      { name: "A5 Hardcover Notebook", price: "₹150–400", desc: "The default corporate gift for a reason - everyone uses one eventually." },
      { name: "Metal Pen", price: "₹100–500", desc: "A decent metal pen outperforms three plastic ones; engrave, do not print." },
      { name: "Diary + Pen Gift Set", price: "₹400–900", desc: "The boxed combo that anchors welcome kits and year-end gifting." },
      { name: "Sticky-Note Desk Kit", price: "₹100–250", desc: "Cheap, cheerful, genuinely used - a great add-on item in kits." },
      { name: "Wooden Desk Organiser", price: "₹350–800", desc: "Keeps the logo on the desk without wearing it - tidy and premium-feeling." },
      { name: "Dated 2027 Planner", price: "₹300–700", desc: "The January gift - order by early December to land in week one." },
      { name: "Leather Journal", price: "₹600–1,200", desc: "The premium notebook tier for managers and client-facing teams." },
      { name: "Sticker + Washi Kit", price: "₹150–300", desc: "The fun culture-kit filler that new joiners photograph and post." },
    ],
  },
  {
    category: "Tech",
    eyebrow: "Category 3 of 8 · 7 Items",
    intro: (
      <>
        Tech has the highest daily-use rate of any gifting category when you choose practical
        items over gadget novelties. Our full{' '}
        <a href="/guides/electronic-corporate-gifts">electronic corporate gifts guide</a> ranks 15
        picks with branding and quality notes.
      </>
    ),
    items: [
      { name: "Wireless Earbuds", price: "₹800–2,500", desc: "The most-requested tech gift in employee surveys, year after year." },
      { name: "Power Bank (10,000 mAh)", price: "₹500–1,500", desc: "The bulk-gifting workhorse - useful to literally everyone." },
      { name: "Wireless Charging Pad", price: "₹600–1,200", desc: "Desk-bound daily use; pick 15W fast-charge models only." },
      { name: "Bluetooth Speaker", price: "₹700–2,000", desc: "Feels like a treat rather than office equipment - great for awards." },
      { name: "USB-C Hub", price: "₹400–900", desc: "Unglamorous, indispensable, and laser-engraves cleanly on aluminium." },
      { name: "Wireless Mouse + Pad Combo", price: "₹600–1,400", desc: "Tidy WFH bundle; the mousepad doubles as a large branding canvas." },
      { name: "Cable Organiser Kit", price: "₹300–600", desc: "The best tech gift under ₹600 - solves a daily annoyance." },
    ],
  },
  {
    category: "Bags",
    eyebrow: "Category 4 of 8 · 5 Items",
    intro: (
      <>
        Bags are walking brand real estate - a good backpack or tote gets carried for years.
        Every option here except the backpack fits comfortably in{' '}
        <a href="/guides/corporate-gifts-under-1000">gift budgets under ₹1,000</a>.
      </>
    ),
    items: [
      { name: "Laptop Backpack", price: "₹800–2,000", desc: "The welcome-kit anchor - spend on zips and straps, not extra pockets." },
      { name: "Canvas Tote Bag", price: "₹200–500", desc: "The event staple; screen-prints beautifully and replaces plastic bags." },
      { name: "Laptop Sleeve", price: "₹400–900", desc: "Slim, useful, and easy to size - felt or neoprene both brand well." },
      { name: "Travel Duffel", price: "₹700–1,500", desc: "The offsite gift that gets packed for every trip after." },
      { name: "Tech Organiser Pouch", price: "₹300–600", desc: "Holds cables, chargers, and dongles - pairs well with any tech gift." },
    ],
  },
  {
    category: "Wellness",
    eyebrow: "Category 5 of 8 · 6 Items",
    intro: (
      <>
        Wellness gifts say the company cares about the person, not just the output - which is why
        HR teams lean on them for recognition. See our{' '}
        <a href="/guides/employee-appreciation-gifts">employee appreciation gifts guide</a> for
        pairing them with written praise.
      </>
    ),
    items: [
      { name: "Self-Care Hamper", price: "₹1,200–2,500", desc: "Candle, skincare minis, herbal tea, and a journal in one box." },
      { name: "Yoga Mat", price: "₹500–1,200", desc: "A wellness-programme staple - print the logo on the carry strap, not the mat." },
      { name: "Aroma Diffuser", price: "₹600–1,400", desc: "A home-friendly gift that outlives every desk trinket." },
      { name: "Herbal Tea Sampler", price: "₹400–900", desc: "Six to eight blends in a wooden box - safe across all diets." },
      { name: "Massage Gun", price: "₹1,500–3,000", desc: "The premium wellness pick for milestone rewards and top performers." },
      { name: "Sleep Kit", price: "₹800–1,500", desc: "Eye mask, pillow mist, and chamomile tea - the thoughtful outlier people talk about." },
    ],
  },
  {
    category: "Edible",
    eyebrow: "Category 6 of 8 · 6 Items",
    intro: (
      <>
        Edible gifts are the zero-waste option - always welcome, always finished, no sizing or
        taste-in-décor risk. For assembled festive builds, browse the{' '}
        <a href="/collections/hampers">gift hampers collection</a>.
      </>
    ),
    items: [
      { name: "Dry-Fruit Gift Box", price: "₹500–1,500", desc: "The festival standard - family-shareable and courier-safe." },
      { name: "Artisan Chocolate Box", price: "₹300–900", desc: "The universal thank-you; pick dark-milk mixes for broad appeal." },
      { name: "Gourmet Snack Hamper", price: "₹600–1,500", desc: "Makhana, baked snacks, and dips - the modern replacement for sweets." },
      { name: "Filter Coffee Kit", price: "₹400–900", desc: "South Indian filter coffee powder with a traditional dabara set." },
      { name: "Healthy Snack Box", price: "₹350–800", desc: "Millet bars and trail mixes for wellness-aligned gifting." },
      { name: "Traditional Sweets Box", price: "₹300–800", desc: "Mysore Pak or regional classics - check shelf life for courier delivery." },
    ],
  },
  {
    category: "Eco-Friendly",
    eyebrow: "Category 7 of 8 · 5 Items",
    intro: (
      <>
        Eco gifts align gifting with sustainability commitments - increasingly a procurement
        requirement, not just a preference. See the full{' '}
        <a href="/collections/eco-friendly-gifts">eco-friendly gifts collection</a> for
        ready-to-order options.
      </>
    ),
    items: [
      { name: "Plantable Stationery Kit", price: "₹200–500", desc: "Seed-paper notebooks and pencils that grow when planted." },
      { name: "Bamboo Desk Set", price: "₹400–900", desc: "Organiser, pen stand, and coasters in sustainable bamboo." },
      { name: "Seed-Paper Greeting Cards", price: "₹50–150", desc: "The add-on that upgrades every gift into a statement." },
      { name: "Jute Tote Bag", price: "₹150–400", desc: "The plastic-free event bag - sturdy, cheap, and brandable." },
      { name: "Terracotta Planter with Sapling", price: "₹250–600", desc: "A living gift that doubles as a desk plant for years." },
    ],
  },
  {
    category: "Premium",
    eyebrow: "Category 8 of 8 · 5 Items",
    intro: (
      <>
        Premium items are for the moments that matter - VIP clients, leadership, and decade
        milestones. Our <a href="/guides/luxury-corporate-gifts">luxury corporate gifts guide</a>{' '}
        covers etiquette, compliance caps, and presentation for this tier.
      </>
    ),
    items: [
      { name: "Full-Grain Leather Portfolio", price: "₹2,000–4,500", desc: "The boardroom keeper - deboss initials, never the logo." },
      { name: "Luxury Curated Hamper", price: "₹3,000–8,000", desc: "Artisan contents in a rigid trunk box - the flexible flagship." },
      { name: "Premium Pen (Lamy/Parker tier)", price: "₹2,000–5,000", desc: "The oldest executive gift; present it in the original brand box." },
      { name: "Executive Desk Set", price: "₹2,500–6,000", desc: "Matched wood or leather pieces that live on a decision-maker's desk." },
      { name: "Bespoke Gift Trunk", price: "₹5,000–10,000+", desc: "Made-to-order curation around one recipient - the top of the range." },
    ],
  },
]

const SHORTLIST_STEPS = [
  {
    num: "1",
    title: "Fix the Budget Band First",
    desc: "Decide the per-head spend before browsing anything - it eliminates 80% of options instantly and stops scope creep. Most bulk programmes settle between ₹300 and ₹1,500 per recipient.",
  },
  {
    num: "2",
    title: "Match the Category to the Occasion",
    desc: "Edible for festivals, drinkware and stationery for onboarding, wellness for recognition, premium for clients and milestones. The occasion narrows eight categories to two.",
  },
  {
    num: "3",
    title: "Apply the Daily-Use Test",
    desc: "Between two finalists, pick the one recipients will touch every day. A ₹450 tumbler used daily beats a ₹900 showpiece in a drawer - visibility compounds.",
  },
  {
    num: "4",
    title: "Order Samples Before Committing",
    desc: "Photographs flatter. Get 2–3 physical samples, check build and branding quality, then place the bulk order. One week of patience prevents 200 units of regret.",
  },
]

const ALL_ITEMS_FLAT = GIFT_CATEGORIES.flatMap((c) => c.items)

const FAQ_ITEMS = [
  {
    q: "What are the most popular corporate gift items?",
    a: "The perennial top sellers are insulated bottles and tumblers (₹450–900), notebooks and diary sets (₹150–900), dry-fruit and chocolate boxes (₹300–1,500), power banks and earbuds (₹500–2,500), and laptop backpacks (₹800–2,000). Daily-use practicality beats novelty in every reorder data set.",
  },
  {
    q: "What are the cheapest corporate gift items for bulk orders?",
    a: "Reliable bulk items under ₹300: ceramic mugs (₹150–350), metal pens (₹100–500), sticky-note kits (₹100–250), jute totes (₹150–400), and seed-paper cards (₹50–150). At 25–100 units these typically land 10–20% below single-unit rates.",
  },
  {
    q: "Which corporate gift items are available under ₹500?",
    a: "Plenty - mugs, pens, notebooks, canvas totes, sticky-note kits, glass sippers, plantable stationery, and terracotta planters all sit under ₹500. Our dedicated <a href=\"/guides/corporate-gifts-under-500\">corporate gifts under ₹500 guide</a> ranks the best of them with bulk pricing notes.",
  },
  {
    q: "What corporate gift items are trending in 2026?",
    a: "Four clear 2026 trends: eco-friendly items (plantable kits, bamboo sets) driven by sustainability mandates, smart drinkware and practical tech, wellness kits tied to recognition programmes, and regional artisan items like filter coffee kits and handcrafted décor that carry a story generic merchandise cannot.",
  },
  {
    q: "Does MintBox stock all these gift item categories?",
    a: "Most of them. The MintBox catalog carries 200+ curated products across drinkware, stationery, tech, bags, wellness, edible, eco, and premium categories, with in-house branding, MOQ 10, GST invoicing, and pan-India delivery from Bangalore. Quotes within 24 hours.",
  },
]

export default function GiftItemsListClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "Corporate Gift Items List", "item": "https://themintbox.in/guides/corporate-gift-items-list" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Corporate Gift Items List: 50 Ideas by Budget & Category (2026)",
        "description": "The complete corporate gift items list - 50 ideas across drinkware, stationery, tech, bags, wellness, edible, eco, and premium, each with price ranges.",
        "url": "https://themintbox.in/guides/corporate-gift-items-list",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Corporate Gift Items List: 50 Ideas by Budget & Category",
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
              <span className="cp-breadcrumb-current">Corporate Gift Items List</span>
            </nav>
            <div className="cp-hero-eyebrow">The Master List · 8 Categories · 2026</div>
            <h1 className="cp-hero-title">
              Corporate Gift Items List:<br />
              <em>50 Ideas by Budget & Category (2026)</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              The complete corporate gift items list for 2026 - 50 ideas across drinkware,
              stationery, tech, bags, wellness, edible, eco, and premium categories, every one
              with a realistic bulk ₹ price range. Bookmark this page; it replaces the spreadsheet.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">Jump to the 50 Items ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 50 items, 8 categories</span>
              <span className="cp-hero-badge">✓ ₹ range on every item</span>
              <span className="cp-hero-badge">✓ MOQ 10 units</span>
              <span className="cp-hero-badge">✓ GST invoicing</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80" alt="Corporate gift items list options wrapped and ready for bulk orders" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80" alt="Packages of corporate gift items prepared for delivery" className="cp-hero-img-actual" loading="lazy" />
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
            content="The most reliable corporate gift items fall into 8 categories: drinkware (₹150–2,500), stationery (₹100–1,200), tech (₹300–2,500), bags (₹200–2,000), wellness (₹400–3,000), edibles (₹300–1,500), eco items (₹50–900), and premium gifts (₹2,000–10,000+). Top single picks: insulated tumblers, notebooks, power banks, dry-fruit boxes, and laptop backpacks."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ gifts delivered since 2019",
              "200+ curated products across all 8 categories",
              "In-house branding and personalisation",
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
              <div className="cp-stat-value">200+</div>
              <div className="cp-stat-label">Curated Products</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">48hr</div>
              <div className="cp-stat-label">Express Turnaround</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 50-ITEM LIST — 8 CATEGORY SECTIONS */}
      {(() => {
        let counter = 0
        return GIFT_CATEGORIES.map((cat, ci) => {
          const start = counter
          counter += cat.items.length
          return (
            <section
              key={cat.category}
              id={ci === 0 ? 'list' : undefined}
              className={`cp-section ${ci % 2 === 0 ? 'cp-section--cream' : 'cp-section--white'}`}
            >
              <div className="cp-container">
                <div className="cp-section-eyebrow">{cat.eyebrow}</div>
                <h2 className="cp-section-title">
                  {cat.category} Gift Items ({start + 1}–{start + cat.items.length})
                </h2>
                <p className="cp-section-sub">{cat.intro}</p>
                <div className="cp-card-grid cp-card-grid--2">
                  {cat.items.map((item, i) => (
                    <div key={item.name} className="cp-card">
                      <div className="cp-card-title">
                        {start + i + 1}. {item.name}
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
          )
        })
      })()}

      {/* 5. SHORTLIST FRAMEWORK */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Decision Framework</div>
          <h2 className="cp-section-title">How to Shortlist From 50 Items to 1</h2>
          <p className="cp-section-sub">
            Fifty options cause paralysis without a filter. This four-step framework gets most
            teams to a decision in one meeting - and our full{' '}
            <a href="/guides/how-to-choose-corporate-gifts">guide to choosing corporate gifts</a>{' '}
            goes deeper on each step.
          </p>
          <div className="cp-steps">
            {SHORTLIST_STEPS.map((item) => (
              <div key={item.num} className="cp-step">
                <div className="cp-step-num">{item.num}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{item.title}</div>
                  <div className="cp-step-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Live Catalog</div>
          <h2 className="cp-section-title">Browse Corporate Gift Items in Stock</h2>
          <p className="cp-section-sub">
            The list above, made real - filter the live catalog by price and category to build
            your shortlist.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Corporate Gift Items"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80" alt="Assorted corporate gift items from the 50-idea list wrapped for gifting" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            Every gifting programme we have seen succeed started the same way: a budget band, an
            occasion, and the daily-use test. The item almost picks itself after that.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Bulk Gifting</div>
            <h2 className="cp-cta-title">Turn Your Shortlist<br />Into a Quote</h2>
            <p className="cp-cta-sub">
              Tell us the items, quantities, and budget band - we will confirm availability,
              branding options, and pricing within {QUOTE_TIME}.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Bulk Items Quote"
              ctaLabel="Get Gift Items Quote"
              defaultOccasion="other"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="catalog" />

      {/* 9. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Corporate Gift Items - Frequently Asked Questions"
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
              { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
              { label: 'Framework', title: 'How to Choose Corporate Gifts', href: '/guides/how-to-choose-corporate-gifts' },
              { label: 'By Occasion', title: 'Office Gift Ideas for Every Occasion', href: '/guides/office-gift-ideas' },
              { label: 'Tech', title: 'Electronic Corporate Gifts', href: '/guides/electronic-corporate-gifts' },
              { label: 'Budget', title: 'Corporate Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
              { label: 'Premium', title: 'Luxury Corporate Gifts', href: '/guides/luxury-corporate-gifts' },
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
