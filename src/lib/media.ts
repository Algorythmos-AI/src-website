import type { Media } from '@/payload-types';

type MediaRef = number | Media | null | undefined;
type SizeName = 'thumbnail' | 'card' | 'hero';

/**
 * Local-disk Payload media URLs are absolute to whatever serverURL was set at
 * build time (e.g. http://localhost:3000). Rewrite those to a relative path so
 * they resolve on whatever origin actually serves them (dev, CI, prod). Absolute
 * Vercel Blob URLs (production) are left untouched.
 */
function normalize(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith('/api/')) return parsed.pathname + parsed.search;
    return url;
  } catch {
    return url; // already relative
  }
}

/** Resolve a Payload upload relation to a served URL, preferring a named size. */
export function mediaUrl(ref: MediaRef, size?: SizeName): string | undefined {
  if (!ref || typeof ref === 'number') return undefined;
  if (size) {
    const sized = ref.sizes?.[size]?.url;
    if (sized) return normalize(sized);
  }
  return normalize(ref.url);
}

/** Resolve the alt text of a Payload upload relation. */
export function mediaAlt(ref: MediaRef): string {
  if (!ref || typeof ref === 'number') return '';
  return ref.alt ?? '';
}
