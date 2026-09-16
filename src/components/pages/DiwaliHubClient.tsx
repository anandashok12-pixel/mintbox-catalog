'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import FAQSection from '@/components/content/FAQSection'
import InlineQuoteForm from '@/components/content/InlineQuoteForm'
import QuickAnswerBox from '@/components/content/QuickAnswerBox'
import EATSignal from '@/components/content/EATSignal'
import LastUpdatedDate from '@/components/content/LastUpdatedDate'
import MidPageCTA from '@/components/content/MidPageCTA'
import { DIWALI_HUB_FAQS, LAST_UPDATED } from '@/components/pages/diwaliHubData'
import DiwaliHamperShowcase, {
  TIERS,
  tierFor,
  type DiwaliProduct,
  type TierKey,
} from '@/components/content/DiwaliHamperShowcase'

const DIWALI_DATE_LABEL = 'Sunday, 8 November 2026'
const ORDER_BY_LABEL = 'Friday, 24 October 2026'

// Product IDs used for the hero visual, in preference order. Falls back to the
// first products in catalogue order if any are missing.
const HERO_PICKS = ['475', '463', '467']

const STEPS = [
  { num: '1', title: 'Shortlist & add to pack', desc: 'Filter by budget or theme, open any hamper to see exactly what is inside, and add the ones you like.' },
  { num: '2', title: 'Quote within 4 hours', desc: 'Share headcount, budget and delivery cities. You get per-unit pricing, a branding mockup and a GST-ready quote.' },
  { num: '3', title: 'Approve & confirm', desc: 'Sign off on the mockup and quantities. Production and packing start as soon as the order is confirmed.' },
  { num: '4', title: 'Delivered before Diwali', desc: 'Assembled in Bengaluru and dispatched to one office or many cities, with tracking shared on WhatsApp.' },
]

const TIMELINE = [
  { when: 'Now – 24 October', status: 'Guaranteed pre-Diwali delivery', detail: 'Full choice of hampers, logo branding on box and insert card, name personalisation on select items.' },
  { when: '25 – 31 October', status: 'Ready-stock hampers', detail: 'Popular hampers from stock with printed insert card. Logo-printed boxes subject to print slot availability.' },
  { when: '1 November onward', status: 'Bengaluru rush orders', detail: 'Bengaluru delivery from available stock only. Confirm on WhatsApp before ordering.' },
]

const COMPARISON = [
  { tier: 'Team tier', price: '₹434–₹799', contents: 'Dry-fruit combo box, eco desk set, tote + glass bottle + mug', bestFor: 'All-staff gifting, 50–500 units' },
  { tier: 'Manager tier', price: '₹800–₹1,299', contents: 'Bottle + mug + dry fruits or lamp, in a printed rigid box', bestFor: 'Managers, top performers, key vendors' },
  { tier: 'Leadership & client tier', price: '₹1,300–₹2,170', contents: 'Pure copper bottle sets, 7-in-1 tech hamper, executive combos', bestFor: 'Clients, partners, senior leadership' },
]


const RELATED = [
  { label: 'Seasonal Guide', title: 'Diwali Corporate Gifts: Ideas for Every Budget', href: '/guides/diwali-corporate-gifts' },
  { label: 'Employees', title: 'Diwali Gifts for Employees', href: '/guides/diwali-gifts-for-employees' },
  { label: 'Collection', title: 'Corporate Gift Hampers', href: '/collections/hampers' },
  { label: 'Budget', title: 'Corporate Gifts Under ₹1,000', href: '/guides/corporate-gifts-under-1000' },
  { label: 'Bengaluru', title: 'Bulk Corporate Gifting in Bangalore', href: '/bangalore-corporate-gifting/bulk-gifting' },
  { label: 'Personalisation', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
  { label: 'Sustainable', title: 'Eco-Friendly Corporate Gifts', href: '/collections/eco-friendly-gifts' },
  { label: 'Planning', title: 'Corporate Gifting Budget Guide', href: '/guides/corporate-gifting-budget' },
]

const formatPrice = (n: number) => `₹${n.toLocaleString('en-IN')}`

export default function DiwaliHubClient({ products }: { products: DiwaliProduct[] }) {
  const [tier, setTier] = useState<TierKey | 'all'>('all')

  const jumpToTier = useCallback((t: TierKey | 'all') => {
    setTier(t)
    document.getElementById('hampers')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const prices = products.map(p => p.price)
  const minPrice = prices.length ? Math.min(...prices) : 434
  const maxPrice = prices.length ? Math.max(...prices) : 2170
  const tierCounts = Object.fromEntries(TIERS.map(t => [t.key, products.filter(p => tierFor(p.price).key === t.key).length]))

  const byId = new Map(products.map(p => [String(p.id), p]))
  const heroPicks = HERO_PICKS.map(id => byId.get(id)).filter((p): p is DiwaliProduct => Boolean(p && p.image?.url))
  const heroImages = heroPicks.length >= 3 ? heroPicks : products.filter(p => p.image?.url).slice(0, 3)

  return (
    <div className="cp-wrapper">
      <Navbar />

      {/* 1. HERO */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-hero-inner">
          <div>
            <nav className="cp-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="cp-breadcrumb-sep">›</span>
              <span className="cp-breadcrumb-current">Corporate Diwali Gifts 2026</span>
            </nav>
            <div className="cp-hero-eyebrow">Corporate Diwali Gifting 2026</div>
            <h1 className="cp-hero-title">
              Corporate Diwali Gifts 2026:<br />
              <em>Hampers &amp; Gift Boxes Your Team Will Actually Keep</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              {products.length} curated corporate Diwali gift hampers for employees, clients and leadership,
              from {formatPrice(minPrice)} to {formatPrice(maxPrice)} per unit. Assembled in Bengaluru with your
              logo on the box, delivered across Karnataka and all of India before Diwali.
            </p>
            <div className="cp-hero-ctas">
              <a href="#hampers" className="cp-hero-cta-primary">Browse {products.length} Diwali Hampers ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Diwali Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">🪔 Diwali: Sun 8 Nov 2026</span>
              <span className="cp-hero-badge">✓ Order by 24 Oct for guaranteed delivery</span>
              <span className="cp-hero-badge">✓ MOQ 10 units</span>
              <span className="cp-hero-badge">✓ Logo branding</span>
              <span className="cp-hero-badge">✓ GST invoice</span>
              <span className="cp-hero-badge">✓ Pan-India delivery</span>
            </div>
          </div>
          {heroImages.length > 0 && (
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                {heroImages.map((p, i) => (
                  <div key={p.id} className="cp-hero-visual-card">
                    <Image
                      src={p.image!.url!}
                      alt={`${p.name} - corporate Diwali gift hamper by MintBox`}
                      width={600}
                      height={600}
                      className={`cp-hero-img-actual${i === 0 ? ' cp-hero-img-actual--tall' : ''}`}
                      // The hero visual is display:none below 1024px, so these
                      // stay lazy: a hidden lazy image is never fetched, which
                      // keeps ~1MB of hamper photos off the mobile critical path.
                      loading="lazy"
                      sizes={i === 0 ? '(max-width: 1024px) 60vw, 270px' : '(max-width: 1024px) 40vw, 140px'}
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. DEADLINE STRIP */}
      <div className="dh-deadline" role="note">
        <div className="cp-container dh-deadline-inner">
          <span className="dh-deadline-item"><strong>Diwali 2026:</strong> {DIWALI_DATE_LABEL}</span>
          <span className="dh-deadline-sep" aria-hidden="true">·</span>
          <span className="dh-deadline-item"><strong>Confirm by:</strong> {ORDER_BY_LABEL} for guaranteed pre-Diwali delivery</span>
          <span className="dh-deadline-sep" aria-hidden="true">·</span>
          <span className="dh-deadline-item"><strong>Dispatch:</strong> 7–10 working days after confirmation</span>
        </div>
      </div>

      {/* 3. QUICK ANSWER */}
      <div className="cp-aeo-band">
        <div className="cp-container--narrow">
          <QuickAnswerBox
            title="Quick Answer"
            content={`Corporate Diwali gifts in 2026 cost ${formatPrice(minPrice)} to ${formatPrice(maxPrice)} per unit for a ready-to-gift hamper with dry fruits, copper or eco drinkware, lamps or tech accessories in a printed gift box. Diwali falls on ${DIWALI_DATE_LABEL}; confirm orders by 24 October for guaranteed delivery with logo branding. Minimum order is 10 units, GST invoice included, pan-India delivery from Bengaluru.`}
          />
          <EATSignal
            credentials={[
              `${products.length} ready-to-gift Diwali hampers with full contents listed`,
              'Assembled and quality-checked in Bengaluru',
              'Logo on box, printed insert card and name personalisation available',
              'Sealed, FSSAI-compliant dry fruits and branded chocolates',
              'GST invoice on every order, pan-India dispatch with tracking',
            ]}
          />
        </div>
      </div>

      {/* 4. STATS */}
      <section className="cp-section cp-section--white" aria-label="Key facts">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">{products.length}</div>
              <div className="cp-stat-label">ready-to-gift Diwali hampers</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">{formatPrice(minPrice)}<span className="cp-stat-unit">/unit</span></div>
              <div className="cp-stat-label">starting price, ex GST</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">10<span className="cp-stat-unit"> units</span></div>
              <div className="cp-stat-label">minimum order per hamper</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">24 Oct</div>
              <div className="cp-stat-label">last date for guaranteed delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHOP BY BUDGET */}
      <section className="cp-section cp-section--cream" aria-labelledby="by-budget-title">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Shop by Budget</div>
          <h2 id="by-budget-title" className="cp-section-title">Corporate Diwali Gift Hampers by Budget</h2>
          <p className="cp-section-sub">
            Three tiers, one order. Most companies pair a Team tier hamper for all staff with a Leadership tier hamper for clients.
            Every price is the per-unit price at the minimum order; 100+ unit pricing comes with your quote.
          </p>
          <div className="cp-budget-grid">
            {TIERS.map((t, i) => {
              const variant = i === 0 ? 'subtle' : i === 1 ? 'mid' : 'premium'
              const tone = i === 0 ? 'dark' : 'light'
              return (
                <button
                  key={t.key}
                  type="button"
                  className={`cp-budget-card cp-budget-card--${variant} dh-tier-card`}
                  onClick={() => jumpToTier(t.key)}
                  aria-label={`See ${tierCounts[t.key]} ${t.title} hampers, ${t.range} per unit`}
                >
                  <div className={`cp-budget-label cp-budget-label--${tone}`}>{t.title}</div>
                  <div className={`cp-budget-price cp-budget-price--${tone}`}>{t.range}</div>
                  <p className={`cp-tier-desc cp-tier-desc--${tone}`}>{t.desc}</p>
                  <p className={`dh-tier-best dh-tier-best--${tone}`}>Best for: {t.bestFor}</p>
                  <span className={`cp-budget-cta cp-budget-cta--${tone}`}>See {tierCounts[t.key]} hampers →</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. HAMPER SHOWCASE */}
      <section id="hampers" className="cp-section cp-section--white dh-anchor" aria-labelledby="hampers-title">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The 2026 Collection</div>
          <h2 id="hampers-title" className="cp-section-title">All {products.length} Corporate Diwali Gift Hampers</h2>
          <p className="cp-section-sub">
            Filter by budget or theme, open &ldquo;What&rsquo;s inside&rdquo; to see every item, and add hampers to your pack.
            One quote covers everything, including logo branding and delivery.
          </p>
          <DiwaliHamperShowcase products={products} tier={tier} onTierChange={setTier} />
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="cp-section cp-section--cream" aria-labelledby="how-title">
        <div className="cp-container">
          <div className="cp-section-eyebrow">How It Works</div>
          <h2 id="how-title" className="cp-section-title">From Shortlist to Delivered in Four Steps</h2>
          <p className="cp-section-sub">No sales calls needed to get pricing. Shortlist here, get a quote and mockup, confirm, and we handle the rest.</p>
          <div className="cp-steps cp-steps--4">
            {STEPS.map(s => (
              <div key={s.num} className="cp-step">
                <div className="cp-step-num">{s.num}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{s.title}</div>
                  <div className="cp-step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BRANDING & PACKAGING */}
      <section className="cp-section cp-section--white" aria-labelledby="branding-title">
        <div className="cp-container">
          <div className="cp-img-text-split">
            <div>
              <div className="cp-section-eyebrow">Branding &amp; Packaging</div>
              <h2 id="branding-title" className="cp-section-title">Your Logo on the Box, Not Just a Sticker</h2>
              <p className="cp-section-sub" style={{ marginBottom: 20 }}>
                Diwali is the one occasion where the packaging matters as much as the gift. Every hamper ships in a rigid
                printed box, and branding is built in rather than bolted on.
              </p>
              <ul className="cp-feature-list">
                <li><strong>Logo on the gift box or sleeve.</strong> Printed to match your brand colours, approved on a mockup before production.</li>
                <li><strong>Printed insert card.</strong> Your Diwali message and signature, in English or bilingual, tucked inside every box.</li>
                <li><strong>Name personalisation.</strong> Recipient names on the card, and on bottles, notebooks or mugs in select hampers.</li>
                <li><strong>Multi-city dispatch.</strong> One order, many addresses: offices, warehouses or employee homes, each with tracking.</li>
              </ul>
            </div>
            {heroImages[1] && (
              <Image
                src={heroImages[1].image!.url!}
                alt={`${heroImages[1].name} - Diwali gift box with logo branding option`}
                width={800}
                height={800}
                sizes="(max-width: 768px) 100vw, 560px"
                unoptimized
              />
            )}
          </div>
        </div>
      </section>

      {/* 9. TIMELINE */}
      <section className="cp-section cp-section--cream" aria-labelledby="timeline-title">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Ordering Timeline</div>
          <h2 id="timeline-title" className="cp-section-title">Diwali 2026 Order Deadlines</h2>
          <p className="cp-section-sub">
            Diwali is on {DIWALI_DATE_LABEL}. Dispatch takes 7 to 10 working days after confirmation, so the earlier you confirm,
            the more choice and branding you get.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th scope="col">Confirm order</th>
                  <th scope="col">What you get</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {TIMELINE.map(r => (
                  <tr key={r.when}>
                    <td style={{ fontWeight: 500, color: 'var(--forest-green,#1B4D3E)', whiteSpace: 'nowrap' }}>{r.when}</td>
                    <td style={{ fontWeight: 500 }}>{r.status}</td>
                    <td style={{ fontWeight: 300 }}>{r.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 10. COMPARISON */}
      <section className="cp-section cp-section--white" aria-labelledby="compare-title">
        <div className="cp-container">
          <div className="cp-section-eyebrow">At a Glance</div>
          <h2 id="compare-title" className="cp-section-title">Which Diwali Hamper Tier Fits Whom</h2>
          <p className="cp-section-sub">Per-unit prices at the 10-unit minimum, exclusive of GST. Printed gift box included in every tier.</p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th scope="col">Tier</th>
                  <th scope="col">Price / unit</th>
                  <th scope="col">Typical contents</th>
                  <th scope="col">Best for</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(r => (
                  <tr key={r.tier}>
                    <td style={{ fontWeight: 500 }}>{r.tier}</td>
                    <td style={{ fontWeight: 500, color: 'var(--forest-green,#1B4D3E)', whiteSpace: 'nowrap' }}>{r.price}</td>
                    <td style={{ fontWeight: 300 }}>{r.contents}</td>
                    <td style={{ fontWeight: 300 }}>{r.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 11. QUOTE */}
      <section id="quote" className="cp-cta-section dh-anchor" aria-labelledby="quote-title">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Diwali 2026 Quote</div>
            <h2 id="quote-title" className="cp-cta-title">Get Your Diwali<br />Proposal in 4 Hours</h2>
            <p className="cp-cta-desc">
              Tell us headcount, budget per head and delivery cities. You get per-unit pricing, a branding mockup and
              a GST-ready quote, usually within 4 working hours.
            </p>
            <ul className="cp-cta-promises">
              <li className="cp-cta-promise"><span className="cp-cta-promise-dot" />Mixed tiers in one order</li>
              <li className="cp-cta-promise"><span className="cp-cta-promise-dot" />Samples available in Bengaluru</li>
              <li className="cp-cta-promise"><span className="cp-cta-promise-dot" />Pan-India delivery with tracking</li>
            </ul>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm title="Plan Your Diwali Gifting" ctaLabel="Get Diwali Quote" defaultOccasion="diwali" />
          </div>
        </div>
      </section>

      <MidPageCTA variant="whatsapp" />

      {/* 12. FAQ */}
      <section className="cp-section cp-section--cream" aria-label="Frequently asked questions">
        <div className="cp-container--narrow">
          <FAQSection items={DIWALI_HUB_FAQS} emitSchema={false} eyebrow="FAQ" title="Corporate Diwali Gifts 2026: Frequently Asked Questions" />
        </div>
      </section>

      {/* 13. RELATED */}
      <section className="cp-section cp-section--white" aria-labelledby="related-title">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Keep Reading</div>
          <h2 id="related-title" className="cp-section-title">Diwali Gifting Guides &amp; Related Collections</h2>
          <div className="cp-related-grid">
            {RELATED.map(link => (
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
        <LastUpdatedDate date={LAST_UPDATED} />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
