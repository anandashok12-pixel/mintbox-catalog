'use client'

import { useEffect } from 'react'
import { captureAttribution } from '@/lib/attribution'

/** Records the visitor's traffic source and entry page for lead attribution. */
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution()
  }, [])
  return null
}
