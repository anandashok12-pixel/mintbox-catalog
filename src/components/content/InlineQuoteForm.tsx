'use client'

import { useState } from 'react'

const OCCASIONS = [
  { value: 'welcome_kit', label: 'Employee Welcome Kit' },
  { value: 'diwali', label: 'Diwali Gifting' },
  { value: 'client_gifting', label: 'Client Gifting' },
  { value: 'corporate_event', label: 'Corporate Event' },
  { value: 'recognition', label: 'Work Anniversary / Recognition' },
  { value: 'festival', label: 'Festival Season' },
  { value: 'year_end', label: 'Year-End Gifting' },
  { value: 'other', label: 'Other' },
]

interface InlineQuoteFormProps {
  title?: string
  subtitle?: string
  ctaLabel?: string
  defaultOccasion?: string
  interestHint?: string
}

export default function InlineQuoteForm({
  title = 'Get a Free Quote',
  subtitle = "Tell us what you need and we'll send a detailed quote within 4 hours.",
  ctaLabel = 'Request Quote',
  defaultOccasion = '',
  interestHint = '',
}: InlineQuoteFormProps) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [occasion, setOccasion] = useState(defaultOccasion)
  const [quantity, setQuantity] = useState('')
  const [notes, setNotes] = useState(interestHint)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState<{ refCode: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !company.trim() || !email.trim()) {
      setError('Please fill in name, company and email.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          occasion: occasion || undefined,
          notes: [
            quantity ? `Quantity: ${quantity}` : '',
            notes.trim(),
          ].filter(Boolean).join('\n') || undefined,
          items: [],
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')

      setSuccess({ refCode: data.refCode || data.reference || 'MB-' + Math.random().toString(36).slice(2, 7).toUpperCase() })
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="cp-quote-form-panel">
        <div className="cp-form-success">
          <div className="cp-form-success-icon">✓</div>
          <div className="cp-form-success-title">Request Received</div>
          <p className="cp-form-success-desc">
            Our team will send you a detailed quote within 4 business hours. Check your inbox.
          </p>
          <div className="cp-form-success-ref">
            <div className="cp-form-success-ref-label">Reference</div>
            <div className="cp-form-success-ref-code">{success.refCode}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cp-quote-form-panel">
      <div className="cp-quote-form-title">{title}</div>
      <p className="cp-quote-form-sub">{subtitle}</p>

      <form onSubmit={handleSubmit} noValidate>
        {error && <div className="cp-form-error">{error}</div>}

        <div className="cp-form-row" style={{ marginBottom: '14px' }}>
          <div className="cp-form-group">
            <label className="cp-form-label">Your Name *</label>
            <input
              className="cp-form-input"
              type="text"
              placeholder="Priya Sharma"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="cp-form-group">
            <label className="cp-form-label">Company *</label>
            <input
              className="cp-form-input"
              type="text"
              placeholder="Acme Corp"
              value={company}
              onChange={e => setCompany(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="cp-form-row" style={{ marginBottom: '14px' }}>
          <div className="cp-form-group">
            <label className="cp-form-label">Work Email *</label>
            <input
              className="cp-form-input"
              type="email"
              placeholder="priya@acme.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="cp-form-group">
            <label className="cp-form-label">Phone</label>
            <input
              className="cp-form-input"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="cp-form-row" style={{ marginBottom: '14px' }}>
          <div className="cp-form-group">
            <label className="cp-form-label">Occasion</label>
            <select
              className="cp-form-select"
              value={occasion}
              onChange={e => setOccasion(e.target.value)}
            >
              <option value="">Select occasion</option>
              {OCCASIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className="cp-form-group">
            <label className="cp-form-label">Approx. Quantity</label>
            <input
              className="cp-form-input"
              type="text"
              placeholder="e.g. 200 units"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </div>
        </div>

        <div className="cp-form-group" style={{ marginBottom: '16px' }}>
          <label className="cp-form-label">What are you looking for?</label>
          <textarea
            className="cp-form-textarea"
            placeholder="Products, budget, delivery timeline, customisation needs…"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>

        <button type="submit" className="cp-form-submit" disabled={submitting}>
          {submitting ? 'Sending…' : ctaLabel}
        </button>
      </form>
    </div>
  )
}
