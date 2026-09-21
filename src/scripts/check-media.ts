import { getPayload } from 'payload';
import config from '@payload-config';

/**
 * Media integrity check. Lists every media row and requests its original URL and
 * each generated size URL; reports any that do not return HTTP 200 and exits
 * non-zero if any file is missing. Run with `npm run check:media`.
 *
 * Absolute URLs (Vercel Blob) are checked as-is. Relative local-disk URLs
 * (`/api/media/file/...`) are resolved against BASE_URL (default the production
 * site) so the same script works against local, preview and production data.
 */

const BASE_URL = (process.env.BASE_URL ?? 'https://www.src-rural.org').replace(/\/$/, '');

function resolveUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//.test(url)) return url;
  return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

async function head(url: string): Promise<number> {
  // Some CDNs (and Blob) don't answer HEAD reliably; use a ranged GET.
  try {
    const res = await fetch(url, { headers: { Range: 'bytes=0-0' } });
    return res.status;
  } catch {
    return 0;
  }
}

async function run() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: 'media', limit: 1000, depth: 0 });

  let broken = 0;
  let checked = 0;

  for (const doc of docs) {
    const urls = new Map<string, string>();
    const top = resolveUrl((doc as { url?: string | null }).url);
    if (top) urls.set('original', top);
    const sizes = (doc as { sizes?: Record<string, { url?: string | null }> }).sizes ?? {};
    for (const [name, s] of Object.entries(sizes)) {
      const u = resolveUrl(s?.url);
      if (u) urls.set(name, u);
    }

    for (const [name, url] of urls) {
      checked += 1;
      const status = await head(url);
      const ok = status >= 200 && status < 400;
      if (!ok) {
        broken += 1;
        payload.logger.error(
          `MISSING media id=${doc.id} alt=${JSON.stringify((doc as { alt?: string }).alt)} size=${name} status=${status} url=${url}`
        );
      }
    }
  }

  payload.logger.info(
    `check-media: ${docs.length} rows, ${checked} files checked, ${broken} missing (base=${BASE_URL}).`
  );

  if (broken > 0) {
    payload.logger.error(`check-media FAILED: ${broken} file(s) missing.`);
    process.exit(1);
  }
  payload.logger.info('check-media OK.');
  process.exit(0);
}

try {
  await run();
} catch (err) {
  console.error(err);
  process.exit(1);
}
