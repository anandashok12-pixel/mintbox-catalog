'use client'

import { useEffect, useState } from 'react'

// Chrome/Edge/Android fire this before showing their own install UI.
interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'mintbox-crm-install-dismissed'

function readDismissed() {
  try { return localStorage.getItem(DISMISS_KEY) === '1' } catch { return false }
}

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true
}

function isIos() {
  const ua = navigator.userAgent
  if (/android/i.test(ua)) return false
  // iPadOS reports itself as a Mac; touch support gives it away.
  return /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1)
}

/**
 * Registers the service worker and offers a one-tap "Install app" card:
 * the native prompt where the browser supports it, or Add-to-Home-Screen
 * steps on iPhone/iPad. Hidden once installed or dismissed.
 */
export function PwaSetup() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null)
  const [showIosHint, setShowIosHint] = useState(false)
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => undefined)
    }
    if (isStandalone()) return

    // Deferred so the card doesn't flash before we know it applies.
    const timer = window.setTimeout(() => {
      setDismissed(readDismissed())
      if (isIos()) setShowIosHint(true)
    }, 0)
    const onPrompt = (event: Event) => {
      event.preventDefault()
      setInstallEvent(event as InstallPromptEvent)
    }
    const onInstalled = () => setInstallEvent(null)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  function dismiss() {
    setDismissed(true)
    try { localStorage.setItem(DISMISS_KEY, '1') } catch { /* private mode */ }
  }

  async function install() {
    if (!installEvent) return
    await installEvent.prompt()
    await installEvent.userChoice.catch(() => undefined)
    setInstallEvent(null)
  }

  if (dismissed || (!installEvent && !showIosHint)) return null

  return (
    <div className="install-card" role="dialog" aria-label="Install MintBox CRM">
      {/* eslint-disable-next-line @next/next/no-img-element -- static 40px app icon */}
      <img src="/icons/icon-192.png" alt="" width={40} height={40} />
      <div>
        <strong>Install MintBox CRM</strong>
        {installEvent
          ? <span>Open it from your home screen like any other app.</span>
          : <span>Tap <b>Share</b> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V3M8 7l4-4 4 4M5 11v9h14v-9" /></svg> then <b>Add to Home Screen</b>.</span>}
      </div>
      {installEvent && <button type="button" className="toolbar-button primary" onClick={install}>Install</button>}
      <button type="button" className="install-close" onClick={dismiss} aria-label="Not now">×</button>
    </div>
  )
}
