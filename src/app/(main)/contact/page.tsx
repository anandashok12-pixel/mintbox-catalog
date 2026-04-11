'use client'

import React, { useState } from 'react'
import '../landing.css'
import './contact.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

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

      <Navbar />

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

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
