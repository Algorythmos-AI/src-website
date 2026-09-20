import type { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrEditor } from '@/access';

/** Double opt-in newsletter subscribers. Written only by server handlers. */
export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'locale', 'confirmedAt'],
    group: 'System',
  },
  access: {
    read: isAdminOrEditor,
    create: () => false,
    update: () => false,
    delete: isAdmin,
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true },
    { name: 'locale', type: 'text' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
    },
    {
      name: 'tokenHash',
      type: 'text',
      admin: { description: 'Hashed confirm/unsubscribe token.' },
    },
    { name: 'confirmedAt', type: 'date' },
  ],
};
