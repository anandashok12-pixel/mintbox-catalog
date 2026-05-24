import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { pushDevSchema } from '@payloadcms/drizzle'
import { sql } from 'drizzle-orm'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

/**
 * Schema repair for the live Postgres. The Vercel adapter skips its own
 * push when NODE_ENV='production', so columns added to globals never reach
 * the DB and every read errors with "column ... does not exist".
 *
 * Modes (pass via ?action=):
 *   - (none)       Run pushDevSchema directly. Safe for pure-additive
 *                  diffs, but drizzle-kit's diff sometimes silently
 *                  generates no ALTERs (its interactive warning prompt
 *                  bails on serverless without changing anything).
 *   - inspect      Return the current columns of the three globals tables
 *                  from information_schema, so we can see what's missing.
 *   - reset        DROP all three globals tables (plus their array/version
 *                  child tables) CASCADE, then run pushDevSchema. With no
 *                  existing tables there's no diff ambiguity — drizzle-kit
 *                  emits straight CREATE TABLEs and apply() runs cleanly.
 *                  Destructive: wipes any content currently in those
 *                  globals (which is empty / stale anyway).
 *
 * Always requires ?secret=mintbox-seed.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('secret') !== 'mintbox-seed') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const action = searchParams.get('action') || 'push'

  try {
    const payload = await getPayload({ config: configPromise })
    const adapter: any = payload.db
    const drizzle = adapter.drizzle

    if (action === 'inspect') {
      const rows = await drizzle.execute(
        sql`SELECT table_name, column_name
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name IN ('about_page', 'contact_page', 'faq_page')
            ORDER BY table_name, ordinal_position`,
      )
      const grouped: Record<string, string[]> = {}
      for (const r of rows.rows as Array<{ table_name: string; column_name: string }>) {
        grouped[r.table_name] = grouped[r.table_name] || []
        grouped[r.table_name].push(r.column_name)
      }
      return NextResponse.json({ success: true, columns: grouped })
    }

    if (action === 'reset') {
      // Drop the globals tables and every related child table (arrays,
      // localized values, versions). CASCADE handles FK constraints.
      const tablesToDrop = [
        'about_page',
        '_about_page_v',
        'about_page_what_broke_cards',
        '_about_page_v_version_what_broke_cards',
        'about_page_values_items',
        '_about_page_v_version_values_items',
        'contact_page',
        '_contact_page_v',
        'contact_page_form_info_promises',
        '_contact_page_v_version_form_info_promises',
        'contact_page_form_config_occasion_options',
        '_contact_page_v_version_form_config_occasion_options',
        'contact_page_form_config_team_size_options',
        '_contact_page_v_version_form_config_team_size_options',
        'contact_page_form_config_budget_options',
        '_contact_page_v_version_form_config_budget_options',
        'faq_page',
        '_faq_page_v',
        'faq_page_categories',
        '_faq_page_v_version_categories',
        'faq_page_categories_items',
        '_faq_page_v_version_categories_items',
        'faq_page_still_questions_contact_cards',
        '_faq_page_v_version_still_questions_contact_cards',
      ]
      const dropped: string[] = []
      for (const t of tablesToDrop) {
        await drizzle.execute(sql.raw(`DROP TABLE IF EXISTS "${t}" CASCADE`))
        dropped.push(t)
      }
      await pushDevSchema(adapter)
      return NextResponse.json({
        success: true,
        message: 'Globals tables dropped and recreated via pushDevSchema',
        droppedTables: dropped,
      })
    }

    await pushDevSchema(adapter)
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
