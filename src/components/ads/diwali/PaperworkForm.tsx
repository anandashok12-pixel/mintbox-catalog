'use client'

import { useId, useState } from 'react'
import { CheckCircle } from '@phosphor-icons/react'
import { getAttribution } from '@/lib/attribution'
import { isValidPhone } from '@/lib/phone'
import { track } from './quoteStore'

const PACKS = [
  { key: 'approval', label: 'Approval pack', hint: 'A one-page summary and sample quote to forward to your CHRO or CFO' },
  { key: 'vendor', label: 'Vendor registration pack', hint: 'GST, PAN and bank details for procurement' },
] as const

type PackKey = (typeof PACKS)[number]['key']

/**
 * Captures a request for the approval or vendor pack. There is no instant
 * download: the team emails the documents and follows up the same day, so
 * the copy never promises a file that does not exist yet.
 */
export default function PaperworkForm() {
  const uid = useId()
  const [packs, setPacks] = useState<PackKey[]>(['approval'])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')

  const toggle = (k: PackKey) => setPacks(p => (p.includes(k) ? p.filter(x => x !== k) : [...p, k]))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!packs.length) return setError('Pick at least one pack.')
    if (!name.trim()) return setError('Please add your name.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError('Please enter a valid work email.')
    if (!isValidPhone(phone)) return setError('Please enter a 10-digit mobile number.')
    setError('')
    setState('sending')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          occasion: 'diwali',
          notes: `Requested: ${packs.map(k => PACKS.find(p => p.key === k)!.label).join(', ')}\nLanding page: Diwali ads, paperwork section`,
          items: [],
          attribution: getAttribution(),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      track('paperwork_request', { packs: packs.join(',') })
      setState('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setState('idle')
    }
  }

  if (state === 'done') {
    return (
      <div className="dl-paper-form dl-paper-done" role="status">
        <CheckCircle size={32} weight="fill" aria-hidden="true" />
        <p className="dl-paper-done-title">On its way to {email.trim()}</p>
        <p>We email the documents today and call to check you have everything you need.</p>
      </div>
    )
  }

  return (
    <form className="dl-paper-form" onSubmit={submit} noValidate>
      <fieldset className="dl-fieldset">
        <legend className="dl-label">What do you need?</legend>
        <div className="dl-packs">
          {PACKS.map(p => (
            <label key={p.key} className="dl-pack">
              <input type="checkbox" checked={packs.includes(p.key)} onChange={() => toggle(p.key)} />
              <span>
                <strong>{p.label}</strong>
                <small>{p.hint}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="dl-paper-row">
        <div className="dl-field">
          <label className="dl-label" htmlFor={`${uid}-n`}>Full name</label>
          <input id={`${uid}-n`} className="dl-input" autoComplete="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="dl-field">
          <label className="dl-label" htmlFor={`${uid}-e`}>Work email</label>
          <input id={`${uid}-e`} className="dl-input" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      </div>
      <div className="dl-field">
        <label className="dl-label" htmlFor={`${uid}-p`}>Mobile</label>
        <div className="dl-phone">
          <span aria-hidden="true">+91</span>
          <input id={`${uid}-p`} className="dl-input" type="tel" autoComplete="tel-national" inputMode="tel" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
      </div>
      {error && <p className="dl-form-error" role="alert">{error}</p>}
      <button type="submit" className="dl-btn dl-btn--primary dl-btn--block" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Email me the pack'}
      </button>
    </form>
  )
}
