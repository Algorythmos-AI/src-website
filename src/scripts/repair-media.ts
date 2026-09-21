import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { put } from '@vercel/blob';
import pg from 'pg';

/**
 * Deterministic media repair. Vercel Blob lost most files and Payload's own
 * server-side upload path is unreliable here (only the first upload per process
 * lands). Direct Blob writes work fine, so this bypasses Payload entirely:
 *   1. Convert each source image to a full-resolution WebP with sharp.
 *   2. Upload it straight to Blob with @vercel/blob `put`.
 *   3. Point the media row's columns at it via SQL, clearing the size variants
 *      so `mediaUrl` falls back to the original (SmartImage adds srcset later).
 *
 * Sources: leadership portraits from public/Our-Leadership/*.webp; program
 * photos from Unsplash (free licence). The Women's Cooperatives slot was a
 * non-free Morocco photo — replaced with a verified free photo of the Nile at
 * Khartoum, Sudan (Ahmed Babiker / Unsplash), and its alt/credit updated.
 *
 * Run: `set -a; . ./.env.local; set +a; node --import tsx src/scripts/repair-media.ts`
 * (uses BLOB_READ_WRITE_TOKEN + POSTGRES_URL_NON_POOLING from the environment).
 */

const dirname = path.dirname(fileURLToPath(import.meta.url));
const leadershipDir = path.resolve(dirname, '../../public/Our-Leadership');
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN!;
const DB = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL!;
const STAMP = `r${Date.now().toString(36)}`;

const U = (id: string) => `https://images.unsplash.com/${id}?q=85&w=2400&auto=format&fit=crop`;

// Program photos keyed by the existing English media `alt`.
const PROGRAMS: Record<string, { url: string; newAlt?: string; credit?: string }> = {
  'Rural Education Centers — SRC program': { url: U('photo-1596895307394-1d15bf597744') },
  'Emergency Water Relief — SRC program': { url: U('photo-1663876458229-4a7ac3e4be45') },
  'Mobile Health Clinics — SRC program': { url: U('photo-1705676112042-4fb11cade8d4') },
  'Sustainable Agriculture — SRC program': { url: U('photo-1633215357805-310e47d9c72e') },
  "Women's Cooperatives — SRC program": {
    url: U('photo-1699175214410-806ad74d0a4a'),
    newAlt: 'The Nile at Khartoum, Sudan',
    credit: 'Photo: Ahmed Babiker / Unsplash',
  },
  // Same row after a prior partial run renamed its alt.
  'The Nile at Khartoum, Sudan': {
    url: U('photo-1699175214410-806ad74d0a4a'),
    credit: 'Photo: Ahmed Babiker / Unsplash',
  },
};

const LEADERSHIP: Record<string, string> = {
  'Obeid NAEIM': 'Obeid-NAEIM.webp',
  'Elzubier MOHAMED': 'Elzubier-MOHAMED.webp',
  'Nasradine Ibrahim': 'Nasradine-Ibrahim.webp',
  'Musab ALALIM': 'Musab-ALALIM.webp',
  'Assamani BASHIR': 'Assamani-BASHIR.webp',
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

async function verify(url: string, tries = 6): Promise<boolean> {
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

  // Rows to repair: those with a known source. depth 0, English alt lives in
  // the base table for non-localized read; localized alt is in media_locales.
  const { rows } = await client.query<{ id: number; alt: string; url: string | null }>(
    `select m.id, m.url, coalesce(l.alt, '') as alt
       from media m
       left join media_locales l on l._parent_id = m.id and l._locale = 'en'`
  );

  let ok = 0;
  let fail = 0;
  let skipped = 0;

  for (const { id, alt, url: currentUrl } of rows) {
    const person = Object.keys(LEADERSHIP).find((p) => alt.includes(p));
    const prog = PROGRAMS[alt];
    if (!person && !prog) continue;

    // Idempotent: leave rows whose current image already resolves.
    if (currentUrl && (await verify(currentUrl, 2))) {
      skipped++;
      continue;
    }

    // Load the source bytes.
    let src: Buffer;
    let slug: string;
    try {
      if (person) {
        src = fs.readFileSync(path.join(leadershipDir, LEADERSHIP[person]));
        slug = slugify(alt);
      } else {
        const res = await fetch(prog!.url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        src = Buffer.from(await res.arrayBuffer());
        slug = slugify(prog!.newAlt ?? alt);
      }
    } catch (err) {
      fail++;
      console.error(`SOURCE FAILED id=${id} "${alt}": ${(err as Error).message}`);
      continue;
    }

    // One full-resolution WebP.
    const { data, info } = await sharp(src)
      .rotate()
      .webp({ quality: 82 })
      .toBuffer({ resolveWithObject: true });
    const filename = `${slug}-${STAMP}.webp`;

    let url: string;
    try {
      const blob = await put(filename, data, {
        access: 'public',
        token: TOKEN,
        addRandomSuffix: false,
        contentType: 'image/webp',
      });
      url = blob.url;
      if (!(await verify(url))) throw new Error('uploaded file did not verify');
    } catch (err) {
      fail++;
      console.error(`UPLOAD FAILED id=${id} "${alt}": ${(err as Error).message}`);
      continue;
    }

    // Point the row at the new original and clear all size variants.
    await client.query(
      `update media set
         url=$1, filename=$2, mime_type='image/webp', filesize=$3, width=$4, height=$5,
         sizes_thumbnail_url=null, sizes_thumbnail_filename=null, sizes_thumbnail_width=null,
         sizes_thumbnail_height=null, sizes_thumbnail_mime_type=null, sizes_thumbnail_filesize=null,
         sizes_card_url=null, sizes_card_filename=null, sizes_card_width=null,
         sizes_card_height=null, sizes_card_mime_type=null, sizes_card_filesize=null,
         sizes_hero_url=null, sizes_hero_filename=null, sizes_hero_width=null,
         sizes_hero_height=null, sizes_hero_mime_type=null, sizes_hero_filesize=null,
         updated_at=now()
       where id=$6`,
      [url, filename, data.length, info.width, info.height, id]
    );

    if (prog?.credit) {
      await client.query(`update media set credit=$1 where id=$2`, [prog.credit, id]);
    }
    if (prog?.newAlt) {
      await client.query(`update media_locales set alt=$1 where _parent_id=$2 and _locale='en'`, [
        prog.newAlt,
        id,
      ]);
    }

    ok++;
    console.log(`OK id=${id} "${alt}" -> ${url}`);
  }

  await client.end();
  console.log(`repair-media: ${ok} repaired, ${skipped} already OK, ${fail} failed.`);
  process.exit(fail > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
