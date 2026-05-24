import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { pushDevSchema } from '@payloadcms/drizzle'

// Schema push is heavy and can take a while on a cold start. Give it room.
export const maxDuration = 60
export const dynamic = 'force-dynamic'

/**
 * Force a Payload schema push (ALTER TABLE etc.) against the live Postgres,
 * bypassing the production gate in @payloadcms/db-vercel-postgres' connect.ts:
 *
 *   if (process.env.NODE_ENV !== 'production' && ... && this.push !== false) {
 *     await pushDevSchema(this)
 *   }
 *
 * In production NODE_ENV='production', so `push: true` in payload.config.ts
 * never actually runs. This route calls pushDevSchema directly to sync any
 * new columns / tables added to the schema since the DB was first created.
 *
 * Trigger with: GET /api/db-push?secret=mintbox-seed
 *
 * If drizzle-kit detects any warnings (e.g. data loss) it tries to prompt
 * interactively, which will hang on serverless. Pure-additive changes
 * (new columns, new tables) emit no warnings so this is safe for the
 * SEO / values / founder columns we're missing today.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('secret') !== 'mintbox-seed') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    await pushDevSchema(payload.db as any)
    return NextResponse.json({ success: true, message: 'Schema push complete' })
  } catch (e: any) {
    return NextResponse.json(
      {
        error: 'Schema push failed',
        message: (e?.cause?.message || e?.message || String(e)).slice(0, 2000),
      },
      { status: 500 },
    )
  }
}
