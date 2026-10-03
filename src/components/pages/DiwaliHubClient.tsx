'use client'

import GoogleReviews from '@/components/content/GoogleReviews'
import ClientLogos from '@/components/content/ClientLogos'
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
import DiwaliSeeAlso from '@/components/content/DiwaliSeeAlso'
import {
  COURIER_LABEL,
  DAMAGE_POLICY,
  DISPATCH_LABEL,
  DIWALI_DATE_LABEL,
  GSTIN,
  LAST_UPDATED,
  LAST_WORKING_DAY_LABEL,
  MOQ,
  ORDER_BY,
  PAYMENT_TERMS,
  QUOTE_VALIDITY,
  diwaliStats,
  formatPrice,
  formatRange,
  getDiwaliHubFaqs,
  isAddOn,
  type TierKey,
} from '@/components/pages/diwaliHubData'
import DiwaliHamperShowcase, { type DiwaliProduct } from '@/components/content/DiwaliHamperShowcase'

// Hero thumbnails are pre-cropped to the box contents (the source product
// photos carry a title banner that object-fit: cover would cut mid-word) and
// pre-sized to ~2x their 204px display width. Served as static files because
// Vercel image optimisation is off for this project.
const HERO_IMAGES = [
  { src: '/catalog/diwali-hub/hero-copper.webp', w: 420, h: 822, alt: 'Copper bottle, tumblers and diyas in a gold Diwali gift box' },
  { src: '/catalog/diwali-hub/hero-combo.webp', w: 420, h: 420, alt: 'Diwali combo box with LED lamp, diyas and dry-fruit jars' },
  { src: '/catalog/diwali-hub/hero-bamboo.webp', w: 420, h: 420, alt: 'Bamboo bottle, mug and charging cable in a Diwali gift box' },
]

const STEPS = [
  { num: '1', title: 'Shortlist & add to pack', desc: 'Filter by budget or theme, open any hamper to see exactly what is inside, and add the ones you like.' },
  { num: '2', title: 'Reply within 1 hour', desc: 'Share headcount, budget and delivery cities. You get volume pricing, a branding mockup and a GST-ready quote with branding and delivery itemised.' },
  { num: '3', title: 'Approve & confirm', desc: 'Sign off on the mockup and quantities and pay the 50% advance. Production and packing start as soon as the order is confirmed.' },
  { num: '4', title: 'Delivered before Diwali', desc: 'Assembled in Bengaluru and dispatched to one office or many cities, with tracking shared on WhatsApp.' },
]

const TIMELINE = [
  { when: `Now – ${ORDER_BY.day}`, status: 'Guaranteed delivery anywhere in India', detail: `Full choice, logo branding on box and insert card, name personalisation on select items. Delivered by ${LAST_WORKING_DAY_LABEL}.` },
  { when: '26 – 31 October', status: 'Bengaluru, from ready stock', detail: 'Ready-stock gifts with a printed insert card, delivered in Bengaluru before Diwali. Other cities on request, subject to courier timelines. Logo-printed boxes subject to print slots.' },
  { when: '1 November onward', status: 'Bengaluru rush orders', detail: 'Bengaluru delivery from available stock only. Confirm on WhatsApp before ordering.' },
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

export default function DiwaliHubClient({ products }: { products: DiwaliProduct[] }) {
  const [tier, setTier] = useState<TierKey | 'all'>('all')
  // Budget tiers show hampers & gift boxes only; single products get their
  // own add-on section below.
  const hampers = products.filter(p => !isAddOn(p))
  const addOns = products.filter(p => isAddOn(p))
  const [addOnTier, setAddOnTier] = useState<TierKey | 'all'>('all')

  const jumpToTier = useCallback((t: TierKey | 'all') => {
    setTier(t)
    document.getElementById('hampers')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Same function the server uses for metadata and JSON-LD, so every number
  // on the page agrees with the product grid below it.
  const stats = diwaliStats(products)
  const faqs = getDiwaliHubFaqs(stats)

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
              Corporate Diwali Gifts 2026:{' '}<br />
              <em>Hampers Your Team Will Keep</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              {stats.hampers} corporate Diwali hampers &amp; gift boxes from {formatPrice(stats.hamperMin)} to {formatPrice(stats.hamperMax)} per unit, plus {stats.singles} add-on gifts from {formatPrice(stats.addOnMin)}. Assembled in Bengaluru with your logo and delivered across India.
            </p>
            <div className="cp-hero-ctas">
              <a href="#hampers" className="cp-hero-cta-primary">Browse {stats.hampers} Diwali hampers ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Request a quote</a>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid dh-hero-grid">
              {HERO_IMAGES.map((img, i) => (
                <div key={img.src} className="cp-hero-visual-card">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.w}
                    height={img.h}
                    className={`cp-hero-img-actual${i === 0 ? ' cp-hero-img-actual--tall' : ''}`}
                    // ~50KB each, so loading them eagerly costs little even on
                    // mobile where the visual is hidden, and the desktop hero
                    // no longer pops in after first paint.
                    loading="eager"
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero chips */}
      <div className="cp-hero-chips">
        <div className="cp-container">
          <div className="cp-hero-badge-group">
            <span className="cp-hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ verticalAlign: '-2px', marginRight: 6 }}>
                <path d="M12 3c1.6 2 2.4 3.6 2.4 4.8a2.4 2.4 0 0 1-4.8 0C9.6 6.6 10.4 5 12 3z" fill="currentColor" />
                <path d="M3 13h18c-.6 3.9-4.4 6-9 6s-8.4-2.1-9-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              Diwali: Sun 8 Nov 2026
            </span>
            <span className="cp-hero-badge">✓ Confirm by {ORDER_BY.short} for guaranteed pan-India delivery</span>
            <span className="cp-hero-badge">✓ MOQ {MOQ} units</span>
            <span className="cp-hero-badge">✓ Logo branding</span>
            <span className="cp-hero-badge">✓ GST invoice</span>
            <span className="cp-hero-badge">✓ Pan-India delivery</span>
          </div>
        </div>
      </div>

      <ClientLogos />

      {/* 2. DEADLINE STRIP */}
      <div className="dh-deadline" role="note">
        <div className="cp-container dh-deadline-inner">
          <span className="dh-deadline-item"><strong>Diwali 2026:</strong> {DIWALI_DATE_LABEL}</span>
          <span className="dh-deadline-sep" aria-hidden="true">·</span>
          <span className="dh-deadline-item"><strong>Confirm by:</strong> {ORDER_BY.long} for delivery anywhere in India by {LAST_WORKING_DAY_LABEL}</span>
          <span className="dh-deadline-sep" aria-hidden="true">·</span>
          <span className="dh-deadline-item"><strong>Dispatch:</strong> {DISPATCH_LABEL} of confirmation, plus {COURIER_LABEL} courier outside Bengaluru</span>
        </div>
      </div>

      {/* 3. QUICK ANSWER */}
      <div className="cp-aeo-band">
        <div className="cp-container--narrow">
          <QuickAnswerBox
            title="Quick Answer"
            content={`Corporate Diwali hampers and gift boxes cost ${formatRange(stats.hamperMin, stats.hamperMax)} per unit ex GST at MintBox, across ${stats.hampers} options with dry fruits, copper or eco drinkware, lamps or tech accessories. ${stats.singles} add-on gifts start at ${formatPrice(stats.addOnMin)}. Diwali falls on ${DIWALI_DATE_LABEL}; confirm by ${ORDER_BY.day} for guaranteed delivery anywhere in India before the last working day, ${LAST_WORKING_DAY_LABEL}. Minimum order is ${MOQ} units per item, GST invoice included.`}
          />
          <EATSignal
            credentials={[
              `${stats.hampers} ready-to-gift Diwali hampers with full contents listed`,
              'Assembled and quality-checked in Bengaluru',
              'Logo on box, printed insert card and name personalisation available',
              'Sealed, FSSAI-compliant dry fruits and branded chocolates',
              'GST invoice on every order, pan-India dispatch with tracking',
            ]}
          />
          <DiwaliSeeAlso current="hub" />
        </div>
      </div>

      {/* 4. STATS */}
      <section className="cp-section cp-section--white" aria-label="Key facts">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">{stats.hampers}</div>
              <div className="cp-stat-label">hampers &amp; gift boxes, plus {stats.singles} add-on gifts</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">{formatPrice(stats.hamperMin)}<span className="cp-stat-unit">/unit</span></div>
              <div className="cp-stat-label">hampers from, ex GST</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">{MOQ}<span className="cp-stat-unit"> units</span></div>
              <div className="cp-stat-label">minimum order per item</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">{ORDER_BY.short}</div>
              <div className="cp-stat-label">confirm by, for guaranteed pan-India delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHOP BY BUDGET */}
      <section className="cp-section cp-section--cream" aria-labelledby="by-budget-title">
        <div className="cp-container">
          <h2 id="by-budget-title" className="cp-section-title">Corporate Diwali Gift Hampers by Budget</h2>
          <p className="cp-section-sub">
            Five budget bands, one order. Most companies pair an All-staff or Team tier gift for employees with a Leadership or Client tier hamper for key accounts.
            Tiers cover hampers &amp; gift boxes; each range is the actual price span of the hampers in that band, per unit at the
            {MOQ}-unit minimum, ex GST. Single gifts are listed separately as add-ons.
          </p>
          <div className="cp-budget-grid">
            {stats.tiers.filter(t => t.count > 0).map(({ tier: t, count, range }, i, all) => {
              const variant = i === 0 ? 'subtle' : i < all.length - 2 ? 'mid' : 'premium'
              const tone = i === 0 ? 'dark' : 'light'
              return (
                <button
                  key={t.key}
                  type="button"
                  className={`cp-budget-card cp-budget-card--${variant} dh-tier-card`}
                  onClick={() => jumpToTier(t.key)}
                  aria-label={`See ${count} ${t.title} hampers, ${range} per unit`}
                >
                  <div className={`cp-budget-label cp-budget-label--${tone}`}>{t.title} · {t.label}</div>
                  <div className={`cp-budget-price cp-budget-price--${tone}`}>{range}</div>
                  <p className={`cp-tier-desc cp-tier-desc--${tone}`}>{t.desc}</p>
                  <p className={`dh-tier-best dh-tier-best--${tone}`}>Best for: {t.bestFor}</p>
                  <span className={`cp-budget-cta cp-budget-cta--${tone}`}>See {count} hampers →</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. HAMPER SHOWCASE */}
      <section id="hampers" className="cp-section cp-section--white dh-anchor" aria-labelledby="hampers-title">
        <div className="cp-container">
          <h2 id="hampers-title" className="cp-section-title">All {stats.hampers} Corporate Diwali Hampers &amp; Gift Boxes</h2>
          <p className="cp-section-sub">
            Sorted by price, grouped by budget. Open &ldquo;What&rsquo;s inside&rdquo; to see every item and add hampers to
            your pack at the {MOQ}-unit minimum. One quote covers everything, including logo branding and delivery.
          </p>
          <DiwaliHamperShowcase products={hampers} tier={tier} onTierChange={setTier} defaultOccasion="diwali" />
        </div>
      </section>

      {/* 6b. ADD-ONS */}
      {addOns.length > 0 && (
        <section id="add-ons" className="cp-section cp-section--cream dh-anchor" aria-labelledby="addons-title">
          <div className="cp-container">
            <div className="cp-section-eyebrow">Add-on Gifts</div>
            <h2 id="addons-title" className="cp-section-title">{stats.singles} Add-on Gifts, {formatRange(stats.addOnMin, stats.addOnMax)}</h2>
            <p className="cp-section-sub">
              Diyas, candles, drinkware and other single gifts. Add them to a hamper order, use them to top up a budget, or
              gift them on their own. Same {MOQ}-unit minimum, same quote.
            </p>
            <DiwaliHamperShowcase
              products={addOns}
              tier={addOnTier}
              onTierChange={setAddOnTier}
              defaultOccasion="diwali"
              variant="addons"
              showPackBar={false}
            />
          </div>
        </section>
      )}

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
            <figure className="dh-logo-figure">
              <Image
                src="/catalog/diwali-hub/logo-on-box.webp"
                alt="Copper Diwali hamper with a sample company logo and Diwali message printed on the front of the gift box"
                width={840}
                height={627}
                sizes="(max-width: 768px) 100vw, 560px"
                unoptimized
              />
              <figcaption>Illustrative mockup: your logo and message printed on the box front. You approve a mockup with your real artwork before production.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 9. TIMELINE */}
      <section className="cp-section cp-section--cream" aria-labelledby="timeline-title">
        <div className="cp-container">
          <h2 id="timeline-title" className="cp-section-title">Diwali 2026 Order Deadlines</h2>
          <p className="cp-section-sub">
            Diwali is on {DIWALI_DATE_LABEL}, and most offices close after {LAST_WORKING_DAY_LABEL}. Diwali orders dispatch {DISPATCH_LABEL} of
            confirmation, plus {COURIER_LABEL} of courier time outside Bengaluru, so {ORDER_BY.day} is the last date we can guarantee
            delivery anywhere in India.
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
          <p className="cp-section-sub">Actual per-unit price ranges of the hampers &amp; gift boxes on this page at the {MOQ}-unit minimum, exclusive of GST.</p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th scope="col">Tier</th>
                  <th scope="col">Price / unit</th>
                  <th scope="col">Hampers</th>
                  <th scope="col">Typical contents</th>
                  <th scope="col">Best for</th>
                </tr>
              </thead>
              <tbody>
                {stats.tiers.filter(t => t.count > 0).map(({ tier: t, count, range }) => (
                  <tr key={t.key}>
                    <td style={{ fontWeight: 500 }}>{t.title}</td>
                    <td style={{ fontWeight: 500, color: 'var(--forest-green,#1B4D3E)', whiteSpace: 'nowrap' }}>{range}</td>
                    <td style={{ fontWeight: 300 }}>{count}</td>
                    <td style={{ fontWeight: 300 }}>{t.typical}</td>
                    <td style={{ fontWeight: 300 }}>{t.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 10b. PROCUREMENT */}
      <section id="procurement" className="cp-section cp-section--cream" aria-labelledby="procurement-title">
        <div className="cp-container">
          <div className="cp-section-eyebrow">For Procurement &amp; Finance</div>
          <h2 id="procurement-title" className="cp-section-title">Pricing, Payment &amp; Policies</h2>
          <p className="cp-section-sub">What your purchase team needs to raise a PO, in one place.</p>
          <div className="dh-proc-grid">
            <div className="dh-proc-card">
              <h3>What the listed price covers</h3>
              <p>
                Prices are per unit at the {MOQ}-unit minimum, exclusive of GST, and include the gift box. Logo branding and
                delivery are quoted as separate line items. {QUOTE_VALIDITY}
              </p>
            </div>
            <div className="dh-proc-card">
              <h3>Volume pricing</h3>
              <p>
                The per-unit price drops as quantity rises. Your quote shows the exact price at your quantity; share two or three
                headcount scenarios and we price each one.
              </p>
            </div>
            <div className="dh-proc-card">
              <h3>Branding &amp; delivery costs</h3>
              <p>
                Branding depends on print method and quantity (box sleeve, printed insert card, on-product print). Delivery is
                priced per consignment for office drops or per address for employee homes. Both are itemised in your quote.
              </p>
            </div>
            <div className="dh-proc-card">
              <h3>Payment terms</h3>
              <p>{PAYMENT_TERMS}</p>
            </div>
            <div className="dh-proc-card">
              <h3>Damage &amp; replacement</h3>
              <p>{DAMAGE_POLICY}</p>
            </div>
            <div className="dh-proc-card">
              <h3>GST invoice &amp; shortlist</h3>
              <p>
                GST invoice in your company&rsquo;s name with HSN codes on every order, so you can claim input tax credit.
                MintBox GSTIN: <strong>{GSTIN}</strong>. Add gifts to your pack and use <a href="/diwali-corporate-gifts/shortlist">Download
                shortlist (PDF)</a> to share it internally. Full terms: <a href="/terms">Terms of Service</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. QUOTE */}
      <section id="quote" className="cp-cta-section dh-anchor" aria-labelledby="quote-title">
        <div className="cp-cta-section-inner">
          <div>
            <h2 id="quote-title" className="cp-cta-title">Get Your Diwali{' '}<br />Proposal</h2>
            <p className="cp-cta-desc">
              Tell us headcount, budget per head and delivery cities. You get per-unit pricing, a branding mockup and
              a GST-ready quote. We reply within 1 hour on business days.
            </p>
            <ul className="cp-cta-promises">
              <li className="cp-cta-promise"><span className="cp-cta-promise-dot" />Mixed tiers in one order</li>
              <li className="cp-cta-promise"><span className="cp-cta-promise-dot" />Samples available in Bengaluru</li>
              <li className="cp-cta-promise"><span className="cp-cta-promise-dot" />Pan-India delivery with tracking</li>
            </ul>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm title="Plan Your Diwali Gifting" ctaLabel="Request a quote" defaultOccasion="diwali" />
          </div>
        </div>
      </section>

      <MidPageCTA variant="whatsapp" />

      <GoogleReviews />

      {/* 12. FAQ */}
      <section className="cp-section cp-section--cream" aria-label="Frequently asked questions">
        <div className="cp-container--narrow">
          <FAQSection items={faqs} emitSchema={false} eyebrow="FAQ" title="Corporate Diwali Gifts 2026: Frequently Asked Questions" />
        </div>
      </section>

      {/* 13. RELATED */}
      <section className="cp-section cp-section--white" aria-labelledby="related-title">
        <div className="cp-container">
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
