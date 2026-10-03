import type { GlobalConfig } from 'payload'

/**
 * Per-mailbox sync cursor for the Gmail integration. The cron at
 * /api/cron/gmail-sync reads and writes this; nothing else should. A row's
 * historyId is what lets the next run ask Gmail for only what changed.
 */
export const GmailSync: GlobalConfig = {
  slug: 'gmail-sync',
  label: 'Gmail Sync',
  access: {
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'accounts',
      type: 'array',
      admin: { description: 'One row per synced mailbox. Managed by the cron.' },
      fields: [
        { name: 'mailbox', type: 'text', required: true },
        { name: 'historyId', type: 'text' },
        { name: 'pendingIds', type: 'textarea', admin: { readOnly: true, description: 'Gmail ids still to ingest (backlog drains a few dozen per run).' } },
        { name: 'connectedAt', type: 'date', admin: { description: 'When this mailbox was connected via OAuth.' } },
        { name: 'lastSyncAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
        { name: 'lastSuccessAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
        { name: 'lastError', type: 'text' },
        { name: 'totalSynced', type: 'number', defaultValue: 0 },
      ],
    },
    { name: 'lastAlertSentAt', type: 'date', admin: { hidden: true } },
  ],
}
