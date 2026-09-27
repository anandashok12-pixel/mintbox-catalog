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
import { MIN_ORDER_UNITS, QUOTE_TIME } from '@/lib/businessFacts'

const PAGE_UPDATED = '2026-09-27'

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

const BANDS = [
  {
    label: 'Under ₹1,500',
    sub: 'Built for large teams and entry-level headcount, where order volume makes a higher per-unit spend impractical.',
    items: [
      {
        name: 'Artisan Diya & Candle Set',
        note: 'A perennial favourite at this price point - festive, universally appropriate, and easy to source with branded packaging.',
      },
      {
        name: 'Branded Desk Essentials',
        note: 'A quality pen paired with a printed notepad sits at the intersection of utility and personalisation without straining the budget.',
      },
      {
        name: 'Festive Mithai or Chocolate Box',
        note: 'From a quality confectionery source and packaged well, this feels premium and is consistently appreciated across every team.',
      },
      {
        name: 'Potted Plant or Succulent',
        note: 'A thoughtful, eco-conscious pick that employees commonly keep on their desks long after the festive season ends.',
      },
      {
        name: 'Personalised Card + Modest E-Voucher',
        note: 'A printed card bundled with a small e-voucher offers maximum employee choice while keeping a tangible gift element intact.',
      },
    ],
  },
  {
    label: '₹1,500 - ₹3,000',
    sub: 'The commonly chosen range for company-wide Diwali gifting at mid-sized organisations - enough budget for a genuinely multi-item hamper.',
    items: [
      {
        name: 'Premium Dry Fruit & Nut Hamper',
        note: 'The most popular option in this band - universally appreciated, culturally appropriate, and straightforward to order in bulk.',
      },
      {
        name: 'Personalised Desk Kit',
        note: 'A branded journal, a quality pen and a wireless charger together make a strong choice for office and hybrid teams.',
      },
      {
        name: 'Wellness Kit',
        note: 'Herbal tea, an essential-oil roller and a face mist - festive gifting doubles as a signal that the company cares about wellbeing.',
      },
      {
        name: 'Eco Tote with Snacks & Soy Candle',
        note: 'Strong visual appeal with a sustainable angle, and the tote gets reused long after the hamper is finished.',
      },
      {
        name: 'Branded Steel Bottle or Coffee Set',
        note: 'Practical and long-lasting - it carries the company identity into the employee&apos;s daily routine without feeling promotional.',
      },
    ],
  },
  {
    label: '₹3,000 and Above',
    sub: 'For leadership, long-tenured employees, and key client relationships where the gifting moment carries additional weight.',
    items: [
      {
        name: 'Luxury Dry Fruit & Artisan Chocolate Hamper',
        note: 'In wooden or reusable tin packaging - a go-to premium pick that travels well and leaves a strong impression.',
      },
      {
        name: 'Full Branded Desk Kit',
        note: 'Styled like a premium onboarding set with merchandise, a premium notebook and a cable organiser - reinforces brand identity while genuinely serving the recipient.',
      },
      {
        name: 'Smart Tech Accessories',
        note: 'Wireless earbuds or a compact portable charger are broadly well received and stay useful long after Diwali.',
      },
      {
        name: 'Premium Self-Care Set',
        note: 'Curated skincare, aromatherapy and gourmet coffee work particularly well for senior hires who value quality over novelty.',
      },
      {
        name: 'Curated Experiential Voucher',
        note: 'Dining, wellness or spa vouchers offer something different from a physical gift - ideal when you want to create a memorable moment.',
      },
    ],
  },
]

const FAQ_ITEMS = [
  {
    q: 'What are the most popular Diwali gift ideas for employees, by budget?',
    a: 'Under ₹1,500: diya and candle sets, branded desk essentials, and mithai boxes. ₹1,500-3,000: premium dry fruit hampers, personalised desk kits and wellness kits. ₹3,000+: luxury hampers, full branded desk kits and smart tech accessories. See the full <a href="/guides/diwali-gifts-for-employees">Diwali gifts for employees</a> guide for planning beyond the budget bands.',
  },
  {
    q: 'What separates a memorable Diwali gift from a forgettable one?',
    a: 'Two factors: perceived personalisation and utility. Even a name card signed by leadership raises the experience significantly, and items employees actually use daily - drinkware, stationery, desk accessories - outlast purely decorative gifts by months. A curated multi-item hamper also tends to feel more thoughtful than a single item of equivalent value.',
  },
  {
    q: 'Branded merchandise or name personalisation - which is better?',
    a: 'They serve different purposes. Logo branding works best on items employees will use or carry publicly - a bottle, tote, charger or notebook - with a subtle, embossed treatment reading more premium than a full-colour print. Name personalisation, even just a printed card signed digitally, achieves much of the same emotional effect at minimal cost, and name engraving elevates a bottle or mug further for budgets that allow it.',
  },
  {
    q: 'How early should I place a bulk Diwali gift order?',
    a: 'Fully custom branded hampers need six to eight weeks of lead time; semi-custom or pre-curated options need three to four weeks; ready-to-ship catalogue items need at least two weeks for pan-India delivery. For Diwali 2026, lock your order by October 15 to protect customisation options and packaging quality.',
  },
  {
    q: 'Are Diwali gifts for employees tax-exempt in India?',
    a: 'Under Rule 3(7)(iv) of the Income Tax Rules, read with Section 17(2)(viii) of the Income Tax Act, a gift, voucher or token given by an employer is exempt as a perquisite only if its aggregate value stays under ₹5,000 per employee per financial year - cross that threshold and the entire value becomes taxable in the employee\'s hands, not just the excess. Most budget and mid-tier Diwali gifts sit close to or above this limit, so track cumulative gift value per employee across the year and confirm treatment with your finance team or a qualified tax adviser; this is general information, not tax advice.',
  },
  {
    q: 'Can MintBox curate Diwali gifts across all three budget bands for one company?',
    a: `Yes. MintBox curates and delivers Diwali gifts across all three bands in one order - useful when you're splitting budgets by seniority or team. Orders start from ${MIN_ORDER_UNITS} units, with quotes sent within ${QUOTE_TIME}.`,
  },
]

export default function DiwaliGiftsByBudgetClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://themintbox.in' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://themintbox.in/guides' },
          { '@type': 'ListItem', position: 3, name: 'Diwali Gift Ideas for Employees by Budget', item: 'https://themintbox.in/guides/diwali-gifts-for-employees-by-budget' },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '15 Diwali Gift Ideas for Employees, by Budget (2026)',
        description: '15 Diwali gift ideas for employees sorted into three budget bands - under ₹1,500, ₹1,500-3,000, and ₹3,000+.',
        url: 'https://themintbox.in/guides/diwali-gifts-for-employees-by-budget',
        dateModified: `${PAGE_UPDATED}T00:00:00+05:30`,
        author: { '@type': 'Organization', name: 'MintBox', url: 'https://themintbox.in' },
        publisher: { '@type': 'Organization', name: 'MintBox', url: 'https://themintbox.in' },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: '15 Diwali Gift Ideas for Employees, by Budget (2026)',
        itemListElement: BANDS.flatMap((band) => band.items).map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
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
              <span className="cp-breadcrumb-current">Diwali Gifts by Budget</span>
            </nav>
            <div className="cp-hero-eyebrow">Diwali 2026 · Budget Bands</div>
            <h1 className="cp-hero-title">
              15 Diwali Gift Ideas for Employees,<br />
              <em>Sorted by Budget</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Three weeks before Diwali, most HR inboxes have a budget approval and a list of
              employees - and default to a standard dry-fruit box or a last-minute e-voucher.
              Here are 15 ready-to-order ideas across three budget bands, so a little more
              thought costs nothing extra.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See the 15 Ideas ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 3 budget bands</span>
              <span className="cp-hero-badge">✓ Order by Oct 15, 2026</span>
              <span className="cp-hero-badge">✓ MOQ {MIN_ORDER_UNITS} units</span>
              <span className="cp-hero-badge">✓ Pan-India delivery</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80" alt="Beautifully wrapped Diwali gift for an employee" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80" alt="Diwali diyas and festive decor for corporate gifting" className="cp-hero-img-actual" loading="lazy" />
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
            content="15 Diwali gift ideas for employees, sorted by budget: under ₹1,500 (diya sets, branded desk essentials, mithai boxes, potted plants, cards with e-vouchers), ₹1,500-3,000 (premium dry fruit hampers, personalised desk kits, wellness kits, eco totes, branded steel bottles), and ₹3,000+ (luxury hampers, full branded desk kits, smart tech accessories, self-care sets, experiential vouchers). Place bulk orders by October 15 to protect customisation and delivery timelines."
          />
          <EATSignal
            credentials={[
              '200+ corporate clients across India',
              '50,000+ gifts delivered since 2019',
              'Curated hampers across all three budget bands',
              `MOQ ${MIN_ORDER_UNITS} units, quotes within ${QUOTE_TIME}`,
              'GST-compliant invoicing for all orders',
            ]}
          />
        </div>
      </div>

      {/* 3. WHY THIS MATTERS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container--narrow">
          <div className="cp-section-eyebrow">Why It Matters</div>
          <h2 className="cp-section-title">Diwali Is the Highest-Visibility Gifting Moment of the Year</h2>
          <p className="cp-section-sub">
            A broad cross-section of employees, regardless of role or location, participates in
            Diwali in some form - which means the quality of what a company gives lands on
            everyone&apos;s radar at once. A well-chosen festive gift communicates something a
            performance review cannot: that the company sees its employees as individuals, not
            headcount. Presentation is part of that signal - a hamper that arrives in a
            considered box with tissue layering and a printed card will generally outperform the
            same contents delivered in a plain mailer.
          </p>
        </div>
      </section>

      {/* 4. THE 15 IDEAS, BY BAND */}
      <section id="list" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The List</div>
          <h2 className="cp-section-title">15 Diwali Gift Ideas for Employees, by Budget</h2>
          <p className="cp-section-sub">
            Organised into three bands so you can shortlist quickly by team size and available
            spend. Each idea is chosen for festive relevance, everyday utility, and ease of
            procurement in bulk.
          </p>
          {BANDS.map((band, bandIdx) => (
            <div key={band.label} style={{ marginBottom: bandIdx < BANDS.length - 1 ? '48px' : 0 }}>
              <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--forest-deep, #122E25)', margin: '0 0 6px' }}>
                {band.label}
              </h3>
              <p className="cp-card-desc" style={{ marginBottom: '20px', maxWidth: '640px' }}>{band.sub}</p>
              <div className="cp-steps">
                {band.items.map((item, i) => (
                  <div key={item.name} className="cp-step">
                    <div className="cp-step-num">{bandIdx * 5 + i + 1}</div>
                    <div className="cp-step-content">
                      <div className="cp-step-title">{item.name}</div>
                      <div className="cp-step-desc">{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BRANDING VS PERSONALISATION */}
      <section className="cp-section cp-section--white">
        <div className="cp-container cp-two-col">
          <div>
            <div className="cp-section-eyebrow">Branding or Personalisation?</div>
            <h2 className="cp-section-title">Picking the Right Approach</h2>
            <p className="cp-section-sub">
              Logo branding works best when the item is useful enough that the employee will
              carry or use it publicly - a water bottle, tote bag, charger or notebook. Branding
              on a purely decorative or perishable item, like a candle or sweet box, rarely
              achieves the same visibility and can read as promotional rather than festive. When
              you do brand merchandise, a subtle embossed or debossed logo consistently feels
              more premium than a full-colour print.
            </p>
          </div>
          <div>
            <div className="cp-section-eyebrow">Name Personalisation</div>
            <h2 className="cp-section-title">On Any Budget</h2>
            <p className="cp-section-sub">
              Personalisation doesn&apos;t require printing each employee&apos;s name on a high-cost item.
              A printed card addressed by name, with a short message signed digitally by
              leadership, achieves much of the same emotional effect at minimal cost. For budgets
              that allow it, name engraving on a steel bottle or mug elevates the perceived value
              and turns a functional item into something the employee is unlikely to discard.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PACKAGING TIPS */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Presentation</div>
          <h2 className="cp-section-title">Packaging Tips That Make Any Budget Look Premium</h2>
          <p className="cp-section-sub">
            Eco-friendly packaging has moved from a nice-to-have to an expectation at many
            workplaces. Kraft paper boxes with a printed festive sleeve, jute potlis, cotton bags
            and recycled cardboard with compostable filler all look intentional without
            generating excess waste - and they tend to photograph well when employees share
            their festive gift boxes online. Colour-coordinated tissue layering fills a hamper
            visually, a short personalised card adds a human touch, and for companies that want
            to go further, a QR code linking to a short video message from leadership creates a
            memorable moment at near-zero additional cost.
          </p>
        </div>
      </section>

      {/* 7. STATS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">15</div>
              <div className="cp-stat-label">Ideas, 3 Budget Bands</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">200+</div>
              <div className="cp-stat-label">Clients</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">50,000+</div>
              <div className="cp-stat-label">Gifts Delivered</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Oct 15</div>
              <div className="cp-stat-label">2026 Order Deadline</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Build Your Order</div>
          <h2 className="cp-section-title">Browse Diwali Gift Products by Price</h2>
          <p className="cp-section-sub">
            Filter the MintBox catalog by price to match the three bands above.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Diwali Gifts for Employees"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=80" alt="Diwali gift boxes for employees ready for delivery, sorted by budget" loading="lazy" />
      </figure>

      {/* 9. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">&ldquo;</span>
          <p className="cp-quote-text">
            Diwali gifting doesn&apos;t need to be complicated or expensive to feel meaningful - it
            needs to be chosen deliberately. Pick a budget band that fits your team, and let
            curation do the rest.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 10. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Diwali 2026</div>
            <h2 className="cp-cta-title">Get Your Diwali<br />Gifts Quoted</h2>
            <p className="cp-cta-sub">
              Tell us your headcount and preferred budget band - we&apos;ll send a detailed quote
              within {QUOTE_TIME}. Production slots close October 15.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a Diwali Gifting Quote"
              ctaLabel="Get Diwali Quote"
              defaultOccasion="diwali"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* 11. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Diwali Gifts for Employees by Budget - Frequently Asked Questions"
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
              { label: 'Diwali Hub', title: 'Diwali Corporate Gifts Guide', href: '/guides/diwali-corporate-gifts' },
              { label: 'Employees', title: 'Diwali Gifts for Employees', href: '/guides/diwali-gifts-for-employees' },
              { label: 'Hampers', title: 'Top 12 Corporate Diwali Gift Hampers', href: '/guides/corporate-diwali-gift-hampers' },
              { label: 'Clients', title: 'Diwali Gifts for Clients', href: '/guides/diwali-gifts-for-clients' },
              { label: 'Budget', title: 'Corporate Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
              { label: 'Tax', title: 'GST on Corporate Gifts', href: '/guides/gst-on-corporate-gifts' },
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
