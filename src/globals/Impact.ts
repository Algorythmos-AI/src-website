import type { GlobalConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';

/** Single source of truth for impact stats + map pins (fixes the old duplicated,
 * conflicting numbers between the homepage and the Impact page). */
export const Impact: GlobalConfig = {
  slug: 'impact',
  admin: { group: 'Content' },
  access: { read: anyone, update: isAdminOrEditor },
  fields: [
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', localized: true, required: true },
        { name: 'description', type: 'text', localized: true },
      ],
    },
    {
      name: 'mapPins',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true, required: true },
        {
          type: 'row',
          fields: [
            { name: 'lat', type: 'number' },
            { name: 'lng', type: 'number' },
          ],
        },
        { name: 'note', type: 'text', localized: true },
      ],
    },
    {
      name: 'featuredStories',
      type: 'relationship',
      relationTo: 'stories',
      hasMany: true,
    },
  ],
};
