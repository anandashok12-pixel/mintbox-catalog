/**
 * Copy fixes for content that lives in Payload (not in the repo):
 *   1. Replaces em dashes with hyphens in the About, Contact and FAQ globals
 *      and in product names, descriptions and feature lines.
 *   2. Sets the About founding story to the shared copy in
 *      src/data/aboutFoundingStory.ts and the About founder card to
 *      Ashok Kumar N, Founder.
 *   3. Rewrites the old "Anand will get back to you within 4 hours" style
 *      contact promises to "We reply within 1 hour on business days", and
 *      the old 25-unit MOQ wording to the 10-unit MOQ.
 *   4. Replaces en dashes with hyphens in product names, descriptions and
 *      feature lines.
 *
 * Privacy and Terms are hardcoded in src/app/(main)/privacy and /terms, so
 * they are fixed in the repo and not touched here.
 *
 * Uses the REST API, so it never boots Payload locally and never triggers a
 * schema push. Reads are anonymous; --apply logs in as a Payload admin via
 * PAYLOAD_ADMIN_EMAIL / PAYLOAD_ADMIN_PASSWORD (see scripts/lib/payloadAuth.ts),
 * so the dry run needs no credentials.
 *
 * Usage:
 *   npx tsx scripts/cms-copy-fixes.ts                 # dry run, prints a diff
 *   npx tsx scripts/cms-copy-fixes.ts --apply         # writes the changes
 *   npx tsx scripts/cms-copy-fixes.ts --base-url=http://localhost:3000
 */
import { authHeaders } from './lib/payloadAuth'
import { ABOUT_FOUNDING_STORY } from '../src/data/aboutFoundingStory'

const APPLY = process.argv.includes('--apply')
const BASE_URL = (
  process.argv.find((a) => a.startsWith('--base-url='))?.split('=')[1] ?? 'https://themintbox.in'
).replace(/\/$/, '')

const GLOBALS = ['about-page', 'contact-page', 'faq-page'] as const

const REPLY_PROMISE = 'We reply within 1 hour on business days.'

// Exact phrases from the old seed content. Applied before the em dash pass.
const PHRASES: [string, string][] = [
  ['Anand will get back to you within 4 hours on business days.', REPLY_PROMISE],
  ['Fill in the form and Anand will get back to you personally.', 'Fill in the form and we will get back to you.'],
  ['Most enquiries get a response within 4 hours.', REPLY_PROMISE],
  ['Reply within 4 hours on business days', REPLY_PROMISE],
  ['Every enquiry gets a response from Anand personally.', 'Every enquiry gets a response from a person.'],
  ['Anand picks up every WhatsApp.', 'Every WhatsApp is answered by a person.'],
  [
    'Anand picks up every WhatsApp personally. Most questions get a reply within 30 minutes during business hours.',
    `message us on WhatsApp. ${REPLY_PROMISE}`,
  ],
  ["Fill the contact form and we'll reply within 4 hours on business days.", `Fill the contact form. ${REPLY_PROMISE}`],
  [
    "we'll come back with a curated proposal within one business day.",
    `we'll come back with a curated proposal. ${REPLY_PROMISE}`,
  ],
  ['Our standard MOQ is <strong>25 units</strong> per product.', 'Our MOQ is <strong>10 units</strong>.'],
  ['The MOQ of 25 applies to the assembled kit.', 'The MOQ of 10 applies to the assembled kit.'],
  ['24 October', '25 October'],
  ['4-hour response', '1-hour reply'],
  ['Get In Touch \u2014 Director at MintBox.', 'Talk to Ashok Kumar N, Founder of MintBox.'],
  ['Get In Touch - Director at MintBox.', 'Talk to Ashok Kumar N, Founder of MintBox.'],
]

// Same text as the founder defaults in src/seed/seedPages.ts.
const FOUNDER_BIO = [
  'Ashok Kumar N founded MintBox in 2025 after twenty years in the Indian Air Force as a technical supervisor and a second career in operations leadership, including eight years at Updater Services (UDS), where he rose to AVP Operations.',
  'He started MintBox to bring that same standard to corporate gifting: honest lead times, one price that matches the invoice, and a quality check on every box before it leaves.',
]

const SKIP_KEYS = new Set(['id', 'createdAt', 'updatedAt', 'globalType', '_status'])

type Json = string | number | boolean | null | Json[] | { [k: string]: Json }
type Change = { path: string; before: string; after: string }

function fixText(s: string): string {
  let out = s
  for (const [from, to] of PHRASES) out = out.split(from).join(to)
  // Em dash (spaced or not) and &mdash; all become a spaced hyphen.
  return out.replace(/\s*(?:\u2014|&mdash;)\s*/g, ' - ')
}

// Products also lose en dashes: " \u2013 " separators become " - " and
// ranges like "2\u20133" become "2-3".
function fixProductText(s: string): string {
  return fixText(s).replace(/ \u2013 /g, ' - ').replace(/\u2013/g, '-')
}

function walk(value: Json, path: string, changes: Change[], fix = fixText): Json {
  if (typeof value === 'string') {
    const next = fix(value)
    if (next !== value) changes.push({ path, before: value, after: next })
    return next
  }
  if (Array.isArray(value)) return value.map((v, i) => walk(v, `${path}[${i}]`, changes, fix))
  if (value && typeof value === 'object') {
    const out: { [k: string]: Json } = {}
    for (const [k, v] of Object.entries(value)) {
      out[k] = SKIP_KEYS.has(k) ? v : walk(v, path ? `${path}.${k}` : k, changes, fix)
    }
    return out
  }
  return value
}

// Text as it was in the CMS before walk() touched it, keyed by path, so the
// diff for an overwritten field shows the real original.
const originals = new Map<string, string>()

function setField(doc: { [k: string]: Json }, group: string, field: string, value: string, changes: Change[]) {
  const g = (doc[group] ?? {}) as { [k: string]: Json }
  const path = `${group}.${field}`
  const current = typeof g[field] === 'string' ? (g[field] as string) : ''
  const before = originals.get(path) ?? current
  const i = changes.findIndex((c) => c.path === path)
  if (i >= 0) changes.splice(i, 1)
  if (before !== value) changes.push({ path, before, after: value })
  doc[group] = { ...g, [field]: value }
}

async function getJson(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`GET ${url}: HTTP ${res.status}`)
  return res.json()
}

async function send(method: 'POST' | 'PATCH', url: string, body: unknown) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', ...(await authHeaders(BASE_URL)) },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${method} ${url}: HTTP ${res.status} - ${(await res.text()).slice(0, 300)}`)
}

function printChanges(title: string, changes: Change[]) {
  if (!changes.length) return
  console.log(`\n=== ${title} (${changes.length} change${changes.length === 1 ? '' : 's'}) ===`)
  for (const c of changes) {
    console.log(`  ${c.path}`)
    console.log(`    - ${c.before}`)
    console.log(`    + ${c.after}`)
  }
}

function topLevelKeys(changes: Change[]) {
  return [...new Set(changes.map((c) => c.path.split(/[.[]/)[0]))]
}

async function fixGlobals() {
  let total = 0
  for (const slug of GLOBALS) {
    const doc = (await getJson(`${BASE_URL}/api/globals/${slug}?depth=0`)) as { [k: string]: Json }
    const changes: Change[] = []
    const next = walk(doc, '', changes) as { [k: string]: Json }
    originals.clear()
    for (const c of changes) originals.set(c.path, c.before)

    if (slug === 'about-page') {
      for (const [field, value] of Object.entries(ABOUT_FOUNDING_STORY)) {
        setField(next, 'foundingStory', field, value, changes)
      }
      // The bio is not rendered (the About page has a hardcoded founder
      // section) but is kept truthful in case it is wired up again.
      setField(next, 'founder', 'bioParagraph1', FOUNDER_BIO[0], changes)
      setField(next, 'founder', 'bioParagraph2', FOUNDER_BIO[1], changes)
      setField(next, 'founder', 'cardName', 'Ashok Kumar N', changes)
      setField(next, 'founder', 'cardRole', 'Founder, MintBox', changes)
    }

    printChanges(`global ${slug}`, changes)
    const leftovers = JSON.stringify(next).match(/[^"]{0,60}Anand[^"]{0,60}/g)
    if (leftovers) {
      console.log(`  ! "Anand" still appears in ${slug} (review by hand):`)
      for (const l of leftovers) console.log(`    ${l}`)
    }
    total += changes.length

    if (APPLY && changes.length) {
      const body: { [k: string]: Json } = {}
      for (const k of topLevelKeys(changes)) body[k] = next[k]
      await send('POST', `${BASE_URL}/api/globals/${slug}`, body)
      console.log(`  applied ${slug}`)
    }
  }
  return total
}

async function fixProducts() {
  let total = 0
  let page = 1
  for (;;) {
    const data = await getJson(`${BASE_URL}/api/products?depth=0&limit=100&page=${page}`)
    for (const p of data.docs as { id: number; name: string; description?: string; features?: Json }[]) {
      const changes: Change[] = []
      const subset = { name: p.name, description: p.description ?? null, features: p.features ?? null }
      const next = walk(subset as Json, '', changes, fixProductText) as typeof subset
      if (!changes.length) continue
      printChanges(`product ${p.id} "${p.name}"`, changes)
      total += changes.length
      if (APPLY) {
        const body: { [k: string]: Json } = {}
        for (const k of topLevelKeys(changes)) body[k] = next[k as keyof typeof next] as Json
        await send('PATCH', `${BASE_URL}/api/products/${p.id}`, body)
        console.log(`  applied product ${p.id}`)
      }
    }
    if (!data.hasNextPage) break
    page++
  }
  return total
}

async function run() {
  console.log(`CMS copy fixes against ${BASE_URL} ${APPLY ? '(APPLYING)' : '(dry run, nothing is written)'}`)
  const g = await fixGlobals()
  const p = await fixProducts()
  console.log(`\n${g} global field change(s), ${p} product field change(s).`)
  if (!APPLY && g + p > 0) console.log('Re-run with --apply to write these changes.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
