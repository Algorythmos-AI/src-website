import type { CollectionConfig } from 'payload';
import { isAdminOrEditor, publishedOrLoggedIn } from '@/access';
import { slugField } from '@/fields/slug';
import { requiredInEnglish } from '@/fields/validators';

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tag', 'order', '_status'],
    group: 'Content',
  },
  versions: { drafts: { autosave: true }, maxPerDoc: 20 },
  access: {
    read: publishedOrLoggedIn,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true, validate: requiredInEnglish },
    slugField(),
    { name: 'tag', type: 'text', localized: true, admin: { description: 'Short category label.' } },
    { name: 'summary', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
  ],
};
