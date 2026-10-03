import type { GlobalConfig } from 'payload'

/**
 * Singleton status for the Baileys mirror worker. The worker never talks to
 * Postgres directly for this - it POSTs status/QR/heartbeat events to
 * /api/whatsapp/webhook, which writes here. This is the one place to look
 * to answer "is the mirror actually running right now".
 */
export const WhatsappSession: GlobalConfig = {
  slug: 'whatsapp-session',
  label: 'WhatsApp Mirror',
  access: {
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'never_connected',
      options: [
        { label: 'Never connected', value: 'never_connected' },
        { label: 'Waiting for QR scan', value: 'needs_qr' },
        { label: 'Connecting', value: 'connecting' },
        { label: 'Connected', value: 'connected' },
        { label: 'Disconnected (retrying)', value: 'disconnected' },
        { label: 'Logged out - needs re-scan', value: 'logged_out' },
      ],
      admin: {
        description: 'Set by the worker on every connection.update event.',
      },
    },
    {
      // A Payload media doc, so the generated admin UI renders it as an
      // image with zero custom components - scan it here to (re)link the
      // worker to the number.
      name: 'qrMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Current pairing QR. Only meaningful while status is "Waiting for QR scan".',
      },
    },
    {
      name: 'qrGeneratedAt',
      type: 'date',
      admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'lastHeartbeatAt',
      type: 'date',
      admin: {
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Updated every ~60s by the worker while it is running. Stale for 15+ minutes triggers an email alert.',
      },
    },
    {
      name: 'lastConnectionEventAt',
      type: 'date',
      admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'lastError',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      // Set from the CRM's "Get a new QR code" button. A worker that has
      // stopped after a failed or expired pairing waits for this to change
      // before making exactly one more attempt.
      name: 'qrRequestedAt',
      type: 'date',
      admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'lastAlertSentAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'When the stale-heartbeat cron last sent an email, so it does not re-alert every run.',
      },
    },
  ],
}
