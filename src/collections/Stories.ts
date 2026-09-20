import type { CollectionConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';
import { requiredInEnglish } from '@/fields/validators';

export const Stories: CollectionConfig = {
  slug: 'stories',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'person', 'location'], group: 'Content' },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true, validate: requiredInEnglish },
    { name: 'quote', type: 'textarea', localized: true },
    { name: 'person', type: 'text' },
    { name: 'location', type: 'text', localized: true },
    { name: 'category', type: 'text', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
};
