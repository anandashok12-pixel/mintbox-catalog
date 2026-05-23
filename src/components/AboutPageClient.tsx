'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import '../app/(main)/landing.css'
import '../app/(main)/about/about.css'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppFloat } from './WhatsAppFloat'

interface AboutPageData {
  hero: { titleLine1: string; titleLine2: string; manifesto: string }
  imageBanner: { bannerImage: { url: string } | null; caption: string }
  foundingStory: {
    label: string; title: string;
    storyImage: { url: string } | null;
    paragraph1: string; paragraph2: string; pullQuote: string;
    paragraph3: string; paragraph4: string; paragraph5: string;
  }
  whatBroke: {
    label: string; title: string;
    cards: Array<{ id?: string; num: string; title: string; desc: string }>
    closingCard: { title: string; desc: string }
  }
  values: {
    label: string; titleLine1: string; titleLine2: string; subtitle: string;
    items: Array<{ id?: string; num: string; title: string; tag: string; desc: string; example: string }>
  }
  founder: {
    label: string; title: string;
    bioParagraph1: string; bioParagraph2: string;
    email: string; phone: string; whatsappUrl: string;
    cardName: string; cardRole: string;
    portrait: { url: string } | null;
  }
  cta: {
    title: string; subtitle: string;
    primaryButtonLabel: string; primaryButtonUrl: string;
    secondaryButtonLabel: string; secondaryButtonUrl: string;
  }
}

function BowSvg({ width = 88, className }: { width?: number; className?: string }) {
  return (
    <svg className={className} width={width} height={32} viewBox="0 0 80 28" fill="none">
      <path d="M40 16C33 10,18 4,5 9C-3 13,2 21,14 18C26 15,35 19,40 16" stroke="#B8972E" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M40 16C47 10,62 4,75 9C83 13,78 21,66 18C54 15,45 19,40 16" stroke="#B8972E" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M34 13C37 10,39 9,40 9C41 9,43 10,46 13C43 16,41 16,40 16C39 16,37 16,34 13Z" stroke="#B8972E" strokeWidth="1.1" fill="none" />
      <path d="M40 16L38 24M40 16L42 24" stroke="#B8972E" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  )
}

const EMPTY: AboutPageData = {
  hero: { titleLine1: 'We exist because', titleLine2: 'gifting deserved better.', manifesto: '' },
  imageBanner: { bannerImage: null, caption: '' },
  foundingStory: {
    label: 'The Founding Story',
    title: 'Born from a box that disappointed.',
    storyImage: null,
    paragraph1: 'It started with a bad experience. Not one bad experience - dozens of them. As a founder who had hired teams, managed vendors, and sat through more than a few uncomfortable conversations about why the Diwali gifts arrived three days late and with the wrong logo - we knew something was fundamentally broken about how corporate gifting worked in India.',
    pullQuote: 'The industry had hundreds of vendors. It had no one who actually cared about what happened when the box was opened.',
    paragraph2: "The problem wasn't a lack of products. India has extraordinary manufacturers, brilliant artisans, and a gifting culture that runs deep. The problem was the layer between - the opaque pricing, the outsourced branding, the “we’ll check with the courier” non-answers, and the invoices that bore no resemblance to the quote.",
    paragraph3: 'We started MintBox with a simple conviction: a premium corporate gift should work like a premium product. It should arrive on time. The logo should look exactly like the mockup. The invoice should match the quote. The person who opens it should feel - genuinely - that someone thought about them specifically.',
    paragraph4: 'We launched in Bengaluru because this city - with its density of tech companies, its globally minded workforce, and its founders who understand what brand quality means - is the perfect place to build a gifting brand that holds itself to a higher standard. If we can earn the trust of teams building India’s most ambitious companies, we’ve done something worth doing.',
    paragraph5: 'MintBox is still early. We’re a small team, we’re pre-launch, and we’re building every process and every partnership from scratch with quality as the only non-negotiable. We won’t ship a gift we wouldn’t be proud to receive ourselves.',
  },
  whatBroke: {
    label: 'What We Set Out To Fix',
    title: 'The five things that were broken before MintBox existed.',
    cards: [
      { num: '01', title: 'The invoice surprise', desc: 'Vendors quote one number, invoice another. Logistics surcharges, admin fees, and branding corrections appeared after approval - sometimes adding 20-30% to the cost. We quote everything upfront. What you approve is what you pay.' },
      { num: '02', title: 'The peeling logo', desc: 'Most vendors outsource branding to whoever is cheapest. Logos that shift, colours that drift, prints that peel after one wash. We keep artwork in-house, match every mockup, and physically inspect every batch before dispatch.' },
      { num: '03', title: 'The Diwali chaos', desc: 'Every October, HR teams across India chase vendors, follow up on missing shipments, and apologise to employees whose gifts arrived broken or not at all. We plan lead times honestly and track every delivery individually.' },
      { num: '04', title: 'The creativity plateau', desc: 'Same mug. Same diary. Same power bank. Every vendor, every year, pulls from the same catalogue. We curate with intention - matching products to brand personality, not just what’s in stock.' },
      { num: '05', title: 'The remote gifting failure', desc: 'Post-2020, teams are everywhere. Collecting 200 individual addresses, managing missed deliveries, tracking each shipment - an administrative nightmare. We built the tools to make it effortless.' },
    ],
    closingCard: { title: 'MintBox is the answer to all five.', desc: 'Every process we have built - from branding in-house to transparent quoting to individual address delivery - exists to fix one of these five failures. Not as a feature. As a founding principle.' },
  },
  values: { label: '', titleLine1: '', titleLine2: '', subtitle: '', items: [] },
  founder: { label: '', title: '', bioParagraph1: '', bioParagraph2: '', email: 'anand@themintbox.in', phone: '+91 9886537631', whatsappUrl: 'https://wa.me/919886537631', cardName: 'Anand Ashok', cardRole: 'Director, MintBox', portrait: null },
  cta: {
    title: 'Work with the team that takes gifting seriously.',
    subtitle: "Whether you're planning a 50-person Diwali pack or onboarding 500 new hires next quarter - we'd love to hear what you're building and show you what good gifting can feel like.",
    primaryButtonLabel: 'Request a quote →',
    primaryButtonUrl: '/contact',
    secondaryButtonLabel: 'Browse catalogue',
    secondaryButtonUrl: '/catalog',
  },
}

// Merge, but don't let null DB values overwrite non-null defaults
const mergeNonNull = <T extends Record<string, any>>(base: T, overrides: Record<string, any> | null | undefined): T => {
  const result: Record<string, any> = { ...base }
  if (overrides) {
    for (const [k, v] of Object.entries(overrides)) {
      // Skip null, undefined, and empty arrays  -  fall back to base defaults
      if (v === null || v === undefined) continue
      if (Array.isArray(v) && v.length === 0) continue
      if (typeof v === 'string' && v.trim() === '') continue
      result[k] = v
    }
  }
  return result as T
}

export function AboutPageClient({ data: raw }: { data: AboutPageData }) {
  const data: AboutPageData = {
    ...EMPTY, ...raw,
    hero: mergeNonNull(EMPTY.hero, raw?.hero),
    imageBanner: mergeNonNull(EMPTY.imageBanner, raw?.imageBanner),
    foundingStory: mergeNonNull(EMPTY.foundingStory, raw?.foundingStory),
    whatBroke: {
      ...mergeNonNull(EMPTY.whatBroke, raw?.whatBroke),
      closingCard: mergeNonNull(EMPTY.whatBroke.closingCard, raw?.whatBroke?.closingCard),
    },
    values: mergeNonNull(EMPTY.values, raw?.values),
    founder: mergeNonNull(EMPTY.founder, raw?.founder),
    cta: mergeNonNull(EMPTY.cta, raw?.cta),
  }
  const brokeTrackRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const [activeDot, setActiveDot] = useState(0)
  const [openValue, setOpenValue] = useState<number | null>(null)

  useEffect(() => {
    /* ── Banner parallax ── */
    const banner = bannerRef.current
    const bannerImg = banner?.querySelector('img') as HTMLImageElement | null
    const onParallax = () => {
      if (!banner || !bannerImg) return
      const rect = banner.getBoundingClientRect()
      const viewH = window.innerHeight
      if (rect.bottom < 0 || rect.top > viewH) return
      const progress = (viewH - rect.top) / (viewH + rect.height)
      const offset = (progress - 0.5) * 80
      bannerImg.style.transform = `translateY(${offset}px) scale(1.15)`
    }
    window.addEventListener('scroll', onParallax, { passive: true })
    onParallax()

    const track = brokeTrackRef.current
    if (!track) return

    /* ── Card reveal on scroll ── */
    const cards = track.querySelectorAll('.ab-broke-card, .ab-broke-card-last')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          cards.forEach((c) => c.classList.add('visible'))
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.2 })
    io.observe(track)

    /* ── Drag to scroll ── */
    let drag = false
    let startX = 0
    let scrollLeft = 0

    const onMouseDown = (e: MouseEvent) => {
      drag = true
      startX = e.pageX - track.offsetLeft
      scrollLeft = track.scrollLeft
      track.style.cursor = 'grabbing'
    }
    const onMouseUp = () => { drag = false; track.style.cursor = 'grab' }
    const onMouseMove = (e: MouseEvent) => {
      if (!drag) return
      e.preventDefault()
      const x = e.pageX - track.offsetLeft
      track.scrollLeft = scrollLeft - (x - startX)
    }

    track.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    track.addEventListener('mousemove', onMouseMove)

    /* ── Progress dots ── */
    const onScroll = () => {
      const maxScroll = track.scrollWidth - track.clientWidth
      const ratio = maxScroll > 0 ? track.scrollLeft / maxScroll : 0
      setActiveDot(Math.round(ratio * 5))
    }
    track.addEventListener('scroll', onScroll)

    /* ── Value rows reveal + auto-open on scroll ── */
    const valRows = document.querySelectorAll('.ab-val-row')
    const rowIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('vis')
          const idx = Array.from(valRows).indexOf(e.target)
          if (idx !== -1) setOpenValue(idx)
        }
      })
    }, { threshold: 0.5, rootMargin: '-10% 0px -30% 0px' })
    valRows.forEach((r) => rowIO.observe(r))

    return () => {
      window.removeEventListener('scroll', onParallax)
      io.disconnect()
      rowIO.disconnect()
      track.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      track.removeEventListener('mousemove', onMouseMove)
      track.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="ab-page">
      <Navbar />

      {/* HERO */}
      <section className="ab-hero">
        <div className="ab-hero-pat" />
        <div className="ab-hero-inner">
          <h1 className="ab-hero-title">
            {data.hero.titleLine1}<br />
            <em>{data.hero.titleLine2}</em>
          </h1>
          <div className="ab-hero-rule-gold" />
          <p className="ab-hero-manifesto">
            {data.hero.manifesto}
          </p>
        </div>
      </section>

      {/* FULL-WIDTH IMAGE BANNER */}
      <div className="ab-img-banner" ref={bannerRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.imageBanner.bannerImage?.url || '/about-banner.jpg'} alt="MintBox curated gifts" />
        <div className="ab-img-banner-overlay" />
        <div className="ab-img-banner-caption">
          <div className="ab-img-banner-text">
            {data.imageBanner.caption}
          </div>
        </div>
      </div>

      {/* FOUNDING STORY */}
      <section className="ab-story">
        <div className="ab-story-inner">
          <div className="ab-story-left">
            <div className="ab-story-label">{data.foundingStory.label}</div>
            <h2 className="ab-story-title">{data.foundingStory.title}</h2>
            <div className="ab-story-rule" />
            <div className="ab-story-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.foundingStory.storyImage?.url || '/about-story.jpg'} alt="MintBox founder" />
            </div>
          </div>
          <div className="ab-story-right">
            <p className="ab-story-p">
              {data.foundingStory.paragraph1}
            </p>

            <div className="ab-story-pull">
              {data.foundingStory.pullQuote}
            </div>

            <p className="ab-story-p">
              {data.foundingStory.paragraph2}
            </p>

            <p className="ab-story-p">
              {data.foundingStory.paragraph3}
            </p>

            <p className="ab-story-p">
              {data.foundingStory.paragraph4}
            </p>

            <p className="ab-story-p">
              {data.foundingStory.paragraph5}
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WAS BROKEN  -  horizontal scroll cards */}
      <div className="ab-broke">
        <div className="ab-broke-pat" />
        <div className="ab-broke-header">
          <div className="ab-broke-label">{data.whatBroke.label}</div>
          <div className="ab-broke-title" dangerouslySetInnerHTML={{ __html: data.whatBroke.title }} />
        </div>
        <div className="ab-broke-track-wrap">
          <div className="ab-broke-track" ref={brokeTrackRef}>
            {data.whatBroke.cards.map((item: any) => (
              <div key={item.id || item.num} className="ab-broke-card">
                <div className="ab-broke-num">{item.num}</div>
                <div className="ab-broke-card-title">{item.title}</div>
                <div className="ab-broke-card-desc">{item.desc}</div>
              </div>
            ))}
            <div className="ab-broke-card-last">
              <div className="ab-broke-num" style={{ color: 'rgba(184,151,46,0.45)' }}>&rarr;</div>
              <div className="ab-broke-card-title" style={{ color: 'var(--gold)' }}>{data.whatBroke.closingCard.title}</div>
              <div className="ab-broke-card-desc" style={{ color: 'rgba(245,240,230,0.92)' }}>
                {data.whatBroke.closingCard.desc}
              </div>
            </div>
          </div>
        </div>
        <div className="ab-broke-hint">drag to explore &rarr;</div>
        <div className="ab-broke-progress">
          {[0,1,2,3,4,5].map((i) => (
            <div key={i} className={`ab-broke-dot${activeDot === i ? ' active' : ''}`} />
          ))}
        </div>
      </div>

      {/* VALUES  -  dark accordion */}
      <div className="ab-values">
        <div className="ab-values-pat" />
        <div className="ab-values-inner">
          <div className="ab-values-header">
            <div>
              <div className="ab-values-label">{data.values.label}</div>
              <div className="ab-values-title">
                {data.values.titleLine1}<br /><em>{data.values.titleLine2}</em>
              </div>
            </div>
            <div className="ab-values-sub">
              {data.values.subtitle}
            </div>
          </div>

          <div className="ab-val-list">
            {data.values.items.map((val: any, i: number) => (
              <div key={val.id || val.num} className={`ab-val-row${openValue === i ? ' open' : ''}`}>
                <div className="ab-val-row-head" onClick={() => setOpenValue(openValue === i ? null : i)}>
                  <span className="ab-val-num">{val.num}</span>
                  <div className="ab-val-head-title">{val.title}</div>
                  <div className="ab-val-tag">{val.tag}</div>
                  <div className="ab-val-arrow">
                    <svg viewBox="0 0 12 12" fill="none" stroke="rgba(184,151,46,0.6)" strokeWidth="1.2" strokeLinecap="round">
                      <line x1="6" y1="1" x2="6" y2="11" /><line x1="1" y1="6" x2="11" y2="6" />
                    </svg>
                  </div>
                </div>
                <div className="ab-val-body">
                  <div className="ab-val-body-inner">
                    <div className="ab-val-body-spacer" />
                    <div className="ab-val-desc">{val.desc}</div>
                    <div className="ab-val-example">{val.example}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* CLOSING CTA */}
      <section className="ab-cta">
        <div className="ab-cta-pat" />
        <div className="ab-cta-inner">
          <BowSvg className="ab-cta-bow" />
          <h2 className="ab-cta-title">
            {data.cta.title}
          </h2>
          <p className="ab-cta-sub">
            {data.cta.subtitle}
          </p>
          <div className="ab-cta-btns">
            <Link href={data.cta.primaryButtonUrl || '/contact'} className="ab-cta-btn-primary">
              {data.cta.primaryButtonLabel}
            </Link>
            <Link href={data.cta.secondaryButtonUrl || '/catalog'} className="ab-cta-btn-secondary">
              {data.cta.secondaryButtonLabel}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
