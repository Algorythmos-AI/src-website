import type { CollectionConfig } from 'payload';
import { isAdminOrEditor, publishedOrLoggedIn } from '@/access';
import { slugField } from '@/fields/slug';
import { publicVideoUrl, requiredInEnglish } from '@/fields/validators';
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate';

/**
 * Photo galleries and public videos for the Media page. Public material only:
 * evidence videos are never stored or linked here.
 */
export const Galleries: CollectionConfig = {
  slug: 'galleries',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', '_status'],
    group: 'Content',
    description:
      'Photo galleries and YouTube/Vimeo videos shown on the Media page. Public material only.',
  },
  hooks: {
    afterChange: [revalidateCollection('galleries')],
    afterDelete: [revalidateCollectionDelete('galleries')],
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
      name: 'date',
      type: 'date',
      admin: { position: 'sidebar', description: 'Newest galleries are shown first.' },
    },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'images',
      type: 'array',
      labels: { singular: 'Photo', plural: 'Photos' },
      admin: { description: 'Upload photos to Media first (alt text is required).' },
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'videos',
      type: 'array',
      labels: { singular: 'Video', plural: 'Videos' },
      admin: { description: 'Public YouTube or Vimeo links only.' },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          validate: requiredInEnglish,
        },
        { name: 'url', type: 'text', required: true, validate: publicVideoUrl },
      ],
    },
  ],
};
