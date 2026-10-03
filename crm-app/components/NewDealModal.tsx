'use client'

import { FormEvent, useState } from 'react'
import { CONTACT_CHANNELS, LEAD_SOURCES, OCCASIONS } from '@/lib/constants'
import { isValidPhone, normalizePhone } from '@/lib/phone'
import { createContact, createDeal, findContactByPhone } from '@/lib/payload'
import type { Deal } from '@/lib/types'
import { CloseIcon } from './Icons'

interface NewDealModalProps {
  token: string
  onClose: () => void
  onCreated: (deal: Deal) => void
}

export function NewDealModal({ token, onClose, onCreated }: NewDealModalProps) {
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [occasion, setOccasion] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unitValue, setUnitValue] = useState('')
  const [leadSource, setLeadSource] = useState('')
  const [contactChannel, setContactChannel] = useState('')
  const [attribution, setAttribution] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setError('')

    if (!isValidPhone(phone)) {
      setError('Enter a valid phone number for this contact')
      return
    }
    const phoneE164 = normalizePhone(phone)
    if (!phoneE164) {
      setError('Enter a valid phone number for this contact')
      return
    }

    setPending(true)
    try {
      let contact = await findContactByPhone(token, phoneE164)
      if (!contact) {
        contact = await createContact(token, {
          name: name.trim(),
          phoneE164,
          company: company.trim() || undefined,
          email: email.trim() || undefined,
        })
      }

      const deal = await createDeal(token, {
        title: title.trim() || `${company.trim() || name.trim()} - ${OCCASIONS.find((item) => item.value === occasion)?.label || 'New enquiry'}`,
        contact: contact.id,
        stage: 'new',
        occasion: occasion || undefined,
        quantity: quantity ? Number(quantity) : undefined,
        unitBudgetMin: unitValue ? Number(unitValue) : undefined,
        unitBudgetMax: unitValue ? Number(unitValue) : undefined,
        estimatedValue: quantity && unitValue ? Number(quantity) * Number(unitValue) : undefined,
        leadSource: (leadSource || undefined) as Deal['leadSource'],
        contactChannel: (contactChannel || undefined) as Deal['contactChannel'],
        attribution: attribution.trim() || undefined,
        summary: notes.trim() || undefined,
      })

      onCreated(deal)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not create the deal')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="drawer-layer" role="dialog" aria-modal="true" aria-label="Add a new deal">
      <button className="drawer-backdrop" onClick={onClose} aria-label="Close" />
      <aside className="deal-drawer new-deal-drawer">
        <header className="drawer-header">
          <div>
            <span className="eyebrow">New deal</span>
            <h2>Add a deal</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </header>

        <form onSubmit={submit} className="new-deal-form">
          <section className="form-section">
            <span className="eyebrow">Contact</span>
            <div className="form-row">
              <label>
                <span>Name</span>
                <input autoFocus value={name} onChange={(event) => setName(event.target.value)} required placeholder="Contact name" />
              </label>
              <label>
                <span>Phone</span>
                <input value={phone} onChange={(event) => setPhone(event.target.value)} required placeholder="+91…" />
              </label>
            </div>
            <div className="form-row">
              <label>
                <span>Company</span>
                <input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Optional" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Optional" />
              </label>
            </div>
            <p className="field-hint">If a contact with this phone number already exists, the deal is added to it instead of creating a duplicate.</p>
          </section>

          <section className="form-section">
            <span className="eyebrow">Deal</span>
            <label>
              <span>Title</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder='e.g. "Infosys - Diwali hampers, 500 units" (auto-filled if left blank)' />
            </label>
            <div className="form-row">
              <label>
                <span>Occasion</span>
                <select value={occasion} onChange={(event) => setOccasion(event.target.value)}>
                  <option value="">Not set</option>
                  {OCCASIONS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </label>
              <label>
                <span>Quantity</span>
                <input type="number" min={1} value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="Optional" />
              </label>
            </div>
            <label>
              <span>Value per hamper (₹)</span>
              <input type="number" min={0} value={unitValue} onChange={(event) => setUnitValue(event.target.value)} placeholder="Optional" />
            </label>
            {quantity && unitValue && (
              <p className="field-hint">Total estimated: {Number(quantity).toLocaleString('en-IN')} × ₹{Number(unitValue).toLocaleString('en-IN')} = ₹{(Number(quantity) * Number(unitValue)).toLocaleString('en-IN')}</p>
            )}
          </section>

          <section className="form-section">
            <span className="eyebrow">Source &amp; attribution</span>
            <p className="field-hint">All optional - fills in what the website form would have captured automatically.</p>
            <div className="form-row">
              <label>
                <span>Lead source</span>
                <select value={leadSource} onChange={(event) => setLeadSource(event.target.value)}>
                  <option value="">Not set</option>
                  {LEAD_SOURCES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </label>
              <label>
                <span>Contacted us via</span>
                <select value={contactChannel} onChange={(event) => setContactChannel(event.target.value)}>
                  <option value="">Not set</option>
                  {CONTACT_CHANNELS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </label>
            </div>
            <label>
              <span>Attribution detail</span>
              <input value={attribution} onChange={(event) => setAttribution(event.target.value)} placeholder='e.g. "Referred by Rajesh, Infosys" or "LinkedIn post"' />
            </label>
          </section>

          <label>
            <span>Notes</span>
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} placeholder="Optional" />
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="form-actions">
            <button type="button" className="action-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-button" disabled={pending}>
              <span>{pending ? 'Creating…' : 'Create deal'}</span>
            </button>
          </div>
        </form>
      </aside>
    </div>
  )
}
