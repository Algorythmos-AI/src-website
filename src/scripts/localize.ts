import { getPayload } from 'payload';
import config from '@payload-config';
import {
  programTranslations,
  statTranslations,
  tierTranslations,
  roleTranslations,
  categoryTranslations,
  postTranslations,
  eventTranslations,
  pressTranslations,
  publicationTranslations,
} from '@/seed/translations';

/** Minimal Payload Lexical document from a plain paragraph (mirrors the seed). */
const lexical = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        children: [
          { type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 },
        ],
      },
    ],
  },
});

/**
 * Fill the French and Arabic locales of the seeded CMS content (programs, impact
 * stats, donate tiers, team roles, categories). English is the source of truth
 * and is never touched. By default a locale field is written only when it is
 * currently empty, so editor translations are preserved; SEED_FORCE=1 overrides.
 * SEED_DRY_RUN=1 reports the planned writes without applying them.
 *
 * Run: `npm run seed:i18n` (local) or, against prod:
 *   set -a; . ./.env.local; set +a;
 *   POSTGRES_URL="$POSTGRES_URL_NON_POOLING" npx payload run src/scripts/localize.ts
 */

const LOCALES = ['fr', 'ar'] as const;
const FORCE = process.env.SEED_FORCE === '1';
const DRY = process.env.SEED_DRY_RUN === '1';

const isEmpty = (v: unknown) => v == null || String(v).trim() === '';

async function run() {
  const payload = await getPayload({ config });
  const ctx = { context: { disableRevalidate: true } } as const;
  let writes = 0;
  const log = (msg: string) => payload.logger.info(`${DRY ? '[dry] ' : ''}${msg}`);

  for (const locale of LOCALES) {
    // --- Programs (title, tag, summary) ---
    const programs = await payload.find({
      collection: 'programs',
      locale,
      fallbackLocale: false,
      depth: 0,
      limit: 100,
    });
    for (const doc of programs.docs) {
      const slug = (doc as { slug?: string }).slug ?? '';
      const tr = programTranslations[slug]?.[locale];
      if (!tr) continue;
      if (!FORCE && !isEmpty((doc as { title?: string }).title)) continue;
      writes++;
      log(`programs/${slug} [${locale}] ← ${tr.title}`);
      if (!DRY)
        await payload.update({
          collection: 'programs',
          id: doc.id,
          locale,
          // Programs use drafts; publish so the translated fields land in the
          // published version the frontend reads (not just the draft snapshot).
          data: { title: tr.title, tag: tr.tag, summary: tr.summary, _status: 'published' },
          ...ctx,
        });
    }

    // --- Team-member roles (keyed by the English role) ---
    const team = await payload.find({
      collection: 'team-members',
      locale,
      fallbackLocale: false,
      depth: 0,
      limit: 100,
    });
    const teamEn = await payload.find({
      collection: 'team-members',
      locale: 'en',
      fallbackLocale: false,
      depth: 0,
      limit: 100,
    });
    for (const en of teamEn.docs) {
      const enRole = (en as { role?: string }).role ?? '';
      const tr = roleTranslations[enRole]?.[locale];
      if (!tr) continue;
      const current = team.docs.find((d) => d.id === en.id) as { role?: string } | undefined;
      if (!FORCE && current && !isEmpty(current.role)) continue;
      writes++;
      log(`team-members/${(en as { name?: string }).name} [${locale}] ← ${tr}`);
      if (!DRY)
        await payload.update({
          collection: 'team-members',
          id: en.id,
          locale,
          draft: false,
          data: { role: tr },
          ...ctx,
        });
    }

    // --- Categories (title, matched by slug) ---
    const catsFr = await payload.find({
      collection: 'categories',
      locale,
      fallbackLocale: false,
      depth: 0,
      limit: 100,
    });
    for (const doc of catsFr.docs) {
      const slug = (doc as { slug?: string }).slug ?? '';
      const tr = categoryTranslations[slug]?.[locale];
      if (!tr) continue;
      if (!FORCE && !isEmpty((doc as { title?: string }).title)) continue;
      writes++;
      log(`categories/${slug} [${locale}] ← ${tr}`);
      if (!DRY)
        await payload.update({
          collection: 'categories',
          id: doc.id,
          locale,
          draft: false,
          data: { title: tr },
          ...ctx,
        });
    }

    // --- News content (drafts collections; publish so the frontend sees it) ---
    const newsCollections = [
      {
        collection: 'posts' as const,
        map: postTranslations,
        data: (tr: { title: string; excerpt: string; body: string }) => ({
          title: tr.title,
          excerpt: tr.excerpt,
          body: lexical(tr.body),
        }),
      },
      {
        collection: 'events' as const,
        map: eventTranslations,
        data: (tr: { title: string; location: string; body: string }) => ({
          title: tr.title,
          location: tr.location,
          body: lexical(tr.body),
        }),
      },
      {
        collection: 'press-releases' as const,
        map: pressTranslations,
        data: (tr: { title: string; body: string }) => ({
          title: tr.title,
          body: lexical(tr.body),
        }),
      },
      {
        collection: 'publications' as const,
        map: publicationTranslations,
        data: (tr: { title: string; summary: string }) => ({
          title: tr.title,
          summary: tr.summary,
        }),
      },
    ];
    for (const { collection, map, data } of newsCollections) {
      const docs = await payload.find({
        collection,
        locale,
        fallbackLocale: false,
        depth: 0,
        limit: 100,
      });
      for (const doc of docs.docs) {
        const slug = (doc as { slug?: string }).slug ?? '';
        const tr = (map as Record<string, { fr: unknown; ar: unknown }>)[slug]?.[locale] as
          Record<string, string> | undefined;
        if (!tr) continue;
        if (!FORCE && !isEmpty((doc as { title?: string }).title)) continue;
        writes++;
        log(`${collection}/${slug} [${locale}] ← ${tr.title}`);
        if (!DRY)
          await payload.update({
            collection,
            id: doc.id,
            locale,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: { ...(data(tr as any) as Record<string, unknown>), _status: 'published' },
            ...ctx,
          });
      }
    }

    // --- Impact global stats (label; array rows preserved by id) ---
    const impactEn = await payload.findGlobal({ slug: 'impact', locale: 'en', depth: 0 });
    const impactLoc = await payload.findGlobal({
      slug: 'impact',
      locale,
      fallbackLocale: false,
      depth: 0,
    });
    const enStats = (impactEn as { stats?: Array<Record<string, unknown>> }).stats ?? [];
    const locStats = (impactLoc as { stats?: Array<Record<string, unknown>> }).stats ?? [];
    if (enStats.length) {
      let changed = false;
      const stats = enStats.map((s) => {
        const cur = locStats.find((l) => l.id === s.id) as { label?: string } | undefined;
        const enLabel = String(s.label ?? '');
        let label = cur?.label;
        if ((FORCE || isEmpty(label)) && statTranslations[enLabel]) {
          label = statTranslations[enLabel][locale];
          changed = true;
        }
        return { id: String(s.id), value: String(s.value ?? ''), label: label ?? enLabel };
      });
      if (changed) {
        writes++;
        log(`global:impact.stats [${locale}] (${stats.length} rows)`);
        if (!DRY) await payload.updateGlobal({ slug: 'impact', locale, data: { stats }, ...ctx });
      }
    }

    // --- Donate-settings tiers (label, impact) ---
    const donEn = await payload.findGlobal({ slug: 'donate-settings', locale: 'en', depth: 0 });
    const donLoc = await payload.findGlobal({
      slug: 'donate-settings',
      locale,
      fallbackLocale: false,
      depth: 0,
    });
    const enTiers = (donEn as { tiers?: Array<Record<string, unknown>> }).tiers ?? [];
    const locTiers = (donLoc as { tiers?: Array<Record<string, unknown>> }).tiers ?? [];
    if (enTiers.length) {
      let changed = false;
      const tiers = enTiers.map((tItem) => {
        const cur = locTiers.find((l) => l.id === tItem.id) as
          { label?: string; impact?: string } | undefined;
        const amount = Number(tItem.amount);
        const tr = tierTranslations[amount]?.[locale];
        let label = cur?.label;
        let impact = cur?.impact;
        if (tr && (FORCE || isEmpty(label))) {
          label = tr.label;
          changed = true;
        }
        if (tr && (FORCE || isEmpty(impact))) {
          impact = tr.impact;
          changed = true;
        }
        return { id: String(tItem.id), amount: Number(tItem.amount), label, impact };
      });
      if (changed) {
        writes++;
        log(`global:donate-settings.tiers [${locale}] (${tiers.length} rows)`);
        if (!DRY)
          await payload.updateGlobal({ slug: 'donate-settings', locale, data: { tiers }, ...ctx });
      }
    }
  }

  payload.logger.info(
    `localize: ${writes} field-group${writes === 1 ? '' : 's'} ${DRY ? 'to write (dry run)' : 'written'}.`
  );
  process.exit(0);
}

try {
  await run();
} catch (err) {
  console.error(err);
  process.exit(1);
}
