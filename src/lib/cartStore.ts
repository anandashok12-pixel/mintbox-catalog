'use client'

import { useSyncExternalStore } from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware'
import { MIN_ORDER_UNITS } from '@/lib/businessFacts'

export interface CartItem {
  id: string
  name: string
  price: number
  emoji?: string
  imageUrl?: string
  categoryName: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  /** New items start at `quantity` (default MIN_ORDER_UNITS). Re-adding an
   *  item already in the pack adds `quantity` if given, otherwise +1. */
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  /** Sets an exact quantity, clamped to [MIN_ORDER_UNITS, MAX_ORDER_UNITS].
   *  Never removes: removal is always an explicit removeItem call. */
  updateQty: (id: string, qty: number) => void
  /** Sets every item in the pack to the same quantity (clamped). */
  setAllQty: (qty: number) => void
  clearCart: () => void
  total: () => number
  /** Total units across the pack. */
  count: () => number
}

// Sanity ceiling so a stray keypress can't produce a 12-digit estimate.
export const MAX_ORDER_UNITS = 100000

export function clampQty(qty: number): number {
  if (!Number.isFinite(qty)) return MIN_ORDER_UNITS
  return Math.min(MAX_ORDER_UNITS, Math.max(MIN_ORDER_UNITS, Math.floor(qty)))
}

const STORAGE_KEY = 'mintbox-cart'

// SSR-safe localStorage. The pack used to live in sessionStorage (lost when
// the tab closed); the first read after this change carries an existing
// session pack across so nobody loses a shortlist mid-visit.
const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
}

function getPackStorage(): StateStorage {
  if (typeof window === 'undefined') return noopStorage
  try {
    const local = window.localStorage
    return {
      getItem: (name) => {
        const value = local.getItem(name)
        if (value !== null) return value
        try {
          const legacy = window.sessionStorage.getItem(name)
          if (legacy !== null) {
            local.setItem(name, legacy)
            window.sessionStorage.removeItem(name)
          }
          return legacy
        } catch {
          return null
        }
      },
      setItem: (name, value) => {
        try {
          local.setItem(name, value)
        } catch {
          // Quota exceeded / private mode: the pack still works for this page view.
        }
      },
      removeItem: (name) => {
        try {
          local.removeItem(name)
        } catch {}
      },
    }
  } catch {
    // Storage blocked (privacy settings): fall back to in-memory only.
    return noopStorage
  }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem, quantity) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === newItem.id)
          if (existing) {
            const next = existing.quantity + (quantity ?? 1)
            return {
              items: state.items.map((i) =>
                i.id === newItem.id ? { ...i, quantity: clampQty(next) } : i,
              ),
            }
          }
          return {
            items: [...state.items, { ...newItem, quantity: clampQty(quantity ?? MIN_ORDER_UNITS) }],
          }
        })
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }))
      },

      updateQty: (id, qty) => {
        const quantity = clampQty(qty)
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }))
      },

      setAllQty: (qty) => {
        const quantity = clampQty(qty)
        set((state) => ({ items: state.items.map((i) => ({ ...i, quantity })) }))
      },

      clearCart: () => set({ items: [] }),

      total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      count: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(getPackStorage),
      // v0 (sessionStorage era) allowed quantities of 1. v2 enforces the
      // flat minimum order, so bump anything below it on the way in.
      version: 2,
      migrate: (persisted) => {
        const state = (persisted ?? {}) as { items?: unknown }
        const items = Array.isArray(state.items) ? (state.items as CartItem[]) : []
        return {
          ...(state as object),
          items: items
            .filter((i) => i && typeof i.id === 'string')
            .map((i) => ({ ...i, quantity: clampQty(Number(i.quantity)) })),
        } as unknown as CartStore
      },
      partialize: (state) => ({ items: state.items }) as unknown as CartStore,
    },
  ),
)

const subscribeNoop = () => () => {}

/** False during SSR and the hydration render, true afterwards. Gate any
 *  pack-derived UI on this: the pack lives in localStorage, so the server
 *  always renders it empty and the first client render must match. */
export function useHasMounted(): boolean {
  return useSyncExternalStore(subscribeNoop, () => true, () => false)
}
