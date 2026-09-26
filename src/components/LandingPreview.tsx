'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppFloat } from './WhatsAppFloat'
import { GoogleReviews } from './GoogleReviews'
import { GOOGLE_REVIEWS, PLACE } from '@/data/googleReviews'
import { getAttribution } from '@/lib/attribution'
import { isValidPhone } from '@/lib/phone'
import { MIN_ORDER_UNITS, QUOTE_TIME, REPLY_TIME, SAMPLE_MIN_UNITS } from '@/lib/businessFacts'

/*
  Preview of the homepage after the September 2026 critique.
  Differences from LandingPage.tsx:
  - Proof moves up: Google rating in the hero, reviews right after occasions,
    a verbatim Google review in the quote panel (replaces the anonymous quote).
  - Removed filler: the mock-UI "four steps" bento, the "Typical Vendor"
    comparison table and the "four things" pillars.
  - One set of facts from businessFacts.ts (reply, quote, MOQ, samples).
  - Diwali season band and a pausable hamper strip.
*/

// Show the season band only while orders can still make Diwali delivery.
const DIWALI_CONFIRM_BY = new Date('2026-10-24T23:59:59+05:30')

// A specific, verifiable review (product + outcome) for the quote panel.
const FEATURED_REVIEW =
  GOOGLE_REVIEWS.find((r) => r.author === 'Ranjith Kumar') ?? GOOGLE_REVIEWS[0]

const HAMPERS = [
  { src: '/hampers/hero1.webp', label: 'Artisan festive hamper' },
  { src: '/hampers/hero2.webp', label: 'Corporate gift box' },
  { src: '/hampers/hero3.webp', label: 'Heritage gift set' },
  { src: '/hampers/hero4.webp', label: 'Elegant gift box' },
  { src: '/hampers/hero5.webp', label: 'Premium nuts collection' },
]

const OCCASIONS = [
  { name: 'Employee Onboarding', desc: 'Make Day 1 unforgettable', img: 'employee-onboarding', href: '/catalog' },
  { name: 'Diwali & Festive', desc: 'The gift they actually keep', img: 'diwali-and-festive', href: '/diwali-corporate-gifts' },
  { name: 'Client Appreciation', desc: 'Strengthen every relationship', img: 'client-appreciation', href: '/catalog' },
  { name: 'Work Anniversary', desc: 'Celebrate the ones who stayed', img: 'work-anniversary', href: '/catalog' },
  { name: 'Team & Events', desc: 'Brand that travels with them', img: 'team-and-events', href: '/catalog' },
  { name: 'New Year', desc: 'Start the year with intention', img: 'new-year', href: '/catalog' },
]

const STEPS = [
  {
    when: `Within ${REPLY_TIME}`,
    title: 'We reply',
    desc: 'Tell us the occasion, headcount and budget on WhatsApp, email or the form below.',
  },
  {
    when: `Within ${QUOTE_TIME}`,
    title: 'You get a priced proposal',
    desc: 'Curated options with per-unit pricing, GST and branding costs spelled out.',
  },
  {
    when: 'Before production',
    title: 'You approve the design',
    desc: `Branding is signed off before anything is made. Orders of ${SAMPLE_MIN_UNITS}+ units get a physical sample.`,
  },
  {
    when: 'Pan-India',
    title: 'We deliver',
    desc: 'To one office in bulk or to every employee’s home, with tracking shared as it moves.',
  },
]

const EDIT = [
  { name: 'The Onboarding Kit', desc: 'Everything they need from Day 1: branded, curated and unforgettable.', price: '₹1,500', img: 'onboarding', href: '/catalog' },
  { name: 'The Diwali Edit', desc: 'Festive gifting that earns a second look, and a post on their stories.', price: '₹2,200', img: 'diwali', href: '/diwali-corporate-gifts' },
  { name: 'The WFH Essentials', desc: 'For the team that works everywhere: tools that travel as well as they do.', price: '₹1,800', img: 'wfh-essentials', href: '/catalog' },
  { name: 'The Executive Gift', desc: 'For clients worth impressing: luxury presentation, no compromise.', price: '₹3,500', img: 'executive-gift', href: '/catalog' },
]

type FieldKey = 'name' | 'company' | 'email' | 'phone'
const NO_ERRORS: Record<FieldKey, boolean> = { name: false, company: false, email: false, phone: false }
const ERROR_TEXT: Record<FieldKey, string> = {
  name: 'Please enter your name',
  company: 'Please enter your company name',
  email: 'Please enter a valid email, e.g. name@company.com',
  phone: 'Please enter a phone number with at least 10 digits',
}

function Stars() {
  return (
    <svg className="lpv-stars" viewBox="0 0 110 20" aria-hidden="true" focusable="false">
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          transform={`translate(${i * 22} 0)`}
          d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z"
          fill="currentColor"
        />
      ))}
    </svg>
  )
}

export function LandingPreview() {
  const router = useRouter()
  const [quoteSubmitting, setQuoteSubmitting] = useState(false)
  const [quoteError, setQuoteError] = useState('')
  const [fieldErrors, setFieldErrors] = useState(NO_ERRORS)
  const [stripPaused, setStripPaused] = useState(false)
  const [showSeason, setShowSeason] = useState(false)

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQuoteError('')

    // Capture the form now: React nulls e.currentTarget after the first await.
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') || '').trim()
    const company = String(formData.get('company') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const teamSize = String(formData.get('teamSize') || '').trim()
    const budget = String(formData.get('budget') || '').trim()

    const nextErrors = {
      name: !name,
      company: !company,
      email: !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      phone: !isValidPhone(phone),
    }
    setFieldErrors(nextErrors)
    const firstInvalid = (Object.keys(nextErrors) as FieldKey[]).find((k) => nextErrors[k])
    if (firstInvalid) {
      form.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setQuoteSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          notes: [teamSize ? `Team size: ${teamSize}` : '', budget ? `Budget: ${budget}` : ''].filter(Boolean).join('\n') || undefined,
          items: [],
          attribution: getAttribution(),
        }),
      })

      const resData = await res.json()
      if (!res.ok) {
        setQuoteError(resData.error || 'We couldn’t send your enquiry. Please try again, or message us on WhatsApp.')
        return
      }

      form.reset()
      setFieldErrors(NO_ERRORS)
      router.push('/thank-you')
    } catch {
      setQuoteError('We couldn’t reach our server. Check your connection and try again, or message us on WhatsApp.')
    } finally {
      setQuoteSubmitting(false)
    }
  }

  useEffect(() => {
    setShowSeason(Date.now() <= DIWALI_CONFIRM_BY.getTime())

    const reveals = document.querySelectorAll('.lpv .reveal')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const fieldProps = (key: FieldKey) => ({
    name: key,
    id: `lpv-${key}`,
    required: true,
    'aria-invalid': fieldErrors[key] || undefined,
    'aria-describedby': fieldErrors[key] ? `lpv-${key}-error` : undefined,
    className: fieldErrors[key] ? 'form-input-error' : undefined,
  })

  const fieldError = (key: FieldKey) =>
    fieldErrors[key] ? (
      <span className="form-error lpv-field-error" id={`lpv-${key}-error`}>
        {ERROR_TEXT[key]}
      </span>
    ) : null

  return (
    <div className="lpv">
      <Navbar />

      <main id="main">
        {/* HERO */}
        <section id="hero" aria-labelledby="lpv-hero-title">
          <div className="geo-overlay" aria-hidden="true"></div>
          <div className="hero-content">
            <h1 id="lpv-hero-title" className="hero-headline">
              Gifting that says<br /><em>what words can&apos;t.</em>
            </h1>
            <p className="hero-sub">
              Premium corporate gifts for India&apos;s most ambitious teams. From onboarding kits to
              Diwali hampers, delivered with the precision your brand deserves.
            </p>
            <div className="hero-ctas">
              <a href="/catalog" className="hero-btn-primary">Browse the catalogue</a>
              <a href="#quote-cta" className="hero-btn-secondary">Get a quote in {QUOTE_TIME}</a>
            </div>
            <a
              className="lpv-proofline"
              href={PLACE.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Stars />
              <span>
                <strong>{PLACE.rating.toFixed(1)}</strong> on Google from {PLACE.reviewCount} reviews
              </span>
              <span className="lpv-proofline-sep" aria-hidden="true" />
              <span>Replies within {REPLY_TIME}</span>
            </a>
          </div>
        </section>

        {/* HAMPER STRIP */}
        <section className="hamper-strip lpv-strip" aria-label="Gift hamper gallery">
          <div className={`hamper-track${stripPaused ? ' is-paused' : ''}`}>
            {[...HAMPERS, ...HAMPERS].map((card, i) => (
              <div className="hamper-card" key={i} aria-hidden={i >= HAMPERS.length || undefined}>
                <Image
                  src={card.src}
                  alt={i < HAMPERS.length ? card.label : ''}
                  fill
                  sizes="(max-width: 700px) 220px, (max-width: 1024px) 260px, 320px"
                  style={{ objectFit: 'cover' }}
                  priority={i < 2}
                  loading={i < 2 ? undefined : 'lazy'}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="lpv-strip-toggle"
            aria-pressed={stripPaused}
            onClick={() => setStripPaused((p) => !p)}
          >
            {stripPaused ? (
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 2.5v11l9-5.5-9-5.5z" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor" /></svg>
            )}
            <span>{stripPaused ? 'Play gallery' : 'Pause gallery'}</span>
          </button>
        </section>

        {/* SEASON BAND */}
        {showSeason && (
          <section className="lpv-season" aria-labelledby="lpv-season-title">
            <div className="lpv-season-inner">
              <div>
                <h2 id="lpv-season-title" className="lpv-season-title">
                  Diwali 2026: <em>confirm by 24 October.</em>
                </h2>
                <p className="lpv-season-sub">
                  Orders confirmed by then get guaranteed pre-Diwali delivery with logo branding.
                </p>
              </div>
              <a href="/diwali-corporate-gifts" className="lpv-season-cta">
                See all 55 Diwali hampers
                <svg viewBox="0 0 18 18" width="16" height="16" fill="none" aria-hidden="true"><path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </section>
        )}

        {/* FACTS */}
        <section id="trust-bar" aria-label="How we work">
          <dl className="lpv-facts">
            <div className="lpv-fact"><dt>Minimum order</dt><dd>{MIN_ORDER_UNITS} units</dd></div>
            <div className="lpv-fact"><dt>First reply</dt><dd>{REPLY_TIME}</dd></div>
            <div className="lpv-fact"><dt>Priced quote</dt><dd>{QUOTE_TIME}</dd></div>
            <div className="lpv-fact"><dt>Delivery</dt><dd>Pan-India</dd></div>
          </dl>
        </section>

        {/* OCCASIONS */}
        <section id="occasions" aria-labelledby="lpv-occasions-title">
          <div className="section-header-center reveal">
            <h2 id="lpv-occasions-title" className="section-headline">Every moment deserves a MintBox.</h2>
            <span className="gold-rule" aria-hidden="true"></span>
          </div>

          <div className="occasions-grid">
            {OCCASIONS.map((o, i) => (
              <a key={o.name} href={o.href} className={`occasion-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="occasion-card-img" style={{ backgroundImage: `url('/occasions/${o.img}.webp')` }} aria-hidden="true"></div>
                <div className="occasion-card-overlay">
                  <div className="occasion-overlay-text">
                    <h3 className="occasion-name">{o.name}</h3>
                    <p className="occasion-desc">{o.desc}</p>
                  </div>
                  <span className="occasion-arrow" aria-hidden="true"><svg viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                </div>
              </a>
            ))}
          </div>

          <a href="/catalog" className="view-all-link reveal">Browse the full catalogue →</a>
        </section>

        {/* PROOF */}
        <GoogleReviews theme="light" />

        {/* HOW ORDERING WORKS */}
        <section className="lpv-process" aria-labelledby="lpv-process-title">
          <div className="lpv-process-inner">
            <h2 id="lpv-process-title" className="section-headline lpv-process-title">
              From brief to doorstep, <em>on a clock.</em>
            </h2>
            <ol className="lpv-steps">
              {STEPS.map((s) => (
                <li key={s.title} className="lpv-step reveal">
                  <span className="lpv-step-when">{s.when}</span>
                  <h3 className="lpv-step-title">{s.title}</h3>
                  <p className="lpv-step-desc">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* THE EDIT */}
        <section id="collections" aria-labelledby="lpv-edit-title">
          <div className="section-header-center reveal">
            <h2 id="lpv-edit-title" className="section-headline">The MintBox Edit.</h2>
            <p className="collections-sub">Our most-loved collections, ready to brand and ship.</p>
            <span className="gold-rule" aria-hidden="true"></span>
          </div>

          <div className="products-grid">
            {EDIT.map((p, i) => (
              <a key={p.name} href={p.href} className={`product-card lpv-edit-card reveal reveal-delay-${i + 1}`}>
                <div className="product-image-wrap">
                  <Image
                    src={`/hampers/${p.img}.webp`}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 50vw, 300px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="product-body">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-desc">{p.desc}</p>
                  <p className="product-price">From {p.price} / unit</p>
                  <p className="product-moq">Min. order {MIN_ORDER_UNITS} units</p>
                </div>
              </a>
            ))}
          </div>

          <div className="catalogue-cta-wrap reveal">
            <a href="/catalog" className="btn-outlined">Browse the full catalogue</a>
          </div>
        </section>

        {/* QUOTE */}
        <section id="quote-cta" aria-labelledby="lpv-quote-title">
          <div className="cta-combined">
            <div className="cta-left">
              <span className="cta-left-wordmark" aria-hidden="true">MINTBOX</span>
              <figure className="cta-left-quote">
                <Stars />
                <blockquote className="cta-left-text">{FEATURED_REVIEW.text}</blockquote>
                <div className="cta-left-divider" aria-hidden="true"></div>
                <figcaption>
                  <p className="cta-left-name">{FEATURED_REVIEW.author}</p>
                  <p className="cta-left-role">
                    <a href={PLACE.reviewsUrl} target="_blank" rel="noopener noreferrer">
                      Google review, {new Date(`${FEATURED_REVIEW.date}T00:00:00Z`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' })}
                    </a>
                  </p>
                </figcaption>
              </figure>
              <dl className="cta-left-stats">
                <div className="cta-stat"><dt className="cta-stat-label">First reply</dt><dd className="cta-stat-num">{REPLY_TIME.replace(' hours', 'h')}</dd></div>
                <div className="cta-stat"><dt className="cta-stat-label">Priced quote</dt><dd className="cta-stat-num">{QUOTE_TIME.replace(' hours', 'h')}</dd></div>
                <div className="cta-stat"><dt className="cta-stat-label">To get a quote</dt><dd className="cta-stat-num">₹0</dd></div>
              </dl>
            </div>

            <div className="cta-right">
              <h2 id="lpv-quote-title" className="cta-right-headline">Ready to make your people feel valued?</h2>
              <p className="cta-right-sub">
                Tell us about your team and budget. We reply within {REPLY_TIME} and send a priced proposal within {QUOTE_TIME}.
              </p>

              <form id="quoteForm" className="cta-form" noValidate onSubmit={handleQuoteSubmit}>
                <p className="lpv-form-note">Fields marked <span aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required.</p>
                <div className="cta-form-row">
                  <div className="cta-form-group">
                    <label htmlFor="lpv-name">Your name <span className="form-required" aria-hidden="true">*</span></label>
                    <input type="text" autoComplete="name" placeholder="Full name" {...fieldProps('name')} />
                    {fieldError('name')}
                  </div>
                  <div className="cta-form-group">
                    <label htmlFor="lpv-company">Company <span className="form-required" aria-hidden="true">*</span></label>
                    <input type="text" autoComplete="organization" placeholder="Company name" {...fieldProps('company')} />
                    {fieldError('company')}
                  </div>
                </div>

                <div className="cta-form-row">
                  <div className="cta-form-group">
                    <label htmlFor="lpv-email">Work email <span className="form-required" aria-hidden="true">*</span></label>
                    <input type="email" autoComplete="email" inputMode="email" placeholder="name@company.com" {...fieldProps('email')} />
                    {fieldError('email')}
                  </div>
                  <div className="cta-form-group">
                    <label htmlFor="lpv-phone">Phone <span className="form-required" aria-hidden="true">*</span></label>
                    <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" {...fieldProps('phone')} />
                    {fieldError('phone')}
                  </div>
                </div>

                <div className="cta-form-row">
                  <div className="cta-form-group">
                    <label htmlFor="lpv-size">Team size <span className="lpv-optional">(optional)</span></label>
                    <select id="lpv-size" name="teamSize" defaultValue="">
                      <option value="">Select</option>
                      <option value="10-25">10 – 25</option>
                      <option value="25-100">25 – 100</option>
                      <option value="100-500">100 – 500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                  <div className="cta-form-group">
                    <label htmlFor="lpv-budget">Budget per gift <span className="lpv-optional">(optional)</span></label>
                    <select id="lpv-budget" name="budget" defaultValue="">
                      <option value="">Select</option>
                      <option value="under500">Under ₹500</option>
                      <option value="500-1500">₹500 – ₹1,500</option>
                      <option value="1500-3500">₹1,500 – ₹3,500</option>
                      <option value="3500+">₹3,500+</option>
                    </select>
                  </div>
                </div>

                <div role="alert" className={quoteError ? 'cta-form-server-error' : undefined}>{quoteError}</div>

                <button type="submit" className="cta-submit" disabled={quoteSubmitting} aria-busy={quoteSubmitting}>
                  <span className="form-submit-text">{quoteSubmitting ? 'Sending…' : 'Send enquiry'}</span>
                </button>
                <a href="https://wa.me/919886537631" className="cta-wa-link" target="_blank" rel="noopener nofollow">
                  Prefer WhatsApp? Message us
                </a>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
