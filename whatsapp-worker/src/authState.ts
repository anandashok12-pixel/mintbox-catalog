// Baileys is CommonJS-only (no "exports" map). Node's native ESM loader
// can't statically resolve its named exports reliably, so import the
// namespace as default and destructure at runtime instead - the only
// robust way to interop with a plain CJS package from a "type":"module"
// entrypoint.
import baileysPkg from '@whiskeysockets/baileys'
import type { AuthenticationState } from '@whiskeysockets/baileys'
const { proto, initAuthCreds, BufferJSON } = baileysPkg as any
import { pool, ensureAuthTable } from './db.js'

/**
 * Postgres-backed equivalent of Baileys' useMultiFileAuthState, so the
 * session survives a redeploy or a moved container without a re-scan.
 * Mirrors the file-based implementation field for field: same key naming
 * (`creds`, `${type}-${id}`), same BufferJSON serialization - the only
 * difference is the storage backend.
 */
export async function usePostgresAuthState(sessionId: string): Promise<{
  state: AuthenticationState
  saveCreds: () => Promise<void>
}> {
  await ensureAuthTable()

  const readData = async (key: string): Promise<any> => {
    const { rows } = await pool.query('SELECT value FROM wa_auth_state WHERE session_id = $1 AND key = $2', [sessionId, key])
    if (rows.length === 0) return null
    try {
      return JSON.parse(rows[0].value, BufferJSON.reviver)
    } catch {
      return null
    }
  }

  const writeData = async (data: unknown, key: string): Promise<void> => {
    const value = JSON.stringify(data, BufferJSON.replacer)
    await pool.query(
      `INSERT INTO wa_auth_state (session_id, key, value, updated_at)
       VALUES ($1, $2, $3, now())
       ON CONFLICT (session_id, key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
      [sessionId, key, value],
    )
  }

  const removeData = async (key: string): Promise<void> => {
    await pool.query('DELETE FROM wa_auth_state WHERE session_id = $1 AND key = $2', [sessionId, key])
  }

  const creds = (await readData('creds')) || initAuthCreds()

  return {
    state: {
      creds,
      keys: {
        get: async (type, ids) => {
          const data: Record<string, any> = {}
          await Promise.all(
            ids.map(async (id) => {
              let value = await readData(`${type}-${id}`)
              if (type === 'app-state-sync-key' && value) {
                value = proto.Message.AppStateSyncKeyData.fromObject(value)
              }
              data[id] = value
            }),
          )
          return data
        },
        set: async (data) => {
          const tasks: Promise<void>[] = []
          for (const category in data) {
            const categoryData = (data as any)[category]
            for (const id in categoryData) {
              const value = categoryData[id]
              const key = `${category}-${id}`
              tasks.push(value ? writeData(value, key) : removeData(key))
            }
          }
          await Promise.all(tasks)
        },
      },
    },
    saveCreds: async () => {
      await writeData(creds, 'creds')
    },
  }
}

/** Wipes the stored session - used when WhatsApp reports loggedOut, since that auth state can never reconnect and a fresh QR scan is required. */
export async function clearAuthState(sessionId: string): Promise<void> {
  await pool.query('DELETE FROM wa_auth_state WHERE session_id = $1', [sessionId])
}
