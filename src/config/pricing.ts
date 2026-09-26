/**
 * Single place to change the Diwali 2026 / corporate gifting catalog markup.
 * `MARKUP_MULTIPLIER` is a placeholder — Anand sets the real number before
 * anything here goes live. mrp is rounded to a ...49 or ...99 ending, the
 * pattern already used for MintBox's own listed prices.
 */
export const MARKUP_MULTIPLIER = 2.2

export function roundToNearest49or99(value: number): number {
  const hundred = Math.floor(value / 100) * 100
  const candidates = [hundred + 49, hundred + 99, hundred - 1, hundred + 149]
  return candidates.reduce((best, c) => (Math.abs(c - value) < Math.abs(best - value) ? c : best))
}

export function computeMrp(supplierCost: number): number {
  return roundToNearest49or99(supplierCost * MARKUP_MULTIPLIER)
}
