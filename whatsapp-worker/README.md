# MintBox WhatsApp mirror worker

A read-only Baileys companion device for the MintBox sales number. It never
sends a message, marks nothing as read, and never broadcasts presence - it
only observes what the phone app sends and receives, and posts each event to
the CRM's webhook. See the CRM PRD's "WhatsApp mirror" section for the full
design and the reasoning behind every one of these choices.

## Why this runs separately from the Next.js app

It holds a long-lived WebSocket and in-memory session state that a
serverless function's lifecycle can't support. This is a small always-on
process (a $4-7/mo VM is enough) - the CRM itself stays on Vercel.

## Setup

```bash
cd whatsapp-worker
npm install
cp .env.example .env   # fill in WORKER_POSTGRES_URL, CRM_WEBHOOK_URL, WHATSAPP_WEBHOOK_SECRET
npm start
```

On first run it has no session yet, so it will emit a `qr` event to the
webhook. Open the CRM admin's **WhatsApp Mirror** global
(`/admin/globals/whatsapp-session`) - the QR image appears there within a
few seconds. Scan it from the phone: **WhatsApp > Linked Devices > Link a
Device**. The phone app keeps working exactly as before; this is simply a
fourth linked device that only reads.

## Operating notes

- **Never send from this process.** No feature here composes or sends a
  message. If you're tempted to add one, that's a different, much riskier
  project - read the PRD's "Ban-risk posture" section first.
- **Heartbeat.** Posts every 60s regardless of connection state, so "the
  process died" is distinguishable from "still reconnecting". The CRM's
  `/api/cron/whatsapp-health` route alerts by email after 15 minutes of
  silence.
- **Logged out.** WhatsApp can unlink a device from the phone side at any
  time. When that happens this process clears its stored session and stops
  trying to reconnect - restart it to get a fresh QR.
- **Session storage.** Auth state lives in Postgres (`wa_auth_state` table,
  keyed by `WHATSAPP_SESSION_ID`), not on local disk, so redeploying the
  container never forces a re-scan.
- **Groups and broadcasts are ignored** by default - this mirrors 1:1 sales
  conversations only.

## Deploying

Any host that can run a persistent Node process works: a small Hetzner/Fly/
Railway VM, a systemd service, or a long-running container. Point
`CRM_WEBHOOK_URL` at the deployed app (not localhost) and make sure
`WHATSAPP_WEBHOOK_SECRET` matches the value set in the main app's Vercel
environment variables exactly.
