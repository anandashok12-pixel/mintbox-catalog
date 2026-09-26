import { VercelBlobClientUploadHandler } from '@payloadcms/storage-vercel-blob/client'
import { AdminDashboard } from '@/components/AdminDashboard'
import { QueueView } from '@/components/QueueView'
import { BoardView } from '@/components/BoardView'
import type { ImportMap } from 'payload'

export const importMap: ImportMap = {
  '@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler':
    VercelBlobClientUploadHandler,
  '@/components/AdminDashboard#AdminDashboard': AdminDashboard,
  '@/components/QueueView#QueueView': QueueView,
  '@/components/BoardView#BoardView': BoardView,
}
