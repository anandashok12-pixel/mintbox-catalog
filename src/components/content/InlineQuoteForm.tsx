'use client'

import { useId, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAttribution } from '@/lib/attribution'
import { isValidPhone } from '@/lib/phone'
import { MIN_ORDER_UNITS, QUOTE_TIME, REPLY_TIME } from '@/lib/businessFacts'

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

type FieldKey = 'name' | 'company' | 'email' | 'phone'
type FieldErrors = Partial<Record<FieldKey, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldErrorStyle: React.CSSProperties = {
  color: '#f87171',
  fontSize: '13px',
  marginTop: '6px',
}

const optionalStyle: React.CSSProperties = {
  textTransform: 'none',
  letterSpacing: 0,
  opacity: 0.8,
}

const hintStyle: React.CSSProperties = {
  fontSize: '12px',
  marginTop: '6px',
  opacity: 0.6,
}

function RequiredMark() {
  return <span aria-hidden="true"> *</span>
}

function OptionalMark() {
  return <span style={optionalStyle}> (optional)</span>
}

export default function InlineQuoteForm({
  title = 'Get a Free Quote',
  subtitle = `Tell us what you need. We reply within ${REPLY_TIME} and send a priced quote within ${QUOTE_TIME}.`,
  ctaLabel = 'Request Quote',
  defaultOccasion = '',
  interestHint = '',
}: InlineQuoteFormProps) {
  const router = useRouter()
  const uid = useId()
  const ids = {
    name: `${uid}-name`,
    company: `${uid}-company`,
    email: `${uid}-email`,
    phone: `${uid}-phone`,
    occasion: `${uid}-occasion`,
    quantity: `${uid}-quantity`,
    quantityHint: `${uid}-quantity-hint`,
    notes: `${uid}-notes`,
  }
  const errId = (k: FieldKey) => `${uid}-${k}-error`

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [occasion, setOccasion] = useState(defaultOccasion)
  const [quantity, setQuantity] = useState('')
  const [notes, setNotes] = useState(interestHint)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  // Only set when the server actually returned a reference code.
  const [success, setSuccess] = useState<{ refCode: string | null } | null>(null)

  const clearFieldError = (k: FieldKey) =>
    setFieldErrors(prev => (prev[k] ? { ...prev, [k]: undefined } : prev))

  const errorProps = (k: FieldKey) =>
    fieldErrors[k]
      ? { 'aria-invalid': true as const, 'aria-describedby': errId(k) }
      : {}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const next: FieldErrors = {}
    if (!name.trim()) next.name = 'Please enter your name.'
    if (!company.trim()) next.company = 'Please enter your company name.'
    if (!email.trim()) next.email = 'Please enter your work email.'
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Please enter a valid email address.'
    if (!phone.trim()) next.phone = 'Please enter your phone number.'
    else if (!isValidPhone(phone)) next.phone = 'Please enter a valid phone number.'
    setFieldErrors(next)

    const firstInvalid = (Object.keys(next) as FieldKey[])[0]
    if (firstInvalid) {
      document.getElementById(ids[firstInvalid])?.focus()
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
          phone: phone.trim(),
          occasion: occasion || undefined,
          notes: [
            quantity ? `Quantity: ${quantity}` : '',
            notes.trim(),
          ].filter(Boolean).join('\n') || undefined,
          items: [],
          attribution: getAttribution(),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')

      const serverRef: unknown = data.referenceCode
      const refCode =
        typeof serverRef === 'string' && serverRef && serverRef !== 'MB-XXXXX' ? serverRef : null
      setSuccess({ refCode })
      router.push('/thank-you')
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="cp-quote-form-panel">
        <div className="cp-form-success" role="status">
          <div className="cp-form-success-icon" aria-hidden="true">✓</div>
          <div className="cp-form-success-title">Request Received</div>
          <p className="cp-form-success-desc">
            We&apos;ll reply within {REPLY_TIME} and send your priced quote within {QUOTE_TIME}. Check your inbox.
          </p>
          {success.refCode && (
            <div className="cp-form-success-ref">
              <div className="cp-form-success-ref-label">Reference</div>
              <div className="cp-form-success-ref-code">{success.refCode}</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="cp-quote-form-panel">
      <div className="cp-quote-form-title">{title}</div>
      <p className="cp-quote-form-sub">{subtitle}</p>

      <form onSubmit={handleSubmit} noValidate aria-label={title}>
        <div role="alert">
          {error && <div className="cp-form-error">{error}</div>}
        </div>

        <div className="cp-form-row" style={{ marginBottom: '14px' }}>
          <div className="cp-form-group">
            <label className="cp-form-label" htmlFor={ids.name}>Your Name<RequiredMark /></label>
            <input
              id={ids.name}
              name="name"
              className="cp-form-input"
              type="text"
              autoComplete="name"
              placeholder="Priya Sharma"
              value={name}
              onChange={e => { setName(e.target.value); clearFieldError('name') }}
              required
              {...errorProps('name')}
            />
            {fieldErrors.name && <p id={errId('name')} style={fieldErrorStyle}>{fieldErrors.name}</p>}
          </div>
          <div className="cp-form-group">
            <label className="cp-form-label" htmlFor={ids.company}>Company<RequiredMark /></label>
            <input
              id={ids.company}
              name="company"
              className="cp-form-input"
              type="text"
              autoComplete="organization"
              placeholder="Acme Corp"
              value={company}
              onChange={e => { setCompany(e.target.value); clearFieldError('company') }}
              required
              {...errorProps('company')}
            />
            {fieldErrors.company && <p id={errId('company')} style={fieldErrorStyle}>{fieldErrors.company}</p>}
          </div>
        </div>

        <div className="cp-form-row" style={{ marginBottom: '14px' }}>
          <div className="cp-form-group">
            <label className="cp-form-label" htmlFor={ids.email}>Work Email<RequiredMark /></label>
            <input
              id={ids.email}
              name="email"
              className="cp-form-input"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="priya@acme.com"
              value={email}
              onChange={e => { setEmail(e.target.value); clearFieldError('email') }}
              required
              {...errorProps('email')}
            />
            {fieldErrors.email && <p id={errId('email')} style={fieldErrorStyle}>{fieldErrors.email}</p>}
          </div>
          <div className="cp-form-group">
            <label className="cp-form-label" htmlFor={ids.phone}>Phone<RequiredMark /></label>
            <input
              id={ids.phone}
              name="phone"
              className="cp-form-input"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={e => { setPhone(e.target.value); clearFieldError('phone') }}
              required
              {...errorProps('phone')}
            />
            {fieldErrors.phone && <p id={errId('phone')} style={fieldErrorStyle}>{fieldErrors.phone}</p>}
          </div>
        </div>

        <div className="cp-form-row" style={{ marginBottom: '14px' }}>
          <div className="cp-form-group">
            <label className="cp-form-label" htmlFor={ids.occasion}>Occasion<OptionalMark /></label>
            <select
              id={ids.occasion}
              name="occasion"
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
            <label className="cp-form-label" htmlFor={ids.quantity}>Approx. Quantity<OptionalMark /></label>
            <input
              id={ids.quantity}
              name="quantity"
              className="cp-form-input"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="e.g. 200"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              aria-describedby={ids.quantityHint}
            />
            <p id={ids.quantityHint} style={hintStyle}>Minimum order {MIN_ORDER_UNITS} units</p>
          </div>
        </div>

        <div className="cp-form-group" style={{ marginBottom: '16px' }}>
          <label className="cp-form-label" htmlFor={ids.notes}>What are you looking for?<OptionalMark /></label>
          <textarea
            id={ids.notes}
            name="notes"
            className="cp-form-textarea"
            placeholder="Products, budget, delivery timeline, customisation needs…"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>

        <button type="submit" className="cp-form-submit" disabled={submitting} aria-busy={submitting}>
          {submitting ? 'Sending…' : ctaLabel}
        </button>
      </form>
    </div>
  )
}
