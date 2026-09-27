/**
 * Date-gates a page/link that should not go live until a scheduled date.
 * Dates are treated as 00:00 IST (India is the only market these gates are used for).
 */
export function isPublished(publishDateIST: string): boolean {
  const target = new Date(`${publishDateIST}T00:00:00+05:30`)
  return Date.now() >= target.getTime()
}
