import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access/authenticated'
import { deleteCardThumb, generateCardThumb } from '../lib/cardThumb'
import { revalidateCatalog } from '../lib/catalogCache'

// Media URLs are generated from payload's serverURL (NEXT_PUBLIC_URL), which
// historically pointed at mintbox-catalog.vercel.app. Rendering those absolute
// URLs on themintbox.in makes next/image proxy every product image through a
// second cross-domain serverless hop - slow enough that Googlebot's renderer
// gives up ("Other error" in Search Console). Rewriting them to relative
// /api/media/... paths keeps every fetch same-origin on whichever domain
// served the page.
const stripMediaOrigin = (url: unknown): unknown => {
  if (typeof url !== 'string') return url
  const match = url.match(/^https?:\/\/[^/]+(\/api\/media\/.+)$/)
  return match ? match[1] : url
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        doc.url = stripMediaOrigin(doc.url)
        doc.thumbnailURL = stripMediaOrigin(doc.thumbnailURL)
        if (doc.sizes && typeof doc.sizes === 'object') {
          for (const size of Object.values(doc.sizes as Record<string, { url?: unknown }>)) {
            if (size && typeof size === 'object') size.url = stripMediaOrigin(size.url)
          }
        }
        return doc
      },
    ],
    // Catalogue cards load a 600px WebP thumbnail from card/<filename>.webp
    // in Blob (see src/lib/cardImage.ts). Generate it whenever a file lands.
    // Never fail the upload over it: the card falls back to the original.
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        const isImage = typeof doc.mimeType === 'string' && doc.mimeType.startsWith('image/') && doc.mimeType !== 'image/svg+xml'
        if (doc.filename && isImage && (operation === 'create' || doc.filename !== previousDoc?.filename)) {
          try {
            await generateCardThumb(doc.filename)
          } catch (err) {
            req.payload.logger.error({ err, msg: `[media] card thumbnail failed for ${doc.filename}` })
          }
        }
        revalidateCatalog()
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        if (!doc.filename) return doc
        try {
          await deleteCardThumb(doc.filename)
        } catch (err) {
          req.payload.logger.error({ err, msg: `[media] card thumbnail delete failed for ${doc.filename}` })
        }
        revalidateCatalog()
        return doc
      },
    ],
  },
  upload: {
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      // Not required - the inline image picker on Product form doesn't
      // prompt for alt text, so making it required causes a 500 on upload.
      required: false,
    },
  ],
}
