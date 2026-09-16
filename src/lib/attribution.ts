// Lead attribution: where a visitor came from and which page they landed on.
//
// First touch is kept in localStorage (so a lead who found us on Google last
// week and came back directly today is still credited to Google). Last touch
// is the current browser session, kept in sessionStorage. Both are sent with
// every lead form submission and stored on the lead in Payload.

export interface Touch {
  source: string
  medium: string
  campaign?: string
  term?: string
  content?: string
  referrer?: string
  landingPage: string
  at: string
}

export interface Attribution {
  firstTouch?: Touch
  lastTouch?: Touch
  formPage?: string
}

const FIRST_KEY = 'mb_attr_first'
const LAST_KEY = 'mb_attr_last'

const AI_HOSTS: [RegExp, string][] = [
  [/(^|\.)chatgpt\.com$|(^|\.)chat\.openai\.com$|(^|\.)openai\.com$/, 'chatgpt'],
  [/(^|\.)perplexity\.ai$/, 'perplexity'],
  [/(^|\.)claude\.ai$/, 'claude'],
  [/^gemini\.google\.com$|^bard\.google\.com$/, 'gemini'],
  [/(^|\.)copilot\.microsoft\.com$/, 'copilot'],
  [/(^|\.)deepseek\.com$/, 'deepseek'],
  [/(^|\.)you\.com$/, 'you.com'],
  [/(^|\.)meta\.ai$/, 'meta-ai'],
  [/(^|\.)grok\.com$/, 'grok'],
]

const SEARCH_HOSTS: [RegExp, string][] = [
  [/(^|\.)google\.[a-z.]+$/, 'google'],
  [/(^|\.)bing\.com$/, 'bing'],
  [/(^|\.)duckduckgo\.com$/, 'duckduckgo'],
  [/(^|\.)yahoo\.[a-z.]+$/, 'yahoo'],
  [/(^|\.)yandex\.[a-z.]+$/, 'yandex'],
  [/(^|\.)ecosia\.org$/, 'ecosia'],
  [/(^|\.)baidu\.com$/, 'baidu'],
]

const SOCIAL_HOSTS: [RegExp, string][] = [
  [/(^|\.)facebook\.com$|(^|\.)fb\.com$/, 'facebook'],
  [/(^|\.)instagram\.com$/, 'instagram'],
  [/(^|\.)linkedin\.com$|^lnkd\.in$/, 'linkedin'],
  [/^t\.co$|(^|\.)twitter\.com$|(^|\.)x\.com$/, 'twitter'],
  [/(^|\.)youtube\.com$|^youtu\.be$/, 'youtube'],
  [/(^|\.)reddit\.com$/, 'reddit'],
  [/(^|\.)quora\.com$/, 'quora'],
  [/(^|\.)whatsapp\.com$|^wa\.me$/, 'whatsapp'],
  [/(^|\.)pinterest\.[a-z.]+$/, 'pinterest'],
]

function matchHost(host: string, table: [RegExp, string][]): string | undefined {
  return table.find(([re]) => re.test(host))?.[1]
}

function aiSourceFromUtm(utmSource: string): string | undefined {
  // ChatGPT and Perplexity append utm_source=chatgpt.com / perplexity to links.
  return matchHost(utmSource.toLowerCase(), AI_HOSTS) ??
    (/chatgpt|openai/.test(utmSource) ? 'chatgpt' : /perplexity/.test(utmSource) ? 'perplexity' : undefined)
}

function classify(url: URL, referrer: string): Omit<Touch, 'at'> {
  const p = url.searchParams
  const landingPage = url.pathname + url.search
  const utm = {
    campaign: p.get('utm_campaign') || undefined,
    term: p.get('utm_term') || undefined,
    content: p.get('utm_content') || undefined,
  }
  const ref = referrer || undefined
  let refHost = ''
  try {
    if (referrer) refHost = new URL(referrer).hostname.toLowerCase()
  } catch {}

  const utmSource = p.get('utm_source')
  if (utmSource) {
    const ai = aiSourceFromUtm(utmSource)
    return {
      source: ai ?? utmSource.toLowerCase(),
      medium: p.get('utm_medium')?.toLowerCase() || (ai ? 'ai-assistant' : 'unknown'),
      ...utm, referrer: ref, landingPage,
    }
  }
  if (p.get('gclid') || p.get('gbraid') || p.get('wbraid')) {
    return { source: 'google', medium: 'cpc', ...utm, referrer: ref, landingPage }
  }
  if (p.get('fbclid')) {
    return { source: matchHost(refHost, SOCIAL_HOSTS) ?? 'facebook', medium: 'social', ...utm, referrer: ref, landingPage }
  }
  if (p.get('msclkid')) {
    return { source: 'bing', medium: 'cpc', ...utm, referrer: ref, landingPage }
  }
  if (!refHost) {
    return { source: 'direct', medium: 'none', landingPage }
  }
  const ai = matchHost(refHost, AI_HOSTS)
  if (ai) return { source: ai, medium: 'ai-assistant', referrer: ref, landingPage }
  const search = matchHost(refHost, SEARCH_HOSTS)
  if (search) return { source: search, medium: 'organic', referrer: ref, landingPage }
  const social = matchHost(refHost, SOCIAL_HOSTS)
  if (social) return { source: social, medium: 'social', referrer: ref, landingPage }
  return { source: refHost.replace(/^www\./, ''), medium: 'referral', referrer: ref, landingPage }
}

type Store = 'local' | 'session'

// Storage access itself can throw (private mode, blocked site data).
function read(store: Store, key: string): Touch | undefined {
  try {
    const raw = (store === 'local' ? localStorage : sessionStorage).getItem(key)
    return raw ? (JSON.parse(raw) as Touch) : undefined
  } catch {
    return undefined
  }
}

function write(store: Store, key: string, touch: Touch) {
  try {
    (store === 'local' ? localStorage : sessionStorage).setItem(key, JSON.stringify(touch))
  } catch {}
}

/** Record the visit. Call once per full page load. */
export function captureAttribution() {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  const referrer = document.referrer
  let refHost = ''
  try {
    if (referrer) refHost = new URL(referrer).hostname
  } catch {}
  const isInternal = refHost === url.hostname
  const hasCampaign = ['utm_source', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid'].some((k) => url.searchParams.has(k))

  // Internal navigation without new campaign params isn't a new touch.
  if (isInternal && !hasCampaign) return

  const touch: Touch = { ...classify(url, isInternal ? '' : referrer), at: new Date().toISOString() }

  if (!read('local', FIRST_KEY)) write('local', FIRST_KEY, touch)

  // A new session, or a new campaign/referrer mid-session, replaces last touch.
  // A direct visit or a reload (which keeps the original referrer) mid-session
  // doesn't overwrite the real source.
  const last = read('session', LAST_KEY)
  const isRepeat = last && last.source === touch.source && last.referrer === touch.referrer && last.campaign === touch.campaign
  if (!last || (touch.source !== 'direct' && !isRepeat)) write('session', LAST_KEY, touch)
}

/** Attribution payload to send with a lead form. */
export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {}
  const firstTouch = read('local', FIRST_KEY)
  const lastTouch = read('session', LAST_KEY) ?? firstTouch
  return {
    firstTouch,
    lastTouch,
    formPage: window.location.pathname + window.location.search,
  }
}
