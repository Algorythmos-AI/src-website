import type { GlobalConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';

export const About: GlobalConfig = {
  slug: 'about',
  admin: { group: 'Content' },
  access: { read: anyone, update: isAdminOrEditor },
  fields: [
    { name: 'mission', type: 'richText', localized: true },
    {
      name: 'values',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'text', type: 'textarea', localized: true },
      ],
    },
  ],
};
