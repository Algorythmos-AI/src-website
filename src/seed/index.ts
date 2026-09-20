import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload, type Where } from 'payload';
import config from '@payload-config';
import {
  categories,
  donateTiers,
  events,
  impactStats,
  leadership,
  partners,
  posts,
  pressReleases,
  programs,
  publications,
} from './data';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, '../../public');

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Minimal Payload Lexical document from a plain paragraph of text.
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

const daysFromNow = (days: number) => new Date(Date.now() + days * 86400000).toISOString();

async function run() {
  const payload = await getPayload({ config });
  const ctx = { context: { disableRevalidate: true } };

  // Upsert a document by a unique field; returns the id.
  async function upsert<T extends Record<string, unknown>>(
    collection: Parameters<typeof payload.find>[0]['collection'],
    where: Where,
    data: T
  ): Promise<string> {
    const existing = await payload.find({ collection, where, limit: 1, depth: 0 });
    if (existing.docs[0]) {
      const updated = await payload.update({
        collection,
        id: existing.docs[0].id,
        data,
        ...ctx,
      });
      return String(updated.id);
    }
    const created = await payload.create({ collection, data, ...ctx });
    return String(created.id);
  }

  payload.logger.info('Seeding programs (with imagery)…');
  for (const p of programs) {
    const image = await upsertRemoteMedia(p.image, `${p.title} — SRC program`);
    await upsert(
      'programs',
      { slug: { equals: slugify(p.title) } },
      {
        title: p.title,
        slug: slugify(p.title),
        tag: p.tag,
        summary: p.summary,
        order: p.order,
        _status: 'published',
        ...(image ? { image } : {}),
      }
    );
  }

  payload.logger.info('Seeding partners…');
  for (const p of partners) {
    await upsert('partners', { name: { equals: p.name } }, { name: p.name, order: p.order });
  }

  payload.logger.info('Seeding leadership (with photos)…');
  for (const m of leadership) {
    const photo = await upsertMedia(m.file, `Portrait of ${m.name}, ${m.role}`);
    await upsert(
      'team-members',
      { name: { equals: m.name } },
      {
        name: m.name,
        role: m.role,
        group: m.group,
        order: m.order,
        ...(photo ? { photo } : {}),
      }
    );
  }

  payload.logger.info('Seeding categories…');
  const categoryIds = new Map<string, string>();
  for (const c of categories) {
    const id = await upsert(
      'categories',
      { slug: { equals: slugify(c.title) } },
      { title: c.title, slug: slugify(c.title) }
    );
    categoryIds.set(c.title, id);
  }

  payload.logger.info('Seeding news posts…');
  for (const p of posts) {
    const categoryId = categoryIds.get(p.category);
    await upsert(
      'posts',
      { slug: { equals: slugify(p.title) } },
      {
        title: p.title,
        slug: slugify(p.title),
        excerpt: p.excerpt,
        body: lexical(p.body),
        publishedAt: daysFromNow(-p.daysAgo),
        _status: 'published',
        ...(categoryId ? { categories: [Number(categoryId)] } : {}),
      }
    );
  }

  payload.logger.info('Seeding events…');
  for (const e of events) {
    await upsert(
      'events',
      { slug: { equals: slugify(e.title) } },
      {
        title: e.title,
        slug: slugify(e.title),
        location: e.location,
        online: e.online,
        body: lexical(e.body),
        startsAt: daysFromNow(e.startInDays),
        endsAt: daysFromNow(e.startInDays + e.durationHours / 24),
        ...('registrationUrl' in e ? { registrationUrl: e.registrationUrl } : {}),
        _status: 'published',
      }
    );
  }

  payload.logger.info('Seeding press releases…');
  for (const r of pressReleases) {
    await upsert(
      'press-releases',
      { slug: { equals: slugify(r.title) } },
      {
        title: r.title,
        slug: slugify(r.title),
        body: lexical(r.body),
        contact: r.contact,
        date: daysFromNow(-r.daysAgo),
        _status: 'published',
      }
    );
  }

  payload.logger.info('Seeding publications…');
  for (const pub of publications) {
    await upsert(
      'publications',
      { slug: { equals: slugify(pub.title) } },
      {
        title: pub.title,
        slug: slugify(pub.title),
        type: pub.type,
        year: pub.year,
        summary: pub.summary,
        _status: 'published',
      }
    );
  }

  payload.logger.info('Seeding globals…');
  await payload.updateGlobal({
    slug: 'impact',
    data: { stats: impactStats.map((s) => ({ value: s.value, label: s.label })) },
    ...ctx,
  });
  await payload.updateGlobal({
    slug: 'donate-settings',
    data: { tiers: donateTiers, monthlyEnabled: true },
    ...ctx,
  });

  async function findMediaByAlt(alt: string): Promise<number | string | null> {
    const existing = await payload.find({
      collection: 'media',
      where: { alt: { equals: alt } },
      limit: 1,
      depth: 0,
    });
    const doc = existing.docs[0];
    if (!doc) return null;
    // If a previous seed stored this on local disk (url starts with /api/), and
    // Blob is now configured, delete it so it re-uploads to Blob.
    const url = (doc as { url?: string | null }).url ?? '';
    if (process.env.BLOB_READ_WRITE_TOKEN && url.startsWith('/api/')) {
      await payload.delete({ collection: 'media', id: doc.id, ...ctx }).catch(() => {});
      return null;
    }
    return doc.id;
  }

  async function upsertMedia(file: string, alt: string): Promise<number | string | null> {
    const found = await findMediaByAlt(alt);
    if (found) return found;
    try {
      const created = await payload.create({
        collection: 'media',
        data: { alt },
        filePath: path.join(publicDir, 'Our-Leadership', file),
        ...ctx,
      });
      return created.id;
    } catch (err) {
      payload.logger.warn(`Could not upload ${file}: ${(err as Error).message}`);
      return null;
    }
  }

  // Download a remote image (e.g. Unsplash) and store it in media with credit.
  async function upsertRemoteMedia(url: string, alt: string): Promise<number | string | null> {
    const found = await findMediaByAlt(alt);
    if (found) return found;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      const created = await payload.create({
        collection: 'media',
        data: { alt, credit: 'Unsplash' },
        file: {
          data: buffer,
          name: `${slugify(alt)}.jpg`,
          mimetype: res.headers.get('content-type') ?? 'image/jpeg',
          size: buffer.length,
        },
        ...ctx,
      });
      return created.id;
    } catch (err) {
      payload.logger.warn(`Could not fetch image ${url}: ${(err as Error).message}`);
      return null;
    }
  }

  payload.logger.info('Seed complete.');
}

// Top-level await so `payload run` waits for the async work to finish.
try {
  await run();
  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}
