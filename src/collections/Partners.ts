import type { CollectionConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'order'], group: 'Content' },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'url', type: 'text' },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
};
