import type { CollectionConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';
import { slugField } from '@/fields/slug';
import { requiredInEnglish } from '@/fields/validators';

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: { useAsTitle: 'title', group: 'Content' },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true, validate: requiredInEnglish },
    slugField(),
  ],
};
