import type { GlobalConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isAdminOrEditor },
  fields: [
    {
      type: 'group',
      name: 'contact',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'hq', type: 'text', localized: true },
        { name: 'field', type: 'text', localized: true },
      ],
    },
    {
      type: 'group',
      name: 'social',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'linkedin', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'defaultSeo',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
};
