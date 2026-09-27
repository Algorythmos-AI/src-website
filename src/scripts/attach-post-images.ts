import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { put } from '@vercel/blob';
import pg from 'pg';

/**
 * Attach the three provided images in public/images/ to the seeded news posts
 * as their heroImage. Uses the same "bypass Payload uploads" approach as
 * repair-media: convert to WebP with sharp, put directly to Blob, then set the
 * media row + posts.hero_image_id + the _posts_v version snapshot via SQL.
 *
 * Run: `set -a; . ./.env.local; set +a; POSTGRES_URL="$POSTGRES_URL_NON_POOLING"
 *   npx tsx src/scripts/attach-post-images.ts`
 */

const dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(dirname, '../../public/images');
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN!;
const DB = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL!;
const STAMP = `p${Date.now().toString(36)}`;

// slug -> (file, alt en, alt fr, alt ar, credit)
const ASSIGNMENTS: Array<{
  slug: string;
  file: string;
  altEn: string;
  altFr: string;
  altAr: string;
  credit: string;
}> = [
  {
    slug: 'new-water-points-reach-three-villages-in-north-darfur',
    file: 'water.png',
    altEn: 'Women collecting water at a new solar-powered borehole in North Darfur',
    altFr: 'Des femmes puisent de l’eau à un nouveau forage solaire au Darfour du Nord',
    altAr: 'نساء يجمعن المياه من بئر جديد يعمل بالطاقة الشمسية في شمال دارفور',
    credit: 'SRC field team',
  },
  {
    slug: 'src-joins-the-sudan-education-coalition',
    file: 'edu.png',
    altEn: 'Students raising their hands in a rural Sudanese classroom during an Arabic lesson',
    altFr:
      'Des élèves lèvent la main dans une salle de classe rurale soudanaise pendant un cours d’arabe',
    altAr: 'طلاب يرفعون أيديهم في فصل دراسي ريفي بالسودان خلال حصة اللغة العربية',
    credit: 'SRC field team',
  },
  {
    slug: 'quarterly-impact-report-now-available',
    file: 'report-src.png',
    altEn: 'Cover of the SRC Q3 2026 Quarterly Impact Report',
    altFr: 'Couverture du Rapport d’impact trimestriel Q3 2026 de SRC',
    altAr: 'غلاف تقرير الأثر الربع سنوي Q3 2026 لجمعية المجتمع الريفي السوداني',
    credit: 'SRC',
  },
];

async function verify(url: string, tries = 5): Promise<boolean> {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { Range: 'bytes=0-0' } });
      if (r.status >= 200 && r.status < 400) return true;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
  }
  return false;
}

async function run() {
  const client = new pg.Client({ connectionString: DB });
  await client.connect();

  for (const a of ASSIGNMENTS) {
    const src = fs.readFileSync(path.join(imagesDir, a.file));
    const { data, info } = await sharp(src)
      .rotate()
      .webp({ quality: 85 })
      .toBuffer({ resolveWithObject: true });

    const filename = `post-${a.slug}-${STAMP}.webp`;
    const blob = await put(filename, data, {
      access: 'public',
      token: TOKEN,
      addRandomSuffix: false,
      contentType: 'image/webp',
    });
    if (!(await verify(blob.url))) throw new Error(`upload did not verify: ${blob.url}`);

    // 1) Create the media row.
    const mediaRes = await client.query<{ id: number }>(
      `insert into media (url, filename, mime_type, filesize, width, height, credit, updated_at, created_at)
       values ($1, $2, 'image/webp', $3, $4, $5, $6, now(), now()) returning id`,
      [blob.url, filename, data.length, info.width, info.height, a.credit]
    );
    const mediaId = mediaRes.rows[0].id;

    // 2) Alt is localized (media_locales). Seed English required + fr/ar.
    for (const [locale, alt] of [
      ['en', a.altEn],
      ['fr', a.altFr],
      ['ar', a.altAr],
    ] as const) {
      await client.query(
        `insert into media_locales (_locale, alt, _parent_id) values ($1, $2, $3)`,
        [locale, alt, mediaId]
      );
    }

    // 3) Point the post + its published version snapshot at the new media.
    const postRes = await client.query<{ id: number }>(
      `update posts set hero_image_id=$1, updated_at=now() where slug=$2 returning id`,
      [mediaId, a.slug]
    );
    const postId = postRes.rows[0]?.id;
    if (!postId) throw new Error(`post not found for slug=${a.slug}`);

    // Update every version row for this post so the published snapshot,
    // the latest draft, and any autosave all reference the new hero.
    await client.query(
      `update _posts_v set version_hero_image_id=$1, updated_at=now() where parent_id=$2`,
      [mediaId, postId]
    );

    console.log(`OK ${a.slug} → media id=${mediaId} → ${blob.url}`);
  }

  await client.end();
  console.log('attach-post-images: 3 posts updated.');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
