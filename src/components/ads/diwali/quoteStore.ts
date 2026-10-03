'use client'

import { create } from 'zustand'
import { TIERS, type TierKey } from '@/components/pages/diwaliHubData'

// Shared between the hero quote form, the hamper picker and every WhatsApp
// link on the ads landing page, so a hamper picked lower down lands in the
// form and the WhatsApp message carries whatever step 1 already knows.

export const QTY_BANDS = [
  { key: '10-50', label: '10 to 50', low: 10, mid: 30 },
  { key: '51-100', label: '51 to 100', low: 51, mid: 75 },
  { key: '101-250', label: '101 to 250', low: 101, mid: 175 },
  { key: '251-500', label: '251 to 500', low: 251, mid: 375 },
  { key: '500+', label: '500+', low: 500, mid: 600 },
] as const

export type QtyKey = (typeof QTY_BANDS)[number]['key']

// Midpoint of each budget band, used only for the conversion value sent to
// Google Ads so Smart Bidding can tell a 400-gift lead from a 15-gift one.
export const BUDGET_MID: Record<TierKey, number> = {
  under500: 400,
  team: 750,
  manager: 1500,
  leader: 2750,
  client: 4500,
}

export const budgetLabel = (k: TierKey) => TIERS.find(t => t.key === k)!.label.replace(/–/g, ' to ')

export interface PickedHamper {
  id: string
  name: string
  price: number
}

interface QuoteState {
  qty: QtyKey | null
  budget: TierKey | null
  date: string
  hamper: PickedHamper | null
  setQty: (q: QtyKey) => void
  setBudget: (b: TierKey) => void
  setDate: (d: string) => void
  setHamper: (h: PickedHamper | null, budget?: TierKey) => void
}

export const useQuote = create<QuoteState>(set => ({
  qty: null,
  budget: null,
  date: '',
  hamper: null,
  setQty: qty => set({ qty }),
  setBudget: budget => set({ budget }),
  setDate: date => set({ date }),
  setHamper: (hamper, budget) => set(budget ? { hamper, budget } : { hamper }),
}))

export const WHATSAPP_NUMBER = '919886537631'

export function whatsappHref(s: Pick<QuoteState, 'qty' | 'budget' | 'hamper'>): string {
  const parts = ['Hi MintBox, please send me your Diwali catalogue with prices.']
  if (s.qty) parts.push(`Quantity: ${QTY_BANDS.find(b => b.key === s.qty)!.label}.`)
  if (s.budget) parts.push(`Budget per gift: ${budgetLabel(s.budget)}.`)
  if (s.hamper) parts.push(`Interested in: ${s.hamper.name}.`)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join(' '))}`
}

type Gtag = (...args: unknown[]) => void

/** Fires a GA4 event when gtag is on the page; silently skips otherwise. */
export function track(event: string, params: Record<string, unknown> = {}) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (typeof gtag === 'function') gtag('event', event, params)
}
