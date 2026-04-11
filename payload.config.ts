import { buildConfig } from 'payload'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Categories } from './src/collections/Categories'
import { Products } from './src/collections/Products'
import { Leads } from './src/collections/Leads'
import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'
import { AboutPage } from './src/globals/AboutPage'
import { ContactPage } from './src/globals/ContactPage'
import { FAQPage } from './src/globals/FAQPage'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
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
  collections: [Categories, Products, Leads, Media, Users],
  globals: [AboutPage, ContactPage, FAQPage],
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
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      // Upload directly from browser to Vercel Blob, bypassing serverless 4.5MB limit
      clientUploads: true,
    }),
  ],
})
