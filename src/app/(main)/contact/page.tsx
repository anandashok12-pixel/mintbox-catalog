'use client'

import React, { useState } from 'react'
import '../landing.css'
import './contact.css'

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div className="ct-page">
      {/* NAV */}
      <nav id="navbar" role="navigation" aria-label="Main navigation">
        <a href="/" className="nav-logo" aria-label="MintBox Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mintbox-logo-white.png" alt="MintBox" className="nav-logo-img" />
        </a>
        <ul className="nav-links" role="list">
          <li><a href="/#occasions">Catalogue</a></li>
          <li><a href="/#occasions">Occasions</a></li>
          <li><a href="/#how-it-works">How it works</a></li>
          <li><a href="/#footer">About</a></li>
          <li><a href="/#journal">Journal</a></li>
        </ul>
        <div className="nav-actions">
          <a href="/#quote-cta" className="btn-primary">Request a Quote</a>
        </div>
      </nav>

      {/* HERO */}
      <div className="ct-hero">
        <div className="ct-hero-pattern" />
        <div className="ct-hero-content">
          <div className="ct-hero-label">Get in touch</div>
          <h1 className="ct-hero-title">
            Let&apos;s talk<br /><em>about your team.</em>
          </h1>
          <div className="ct-hero-rule" />
          <p className="ct-hero-sub">
            Whether you have a brief, a budget, or just a feeling &mdash; we&apos;d love to hear from you. Most enquiries get a response within 4 hours.
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="ct-main">

        {/* LEFT -- CONTACT INFO */}
        <div className="ct-contact-info">

          {/* Founder card */}
          <div className="ct-founder-card">
            <div className="ct-founder-avatar">AA</div>
            <div>
              <div className="ct-founder-name">Anand Ashok</div>
              <div className="ct-founder-role">Director, MintBox</div>
              <a
                href="https://wa.me/919916996642"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-founder-wa"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact details */}
          <div className="ct-info-section">
            <div className="ct-info-label">Contact details</div>

            <div className="ct-info-card">
              <div className="ct-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.22 2 2 0 012.07 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                </svg>
              </div>
              <div>
                <div className="ct-info-card-title">Phone</div>
                <div className="ct-info-card-val">+91 9916996642</div>
                <div className="ct-info-card-sub">Mon &ndash; Sat, 9 AM &ndash; 7 PM IST</div>
              </div>
            </div>

            <div className="ct-info-card">
              <div className="ct-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="ct-info-card-title">Email</div>
                <div className="ct-info-card-val">anand@getmintbox.com</div>
                <div className="ct-info-card-sub">Response within 4 hours on business days</div>
              </div>
            </div>

            <div className="ct-info-card">
              <div className="ct-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="ct-info-card-title">Office</div>
                <div className="ct-info-card-val" style={{ fontSize: 14, lineHeight: 1.55 }}>
                  2nd Floor, Sobha Alexander Plaza<br />
                  2-A, Commissariat Rd, Ashok Nagar<br />
                  Bengaluru, Karnataka 560025
                </div>
              </div>
            </div>
          </div>

          {/* Office hours */}
          <div className="ct-info-section">
            <div className="ct-info-label">Office hours</div>
            <div className="ct-hours-wrap">
              <div className="ct-hours-row">
                <span className="ct-hours-day">Monday &ndash; Friday</span>
                <span className="ct-hours-time">9:00 AM &ndash; 7:00 PM</span>
              </div>
              <div className="ct-hours-row">
                <span className="ct-hours-day">Saturday</span>
                <span className="ct-hours-time">10:00 AM &ndash; 4:00 PM</span>
              </div>
              <div className="ct-hours-row">
                <span className="ct-hours-day">Sunday</span>
                <span className="ct-hours-closed">Closed</span>
              </div>
              <div className="ct-hours-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                <span className="ct-hours-day">Public holidays</span>
                <span className="ct-hours-closed">Closed</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="ct-info-section">
            <div className="ct-info-label">Find us</div>
            <div className="ct-map-placeholder">
              <svg className="ct-map-pin" viewBox="0 0 24 24" fill="none" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div className="ct-map-label">Ashok Nagar, Bengaluru</div>
              <div className="ct-map-sublabel">Embed Google Map in production</div>
            </div>
          </div>
        </div>

        {/* RIGHT -- FORM */}
        <div className="ct-contact-form-wrap">
          <div className="ct-form-eyebrow">Send us a message</div>
          <h2 className="ct-form-title">We&apos;d love to<br />hear from you.</h2>
          <p className="ct-form-sub">
            Have a gifting requirement, a question about our catalogue, or just want to say hello? Fill in the form and Anand will get back to you personally.
          </p>

          {formSubmitted ? (
            <div className="ct-form-success">
              <div className="ct-form-success-icon">&#10003;</div>
              <div className="ct-form-success-title">Message sent!</div>
              <p className="ct-form-success-sub">
                Anand will get back to you within 4 hours on business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="ct-form-row">
                <div className="ct-form-group">
                  <label className="ct-form-label">Your name</label>
                  <input className="ct-form-input" type="text" placeholder="Priya Sharma" required />
                </div>
                <div className="ct-form-group">
                  <label className="ct-form-label">Company</label>
                  <input className="ct-form-input" type="text" placeholder="Acme Technologies" />
                </div>
              </div>

              <div className="ct-form-row">
                <div className="ct-form-group">
                  <label className="ct-form-label">Email address</label>
                  <input className="ct-form-input" type="email" placeholder="priya@acme.com" required />
                </div>
                <div className="ct-form-group">
                  <label className="ct-form-label">Phone number</label>
                  <input className="ct-form-input" type="tel" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="ct-form-row">
                <div className="ct-form-group">
                  <label className="ct-form-label">I&apos;m enquiring about</label>
                  <select className="ct-form-select">
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
                <div className="ct-form-group">
                  <label className="ct-form-label">Team size</label>
                  <select className="ct-form-select">
                    <option value="">Select size</option>
                    <option>Under 25</option>
                    <option>25 &ndash; 100</option>
                    <option>100 &ndash; 500</option>
                    <option>500+</option>
                  </select>
                </div>
              </div>

              <div className="ct-form-group ct-full">
                <label className="ct-form-label">Budget per unit (optional)</label>
                <select className="ct-form-select">
                  <option value="">Select budget range</option>
                  <option>Under &#x20B9;500</option>
                  <option>&#x20B9;500 &ndash; &#x20B9;1,500</option>
                  <option>&#x20B9;1,500 &ndash; &#x20B9;3,500</option>
                  <option>&#x20B9;3,500 &ndash; &#x20B9;8,000</option>
                  <option>&#x20B9;8,000+</option>
                </select>
              </div>

              <div className="ct-form-group ct-full">
                <label className="ct-form-label">Tell us more</label>
                <textarea
                  className="ct-form-textarea"
                  placeholder="Share any details about your gifting requirement — timeline, special requests, branding needs, or anything else we should know."
                />
              </div>

              <button type="submit" className="ct-form-submit">Send enquiry &rarr;</button>
            </form>
          )}

          <div className="ct-form-wa-alt">
            Prefer a quicker reply?
            <a
              href="https://wa.me/919916996642"
              target="_blank"
              rel="noopener noreferrer"
              className="ct-form-wa-link"
            >
              WhatsApp Anand directly &rarr;
            </a>
          </div>

          <div className="ct-form-promise">
            <div className="ct-promise-item">
              <div className="ct-promise-dot" />
              <div className="ct-promise-text"><strong>4-hour response</strong>On all business day enquiries</div>
            </div>
            <div className="ct-promise-item">
              <div className="ct-promise-dot" />
              <div className="ct-promise-text"><strong>No commitment</strong>Just a conversation to start</div>
            </div>
            <div className="ct-promise-item">
              <div className="ct-promise-dot" />
              <div className="ct-promise-text"><strong>No hidden costs</strong>Transparent quotes every time</div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAND */}
      <div className="ct-bottom-band">
        <div className="ct-band-left">
          <div className="ct-band-quote">
            &ldquo;Most gifts say &lsquo;here&apos;s your budget spent.&rsquo; A MintBox says &lsquo;we thought about you.&rsquo; That&apos;s the difference between a gift and a gesture.&rdquo;
          </div>
          <div className="ct-band-cite">&mdash; MintBox Brand Manifesto</div>
        </div>
        <div className="ct-band-right">
          <div className="ct-band-contact-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,230,0.5)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81" />
            </svg>
            <span className="ct-band-contact-val">+91 9916996642</span>
          </div>
          <div className="ct-band-contact-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,230,0.5)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="ct-band-contact-val">anand@getmintbox.com</span>
          </div>
          <div className="ct-band-contact-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,230,0.5)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="ct-band-contact-val">Ashok Nagar, Bengaluru</span>
          </div>
          <a
            href="https://wa.me/919916996642"
            target="_blank"
            rel="noopener noreferrer"
            className="ct-band-contact-item"
            style={{ marginTop: 4, textDecoration: 'none' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(184,151,46,0.7)" stroke="none">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span style={{ color: 'var(--ct-gold)', fontWeight: 400, fontSize: 13 }}>WhatsApp us directly</span>
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer id="footer" role="contentinfo">
        <div className="footer-grid">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mintbox-logo-white.png" alt="MintBox" className="footer-logo-img" />
            <p className="footer-tagline">&ldquo;Gifting that says what words can&apos;t.&rdquo;</p>
            <div className="footer-socials">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '20px', height: '20px', color: 'rgba(245,240,230,0.6)' }}>
                  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px', color: 'rgba(245,240,230,0.6)' }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            <a href="https://getmintbox.com" className="footer-url" target="_blank" rel="noopener">getmintbox.com</a>
          </div>
          <div>
            <span className="footer-col-label">Navigate</span>
            <ul className="footer-nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/#occasions">Solutions</a></li>
              <li><a href="/catalog">Catalog</a></li>
              <li><a href="/#how-it-works">How It Works</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/#journal">Journal</a></li>
              <li><a href="/#quote-cta">Request A Quote</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <span className="footer-col-label">Reach Us</span>
            <p className="footer-contact-item"><a href="tel:+919916996642">+91 9916996642</a></p>
            <p className="footer-contact-item"><a href="mailto:anand@getmintbox.com">anand@getmintbox.com</a></p>
            <p className="footer-contact-item" style={{ marginTop: '8px' }}>2nd Floor, Sobha Alexander Plaza,<br/>Ashok Nagar, Bengaluru 560 025</p>
            <p className="footer-contact-item" style={{ marginTop: '10px' }}>
              <a href="https://wa.me/919916996642" target="_blank" rel="noopener" style={{ color: 'var(--gold)' }}>Chat on WhatsApp &rarr;</a>
            </p>
          </div>
          <div>
            <span className="footer-col-label">The Journal</span>
            <p className="footer-newsletter-copy">Gifting guides, occasion edits, and MintBox news — monthly.</p>
            <form className="newsletter-form" noValidate onSubmit={(e) => { e.preventDefault(); const btn = (e.target as HTMLFormElement).querySelector('button'); if (btn) { btn.textContent = '✓'; (btn as HTMLButtonElement).disabled = true; } }}>
              <input type="email" name="email" placeholder="your@email.com" autoComplete="email" aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-bottom-text">&copy; 2026 MintBox. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a id="wa-float" href="https://wa.me/919916996642" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="wa-tooltip">Chat with Anand &rarr;</span>
      </a>
    </div>
  )
}
