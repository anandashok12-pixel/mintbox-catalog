const PHONE_DIGITS_MIN = 10
const PHONE_DIGITS_MAX = 15

/** Shared phone check used by every lead form and the API route. */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return /^[+\d\s()-]+$/.test(phone.trim()) && digits.length >= PHONE_DIGITS_MIN && digits.length <= PHONE_DIGITS_MAX
}

/**
 * Normalise any phone-ish input (form text, a WhatsApp JID's number part,
 * a call-log number) to E.164 so every channel joins on the same key.
 *
 * Rules, applied in order after stripping every non-digit:
 *   1. 10 digits starting 6-9    -> Indian mobile, prefix 91
 *   2. 11 digits starting with 0 -> drop the trunk zero, then rule 1
 *   3. 12 digits starting 91     -> already correct
 *   4. anything else             -> kept as given (international), '+' prefixed
 *
 * Returns null when the input has too few digits to be a phone number at all.
 * Does not re-validate format - call isValidPhone first for user-facing input.
 */
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

/** Extracts the number from a Baileys JID ("919886537631@s.whatsapp.net") and normalises it. */
export function normalizeJid(jid: string): string | null {
  const numberPart = jid.split('@')[0]?.split(':')[0] ?? ''
  return normalizePhone(numberPart)
}
