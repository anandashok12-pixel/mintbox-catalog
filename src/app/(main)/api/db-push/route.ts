import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { pushDevSchema } from '@payloadcms/drizzle'
import { sql } from 'drizzle-orm'
import { getTableConfig, type PgTable } from 'drizzle-orm/pg-core'

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
  const expected = process.env.SEED_SECRET
  if (!expected || searchParams.get('secret') !== expected) {
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

    if (action === 'force-create') {
      // Walk Payload's in-memory Drizzle schema and emit CREATE TABLE SQL
      // directly from each PgTable's column metadata. Avoids drizzle-kit
      // entirely (which doesn't bundle into the serverless function and
      // makes pushDevSchema silently no-op).
      //
      // Two passes:
      //   1. CREATE TABLE IF NOT EXISTS for every globals-related table,
      //      including primary keys. No FKs in this pass.
      //   2. ALTER TABLE ADD CONSTRAINT for foreign keys, ignored on
      //      failure (typically "already exists" or "referenced table
      //      missing" for tables outside our recreate set).
      const schema = (adapter.schema || {}) as Record<string, unknown>
      const targetPrefixes = ['about_page', '_about_page_v', 'contact_page', '_contact_page_v', 'faq_page', '_faq_page_v']
      const isTarget = (name: string) =>
        targetPrefixes.some((p) => name === p || name.startsWith(p + '_'))

      const tables: Array<{ key: string; table: PgTable; name: string }> = []
      for (const [key, value] of Object.entries(schema)) {
        try {
          const config = getTableConfig(value as PgTable)
          if (config?.name && isTarget(config.name)) {
            tables.push({ key, table: value as PgTable, name: config.name })
          }
        } catch {
          /* not a table */
        }
      }

      const quote = (id: string) => `"${id.replace(/"/g, '""')}"`
      const formatDefault = (col: any): string | null => {
        if (col?.default !== undefined && col.default !== null) {
          if (typeof col.default === 'string') return `'${col.default.replace(/'/g, "''")}'`
          if (typeof col.default === 'number' || typeof col.default === 'boolean') return String(col.default)
        }
        if (col?.hasDefault && typeof col?.defaultFn === 'function') {
          // Skip: defaultFn runs in JS at insert time, not in SQL.
        }
        if (col?.hasDefault && col?.generated) {
          // Identity / serial columns handle their own default.
          return null
        }
        return null
      }

      const created: string[] = []
      const fkAdded: string[] = []
      const errors: string[] = []

      // Pass 1: CREATE TABLE
      for (const { table, name } of tables) {
        try {
          const cfg = getTableConfig(table)
          const colDefs: string[] = []
          for (const col of cfg.columns) {
            const c: any = col
            const parts: string[] = [quote(c.name), c.getSQLType()]
            if (c.notNull) parts.push('NOT NULL')
            const def = formatDefault(c)
            if (def !== null) parts.push(`DEFAULT ${def}`)
            if (c.primary) parts.push('PRIMARY KEY')
            colDefs.push(parts.join(' '))
          }
          // Composite primary keys
          for (const pk of cfg.primaryKeys || []) {
            const pkCols = (pk as any).columns?.map((c: any) => quote(c.name)).join(', ')
            if (pkCols) colDefs.push(`PRIMARY KEY (${pkCols})`)
          }
          const ddl = `CREATE TABLE IF NOT EXISTS ${quote(name)} (\n  ${colDefs.join(',\n  ')}\n)`
          await drizzle.execute(sql.raw(ddl))
          created.push(name)
        } catch (e: any) {
          errors.push(`${name}: ${e?.message || String(e)}`)
        }
      }

      // Pass 2: foreign keys
      for (const { table, name } of tables) {
        try {
          const cfg = getTableConfig(table)
          for (const fk of cfg.foreignKeys || []) {
            const ref = (fk as any).reference()
            const cols = ref.columns.map((c: any) => quote(c.name)).join(', ')
            const refTable = (ref.foreignTable as any)[Symbol.for('drizzle:Name')] ?? (ref.foreignTable as any).Symbol?.Name
            const refTableName = typeof refTable === 'string' ? refTable : getTableConfig(ref.foreignTable).name
            const refCols = ref.foreignColumns.map((c: any) => quote(c.name)).join(', ')
            const onDelete = (fk as any).onDelete ? ` ON DELETE ${(fk as any).onDelete}` : ''
            const onUpdate = (fk as any).onUpdate ? ` ON UPDATE ${(fk as any).onUpdate}` : ''
            const constraintName = `${name}_${ref.columns.map((c: any) => c.name).join('_')}_fk`
            const ddl = `ALTER TABLE ${quote(name)} ADD CONSTRAINT ${quote(constraintName)} FOREIGN KEY (${cols}) REFERENCES ${quote(refTableName)} (${refCols})${onDelete}${onUpdate}`
            try {
              await drizzle.execute(sql.raw(ddl))
              fkAdded.push(constraintName)
            } catch (e: any) {
              // Constraints may already exist or reference outside tables.
              errors.push(`fk ${constraintName}: ${e?.message || String(e)}`)
            }
          }
        } catch (e: any) {
          errors.push(`fk-pass ${name}: ${e?.message || String(e)}`)
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Globals tables created from in-memory Drizzle schema',
        createdTables: created,
        foreignKeysAdded: fkAdded,
        errors,
      })
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
