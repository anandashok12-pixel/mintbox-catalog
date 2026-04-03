import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 86400, // 24 hours
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
      domain: undefined,
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
