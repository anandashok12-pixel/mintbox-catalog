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

const BANGALORE_GIFTS = [
  {
    name: "Channapatna Wooden Toys (GI-tagged) — ₹200–800",
    desc: "Lacquered wooden toys from Channapatna, an hour from Bangalore, made with natural dyes in a craft tradition dating back to Tipu Sultan's era. GI-tagged and instantly recognisable, a small Channapatna figurine or spinning top makes a hamper feel curated rather than assembled.",
  },
  {
    name: "Mysore Pak — ₹300–600 per box",
    desc: "Karnataka's most famous sweet - ghee, gram flour, and sugar in a melt-in-the-mouth block invented in the Mysore Palace kitchens. Buy fresh from a reputed maker and it becomes the first thing opened in any hamper. Short shelf life, so time it with dispatch.",
  },
  {
    name: "Mysore Sandalwood Soap & Products (GI-tagged) — ₹100–400",
    desc: "The GI-tagged Mysore Sandal soap has been made from pure sandalwood oil since 1916 - a heritage product that travels perfectly. A two- or three-soap set adds fragrance and history to a hamper at a very low cost per unit.",
  },
  {
    name: "Filter Coffee Powder from Local Roasters — ₹150–400",
    desc: "Bangalore runs on filter coffee, and freshly ground chicory-blend powder from a local roaster is the city in a packet. Pair with a small steel tumbler-davara set for a hamper centrepiece that out-of-town clients genuinely use.",
  },
  {
    name: "Mysore Silk Accessories (GI-tagged) — ₹800–3,000",
    desc: "Mysore silk carries a GI tag and a royal lineage - for corporate hampers, silk pocket squares, stoles, or small purses hit the premium note without the cost of a full saree. Best reserved for VIP client hampers.",
  },
  {
    name: "Coorg Coffee & Spices (GI-tagged) — ₹250–700",
    desc: "Coorg Arabica coffee is GI-tagged, and the region's pepper and cardamom are among India's best. A coffee-plus-spice duo tells a single-origin Karnataka story that lands especially well with international clients.",
  },
  {
    name: "Nandini Ghee Sweets — ₹200–500",
    desc: "Sweets made with Nandini ghee - the Karnataka dairy cooperative brand every local grew up with - signal authenticity to anyone who knows the state. Mysore pak, peda, and burfi variants hold up well in transit if packed fresh.",
  },
  {
    name: "Dharwad Peda (GI-tagged) — ₹250–500 per box",
    desc: "This slow-roasted milk sweet from Dharwad has its own GI tag and a 175-year-old recipe. Denser and less fragile than most milk sweets, it is one of the more courier-friendly traditional options.",
  },
  {
    name: "Ragi-Based Healthy Snack Boxes — ₹300–700",
    desc: "Ragi (finger millet) is Karnataka's signature grain, and Bangalore's health-food makers have turned it into cookies, chips, and laddus. A smart pick for wellness-positioned hampers going to fitness-conscious teams.",
  },
  {
    name: "Bangalore-Roasted Specialty Coffee — ₹400–900",
    desc: "Beyond traditional filter powder, Bangalore is India's specialty coffee capital - single-estate, small-batch roasts with tasting notes on the bag. A 250g bag of specialty beans is the contemporary counterpart to the filter-coffee classic.",
  },
  {
    name: "Lambani Embroidery Crafts — ₹300–1,200",
    desc: "Mirror-work embroidery by the Lambani (Banjara) community of north Karnataka, stitched into pouches, bags, and wall pieces in vivid colour. Handmade, women-artisan-led, and a strong conversation piece in a crafts-forward hamper.",
  },
  {
    name: "Bidriware Small Decor — ₹500–2,500",
    desc: "Blackened zinc-alloy metalware inlaid with silver, from Bidar in north Karnataka. Small Bidriware coasters, boxes, or figurines bring genuine artistry to premium hampers - each piece is hand-inlaid.",
  },
  {
    name: "Mysore Agarbatti (Incense) — ₹100–300",
    desc: "The Mysore-Bangalore belt has been India's incense-making heartland for over a century, with sandalwood and jasmine as signature notes. A boxed agarbatti set is a low-cost, high-fragrance addition that survives any courier journey.",
  },
  {
    name: "Coorg Honey — ₹250–600",
    desc: "Raw, forest-sourced honey from the Coorg hills, often sold by small estate producers. A jar of Coorg honey pairs naturally with the coffee-and-spice story and adds a wellness note to the hamper.",
  },
  {
    name: "Iyengar Bakery Treats — ₹150–400",
    desc: "Bangalore's Iyengar bakeries - many over 50 years old - are beloved for butter biscuits, honey cake, and rusk. A box of fresh bakery treats is the most 'everyday Bangalore' item on this list, and one locals get most nostalgic about.",
  },
]

const HAMPER_BUILDS = [
  {
    tier: "₹800 'Namma Starter' Hamper",
    contents: "Filter coffee powder + Mysore Sandal soap duo + Iyengar bakery butter biscuits + Channapatna keychain-sized toy",
    note: "Four genuine Karnataka items under ₹800 landed cost - the proof that a local-story hamper does not need a luxury budget.",
  },
  {
    tier: "₹1,500 'Taste of Bangalore' Hamper",
    contents: "Specialty coffee beans + Dharwad peda box + Coorg pepper & cardamom + ragi cookies + Channapatna spinning top",
    note: "The best-selling configuration for client gifting - a full flavour arc from coffee to sweet to spice, all courier-safe.",
  },
  {
    tier: "₹3,000 'Karnataka Heritage' Hamper",
    contents: "Mysore silk stole + Bidriware coasters + Coorg coffee & honey + Mysore Pak + premium Channapatna figurine",
    note: "Three GI-tagged crafts in one box. Built for VIP clients and international visitors - MintBox assembles and brands all three tiers to order.",
  },
]

const FAQ_ITEMS = [
  {
    q: "What is Bangalore famous for gifting?",
    a: "Bangalore and Karnataka are famous for Channapatna wooden toys, Mysore Pak, Mysore sandalwood soap, filter coffee and specialty roasted coffee, Mysore silk, Coorg coffee and spices, Dharwad peda, and crafts like Lambani embroidery and Bidriware. Five of these - Channapatna toys, Mysore silk, Mysore sandal soap, Coorg coffee, and Dharwad peda - carry GI tags.",
  },
  {
    q: "What are the best Bangalore souvenirs for corporate clients?",
    a: "For corporate clients, lead with items that travel well and carry a story: Channapatna toys, specialty coffee, Coorg spices, Mysore sandal soap, and Bidriware decor. Combine 3–5 into a themed hamper (₹800–3,000) rather than gifting one item alone - see our <a href=\"/bangalore-corporate-gifting/gift-hampers\">Bangalore corporate gift hampers guide</a> for hamper pricing.",
  },
  {
    q: "Which famous Bangalore gifts are courier-safe?",
    a: "Safest in transit: coffee powder and beans, spices, honey (leak-proof jars), sandalwood soap, agarbatti, Channapatna toys, Bidriware, silk, and ragi snacks. Handle with care: Mysore Pak and fresh bakery items - use them for local same-day deliveries, and swap in Dharwad peda (denser, hardier) for outstation shipments.",
  },
  {
    q: "What does a GI tag mean on gifts like Channapatna toys or Mysore silk?",
    a: "A Geographical Indication (GI) tag legally certifies that a product comes from a specific region and is made by its traditional method - Channapatna toys, Mysore silk, Mysore sandal soap, Coorg coffee, and Dharwad peda all hold one. In a corporate hamper, GI-tagged items signal authenticity and give recipients a story worth retelling.",
  },
  {
    q: "Can MintBox build custom Bangalore-themed hampers in bulk?",
    a: "Yes. MintBox is Bangalore-based and assembles Taste-of-Bangalore hampers from ₹800 to ₹3,000+ per unit - MOQ 10, quote within 24 hours, branded packaging in-house, same-day delivery within Bangalore, and pan-India shipping for outstation clients.",
  },
]

export default function FamousBangaloreGiftsClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Bangalore Corporate Gifting", "item": "https://themintbox.in/bangalore-corporate-gifting" },
          { "@type": "ListItem", "position": 3, "name": "Famous Bangalore Gifts", "item": "https://themintbox.in/bangalore-corporate-gifting/famous-bangalore-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "15 Famous Bangalore Gifts to Put in Corporate Hampers (2026)",
        "description": "From GI-tagged Channapatna toys to Coorg coffee - 15 famous Bangalore gifts that belong in corporate hampers, with prices, cultural context, and courier tips.",
        "url": "https://themintbox.in/bangalore-corporate-gifting/famous-bangalore-gifts",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "15 Famous Bangalore Gifts for Corporate Hampers",
        "itemListElement": BANGALORE_GIFTS.map((item, i) => ({
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
              <a href="/bangalore-corporate-gifting">Bangalore Corporate Gifting</a>
              <span className="cp-breadcrumb-sep">›</span>
              <span className="cp-breadcrumb-current">Famous Bangalore Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">Local Sourcing · Karnataka Crafts & Flavours</div>
            <h1 className="cp-hero-title">
              15 Famous Bangalore Gifts<br />
              <em>to Put in Corporate Hampers (2026)</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Bangalore famous gift items go far beyond a box of dry fruits - Channapatna toys,
              Mysore silk, Coorg coffee, Dharwad peda, and more, five of them GI-tagged. Here are
              15 genuine Karnataka gifts, what each costs, and how to use them in a corporate
              hamper clients will remember.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See All 15 Gifts ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Build a Local Hamper</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 5 GI-tagged items</span>
              <span className="cp-hero-badge">✓ Hampers from ₹800</span>
              <span className="cp-hero-badge">✓ Same-day in Bangalore</span>
              <span className="cp-hero-badge">✓ Pan-India shipping</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" alt="Filter coffee - one of the most famous Bangalore gifts for corporate hampers" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80" alt="Corporate gift hamper basket filled with local Karnataka specialities" className="cp-hero-img-actual" loading="lazy" />
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
            content="The most famous Bangalore gifts for corporate hampers are Channapatna wooden toys, Mysore Pak, Mysore sandalwood soap, filter coffee, Mysore silk accessories, Coorg coffee and spices, and Dharwad peda - five of which are GI-tagged. A themed Taste-of-Bangalore hamper combining 3–5 of these costs ₹800–3,000 per unit in bulk."
          />
          <EATSignal
            credentials={[
              "Bangalore-based since 2019 - we source these items locally",
              "200+ corporate clients across India",
              "50,000+ gifts delivered",
              "Custom hamper assembly and branding in-house",
              "Same-day delivery available within Bangalore",
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
              <div className="cp-stat-label">Years in Bangalore</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">48hr</div>
              <div className="cp-stat-label">Express Turnaround</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE LIST */}
      <section id="list" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The Local List</div>
          <h2 className="cp-section-title">15 Famous Bangalore Gift Items, Ranked for Hampers</h2>
          <p className="cp-section-sub">
            Each entry: where it comes from, why it matters, and the bulk price band you should
            expect. GI-tagged items are marked - they are your hamper's authenticity anchors.
          </p>
          <div className="cp-steps">
            {BANGALORE_GIFTS.map((item, i) => (
              <div key={item.name} className="cp-step">
                <div className="cp-step-num">{i + 1}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{item.name}</div>
                  <div className="cp-step-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HAMPER BUILDS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Put It Together</div>
          <h2 className="cp-section-title">Building a "Taste of Bangalore" Client Hamper</h2>
          <p className="cp-section-sub">
            Three proven builds at three budgets. Mix courier-safe items for outstation clients;
            save the fresh sweets for local deliveries. Browse ready-made options in our{' '}
            <a href="/collections/hampers">hamper collection</a>.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {HAMPER_BUILDS.map((build) => (
              <div key={build.tier} className="cp-card">
                <div className="cp-card-title">{build.tier}</div>
                <p className="cp-card-desc"><strong>Inside:</strong> {build.contents}</p>
                <p className="cp-card-desc" style={{ marginTop: '8px', fontStyle: 'italic', opacity: 0.85 }}>{build.note}</p>
              </div>
            ))}
            <div className="cp-card">
              <div className="cp-card-title">Courier Safety Rule of Thumb</div>
              <p className="cp-card-desc">
                Dry goods (coffee, spices, soap, toys, crafts) ship pan-India without worry.
                Ghee-based sweets need 3–5 day shelf headroom - Dharwad peda travels better than
                Mysore Pak. For festive timing, see our{' '}
                <a href="/guides/diwali-gifts-for-clients">Diwali gifts for clients guide</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Hamper Components</div>
          <h2 className="cp-section-title">Browse Products for Your Bangalore Hamper</h2>
          <p className="cp-section-sub">
            Combine local specialities with branded items from the catalog to complete your hamper.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Hamper Products"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80" alt="Famous Bangalore gifts wrapped and arranged for a corporate hamper" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            A client can buy themselves anything on a marketplace. What they cannot buy is a hamper
            that says: this came from where we work, and we chose every piece of it.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Local Hampers</div>
            <h2 className="cp-cta-title">Build Your<br />Bangalore Hamper</h2>
            <p className="cp-cta-sub">
              Tell us your budget per hamper and where they are going - we will propose a
              Taste-of-Bangalore build with branding mockups within {QUOTE_TIME}.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a Local Hamper Quote"
              ctaLabel="Get Hamper Quote"
              defaultOccasion="client_gifting"
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
            title="Famous Bangalore Gifts - Frequently Asked Questions"
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
              { label: 'Local Hub', title: 'Bangalore Corporate Gifting', href: '/bangalore-corporate-gifting' },
              { label: 'Hampers', title: 'Corporate Gift Hampers in Bangalore', href: '/bangalore-corporate-gifting/gift-hampers' },
              { label: 'Diwali', title: 'Diwali Gifts for Clients', href: '/guides/diwali-gifts-for-clients' },
              { label: 'Collection', title: 'Gift Hamper Collection', href: '/collections/hampers' },
              { label: 'Ideas', title: 'Unique Corporate Gifts', href: '/guides/unique-corporate-gifts' },
              { label: 'Vendors', title: 'Top Gifting Companies in Bangalore', href: '/bangalore-corporate-gifting/top-companies' },
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
