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

const ESSENTIALS = [
  {
    name: "ID Card + Branded Lanyard",
    price: "₹80–150",
    desc: "The one item a new joinee uses from minute one. A well-printed lanyard in brand colours reads as organised; a plain string reads as an afterthought. Get the name spelling confirmed before day 1.",
  },
  {
    name: "Welcome Letter from Leadership",
    price: "₹20–50 printed",
    desc: "A one-page letter signed by the founder or department head. It costs almost nothing and is the item new hires photograph and post most often. Personalise the name - a mail-merge blank is worse than no letter.",
  },
  {
    name: "Hardbound Notebook",
    price: "₹150–350",
    desc: "An A5 hardbound notebook with a subtle logo emboss. New joinees take notes constantly in week one, so this gets used immediately - which is exactly what you want from kit contents.",
  },
  {
    name: "Metal or Premium Pen",
    price: "₹60–200",
    desc: "Pair it with the notebook. A metal-bodied pen with laser engraving feels substantial; a plastic promotional pen undercuts the rest of the kit. One good pen beats three cheap ones.",
  },
  {
    name: "Branded T-shirt or Hoodie",
    price: "₹250–800",
    desc: "The single most requested joining kit item in tech and startup teams. Collect sizes during offer acceptance, not on day 1 - a wrong-size tee is the most common kit complaint.",
  },
  {
    name: "Insulated Water Bottle",
    price: "₹300–650",
    desc: "A stainless steel or copper bottle with the employee's name engraved travels from desk to gym to home. Name engraving turns a standard bottle into the keepsake of the kit.",
  },
]

const COMFORT = [
  {
    name: "Ceramic Coffee Mug",
    price: "₹120–300",
    desc: "A sturdy ceramic mug with the logo or a culture line ('Day 1 of many'). It lives on the desk permanently and doubles as passive branding on every video call.",
  },
  {
    name: "Desk Plant or Succulent",
    price: "₹150–400",
    desc: "A small succulent or money plant in a branded planter softens a bare new desk instantly. Low-maintenance varieties only - nobody wants to kill a plant in week two.",
  },
  {
    name: "Snack Box for Day 1",
    price: "₹200–500",
    desc: "A small box of dry fruits, cookies, or healthy snacks for the first day. It is the most consumed item in any kit and gives the new hire something to share with their pod.",
  },
  {
    name: "Tote Bag or Backpack",
    price: "₹250–1,200",
    desc: "Practical at both ends of the range: a canvas tote carries the kit home on day 1; a laptop backpack becomes daily-commute gear. This is also the item that makes the kit feel complete when handed over.",
  },
]

const CULTURE = [
  {
    name: "Sticker Pack",
    price: "₹50–150",
    desc: "Die-cut stickers of the logo, mascot, and internal jokes. Cheap to produce, disproportionately loved - they end up on laptops, bottles, and desks, spreading brand identity organically.",
  },
  {
    name: "Culture Handbook or Values Card",
    price: "₹100–300",
    desc: "A short, well-designed booklet covering values, rituals, and 'how we work here'. Keep it under 20 pages - a designed card set beats a 60-page PDF printout every time.",
  },
  {
    name: "Handwritten Buddy Note",
    price: "Free–₹50",
    desc: "A short note from the assigned onboarding buddy: 'Ask me anything, coffee's on me this week.' The lowest-cost item in the kit and consistently the most remembered one.",
  },
  {
    name: "First-Week Schedule Card",
    price: "₹30–80",
    desc: "A printed card laying out day 1 to day 5: intro meetings, tool setup, team lunch. It converts first-week anxiety into a plan, which is what good onboarding actually is.",
  },
  {
    name: "Small Tech Item",
    price: "₹300–900",
    desc: "A cable organiser, phone stand, or USB hub. One useful tech accessory lifts the whole kit's perceived value - available in the MintBox catalog from ₹300 with logo branding included.",
  },
]

const BUDGET_TIERS = [
  {
    tier: "₹800 Starter Kit",
    contents: "Lanyard, welcome letter, notebook, pen, sticker pack, snack box",
    note: "Covers every essential a joinee touches on day 1. Best for high-volume hiring where consistency matters more than wow factor.",
  },
  {
    tier: "₹1,500 Standard Kit",
    contents: "Everything in Starter + branded T-shirt, ceramic mug, culture handbook, buddy note",
    note: "The most common configuration among MintBox startup and tech clients - apparel plus culture items is where kits start feeling personal.",
  },
  {
    tier: "₹3,000 Premium Kit",
    contents: "Everything in Standard + engraved bottle, laptop backpack, desk plant, tech accessory",
    note: "For leadership hires or employer-brand-led teams. Name engraving and a quality backpack turn the kit into a retention signal, not just stationery.",
  },
]

const DAY1_CHECKLIST = [
  "ID card + lanyard printed with correct name spelling",
  "Welcome letter signed (not photocopied signature)",
  "T-shirt/hoodie in confirmed size",
  "Notebook + pen placed on top of the box",
  "Water bottle engraved (if personalised)",
  "Snack box within expiry, courier-safe if remote",
  "Buddy note written and signed",
  "First-week schedule card matches actual calendar",
  "Kit assembled and at the desk BEFORE the joinee arrives",
]

const FAQ_ITEMS = [
  {
    q: "What goes in an employee joining kit?",
    a: "A complete joining kit has three layers: essentials (ID + lanyard, welcome letter, notebook, pen, branded T-shirt, water bottle), comfort items (mug, desk plant, snack box, tote or backpack), and culture items (sticker pack, culture handbook, buddy note, first-week schedule card, one small tech accessory). Fifteen items total covers all three - see our <a href=\"/collections/employee-welcome-kit\">welcome kit collection</a> for ready-made options.",
  },
  {
    q: "How much does an onboarding kit cost per employee?",
    a: "In India, joining kits typically run ₹800–3,000 per employee. A ₹800 starter kit covers essentials only; ₹1,500 adds apparel and culture items; ₹3,000 adds engraved drinkware and a laptop backpack. Most companies hiring at volume settle in the ₹1,200–1,800 band.",
  },
  {
    q: "When should the joining kit be handed over?",
    a: "On the desk before the employee arrives on day 1 - never couriered 'sometime in week one'. For remote hires, ship the kit to reach 2–3 days before the joining date so it is unboxed on camera during the welcome call. Late kits lose most of their effect.",
  },
  {
    q: "Should joining kit items be branded or unbranded?",
    a: "Brand the identity items (T-shirt, lanyard, stickers, notebook) and keep personal-use items subtle - a small engraved name on the bottle beats a large logo. Over-branding every item makes the kit feel like marketing inventory rather than a <a href=\"/guides/corporate-gifts-for-new-employees\">gift for a new employee</a>.",
  },
  {
    q: "Can MintBox assemble and deliver complete joining kits?",
    a: "Yes. MintBox curates, brands, assembles, and ships complete joining kits from Bangalore - MOQ 10 kits, quote within 24 hours, standard turnaround 3–5 business days (48-hour express possible). Remote-employee kits can be shipped pan-India to individual addresses.",
  },
]

export default function JoiningKitClient({ products, categories }: Props) {
  const allItems = [...ESSENTIALS, ...COMFORT, ...CULTURE]
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "Employee Joining Kit", "item": "https://themintbox.in/guides/employee-joining-kit" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Employee Joining Kit: 15 Must-Have Items + Checklist (2026)",
        "description": "The complete employee joining kit checklist - 15 must-have items across essentials, comfort, and culture tiers, with budget tiers from ₹800 to ₹3,000.",
        "url": "https://themintbox.in/guides/employee-joining-kit",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Employee Joining Kit: 15 Must-Have Items",
        "itemListElement": allItems.map((item, i) => ({
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
              <span className="cp-breadcrumb-current">Employee Joining Kit</span>
            </nav>
            <div className="cp-hero-eyebrow">Onboarding · Welcome Kits</div>
            <h1 className="cp-hero-title">
              Employee Joining Kit: 15 Must-Have Items<br />
              <em>+ the Day-1 Checklist (2026)</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              A joining kit is the first physical thing a new hire receives from your company - and
              most kits get it half right. Here are the 15 items every employee joining kit needs,
              organised in three tiers, with real ₹ prices and a copyable day-1 checklist.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See the 15 Items ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Kit Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Kits from ₹800</span>
              <span className="cp-hero-badge">✓ MOQ 10 kits</span>
              <span className="cp-hero-badge">✓ In-house assembly</span>
              <span className="cp-hero-badge">✓ Pan-India shipping</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80" alt="Employee joining kit items laid out on a new hire's desk" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80" alt="Branded welcome kit boxes wrapped and ready for day one" className="cp-hero-img-actual" loading="lazy" />
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
            content="An employee joining kit needs 15 items in three tiers: essentials (ID + lanyard, welcome letter, notebook, pen, branded T-shirt, water bottle), comfort (mug, desk plant, snack box, tote/backpack), and culture (stickers, culture handbook, buddy note, first-week schedule card, small tech item). Budget ₹800–3,000 per kit; hand it over on the desk before day 1."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ gifts and kits delivered since 2019",
              "In-house branding, engraving, and kit assembly",
              "MOQ 10 kits, quote within 24 hours",
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
              <div className="cp-stat-label">Clients Onboarding With Us</div>
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

      {/* 4. TIER 1 — ESSENTIALS */}
      <section id="list" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Tier 1 of 3 · Items 1–6</div>
          <h2 className="cp-section-title">Employee Joining Kit Essentials: The Non-Negotiables</h2>
          <p className="cp-section-sub">
            If the kit has only six items, it has these. Every item here gets used in the first
            week - which is the real test of a joining kit.
          </p>
          <div className="cp-steps">
            {ESSENTIALS.map((item, i) => (
              <div key={item.name} className="cp-step">
                <div className="cp-step-num">{i + 1}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">
                    {item.name}
                    <span style={{ marginLeft: '12px', fontSize: '0.85em', fontWeight: 400, color: 'var(--forest-green, #1B4D3E)', opacity: 0.75 }}>
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

      {/* 5. TIER 2 — COMFORT */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Tier 2 of 3 · Items 7–10</div>
          <h2 className="cp-section-title">Comfort Items: Making the New Desk Feel Lived-In</h2>
          <p className="cp-section-sub">
            These four items do the emotional work - they turn an empty desk into "my desk"
            within the first hour.
          </p>
          <div className="cp-steps">
            {COMFORT.map((item, i) => (
              <div key={item.name} className="cp-step">
                <div className="cp-step-num">{i + 7}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">
                    {item.name}
                    <span style={{ marginLeft: '12px', fontSize: '0.85em', fontWeight: 400, color: 'var(--forest-green, #1B4D3E)', opacity: 0.75 }}>
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

      {/* 6. TIER 3 — CULTURE */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Tier 3 of 3 · Items 11–15</div>
          <h2 className="cp-section-title">Culture Items: What Makes Your Kit Yours</h2>
          <p className="cp-section-sub">
            Any vendor can supply a notebook and a mug. These five items are what a new hire cannot
            buy anywhere else - and they cost the least of the whole kit.
          </p>
          <div className="cp-steps">
            {CULTURE.map((item, i) => (
              <div key={item.name} className="cp-step">
                <div className="cp-step-num">{i + 11}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">
                    {item.name}
                    <span style={{ marginLeft: '12px', fontSize: '0.85em', fontWeight: 400, color: 'var(--forest-green, #1B4D3E)', opacity: 0.75 }}>
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

      {/* 7. BUDGET TIERS + CHECKLIST */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Budgeting</div>
          <h2 className="cp-section-title">Joining Kit Budget Tiers: ₹800 / ₹1,500 / ₹3,000</h2>
          <p className="cp-section-sub">
            What actually changes as the budget grows - and where each tier makes sense. Ready-made
            versions of all three are in the{' '}
            <a href="/collections/employee-welcome-kit">MintBox employee welcome kit collection</a>.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {BUDGET_TIERS.map((tier) => (
              <div key={tier.tier} className="cp-card">
                <div className="cp-card-title">{tier.tier}</div>
                <p className="cp-card-desc"><strong>Contents:</strong> {tier.contents}</p>
                <p className="cp-card-desc" style={{ marginTop: '8px', fontStyle: 'italic', opacity: 0.85 }}>{tier.note}</p>
              </div>
            ))}
            <div className="cp-card">
              <div className="cp-card-title">Copy This: The Day-1 Checklist</div>
              {DAY1_CHECKLIST.map((line) => (
                <p key={line} className="cp-card-desc" style={{ marginBottom: '4px' }}>☐ {line}</p>
              ))}
            </div>
          </div>
          <p className="cp-section-sub" style={{ marginTop: '24px' }}>
            A note on assembly: the hidden cost of joining kits is not the items - it is collating
            15 items into 40 boxes the night before a joining cohort. Budget for assembly and
            fulfilment (or use a vendor who includes it), and collect T-shirt sizes at offer
            acceptance so nothing blocks the pack-out.
          </p>
        </div>
      </section>

      {/* 8. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Kit Components</div>
          <h2 className="cp-section-title">Browse Joining Kit Products</h2>
          <p className="cp-section-sub">
            Every product below can go into a custom joining kit - filter by price to build your
            tier.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Joining Kit Products"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" alt="Modern office where employee joining kits are placed at new hire desks" loading="lazy" />
      </figure>

      {/* 9. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            A new hire decides how they feel about your company in the first week. The joining kit
            is the only part of that week you can fully control in advance - so control it.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 10. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Joining Kits</div>
            <h2 className="cp-cta-title">Build Your<br />Joining Kit</h2>
            <p className="cp-cta-sub">
              Tell us your hiring volume, budget tier, and joining dates - we will send a
              per-kit quote with mockups within {QUOTE_TIME}. Assembly and pan-India shipping included.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a Joining Kit Quote"
              ctaLabel="Get Kit Quote"
              defaultOccasion="welcome_kit"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="samples" />

      {/* 11. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Employee Joining Kits - Frequently Asked Questions"
          />
        </div>
      </section>

      {/* 12. RELATED LINKS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title">Related Guides</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Collection', title: 'Employee Welcome Kits', href: '/collections/employee-welcome-kit' },
              { label: 'Onboarding', title: 'Corporate Gifts for New Employees', href: '/guides/corporate-gifts-for-new-employees' },
              { label: 'Startups', title: 'Gifting for Startups', href: '/industry-solutions/startups' },
              { label: 'Employee Gifts', title: 'What to Gift Employees', href: '/guides/what-to-gift-employees' },
              { label: 'Tech Teams', title: 'Gifting for Tech Companies', href: '/industry-solutions/tech-companies' },
              { label: 'Occasions', title: 'Office Gift Ideas', href: '/guides/office-gift-ideas' },
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
