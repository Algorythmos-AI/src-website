import type { GlobalConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';

const navItems = {
  name: 'items',
  type: 'array' as const,
  fields: [
    { name: 'label', type: 'text' as const, localized: true, required: true },
    { name: 'url', type: 'text' as const, required: true },
  ],
};

export const Header: GlobalConfig = {
  slug: 'header',
  admin: { group: 'Navigation' },
  access: { read: anyone, update: isAdminOrEditor },
  fields: [navItems],
};

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: { group: 'Navigation' },
  access: { read: anyone, update: isAdminOrEditor },
  fields: [
    navItems,
    {
      name: 'legal',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true, required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
};
