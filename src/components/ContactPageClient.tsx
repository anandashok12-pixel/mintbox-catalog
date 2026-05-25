'use client'

import React, { useState } from 'react'
import '../app/(main)/landing.css'
import '../app/(main)/contact/contact.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

interface ContactPageData {
  hero: { label: string; titleLine1: string; titleLine2: string; subtitle: string }
  formInfo: {
    eyebrow: string; title: string; subtitle: string;
    promises: Array<{ id?: string; bold: string; desc: string }>
  }
  formConfig: {
    occasionOptions: Array<{ id?: string; label: string; value: string }>
    teamSizeOptions: Array<{ id?: string; label: string; value: string }>
    budgetOptions: Array<{ id?: string; label: string; value: string }>
    successTitle: string; successMessage: string;
  }
  contactDetails: {
    phone: string; email: string; emailSubNote: string;
    officeAddress: string; mapLabel: string; mapSublabel: string;
    whatsappUrl: string;
  }
}

const EMPTY: ContactPageData = {
  hero: { label: 'Get in touch', titleLine1: "Let's talk", titleLine2: 'about your team.', subtitle: '' },
  formInfo: {
    eyebrow: 'Send us a message',
    title: "We'd love to hear from you.",
    subtitle: "Share a few details about your gifting need and we'll get back within four working hours with a curated proposal  -  no spam, no sales follow-ups, just a real reply from the team.",
    promises: [
      { bold: 'Reply within 4 hours. ', desc: 'Every enquiry gets a real response from a real person  -  never an auto-reply.' },
      { bold: 'Transparent pricing. ', desc: 'The number we quote upfront is the number on your invoice. No surprise fees, no surcharges.' },
      { bold: 'No pressure, no pitch. ', desc: "We'll send options that fit your budget. If we're not the right fit, we'll say so honestly." },
    ],
  },
  formConfig: {
    occasionOptions: [
      { label: 'Employee onboarding kits', value: 'Employee onboarding kits' },
      { label: 'Diwali & festive gifting', value: 'Diwali & festive gifting' },
      { label: 'Client appreciation', value: 'Client appreciation' },
      { label: 'Work anniversary gifts', value: 'Work anniversary gifts' },
      { label: 'Conference & event swag', value: 'Conference & event swag' },
      { label: 'New Year gifts', value: 'New Year gifts' },
      { label: 'Custom / other', value: 'Custom / other' },
    ],
    teamSizeOptions: [
      { label: 'Under 25', value: 'Under 25' },
      { label: '25 to 100', value: '25 to 100' },
      { label: '100 to 500', value: '100 to 500' },
      { label: '500+', value: '500+' },
    ],
    budgetOptions: [
      { label: 'Under Rs500', value: 'Under Rs500' },
      { label: 'Rs500 - Rs1,500', value: 'Rs500 - Rs1,500' },
      { label: 'Rs1,500 - Rs3,500', value: 'Rs1,500 - Rs3,500' },
      { label: 'Rs3,500 - Rs8,000', value: 'Rs3,500 - Rs8,000' },
      { label: 'Rs8,000+', value: 'Rs8,000+' },
    ],
    successTitle: 'Message sent!',
    successMessage: "Thank you! We'll be in touch within 4 hours.",
  },
  contactDetails: {
    phone: '+91 9886537631',
    email: 'hello@themintbox.in',
    emailSubNote: 'Response within 4 hours on business days',
    officeAddress: '2nd Floor, Sobha Alexander Plaza\n2-A, Commissariat Rd, Ashok Nagar\nBengaluru, Karnataka 560025',
    mapLabel: 'Sobha Alexander Plaza, Ashok Nagar',
    mapSublabel: 'Commissariat Rd, Bengaluru 560 025',
    whatsappUrl: 'https://wa.me/919886537631',
  },
}

// Merge raw DB values onto defaults, but ignore null/undefined/empty-string
// /empty-array values so blank fields in the CMS fall back to the defaults
// here instead of rendering an empty section.
const mergeNonNull = <T extends Record<string, any>>(base: T, overrides: Record<string, any> | null | undefined): T => {
  const result: Record<string, any> = { ...base }
  if (overrides) {
    for (const [k, v] of Object.entries(overrides)) {
      if (v === null || v === undefined) continue
      if (Array.isArray(v) && v.length === 0) continue
      if (typeof v === 'string' && v.trim() === '') continue
      result[k] = v
    }
  }
  return result as T
}

export function ContactPageClient({ data: raw }: { data: ContactPageData }) {
  const merged = {
    ...EMPTY,
    ...raw,
    hero: mergeNonNull(EMPTY.hero, raw?.hero),
    formInfo: mergeNonNull(EMPTY.formInfo, raw?.formInfo),
    formConfig: mergeNonNull(EMPTY.formConfig, raw?.formConfig),
    contactDetails: mergeNonNull(EMPTY.contactDetails, raw?.contactDetails),
  }
  const data: ContactPageData = {
    ...merged,
    formInfo: { ...merged.formInfo, promises: merged.formInfo.promises ?? [] },
    formConfig: {
      ...merged.formConfig,
      occasionOptions: merged.formConfig.occasionOptions ?? [],
      teamSizeOptions: merged.formConfig.teamSizeOptions ?? [],
      budgetOptions: merged.formConfig.budgetOptions ?? [],
    },
    contactDetails: {
      ...merged.contactDetails,
      phone: merged.contactDetails.phone ?? '+91 9886537631',
      email: merged.contactDetails.email ?? 'hello@themintbox.in',
      emailSubNote: merged.contactDetails.emailSubNote ?? '',
      officeAddress: merged.contactDetails.officeAddress ?? '',
      mapLabel: merged.contactDetails.mapLabel ?? '',
      mapSublabel: merged.contactDetails.mapSublabel ?? '',
      whatsappUrl: merged.contactDetails.whatsappUrl ?? 'https://wa.me/919886537631',
    },
  }
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')

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
    setNameError('')
    setEmailError('')
    let valid = true
    if (!name.trim()) { setNameError('Your name is required.'); valid = false }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) { setEmailError('Email address is required.'); valid = false }
    else if (!emailRegex.test(email.trim())) { setEmailError('Please enter a valid email address.'); valid = false }
    if (!valid) return

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

      const resData = await res.json()
      if (!res.ok) {
        setError(resData.error || 'Something went wrong. Please try again.')
        return
      }

      setFormSubmitted(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Defensively rewrite any stale anand@... email values from the CMS to the
  // new public address. Lets us update branding without re-seeding the DB.
  const publicEmail = data.contactDetails.email.replace(
    /anand@(themintbox\.in|getmintbox\.com)/gi,
    'hello@themintbox.in',
  )
  const addressLines = data.contactDetails.officeAddress.split('\n')

  return (
    <div className="ct-page">

      <Navbar />

      {/* HERO */}
      <div className="ct-hero">
        <div className="ct-hero-pattern" />

        <div className="ct-hero-content">
          <div className="ct-hero-label">{data.hero.label}</div>
          <h1 className="ct-hero-title">
            {data.hero.titleLine1}<br /><em>{data.hero.titleLine2}</em>
          </h1>
          <div className="ct-hero-rule" />
          <p className="ct-hero-sub">
            {data.hero.subtitle}
          </p>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="ct-form-section">
        <div className="ct-form-section-inner">

          {/* LEFT: heading + promises */}
          <div>
            <div className="ct-form-eyebrow">{data.formInfo.eyebrow}</div>
            <h2 className="ct-form-title">{data.formInfo.title}</h2>
            <p className="ct-form-sub">
              {data.formInfo.subtitle}
            </p>

            <div className="ct-promises">
              {data.formInfo.promises.map((promise, i) => (
                <div className="ct-promise-item" key={promise.id || i}>
                  <div className="ct-promise-dot" />
                  <div className="ct-promise-text"><strong>{promise.bold}</strong>{promise.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: form fields */}
          <div>
            {formSubmitted ? (
              <div className="ct-form-success">
                <div className="ct-form-success-icon">&#10003;</div>
                <div className="ct-form-success-title">{data.formConfig.successTitle}</div>
                <p className="ct-form-success-sub">
                  {data.formConfig.successMessage}
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
                    {nameError && <div className="ct-field-error">{nameError}</div>}
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
                    {emailError && <div className="ct-field-error">{emailError}</div>}
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
                    <label className="ct-form-label">Occasion</label>
                    <select
                      className="ct-form-select"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                    >
                      <option value="">Select occasion</option>
                      {data.formConfig.occasionOptions.map((opt, i) => (
                        <option key={opt.id || i} value={opt.value}>{opt.label}</option>
                      ))}
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
                      {data.formConfig.teamSizeOptions.map((opt, i) => (
                        <option key={opt.id || i} value={opt.value}>{opt.label}</option>
                      ))}
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
                    {data.formConfig.budgetOptions.map((opt, i) => (
                      <option key={opt.id || i} value={opt.value}>{opt.label}</option>
                    ))}
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
                  {submitting ? 'Sending\u2026' : 'Send enquiry \u2192'}
                </button>
              </form>
            )}

            <div className="ct-form-wa-alt">
              Prefer a quicker reply?{' '}
              <a
                href={data.contactDetails.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="ct-form-wa-link"
              >
                WhatsApp us directly &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT DETAILS  -  split panel */}
      <div className="ct-contact-section">
        <div className="ct-contact-split">

          {/* LEFT  -  white, contact details */}
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
                    <a href={`tel:${data.contactDetails.phone.replace(/\s/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>{data.contactDetails.phone}</a>
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
                    <a href={`mailto:${publicEmail}`} style={{ color: 'inherit', textDecoration: 'none' }}>{publicEmail}</a>
                  </div>
                  <div className="ct-cs-isub">{data.contactDetails.emailSubNote}</div>
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
                    {addressLines.map((line, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT  -  cream, map */}
          <div className="ct-contact-right">
            <div className="ct-cs-eyebrow">Find us</div>
            <div className="ct-map-placeholder">
              <div className="ct-map-embed">
                <iframe
                  title="MintBox Office Location"
                  src="https://www.google.com/maps?q=Sobha+Alexander+Plaza,+Ashok+Nagar,+Bengaluru+560025&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.google.com/?q=Sobha+Alexander+Plaza,+Ashok+Nagar,+Bengaluru+560025"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-map-directions"
              >
                <svg className="ct-map-pin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8972E" strokeWidth="1.8" strokeLinecap="round" style={{ verticalAlign: 'middle', marginRight: 6 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{ verticalAlign: 'middle' }}>
                  {data.contactDetails.mapLabel || 'Sobha Alexander Plaza'} — Get Directions →
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* What happens next — gives enquirers context and adds substantive
          page content. */}
      <div className="ct-next-section">
        <div className="ct-next-inner">
          <div className="ct-cs-eyebrow">What happens next</div>
          <h2 className="ct-next-title">From enquiry to delivered gifts</h2>
          <p className="ct-next-lead">
            Reaching out to MintBox is the start of a conversation, not a sales funnel. Tell us who
            you&apos;re gifting, the occasion, and a rough budget — we&apos;ll take it from there and
            come back with a curated proposal, transparent pricing, and honest lead times. Here is
            exactly how it works.
          </p>
          <div className="ct-next-steps">
            <div className="ct-next-step">
              <span className="ct-next-num">1</span>
              <h3 className="ct-next-step-title">You share your brief</h3>
              <p className="ct-next-step-desc">
                Send your requirement via the form or WhatsApp — team size, occasion, budget and any
                branding needs. No commitment, and no account to create.
              </p>
            </div>
            <div className="ct-next-step">
              <span className="ct-next-num">2</span>
              <h3 className="ct-next-step-title">We send a curated proposal</h3>
              <p className="ct-next-step-desc">
                Within four working hours you&apos;ll get hand-picked hamper options that fit your
                budget, with clear per-unit pricing — everything included, no surprise fees.
              </p>
            </div>
            <div className="ct-next-step">
              <span className="ct-next-num">3</span>
              <h3 className="ct-next-step-title">You approve the mockups</h3>
              <p className="ct-next-step-desc">
                We share high-fidelity branding mockups for every product. Production only begins once
                you&apos;ve signed off on exactly how your gifts will look.
              </p>
            </div>
            <div className="ct-next-step">
              <span className="ct-next-num">4</span>
              <h3 className="ct-next-step-title">We pack and deliver</h3>
              <p className="ct-next-step-desc">
                We produce, quality-check, and deliver across Bengaluru and pan-India — to a single
                office or individually to employees&apos; homes — with GST invoicing throughout.
              </p>
            </div>
          </div>
          <p className="ct-next-foot">
            Prefer to talk it through first? Message us on{' '}
            <a
              href={data.contactDetails.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              WhatsApp
            </a>{' '}
            or email <a href={`mailto:${publicEmail}`}>{publicEmail}</a> — a real person replies,
            usually within a few hours on business days.
          </p>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
