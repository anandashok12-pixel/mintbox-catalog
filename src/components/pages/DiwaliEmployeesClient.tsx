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

const EMPLOYEE_LOVES = [
  {
    icon: '🎁',
    bg: 'cp-img-gold',
    title: 'Branded Hamper',
    desc: 'Bottle + sweets + dry fruits - feels premium, stays home.',
  },
  {
    icon: '🍬',
    bg: 'cp-img-warm',
    title: 'Sweet & Snacks Box',
    desc: 'Artisan mithai, chocolates, festive tins - family-friendly.',
  },
  {
    icon: '🌿',
    bg: 'cp-img-green',
    title: 'Eco Diwali Set',
    desc: 'Plantable kit + bamboo stationery - guilt-free giving.',
  },
  {
    icon: '💧',
    bg: 'cp-img-mid',
    title: 'Personalised Drinkware',
    desc: "Name on a copper bottle or tumbler - uniquely theirs.",
  },
  {
    icon: '🎧',
    bg: 'cp-img-green',
    title: 'Premium Tech Gift',
    desc: 'Wireless charger or earbuds - for the practical colleague.',
  },
  {
    icon: '🧘',
    bg: 'cp-img-warm',
    title: 'Wellness Kit',
    desc: 'Herbal teas + aroma candle + journal - thoughtful, calming.',
  },
]

const BUDGET_CARDS = [
  {
    label: 'Under ₹600',
    title: 'Entry Diwali',
    desc: 'Sweets + mug or notebook + card.',
    featured: false,
    href: '/guides/corporate-gifts-under-1000',
  },
  {
    label: '₹600–₹1,200',
    title: 'Standard Diwali',
    desc: 'Bottle + dry fruits + sweets + branded packaging.',
    featured: true,
    href: '/collections/hampers',
  },
  {
    label: '₹1,200–₹2,500',
    title: 'Premium Diwali',
    desc: 'Premium hamper + name personalisation + rigid gift box.',
    featured: false,
    href: '/collections/hampers',
  },
]

const PLANNING_TIPS = [
  {
    icon: '📅',
    bg: 'cp-img-gold',
    title: 'Order Early',
    desc: 'Diwali 2026 is November 1. For 100+ gifts, order by September 30. Personalised orders need 2 weeks minimum.',
  },
  {
    icon: '💌',
    bg: 'cp-img-warm',
    title: 'Include a Personal Note',
    desc: "A note card with the employee's name and a message from leadership is the most-impactful detail. Costs ₹5–₹20 per kit.",
  },
  {
    icon: '🏠',
    bg: 'cp-img-green',
    title: 'Consider Remote Employees',
    desc: 'Ship to home addresses with personalised boxes. Remote employees especially appreciate the effort of a direct delivery.',
  },
  {
    icon: '✅',
    bg: 'cp-img-mid',
    title: 'Use FSSAI-Certified Food',
    desc: 'If including sweets or dry fruits, ensure they are FSSAI-certified with proper labelling. MintBox sources only certified suppliers.',
  },
]


const FAQS = [
  {
    q: 'What is a good Diwali gift budget per employee?',
    a: '₹500–₹1,000 per head is the most common range for Diwali employee gifting. At ₹800 for 100 employees, you spend ₹80,000 - enough for a quality hamper with branded packaging. Companies budget more (₹1,200–₹1,800) for senior employees or tenure milestones.',
  },
  {
    q: 'How do I choose between a hamper and a single premium item?',
    a: 'Hampers (multiple items in a box) create a richer unboxing experience and feel more festive - better for Diwali. A single premium item (engraved copper bottle, premium tumbler) works better for work anniversaries or senior gifting. For Diwali, the hamper format wins.',
  },
  {
    q: 'Can I deliver Diwali gifts to employee home addresses?',
    a: "Yes. Provide a spreadsheet of names, addresses, and phone numbers. Each gift is packed individually with the employee's name. Home delivery rates: ₹80–₹150 per address outside Bangalore, included for Bangalore within 15 km.",
  },
  {
    q: 'What food items are safe to include in Diwali hampers?',
    a: 'MintBox includes FSSAI-certified dry fruits, artisan mithai (sweets), packaged chocolates, and artisan cookies. All items come with shelf-life and allergen information. We do not include fresh or unpacked food. Vegan and nut-free options are available on request.',
  },
  {
    q: 'Is name personalisation worth the extra cost for employee Diwali gifts?',
    a: 'Yes - for meaningful gifting, personalisation is the single highest-ROI addition. A name on a bottle or box costs ₹50–₹100 extra but dramatically increases the employee\'s perception that the gift was chosen specifically for them, not bought in bulk.',
  },
  {
    q: 'What if I have employees in different cities?',
    a: 'We coordinate multi-city Diwali delivery from one order. Group employees by city, share a spreadsheet, and we dispatch all gifts from a single purchase order with city-wise tracking. All gifts arrive before Diwali subject to ordering by October 15.',
  },
]

export default function DiwaliEmployeesClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Diwali Gifts for Employees", "item": "https://themintbox.in/guides/diwali-gifts-for-employees" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Diwali Gifts for Employees 2026: Ideas, Budget & Planning",
        "description": "Thoughtful Diwali gifts for employees - bulk hampers, personalised sets, and sweet kits from ₹400/head. Plan 3–4 weeks early. GST invoicing. Delivered across India.",
        "url": "https://themintbox.in/guides/diwali-gifts-for-employees",
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
              <span className="cp-breadcrumb-current">Diwali Gifts for Employees</span>
            </nav>
            <div className="cp-hero-eyebrow">Seasonal Guide · Employee Diwali 2026</div>
            <h1 className="cp-hero-title">
              Diwali Gifts for Employees 2026:<br />
              <em>Ideas, Budget &amp; Planning</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Thoughtful Diwali gifts your employees will love - from ₹400 sweet kits to ₹3,000 premium hampers.
              Plan early, personalise at scale, and deliver to offices or home addresses Pan-India.
            </p>
            <div className="cp-hero-ctas">
              <a href="#products" className="cp-hero-cta-primary">Browse Employee Gifts ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get Employee Diwali Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ From ₹400/head</span>
              <span className="cp-hero-badge">✓ Home delivery option</span>
              <span className="cp-hero-badge">✓ Name personalisation</span>
              <span className="cp-hero-badge">✓ Order by Oct 15</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80" alt="Diwali corporate gifts with festive diyas" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80" alt="Beautifully wrapped Diwali gift" className="cp-hero-img-actual" loading="lazy" />
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
            content="Diwali gifts for employees typically cost ₹500–₹1,500 per head. Popular options: sweet hampers, branded drinkware, eco gift sets, and personalised kits. For 100+ employees, bulk pricing drops costs 15–20%. For remote teams, individual home delivery is available. Order by October 15 to guarantee delivery before Diwali."
          />
          <EATSignal credentials={[
            'Employee Diwali gifts for 200+ companies',
            'Bulk pricing for teams of 25–2,000',
            'Individual home delivery for remote employees',
            'Name personalisation on kits and boxes',
            'FSSAI-certified food items only',
          ]} />
        </div>
      </div>

      {/* 3. STATS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹400<span className="cp-stat-unit">/head</span></div>
              <div className="cp-stat-label">starting price</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">25<span className="cp-stat-unit"> units</span></div>
              <div className="cp-stat-label">minimum order quantity</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Home</div>
              <div className="cp-stat-label">delivery available</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Oct 15</div>
              <div className="cp-stat-label">deadline for guaranteed delivery</div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. WHAT EMPLOYEES LOVE */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Gift Ideas</div>
          <h2 className="cp-section-title">What Employees Love at Diwali</h2>
          <p className="cp-section-sub">
            These are the most appreciated Diwali gift formats - practical, festive,
            and genuinely memorable.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {EMPLOYEE_LOVES.map(card => (
              <div key={card.title} className="cp-card">
                <div className={`cp-card-icon ${card.bg}`} style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {card.icon}
                </div>
                <div className="cp-card-title">{card.title}</div>
                <p className="cp-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Products</div>
          <h2 className="cp-section-title">Browse Employee Diwali Gift Products</h2>
          <p className="cp-section-sub">
            All products suitable for employee Diwali gifting. Filter by price to match your per-head budget.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Employee Diwali Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* 6. BUDGET TIERS */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Budget Tiers</div>
          <h2 className="cp-section-title">Choose Your Diwali Gift Budget</h2>
          <p className="cp-section-sub">
            Three tiers to match your per-head spend. All include branded packaging and can be personalised.
          </p>
          <div className="cp-budget-grid">
            {BUDGET_CARDS.map(card => (
              <a
                key={card.label}
                href={card.href}
                className={`cp-budget-card${card.featured ? ' cp-budget-card--featured' : ''}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div className="cp-budget-label">{card.label}</div>
                <div className="cp-budget-price">{card.title}</div>
                <p className="cp-budget-desc">{card.desc}</p>
                <span className="cp-budget-cta">See options →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=80" alt="Warm Diwali employee gift hampers ready for delivery with festive packaging" loading="lazy" />
      </figure>

      {/* 7. QUOTE PULL */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            {"Your employee's family sees the Diwali gift too. It's not just what they receive - it's the moment they unbox it at home and feel proud to work for you."}
          </p>
          <cite className="cp-quote-cite">MintBox Employee Gifting Philosophy</cite>
        </div>
      </div>

      {/* 8. PLANNING TIPS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Planning Tips</div>
          <h2 className="cp-section-title">How to Plan Employee Diwali Gifting</h2>
          <p className="cp-section-sub">
            Four things that separate a great Diwali gift programme from a forgettable one.
          </p>
          <div className="cp-cards-grid cp-cards-grid--2">
            {PLANNING_TIPS.map(tip => (
              <div key={tip.title} className="cp-card">
                <div className={`cp-card-icon ${tip.bg}`} style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {tip.icon}
                </div>
                <div className="cp-card-title">{tip.title}</div>
                <p className="cp-card-desc">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA + FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Employee Diwali 2026</div>
            <h2 className="cp-cta-title">Plan Employee<br />Diwali Gifts</h2>
            <p className="cp-cta-sub">
              Tell us your team size, budget per head, and delivery preferences - we will
              send a curated proposal with options and mockups within 4 hours.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Plan Employee Diwali Gifts"
              ctaLabel="Get Employee Diwali Quote"
              defaultOccasion="diwali"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* 10. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQS}
            eyebrow="FAQ"
            title="Diwali Gifts for Employees - Frequently Asked Questions"
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
              { label: 'Seasonal', title: 'Diwali Corporate Gifts', href: '/guides/diwali-corporate-gifts' },
              { label: 'Collections', title: 'Gift Hampers', href: '/collections/hampers' },
              { label: 'Budget Guide', title: 'Corporate Gifts Under ₹1,000', href: '/guides/corporate-gifts-under-1000' },
              { label: 'Bangalore', title: 'Bulk Corporate Gifting', href: '/bangalore-corporate-gifting/bulk-gifting' },
              { label: 'Personalisation', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Collections', title: 'Employee Welcome Kit', href: '/collections/employee-welcome-kit' },
              { label: 'Diwali', title: 'Diwali Corporate Gifts 2026', href: '/guides/diwali-corporate-gifts' },
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
        <LastUpdatedDate date="2026-05-26" />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
