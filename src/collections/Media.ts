import type { CollectionConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';
import { requiredInEnglish } from '@/fields/validators';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Library' },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
      { name: 'hero', width: 1920 },
    ],
    formatOptions: {
      format: 'webp',
      options: { quality: 82 },
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      required: true,
      validate: requiredInEnglish,
      admin: { description: 'Describes the image for screen readers and SEO.' },
    },
    { name: 'caption', type: 'text', localized: true },
    { name: 'credit', type: 'text', admin: { description: 'Photographer / source attribution.' } },
  ],
};
