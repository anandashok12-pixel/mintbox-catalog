# MintBox CRM app

This is the standalone UI for MintBox CRM. Payload remains the only data layer and continues to own the `contacts`, `deals`, `messages`, and `activities` collections.

## Local development

Create `crm-app/.env.local`:

```env
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
```

Run the catalog/Payload app on port 3000, then from this directory run:

```bash
npm install
npm run dev
```

The CRM runs at `http://localhost:3001`. It signs in through Payload's `/api/users/login`, keeps the returned JWT in `sessionStorage`, and sends it as an RFC 6750 Bearer token on every REST request. It never uses Payload's auth cookie.

## Independent Vercel deployment

Create a second Vercel project from this repository with **Root Directory** set to `crm-app`. Add:

```env
NEXT_PUBLIC_PAYLOAD_URL=https://themintbox.in
```

On the catalog/Payload Vercel project, add the deployed CRM origin as `CRM_APP_URL` and `NEXT_PUBLIC_CRM_APP_URL`, for example `https://crm.themintbox.in`. The first variable allows cross-origin REST requests; the second makes the Payload dashboard's CRM link point to the standalone app.

No database variables belong in the CRM deployment.
