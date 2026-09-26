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

const GIFT_BANDS = [
  {
    id: 'under-500',
    eyebrow: 'Budget Band 1',
    title: 'Farewell Gifts Under ₹500',
    sub: 'The individual-contribution tier. These work when one person is gifting, or when a large team wants everyone to hand over something small. Nothing here feels cheap if it is chosen for the person, not the price.',
    items: [
      {
        name: 'Team-Signed Card + Photo Frame',
        price: '₹250–450',
        desc: 'The card carries the emotional weight; the frame gives it a permanent home on their next desk. Get every teammate to write one specific memory, not just “all the best”. Suits literally everyone - this is the one farewell gift with a 100% keep rate.',
      },
      {
        name: 'Succulent in a Ceramic Planter',
        price: '₹200–400',
        desc: 'A living gift that says “grow where you go” without the greeting-card cheese. Succulents survive the commute to a new office and weeks of new-job neglect. Best for colleagues who kept a tidy, personal desk.',
      },
      {
        name: 'Premium Chocolate Box',
        price: '₹300–500',
        desc: 'The safest last-minute option that still lands well - pick a proper brand, not a supermarket assortment. Works when you barely know the person but want to mark the moment. Pair it with a handwritten note to lift it above the default.',
      },
      {
        name: 'Engraved Metal Pen',
        price: '₹250–450',
        desc: 'Name-engraved, it stops being stationery and becomes a keepsake they will sign their new offer letter with. Engraving typically adds 1–2 days, so order early. Suits formal roles - finance, legal, client-facing folks.',
      },
      {
        name: 'Low-Maintenance Desk Plant',
        price: '₹200–450',
        desc: 'A snake plant or money plant in a simple pot - hardier than a succulent and better for colleagues moving to a work-from-home setup. It becomes the first thing on their new desk that has a history.',
      },
      {
        name: 'Coffee Sampler Box',
        price: '₹350–500',
        desc: 'A set of 3–4 single-origin sachets or filter coffee packs from Indian roasters. Perfect for the colleague whose personality was 40% caffeine. Consumable, so it never becomes clutter.',
      },
    ],
  },
  {
    id: '500-1000',
    eyebrow: 'Budget Band 2',
    title: 'Farewell Gifts ₹500–1,000',
    sub: 'The close-teammate tier - you shared projects, deadlines, and lunch orders. Gifts here should show you actually know the person.',
    items: [
      {
        name: 'Personalised Mug with an Inside Joke',
        price: '₹500–700',
        desc: 'Print the phrase they said in every standup, the nickname, the meme from that one release night. It costs the same as a plain mug but gets used daily for years. Only works if the joke is genuinely theirs - generic “world’s best colleague” defeats the purpose.',
      },
      {
        name: 'Journal + Pen Gift Set',
        price: '₹600–900',
        desc: 'A hardbound A5 journal with a good pen reads as “new chapter” without anyone having to say it. Choose plain or dotted pages over dated ones so it is useful whenever they start. Suits planners, writers, and anyone heading into a bigger role.',
      },
      {
        name: 'Engraved Keychain + Wallet Combo',
        price: '₹600–1,000',
        desc: 'Two things they will carry every single day, both quietly personalised with initials. It is the rare farewell gift that travels with the person rather than sitting on a shelf. A strong pick for colleagues relocating to a new city.',
      },
      {
        name: 'A Book by Their Favourite Author',
        price: '₹500–800',
        desc: 'Requires you to have paid attention - which is exactly why it lands. Write the farewell message on the inside cover so the book and the memory stay together. If you are unsure of taste, a well-reviewed book in their field is the safe adjacent bet.',
      },
      {
        name: 'Insulated Travel Tumbler',
        price: '₹700–1,000',
        desc: 'A double-walled steel tumbler survives the new commute, the new office, and the next five years. Get the name engraved rather than a logo - this is their gift, not a branding exercise. Ideal for colleagues with long commutes or field roles.',
      },
    ],
  },
  {
    id: '1000-2500',
    eyebrow: 'Budget Band 3',
    title: 'Farewell Gifts ₹1,000–2,500',
    sub: 'The tier for long-tenured colleagues, managers, and small-team pooled gifts. At this budget, personalisation is mandatory - a generic gift at ₹2,000 feels worse than a personal one at ₹500.',
    items: [
      {
        name: 'Memory Photo Book',
        price: '₹1,000–1,800',
        desc: 'A printed book of team photos, screenshots of famous Slack moments, and short notes from colleagues. It takes a week to assemble, so start early. No other farewell gift at any price produces the same reaction at the handover.',
      },
      {
        name: 'Engraved Copper Bottle Set',
        price: '₹1,200–2,000',
        desc: 'A copper bottle with matching tumblers, name-engraved - traditional enough for any age group, premium enough for a manager. Sets like this are available in the MintBox catalog from about ₹1,200, with engraving done in-house. Suits colleagues who appreciated the classic over the trendy.',
      },
      {
        name: 'Premium Diary + Tech Organiser Kit',
        price: '₹1,200–2,200',
        desc: 'A leather-finish diary with a cable-and-gadget organiser pouch - the “equipped for what’s next” gift. Extremely practical for anyone starting a role with travel or hybrid work. Choose muted colours; it should look at home in any office.',
      },
      {
        name: 'Experience Voucher',
        price: '₹1,000–2,500',
        desc: 'A dinner for two, a spa session, or an activity day - a memory instead of an object. Best for the colleague whose desk was already minimalist and who groans at more stuff. Check the validity window covers their notice period plus a settling-in month.',
      },
      {
        name: 'Artisan Farewell Hamper',
        price: '₹1,500–2,500',
        desc: 'A curated box - gourmet snacks, a candle, a small keepsake, and the team card as the centrepiece. Hampers let a team of mixed budgets contribute to one impressive gift. Pick a theme (coffee, wellness, regional flavours) so it reads curated rather than assorted.',
      },
    ],
  },
  {
    id: 'above-2500',
    eyebrow: 'Budget Band 4',
    title: 'Farewell Gifts ₹2,500 and Above',
    sub: 'Reserved for long tenures, beloved managers, and founders moving on. These are usually pooled or company-funded - see the etiquette section below on who pays.',
    items: [
      {
        name: 'Premium Watch-Style Keepsake',
        price: '₹2,500–5,000',
        desc: 'A desk clock or watch-style keepsake engraved with their years of service marks time served and time ahead. It is the classic long-tenure farewell for a reason. Works best presented at a farewell gathering, not left on a desk.',
      },
      {
        name: 'Premium Leather Laptop Bag',
        price: '₹2,500–4,500',
        desc: 'They will carry it into their new office on day one - your team walks in with them, in a sense. Choose full-grain or good PU in black or tan, and skip the company logo entirely. Suits senior colleagues and client-facing roles.',
      },
      {
        name: 'Curated Luxury Farewell Hamper',
        price: '₹2,500–5,000',
        desc: 'The executive version of the artisan hamper - premium teas or spirits-alternatives, artisan chocolate, a leather accessory, and a framed team photo. MintBox builds farewell hampers to a brief at this tier with 3–5 day turnaround. Best for department-level farewells where presentation matters.',
      },
      {
        name: 'Framed Team Caricature or Artwork',
        price: '₹2,500–4,000',
        desc: 'A commissioned caricature of the team or an artwork of an inside joke, professionally framed. Allow 1–2 weeks for the artist. It is the gift most likely to be hanging in their home office a decade later.',
      },
      {
        name: 'Smartwatch or Tech Upgrade',
        price: '₹3,000–6,000',
        desc: 'A smartwatch, premium earbuds, or a mechanical keyboard - for the colleague whose wishlist you already know. Tech ages, so buy current-generation from a known brand with an India warranty. Best as a pooled gift with a card explaining who chipped in.',
      },
    ],
  },
  {
    id: 'from-the-team',
    eyebrow: 'From the Whole Team',
    title: 'Pooled Farewell Gift Ideas',
    sub: 'When 8–20 people contribute ₹200–500 each, you unlock gifts no individual would buy. These four formats work at almost any pool size.',
    items: [
      {
        name: 'Pooled Experience Day',
        price: '₹300–800 per contributor',
        desc: 'The team funds a full experience - a weekend brunch, a go-karting session, an overnight stay voucher. The farewell becomes an event rather than an object. Book a date before their last day so it does not quietly evaporate.',
      },
      {
        name: 'Pooled Premium Gadget',
        price: '₹500–1,000 per contributor',
        desc: 'Fifteen people at ₹500 each buys a genuinely premium tablet accessory kit, headphones, or e-reader. One meaningful gift beats fifteen small ones. Nominate one buyer, agree the item in the group chat, and keep the receipt discreetly available.',
      },
      {
        name: 'Group Video Message + Gift Combo',
        price: 'Free + any gift',
        desc: 'A 3–4 minute compilation of 20-second clips from teammates, past colleagues, even that client they saved. Costs nothing but coordination and multiplies whatever physical gift accompanies it. Assign an editor a full week before the farewell.',
      },
      {
        name: 'Charity Donation in Their Name',
        price: 'Any pooled amount',
        desc: 'For the colleague who genuinely wants nothing - donate the pool to a cause they care about and present the certificate in a frame. Pair it with a small consumable so there is still something to physically hand over.',
      },
    ],
  },
]

const ETIQUETTE_CARDS = [
  {
    idea: 'Who Pays for a Farewell Gift?',
    desc: 'Peers pool voluntarily - a fixed suggested amount (₹200–500) with zero pressure and anonymous opt-out. Managers may add a personal gift but should not run the collection for their own reportee. Company-funded farewell gifts are separate and usually follow a tenure-based policy.',
  },
  {
    idea: 'When to Give It',
    desc: 'On the last working day, at a gathering - even a 15-minute one - not silently couriered afterwards. If the person is remote, ship the gift to arrive 1–2 days before their final day so they can open it on the farewell call.',
  },
  {
    idea: 'Presentation Beats Price',
    desc: 'A ₹400 gift handed over with a signed card and two sentences of genuine praise beats a ₹4,000 gift in a courier bag. Wrap it, say something specific about working with them, and let the team be present.',
  },
  {
    idea: 'Match the Relationship, Not the Hierarchy',
    desc: 'A junior colleague you were close to can warrant a bigger gift than a senior you barely knew. Budget bands are a guide - the relationship sets the number. For ongoing recognition rather than exits, see our guide to employee appreciation gifts.',
  },
]

const CARD_MESSAGES = [
  {
    idea: 'For a Close Teammate',
    desc: '“Half my good ideas at this company started as your ideas. The next team has no clue how lucky they are. Stay in touch - lunch is on you now that you are getting the big salary.”',
  },
  {
    idea: 'For a Manager or Senior',
    desc: '“Thank you for backing me before I had the track record to deserve it. Whatever I build next has your fingerprints on it. Wishing you an even better team than us - though that seems statistically unlikely.”',
  },
  {
    idea: 'For a Colleague You Knew Less Well',
    desc: '“It was a pleasure sharing this chapter with you. Your calm in the chaos did not go unnoticed. All the very best for what is next - go do great things.”',
  },
]

const FAQ_ITEMS = [
  {
    q: 'What is a good farewell gift for a colleague?',
    a: 'The best farewell gift for a colleague is personal and keepable: a team-signed card with a photo frame (₹250–450), a personalised mug with an inside joke (₹500–700), or an engraved copper bottle set (₹1,200–2,000) for long-tenured colleagues. The signed card matters more than the gift itself - every teammate should write one specific memory.',
  },
  {
    q: 'How much should you spend on a farewell gift for a colleague?',
    a: 'As an individual, ₹200–500 is standard and entirely respectable. For a close teammate, ₹500–1,000. Pooled team gifts typically total ₹1,500–5,000 with contributions of ₹200–500 per person. Spending should reflect the relationship, not seniority - and nobody should feel pressured into a collection.',
  },
  {
    q: 'What farewell gift works for a boss versus a peer?',
    a: 'For a boss, keep it thoughtful but professional: a premium journal and pen set, a book with a handwritten inscription, or a pooled team gift like a framed caricature - avoid anything too personal or expensive from one individual, which can feel awkward. For a peer, inside jokes and personalisation are fair game: custom mugs, engraved keepsakes, or an experience voucher.',
  },
  {
    q: 'What are good last-minute farewell gift options?',
    a: 'Same-day options that still land well: a premium chocolate box (₹300–500), a desk plant, a digital experience voucher, or a bookstore gift card - each paired with a handwritten card, which you can produce in ten minutes and matters most anyway. In Bangalore, curated gift boxes can be delivered same-day. For more ideas at this price point, see our <a href="/guides/corporate-gifts-under-500">corporate gifts under ₹500</a> guide.',
  },
  {
    q: 'Can MintBox handle bulk farewell gifting for companies?',
    a: 'Yes. If your company gives standard farewell gifts - for example, every exit gets a curated box and long tenures get an engraved keepsake - MintBox can set up pre-approved tiers with ready stock, in-house engraving, and 3–5 business day turnaround per batch (48-hour express available). MOQ starts at 10 units with GST-compliant invoicing.',
  },
]

export default function FarewellGiftsClient({ products, categories }: Props) {
  const allItems = GIFT_BANDS.flatMap((band) => band.items)

  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "Farewell Gifts for Colleagues", "item": "https://themintbox.in/guides/farewell-gifts-for-colleagues" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "25 Farewell Gift Ideas for Colleagues That They Will Actually Keep",
        "description": "25 farewell gift ideas for colleagues across every budget - from ₹200 desk plants to premium hampers. Etiquette, card messages, and bulk options included.",
        "url": "https://themintbox.in/guides/farewell-gifts-for-colleagues",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "25 Farewell Gift Ideas for Colleagues",
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
              <span className="cp-breadcrumb-current">Farewell Gifts for Colleagues</span>
            </nav>
            <div className="cp-hero-eyebrow">Farewells · Every Budget · 2026</div>
            <h1 className="cp-hero-title">
              25 Farewell Gift Ideas for Colleagues<br />
              <em>That They Will Actually Keep</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Choosing a farewell gift for a colleague is harder than it looks - too generic and it says
              nothing, too personal and it gets weird. Here are 25 ideas across four budget bands, from
              ₹200 desk plants to ₹6,000 keepsakes, plus who pays, when to give it, and what to write
              in the card.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See All 25 Ideas ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Bulk Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 25 ideas, 4 budget bands</span>
              <span className="cp-hero-badge">✓ From ₹200 to ₹6,000</span>
              <span className="cp-hero-badge">✓ Name engraving available</span>
              <span className="cp-hero-badge">✓ Same-day delivery in Bangalore</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80" alt="Wrapped farewell gift for a colleague on their last working day" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80" alt="Team gathered to say farewell to a departing colleague" className="cp-hero-img-actual" loading="lazy" />
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
            content="The best farewell gift for a colleague pairs something keepable with a team-signed card: a personalised mug or engraved pen under ₹500, a journal set or engraved keychain at ₹500–1,000, and a memory photo book or copper bottle set at ₹1,000–2,500. Individuals typically spend ₹200–500; pooled team gifts run ₹1,500–5,000."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ gifts delivered since 2019",
              "In-house engraving and personalisation",
              "48-hour express turnaround available",
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

      {/* 4. THE MAIN LIST — 25 IDEAS IN 5 GROUPS */}
      {GIFT_BANDS.map((band, bandIndex) => {
        const startNum = GIFT_BANDS.slice(0, bandIndex).reduce((sum, b) => sum + b.items.length, 0)
        return (
          <section
            key={band.id}
            id={bandIndex === 0 ? 'list' : undefined}
            className={`cp-section ${bandIndex % 2 === 0 ? 'cp-section--cream' : 'cp-section--white'}`}
          >
            <div className="cp-container">
              <div className="cp-section-eyebrow">{band.eyebrow}</div>
              <h2 className="cp-section-title">{band.title}</h2>
              <p className="cp-section-sub">{band.sub}</p>
              <div className="cp-steps">
                {band.items.map((item, i) => (
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
                      <div className="cp-step-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* 5. ETIQUETTE */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Etiquette</div>
          <h2 className="cp-section-title">Farewell Gift Etiquette: Who Pays, When, and How</h2>
          <p className="cp-section-sub">
            The gift is half the job. Getting the collection, timing, and handover right is the other
            half - and it is where most office farewells quietly go wrong.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {ETIQUETTE_CARDS.map((item) => (
              <div key={item.idea} className="cp-card">
                <div className="cp-card-title">{item.idea}</div>
                <p className="cp-card-desc">
                  {item.idea === 'Match the Relationship, Not the Hierarchy' ? (
                    <>
                      A junior colleague you were close to can warrant a bigger gift than a senior you
                      barely knew. Budget bands are a guide - the relationship sets the number. For
                      ongoing recognition rather than exits, see our guide to{' '}
                      <a href="/guides/employee-appreciation-gifts">employee appreciation gifts</a>.
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

      {/* 6. CARD MESSAGES */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">What to Write</div>
          <h2 className="cp-section-title">Farewell Card Messages That Do Not Sound Copied</h2>
          <p className="cp-section-sub">
            Three ready-to-adapt messages. Swap in one specific shared memory and they stop sounding
            like templates. If the farewell includes a keepsake, our{' '}
            <a href="/guides/corporate-memento-ideas">corporate memento ideas</a> guide has engraving
            lines that pair well with these.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {CARD_MESSAGES.map((item) => (
              <div key={item.idea} className="cp-card">
                <div className="cp-card-title">{item.idea}</div>
                <p className="cp-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Farewell Products</div>
          <h2 className="cp-section-title">Browse Farewell Gift Products</h2>
          <p className="cp-section-sub">
            Curated products that work as farewell gifts for colleagues - filter by price to match
            your budget band.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Farewell Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80" alt="Colleague handing over a wrapped farewell gift at an office send-off" loading="lazy" />
      </figure>

      {/* 8. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            People forget most of what happened at a job within a year of leaving. A farewell done
            well - the card, the gathering, the gift - is one of the few things they carry out
            the door and keep.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 9. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Farewell Gifting</div>
            <h2 className="cp-cta-title">Set Up a Standing<br />Farewell Gift Programme</h2>
            <p className="cp-cta-sub">
              Tell us your exit volume and budget tiers - we will design pre-approved farewell gift
              options with ready stock, engraving, and batch turnaround so HR never scrambles on
              someone&apos;s last week.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Farewell Gift Quote"
              ctaLabel="Get Farewell Quote"
              defaultOccasion="recognition"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* 10. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Farewell Gifts for Colleagues - Frequently Asked Questions"
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
              { label: 'Employee Gifts', title: 'What to Gift Employees', href: '/guides/what-to-gift-employees' },
              { label: 'Recognition', title: 'Employee Appreciation Gifts', href: '/guides/employee-appreciation-gifts' },
              { label: 'Budget', title: 'Corporate Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
              { label: 'Keepsakes', title: 'Corporate Memento Ideas', href: '/guides/corporate-memento-ideas' },
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
