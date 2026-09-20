import type { GlobalConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';

export const Home: GlobalConfig = {
  slug: 'home',
  admin: { group: 'Content' },
  access: { read: anyone, update: isAdminOrEditor },
  fields: [
    {
      type: 'group',
      name: 'hero',
      fields: [
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'heading', type: 'text', localized: true },
        { name: 'body', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'videoUrl', type: 'text' },
      ],
    },
    { name: 'mission', type: 'textarea', localized: true },
    {
      name: 'featuredPrograms',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: true,
    },
  ],
};
