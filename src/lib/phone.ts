const PHONE_DIGITS_MIN = 10
const PHONE_DIGITS_MAX = 15

/** Shared phone check used by every lead form and the API route. */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return /^[+\d\s()-]+$/.test(phone.trim()) && digits.length >= PHONE_DIGITS_MIN && digits.length <= PHONE_DIGITS_MAX
}
