import type { CollectionConfig } from 'payload';
import { isAdmin } from '@/access';

/** Donation records. Written only by the Stripe webhook (overrideAccess). */
export const Donations: CollectionConfig = {
  slug: 'donations',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'amount', 'currency', 'mode', 'status', 'createdAt'],
    group: 'System',
  },
  access: {
    read: isAdmin,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'stripeSessionId', type: 'text', required: true, unique: true, index: true },
    { name: 'stripeCustomerId', type: 'text' },
    { name: 'subscriptionId', type: 'text' },
    {
      name: 'stripeEventIds',
      type: 'json',
      admin: { description: 'Processed Stripe event ids, for idempotency.' },
    },
    { name: 'amount', type: 'number', admin: { description: 'Amount in minor units (cents).' } },
    { name: 'currency', type: 'text' },
    {
      name: 'mode',
      type: 'select',
      options: [
        { label: 'One-time', value: 'one-time' },
        { label: 'Monthly', value: 'monthly' },
      ],
    },
    { name: 'status', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'name', type: 'text' },
    { name: 'locale', type: 'text' },
  ],
};
