/**
 * Server-side generation of card thumbnails (see ./cardImage.ts for the
 * naming scheme). Used by the Media collection hooks and the backfill script.
 */
import { del, put } from '@vercel/blob'
import sharp from 'sharp'
import { CARD_PREFIX, CARD_WIDTH, cardPathname } from './cardImage'

const token = () => process.env.BLOB_READ_WRITE_TOKEN || ''

/** Same derivation @payloadcms/storage-vercel-blob uses for its base URL. */
export function blobBaseUrl(): string | null {
  const storeId = token().match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()
  return storeId ? `https://${storeId}.public.blob.vercel-storage.com` : null
}

export const blobUrlForFilename = (filename: string): string | null => {
  const base = blobBaseUrl()
  return base ? `${base}/${encodeURIComponent(filename)}` : null
}

export async function renderCardThumb(original: Buffer): Promise<Buffer> {
  return sharp(original)
    .rotate() // honour EXIF orientation before the metadata is dropped
    .resize({ width: CARD_WIDTH, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toBuffer()
}

/** Fetch a media original from Blob, render its thumbnail and upload it. */
export async function generateCardThumb(
  filename: string,
): Promise<{ url: string; bytes: number; originalBytes: number }> {
  const sourceUrl = blobUrlForFilename(filename)
  if (!sourceUrl) throw new Error('BLOB_READ_WRITE_TOKEN missing or malformed')
  const res = await fetch(sourceUrl)
  if (!res.ok) throw new Error(`fetch ${sourceUrl} -> ${res.status}`)
  const original = Buffer.from(await res.arrayBuffer())
  const thumb = await renderCardThumb(original)
  const blob = await put(cardPathname(filename), thumb, {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'image/webp',
    // Thumbnails are immutable: a replaced image gets a new filename.
    cacheControlMaxAge: 31536000,
    token: token(),
  })
  return { url: blob.url, bytes: thumb.length, originalBytes: original.length }
}

export async function deleteCardThumb(filename: string): Promise<void> {
  const base = blobBaseUrl()
  if (!base) return
  await del(`${base}/${CARD_PREFIX}${encodeURIComponent(filename)}.webp`, { token: token() })
}
