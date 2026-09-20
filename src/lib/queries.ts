import { unstable_cache } from 'next/cache';
import type { Locale } from '@/i18n/routing';
import { getPayloadClient } from '@/lib/payload';
import type { Program, Partner, TeamMember, Impact, DonateSetting } from '@/payload-types';

const FALLBACK = 'en';

/**
 * Wrap a Local API read in unstable_cache, keyed by locale and tagged so the
 * afterChange hooks can revalidate it. Fallback locale fills missing fr/ar
 * fields from English.
 */
function cached<T>(fn: (locale: Locale) => Promise<T>, keyBase: string, tag: string) {
  return (locale: Locale): Promise<T> =>
    unstable_cache(() => fn(locale), [keyBase, locale], { tags: [tag] })();
}

export const getPrograms = cached<Program[]>(
  async (locale) => {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'programs',
      locale,
      fallbackLocale: FALLBACK,
      where: { _status: { equals: 'published' } },
      sort: 'order',
      depth: 1,
      limit: 100,
    });
    return res.docs;
  },
  'programs',
  'programs'
);

export async function getProgramSlugs(): Promise<string[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: 'programs',
    where: { _status: { equals: 'published' } },
    depth: 0,
    limit: 200,
    pagination: false,
  });
  return res.docs.map((d) => d.slug).filter((s): s is string => Boolean(s));
}

export function getProgramBySlug(slug: string, locale: Locale): Promise<Program | null> {
  return unstable_cache(
    async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: 'programs',
        locale,
        fallbackLocale: FALLBACK,
        where: { slug: { equals: slug }, _status: { equals: 'published' } },
        depth: 1,
        limit: 1,
      });
      return res.docs[0] ?? null;
    },
    ['program', slug, locale],
    { tags: ['programs'] }
  )();
}

export const getPartners = cached<Partner[]>(
  async () => {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'partners',
      sort: 'order',
      depth: 1,
      limit: 100,
    });
    return res.docs;
  },
  'partners',
  'partners'
);

export const getLeadership = cached<TeamMember[]>(
  async (locale) => {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'team-members',
      locale,
      fallbackLocale: FALLBACK,
      where: { group: { equals: 'leadership' } },
      sort: 'order',
      depth: 1,
      limit: 100,
    });
    return res.docs;
  },
  'leadership',
  'team-members'
);

export const getImpact = cached<Impact>(
  async (locale) => {
    const payload = await getPayloadClient();
    return payload.findGlobal({ slug: 'impact', locale, fallbackLocale: FALLBACK, depth: 1 });
  },
  'impact',
  'impact'
);

export const getDonateSettings = cached<DonateSetting>(
  async (locale) => {
    const payload = await getPayloadClient();
    return payload.findGlobal({
      slug: 'donate-settings',
      locale,
      fallbackLocale: FALLBACK,
      depth: 0,
    });
  },
  'donate-settings',
  'donate-settings'
);
