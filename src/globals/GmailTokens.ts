import type { GlobalConfig } from 'payload'

/**
 * OAuth refresh tokens for each connected mailbox, encrypted at rest with a
 * key derived from PAYLOAD_SECRET (see src/lib/gmailOAuth.ts). Closed to the
 * REST/GraphQL API entirely; only server code using the local API (which
 * overrides access) can read or write it.
 */
export const GmailTokens: GlobalConfig = {
  slug: 'gmail-tokens',
  label: 'Gmail Tokens',
  admin: { hidden: true },
  access: {
    read: () => false,
    update: () => false,
  },
  fields: [
    {
      name: 'tokens',
      type: 'array',
      fields: [
        { name: 'mailbox', type: 'text', required: true },
        { name: 'refreshToken', type: 'text', required: true },
        { name: 'connectedAt', type: 'date' },
      ],
    },
  ],
}
