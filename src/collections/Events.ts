import type { CollectionConfig } from 'payload';
import { isAdminOrEditor, publishedOrLoggedIn } from '@/access';
import { slugField } from '@/fields/slug';
import { requiredInEnglish } from '@/fields/validators';
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate';

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startsAt', '_status'],
    group: 'Content',
  },
  hooks: {
    afterChange: [revalidateCollection('events')],
    afterDelete: [revalidateCollectionDelete('events')],
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
      type: 'row',
      fields: [
        { name: 'startsAt', type: 'date', required: true },
        { name: 'endsAt', type: 'date' },
      ],
    },
    {
      name: 'timezone',
      type: 'text',
      defaultValue: 'Africa/Khartoum',
      admin: { description: 'IANA timezone, e.g. Africa/Khartoum or Europe/Paris.' },
    },
    { name: 'location', type: 'text', localized: true },
    { name: 'online', type: 'checkbox', defaultValue: false },
    { name: 'registrationUrl', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'body', type: 'richText', localized: true },
  ],
};
