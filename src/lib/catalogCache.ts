import { revalidateTag } from 'next/cache'

/** Cache tag for the /catalog product + category query. */
export const CATALOG_TAG = 'catalog'

/**
 * Mark the cached catalogue data stale after a CMS change. Called from
 * collection hooks, which also run in CLI scripts where there is no Next
 * request context: revalidateTag throws there, and that is fine to ignore
 * (the cache also expires on its own timer).
 */
export function revalidateCatalog(): void {
  try {
    revalidateTag(CATALOG_TAG, { expire: 0 })
  } catch {
    /* outside a Next request (import script, worker) */
  }
}
