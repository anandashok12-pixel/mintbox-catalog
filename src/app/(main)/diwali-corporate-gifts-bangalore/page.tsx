import type { Metadata } from 'next'
import { cache } from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  Buildings,
  Certificate,
  CheckCircle,
  House,
  MapPinLine,
  Package,
  Phone,
  Receipt,
  ShieldCheck,
  Star,
} from '@phosphor-icons/react/dist/ssr'
import { CLIENTS } from '@/components/content/ClientLogos'
import { getGoogleReviews, type GoogleReview, type GoogleReviewsPayload } from '@/lib/googleReviews'
import {
  GSTIN,
  MOQ,
  diwaliStats,
  formatPrice,
  getDiwaliHubFaqs,
  isAddOn,
  moqFor,
  tierFor,
} from '@/components/pages/diwaliHubData'
import type { DiwaliProduct } from '@/components/content/DiwaliHamperShowcase'
import QuoteForm from '@/components/ads/diwali/QuoteForm'
import HamperPicker, { type SlimHamper, type TierTab } from '@/components/ads/diwali/HamperPicker'
import PaperworkForm from '@/components/ads/diwali/PaperworkForm'
import { MobileBar, RevealOnScroll, WhatsAppFloat, WhatsAppLink } from '@/components/ads/diwali/Islands'
import { PRIMARY_CTA } from '@/components/ads/diwali/offer'
import './diwali-ads.css'

// Google Ads landing page. Deliberately noindex: the organic page for the
// same queries is /diwali-corporate-gifts, and two indexable pages would
// compete with each other. No site navigation, one primary action.
const PAGE_URL = 'https://themintbox.in/diwali-corporate-gifts-bangalore'
const DIWALI_CATEGORY_SLUGS = ['diwali-gift-boxes', 'diwali-2026-products']
const HERO_PRODUCT_ID = '475'
const PHONE_DISPLAY = '+91 98865 37631'
const PHONE_HREF = 'tel:+919886537631'
const ORDER_BY_DATE = new Date('2026-10-25T23:59:59+05:30')

export const dynamic = 'force-dynamic'

// Headline per ad group, chosen by ?for= so the page repeats what the ad said.
const HEADLINES: Record<string, { lead: string; em: string }> = {
  team: { lead: 'Corporate Diwali gifts,', em: 'delivered across Bengaluru.' },
  employees: { lead: 'Diwali gifts for employees,', em: 'delivered across Bengaluru.' },
  clients: { lead: 'Premium Diwali hampers', em: 'for your clients.' },
  bulk: { lead: 'Bulk Diwali gift boxes,', em: 'branded and delivered.' },
}

// The page renders per request (force-dynamic), so this is read fresh each time.
function isBeforeCutoff() {
  return Date.now() <= ORDER_BY_DATE.getTime()
}

/** No en or em dashes on this page: the shared data uses them in ranges. */
const dash = (s: string) => s.replace(/[–—]/g, '-')

const getProducts = cache(async (): Promise<DiwaliProduct[]> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const cats = await payload.find({
      collection: 'categories',
      where: { slug: { in: DIWALI_CATEGORY_SLUGS } },
      limit: 10,
    })
    const ids = cats.docs.map(d => d.id as number)
    if (!ids.length) return []
    const res = await payload.find({
      collection: 'products',
      where: { and: [{ category: { in: ids } }, { inStock: { equals: true } }] },
      sort: 'order',
      pagination: false,
      depth: 1,
    })
    return res.docs as unknown as DiwaliProduct[]
  } catch (err) {
    console.error('[diwali-ads] Payload query failed:', err)
    return []
  }
})

const getReviews = cache(async (): Promise<GoogleReviewsPayload> => {
  const data = await getGoogleReviews()
  if (data.reviews.length || process.env.NODE_ENV !== 'development') return data
  // Local dev has no Places API key: borrow production's public, cached
  // payload so the section can be seen and checked while building.
  try {
    const res = await fetch('https://themintbox.in/api/google-reviews', { next: { revalidate: 3600 } })
    if (res.ok) return (await res.json()) as GoogleReviewsPayload
  } catch {}
  return data
})

/** Trims a review to whole sentences so a quote fits in a glance. */
function excerpt(text: string, max: number): string {
  const clean = dash(text.replace(/\s+/g, ' ').trim())
  if (clean.length <= max) return clean
  const sentences = clean.match(/[^.!?]+[.!?]+/g) ?? []
  let out = ''
  for (const s of sentences) {
    if ((out + s).length > max) break
    out += s
  }
  return (out || clean.slice(0, max).replace(/\s+\S*$/, '')).trim() + (out ? '' : '…')
}

// Every photo on this page, in one place. To swap in a new image, save it
// under public/diwali-ads/ and change the path here. Sizes are the crop
// each slot shows; any larger image with the same aspect ratio works.
const IMAGES = {
  /** Hero, left column, 16:10. Falls back to this when the CMS hero product has no photo. */
  heroFallback: '/diwali-ads/hero.webp',
  /** Full-bleed band after the hampers, ~21:9. */
  band: '/diwali-ads/band-packing.webp',
  /** Personalisation bento, large cell, roughly 4:5. */
  brandingLogo: '/diwali-ads/branding-logo.webp',
  /** Personalisation bento, small wide cell, ~16:10. */
  brandingNames: '/diwali-ads/branding-names.webp',
  /** Delivery section, under the three modes, 16:10. */
  delivery: '/diwali-ads/delivery-office.webp',
  /** Testimonial feature card background, roughly 4:5. */
  testimonial: '/diwali-ads/testimonial.webp',
}

// Real MintBox photography, as used in the homepage strip (4:5 each).
const STRIP = [
  { src: '/hampers/hero1.webp', alt: 'Wooden gift box with sweets and a greeting card' },
  { src: '/hampers/hero2.webp', alt: 'Desk hamper with mug, notebook and chocolates' },
  { src: '/hampers/hero3.webp', alt: 'Festive hamper with dry fruits and a printed pouch' },
  { src: '/hampers/hero4.webp', alt: 'Rigid gift box with a printed lid and ribbon' },
  { src: '/hampers/hero5.webp', alt: 'Glass bottle with dry fruit pouches in a gift box' },
  { src: '/hampers/diwali.webp', alt: 'Diwali hamper with copper bottle, tumblers and lamp' },
]

export const metadata: Metadata = {
  title: 'Corporate Diwali Gifts in Bengaluru | Bulk Hampers from MintBox',
  description: `Corporate Diwali hampers and gift boxes for employees and clients. Minimum ${MOQ} gifts, logo branding, GST invoice, delivery across Bengaluru and India.`,
  alternates: { canonical: PAGE_URL },
  robots: { index: false, follow: true },
}

function slim(p: DiwaliProduct): SlimHamper {
  const price = Number(p.price)
  const items = (p.features ?? []).map(f => f.feature).filter(Boolean)
  return {
    id: String(p.id),
    name: dash(p.name),
    price,
    image: p.image?.sizes?.card?.url || p.image?.url || null,
    // Full-size photo for the pop-up; the card uses the smaller one above.
    imageLarge: p.image?.url || null,
    description: dash(p.description || ''),
    items: items.map(dash),
    moq: moqFor(p),
    customisable: !!p.customisable,
    tier: tierFor(price).key,
  }
}

export default async function DiwaliAdsLanding({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const adGroup = typeof sp.for === 'string' && HEADLINES[sp.for] ? sp.for : 'team'
  const [products, reviewData] = await Promise.all([getProducts(), getReviews()])
  const reviews: GoogleReview[] = reviewData.reviews.filter(r => r.rating >= 4).slice(0, 4)
  const [featured, ...moreReviews] = reviews
  const stats = diwaliStats(products)
  const hamperDocs = products.filter(p => !isAddOn(p) && Number.isFinite(Number(p.price)))
  const hampers = hamperDocs.map(slim)
  const heroDoc =
    hamperDocs.find(p => String(p.id) === HERO_PRODUCT_ID && p.image?.url) ?? hamperDocs.find(p => p.image?.url)
  const heroImage = heroDoc?.image?.url ?? IMAGES.heroFallback

  const tabs: TierTab[] = stats.tiers.map(t => ({
    key: t.tier.key,
    label: dash(t.tier.label),
    title: t.tier.title,
    range: dash(t.range),
    count: t.count,
  }))

  const beforeCutoff = isBeforeCutoff()
  const fromPrice = stats.hamperMin ? formatPrice(stats.hamperMin) : null

  const faqs = [
    ...getDiwaliHubFaqs(stats).map(f => ({ q: dash(f.q), a: dash(f.a) })),
    {
      q: 'Are Diwali gifts taxable for employees?',
      a: 'Gifts to an employee above a set value in a financial year can count as a taxable perquisite for that employee. The threshold and treatment depend on how your company records the gift, so please check with your finance team.',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <div className="dl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RevealOnScroll />

      <header className="dl-nav-wrap">
        <nav className="dl-nav" aria-label="MintBox">
          <Image src="/mintbox-logo-white.webp" alt="MintBox" width={118} height={32} className="dl-logo" loading="eager" />
          <p className="dl-nav-deadline">
            {beforeCutoff ? (
              <>
                Diwali orders: <strong>confirm by Sun 25 Oct</strong>
                <span className="dl-deadline-more"> for delivery before Fri 6 Nov</span>
              </>
            ) : (
              <>
                Past 25 Oct? <strong>Bengaluru orders still ship from ready stock</strong>
              </>
            )}
          </p>
          <div className="dl-nav-actions">
            <a href={PHONE_HREF} className="dl-nav-phone" aria-label={`Call ${PHONE_DISPLAY}`}>
              <Phone size={18} weight="bold" aria-hidden="true" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a href="#quote" className="dl-btn dl-btn--light dl-btn--sm">{PRIMARY_CTA}</a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero: the message on the left, the form on the right. */}
        <section className="dl-hero">
          <div className="dl-geo" aria-hidden="true" />
          <div className="dl-wrap dl-hero-grid">
            <div className="dl-hero-copy">
              <h1 className="dl-h1">
                {HEADLINES[adGroup].lead} <em>{HEADLINES[adGroup].em}</em>
              </h1>
              <p className="dl-hero-sub">
                {`${fromPrice ? `From ${fromPrice} per gift, ex GST. ` : ''}Minimum ${MOQ} gifts. Logo branding, GST invoice, office or home delivery.`}
              </p>
              <div className="dl-hero-media">
                <Image
                  src={heroImage}
                  alt={heroDoc?.image?.url ? dash(heroDoc.name) : 'Illustrative Diwali hamper with copper drinkware, dry fruits and sweets'}
                  fill
                  preload
                  sizes="(max-width: 1023px) 100vw, 640px"
                />
              </div>
            </div>
            <div id="quote" className="dl-hero-form">
              <QuoteForm adGroup={adGroup} />
            </div>
          </div>
        </section>

        {/* Photo strip, as on the homepage. */}
        <div className="dl-strip" role="list" aria-label="MintBox hampers">
          {STRIP.map((p, i) => (
            <div key={p.src} className="dl-strip-item" role="listitem">
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 767px) 62vw, 17vw" loading={i < 3 ? 'eager' : 'lazy'} />
            </div>
          ))}
        </div>

        {/* Trust: real client logos, then four plain facts. */}
        <section className="dl-trust" aria-label="Why teams trust MintBox">
          <div className="dl-wrap">
            <p className="dl-logos-title">Trusted by teams at</p>
            <ul className="dl-logos">
              {CLIENTS.map(c => (
                <li key={c.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- small SVG logos */}
                  <img src={c.src} alt={c.name} style={{ height: Math.round(c.h * 0.8) }} loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
            <dl className="dl-facts">
              <div>
                <dt>Reply within 1 hour</dt>
                <dd>On business days, by phone or WhatsApp</dd>
              </div>
              <div>
                <dt>Packed in Bengaluru</dt>
                <dd>Delivered across Karnataka and India</dd>
              </div>
              <div>
                <dt>GST invoice</dt>
                <dd>GSTIN {GSTIN}</dd>
              </div>
              <div>
                <dt>From {MOQ} gifts</dt>
                <dd>Mix hampers across budgets in one order</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Hampers by budget, from the live catalogue. */}
        <section className="dl-section" aria-labelledby="dl-hampers-title">
          <div className="dl-wrap">
            <div className="dl-head">
              <p className="dl-eyebrow dl-reveal">The Diwali 2026 range</p>
              <h2 id="dl-hampers-title" className="dl-h2 dl-reveal">
                Pick a budget. <em>See what is in the box.</em>
              </h2>
              <p className="dl-lede dl-reveal">
                Prices are per gift at {MOQ} gifts, before GST. Larger orders cost less, and the total on your quote,
                branding and delivery included, is the total on your invoice.
              </p>
            </div>
            {hampers.length > 0 ? (
              <HamperPicker tabs={tabs} hampers={hampers} />
            ) : (
              <div className="dl-empty">
                <p>Our Diwali range is being updated right now.</p>
                <a href="#quote" className="dl-btn dl-btn--primary">{PRIMARY_CTA}</a>
              </div>
            )}
            <p className="dl-after-grid">
              Want something you do not see here? Tell us the budget and we curate to your brief.{' '}
              <a href="#quote">Tell us your numbers.</a>
            </p>
          </div>
        </section>

        <section className="dl-band" aria-label="Packed in Bengaluru">
          <Image src={IMAGES.band} alt="Illustrative packing scene with rows of green gift boxes and gold ribbons" fill sizes="100vw" />
          <div className="dl-wrap dl-band-inner">
            <p className="dl-band-line dl-reveal">
              Packed by hand in Bengaluru. <em>Checked before it leaves.</em>
            </p>
          </div>
        </section>

        {/* Personalisation as a bento: two image cells, two text cells. */}
        <section className="dl-section dl-section--tint" aria-labelledby="dl-brand-title">
          <div className="dl-wrap">
            <div className="dl-head">
              <h2 id="dl-brand-title" className="dl-h2 dl-reveal">Make it feel personal, not bulk.</h2>
            </div>
            <div className="dl-bento">
              <figure className="dl-bento-cell dl-bento-a dl-reveal">
                <Image src={IMAGES.brandingLogo} alt="Illustrative green gift box with a gold foil emblem and satin ribbon" fill sizes="(max-width: 767px) 100vw, 60vw" />
                <figcaption>
                  <strong>Your logo on the box or sleeve</strong>
                  <span>Printed on the box, sleeve, ribbon or insert card.</span>
                </figcaption>
              </figure>
              <div className="dl-bento-cell dl-bento-b dl-reveal">
                <p className="dl-bento-big">48 hours</p>
                <p>
                  <strong>See a mockup before you confirm.</strong> A digital proof of the branded box, so nothing is
                  printed until you have seen it.
                </p>
              </div>
              <div className="dl-bento-cell dl-bento-c dl-reveal">
                <p>
                  <strong>A note from your CEO or HR head</strong>
                </p>
                <p>Your message on a printed card. Say Happy Diwali, or Season&apos;s Greetings for a mixed team.</p>
              </div>
              <figure className="dl-bento-cell dl-bento-d dl-reveal">
                <Image src={IMAGES.brandingNames} alt="Illustrative Diwali gift boxes with cream cards, copper items and dry fruits" fill sizes="(max-width: 767px) 100vw, 40vw" />
                <figcaption>
                  <strong>Each person&apos;s name on their card</strong>
                  <span>Send us the list with your order.</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Delivery: three modes beside the dates that matter. */}
        <section className="dl-section" aria-labelledby="dl-delivery-title">
          <div className="dl-wrap dl-delivery">
            <div>
              <h2 id="dl-delivery-title" className="dl-h2 dl-reveal">One office, five cities, <em>or 400 homes.</em></h2>
              <ul className="dl-modes">
                <li className="dl-reveal">
                  <Buildings size={28} aria-hidden="true" />
                  <div>
                    <h3>Your office</h3>
                    <p>Delivered to reception in one consignment, ready to hand out.</p>
                  </div>
                </li>
                <li className="dl-reveal">
                  <MapPinLine size={28} aria-hidden="true" />
                  <div>
                    <h3>Several offices or cities</h3>
                    <p>Give us a city-wise split and we dispatch to each, tracked on email and WhatsApp.</p>
                  </div>
                </li>
                <li className="dl-reveal">
                  <House size={28} aria-hidden="true" />
                  <div>
                    <h3>Employee homes</h3>
                    <p>Share the address list and every gift ships separately, with tracking per person.</p>
                  </div>
                </li>
              </ul>
              <div className="dl-delivery-photo dl-reveal">
                <Image src={IMAGES.delivery} alt="Illustrative office reception with ribboned green gift boxes on a trolley" fill sizes="(max-width: 1023px) 100vw, 560px" />
              </div>
            </div>
            <ol className="dl-timeline dl-reveal" aria-label="Diwali 2026 order dates">
              <li>
                <time>By 10 Oct</time>
                <p>Best for 200+ gifts or fully custom packaging</p>
              </li>
              <li className="is-key">
                <time>Sun 25 Oct</time>
                <p>Last day to confirm for guaranteed delivery anywhere in India</p>
              </li>
              <li>
                <time>By Fri 30 Oct</time>
                <p>Packed, quality-checked and dispatched from Bengaluru</p>
              </li>
              <li>
                <time>By Fri 6 Nov</time>
                <p>Delivered before the last working day. Bengaluru next day, other cities in 2 to 3 days</p>
              </li>
              <li>
                <time>Sun 8 Nov</time>
                <p>Diwali</p>
              </li>
            </ol>
          </div>
        </section>

        {/* How ordering works, then what we promise if something goes wrong. */}
        <section className="dl-section dl-section--tint" aria-labelledby="dl-how-title">
          <div className="dl-wrap">
            <div className="dl-head">
              <h2 id="dl-how-title" className="dl-h2 dl-reveal">Four steps from quote to delivery.</h2>
            </div>
            <ol className="dl-steps">
              <li className="dl-reveal">
                <h3>Tell us the basics</h3>
                <p>Quantity, budget and date. It takes a minute.</p>
              </li>
              <li className="dl-reveal">
                <h3>Get a written quote</h3>
                <p>Within 24 hours, valid for 14 days, with branding and delivery itemised.</p>
              </li>
              <li className="dl-reveal">
                <h3>Approve the mockup</h3>
                <p>See your branded box, and a physical sample in Bengaluru if you want one.</p>
              </li>
              <li className="dl-reveal">
                <h3>We pack and deliver</h3>
                <p>Every batch is checked, and you get photos before it leaves.</p>
              </li>
            </ol>

            <div className="dl-promises dl-reveal">
              <h3 className="dl-promises-title">If something goes wrong, it is on us.</h3>
              <ul>
                <li>
                  <ShieldCheck size={24} weight="duotone" aria-hidden="true" />
                  <p>
                    <strong>Damaged or wrong units replaced or refunded.</strong> Send photos within 7 days of delivery.
                  </p>
                </li>
                <li>
                  <Receipt size={24} weight="duotone" aria-hidden="true" />
                  <p>
                    <strong>No surprise charges.</strong> The quoted total, branding and delivery included, is what
                    you are invoiced.
                  </p>
                </li>
                <li>
                  <Package size={24} weight="duotone" aria-hidden="true" />
                  <p>
                    <strong>Pay in two halves.</strong> 50% to confirm, 50% before dispatch against the invoice and QC
                    photos. PO-based terms on request.
                  </p>
                </li>
                <li>
                  <Certificate size={24} weight="duotone" aria-hidden="true" />
                  <p>
                    <strong>Sealed, labelled food.</strong> Every sweet and dry fruit is a sealed pack with shelf-life
                    labelling.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonials: real Google reviews, rendered on the server. */}
        {featured && (
          <section className="dl-section" aria-labelledby="dl-reviews-title">
            <div className="dl-wrap">
              <div className="dl-head">
                <h2 id="dl-reviews-title" className="dl-h2 dl-reveal">
                  Clients say it <em>better than we can.</em>
                </h2>
                {reviewData.rating !== null && (
                  <a className="dl-rating dl-reveal" href={reviewData.mapsUrl ?? undefined} target="_blank" rel="noopener noreferrer">
                    <span className="dl-stars" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map(i => (
                        <Star key={i} size={16} weight="fill" />
                      ))}
                    </span>
                    <strong>{reviewData.rating.toFixed(1)}</strong>
                    <span>
                      from {reviewData.count} Google reviews
                    </span>
                  </a>
                )}
              </div>

              <div className="dl-reviews">
                <figure className="dl-review-feature dl-reveal">
                  <Image src={IMAGES.testimonial} alt="" fill sizes="(max-width: 1023px) 100vw, 520px" />
                  <div className="dl-review-feature-inner">
                    <blockquote>&ldquo;{excerpt(featured.text, 170)}&rdquo;</blockquote>
                    <figcaption>
                      <strong>{featured.author}</strong>
                      <span>Google review, {featured.when}</span>
                      <span>Illustrative gifting scene</span>
                    </figcaption>
                  </div>
                </figure>
                <ul className="dl-review-list">
                  {moreReviews.map(r => (
                    <li key={r.author} className="dl-review dl-reveal">
                      <div className="dl-review-top">
                        {r.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element -- Google-hosted avatar, shown as supplied
                          <img src={r.photo} alt="" width={40} height={40} loading="lazy" referrerPolicy="no-referrer" />
                        ) : (
                          <span className="dl-review-initial" aria-hidden="true">{r.author.charAt(0)}</span>
                        )}
                        <div>
                          <strong>{r.author}</strong>
                          <span className="dl-stars dl-stars--sm" aria-label={`${r.rating} out of 5 stars`}>
                            {Array.from({ length: r.rating }, (_, i) => (
                              <Star key={i} size={12} weight="fill" />
                            ))}
                          </span>
                        </div>
                      </div>
                      <p>{excerpt(r.text, 200)}</p>
                      {r.url && (
                        <a href={r.url} target="_blank" rel="noopener noreferrer">
                          Read on Google
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* The founder. */}
        <section className="dl-section dl-section--tint" aria-labelledby="dl-founder-title">
          <div className="dl-wrap dl-founder dl-reveal">
            <div className="dl-founder-photo">
              <Image src="/founder-ashok-kumar.jpg" alt="Ashok Kumar N, founder of MintBox" fill sizes="(max-width: 767px) 40vw, 280px" />
            </div>
            <div>
              <h2 id="dl-founder-title" className="dl-h2">Run with Air Force discipline.</h2>
              <p className="dl-lede">
                MintBox is led by Ashok Kumar N, formerly of the Indian Air Force and an AVP at Updater Services.
                Your order gets the same rigour: written quotes, checked batches, and dates that hold.
              </p>
            </div>
          </div>
        </section>

        {/* Paperwork for approvals and vendor registration. */}
        <section className="dl-section" aria-labelledby="dl-paper-title">
          <div className="dl-wrap">
          <div className="dl-paper dl-reveal">
            <div className="dl-paper-copy">
              <p className="dl-eyebrow">For approvers and procurement</p>
              <h2 id="dl-paper-title" className="dl-h2">Need sign-off or <em>a vendor code first?</em></h2>
              <p className="dl-lede">
                We send what your approvers and procurement team ask for, so the paperwork does not hold up your
                order.
              </p>
              <ul className="dl-checks">
                <li><CheckCircle size={20} weight="fill" aria-hidden="true" />Prices and a sample quote to forward</li>
                <li><CheckCircle size={20} weight="fill" aria-hidden="true" />GST registration and PAN</li>
                <li><CheckCircle size={20} weight="fill" aria-hidden="true" />Bank details on letterhead</li>
                <li><CheckCircle size={20} weight="fill" aria-hidden="true" />Your vendor form, filled in by us</li>
              </ul>
            </div>
            <PaperworkForm />
          </div>
          </div>
        </section>

        <section className="dl-section dl-section--tint" aria-labelledby="dl-faq-title">
          <div className="dl-wrap dl-faq">
            <h2 id="dl-faq-title" className="dl-h2">Questions buyers ask us.</h2>
            <div className="dl-faq-list">
              {faqs.map(f => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="dl-final" aria-labelledby="dl-final-title">
          <div className="dl-wrap dl-final-inner dl-reveal">
            <h2 id="dl-final-title" className="dl-h2">Make this Diwali one <em>your team remembers.</em></h2>
            <p className="dl-lede">Tell us how many gifts and your budget. We send the catalogue with prices for your numbers, then a written quote.</p>
            <div className="dl-final-ctas">
              <a href="#quote" className="dl-btn dl-btn--primary dl-btn--lg">{PRIMARY_CTA}</a>
              <WhatsAppLink className="dl-btn dl-btn--wa dl-btn--lg" />
            </div>
          </div>
        </section>
      </main>

      <footer className="dl-footer">
        <div className="dl-wrap dl-footer-grid">
          <div>
            <Image src="/mintbox-logo-white.webp" alt="MintBox" width={118} height={32} />
            <address>
              2nd Floor, Sobha Alexander Plaza, Commissariat Rd, Ashok Nagar, Bengaluru 560025
            </address>
          </div>
          <div className="dl-footer-contact">
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
            <a href="mailto:hello@themintbox.in">hello@themintbox.in</a>
            <span>GSTIN {GSTIN}</span>
          </div>
          <div className="dl-footer-legal">
            <a href="/privacy">Privacy policy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
      <MobileBar />
    </div>
  )
}
