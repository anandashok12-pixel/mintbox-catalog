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

const GIFT_IDEAS = [
  {
    name: 'Quirky Coffee Mug',
    price: '₹250–400',
    funny: true,
    desc: 'A mug with a work-appropriate joke - “powered by deadline panic” territory. It gets used daily, so the joke keeps paying off long after the party. The single most reliable Secret Santa pick in any office.',
  },
  {
    name: 'Mini Desk Plant',
    price: '₹200–350',
    funny: false,
    desc: 'A succulent or money plant in a small pot brightens any workstation and survives even the most forgetful owner. Safe across every age, role, and personality - the zero-risk pick when you drew someone you barely know.',
  },
  {
    name: 'Fun Printed Socks',
    price: '₹150–300',
    funny: true,
    desc: 'Coffee cups, pizza slices, cats in sunglasses - fun socks are the Secret Santa classic for a reason. Nobody buys these for themselves and everybody wears them. Stick to prints, not text, to stay safely office-appropriate.',
  },
  {
    name: 'Chocolate Box',
    price: '₹300–500',
    funny: false,
    desc: 'A well-packaged assortment from a proper brand, not a supermarket grab. Consumable gifts never become clutter, and chocolate gets shared at the desk - so the whole team benefits from your draw.',
  },
  {
    name: 'Mini Board Game or Puzzle',
    price: '₹250–450',
    funny: true,
    desc: 'A travel-size Uno, a wooden brain-teaser, or a 500-piece puzzle. Great for the colleague who organises game nights - and it usually ends up living in the office breakout area, which everyone quietly appreciates.',
  },
  {
    name: 'Scented Candle',
    price: '₹250–450',
    funny: false,
    desc: 'A soy candle in vanilla, sandalwood, or citrus reads far more premium than its price. Best for colleagues who work from home part of the week. Skip strong florals - subtle scents have universal appeal.',
  },
  {
    name: 'Coffee or Chai Sampler',
    price: '₹300–500',
    funny: false,
    desc: 'Three or four sachets of single-origin coffee or artisanal chai blends. Perfectly judged for the colleague whose personality is their beverage order. Indian roaster sampler packs sit exactly in this budget.',
  },
  {
    name: 'Phone Stand',
    price: '₹150–300',
    funny: false,
    desc: 'A folding metal or bamboo phone stand fixes the daily video-call prop-up-against-the-monitor routine. Cheap, genuinely useful, and used within an hour of unwrapping - which is the entire point of Secret Santa.',
  },
  {
    name: 'Funny Desk Sign',
    price: '₹200–400',
    funny: true,
    desc: 'A small wooden or acrylic sign - “out of office (mentally)” or “please do not disturb, disturbing enough already”. Keep the humour self-deprecating rather than pointed and it stays HR-safe while still getting laughs.',
  },
  {
    name: 'Pocket Journal',
    price: '₹150–300',
    funny: false,
    desc: 'An A6 notebook with a decent cover - the meeting-notes companion nobody buys themselves. Pair it with a good pen if your budget has ₹100 left over. Safe for every personality on the draw list.',
  },
  {
    name: 'Cable Organiser Kit',
    price: '₹200–350',
    funny: false,
    desc: 'Velcro ties, cable clips, and a small pouch - the unsung hero gift for anyone with a laptop bag full of spaghetti. Zero glamour at the unwrapping, maximum daily gratitude afterwards.',
  },
  {
    name: 'Sipper Bottle',
    price: '₹300–500',
    funny: false,
    desc: 'A steel or Tritan sipper in a solid colour that actually looks good on a desk. Hydration gifts land well in offices where the AC dehydrates everyone by 3 pm. Widely available in bulk-friendly designs too.',
  },
  {
    name: 'Snack Box',
    price: '₹250–450',
    funny: false,
    desc: 'A curated mix of makhana, trail mix, dark chocolate, and baked snacks. It gets opened the same afternoon and shared around, making the gifter briefly famous. A strong pick for the office foodie.',
  },
  {
    name: 'Stationery Kit',
    price: '₹200–400',
    funny: false,
    desc: 'Sticky notes, washi tape, gel pens, and page flags in a neat pouch. For the colleague whose desk organisation is a personality trait, this is precision-targeted joy at under ₹400.',
  },
  {
    name: 'Personalised Keychain',
    price: '₹100–250',
    funny: false,
    desc: 'Metal or leather, with their initial or name - personalisation at the lowest price point on this list. It converts the smallest budget into something that feels considered rather than cheap.',
  },
  {
    name: 'Desk Stress Buster',
    price: '₹150–300',
    funny: true,
    desc: 'A squishy stress ball shaped like a bug, a laptop, or a tiny screaming chicken. Peak office-safe funny - it acknowledges the shared chaos without naming anyone. Expect it to migrate around the team within a week.',
  },
  {
    name: 'Premium Playing Cards',
    price: '₹200–350',
    funny: false,
    desc: 'A quality deck with a great case design. It lives in the office drawer and comes out at every offsite and delayed-cab evening. One of those gifts that gets more use than anything triple its price.',
  },
  {
    name: 'Canvas Tote Bag',
    price: '₹250–450',
    funny: false,
    desc: 'A sturdy printed tote for the laptop-charger-lunchbox commute. Choose an artistic or minimal print over slogans. Doubles as the office grocery-run bag, which is where most totes find their true calling.',
  },
  {
    name: '2027 Pocket Diary',
    price: '₹200–400',
    funny: false,
    desc: "Secret Santa lands in late December - exactly when everyone realises they need next year's diary. A slim 2027 diary with a decent cover is seasonal timing you get exactly one chance a year to nail.",
  },
  {
    name: 'Mini Bluetooth Speaker',
    price: '₹450–500',
    funny: false,
    desc: 'The ceiling of the budget, and it feels like it. A palm-sized speaker for desk music or shower podcasts reads like a ₹1,000+ gift. If your exchange caps at ₹500 exactly, this is how you max it out.',
  },
]

const HOW_TO_STEPS = [
  {
    step: 'Set the Budget Cap',
    desc: 'Announce a hard cap - ₹500 works for most Indian offices, ₹300 for larger groups - and a soft floor of about half the cap so nobody feels short-changed. State it in writing; ambiguity is where Secret Santa resentment is born.',
  },
  {
    step: 'Draw Names',
    desc: 'Use a free online draw tool or old-fashioned chits, one week before the exchange. Online tools let remote teammates join and handle the “I drew myself” redraws automatically. Keep draws secret - that is half the fun.',
  },
  {
    step: 'Publish the Rules',
    desc: 'One short message: budget cap, exchange date, wrapping expected or not, and a line on humour limits. Include an anonymous wishlist option - a shared doc where everyone lists 2–3 likes - to rescue people who drew a stranger.',
  },
  {
    step: 'Run the Exchange Day',
    desc: 'Mid-to-late December, before people leave for year-end holidays. Do it live - gifts handed over one at a time with guesses about who drew whom. Fifteen minutes of this beats an hour of most team-building formats.',
  },
  {
    step: 'Keep Gags HR-Safe',
    desc: "Funny is welcome; targeted is not. The test: would the joke work if the recipient's manager unwrapped it in front of everyone? Nothing about appearance, relationships, or performance. Self-deprecating office humour always clears the bar.",
  },
]

const FAQ_ITEMS = [
  {
    q: 'What are good Secret Santa gifts for coworkers?',
    a: 'The most reliable Secret Santa gifts for coworkers are useful-plus-fun: a quirky coffee mug (₹250–400), fun printed socks (₹150–300), a mini desk plant (₹200–350), a snack box (₹250–450), or a mini Bluetooth speaker at the ₹500 cap. When in doubt, consumables and desk upgrades beat decorative items.',
  },
  {
    q: 'What is the right budget etiquette for office Secret Santa?',
    a: 'Set one hard cap for everyone - ₹300–500 is standard in Indian offices - and stick close to it in both directions. Dramatically overspending is as awkward as underspending, because it exposes everyone else. If the group spans very different salary levels, set the cap at what the most junior member can comfortably afford.',
  },
  {
    q: 'What are good Secret Santa gifts under ₹300?',
    a: 'Under ₹300 you still have strong options: fun socks (₹150–300), a personalised keychain (₹100–250), a phone stand (₹150–300), a pocket journal (₹150–300), or a desk stress buster (₹150–300). For more micro-budget options, see our guide to <a href="/guides/corporate-gifts-under-100">corporate gifts under ₹100</a>.',
  },
  {
    q: 'When should we organise Secret Santa at work?',
    a: 'Draw names in the first week of December, exchange gifts mid-to-late December before year-end leave begins - Christmas week itself is ideal if most of the team is in office. If gifts need to be ordered or personalised, allow at least a week between the draw and the exchange. Planning company-wide gifting too? See our <a href="/guides/christmas-corporate-gifts">Christmas corporate gifts</a> guide.',
  },
  {
    q: 'Can MintBox do Secret Santa bundles for offices?',
    a: 'Yes. MintBox assembles Secret Santa bundles - a curated set of wrapped, budget-capped gifts your team draws from, so nobody has to shop individually. MOQ is 10 units, standard turnaround is 3–5 business days, and everything ships with GST-compliant invoicing. Order by end November to be safe for a December exchange.',
  },
]

export default function SecretSantaGiftsClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "Secret Santa Gifts for Colleagues", "item": "https://themintbox.in/guides/secret-santa-gifts-for-colleagues" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "20 Secret Santa Gift Ideas for Colleagues Under ₹500",
        "description": "20 Secret Santa gift ideas for colleagues, all under ₹500 with exact prices - quirky mugs, desk plants, office-safe funny picks, plus how to run the exchange.",
        "url": "https://themintbox.in/guides/secret-santa-gifts-for-colleagues",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "20 Secret Santa Gift Ideas for Colleagues Under ₹500",
        "itemListElement": GIFT_IDEAS.map((item, i) => ({
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
              <span className="cp-breadcrumb-current">Secret Santa Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">Year-End · Office Exchange · 2026</div>
            <h1 className="cp-hero-title">
              20 Secret Santa Gift Ideas for Colleagues<br />
              <em>All Under ₹500</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              You drew a name, the budget cap is ₹500, and the exchange is next week. These 20
              Secret Santa gifts for colleagues all come with exact prices - including five
              office-safe funny picks that get laughs without a trip to HR - plus a 5-step guide to
              running the exchange itself.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See All 20 Ideas ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Bundle Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Everything under ₹500</span>
              <span className="cp-hero-badge">✓ 5 office-safe funny picks</span>
              <span className="cp-hero-badge">✓ Bundles from 10 units</span>
              <span className="cp-hero-badge">✓ Order by end November</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80" alt="Wrapped Secret Santa gifts for colleagues under 500 rupees" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80" alt="Office team celebrating a year-end Secret Santa exchange" className="cp-hero-img-actual" loading="lazy" />
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
            content="The best Secret Santa gifts for colleagues under ₹500 are useful with a touch of fun: a quirky coffee mug (₹250–400), fun printed socks (₹150–300), a mini desk plant (₹200–350), a coffee sampler (₹300–500), or a mini Bluetooth speaker at the ₹500 cap. Set one hard budget cap, draw names a week early, and keep gag gifts self-deprecating rather than targeted."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ gifts delivered since 2019",
              "200+ curated products under every budget",
              "Bulk Secret Santa bundles from 10 units",
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
          <h2 className="cp-section-title">20 Secret Santa Gifts for Colleagues, With Exact Prices</h2>
          <p className="cp-section-sub">
            Every idea below fits a ₹500 cap. The ones tagged “office-safe funny” get laughs at the
            exchange without making anyone the punchline.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {GIFT_IDEAS.map((item, i) => (
              <div key={item.name} className="cp-card">
                <div className="cp-card-title">
                  {i + 1}. {item.name}
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
                  {item.funny && (
                    <span
                      style={{
                        marginLeft: '10px',
                        fontSize: '0.72em',
                        fontWeight: 600,
                        color: 'var(--gold, #b8972e)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Office-Safe Funny
                    </span>
                  )}
                </div>
                <p className="cp-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW TO RUN SECRET SANTA */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The Playbook</div>
          <h2 className="cp-section-title">How to Run Secret Santa at Work in 5 Steps</h2>
          <p className="cp-section-sub">
            A well-run exchange takes one announcement and fifteen minutes on the day. Here is the
            whole playbook - and if you are also planning company gifts for the season, start with
            our <a href="/guides/christmas-corporate-gifts">Christmas corporate gifts</a> guide.
          </p>
          <div className="cp-steps">
            {HOW_TO_STEPS.map((item, i) => (
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
          <div className="cp-section-eyebrow">Under ₹500</div>
          <h2 className="cp-section-title">Browse Secret Santa Gift Products</h2>
          <p className="cp-section-sub">
            Curated products that fit a Secret Santa budget cap - filter by price to stay under
            your exchange limit.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Secret Santa Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80" alt="Red-wrapped Secret Santa gift ready for an office gift exchange" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            Secret Santa is the cheapest team-building exercise ever invented - ₹500 a head and
            people talk about it till March. The trick is one clear budget cap and gifts chosen
            for the person, not the price.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Year-End Gifting</div>
            <h2 className="cp-cta-title">Secret Santa Bundles,<br />Sorted in One Order</h2>
            <p className="cp-cta-sub">
              Tell us your headcount and budget cap - we will assemble wrapped, ready-to-draw
              Secret Santa bundles so your whole office exchange happens without twenty separate
              shopping trips.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Secret Santa Quote"
              ctaLabel="Get Bundle Quote"
              defaultOccasion="year_end"
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
            title="Secret Santa Gifts for Colleagues - Frequently Asked Questions"
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
              { label: 'Christmas', title: 'Christmas Corporate Gifts', href: '/guides/christmas-corporate-gifts' },
              { label: 'Budget', title: 'Corporate Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
              { label: 'New Year', title: 'New Year Corporate Gifts', href: '/guides/new-year-corporate-gifts' },
              { label: 'Micro Budget', title: 'Corporate Gifts Under ₹100', href: '/guides/corporate-gifts-under-100' },
              { label: 'Office', title: 'Office Gift Ideas', href: '/guides/office-gift-ideas' },
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
