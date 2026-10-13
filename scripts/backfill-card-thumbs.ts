/**
 * Generate the 600px WebP card thumbnail (card/<filename>.webp in Blob) for
 * every existing media image. New uploads get theirs from the Media
 * afterChange hook; this covers everything uploaded before that hook existed.
 *
 * Reads the media table and writes only to the Blob store: no DB writes.
 *
 * Usage:
 *   npm run backfill-card-thumbs                 # all media missing a thumbnail
 *   npm run backfill-card-thumbs -- --dry        # list what would be generated
 *   npm run backfill-card-thumbs -- --limit 5    # first N only
 *   npm run backfill-card-thumbs -- --force      # regenerate existing thumbnails too
 *
 * Idempotent: media whose thumbnail URL already responds 200 are skipped.
 */
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { cardImageUrl } from '../src/lib/cardImage'
import { blobUrlForFilename, generateCardThumb } from '../src/lib/cardThumb'

const DRY = process.argv.includes('--dry')
const FORCE = process.argv.includes('--force')
const limitArg = process.argv.indexOf('--limit')
const LIMIT = limitArg > -1 ? Number(process.argv[limitArg + 1]) : Infinity
const CONCURRENCY = 6

async function run() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({ collection: 'media', pagination: false, depth: 0, sort: 'id' })
  const media = (docs as { id: number; filename?: string | null; mimeType?: string | null }[])
    .filter((m) => m.filename && m.mimeType?.startsWith('image/') && m.mimeType !== 'image/svg+xml')
    .slice(0, LIMIT)
  console.log(`\n🖼  ${media.length} media images${DRY ? ' (DRY RUN)' : ''}\n`)

  let made = 0, skipped = 0, failed = 0, before = 0, after = 0
  const failures: string[] = []
  let next = 0

  async function worker() {
    while (next < media.length) {
      const m = media[next++]
      const filename = m.filename as string
      const expected = cardImageUrl(blobUrlForFilename(filename))
      try {
        if (!expected) throw new Error('could not derive thumbnail URL')
        if (!FORCE && (await fetch(expected, { method: 'HEAD' })).ok) { skipped++; continue }
        if (DRY) { console.log(`  ➕ Would generate: ${filename}`); made++; continue }
        const t = await generateCardThumb(filename)
        // The grid derives this URL client-side; a mismatch means a 404 there.
        if (decodeURI(t.url) !== decodeURI(expected)) {
          throw new Error(`URL mismatch: uploaded ${t.url}, grid expects ${expected}`)
        }
        made++; before += t.originalBytes; after += t.bytes
        console.log(`  ✅ ${filename}  ${(t.originalBytes / 1024).toFixed(0)} KB -> ${(t.bytes / 1024).toFixed(0)} KB`)
      } catch (err) {
        failed++
        failures.push(`${m.id} ${filename}: ${(err as Error).message}`)
        console.log(`  ❌ ${filename}: ${(err as Error).message}`)
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  console.log(`\n🎉 Done. Generated ${made}, already present ${skipped}, failed ${failed}.`)
  if (made && !DRY) console.log(`   ${(before / 1048576).toFixed(1)} MB of originals -> ${(after / 1048576).toFixed(1)} MB of thumbnails`)
  if (failures.length) console.log(`\nFailures:\n${failures.map((f) => `  ${f}`).join('\n')}`)
  process.exit(failed ? 1 : 0)
}

run().catch((err) => { console.error('Failed:', err); process.exit(1) })
