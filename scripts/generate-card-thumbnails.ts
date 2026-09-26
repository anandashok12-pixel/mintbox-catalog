/**
 * Generate 480px WebP "card" thumbnails for every media doc and record them as
 * the Payload image size `sizes.card`.
 *
 * WHY: product cards on /catalog and the content pages render the original
 * uploads (avg 160 KB JPEG / 320 KB PNG, ~800–900px) with `unoptimized`,
 * because the Vercel Image Optimization quota is exhausted (402). The
 * frontend already prefers `image.sizes.card.url` when it exists, so once
 * this runs every card switches to a ~10 KB WebP (dry run on 5 docs: 1.9 MB -> 43 KB) with no code change.
 *
 * DRY RUN IS THE DEFAULT. Nothing is uploaded or written unless you pass
 * --apply. The dry run still downloads + resizes (read-only) so it can report
 * the real byte savings.
 *
 * Usage (from the repo root):
 *   node --env-file=.env.local --require tsx/cjs scripts/generate-card-thumbnails.ts
 *       # dry run: checks schema, resizes in memory, prints savings
 *   node --env-file=.env.local --require tsx/cjs scripts/generate-card-thumbnails.ts --add-columns
 *       # one-time: adds the nullable sizes_card_* columns to the media table
 *   node --env-file=.env.local --require tsx/cjs scripts/generate-card-thumbnails.ts --apply
 *       # uploads thumbnails to Blob and fills media.sizes_card_*
 *
 * Flags:
 *   --apply         actually upload to Blob and update the media table
 *   --add-columns   ALTER TABLE media ADD COLUMN IF NOT EXISTS sizes_card_* (idempotent)
 *   --force         regenerate even when sizes_card_filename is already set
 *   --limit=N       only process the first N media docs (by id)
 *   --id=123        only process one media doc
 *
 * ORDER OF OPERATIONS (important — prod reads break if the columns are
 * missing when Media.ts declares the size):
 *   1. Run with --add-columns (adds nullable columns; current code ignores them).
 *   2. Run with --apply.
 *   3. Add this to src/collections/Media.ts `upload` and deploy:
 *        imageSizes: [
 *          { name: 'card', width: 480, height: 480, fit: 'inside',
 *            withoutEnlargement: true,
 *            formatOptions: { format: 'webp', options: { quality: 72 } } },
 *        ],
 *      Payload then exposes `sizes.card.url` (built by the Vercel Blob adapter
 *      from sizes_card_filename) and generates the size for future uploads.
 *
 * This script talks to Postgres directly (not getPayload) so it never
 * triggers Payload's dev-mode schema push against the production database.
 */
import { Client } from 'pg'
import { put } from '@vercel/blob'
import sharp from 'sharp'
import path from 'path'

const args = process.argv.slice(2)
const APPLY = args.includes('--apply')
const ADD_COLUMNS = args.includes('--add-columns')
const FORCE = args.includes('--force')
const LIMIT = Number(args.find((a) => a.startsWith('--limit='))?.split('=')[1] ?? 0) || 0
const ONLY_ID = Number(args.find((a) => a.startsWith('--id='))?.split('=')[1] ?? 0) || 0

const CARD_WIDTH = 480
const WEBP_QUALITY = 72
const CONCURRENCY = 6

const CARD_COLUMNS: Array<[string, string]> = [
  ['sizes_card_url', 'varchar'],
  ['sizes_card_width', 'numeric'],
  ['sizes_card_height', 'numeric'],
  ['sizes_card_mime_type', 'varchar'],
  ['sizes_card_filesize', 'numeric'],
  ['sizes_card_filename', 'varchar'],
]

interface MediaRow {
  id: number
  url: string | null
  filename: string | null
  filesize: string | null
  sizes_card_filename?: string | null
}

function blobBaseUrl(token: string): string {
  // Same derivation as @payloadcms/storage-vercel-blob.
  const storeId = token.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()
  if (!storeId) throw new Error('BLOB_READ_WRITE_TOKEN is not a vercel_blob_rw_<store>_<secret> token')
  return `https://${storeId}.public.blob.vercel-storage.com`
}

function cardFilename(id: number, original: string): string {
  const base = path.basename(original, path.extname(original)).replace(/[^a-zA-Z0-9._-]+/g, '-')
  // Flat name: the adapter URL-encodes the whole filename, so no slashes.
  // Media id keeps names unique when two uploads share a basename.
  return `${base}-${id}-card-${CARD_WIDTH}.webp`
}

async function fetchOriginal(row: MediaRow, baseUrl: string): Promise<Buffer> {
  const candidates = [
    row.filename ? `${baseUrl}/${encodeURIComponent(row.filename)}` : null,
    row.url && /^https?:\/\//.test(row.url) ? row.url : null,
  ].filter((u): u is string => Boolean(u))
  let lastError: unknown = null
  for (const url of candidates) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
      return Buffer.from(await res.arrayBuffer())
    } catch (err) {
      lastError = err
    }
  }
  throw lastError ?? new Error('no usable source URL')
}

const fmt = (bytes: number) =>
  bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`

async function main() {
  const connectionString = process.env.POSTGRES_URL
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!connectionString) throw new Error('POSTGRES_URL missing (run with --env-file=.env.local)')
  if (!token) throw new Error('BLOB_READ_WRITE_TOKEN missing')
  const baseUrl = blobBaseUrl(token)

  console.log(`Mode: ${APPLY ? 'APPLY (uploads + DB writes)' : 'DRY RUN (no writes)'}`)

  const db = new Client({ connectionString })
  await db.connect()

  try {
    const existing = await db.query<{ column_name: string }>(
      `select column_name from information_schema.columns where table_name = 'media'`,
    )
    const have = new Set(existing.rows.map((r) => r.column_name))
    const missing = CARD_COLUMNS.filter(([c]) => !have.has(c))

    if (missing.length > 0) {
      if (ADD_COLUMNS) {
        for (const [col, type] of missing) {
          console.log(`  ALTER TABLE media ADD COLUMN IF NOT EXISTS ${col} ${type}`)
          await db.query(`ALTER TABLE media ADD COLUMN IF NOT EXISTS ${col} ${type}`)
        }
        console.log('Columns added.')
      } else {
        console.log(`Missing columns on media: ${missing.map(([c]) => c).join(', ')}`)
        console.log('Re-run with --add-columns to create them (nullable, safe for current code).')
        if (APPLY) return
      }
    } else if (ADD_COLUMNS) {
      console.log('All sizes_card_* columns already exist.')
    }
    if (ADD_COLUMNS && !APPLY) return

    const hasCardCol = missing.length === 0 || ADD_COLUMNS
    const where: string[] = [`mime_type like 'image/%'`]
    const params: unknown[] = []
    if (ONLY_ID) {
      params.push(ONLY_ID)
      where.push(`id = $${params.length}`)
    }
    if (hasCardCol && !FORCE) where.push(`sizes_card_filename is null`)
    const rows = await db.query<MediaRow>(
      `select id, url, filename, filesize${hasCardCol ? ', sizes_card_filename' : ''}
         from media where ${where.join(' and ')} order by id${LIMIT ? ` limit ${LIMIT}` : ''}`,
      params,
    )
    console.log(`${rows.rows.length} media docs to process.`)

    let done = 0
    let failed = 0
    let before = 0
    let after = 0
    const queue = [...rows.rows]

    const worker = async () => {
      for (let row = queue.shift(); row; row = queue.shift()) {
        const label = `#${row.id} ${row.filename ?? '(no filename)'}`
        try {
          if (!row.filename) throw new Error('no filename')
          const original = await fetchOriginal(row, baseUrl)
          const { data, info } = await sharp(original)
            .rotate()
            .resize({ width: CARD_WIDTH, height: CARD_WIDTH, fit: 'inside', withoutEnlargement: true })
            .webp({ quality: WEBP_QUALITY })
            .toBuffer({ resolveWithObject: true })
          const name = cardFilename(row.id, row.filename)
          before += original.length
          after += data.length

          if (APPLY) {
            await put(name, data, {
              access: 'public',
              addRandomSuffix: false,
              contentType: 'image/webp',
              cacheControlMaxAge: 60 * 60 * 24 * 365,
              token,
            })
            await db.query(
              `update media set
                 sizes_card_url = $1, sizes_card_width = $2, sizes_card_height = $3,
                 sizes_card_mime_type = 'image/webp', sizes_card_filesize = $4,
                 sizes_card_filename = $5
               where id = $6`,
              [`${baseUrl}/${encodeURIComponent(name)}`, info.width, info.height, data.length, name, row.id],
            )
          }
          done++
          console.log(
            `  ${APPLY ? 'OK ' : 'DRY'} ${label} ${(original.length / 1024).toFixed(0)}KB -> ${name} ${info.width}x${info.height} ${(data.length / 1024).toFixed(0)}KB`,
          )
        } catch (err) {
          failed++
          console.error(`  FAIL ${label}: ${err instanceof Error ? err.message : String(err)}`)
        }
      }
    }

    await Promise.all(Array.from({ length: CONCURRENCY }, worker))

    console.log('')
    console.log(`Processed ${done}, failed ${failed}.`)
    if (done > 0) {
      console.log(
        `Originals ${fmt(before)} -> cards ${fmt(after)} (${Math.round((1 - after / before) * 100)}% smaller).`,
      )
    }
    if (!APPLY) console.log('Dry run only. Re-run with --apply to upload and record sizes.card.')
  } finally {
    await db.end()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
