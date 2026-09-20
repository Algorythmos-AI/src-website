import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload, type Where } from 'payload';
import config from '@payload-config';
import { donateTiers, impactStats, leadership, partners, programs } from './data';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, '../../public');

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

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

  payload.logger.info('Seeding programs…');
  for (const p of programs) {
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

  async function upsertMedia(file: string, alt: string): Promise<number | string | null> {
    const existing = await payload.find({
      collection: 'media',
      where: { alt: { equals: alt } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs[0]) return existing.docs[0].id;
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
