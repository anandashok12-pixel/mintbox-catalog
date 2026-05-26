'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import ContentProductShowcase from '@/components/content/ContentProductShowcase'
import FAQSection from '@/components/content/FAQSection'
import InlineQuoteForm from '@/components/content/InlineQuoteForm'
import QuickAnswerBox from '@/components/content/QuickAnswerBox'
import EATSignal from '@/components/content/EATSignal'
import LastUpdatedDate from '@/components/content/LastUpdatedDate'
import MidPageCTA from '@/components/content/MidPageCTA'

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

const UNIQUE_IDEAS = [
  { icon: "🌱", title: "Seed Paper Stationery", desc: "Notebooks and cards made from seed-embedded paper - plant them after use. Memorable, eco-conscious, and wildly shareable on social media.", tag: "Eco-Friendly" },
  { icon: "🪴", title: "Indoor Desk Plants", desc: "Succulents, air plants, or ZZ plants in branded pots. Lasts months on a desk, triggering brand recall every day.", tag: "Wellness" },
  { icon: "🍵", title: "Artisan Tea & Coffee Kits", desc: "Curated loose-leaf teas or single-origin coffees with a branded brewing accessory. Works across dietary restrictions.", tag: "Gourmet" },
  { icon: "🎨", title: "Custom Illustrated Portraits", desc: "Illustrated team portraits or mascot-branded items. Unique to your company - impossible to get elsewhere.", tag: "Personalised" },
  { icon: "🔦", title: "Copper & Brass Drinkware", desc: "Handcrafted copper bottles and tumblers with logo engraving. Premium look, health connotations, and visible on every desk.", tag: "Premium" },
  { icon: "📦", title: "Curated Experience Boxes", desc: "Theme boxes: 'Wellness Box', 'Work-From-Home Kit', 'Coffee Lover Set'. Tells a story, not just a bundle of items.", tag: "Curated" },
  { icon: "🎙️", title: "Personalised Audio Gifts", desc: "Wireless earbuds or Bluetooth speakers with deep engraving or custom color. High perceived value and daily utility.", tag: "Tech" },
  { icon: "🌿", title: "Bamboo Product Sets", desc: "Bamboo notebooks, pens, and phone stands. Sustainable, premium-feel, and increasingly sought-after by eco-aware employees.", tag: "Eco-Friendly" },
]

const WHAT_MAKES_UNIQUE = [
  { num: "1", title: "Personalisation with a Story", desc: "A gift that has the recipient's name, tells your brand story, or connects to a shared memory is inherently unique. Logo alone is not enough." },
  { num: "2", title: "Unexpected Category", desc: "Most corporate gifts are mugs or pens. A copper water bottle, artisan tea kit, or seed kit immediately stands out because it breaks expectation." },
  { num: "3", title: "Premium Packaging", desc: "A beautifully packaged ₹500 gift feels more unique than a poorly packaged ₹2,000 gift. Invest 20–30% of the budget in packaging." },
  { num: "4", title: "Emotional Resonance", desc: "Gifts tied to a specific moment - a work anniversary, a project win, an onboarding day - feel unique even if the item is standard." },
]


const FAQ_ITEMS = [
  { q: "What are unique corporate gift ideas for employees?", a: "Unique employee gifts go beyond standard mugs and pens: seed paper stationery, desk plants in branded pots, artisan tea kits, copper drinkware, and curated theme boxes (wellness, coffee, work-from-home). Personalisation with the employee's name makes any gift feel unique." },
  { q: "What makes a corporate gift memorable?", a: "Three factors: personalisation (name, message, story), unexpected category (something they wouldn't buy themselves), and quality packaging. A thoughtfully packaged ₹500 gift is often remembered longer than a generic ₹2,000 item." },
  { q: "What are unique corporate gift ideas for clients?", a: "For clients, premium hampers with artisan products, copper gift sets, and experience boxes (curated themes) stand out. At ₹2,000–₹5,000, include at least one personalised element - engraving, a bespoke note, or custom colour." },
  { q: "Can unique corporate gifts be ordered in bulk?", a: "Yes. MintBox specialises in unique bulk gifting - seed paper kits, copper sets, artisan hampers - all available from 25 units with logo branding and individual packaging. Many unique products have shorter MOQs than standard items." },
  { q: "What is the most unique Diwali corporate gift?", a: "Artisan copper bottles with logo engraving paired with premium dry fruits in a custom rigid box consistently rank as the most unique and appreciated Diwali gift. Budget: ₹1,500–₹2,500 per kit. MintBox produces these in batches from August." },
]

export default function UniqueGiftsClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Unique Corporate Gifts", "item": "https://themintbox.in/guides/unique-corporate-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Unique Corporate Gift Ideas That Actually Get Remembered",
        "description": "Discover unique corporate gifts that stand out. Personalised, creative, and memorable gifting ideas for Indian businesses. Bulk from 50 units, from MintBox.",
        "url": "https://themintbox.in/guides/unique-corporate-gifts",
        "dateModified": "2026-05-26T00:00:00+05:30",
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <Navbar />

      {/* 1. HERO */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-hero-inner">
          <div>
            <nav className="cp-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="cp-breadcrumb-sep">›</span>
              <a href="/guides/corporate-gifting-handbook">Guides</a>
              <span className="cp-breadcrumb-sep">›</span>
              <span className="cp-breadcrumb-current">Unique Corporate Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">Gifting Guide · 2026</div>
            <h1 className="cp-hero-title">
              Unique Corporate Gift Ideas<br />
              <em>That Actually Get Remembered</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Stand out from the standard pen-and-mug playbook with gifts your employees
              and clients will talk about.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-hero-cta-primary">Browse Products ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 200+ Clients</span>
              <span className="cp-hero-badge">✓ 50,000+ Gifts</span>
              <span className="cp-hero-badge">✓ Pan-India Delivery</span>
              <span className="cp-hero-badge">✓ GST Invoicing</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" alt="Unique plant corporate gift" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=800&q=80" alt="Custom personalised corporate gift workspace" className="cp-hero-img-actual" loading="lazy" />
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
            content="The most unique corporate gifts are those with personalisation, unexpected categories, and premium packaging - seed kits, copper drinkware, artisan hampers, desk plants, and experience boxes. Budget ₹500–₹2,500. Any gift becomes unique with a name and a story."
          />
          <EATSignal credentials={[
            '200+ corporate clients served',
            '50,000+ gifts delivered pan-India',
            '6+ years of corporate gifting expertise',
            'Unique, personalised, and eco-friendly options',
            'From 25 units with full logo branding',
          ]} />
        </div>
      </div>


      {/* 3. STATS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">200+</div>
              <div className="cp-stat-label">clients served</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">50,000+</div>
              <div className="cp-stat-label">gifts delivered</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">6+<span className="cp-stat-unit"> yrs</span></div>
              <div className="cp-stat-label">in corporate gifting</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Pan-India</div>
              <div className="cp-stat-label">delivery coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UNIQUE IDEAS GRID */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Unique Gift Ideas</div>
          <h2 className="cp-section-title">8 Unique Corporate Gift Ideas for 2026</h2>
          <p className="cp-section-sub">
            These gifts break the mould - each one earns a reaction, a photo, or a story.
          </p>
          <div className="cp-card-grid cp-card-grid--4">
            {UNIQUE_IDEAS.map(idea => (
              <div key={idea.title} className="cp-card">
                <div className="cp-card-icon">{idea.icon}</div>
                <div className="cp-card-title">{idea.title}</div>
                <p className="cp-card-desc">{idea.desc}</p>
                <span className="cp-tag">{idea.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=1200&q=80" alt="Unique and memorable corporate gift ideas for employees and clients" loading="lazy" />
      </figure>

      {/* 5. WHAT MAKES A GIFT UNIQUE */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Framework</div>
          <h2 className="cp-section-title">What Makes a Corporate Gift Truly Unique?</h2>
          <p className="cp-section-sub">
            Four principles that separate remembered gifts from forgotten ones.
          </p>
          <div className="cp-steps">
            {WHAT_MAKES_UNIQUE.map(step => (
              <div key={step.num} className="cp-step">
                <div className="cp-step-num">{step.num}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{step.title}</div>
                  <div className="cp-step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Product Catalogue</div>
          <h2 className="cp-section-title">Browse Unique Corporate Gifts</h2>
          <p className="cp-section-sub">
            Filter by category or budget to find the gift that stands out.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Unique Corporate Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1200&q=80" alt="Premium corporate gift boxes curated for unique gifting experiences" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band cp-quote-band--green">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            The best corporate gifts are never thrown away. They earn a spot on a desk, a shelf,
            or in a story someone tells at dinner. That is the standard we build to.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Get Started</div>
            <h2 className="cp-cta-title">Order Unique Gifts<br />for Your Team</h2>
            <p className="cp-cta-sub">
              Share your headcount, budget, and occasion - we will curate a
              unique gifting proposal within 4 hours.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a Unique Gifting Quote"
              ctaLabel="Get Quote"
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
            title="Unique Corporate Gifts - Frequently Asked Questions"
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
              { label: 'Trends', title: 'Corporate Gift Ideas 2026', href: '/guides/corporate-gift-ideas-2026' },
              { label: 'Clients', title: 'Corporate Gifts for Clients', href: '/guides/corporate-gifts-for-clients' },
              { label: 'Personalised', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Collections', title: 'Gift Hampers', href: '/collections/hampers' },
              { label: 'Ideas 2026', title: 'Corporate Gift Ideas 2026', href: '/guides/corporate-gift-ideas-2026' },
            ].map(link => (
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
        <LastUpdatedDate date="2026-05-25" />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
