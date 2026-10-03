import type { Access } from 'payload'

/**
 * Allows the operation only for a logged-in user (admin panel, CRM, or a
 * script that logged in via /api/users/login). Server code that writes
 * through the Payload local API skips access control by default, so the
 * site's own writes (lead form, cron jobs, webhooks) are unaffected.
 */
export const authenticated: Access = ({ req }) => Boolean(req.user)

/** Public read: the live site renders this content to anonymous visitors. */
export const anyone: Access = () => true
