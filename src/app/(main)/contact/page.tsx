'use client'

import React, { useState } from 'react'
import '../landing.css'
import './contact.css'

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [occasion, setOccasion] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [budget, setBudget] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim()) {
      setError('Please fill in your name and email.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim() || undefined,
          email: email.trim(),
          phone: phone.trim() || undefined,
          occasion: occasion || undefined,
          notes: [
            teamSize ? `Team size: ${teamSize}` : '',
            budget ? `Budget: ${budget}` : '',
            notes.trim(),
          ].filter(Boolean).join('\n') || undefined,
          items: [],
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      setFormSubmitted(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="ct-page">

      {/* HERO with floating nav */}
      <div className="ct-hero">
        <div className="ct-hero-pattern" />

        <div className="ct-nav-wrap">
          <nav className="ct-nav">
            <a href="/" className="ct-nav-brand">
              <div className="ct-nav-bow">
                <svg width="32" height="18" viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 18C34 12,18 5,5 9C-3 12,1 19,12 17C24 15,36 20,40 18" stroke="#B8972E" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                  <path d="M40 18C46 12,62 5,75 9C83 12,79 19,68 17C56 15,44 20,40 18" stroke="#B8972E" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                  <path d="M35 15C37 12,39 11,40 11C41 11,43 12,45 15C43 16.5,41 18,40 18C39 18,37 16.5,35 15Z" stroke="#B8972E" strokeWidth="1.2" fill="none"/>
                  <path d="M40 18L38 26M40 18L42 26" stroke="#B8972E" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              </div>
              MintBox
            </a>
            <div className="ct-nav-links">
              <a href="/catalog" className="ct-nav-link">Catalogue</a>
              <a href="/solutions" className="ct-nav-link">Occasions</a>
              <a href="/about" className="ct-nav-link">About</a>
            </div>
            <a href="/contact" className="ct-nav-cta">Request a Quote</a>
          </nav>
        </div>

        <div className="ct-hero-content">
          <div className="ct-hero-label">Get in touch</div>
          <h1 className="ct-hero-title">
            Let&apos;s talk<br /><em>about your team.</em>
          </h1>
          <div className="ct-hero-rule" />
          <p className="ct-hero-sub">
            Whether you have a brief, a budget, or just a feeling, we&apos;d love to hear from you. Most enquiries get a response within 4 hours.
          </p>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="ct-form-section">
        <div className="ct-form-section-inner">

          {/* LEFT: heading + promises */}
          <div>
            <div className="ct-form-eyebrow">Send us a message</div>
            <h2 className="ct-form-title">We&apos;d love to hear from you.</h2>
            <p className="ct-form-sub">
              Have a gifting requirement, a question about our catalogue, or just want to say hello? Fill in the form and Anand will get back to you personally.
            </p>

            <div className="ct-promises">
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

          {/* RIGHT: form fields */}
          <div>
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
                {error && <div className="ct-form-error">{error}</div>}

                <div className="ct-form-row">
                  <div className="ct-form-group">
                    <label className="ct-form-label">Your name</label>
                    <input
                      className="ct-form-input"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="ct-form-group">
                    <label className="ct-form-label">Company</label>
                    <input
                      className="ct-form-input"
                      type="text"
                      placeholder="Enter your company name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>

                <div className="ct-form-row">
                  <div className="ct-form-group">
                    <label className="ct-form-label">Email address</label>
                    <input
                      className="ct-form-input"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="ct-form-group">
                    <label className="ct-form-label">Mobile number</label>
                    <input
                      className="ct-form-input"
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="ct-form-row">
                  <div className="ct-form-group">
                    <label className="ct-form-label">I&apos;m enquiring about</label>
                    <select
                      className="ct-form-select"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                    >
                      <option value="">Select occasion</option>
                      <option value="Employee onboarding kits">Employee onboarding kits</option>
                      <option value="Diwali & festive gifting">Diwali &amp; festive gifting</option>
                      <option value="Client appreciation">Client appreciation</option>
                      <option value="Work anniversary gifts">Work anniversary gifts</option>
                      <option value="Conference & event swag">Conference &amp; event swag</option>
                      <option value="New Year gifts">New Year gifts</option>
                      <option value="Custom / other">Custom / other</option>
                    </select>
                  </div>
                  <div className="ct-form-group">
                    <label className="ct-form-label">Team size</label>
                    <select
                      className="ct-form-select"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                    >
                      <option value="">Select size</option>
                      <option value="Under 25">Under 25</option>
                      <option value="25 to 100">25 to 100</option>
                      <option value="100 to 500">100 to 500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                </div>

                <div className="ct-form-group ct-full">
                  <label className="ct-form-label">Budget per unit (optional)</label>
                  <select
                    className="ct-form-select"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="">Select budget range</option>
                    <option value="Under ₹500">Under &#x20B9;500</option>
                    <option value="₹500 – ₹1,500">&#x20B9;500 &ndash; &#x20B9;1,500</option>
                    <option value="₹1,500 – ₹3,500">&#x20B9;1,500 &ndash; &#x20B9;3,500</option>
                    <option value="₹3,500 – ₹8,000">&#x20B9;3,500 &ndash; &#x20B9;8,000</option>
                    <option value="₹8,000+">&#x20B9;8,000+</option>
                  </select>
                </div>

                <div className="ct-form-group ct-full">
                  <label className="ct-form-label">Tell us more</label>
                  <textarea
                    className="ct-form-textarea"
                    placeholder="Share any details about your gifting requirement: timeline, special requests, branding needs, or anything else we should know."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <button type="submit" className="ct-form-submit" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send enquiry →'}
                </button>
              </form>
            )}

            <div className="ct-form-wa-alt">
              Prefer a quicker reply?{' '}
              <a
                href="https://wa.me/918618237189"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-form-wa-link"
              >
                WhatsApp Anand directly &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT DETAILS — split panel */}
      <div className="ct-contact-section">
        <div className="ct-contact-split">

          {/* LEFT — white, contact details */}
          <div className="ct-contact-left">
            <div className="ct-cs-eyebrow">Contact details</div>
            <div className="ct-cs-list">

              <div className="ct-cs-item">
                <div className="ct-cs-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.22 2 2 0 012.07 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                  </svg>
                </div>
                <div>
                  <div className="ct-cs-ilabel">Phone</div>
                  <div className="ct-cs-ival">
                    <a href="tel:+918618237189" style={{ color: 'inherit', textDecoration: 'none' }}>+91 86182 37189</a>
                  </div>
                </div>
              </div>

              <div className="ct-cs-item">
                <div className="ct-cs-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="ct-cs-ilabel">Email</div>
                  <div className="ct-cs-ival">
                    <a href="mailto:anand@getmintbox.com" style={{ color: 'inherit', textDecoration: 'none' }}>anand@getmintbox.com</a>
                  </div>
                  <div className="ct-cs-isub">Reply within 4 hours on business days</div>
                </div>
              </div>

              <div className="ct-cs-item">
                <div className="ct-cs-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="ct-cs-ilabel">Office</div>
                  <div className="ct-cs-ival" style={{ fontSize: 15, lineHeight: 1.55 }}>
                    2nd Floor, Building 16/2<br />
                    Sobha Alexander Plaza<br />
                    Ashok Nagar, Bengaluru 560025
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT — cream, map */}
          <div className="ct-contact-right">
            <div className="ct-cs-eyebrow">Find us</div>
            <div className="ct-map-placeholder">
              <svg className="ct-map-pin" viewBox="0 0 24 24" fill="none" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div className="ct-map-label">Sobha Alexander Plaza, Ashok Nagar</div>
              <div className="ct-map-sublabel">Commissariat Rd, Bengaluru 560025</div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="ct-footer">
        <div className="ct-footer-main">

          {/* Col 1: Brand */}
          <div className="ct-footer-col">
            <a href="/" className="ct-footer-logo">
              <svg width="32" height="18" viewBox="0 0 80 36" fill="none">
                <path d="M40 18C34 12,18 5,5 9C-3 12,1 19,12 17C24 15,36 20,40 18" stroke="#B8972E" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                <path d="M40 18C46 12,62 5,75 9C83 12,79 19,68 17C56 15,44 20,40 18" stroke="#B8972E" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                <path d="M35 15C37 12,39 11,40 11C41 11,43 12,45 15C43 16.5,41 18,40 18C39 18,37 16.5,35 15Z" stroke="#B8972E" strokeWidth="1.2" fill="none"/>
                <path d="M40 18L38 26M40 18L42 26" stroke="#B8972E" strokeWidth="1" strokeLinecap="round"/>
              </svg>
              <span className="ct-footer-brand">MintBox</span>
            </a>
            <div className="ct-footer-tagline">&ldquo;Gifting that says what words can&apos;t.&rdquo;</div>
            <div className="ct-footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ct-footer-social" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,230,0.6)" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="rgba(245,240,230,0.6)"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="ct-footer-social" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="rgba(245,240,230,0.6)"><path d="M6.94 5a2 2 0 11-4-.002 2 2 0 014 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.16-7.06-5.94-8.72-2.91l.04-1.68z"/></svg>
              </a>
            </div>
            <div className="ct-footer-url">getmintbox.com</div>
          </div>

          {/* Col 2: Navigate */}
          <div className="ct-footer-col">
            <div className="ct-footer-col-label">Navigate</div>
            <a href="/" className="ct-footer-nav-link">Home</a>
            <a href="/solutions" className="ct-footer-nav-link">Solutions</a>
            <a href="/catalog" className="ct-footer-nav-link">Catalog</a>
            <a href="/faq" className="ct-footer-nav-link">FAQ</a>
            <a href="/about" className="ct-footer-nav-link">About Us</a>
            <a href="/contact" className="ct-footer-nav-link">Request A Quote</a>
            <a href="/contact" className="ct-footer-nav-link">Contact</a>
          </div>

          {/* Col 3: Reach Us */}
          <div className="ct-footer-col">
            <div className="ct-footer-col-label">Reach Us</div>
            <div className="ct-footer-contact-val"><a href="tel:+918618237189">+91 86182 37189</a></div>
            <div className="ct-footer-contact-val"><a href="mailto:anand@getmintbox.com">anand@getmintbox.com</a></div>
            <div className="ct-footer-contact-val">2nd Floor, Sobha Alexander Plaza,<br/>Ashok Nagar, Bengaluru 560 025</div>
            <a
              href="https://wa.me/918618237189"
              target="_blank"
              rel="noopener noreferrer"
              className="ct-footer-wa"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Chat on WhatsApp &rarr;
            </a>
          </div>

          {/* Col 4: The Journal */}
          <div className="ct-footer-col">
            <div className="ct-footer-col-label">The Journal</div>
            <div className="ct-footer-journal-desc">Gifting guides, occasion edits, and MintBox news &mdash; monthly.</div>
            <form
              className="ct-footer-subscribe"
              noValidate
              onSubmit={(e) => {
                e.preventDefault()
                const btn = (e.target as HTMLFormElement).querySelector('button')
                if (btn) { btn.textContent = '✓'; (btn as HTMLButtonElement).disabled = true }
              }}
            >
              <input className="ct-footer-sub-input" type="email" placeholder="your@email.com" />
              <button className="ct-footer-sub-btn" type="submit">Subscribe</button>
            </form>
          </div>

        </div>

        <div className="ct-footer-bottom">
          <div className="ct-footer-copy">&copy; 2026 MintBox. All rights reserved.</div>
          <div className="ct-footer-legal">
            <a href="#" className="ct-footer-legal-link">Privacy Policy</a>
            <a href="#" className="ct-footer-legal-link">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a id="wa-float" href="https://wa.me/918618237189" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="wa-tooltip">Chat with Anand &rarr;</span>
      </a>
    </div>
  )
}
