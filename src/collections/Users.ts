import type { CollectionConfig } from 'payload';
import { isAdmin, isAdminField, isAdminOrEditor } from '@/access';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 2 * 60 * 60,
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Admin',
  },
  access: {
    admin: isAdminOrEditor,
    read: isAdminOrEditor,
    create: isAdmin,
    update: ({ req: { user }, id }) => user?.role === 'admin' || user?.id === id,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        // Only admins may change roles (prevents privilege escalation).
        update: isAdminField,
      },
    },
  ],
};
