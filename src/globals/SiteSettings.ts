import type { GlobalConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';
import { optionalHttpsUrl } from '@/fields/validators';
import { revalidateGlobal } from '@/hooks/revalidate';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateGlobal('site-settings')] },
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
        // Full profile URLs. Empty fields are hidden in the site footer.
        { name: 'facebook', type: 'text', validate: optionalHttpsUrl },
        { name: 'twitter', label: 'X (Twitter)', type: 'text', validate: optionalHttpsUrl },
        { name: 'instagram', type: 'text', validate: optionalHttpsUrl },
        { name: 'linkedin', type: 'text', validate: optionalHttpsUrl },
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
