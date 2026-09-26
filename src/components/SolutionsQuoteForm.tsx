'use client'

import { useId, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAttribution } from '@/lib/attribution'
import { isValidPhone } from '@/lib/phone'
import { QUOTE_TIME, REPLY_TIME } from '@/lib/businessFacts'

interface SelectConfig {
  placeholder: string
  options: string[]
}

interface SolutionsQuoteFormProps {
  persona: string
  select1: SelectConfig
  select2: SelectConfig
  companyPlaceholder?: string
  submitStyle?: React.CSSProperties
  waText: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldKey = 'name' | 'company' | 'email' | 'phone'
type FieldErrors = Partial<Record<FieldKey, string>>

// The design uses placeholders as the visible label, so the real <label> is
// visually hidden but still read by assistive tech.
const srOnly: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
}
const fieldErrorStyle: React.CSSProperties = { color: '#C45050', fontSize: 13, margin: 0 }

export function SolutionsQuoteForm({
  persona,
  select1,
  select2,
  companyPlaceholder = 'Company name',
  submitStyle,
  waText,
}: SolutionsQuoteFormProps) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [sel1, setSel1] = useState('')
  const [sel2, setSel2] = useState('')
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [success, setSuccess] = useState(false)
  const uid = useId()
  const fid = (k: string) => `${uid}-${k}`
  const errId = (k: FieldKey) => `${uid}-${k}-error`

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
    if (!EMAIL_RE.test(email.trim())) next.email = 'Please enter a valid work email.'
    if (!isValidPhone(phone)) next.phone = 'Please enter a valid phone number.'
    setFieldErrors(next)
    const firstInvalid = (['name', 'company', 'email', 'phone'] as FieldKey[]).find((k) => next[k])
    if (firstInvalid) {
      document.getElementById(fid(firstInvalid))?.focus()
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
          occasion: sel1 || undefined,
          notes: [
            `Persona: ${persona}`,
            sel1 ? `${select1.placeholder}: ${sel1}` : '',
            sel2 ? `${select2.placeholder}: ${sel2}` : '',
          ]
            .filter(Boolean)
            .join('\n'),
          items: [],
          attribution: getAttribution(),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }
      setSuccess(true)
      router.push('/thank-you')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="sl-qb-form">
        <div role="status" style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <div aria-hidden="true" style={{ fontSize: 32, marginBottom: 8, color: '#1B4D3E' }}>&#10003;</div>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, marginBottom: 6 }}>Request received</div>
          <p style={{ fontSize: 14, opacity: 0.7, margin: 0 }}>
            We&apos;ll reply within {REPLY_TIME} and send your priced quote within {QUOTE_TIME}.
          </p>
        </div>
        <div className="sl-qbf-wa">
          {waText} <a href="https://wa.me/919886537631" target="_blank" rel="noopener noreferrer nofollow">+91 9886537631 →</a>
        </div>
      </div>
    )
  }

  return (
    <form className="sl-qb-form" onSubmit={handleSubmit} noValidate aria-label="Request a quote">
      <label htmlFor={fid('name')} style={srOnly}>Your name (required)</label>
      <input
        id={fid('name')}
        name="name"
        className="sl-qbf"
        type="text"
        autoComplete="name"
        placeholder="Your name *"
        value={name}
        onChange={(e) => { setName(e.target.value); clearFieldError('name') }}
        required
        {...errorProps('name')}
      />
      {fieldError('name')}
      <label htmlFor={fid('company')} style={srOnly}>Company (required)</label>
      <input
        id={fid('company')}
        name="company"
        className="sl-qbf"
        type="text"
        autoComplete="organization"
        placeholder={`${companyPlaceholder} *`}
        value={company}
        onChange={(e) => { setCompany(e.target.value); clearFieldError('company') }}
        required
        {...errorProps('company')}
      />
      {fieldError('company')}
      <label htmlFor={fid('email')} style={srOnly}>Work email (required)</label>
      <input
        id={fid('email')}
        name="email"
        className="sl-qbf"
        type="email"
        inputMode="email"
        autoComplete="email"
        spellCheck={false}
        placeholder="Work email *"
        value={email}
        onChange={(e) => { setEmail(e.target.value); clearFieldError('email') }}
        required
        {...errorProps('email')}
      />
      {fieldError('email')}
      <label htmlFor={fid('phone')} style={srOnly}>Phone number (required)</label>
      <input
        id={fid('phone')}
        name="phone"
        className="sl-qbf"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="Phone number *"
        value={phone}
        onChange={(e) => { setPhone(e.target.value); clearFieldError('phone') }}
        required
        {...errorProps('phone')}
      />
      {fieldError('phone')}
      <div className="sl-qbf-row">
        <label htmlFor={fid('sel1')} style={srOnly}>{select1.placeholder} (optional)</label>
        <select
          id={fid('sel1')}
          name="select1"
          className="sl-qbf"
          style={{ appearance: 'none', cursor: 'pointer' }}
          value={sel1}
          onChange={(e) => setSel1(e.target.value)}
        >
          <option value="" disabled>
            {select1.placeholder} (optional)
          </option>
          {select1.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <label htmlFor={fid('sel2')} style={srOnly}>{select2.placeholder} (optional)</label>
        <select
          id={fid('sel2')}
          name="select2"
          className="sl-qbf"
          style={{ appearance: 'none', cursor: 'pointer' }}
          value={sel2}
          onChange={(e) => setSel2(e.target.value)}
        >
          <option value="" disabled>
            {select2.placeholder} (optional)
          </option>
          {select2.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div role="alert">
        {error && <div style={{ color: '#C45050', fontSize: 13 }}>{error}</div>}
      </div>
      <button className="sl-qbf-submit" style={submitStyle} type="submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Request a quote →'}
      </button>
      <div className="sl-qbf-wa">
        {waText} <a href="https://wa.me/919886537631" target="_blank" rel="noopener noreferrer nofollow">+91 9886537631 →</a>
      </div>
    </form>
  )
}
