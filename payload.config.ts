import { buildConfig } from 'payload'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Categories } from './src/collections/Categories'
import { Products } from './src/collections/Products'
import { Leads } from './src/collections/Leads'
import { Contacts } from './src/collections/Contacts'
import { Deals } from './src/collections/Deals'
import { Messages } from './src/collections/Messages'
import { Activities } from './src/collections/Activities'
import { Tasks } from './src/collections/Tasks'
import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'
import { AboutPage } from './src/globals/AboutPage'
import { ContactPage } from './src/globals/ContactPage'
import { FAQPage } from './src/globals/FAQPage'
import { WhatsappSession } from './src/globals/WhatsappSession'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const serverURL = (process.env.NEXT_PUBLIC_URL || 'http://localhost:3000').replace(/\/$/, '')
const crmAppURL = (
  process.env.CRM_APP_URL ||
  process.env.NEXT_PUBLIC_CRM_APP_URL ||
  'http://localhost:3001'
).replace(/\/$/, '')

export default buildConfig({
  serverURL,
  // The CRM is a separate browser app. It authenticates with Payload's JWT
  // and sends it as an Authorization: Bearer header, so CSRF cookie checks do
  // not participate; CORS only needs to admit the CRM's deployment origin.
  cors: [serverURL, crmAppURL],
  // Payload's cookie-auth strategy checks the request's Origin against this
  // list for any state-changing request (POST/PATCH/DELETE) - GET requests
  // aren't gated the same way, which is why this only bites you on writes.
  // .env.local here is pulled from Vercel and carries the production
  // NEXT_PUBLIC_URL, so serverURL above resolves to themintbox.in even
  // when running locally - without this, a real logged-in session can read
  // the admin fine but every write silently 403s in local dev.
  csrf: [serverURL, 'http://localhost:3000'],
  sharp,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      views: {
        dashboard: {
          Component: '@/components/AdminDashboard#AdminDashboard',
        },
      },
    },
  },
  collections: [Categories, Products, Leads, Contacts, Deals, Messages, Activities, Tasks, Media, Users],
  globals: [AboutPage, ContactPage, FAQPage, WhatsappSession],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
      // Neon free tier allows ~100 connections. Serverless functions each spin up
      // their own node process, so cap pool size to prevent exhaustion under
      // concurrent cold starts (main cause of 503s on RSC fetches).
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    },
    // Auto-push schema to DB on startup (creates tables if they don't exist)
    push: true,
    // wa_auth_state is created directly by whatsapp-worker/src/db.ts, outside
    // Payload's schema. Without this, drizzle-kit sees it as an unrecognized
    // table on every push and, whenever a new Payload collection/table is
    // added, can't tell "create the new table" from "rename wa_auth_state to
    // it" - it prompts interactively to disambiguate, which hangs forever in
    // a non-interactive dev server (no TTY to answer the prompt).
    tablesFilter: ['!wa_auth_state'],
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: {
          // Serve media straight from the public Blob CDN instead of proxying
          // every request through /api/media/file/... (a serverless function
          // that does a blob head() + fetch() + stream per image, ~1-2.5s
          // each). With 200+ product images per page that exceeded Googlebot's
          // render budget and the tail of the page failed with "Other error"
          // in Search Console. Media has public read access anyway.
          disablePayloadAccessControl: true,
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      // Upload directly from browser to Vercel Blob, bypassing serverless 4.5MB limit
      clientUploads: true,
    }),
  ],
})
