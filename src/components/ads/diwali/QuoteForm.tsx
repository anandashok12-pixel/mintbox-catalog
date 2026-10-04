'use client'

import { useId, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react'
import { getAttribution } from '@/lib/attribution'
import { isValidPhone } from '@/lib/phone'
import { MOQ, TIERS } from '@/components/pages/diwaliHubData'
import { PRIMARY_CTA } from './offer'
import { BUDGET_MID, QTY_BANDS, budgetLabel, track, useQuote, whatsappHref } from './quoteStore'

const THANKS_PATH = '/diwali-corporate-gifts-bangalore/thanks'

function tomorrowISO(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

type Errors = Partial<Record<'qty' | 'budget' | 'date' | 'name' | 'email' | 'phone' | 'form', string>>

/**
 * Two-step quote request. Step 1 is three choices with no typing, so more
 * visitors start; step 2 asks for contact details. Posts to /api/leads like
 * every other form on the site. (The catalogue has its own pop-up in the nav.)
 */
export default function QuoteForm({ adGroup }: { adGroup: string }) {
  const router = useRouter()
  const uid = useId()
  const { qty, budget, date, hampers, setQty, setBudget, setDate, removeHamper } = useQuote()
  const [step, setStep] = useState<1 | 2>(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [trap, setTrap] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)

  const goStep2 = () => {
    const e: Errors = {}
    if (!qty) e.qty = 'Pick a rough number of gifts.'
    if (!budget) e.budget = 'Pick a budget per gift.'
    if (!date) e.date = 'Choose the date you need them by.'
    setErrors(e)
    if (Object.keys(e).length) return
    track('quote_step_1', { quantity_band: qty, budget_band: budget })
    setStep(2)
    requestAnimationFrame(() => nameRef.current?.focus())
  }

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (step === 1) return goStep2()

    const e: Errors = {}
    if (!name.trim()) e.name = 'Please add your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Please enter a valid email.'
    if (!isValidPhone(phone)) e.phone = 'Please enter a 10-digit mobile number.'
    setErrors(e)
    if (Object.keys(e).length) return

    const band = QTY_BANDS.find(b => b.key === qty)!
    // Bots fill every field, people never see this one. Pretend it worked.
    if (trap) {
      router.push(THANKS_PATH)
      return
    }

    setSending(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim() || undefined,
          occasion: 'diwali',
          notes: [
            'Requested: written quote',
            `Number of gifts: ${band.label}`,
            `Budget per gift: ${budgetLabel(budget!)}`,
            `Needed by: ${date}`,
            hampers.length ? `Hampers of interest: ${hampers.map(h => `${h.name} (#${h.id})`).join('; ')}` : '',
            `Landing page: Diwali ads (${adGroup})`,
          ].filter(Boolean).join('\n'),
          items: hampers.map(h => ({ productId: Number(h.id), productName: h.name, quantity: band.low, unitPrice: h.price })),
          attribution: getAttribution(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')

      track('generate_lead', {
        lead_type: 'quote',
        currency: 'INR',
        value: band.mid * BUDGET_MID[budget!],
        quantity_band: band.key,
        budget_band: budget,
        ad_group: adGroup,
      })
      const ref = data.refCode || data.referenceCode || ''
      router.push(ref ? `${THANKS_PATH}?ref=${encodeURIComponent(ref)}` : THANKS_PATH)
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Something went wrong. Please try again.' })
      setSending(false)
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="dl-field-error">
        {errors[k]}
      </p>
    ) : null

  return (
    <form className="dl-form" onSubmit={submit} noValidate aria-label="Request a Diwali gifting quote">
      <div className="dl-form-head">
        <h2 className="dl-form-title">{step === 1 ? 'Get your quote' : 'Where should we send it?'}</h2>
        <span className="dl-form-progress" aria-live="polite">
          {step} of 2
        </span>
      </div>
      {step === 1 && (
        <p className="dl-form-promise">A written quote for your numbers within 24 hours, branding and delivery included.</p>
      )}

      {hampers.length > 0 && (
        <ul className="dl-picked" aria-label="Hampers in your quote">
          {hampers.map(h => (
            <li key={h.id}>
              <span>{h.name}</span>
              <button type="button" onClick={() => removeHamper(h.id)} aria-label={`Remove ${h.name}`}>
                <X size={12} weight="bold" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {step === 1 ? (
        <div className="dl-step" key="s1">
          <fieldset className="dl-fieldset" aria-describedby={errors.qty ? `${uid}-qty-err` : undefined}>
            <legend className="dl-label">Number of gifts</legend>
            <div className="dl-chips">
              {QTY_BANDS.map(b => (
                <label key={b.key} className="dl-chip">
                  <input type="radio" name="qty" value={b.key} checked={qty === b.key} onChange={() => setQty(b.key)} />
                  <span>{b.label}</span>
                </label>
              ))}
            </div>
            {err('qty')}
          </fieldset>

          <fieldset className="dl-fieldset" aria-describedby={errors.budget ? `${uid}-budget-err` : undefined}>
            <legend className="dl-label">Budget per gift, ex GST</legend>
            <div className="dl-chips">
              {TIERS.map(t => (
                <label key={t.key} className="dl-chip">
                  <input
                    type="radio"
                    name="budget"
                    value={t.key}
                    checked={budget === t.key}
                    onChange={() => setBudget(t.key)}
                  />
                  <span>{t.label.replace(/–/g, '-')}</span>
                </label>
              ))}
            </div>
            {err('budget')}
          </fieldset>

          <div className="dl-field">
            <label className="dl-label" htmlFor={`${uid}-date`}>
              Needed by
            </label>
            <input
              id={`${uid}-date`}
              className="dl-input"
              type="date"
              min={tomorrowISO()}
              // "Tomorrow" is computed in UTC on the server and IST in the
              // browser; they differ between midnight and 5:30 IST.
              suppressHydrationWarning
              value={date}
              onChange={e => setDate(e.target.value)}
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? `${uid}-date-err` : undefined}
            />
            {err('date')}
          </div>

          <button type="submit" className="dl-btn dl-btn--primary dl-btn--block">
            {PRIMARY_CTA} <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </button>
          <p className="dl-form-foot">
            Fewer than {MOQ} gifts?{' '}
            <a href={whatsappHref({ qty, budget, hampers })} target="_blank" rel="noopener noreferrer">
              Message us on WhatsApp
            </a>
          </p>
        </div>
      ) : (
        <div className="dl-step" key="s2">
          <button type="button" className="dl-back" onClick={() => setStep(1)}>
            <ArrowLeft size={14} weight="bold" aria-hidden="true" />
            {QTY_BANDS.find(b => b.key === qty)!.label} gifts, {budgetLabel(budget!)} each
          </button>

          <div className="dl-field">
            <label className="dl-label" htmlFor={`${uid}-name`}>Full name</label>
            <input ref={nameRef} id={`${uid}-name`} className="dl-input" autoComplete="name" value={name}
              onChange={e => setName(e.target.value)} aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${uid}-name-err` : undefined} />
            {err('name')}
          </div>
          <div className="dl-field">
            <label className="dl-label" htmlFor={`${uid}-email`}>Work email</label>
            <input id={`${uid}-email`} className="dl-input" type="email" autoComplete="email" inputMode="email"
              value={email} onChange={e => setEmail(e.target.value)} aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${uid}-email-err` : undefined} />
            {err('email')}
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
            <label className="dl-label" htmlFor={`${uid}-company`}>
              Company <span className="dl-optional">optional</span>
            </label>
            <input id={`${uid}-company`} className="dl-input" autoComplete="organization" value={company}
              onChange={e => setCompany(e.target.value)} />
          </div>
          <div className="dl-trap" aria-hidden="true">
            <label>
              Website
              <input tabIndex={-1} autoComplete="off" value={trap} onChange={e => setTrap(e.target.value)} />
            </label>
          </div>

          {errors.form && <p className="dl-form-error" role="alert">{errors.form}</p>}

          <button type="submit" className="dl-btn dl-btn--primary dl-btn--block" disabled={sending}>
            {sending ? 'Sending…' : 'Send my request'}
          </button>
          <p className="dl-form-foot">We reply within 1 hour on business days. No payment until you approve the quote.</p>
        </div>
      )}
    </form>
  )
}
