'use client'

import { useEffect, useId, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/cartStore'
import QuantityInput from '@/components/cart/QuantityInput'
import { getAttribution } from '@/lib/attribution'
import { isValidPhone } from '@/lib/phone'
import { QUOTE_TIME, REPLY_TIME } from '@/lib/businessFacts'

interface LeadModalProps {
  onClose: () => void
}

const OCCASIONS = [
  { value: 'welcome_kit', label: 'Employee Welcome Kit' },
  { value: 'diwali', label: 'Diwali Gifting' },
  { value: 'holi', label: 'Holi Gifting' },
  { value: 'corporate_event', label: 'Corporate Event' },
  { value: 'client_gifting', label: 'Client Gifting' },
  { value: 'festival', label: 'Festival Season' },
  { value: 'year_end', label: 'Year-End Gifting' },
  { value: 'other', label: 'Other' },
]

type FieldKey = 'name' | 'company' | 'email' | 'phone' | 'customOccasionType' | 'customOccasionLocation'
type FieldErrors = Partial<Record<FieldKey, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FIELD_ORDER: FieldKey[] = ['name', 'company', 'email', 'phone', 'customOccasionType', 'customOccasionLocation']

const fieldErrorStyle: React.CSSProperties = { color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }
const optionalStyle: React.CSSProperties = { fontWeight: 400, color: 'var(--text-light)' }

function RequiredMark() {
  return <span aria-hidden="true"> *</span>
}

function OptionalMark() {
  return <span style={optionalStyle}> (optional)</span>
}

export default function LeadModal({ onClose }: LeadModalProps) {
  const router = useRouter()
  const { items, clearCart, updateQty } = useCartStore()
  const uid = useId()
  const fid = (k: string) => `${uid}-${k}`
  const errId = (k: FieldKey) => `${uid}-${k}-error`
  const titleId = fid('title')

  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(items.map((i) => [i.id, i.quantity])),
  )
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [occasion, setOccasion] = useState('')
  const [customOccasionType, setCustomOccasionType] = useState('')
  const [customOccasionLocation, setCustomOccasionLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [success, setSuccess] = useState<{ refCode: string | null; total: number | null; confirmationEmailSent: boolean } | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const estimatedTotal = items.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || item.quantity),
    0,
  )

  const clearFieldError = (k: FieldKey) =>
    setFieldErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev))

  const errorProps = (k: FieldKey) =>
    fieldErrors[k] ? { 'aria-invalid': true as const, 'aria-describedby': errId(k) } : {}

  const fieldError = (k: FieldKey) =>
    fieldErrors[k] ? <p id={errId(k)} style={fieldErrorStyle}>{fieldErrors[k]}</p> : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const next: FieldErrors = {}
    if (!name.trim()) next.name = 'Please enter your name.'
    if (!company.trim()) next.company = 'Please enter your company name.'
    if (!email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Please enter a valid email address.'
    if (!phone.trim()) next.phone = 'Please enter your phone number.'
    else if (!isValidPhone(phone)) next.phone = 'Please enter a valid phone number.'
    if (occasion === 'other') {
      if (!customOccasionType.trim()) next.customOccasionType = 'Please describe the occasion.'
      if (!customOccasionLocation.trim()) next.customOccasionLocation = 'Please add the location.'
    }
    setFieldErrors(next)

    const firstInvalid = FIELD_ORDER.find((k) => next[k])
    if (firstInvalid) {
      document.getElementById(fid(firstInvalid))?.focus()
      return
    }
    if (items.length === 0) {
      setError('Your pack is empty. Add some products first.')
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
            occasion === 'other' && customOccasionType.trim() ? `Custom occasion type: ${customOccasionType.trim()}` : '',
            occasion === 'other' && customOccasionLocation.trim() ? `Location: ${customOccasionLocation.trim()}` : '',
            notes.trim(),
          ].filter(Boolean).join('\n') || undefined,
          items: items.map((item) => ({
            productId: item.id,
            productName: item.name,
            quantity: quantities[item.id] || item.quantity,
            unitPrice: item.price,
          })),
          attribution: getAttribution(),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      const ref: unknown = data.referenceCode
      setSuccess({
        refCode: typeof ref === 'string' && ref && ref !== 'MB-XXXXX' ? ref : null,
        total: typeof data.estimatedTotal === 'number' ? data.estimatedTotal : null,
        confirmationEmailSent: data.confirmationEmailSent !== false,
      })
      clearCart()
      router.push('/thank-you')
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="lead-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={(e) => e.stopPropagation()}
        >
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">×</button>
          <div className="lead-modal-success" role="status">
            <div className="success-icon" aria-hidden="true">✓</div>
            <h2 id={titleId}>Request Received!</h2>
            <p>
              Thank you for your interest. We&apos;ll reply within {REPLY_TIME} and send final pricing
              and customisation options within {QUOTE_TIME}.
            </p>
            {success.refCode && (
              <div className="success-ref">
                <p>Your Reference Code</p>
                <strong>{success.refCode}</strong>
              </div>
            )}
            {success.total !== null && (
              <p className="success-total">
                Estimated Pack Value: <strong>₹{success.total.toLocaleString('en-IN')}</strong>
              </p>
            )}
            {success.confirmationEmailSent ? (
              <p className="success-email">
                A confirmation has been sent to <strong>{email}</strong>
              </p>
            ) : (
              <p className="success-email">
                We received your request, but couldn&apos;t deliver the confirmation email right now.
                Please contact us at <strong>hello@themintbox.in</strong> if needed.
              </p>
            )}
            <button type="button" className="btn-request-pricing" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="lead-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">×</button>

        <div className="lead-modal-header">
          <h2 id={titleId}>Request Final Pricing</h2>
          <p>
            Tell us about your gifting requirements. We reply within {REPLY_TIME} and send your
            priced quote within {QUOTE_TIME}.
          </p>
        </div>

        <div className="lead-modal-body">
          <div className="lead-pack-summary">
            <p className="lead-pack-label">Your Pack ({items.length} item{items.length !== 1 ? 's' : ''})</p>
            <div className="lead-pack-chips">
              {items.map((item) => {
                const qty = quantities[item.id] || item.quantity
                return (
                  <div key={item.id} className="lead-pack-chip">
                    <span className="chip-name">{item.name}</span>
                    <QuantityInput
                      size="sm"
                      value={qty}
                      productName={item.name}
                      onCommit={(next) => {
                        setQuantities((q) => ({ ...q, [item.id]: next }))
                        updateQty(item.id, next)
                      }}
                    />
                    <span className="chip-price">
                      ₹{(qty * item.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                )
              })}
            </div>
            <p className="lead-estimated-total" aria-live="polite">
              Estimated Total: <strong>₹{estimatedTotal.toLocaleString('en-IN')}</strong>
            </p>
          </div>

          <form className="lead-form" onSubmit={handleSubmit} noValidate aria-labelledby={titleId}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor={fid('name')}>Name<RequiredMark /></label>
                <input
                  id={fid('name')}
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="form-input"
                  value={name}
                  onChange={(e) => { setName(e.target.value); clearFieldError('name') }}
                  placeholder="Your full name"
                  required
                  {...errorProps('name')}
                />
                {fieldError('name')}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor={fid('company')}>Company<RequiredMark /></label>
                <input
                  id={fid('company')}
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className="form-input"
                  value={company}
                  onChange={(e) => { setCompany(e.target.value); clearFieldError('company') }}
                  placeholder="Company name"
                  required
                  {...errorProps('company')}
                />
                {fieldError('company')}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor={fid('email')}>Email<RequiredMark /></label>
                <input
                  id={fid('email')}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  className="form-input"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearFieldError('email') }}
                  placeholder="work@company.com"
                  required
                  {...errorProps('email')}
                />
                {fieldError('email')}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor={fid('phone')}>Phone<RequiredMark /></label>
                <input
                  id={fid('phone')}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className="form-input"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); clearFieldError('phone') }}
                  placeholder="+91 98765 43210"
                  required
                  {...errorProps('phone')}
                />
                {fieldError('phone')}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor={fid('occasion')}>Occasion<OptionalMark /></label>
              <select
                id={fid('occasion')}
                name="occasion"
                className="form-select"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
              >
                <option value="">Select an occasion</option>
                {OCCASIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {occasion === 'other' && (
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor={fid('customOccasionType')}>Custom occasion type<RequiredMark /></label>
                  <input
                    id={fid('customOccasionType')}
                    name="customOccasionType"
                    type="text"
                    autoComplete="off"
                    className="form-input"
                    value={customOccasionType}
                    onChange={(e) => { setCustomOccasionType(e.target.value); clearFieldError('customOccasionType') }}
                    placeholder="e.g. Dealer meet gifting, product launch"
                    required
                    {...errorProps('customOccasionType')}
                  />
                  {fieldError('customOccasionType')}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor={fid('customOccasionLocation')}>Location<RequiredMark /></label>
                  <input
                    id={fid('customOccasionLocation')}
                    name="customOccasionLocation"
                    type="text"
                    autoComplete="address-level2"
                    className="form-input"
                    value={customOccasionLocation}
                    onChange={(e) => { setCustomOccasionLocation(e.target.value); clearFieldError('customOccasionLocation') }}
                    placeholder="e.g. Bengaluru, Mumbai"
                    required
                    {...errorProps('customOccasionLocation')}
                  />
                  {fieldError('customOccasionLocation')}
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor={fid('notes')}>Additional Notes<OptionalMark /></label>
              <textarea
                id={fid('notes')}
                name="notes"
                className="form-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific requirements, branding preferences, delivery timeline..."
                rows={3}
              />
            </div>

            <div role="alert">
              {error && <p className="form-error">{error}</p>}
            </div>

            <button type="submit" className="btn-request-pricing" disabled={submitting} aria-busy={submitting}>
              {submitting ? 'Sending Request...' : 'Submit Pricing Request →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
