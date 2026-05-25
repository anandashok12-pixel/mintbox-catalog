'use client'

import { useState } from 'react'

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
  const [sel1, setSel1] = useState('')
  const [sel2, setSel2] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !company.trim()) {
      setError('Please add your name and company.')
      return
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid work email.')
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
          occasion: sel1 || undefined,
          notes: [
            `Persona: ${persona}`,
            sel1 ? `${select1.placeholder}: ${sel1}` : '',
            sel2 ? `${select2.placeholder}: ${sel2}` : '',
          ]
            .filter(Boolean)
            .join('\n'),
          items: [],
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }
      setSuccess(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="sl-qb-form">
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <div style={{ fontSize: 32, marginBottom: 8, color: '#1B4D3E' }}>&#10003;</div>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, marginBottom: 6 }}>Request received</div>
          <p style={{ fontSize: 14, opacity: 0.7, margin: 0 }}>
            We&apos;ll get back to you within 4 hours on business days.
          </p>
        </div>
        <div className="sl-qbf-wa">
          {waText} <a href="https://wa.me/919886537631">+91 9886537631 →</a>
        </div>
      </div>
    )
  }

  return (
    <form className="sl-qb-form" onSubmit={handleSubmit} noValidate>
      <input
        className="sl-qbf"
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="sl-qbf"
        type="text"
        placeholder={companyPlaceholder}
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        className="sl-qbf"
        type="email"
        placeholder="Work email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="sl-qbf-row">
        <select
          className="sl-qbf"
          style={{ appearance: 'none', cursor: 'pointer' }}
          value={sel1}
          onChange={(e) => setSel1(e.target.value)}
        >
          <option value="" disabled>
            {select1.placeholder}
          </option>
          {select1.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <select
          className="sl-qbf"
          style={{ appearance: 'none', cursor: 'pointer' }}
          value={sel2}
          onChange={(e) => setSel2(e.target.value)}
        >
          <option value="" disabled>
            {select2.placeholder}
          </option>
          {select2.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      {error && <div style={{ color: '#C45050', fontSize: 13 }}>{error}</div>}
      <button className="sl-qbf-submit" style={submitStyle} type="submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Request a quote →'}
      </button>
      <div className="sl-qbf-wa">
        {waText} <a href="https://wa.me/919886537631">+91 9886537631 →</a>
      </div>
    </form>
  )
}
