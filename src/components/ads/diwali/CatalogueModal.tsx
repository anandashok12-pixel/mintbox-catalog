'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { CheckCircle, DownloadSimple, X } from '@phosphor-icons/react'
import { getAttribution } from '@/lib/attribution'
import { isValidPhone } from '@/lib/phone'
import { CATALOGUE_CTA, CATALOGUE_PDF_URL } from './offer'
import { track } from './quoteStore'

type Errors = Partial<Record<'name' | 'phone' | 'company' | 'form', string>>

/**
 * Nav button plus a short pop-up form for the Diwali catalogue: name, mobile
 * and company only, so it is quick to fill on a phone. The lead goes to
 * /api/leads without an email (the API stores a non-deliverable placeholder).
 * Once CATALOGUE_PDF_URL is set, submitting downloads the PDF immediately.
 */
export default function CatalogueButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        <DownloadSimple size={16} weight="bold" aria-hidden="true" />
        <span className="dl-cat-full">{CATALOGUE_CTA}</span>
        <span className="dl-cat-short">Catalogue</span>
      </button>
      {open && <CatalogueModal onClose={() => setOpen(false)} />}
    </>
  )
}

function CatalogueModal({ onClose }: { onClose: () => void }) {
  const uid = useId()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [trap, setTrap] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nameRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const e: Errors = {}
    if (!name.trim()) e.name = 'Please add your name.'
    if (!isValidPhone(phone)) e.phone = 'Please enter a 10-digit mobile number.'
    if (!company.trim()) e.company = 'Please add your company name.'
    setErrors(e)
    if (Object.keys(e).length) return
    // Bots fill every field; people never see this one.
    if (trap) {
      setState('done')
      return
    }

    setState('sending')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          company: company.trim(),
          occasion: 'diwali',
          notes: 'Requested: Diwali catalogue (download pop-up). No email given: send on WhatsApp.',
          items: [],
          attribution: getAttribution(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      track('catalogue_request', { lead_type: 'catalogue' })
      setState('done')
      if (CATALOGUE_PDF_URL) {
        const a = document.createElement('a')
        a.href = CATALOGUE_PDF_URL
        a.download = ''
        document.body.appendChild(a)
        a.click()
        a.remove()
      }
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Something went wrong. Please try again.' })
      setState('idle')
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="dl-field-error">
        {errors[k]}
      </p>
    ) : null

  return (
    <div className="dl-modal-overlay" onClick={onClose}>
      <div
        className="dl-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-title`}
        onClick={e => e.stopPropagation()}
      >
        <button type="button" className="dl-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} weight="bold" />
        </button>

        {state === 'done' ? (
          <div className="dl-modal-done" role="status">
            <CheckCircle size={40} weight="fill" aria-hidden="true" />
            {CATALOGUE_PDF_URL ? (
              <>
                <h2 id={`${uid}-title`} className="dl-modal-title">
                  Your catalogue <em>is downloading.</em>
                </h2>
                <p>
                  If it did not start,{' '}
                  <a href={CATALOGUE_PDF_URL} download>
                    download it here
                  </a>
                  . We will also share it on WhatsApp.
                </p>
              </>
            ) : (
              <>
                <h2 id={`${uid}-title`} className="dl-modal-title">
                  Thank you. <em>It is on its way.</em>
                </h2>
                <p>We send the Diwali catalogue with prices to {phone.trim()} on WhatsApp within 1 hour on business days.</p>
              </>
            )}
            <button type="button" className="dl-btn dl-btn--ghost" onClick={onClose}>
              Back to the page
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h2 id={`${uid}-title`} className="dl-modal-title">
              The Diwali 2026 <em>catalogue.</em>
            </h2>
            <p className="dl-modal-sub">Every hamper with prices, ready to share with your team.</p>

            <div className="dl-modal-fields">
              <div className="dl-field">
                <label className="dl-label" htmlFor={`${uid}-name`}>Full name</label>
                <input ref={nameRef} id={`${uid}-name`} className="dl-input" autoComplete="name" value={name}
                  onChange={e => setName(e.target.value)} aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${uid}-name-err` : undefined} />
                {err('name')}
              </div>
              <div className="dl-field">
                <label className="dl-label" htmlFor={`${uid}-phone`}>Mobile or WhatsApp</label>
                <div className="dl-phone">
                  <span aria-hidden="true">+91</span>
                  <input id={`${uid}-phone`} className="dl-input" type="tel" autoComplete="tel-national" inputMode="tel"
                    value={phone} onChange={e => setPhone(e.target.value)} aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? `${uid}-phone-err` : undefined} />
                </div>
                {err('phone')}
              </div>
              <div className="dl-field">
                <label className="dl-label" htmlFor={`${uid}-company`}>Company name</label>
                <input id={`${uid}-company`} className="dl-input" autoComplete="organization" value={company}
                  onChange={e => setCompany(e.target.value)} aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? `${uid}-company-err` : undefined} />
                {err('company')}
              </div>
              <div className="dl-trap" aria-hidden="true">
                <label>
                  Website
                  <input tabIndex={-1} autoComplete="off" value={trap} onChange={e => setTrap(e.target.value)} />
                </label>
              </div>
            </div>

            {errors.form && <p className="dl-form-error" role="alert">{errors.form}</p>}

            <button type="submit" className="dl-btn dl-btn--primary dl-btn--block" disabled={state === 'sending'}>
              <DownloadSimple size={18} weight="bold" aria-hidden="true" />
              {state === 'sending' ? 'Sending…' : CATALOGUE_CTA}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
