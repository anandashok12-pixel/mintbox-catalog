'use client'

import { create } from 'zustand'
import { TIERS, type TierKey } from '@/components/pages/diwaliHubData'

// Shared between the hero quote form, the hamper picker and every WhatsApp
// link on the ads landing page, so hampers added lower down land in the
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
  hampers: PickedHamper[]
  setQty: (q: QtyKey) => void
  setBudget: (b: TierKey) => void
  setDate: (d: string) => void
  /** Adds the hamper, or removes it if it is already in the quote. */
  toggleHamper: (h: PickedHamper, budget?: TierKey) => void
  removeHamper: (id: string) => void
}

export const useQuote = create<QuoteState>(set => ({
  qty: null,
  budget: null,
  date: '',
  hampers: [],
  setQty: qty => set({ qty }),
  setBudget: budget => set({ budget }),
  setDate: date => set({ date }),
  toggleHamper: (h, budget) =>
    set(s => {
      if (s.hampers.some(x => x.id === h.id)) return { hampers: s.hampers.filter(x => x.id !== h.id) }
      // The first hamper added also answers the budget question, if it is still open.
      return { hampers: [...s.hampers, h], budget: s.budget ?? budget ?? null }
    }),
  removeHamper: id => set(s => ({ hampers: s.hampers.filter(x => x.id !== id) })),
}))

export const WHATSAPP_NUMBER = '919886537631'

export function whatsappHref(s: Pick<QuoteState, 'qty' | 'budget' | 'hampers'>): string {
  const parts = ['Hi MintBox, please send me your Diwali catalogue with prices.']
  if (s.qty) parts.push(`Quantity: ${QTY_BANDS.find(b => b.key === s.qty)!.label}.`)
  if (s.budget) parts.push(`Budget per gift: ${budgetLabel(s.budget)}.`)
  if (s.hampers.length) {
    const names = s.hampers.slice(0, 3).map(h => h.name).join('; ')
    const more = s.hampers.length > 3 ? ` and ${s.hampers.length - 3} more` : ''
    parts.push(`Interested in: ${names}${more}.`)
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join(' '))}`
}

type Gtag = (...args: unknown[]) => void

/** Fires a GA4 event when gtag is on the page; silently skips otherwise. */
export function track(event: string, params: Record<string, unknown> = {}) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (typeof gtag === 'function') gtag('event', event, params)
}
