// Mirrors src/lib/phone.ts in the main app (a separate package, no shared
// import path) - keep the two in sync if the normalisation rules change.
const PHONE_DIGITS_MIN = 10
const PHONE_DIGITS_MAX = 15

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return /^[+\d\s()-]+$/.test(phone.trim()) && digits.length >= PHONE_DIGITS_MIN && digits.length <= PHONE_DIGITS_MAX
}

export function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < PHONE_DIGITS_MIN) return null

  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return `+91${digits}`
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    const withoutTrunk = digits.slice(1)
    if (withoutTrunk.length === 10 && /^[6-9]/.test(withoutTrunk)) {
      return `+91${withoutTrunk}`
    }
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`
  }
  return `+${digits}`
}
