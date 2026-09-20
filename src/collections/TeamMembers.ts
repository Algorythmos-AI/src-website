import type { CollectionConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate';

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'group', 'order'],
    group: 'Content',
  },
  hooks: {
    afterChange: [revalidateCollection('team-members')],
    afterDelete: [revalidateCollectionDelete('team-members')],
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', localized: true },
    { name: 'bio', type: 'textarea', localized: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    {
      name: 'group',
      type: 'select',
      defaultValue: 'leadership',
      options: [
        { label: 'Leadership', value: 'leadership' },
        { label: 'Staff', value: 'staff' },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
};
