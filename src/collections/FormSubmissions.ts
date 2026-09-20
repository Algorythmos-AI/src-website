import type { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrEditor } from '@/access';

/**
 * Contact + newsletter submissions. Written only by server route handlers
 * (via the Local API with overrideAccess); never created through the public API.
 */
export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['type', 'email', 'subject', 'createdAt'],
    group: 'System',
  },
  access: {
    read: isAdminOrEditor,
    create: () => false,
    update: () => false,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Contact', value: 'contact' },
        { label: 'Newsletter', value: 'newsletter' },
      ],
    },
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'subject', type: 'text' },
    { name: 'message', type: 'textarea' },
    { name: 'locale', type: 'text' },
    {
      name: 'emailStatus',
      type: 'select',
      defaultValue: 'sent',
      options: [
        { label: 'Sent', value: 'sent' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    { name: 'ipHash', type: 'text', admin: { description: 'Salted hash of submitter IP.' } },
    { name: 'consentAt', type: 'date' },
  ],
};
