import type { GlobalConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';

export const DonateSettings: GlobalConfig = {
  slug: 'donate-settings',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isAdminOrEditor },
  fields: [
    {
      name: 'tiers',
      type: 'array',
      fields: [
        { name: 'amount', type: 'number', required: true },
        { name: 'label', type: 'text', localized: true },
        { name: 'impact', type: 'text', localized: true },
      ],
    },
    { name: 'monthlyEnabled', type: 'checkbox', defaultValue: true },
    {
      type: 'row',
      fields: [
        { name: 'minAmount', type: 'number', defaultValue: 5 },
        { name: 'maxAmount', type: 'number', defaultValue: 10000 },
      ],
    },
    {
      name: 'currencies',
      type: 'select',
      hasMany: true,
      defaultValue: ['usd', 'eur'],
      options: [
        { label: 'USD', value: 'usd' },
        { label: 'EUR', value: 'eur' },
      ],
    },
  ],
};
