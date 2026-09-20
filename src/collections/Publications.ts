import type { CollectionConfig } from 'payload';
import { isAdminOrEditor, publishedOrLoggedIn } from '@/access';
import { slugField } from '@/fields/slug';
import { requiredInEnglish } from '@/fields/validators';

export const Publications: CollectionConfig = {
  slug: 'publications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'year', '_status'],
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
    {
      name: 'type',
      type: 'select',
      defaultValue: 'report',
      options: [
        { label: 'Annual Report', value: 'annual-report' },
        { label: 'Report', value: 'report' },
        { label: 'Brief', value: 'brief' },
      ],
    },
    { name: 'year', type: 'number' },
    { name: 'summary', type: 'textarea', localized: true },
    { name: 'file', type: 'upload', relationTo: 'documents' },
    { name: 'cover', type: 'upload', relationTo: 'media' },
  ],
};
