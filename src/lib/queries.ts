import { unstable_cache } from 'next/cache';
import type { Where } from 'payload';
import type { Locale } from '@/i18n/routing';
import { getPayloadClient } from '@/lib/payload';
import type {
  Program,
  Partner,
  TeamMember,
  Impact,
  DonateSetting,
  Post,
  Event,
  PressRelease,
  Publication,
  Category,
} from '@/payload-types';

const FALLBACK = 'en';

// Bump to force-refresh every cached CMS read (e.g. after a media repair or seed
// that ran with revalidation disabled). unstable_cache is tag-only with no time
// revalidation, so it persists across deploys until the key or a tag changes.
const CACHE_VERSION = 'v9';

/** Published + not scheduled in the future. */
const visibleWhere = (dateField: string, now: string): Where => ({
  and: [
    { _status: { equals: 'published' } },
    {
      or: [{ [dateField]: { less_than_equal: now } }, { [dateField]: { exists: false } }],
    },
  ],
});

/**
 * Wrap a Local API read in unstable_cache, keyed by locale and tagged so the
 * afterChange hooks can revalidate it. Fallback locale fills missing fr/ar
 * fields from English.
 */
function cached<T>(fn: (locale: Locale) => Promise<T>, keyBase: string, tag: string) {
  return (locale: Locale): Promise<T> =>
    unstable_cache(() => fn(locale), [CACHE_VERSION, keyBase, locale], { tags: [tag] })();
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
    [CACHE_VERSION, 'program', slug, locale],
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

// ─── News (posts) ────────────────────────────────────────────────────────────

const PAGE_SIZE = 9;

export type PostList = {
  docs: Post[];
  page: number;
  totalPages: number;
  totalDocs: number;
};

export function getPosts(
  locale: Locale,
  opts: { page?: number; categorySlug?: string } = {}
): Promise<PostList> {
  const page = opts.page && opts.page > 0 ? opts.page : 1;
  const category = opts.categorySlug ?? 'all';
  return unstable_cache(
    async () => {
      const payload = await getPayloadClient();
      const now = new Date().toISOString();
      const and: Where[] = [visibleWhere('publishedAt', now)];
      if (opts.categorySlug) {
        and.push({ 'categories.slug': { equals: opts.categorySlug } });
      }
      const res = await payload.find({
        collection: 'posts',
        locale,
        fallbackLocale: FALLBACK,
        where: { and },
        sort: '-publishedAt',
        depth: 1,
        page,
        limit: PAGE_SIZE,
      });
      return {
        docs: res.docs,
        page: res.page ?? 1,
        totalPages: res.totalPages,
        totalDocs: res.totalDocs,
      };
    },
    [CACHE_VERSION, 'posts', locale, category, String(page)],
    { tags: ['posts'] }
  )();
}

export async function getPostSlugs(): Promise<string[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    depth: 0,
    limit: 500,
    pagination: false,
  });
  return res.docs.map((d) => d.slug).filter((s): s is string => Boolean(s));
}

export function getPostBySlug(slug: string, locale: Locale): Promise<Post | null> {
  return unstable_cache(
    async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: 'posts',
        locale,
        fallbackLocale: FALLBACK,
        where: { slug: { equals: slug }, _status: { equals: 'published' } },
        depth: 2,
        limit: 1,
      });
      return res.docs[0] ?? null;
    },
    [CACHE_VERSION, 'post', slug, locale],
    { tags: ['posts'] }
  )();
}

export const getCategories = cached<Category[]>(
  async (locale) => {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'categories',
      locale,
      fallbackLocale: FALLBACK,
      sort: 'title',
      depth: 0,
      limit: 100,
    });
    return res.docs;
  },
  'categories',
  'posts'
);

// ─── Events ──────────────────────────────────────────────────────────────────

export function getEvents(locale: Locale, when: 'upcoming' | 'past'): Promise<Event[]> {
  return unstable_cache(
    async () => {
      const payload = await getPayloadClient();
      const now = new Date().toISOString();
      const res = await payload.find({
        collection: 'events',
        locale,
        fallbackLocale: FALLBACK,
        where: {
          and: [
            { _status: { equals: 'published' } },
            when === 'upcoming'
              ? { startsAt: { greater_than_equal: now } }
              : { startsAt: { less_than: now } },
          ],
        },
        sort: when === 'upcoming' ? 'startsAt' : '-startsAt',
        depth: 1,
        limit: 100,
      });
      return res.docs;
    },
    [CACHE_VERSION, 'events', locale, when],
    { tags: ['events'] }
  )();
}

export async function getEventSlugs(): Promise<string[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: 'events',
    where: { _status: { equals: 'published' } },
    depth: 0,
    limit: 500,
    pagination: false,
  });
  return res.docs.map((d) => d.slug).filter((s): s is string => Boolean(s));
}

export function getEventBySlug(slug: string, locale: Locale): Promise<Event | null> {
  return unstable_cache(
    async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: 'events',
        locale,
        fallbackLocale: FALLBACK,
        where: { slug: { equals: slug }, _status: { equals: 'published' } },
        depth: 1,
        limit: 1,
      });
      return res.docs[0] ?? null;
    },
    [CACHE_VERSION, 'event', slug, locale],
    { tags: ['events'] }
  )();
}

// ─── Press releases ──────────────────────────────────────────────────────────

export const getPressReleases = cached<PressRelease[]>(
  async (locale) => {
    const payload = await getPayloadClient();
    const now = new Date().toISOString();
    const res = await payload.find({
      collection: 'press-releases',
      locale,
      fallbackLocale: FALLBACK,
      where: visibleWhere('date', now),
      sort: '-date',
      depth: 1,
      limit: 100,
    });
    return res.docs;
  },
  'press-releases',
  'press-releases'
);

export async function getPressSlugs(): Promise<string[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: 'press-releases',
    where: { _status: { equals: 'published' } },
    depth: 0,
    limit: 500,
    pagination: false,
  });
  return res.docs.map((d) => d.slug).filter((s): s is string => Boolean(s));
}

export function getPressBySlug(slug: string, locale: Locale): Promise<PressRelease | null> {
  return unstable_cache(
    async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: 'press-releases',
        locale,
        fallbackLocale: FALLBACK,
        where: { slug: { equals: slug }, _status: { equals: 'published' } },
        depth: 1,
        limit: 1,
      });
      return res.docs[0] ?? null;
    },
    [CACHE_VERSION, 'press', slug, locale],
    { tags: ['press-releases'] }
  )();
}

// ─── Publications ────────────────────────────────────────────────────────────

export const getPublications = cached<Publication[]>(
  async (locale) => {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'publications',
      locale,
      fallbackLocale: FALLBACK,
      where: { _status: { equals: 'published' } },
      sort: '-year',
      depth: 1,
      limit: 100,
    });
    return res.docs;
  },
  'publications',
  'publications'
);
