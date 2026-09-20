import type { Field } from 'payload';

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * A non-localized slug generated from a source field (default: `title`) when
 * empty. One slug per document keeps hreflang and routing simple. Indexed +
 * unique.
 */
export const slugField = (source = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'URL-safe identifier. Auto-generated from the title if left blank.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.length > 0) return slugify(value);
        const source_value = data?.[source];
        if (typeof source_value === 'string' && source_value.length > 0) {
          return slugify(source_value);
        }
        return value;
      },
    ],
  },
});
