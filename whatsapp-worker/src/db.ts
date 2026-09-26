import pg from 'pg'

const { Pool } = pg

export const pool = new pg.Pool({
  connectionString: process.env.WORKER_POSTGRES_URL || process.env.POSTGRES_URL,
  max: 3,
})

/**
 * One table holds the whole Baileys auth state (creds + every signal key).
 * Session-scoped by sessionId so a second number could run from the same
 * DB later without colliding. Storing as `text` (not jsonb) so the value is
 * byte-identical to what useMultiFileAuthState would write to disk -
 * BufferJSON round-trips exactly, and jsonb's own re-serialization isn't a
 * risk we need to take on for something this security-sensitive.
 */
export async function ensureAuthTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS wa_auth_state (
      session_id text NOT NULL,
      key text NOT NULL,
      value text NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now(),
      PRIMARY KEY (session_id, key)
    )
  `)
}
