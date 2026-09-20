import type { CollectionConfig } from 'payload';
import { isAdminOrEditor, publishedOrLoggedIn } from '@/access';
import { slugField } from '@/fields/slug';
import { requiredInEnglish } from '@/fields/validators';
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate';

export const PressReleases: CollectionConfig = {
  slug: 'press-releases',
  labels: { singular: 'Press Release', plural: 'Press' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', '_status'],
    group: 'Content',
  },
  hooks: {
    afterChange: [revalidateCollection('press-releases')],
    afterDelete: [revalidateCollectionDelete('press-releases')],
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
    { name: 'date', type: 'date', required: true },
    { name: 'body', type: 'richText', localized: true },
    { name: 'attachment', type: 'upload', relationTo: 'documents' },
    { name: 'contact', type: 'text', admin: { description: 'Press contact email or name.' } },
  ],
};
