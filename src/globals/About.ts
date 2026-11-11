import type { GlobalConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';
import { revalidateGlobal } from '@/hooks/revalidate';

/**
 * Editable "Mission, mandate and work" section on the About page. Every field
 * is optional: the section only appears once the SRC team has filled it in,
 * and the rest of the About page keeps its built-in copy.
 */
export const About: GlobalConfig = {
  slug: 'about',
  admin: { group: 'Content' },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateGlobal('about')] },
  fields: [
    {
      name: 'mission',
      type: 'richText',
      localized: true,
      admin: { description: 'What SRC exists to do (one or two short paragraphs).' },
    },
    {
      name: 'mandate',
      type: 'richText',
      localized: true,
      admin: { description: 'SRC’s formal mandate: who it serves, where, and on what basis.' },
    },
    {
      name: 'whatWeDo',
      label: 'What we do',
      type: 'array',
      admin: { description: 'Main areas of work, shown as cards.' },
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'text', type: 'textarea', localized: true },
      ],
    },
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
