'use client'

import React, { useEffect, useRef, useState } from 'react'
import '../app/(main)/pages.css'

export function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const mobileNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeMobileNav = () => mobileNavRef.current?.classList.remove('open')
    mobileNavRef.current?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav))
    return () => {
      mobileNavRef.current?.querySelectorAll('a').forEach(a => a.removeEventListener('click', closeMobileNav))
    }
  }, [])

  const openMobileNav = () => mobileNavRef.current?.classList.add('open')
  const closeMobileNav = () => mobileNavRef.current?.classList.remove('open')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div className="page-wrapper">
      {/* MOBILE NAV */}
      <div className="page-mobile-nav" ref={mobileNavRef}>
        <button className="page-mobile-nav-close" onClick={closeMobileNav} aria-label="Close menu">&times;</button>
        <a href="/">Home</a>
        <a href="/catalog">Catalogue</a>
        <a href="/faq">FAQ</a>
        <a href="/journal">Journal</a>
        <a href="/contact" style={{ color: 'var(--gold)' }}>Contact</a>
      </div>

      {/* NAVBAR */}
      <nav className="page-nav">
        <a href="/" className="page-nav-logo" aria-label="MintBox Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mintbox-logo-white.webp" alt="MintBox"  width={600} height={234} />
        </a>
        <ul className="page-nav-links">
          <li><a href="/catalog">Catalogue</a></li>
          <li><a href="/#occasions">Occasions</a></li>
          <li><a href="/#how-it-works">How it works</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/journal">Journal</a></li>
          <li><a href="/contact" className="page-nav-cta">Get in Touch</a></li>
        </ul>
        <button className="page-nav-hamburger" onClick={openMobileNav} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <div className="page-hero">
        <div className="geo-pattern-overlay" style={{ opacity: 0.06, backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\'%3E%3Cg fill=\'none\' stroke=\'%23B8972E\' stroke-width=\'0.6\'%3E%3Cpolygon points=\'30,4 53,17 53,43 30,56 7,43 7,17\'/%3E%3Cpolygon points=\'30,12 46,21 46,39 30,48 14,39 14,21\'/%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="page-hero-content">
          <div className="page-hero-eyebrow">Get in touch</div>
          <h1 className="page-hero-title">
            Let&apos;s talk<br /><em>about your team.</em>
          </h1>
          <div className="page-hero-rule" />
          <p className="page-hero-sub">
            Whether you have a brief, a budget, or just a feeling &mdash; we&apos;d love to hear from you. Most enquiries get a response within 4 hours.
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="contact-main">
        {/* LEFT - CONTACT INFO */}
        <div className="contact-info-panel">
          {/* Founder card */}
          <div className="contact-founder">
            <div className="contact-founder-avatar">AA</div>
            <div>
              <div className="contact-founder-name">Anand Ashok</div>
              <div className="contact-founder-role">Director, MintBox</div>
              <a href="https://wa.me/919916996642" target="_blank" rel="noopener" className="contact-founder-wa">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact details */}
          <div className="contact-info-section">
            <div className="contact-info-label">Contact details</div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.22 2 2 0 012.07 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                </svg>
              </div>
              <div>
                <div className="contact-info-title">Phone</div>
                <div className="contact-info-val">+91 9916996642</div>
                <div className="contact-info-sub">Mon &ndash; Sat, 9 AM &ndash; 7 PM IST</div>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="contact-info-title">Email</div>
                <div className="contact-info-val">anand@themintbox.in</div>
                <div className="contact-info-sub">Response within 4 hours on business days</div>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="contact-info-title">Office</div>
                <div className="contact-info-val" style={{ fontSize: 14, lineHeight: 1.55 }}>
                  2nd Floor, Sobha Alexander Plaza<br />2-A, Commissariat Rd, Ashok Nagar<br />Bengaluru, Karnataka 560025
                </div>
              </div>
            </div>
          </div>

          {/* Office hours */}
          <div className="contact-info-section">
            <div className="contact-info-label">Office hours</div>
            <div className="contact-hours-wrap">
              <div className="contact-hours-row">
                <span className="contact-hours-day">Monday &ndash; Friday</span>
                <span className="contact-hours-time">9:00 AM &ndash; 7:00 PM</span>
              </div>
              <div className="contact-hours-row">
                <span className="contact-hours-day">Saturday</span>
                <span className="contact-hours-time">10:00 AM &ndash; 4:00 PM</span>
              </div>
              <div className="contact-hours-row">
                <span className="contact-hours-day">Sunday</span>
                <span className="contact-hours-closed">Closed</span>
              </div>
              <div className="contact-hours-row" style={{ borderBottom: 'none' }}>
                <span className="contact-hours-day">Public holidays</span>
                <span className="contact-hours-closed">Closed</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="contact-info-section">
            <div className="contact-info-label">Find us</div>
            <div className="contact-map">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div className="contact-map-label">Ashok Nagar, Bengaluru</div>
            </div>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div className="contact-form-panel">
          <div className="section-eyebrow" style={{ marginBottom: 10 }}>Send us a message</div>
          <h2 className="contact-form-title">We&apos;d love to<br />hear from you.</h2>
          <p className="contact-form-sub">
            Have a gifting requirement, a question about our catalogue, or just want to say hello? Fill in the form and Anand will get back to you personally.
          </p>

          {formSubmitted ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>&#10003;</div>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, color: 'var(--forest-deep)', marginBottom: 8 }}>
                Message sent!
              </div>
              <p style={{ fontSize: 14, color: 'rgba(26,26,24,0.5)', fontWeight: 300 }}>
                Anand will get back to you within 4 hours on business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label className="contact-form-label">Your name</label>
                  <input className="contact-form-input" type="text" placeholder="Priya Sharma" required />
                </div>
                <div className="contact-form-group">
                  <label className="contact-form-label">Company</label>
                  <input className="contact-form-input" type="text" placeholder="Acme Technologies" />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label className="contact-form-label">Email address</label>
                  <input className="contact-form-input" type="email" placeholder="priya@acme.com" required />
                </div>
                <div className="contact-form-group">
                  <label className="contact-form-label">Phone number</label>
                  <input className="contact-form-input" type="tel" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label className="contact-form-label">I&apos;m enquiring about</label>
                  <select className="contact-form-select">
                    <option value="">Select occasion</option>
                    <option>Employee onboarding kits</option>
                    <option>Diwali &amp; festive gifting</option>
                    <option>Client appreciation</option>
                    <option>Work anniversary gifts</option>
                    <option>Conference &amp; event swag</option>
                    <option>New Year gifts</option>
                    <option>Custom / other</option>
                  </select>
                </div>
                <div className="contact-form-group">
                  <label className="contact-form-label">Team size</label>
                  <select className="contact-form-select">
                    <option value="">Select size</option>
                    <option>Under 25</option>
                    <option>25 &ndash; 100</option>
                    <option>100 &ndash; 500</option>
                    <option>500+</option>
                  </select>
                </div>
              </div>

              <div className="contact-form-group">
                <label className="contact-form-label">Budget per unit (optional)</label>
                <select className="contact-form-select">
                  <option value="">Select budget range</option>
                  <option>Under &#x20B9;500</option>
                  <option>&#x20B9;500 &ndash; &#x20B9;1,500</option>
                  <option>&#x20B9;1,500 &ndash; &#x20B9;3,500</option>
                  <option>&#x20B9;3,500 &ndash; &#x20B9;8,000</option>
                  <option>&#x20B9;8,000+</option>
                </select>
              </div>

              <div className="contact-form-group">
                <label className="contact-form-label">Tell us more</label>
                <textarea className="contact-form-textarea" placeholder="Share any details about your gifting requirement &mdash; timeline, special requests, branding needs, or anything else we should know." />
              </div>

              <button type="submit" className="contact-form-submit">Send enquiry &rarr;</button>
            </form>
          )}

          <div className="contact-form-wa-alt">
            Prefer a quicker reply?
            <a href="https://wa.me/919916996642" target="_blank" rel="noopener" className="contact-form-wa-link">
              WhatsApp Anand directly &rarr;
            </a>
          </div>

          <div className="contact-form-promise">
            <div className="contact-promise-item">
              <div className="contact-promise-dot" />
              <div className="contact-promise-text"><strong>4-hour response</strong>On all business day enquiries</div>
            </div>
            <div className="contact-promise-item">
              <div className="contact-promise-dot" />
              <div className="contact-promise-text"><strong>No commitment</strong>Just a conversation to start</div>
            </div>
            <div className="contact-promise-item">
              <div className="contact-promise-dot" />
              <div className="contact-promise-text"><strong>No hidden costs</strong>Transparent quotes every time</div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />

      {/* FLOATING WHATSAPP */}
      <WhatsAppFloat />
    </div>
  )
}

/* ── Shared footer component ── */
export function Footer() {
  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, marginBottom: 8 }}>
            <svg viewBox="0 0 56 28" fill="none" style={{ width: 32, height: 18 }} aria-hidden="true">
              <path d="M28 14 C20 6 8 4 4 10 C2 13 6 17 12 14 C18 11 24 14 28 14 C32 14 38 11 44 14 C50 17 54 13 52 10 C48 4 36 6 28 14Z" stroke="#B8972E" strokeWidth="1.2" fill="none" />
              <path d="M28 14 C26 12 26 10 28 8 C30 10 30 12 28 14Z" fill="#B8972E" opacity="0.6" />
            </svg>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 400, letterSpacing: '0.1em', color: 'var(--cream)', textTransform: 'uppercase' as const }}>MintBox</span>
          </div>
          <p className="page-footer-tagline">&ldquo;Gifting that says what words can&apos;t.&rdquo;</p>
          <div className="page-footer-socials">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
                <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
                <rect x="2" y="2" width="20" height="20" rx="3" />
                <line x1="7" y1="11" x2="7" y2="17" />
                <line x1="7" y1="7" x2="7" y2="8" />
                <path d="M11 11v6M11 14c0-2 7-3 7 0v3" />
              </svg>
            </a>
          </div>
          <a href="https://themintbox.in" className="page-footer-url" target="_blank" rel="noopener">themintbox.in</a>
        </div>

        <div>
          <span className="page-footer-col-label">Navigate</span>
          <ul className="page-footer-nav">
            <li><a href="/catalog">Catalogue</a></li>
            <li><a href="/#occasions">Occasions</a></li>
            <li><a href="/#how-it-works">How it works</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/journal">Journal</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <span className="page-footer-col-label">Reach Us</span>
          <p className="page-footer-contact">Anand Ashok, Director</p>
          <p className="page-footer-contact"><a href="tel:+919916996642">+91 9916996642</a></p>
          <p className="page-footer-contact"><a href="mailto:anand@themintbox.in">anand@themintbox.in</a></p>
          <p className="page-footer-contact" style={{ marginTop: 8 }}>2nd Floor, Sobha Alexander Plaza,<br />Ashok Nagar, Bengaluru 560 025</p>
          <p className="page-footer-contact" style={{ marginTop: 10 }}>
            <a href="https://wa.me/919916996642" target="_blank" rel="noopener" style={{ color: 'var(--gold)' }}>Chat on WhatsApp &rarr;</a>
          </p>
        </div>

        <div>
          <span className="page-footer-col-label">The Journal</span>
          <p className="page-footer-newsletter-copy">Gifting guides, occasion edits, and MintBox news &mdash; monthly.</p>
          <form className="page-footer-nl-form" onSubmit={e => { e.preventDefault(); const btn = (e.target as HTMLFormElement).querySelector('button'); if (btn) { btn.textContent = '\u2713'; (btn as HTMLButtonElement).disabled = true; } }} noValidate>
            <input type="email" placeholder="your@email.com" autoComplete="email" aria-label="Email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="page-footer-bottom">
        <span className="page-footer-bottom-text">&copy; {new Date().getFullYear()} MintBox. All rights reserved.</span>
        <div className="page-footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

/* ── Floating WhatsApp button ── */
export function WhatsAppFloat() {
  return (
    <a className="wa-float" href="https://wa.me/919916996642" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      <span className="wa-tooltip">Chat with Anand &rarr;</span>
    </a>
  )
}
