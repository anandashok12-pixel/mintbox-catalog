'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/cartStore'

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

export default function LeadModal({ onClose }: LeadModalProps) {
  const { items, clearCart } = useCartStore()

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
  const [success, setSuccess] = useState<{ refCode: string; total: number; confirmationEmailSent: boolean } | null>(null)

  const estimatedTotal = items.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || item.quantity),
    0,
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !company.trim() || !email.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    if (occasion === 'other' && (!customOccasionType.trim() || !customOccasionLocation.trim())) {
      setError('Please add the custom occasion type and location.')
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
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      setSuccess({
        refCode: data.referenceCode,
        total: data.estimatedTotal,
        confirmationEmailSent: data.confirmationEmailSent !== false,
      })
      clearCart()
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="lead-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>×</button>
          <div className="lead-modal-success">
            <div className="success-icon">✓</div>
            <h2>Request Received!</h2>
            <p>
              Thank you for your interest. Our team will get back to you within 24 hours
              with final pricing and customisation options.
            </p>
            <div className="success-ref">
              <p>Your Reference Code</p>
              <strong>{success.refCode}</strong>
            </div>
            <p className="success-total">
              Estimated Pack Value: <strong>₹{success.total.toLocaleString('en-IN')}</strong>
            </p>
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
            <button className="btn-request-pricing" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="lead-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="lead-modal-header">
          <h2>Request Final Pricing</h2>
          <p>Tell us about your gifting requirements and we&apos;ll get back within 24 hours.</p>
        </div>

        <div className="lead-modal-body">
          <div className="lead-pack-summary">
            <p className="lead-pack-label">Your Pack ({items.length} item{items.length !== 1 ? 's' : ''})</p>
            <div className="lead-pack-chips">
              {items.map((item) => (
                <div key={item.id} className="lead-pack-chip">
                  <span className="chip-name">{item.name}</span>
                  <div className="chip-qty-control">
                    <button
                      type="button"
                      className="qty-btn-sm"
                      onClick={() =>
                        setQuantities((q) => ({ ...q, [item.id]: Math.max(1, (q[item.id] || 1) - 1) }))
                      }
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="chip-qty-input"
                      value={quantities[item.id] || item.quantity}
                      min={1}
                      onChange={(e) =>
                        setQuantities((q) => ({
                          ...q,
                          [item.id]: Math.max(1, parseInt(e.target.value) || 1),
                        }))
                      }
                    />
                    <button
                      type="button"
                      className="qty-btn-sm"
                      onClick={() =>
                        setQuantities((q) => ({ ...q, [item.id]: (q[item.id] || 1) + 1 }))
                      }
                    >
                      +
                    </button>
                  </div>
                  <span className="chip-price">
                    ₹{((quantities[item.id] || item.quantity) * item.price).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
            <p className="lead-estimated-total">
              Estimated Total: <strong>₹{estimatedTotal.toLocaleString('en-IN')}</strong>
            </p>
          </div>

          <form className="lead-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Company *</label>
                <input
                  type="text"
                  className="form-input"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company name"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="work@company.com"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Occasion</label>
              <select
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
                  <label className="form-label">Custom occasion type *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={customOccasionType}
                    onChange={(e) => setCustomOccasionType(e.target.value)}
                    placeholder="e.g. Dealer meet gifting, product launch"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={customOccasionLocation}
                    onChange={(e) => setCustomOccasionLocation(e.target.value)}
                    placeholder="e.g. Bengaluru, Mumbai"
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Additional Notes</label>
              <textarea
                className="form-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific requirements, branding preferences, delivery timeline..."
                rows={3}
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="btn-request-pricing" disabled={submitting}>
              {submitting ? 'Sending Request...' : 'Submit Pricing Request →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
