// Embargoes a route until a scheduled go-live date without a redeploy: the
// page itself is force-dynamic (see the per-page fetch), so this check runs
// fresh on every request and the page starts serving as soon as the date
// passes. `publishAt` is an ISO datetime string, e.g. '2026-09-29T00:00:00+05:30'.
export function isPublished(publishAt: string): boolean {
  return Date.now() >= new Date(publishAt).getTime()
}
