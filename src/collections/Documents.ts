import type { CollectionConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';
import { requiredInEnglish } from '@/fields/validators';

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: { group: 'Library', useAsTitle: 'title' },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  upload: {
    mimeTypes: ['application/pdf'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      validate: requiredInEnglish,
    },
    {
      name: 'language',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
        { label: 'Arabic', value: 'ar' },
      ],
    },
  ],
};
