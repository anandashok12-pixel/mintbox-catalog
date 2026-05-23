'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppFloat } from './WhatsAppFloat'

export function LandingPage() {
  const [quoteSubmitting, setQuoteSubmitting] = useState(false)
  const [quoteSuccess, setQuoteSuccess] = useState(false)
  const [quoteError, setQuoteError] = useState('')
  const [quoteFieldErrors, setQuoteFieldErrors] = useState<{ name: boolean; company: boolean; email: boolean }>({
    name: false,
    company: false,
    email: false,
  })

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQuoteError('')
    setQuoteSuccess(false)

    const formData = new FormData(e.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const company = String(formData.get('company') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const teamSize = String(formData.get('teamSize') || '').trim()
    const budget = String(formData.get('budget') || '').trim()

    const nextErrors = {
      name: !name,
      company: !company,
      email: !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    }
    setQuoteFieldErrors(nextErrors)
    if (nextErrors.name || nextErrors.company || nextErrors.email) return

    setQuoteSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          email,
          notes: [teamSize ? `Team size: ${teamSize}` : '', budget ? `Budget: ${budget}` : ''].filter(Boolean).join('\n') || undefined,
          items: [],
        }),
      })

      const resData = await res.json()
      if (!res.ok) {
        setQuoteError(resData.error || 'Something went wrong. Please try again.')
        return
      }

      e.currentTarget.reset()
      setQuoteFieldErrors({ name: false, company: false, email: false })
      setQuoteSuccess(true)
    } catch {
      setQuoteError('Network error. Please try again.')
    } finally {
      setQuoteSubmitting(false)
    }
  }

  useEffect(() => {
    /* ---------- SCROLL REVEAL ---------- */
    const reveals = document.querySelectorAll('.reveal')
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

    /* Trigger hero reveals immediately */
    document.querySelectorAll('#hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 200 + i * 150)
    })

    /* ---------- TESTIMONIAL PARALLAX ---------- */
    const testiSection = document.getElementById('testimonials')
    const testiImg = testiSection?.querySelector('.testi-hero-image img') as HTMLElement | null
    const testiContent = testiSection?.querySelector('.testi-hero-content') as HTMLElement | null
    const testiQuoteMark = testiSection?.querySelector('.testi-hero-quote-mark') as HTMLElement | null

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (!testiSection) { ticking = false; return }
        const rect = testiSection.getBoundingClientRect()
        const vh = window.innerHeight
        // progress: 0 when section enters bottom, 1 when it leaves top
        const progress = 1 - (rect.bottom / (vh + rect.height))
        if (progress < -0.2 || progress > 1.2) { ticking = false; return }

        const clampedProgress = Math.max(0, Math.min(1, progress))

        // Image: slow upward drift (parallax)
        if (testiImg) {
          const imgShift = (clampedProgress - 0.5) * -40 // ±20px
          testiImg.style.transform = `scale(1.08) translateY(${imgShift}px)`
        }

        // Content: slides up gently
        if (testiContent) {
          const contentShift = (1 - clampedProgress) * 30 // starts 30px down, settles to 0
          const contentOpacity = Math.min(1, clampedProgress * 2.5)
          testiContent.style.transform = `translateY(${contentShift}px)`
          testiContent.style.opacity = `${contentOpacity}`
        }

        // Quote mark: floats independently
        if (testiQuoteMark) {
          const quoteShift = (clampedProgress - 0.5) * -20
          testiQuoteMark.style.transform = `translateY(${quoteShift}px)`
        }

        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initial position

    /* ---------- SCORECARD COLUMN HIGHLIGHT ---------- */
    const positionHighlight = () => {
      const table = document.querySelector('.scorecard-table') as HTMLElement | null
      const highlight = document.querySelector('.scorecard-mintbox-highlight') as HTMLElement | null
      const headerCol = document.querySelector('.scorecard-header .scorecard-mintbox-col') as HTMLElement | null
      const logo = document.querySelector('.scorecard-header .scorecard-logo') as HTMLElement | null
      const rows = document.querySelectorAll('.scorecard-row .scorecard-mintbox-col')
      const lastRowCol = rows[rows.length - 1] as HTMLElement | undefined
      if (!table || !highlight || !headerCol || !logo || !lastRowCol) return
      const tableRect = table.getBoundingClientRect()
      const headerRect = headerCol.getBoundingClientRect()
      const logoRect = logo.getBoundingClientRect()
      const lastRect = lastRowCol.getBoundingClientRect()
      const pad = 14
      const width = headerRect.width + pad * 2
      const logoCenterX = logoRect.left + logoRect.width / 2 - tableRect.left
      highlight.style.left = `${logoCenterX - width / 2}px`
      highlight.style.top = `${headerRect.top - tableRect.top - pad}px`
      highlight.style.width = `${width}px`
      highlight.style.height = `${lastRect.bottom - headerRect.top + pad * 2}px`
    }
    // Run after reveals settle
    setTimeout(positionHighlight, 600)
    window.addEventListener('resize', positionHighlight)

    /* ---------- RUNWAY DRAG SCROLL ---------- */
    const vaTrack = document.getElementById('vaTrack')
    let isDragging = false, dragStartX = 0, dragScrollLeft = 0
    const onDragStart = (e: MouseEvent) => {
      if (!vaTrack) return
      isDragging = true
      vaTrack.classList.add('dragging')
      dragStartX = e.pageX - vaTrack.offsetLeft
      dragScrollLeft = vaTrack.scrollLeft
    }
    const onDragEnd = () => { isDragging = false; vaTrack?.classList.remove('dragging') }
    const onDragMove = (e: MouseEvent) => {
      if (!isDragging || !vaTrack) return
      e.preventDefault()
      const x = e.pageX - vaTrack.offsetLeft
      vaTrack.scrollLeft = dragScrollLeft - (x - dragStartX) * 1.4
    }
    vaTrack?.addEventListener('mousedown', onDragStart)
    vaTrack?.addEventListener('mouseleave', onDragEnd)
    vaTrack?.addEventListener('mouseup', onDragEnd)
    vaTrack?.addEventListener('mousemove', onDragMove)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', positionHighlight)
      vaTrack?.removeEventListener('mousedown', onDragStart)
      vaTrack?.removeEventListener('mouseleave', onDragEnd)
      vaTrack?.removeEventListener('mouseup', onDragEnd)
      vaTrack?.removeEventListener('mousemove', onDragMove)
    }
  }, [])

  return (
    <>
      <Navbar />

      {/* SECTION 1: HERO — Centered */}
      <section id="hero" aria-label="Hero">
        <div className="geo-overlay" aria-hidden="true"></div>
        <div className="hero-content">
          <h1 className="hero-headline reveal reveal-delay-1">
            Gifting that says<br/><em>what words can&apos;t.</em>
          </h1>
          <p className="hero-sub reveal reveal-delay-2">
            Premium corporate gifts for India&apos;s most ambitious teams. From onboarding kits to Diwali hampers — delivered with the precision your brand deserves.
          </p>
          <div className="hero-ctas reveal reveal-delay-3">
            <a href="/contact" className="hero-btn-primary">Request a Quote</a>
            <a href="#occasions" className="hero-btn-secondary">Browse Catalogue</a>
          </div>
        </div>
      </section>

      {/* AUTO-SCROLLING HAMPER STRIP */}
      <div className="hamper-strip" aria-label="Gift hamper gallery">
          <div className="hamper-track">
            {/* Cards × 2 for seamless loop */}
            {(() => {
              const items = [
                { src: '/hampers/hero1.webp', label: 'Artisan Festive Hamper' },
                { src: '/hampers/hero2.webp', label: 'Corporate Gift Box' },
                { src: '/hampers/hero3.webp', label: 'Heritage Gift Set' },
                { src: '/hampers/hero4.webp', label: 'Elegant Gift Box' },
                { src: '/hampers/hero5.webp', label: 'Premium Nuts Collection' },
              ];
              return [...items, ...items];
            })().map((card, i) => (
              <div className="hamper-card" key={i}>
                <Image
                  src={card.src}
                  alt={card.label}
                  fill
                  sizes="(max-width: 700px) 220px, (max-width: 1024px) 260px, 320px"
                  style={{ objectFit: 'cover' }}
                  loading={i < 5 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>

      {/* SECTION 2: TRUST BAR */}
      <div id="trust-bar" aria-label="Client trust bar">
        <div className="trust-bar-inner">
          <div className="trust-stats">
            <div className="trust-stat">
              <span className="trust-stat-num">500+</span>
              <span className="trust-stat-label">Curated Products</span>
            </div>
            <div className="trust-stat-divider" />
            <div className="trust-stat">
              <span className="trust-stat-num">10 Units</span>
              <span className="trust-stat-label">Min. Order Qty</span>
            </div>
            <div className="trust-stat-divider" />
            <div className="trust-stat">
              <span className="trust-stat-num">Pan India</span>
              <span className="trust-stat-label">Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: OCCASIONS */}
      <section id="occasions" aria-label="Shop by occasion">
        <div className="section-header-center reveal">
          <span className="section-label">Shop by Occasion</span>
          <h2 className="section-headline">Every moment deserves a MintBox.</h2>
          <span className="gold-rule"></span>
        </div>

        <div className="occasions-grid">
          <article className="occasion-card reveal reveal-delay-1" tabIndex={0}>
            <div className="occasion-card-img" style={{ backgroundImage: "url('/occasions/employee-onboarding.webp')" }}></div>
            <div className="occasion-card-overlay">
              <div className="occasion-overlay-text">
                <h3 className="occasion-name">Employee Onboarding</h3>
                <p className="occasion-desc">Make Day 1 unforgettable</p>
              </div>
              <span className="occasion-arrow"><svg viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </article>
          <article className="occasion-card reveal reveal-delay-2" tabIndex={0}>
            <div className="occasion-card-img" style={{ backgroundImage: "url('/occasions/diwali-and-festive.webp')" }}></div>
            <div className="occasion-card-overlay">
              <div className="occasion-overlay-text">
                <h3 className="occasion-name">Diwali &amp; Festive</h3>
                <p className="occasion-desc">The gift they actually keep</p>
              </div>
              <span className="occasion-arrow"><svg viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </article>
          <article className="occasion-card reveal reveal-delay-3" tabIndex={0}>
            <div className="occasion-card-img" style={{ backgroundImage: "url('/occasions/client-appreciation.webp')" }}></div>
            <div className="occasion-card-overlay">
              <div className="occasion-overlay-text">
                <h3 className="occasion-name">Client Appreciation</h3>
                <p className="occasion-desc">Strengthen every relationship</p>
              </div>
              <span className="occasion-arrow"><svg viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </article>
          <article className="occasion-card reveal reveal-delay-1" tabIndex={0}>
            <div className="occasion-card-img" style={{ backgroundImage: "url('/occasions/work-anniversary.webp')" }}></div>
            <div className="occasion-card-overlay">
              <div className="occasion-overlay-text">
                <h3 className="occasion-name">Work Anniversary</h3>
                <p className="occasion-desc">Celebrate the ones who stayed</p>
              </div>
              <span className="occasion-arrow"><svg viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </article>
          <article className="occasion-card reveal reveal-delay-2" tabIndex={0}>
            <div className="occasion-card-img" style={{ backgroundImage: "url('/occasions/team-and-events.webp')" }}></div>
            <div className="occasion-card-overlay">
              <div className="occasion-overlay-text">
                <h3 className="occasion-name">Team &amp; Events</h3>
                <p className="occasion-desc">Brand that travels with them</p>
              </div>
              <span className="occasion-arrow"><svg viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </article>
          <article className="occasion-card reveal reveal-delay-3" tabIndex={0}>
            <div className="occasion-card-img" style={{ backgroundImage: "url('/occasions/new-year.webp')" }}></div>
            <div className="occasion-card-overlay">
              <div className="occasion-overlay-text">
                <h3 className="occasion-name">New Year</h3>
                <p className="occasion-desc">Start the year with intention</p>
              </div>
              <span className="occasion-arrow"><svg viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </article>
        </div>

        <a href="#" className="view-all-link reveal">View all occasions →</a>
      </section>

      {/* SECTION 4: HOW IT WORKS — Bento cards */}
      <section id="how-it-works" aria-label="How MintBox works">
        <div className="hiw-header reveal">
          <span className="hiw-eyebrow">How It Works</span>
          <h2 className="hiw-headline">Four steps to the<br/>perfect gift.</h2>
          <p className="hiw-sub">From your brief to their doorstep — we handle everything in between.</p>
        </div>

        <div className="hiw-bento">
          {/* 01 — Share requirements */}
          <div className="hiw-card reveal reveal-delay-1">
            <div className="hiw-card-body">
              <span className="hiw-card-step">Step 01</span>
              <h3 className="hiw-card-title">Share your requirements</h3>
              <p className="hiw-card-desc">Tell us your occasion, team size, and budget. WhatsApp, email, or fill a quick form — we work around you.</p>
            </div>
            <div className="hiw-mock">
              <div className="hiw-mock-chat">
                <div className="hiw-bubble">Hi! We need 80 onboarding kits for new hires. Budget ₹1,500 each 🎁</div>
                <div className="hiw-bubble reply">Got it! Sending you 3 curated options by tonight.</div>
                <div className="hiw-bubble" style={{ maxWidth: '55%' }}>Perfect, thank you!</div>
              </div>
            </div>
          </div>

          {/* 02 — Curate & brand */}
          <div className="hiw-card reveal reveal-delay-2">
            <div className="hiw-card-body">
              <span className="hiw-card-step">Step 02</span>
              <h3 className="hiw-card-title">We curate &amp; brand</h3>
              <p className="hiw-card-desc">We select products, apply your branding, and share samples for approval. No surprises on the final invoice.</p>
            </div>
            <div className="hiw-mock">
              <span className="brand-section-label">Products selected</span>
              <div className="brand-products">
                <div className="brand-product-chip"><span className="brand-product-icon">☕</span><span className="brand-product-name">Araku Coffee</span><span className="brand-product-check">✓</span></div>
                <div className="brand-product-chip"><span className="brand-product-icon">📓</span><span className="brand-product-name">Kraft Notebook</span><span className="brand-product-check">✓</span></div>
                <div className="brand-product-chip"><span className="brand-product-icon">🕯️</span><span className="brand-product-name">Soy Candle</span><span className="brand-product-check">✓</span></div>
              </div>
              <div className="brand-divider"></div>
              <span className="brand-section-label">Brand colours applied</span>
              <div className="brand-color-row">
                <div className="brand-color-swatch" style={{ background: '#1B4D3E' }}></div>
                <div className="brand-color-swatch" style={{ background: '#B8972E' }}></div>
                <div className="brand-color-swatch" style={{ background: '#F2F2F0', border: '1px solid #ddd' }}></div>
                <div className="brand-color-swatch" style={{ background: '#1A1A18' }}></div>
                <span className="brand-color-label">+ Logo embossed on lid</span>
              </div>
            </div>
          </div>

          {/* 03 — Approve sample */}
          <div className="hiw-card reveal reveal-delay-3">
            <div className="hiw-card-body">
              <span className="hiw-card-step">Step 03</span>
              <h3 className="hiw-card-title">You approve a sample</h3>
              <p className="hiw-card-desc">We ship a physical sample before full production. You sign off, we confirm. Nothing goes to print until you&apos;re happy.</p>
            </div>
            <div className="hiw-mock">
              <div className="hiw-mock-checklist">
                <div className="hiw-check-row"><span className="hiw-check-icon">✅</span><span className="hiw-check-text">Box design &amp; ribbon</span><span className="hiw-check-badge" style={{ background: '#dcfce7', color: '#166534' }}>Approved</span></div>
                <div className="hiw-check-row"><span className="hiw-check-icon">✅</span><span className="hiw-check-text">Logo print quality</span><span className="hiw-check-badge" style={{ background: '#dcfce7', color: '#166534' }}>Approved</span></div>
                <div className="hiw-check-row"><span className="hiw-check-icon">⏳</span><span className="hiw-check-text">Final invoice sign-off</span><span className="hiw-check-badge" style={{ background: '#fef9c3', color: '#713f12' }}>Pending</span></div>
              </div>
            </div>
          </div>

          {/* 04 — Delivered */}
          <div className="hiw-card reveal reveal-delay-4">
            <div className="hiw-card-body">
              <span className="hiw-card-step">Step 04</span>
              <h3 className="hiw-card-title">Delivered to your team</h3>
              <p className="hiw-card-desc">Individual addresses or bulk office delivery — tracked, on time, and beautifully packaged across India.</p>
            </div>
            <div className="hiw-mock">
              <div className="hiw-mock-delivery">
                <div className="hiw-delivery-row"><div className="hiw-delivery-dot" style={{ background: '#22c55e' }}></div><span className="hiw-delivery-text">Ananya K. · Bengaluru</span><span className="hiw-delivery-badge" style={{ background: '#dcfce7', color: '#166534' }}>Delivered</span></div>
                <div className="hiw-delivery-row"><div className="hiw-delivery-dot" style={{ background: '#B8972E' }}></div><span className="hiw-delivery-text">Rohit M. · Mumbai</span><span className="hiw-delivery-badge" style={{ background: '#fef9c3', color: '#713f12' }}>In transit</span></div>
                <div className="hiw-delivery-row"><div className="hiw-delivery-dot" style={{ background: '#22c55e' }}></div><span className="hiw-delivery-text">Priya S. · Delhi</span><span className="hiw-delivery-badge" style={{ background: '#dcfce7', color: '#166534' }}>Delivered</span></div>
                <div className="hiw-delivery-row"><div className="hiw-delivery-dot" style={{ background: '#B8972E' }}></div><span className="hiw-delivery-text">Vikram N. · Hyderabad</span><span className="hiw-delivery-badge" style={{ background: '#fef9c3', color: '#713f12' }}>Out for delivery</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SCORECARD */}
      <section id="scorecard" aria-label="Why MintBox">
        <div className="section-header-center reveal">
          <h2 className="section-headline">The honest comparison <em>nobody else makes.</em></h2>
          <p className="scorecard-sub">See exactly where MintBox stands against the typical vendor.</p>
        </div>

        <div className="scorecard-table reveal">
          <div className="scorecard-mintbox-highlight" aria-hidden="true"></div>
          <div className="scorecard-header">
            <div className="scorecard-feature-col">Feature</div>
            <div className="scorecard-mintbox-col"><img src="/mintbox-logo.webp" alt="MintBox" className="scorecard-logo" /></div>
            <div className="scorecard-vendor-col">Typical Vendor</div>
          </div>
          {[
            { feature: 'In-house branding', mintbox: 'Always', vendor: 'Outsourced' },
            { feature: 'Transparent pricing', mintbox: 'Fixed quote', vendor: 'Hidden fees' },
            { feature: 'Low minimum order', mintbox: '10 units', vendor: '100+ units' },
            { feature: 'Pan India delivery', mintbox: 'Included', vendor: 'Extra charge' },
            { feature: 'HRMS integration', mintbox: 'Available', vendor: 'Manual only' },
            { feature: 'Sample approval', mintbox: 'Before order', vendor: 'Post-payment' },
            { feature: 'ESG documentation', mintbox: 'On request', vendor: 'Not available' },
            { feature: 'Quote turnaround', mintbox: '48 hours', vendor: '5–7 days' },
          ].map((row, i) => (
            <div key={i} className="scorecard-row reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="scorecard-feature-col">{row.feature}</div>
              <div className="scorecard-mintbox-col">
                <svg className="scorecard-check" viewBox="0 0 20 20" fill="none"><path d="M5 10l3.5 3.5L15 6.5" stroke="#1B4D3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {row.mintbox}
              </div>
              <div className="scorecard-vendor-col">
                <svg className="scorecard-x" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="rgba(26,26,24,0.35)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                {row.vendor}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: COLLECTIONS */}
      <section id="collections" aria-label="Featured collections">
        <div className="section-header-center reveal">
          <span className="section-label">Curated For You</span>
          <h2 className="section-headline">The MintBox Edit.</h2>
          <p className="collections-sub" style={{ marginTop: '10px' }}>Our most-loved collections, ready to brand and ship.</p>
          <span className="gold-rule"></span>
        </div>

        <div className="products-grid">
          <article className="product-card reveal reveal-delay-1">
            <div className="product-image-wrap">
              <div className="product-img-placeholder" style={{ background: "url('/hampers/onboarding.webp') center/cover" }}></div>
            </div>
            <div className="product-body">
              <h3 className="product-name">The Onboarding Kit</h3>
              <p className="product-desc">Everything they need from Day 1 — branded, curated, and unforgettable.</p>
              <p className="product-price">From ₹1,500 / unit</p>
              <p className="product-moq">Min. order: 25 units</p>
            </div>
          </article>
          <article className="product-card reveal reveal-delay-2">
            <div className="product-image-wrap">
              <div className="product-img-placeholder" style={{ background: "url('/hampers/diwali.webp') center/cover" }}></div>
            </div>
            <div className="product-body">
              <h3 className="product-name">The Diwali Edit</h3>
              <p className="product-desc">Festive gifting that earns a second look — and a post on their stories.</p>
              <p className="product-price">From ₹2,200 / unit</p>
              <p className="product-moq">Min. order: 25 units</p>
            </div>
          </article>
          <article className="product-card reveal reveal-delay-3">
            <div className="product-image-wrap">
              <div className="product-img-placeholder" style={{ background: "url('/hampers/wfh-essentials.webp') center/cover" }}></div>
            </div>
            <div className="product-body">
              <h3 className="product-name">The WFH Essentials</h3>
              <p className="product-desc">For the team that works everywhere — tools that travel as well as they do.</p>
              <p className="product-price">From ₹1,800 / unit</p>
              <p className="product-moq">Min. order: 25 units</p>
            </div>
          </article>
          <article className="product-card reveal reveal-delay-4">
            <div className="product-image-wrap">
              <div className="product-img-placeholder" style={{ background: "url('/hampers/executive-gift.webp') center/cover" }}></div>
            </div>
            <div className="product-body">
              <h3 className="product-name">The Executive Gift</h3>
              <p className="product-desc">For clients worth impressing — luxury presentation, no compromise.</p>
              <p className="product-price">From ₹3,500 / unit</p>
              <p className="product-moq">Min. order: 10 units</p>
            </div>
          </article>
        </div>

        <div className="catalogue-cta-wrap reveal">
          <a href="#" className="btn-outlined">Browse the full catalogue</a>
        </div>
      </section>

      {/* SECTION: OUR STANDARDS */}
      <section id="why-mintbox" aria-label="Our standards">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hampers/why-bg.webp" alt="" className="why-bg" aria-hidden="true" />
        <div className="why-overlay" aria-hidden="true"></div>
        <div className="why-content">
          <div className="why-headline-wrap">
            <h2 className="why-headline">Four things we <em>never</em> compromise on.</h2>
            <div className="why-divider"></div>
          </div>
          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-wrap">
                <svg className="pillar-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="pillar-title">Unboxing quality</h3>
              <div className="pillar-line"></div>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon-wrap">
                <svg className="pillar-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M8 21h8M12 17v4"/>
                </svg>
              </div>
              <h3 className="pillar-title">Tech-enabled fulfillment</h3>
              <div className="pillar-line"></div>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon-wrap">
                <svg className="pillar-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                </svg>
              </div>
              <h3 className="pillar-title">Transparent pricing</h3>
              <div className="pillar-line"></div>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon-wrap">
                <svg className="pillar-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="pillar-title">Responsible sourcing</h3>
              <div className="pillar-line"></div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION: COMBINED TESTIMONIAL + QUOTE FORM */}
      <section id="quote-cta" aria-label="Request a quote">
        <div className="cta-combined">
          {/* LEFT — Testimonial panel */}
          <div className="cta-left">
            <span className="cta-left-wordmark">MINTBOX</span>
            <div className="cta-left-quote">
              <div className="cta-left-quote-mark" aria-hidden="true">&ldquo;</div>
              <blockquote className="cta-left-text">
                Our new hires post about the onboarding kit on LinkedIn. We didn&apos;t ask them to — the box was just that good.
              </blockquote>
              <div className="cta-left-divider"></div>
              <p className="cta-left-name">Priya S.</p>
              <p className="cta-left-role">Head of People, Series B Startup</p>
            </div>
            <div className="cta-left-stats">
              <div className="cta-stat">
                <span className="cta-stat-num">4hr</span>
                <span className="cta-stat-label">Response time</span>
              </div>
              <div className="cta-stat">
                <span className="cta-stat-num">500+</span>
                <span className="cta-stat-label">Products</span>
              </div>
              <div className="cta-stat">
                <span className="cta-stat-num">₹0</span>
                <span className="cta-stat-label">To get a quote</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Quote form panel */}
          <div className="cta-right">
            <span className="cta-right-eyebrow">Request a Quote</span>
            <h2 className="cta-right-headline">Ready to make your people feel valued?</h2>
            <p className="cta-right-sub">Tell us about your team and your budget. We handle everything else.</p>

            <form id="quoteForm" className="cta-form" noValidate onSubmit={handleQuoteSubmit}>
              <div className="cta-form-row">
                <div className="cta-form-group">
                  <label htmlFor="form-name">Your name <span className="form-required">*</span></label>
                  <input className={quoteFieldErrors.name ? 'form-input-error' : ''} type="text" id="form-name" name="name" placeholder="Priya Sharma" autoComplete="name" required />
                  {quoteFieldErrors.name && <span className="form-error" id="form-name-error" style={{ display: 'block' }}>Please enter your name</span>}
                </div>
                <div className="cta-form-group">
                  <label htmlFor="form-company">Company <span className="form-required">*</span></label>
                  <input className={quoteFieldErrors.company ? 'form-input-error' : ''} type="text" id="form-company" name="company" placeholder="Acme Tech" autoComplete="organization" required />
                  {quoteFieldErrors.company && <span className="form-error" id="form-company-error" style={{ display: 'block' }}>Please enter your company name</span>}
                </div>
              </div>

              <div className="cta-form-group">
                <label htmlFor="form-email">Email <span className="form-required">*</span></label>
                <input className={quoteFieldErrors.email ? 'form-input-error' : ''} type="email" id="form-email" name="email" placeholder="priya@company.com" autoComplete="email" required />
                {quoteFieldErrors.email && <span className="form-error" id="form-email-error" style={{ display: 'block' }}>Please enter a valid email</span>}
              </div>

              <div className="cta-form-row">
                <div className="cta-form-group">
                  <label htmlFor="form-size">Team size</label>
                  <select id="form-size" name="teamSize" defaultValue="">
                    <option value="" disabled>Select</option>
                    <option value="under25">Under 25</option>
                    <option value="25-100">25 – 100</option>
                    <option value="100-500">100 – 500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
                <div className="cta-form-group">
                  <label htmlFor="form-budget">Budget / gift</label>
                  <select id="form-budget" name="budget" defaultValue="">
                    <option value="" disabled>Select</option>
                    <option value="under500">Under ₹500</option>
                    <option value="500-1500">₹500 – ₹1,500</option>
                    <option value="1500-3500">₹1,500 – ₹3,500</option>
                    <option value="3500+">₹3,500+</option>
                  </select>
                </div>
              </div>

              {quoteError && <div className="cta-form-server-error">{quoteError}</div>}
              {quoteSuccess && <div className="cta-form-success">Sent! We&apos;ll be in touch soon.</div>}

              <button type="submit" className="cta-submit" id="quoteSubmitBtn" disabled={quoteSubmitting}>
                <span className="form-submit-text">{quoteSubmitting ? 'Sending...' : 'Send enquiry →'}</span>
              </button>
              <a href="https://wa.me/919886537631" className="cta-wa-link" target="_blank" rel="noopener">Prefer WhatsApp? →</a>
            </form>
          </div>
        </div>
      </section>


      <Footer />
      <WhatsAppFloat />
    </>
  )
}
