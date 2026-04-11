'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import '../landing.css'
import './about.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

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

export default function AboutPage() {
  const brokeTrackRef = useRef<HTMLDivElement>(null)
  const [activeDot, setActiveDot] = useState(0)
  const [openValue, setOpenValue] = useState<number | null>(null)

  useEffect(() => {
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

    /* ── Value rows reveal ── */
    const valRows = document.querySelectorAll('.ab-val-row')
    const rowIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { (e.target as HTMLElement).classList.add('vis'); rowIO.unobserve(e.target) }
      })
    }, { threshold: 0.15 })
    valRows.forEach((r) => rowIO.observe(r))

    return () => {
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
          <div className="ab-hero-label">About MintBox</div>
          <BowSvg className="ab-hero-bow" />
          <h1 className="ab-hero-title">
            We exist because<br />
            <em>gifting deserved better.</em>
          </h1>
          <div className="ab-hero-rule-gold" />
          <p className="ab-hero-manifesto">
            The corporate gifting market doesn&rsquo;t have a product problem. It has a meaning problem.
            Every box that arrives late, every logo that peels, every invoice that doesn&rsquo;t match
            the quote &mdash; these aren&rsquo;t vendor failures. They&rsquo;re failures of care.
            MintBox exists to give every gift its meaning back.
          </p>
        </div>
      </section>

      {/* FULL-WIDTH IMAGE BANNER */}
      <div className="ab-img-banner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/about-banner.jpg" alt="MintBox curated gifts" />
        <div className="ab-img-banner-overlay" />
        <div className="ab-img-banner-caption">
          <div className="ab-img-banner-text">
            Every product is sourced, sampled, and physically evaluated before it earns a place in a MintBox.
          </div>
        </div>
      </div>

      {/* FOUNDING STORY */}
      <section className="ab-story">
        <div className="ab-story-inner">
          <div className="ab-story-left">
            <div className="ab-story-label">The founding story</div>
            <h2 className="ab-story-title">Born from a box that disappointed.</h2>
            <div className="ab-story-rule" />
            <div className="ab-story-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about-story.jpg" alt="MintBox founder" />
              <div className="ab-story-img-cap">Anand Ashok &middot; Director, MintBox</div>
            </div>
          </div>
          <div className="ab-story-right">
            <p className="ab-story-p">
              It started with a bad experience. Not one bad experience &mdash; dozens of them. As a
              founder who had hired teams, managed vendors, and sat through more than a few
              uncomfortable conversations about why the Diwali gifts arrived three days late and with
              the wrong logo &mdash; we knew something was fundamentally broken about how corporate
              gifting worked in India.
            </p>

            <div className="ab-story-pull">
              &ldquo;The industry had hundreds of vendors. It had no one who actually cared about what
              happened when the box was opened.&rdquo;
            </div>

            <p className="ab-story-p">
              The problem wasn&rsquo;t a lack of products. India has extraordinary manufacturers,
              brilliant artisans, and a gifting culture that runs deep. The problem was the layer
              between &mdash; the opaque pricing, the outsourced branding, the &ldquo;we&rsquo;ll
              check with the courier&rdquo; non-answers, and the invoices that bore no resemblance to
              the quote.
            </p>

            <p className="ab-story-p">
              We started MintBox with a simple conviction:{' '}
              <strong>a premium corporate gift should work like a premium product</strong>.
              It should arrive on time. The logo should look exactly like the mockup. The invoice
              should match the quote. The person who opens it should feel &mdash; genuinely &mdash;
              that someone thought about them specifically.
            </p>

            <p className="ab-story-p">
              We launched in Bengaluru because this city &mdash; with its density of tech companies,
              its globally minded workforce, and its founders who understand what brand quality means
              &mdash; is the perfect place to build a gifting brand that holds itself to a higher
              standard. If we can earn the trust of teams building India&rsquo;s most ambitious
              companies, we&rsquo;ve done something worth doing.
            </p>

            <p className="ab-story-p">
              MintBox is still early. We&rsquo;re a small team, we&rsquo;re pre-launch, and
              we&rsquo;re building every process and every partnership from scratch with quality as the
              only non-negotiable. We won&rsquo;t ship a gift we wouldn&rsquo;t be proud to receive
              ourselves.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WAS BROKEN — horizontal scroll cards */}
      <div className="ab-broke">
        <div className="ab-broke-pat" />
        <div className="ab-broke-header">
          <div className="ab-broke-label">What we set out to fix</div>
          <div className="ab-broke-title">
            The five things that were broken<br />before MintBox existed.
          </div>
        </div>
        <div className="ab-broke-track-wrap">
          <div className="ab-broke-track" ref={brokeTrackRef}>
            {[
              { num: '01', title: 'The invoice surprise', desc: 'Vendors quote one number, invoice another. Logistics surcharges, admin fees, and branding corrections appeared after approval \u2014 sometimes adding 20\u201330% to the cost. We quote everything upfront. What you approve is what you pay.' },
              { num: '02', title: 'The peeling logo', desc: 'Most vendors outsource branding to whoever is cheapest. Logos that shift, colours that drift, prints that peel after one wash. We keep artwork in-house, match every mockup, and physically inspect every batch before dispatch.' },
              { num: '03', title: 'The Diwali chaos', desc: 'Every October, HR teams across India chase vendors, follow up on missing shipments, and apologise to employees whose gifts arrived broken or not at all. We plan lead times honestly and track every delivery individually.' },
              { num: '04', title: 'The creativity plateau', desc: 'Same mug. Same diary. Same power bank. Every vendor, every year, pulls from the same catalogue. We curate with intention \u2014 matching products to brand personality, not just what\u2019s in stock.' },
              { num: '05', title: 'The remote gifting failure', desc: 'Post-2020, teams are everywhere. Collecting 200 individual addresses, managing missed deliveries, tracking each shipment \u2014 an administrative nightmare. We built the tools to make it effortless.' },
            ].map((item) => (
              <div key={item.num} className="ab-broke-card">
                <div className="ab-broke-num">{item.num}</div>
                <div className="ab-broke-card-title">{item.title}</div>
                <div className="ab-broke-card-desc">{item.desc}</div>
              </div>
            ))}
            <div className="ab-broke-card-last">
              <div className="ab-broke-num" style={{ color: 'rgba(184,151,46,0.45)' }}>&rarr;</div>
              <div className="ab-broke-card-title" style={{ color: 'var(--gold)' }}>MintBox is the answer to all five.</div>
              <div className="ab-broke-card-desc" style={{ color: 'rgba(245,240,230,0.92)' }}>
                Every process we have built &mdash; from branding in-house to transparent quoting to
                individual address delivery &mdash; exists to fix one of these five failures. Not as a
                feature. As a founding principle.
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

      {/* VALUES — dark accordion */}
      <div className="ab-values">
        <div className="ab-values-pat" />
        <div className="ab-values-inner">
          <div className="ab-values-header">
            <div>
              <div className="ab-values-label">Our commitments</div>
              <div className="ab-values-title">
                Four things we<br /><em>never compromise on.</em>
              </div>
            </div>
            <div className="ab-values-sub">
              These aren&rsquo;t values we put on a wall. They&rsquo;re the criteria every product,
              vendor, and process has to pass before it becomes part of MintBox. If something fails
              even one of these tests, we don&rsquo;t do it &mdash; no matter how convenient or
              profitable it might be.
            </div>
          </div>

          <div className="ab-val-list">
            {[
              {
                num: '01', title: 'Craftsmanship', tag: 'Quality first',
                desc: "Every product in our catalogue has been sourced, sampled, and physically evaluated \u2014 not just browsed from a supplier PDF. We match every branding technique to the material it goes on, inspect every batch before dispatch, and maintain a standard we set ourselves rather than inherit from whoever is cheapest. The result is a gift that looks exactly like the mockup, every single time.",
                example: "\u201CWe rejected three notebook suppliers before finding one whose debossing held to our spec. That decision never appears on a quote \u2014 but it\u2019s exactly what you feel the moment you open the box.\u201D",
              },
              {
                num: '02', title: 'Transparency', tag: 'No surprises',
                desc: "What you see on the quote is what appears on the invoice \u2014 line for line. Products, branding, packaging, logistics, and GST are all itemised from the start. We don\u2019t bury costs, round up quietly, or introduce new charges at billing. If anything changes during an order, we tell you before it affects the price, not after. Trust in this industry is rare because honesty is rare. We\u2019re changing that.",
                example: "\u201CIf a product goes out of stock after quoting and the alternative costs more, we absorb the difference or present options clearly. We have never billed a rupee that wasn\u2019t discussed upfront.\u201D",
              },
              {
                num: '03', title: 'Reliability', tag: 'On time, always',
                desc: "A Diwali gift that arrives on December 3rd is not a Diwali gift. We set honest lead times at the start \u2014 never the optimistic ones \u2014 and we track every individual shipment rather than treating an order as done once it leaves our hands. If something goes wrong in transit, you hear from us before you have to ask. Reliability means the experience of working with us is never a source of stress, even during festive season.",
                example: "\u201CWe plan every festive order with a minimum three-week buffer. We would rather confirm a later date and deliver early than promise a date we can\u2019t keep.\u201D",
              },
              {
                num: '04', title: 'Human connection', tag: 'People, not portals',
                desc: "A gift is a human act \u2014 it says that someone thought of you specifically. We never let that get lost in a process. Every new client speaks to a person. Every enquiry gets a response from Anand personally. Every order has someone accountable for it by name, not a ticket number. As we grow, technology will help us scale \u2014 but the human at the centre of every relationship stays. That is not a promise we\u2019ll revisit when it becomes inconvenient.",
                example: "\u201CAnand picks up every WhatsApp. That won\u2019t change when we\u2019re at ten times the order volume. The moment it does, we\u2019ll have stopped being MintBox.\u201D",
              },
            ].map((val, i) => (
              <div key={val.num} className={`ab-val-row${openValue === i ? ' open' : ''}`}>
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

      {/* FOUNDER */}
      <div className="ab-founder">
        <div className="ab-founder-inner">
          <div className="ab-founder-left">
            <div className="ab-founder-label">The person behind MintBox</div>
            <div className="ab-founder-title">Built by someone who felt the problem firsthand.</div>
            <div className="ab-founder-bio">
              <p style={{ marginBottom: '1rem' }}>
                <strong>Anand Ashok</strong> is the Director of MintBox and the driving force behind
                its founding. With a background spanning brand-building, web development, and product
                strategy, Anand has spent years working with early-stage startups and established
                companies through Quixta Ventures &mdash; his design and development firm based in
                Bengaluru.
              </p>
              <p>
                The frustration that became MintBox came from lived experience &mdash; managing gifting
                vendors, watching quality fall short of expectations, and spending hours chasing
                suppliers during Diwali season instead of running a business. MintBox is his attempt to
                build the gifting company he wished had existed.
              </p>
            </div>
            <div className="ab-founder-contact">
              <div className="ab-fc-item">
                <div className="ab-fc-icon">
                  <svg viewBox="0 0 14 14" fill="none">
                    <rect x="1.5" y="2.5" width="11" height="9" rx="1.5" stroke="#1B4D3E" strokeWidth="0.9" fill="none" />
                    <path d="M1.5 5L7 8L12.5 5" stroke="#1B4D3E" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="ab-fc-label">Email</div>
                  <div className="ab-fc-val">anand@getmintbox.com</div>
                </div>
              </div>
              <div className="ab-fc-item">
                <div className="ab-fc-icon">
                  <svg viewBox="0 0 14 14" fill="none">
                    <path d="M12.5 9.5C12.5 9.8 12.4 10.1 12.2 10.4C12 10.7 11.7 11 11.4 11.2C10.9 11.6 10.3 11.8 9.7 11.8C8.8 11.8 7.9 11.6 6.9 11.1C6 10.6 5.1 10 4.3 9.2C3.5 8.4 2.9 7.5 2.4 6.6C1.9 5.6 1.7 4.7 1.7 3.8C1.7 3.2 1.9 2.6 2.2 2.1C2.5 1.6 2.9 1.2 3.5 1C3.7 0.9 3.9 0.9 4.1 0.9C4.3 0.9 4.5 0.9 4.6 1C4.8 1.1 4.9 1.2 5 1.4L5.8 2.9C5.9 3.1 6 3.3 6 3.5C6 3.7 5.9 3.9 5.8 4.1L5.3 4.8C5.2 4.9 5.2 5 5.2 5.1C5.2 5.2 5.3 5.4 5.4 5.5C5.8 6.2 6.3 6.8 6.8 7.2C7 7.4 7.1 7.4 7.3 7.4C7.4 7.4 7.5 7.3 7.6 7.2L8.1 6.7C8.3 6.5 8.5 6.4 8.7 6.4C8.9 6.4 9.1 6.5 9.3 6.6L10.8 7.6C11 7.7 11.2 7.9 11.2 8.1C11.5 8.2 12.5 9.3 12.5 9.5Z" stroke="#1B4D3E" strokeWidth="0.8" fill="none" />
                  </svg>
                </div>
                <div>
                  <div className="ab-fc-label">Phone</div>
                  <div className="ab-fc-val">+91 86182 37189</div>
                </div>
              </div>
              <div className="ab-fc-item">
                <a href="https://wa.me/918618237189" target="_blank" rel="noopener noreferrer" style={{ display: 'contents' }}>
                  <div className="ab-fc-icon">
                    <svg viewBox="0 0 14 14" fill="none">
                      <path d="M7 1.5C4.4 1.5 1.5 4.4 1.5 7C1.5 8.2 1.8 9.3 2.4 10.3L1.5 13.5L4.8 12.6C5.8 13.2 6.9 13.5 8 13.5C11.6 13.5 13.5 10.6 13.5 7C13.5 4.4 10.6 1.5 7 1.5Z" stroke="#1B4D3E" strokeWidth="0.8" fill="none" />
                    </svg>
                  </div>
                  <div>
                    <div className="ab-fc-label">WhatsApp</div>
                    <div className="ab-fc-val">Chat directly &rarr;</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="ab-founder-right">
            <div className="ab-founder-card">
              <div className="ab-fc-pat" />
              <div className="ab-fc-portrait-placeholder">
                <div className="ab-fc-portrait-initials">AA</div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ab-fc-portrait" src="/about-founder.jpg" alt="Anand Ashok" />
              <div className="ab-fc-content">
                <div className="ab-fc-name">Anand Ashok</div>
                <div className="ab-fc-role">Director, MintBox</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CLOSING CTA */}
      <section className="ab-cta">
        <div className="ab-cta-pat" />
        <div className="ab-cta-inner">
          <BowSvg className="ab-cta-bow" />
          <h2 className="ab-cta-title">
            Work with a team that takes gifting seriously.
          </h2>
          <p className="ab-cta-sub">
            Tell us about your occasion, your team size, and your budget. We&rsquo;ll come back with
            a curated proposal &mdash; products, branding, and pricing &mdash; within one business day.
          </p>
          <div className="ab-cta-btns">
            <Link href="/contact" className="ab-cta-btn-primary">
              Request a quote &rarr;
            </Link>
            <Link href="/catalog" className="ab-cta-btn-secondary">
              Browse catalogue
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
