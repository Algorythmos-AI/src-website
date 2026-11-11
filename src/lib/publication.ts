import type { Locale } from '@/i18n/routing';
import type { Publication } from '@/payload-types';
import { fileUrl } from '@/lib/media';
import { formatFileSize, languageName } from '@/lib/format';

export type PublicationDownload = { href: string; meta: string };

/**
 * The publication's PDF link plus a short "PDF · English · 2.4 MB" line, or
 * null when no file is attached (or it wasn't populated). Parts that are
 * unknown are left out rather than shown blank.
 */
export function publicationDownload(
  pub: Pick<Publication, 'file'>,
  locale: Locale
): PublicationDownload | null {
  const file = pub.file;
  if (!file || typeof file === 'number') return null;
  const href = fileUrl(file);
  if (!href) return null;
  const meta = [
    file.mimeType === 'application/pdf' ? 'PDF' : '',
    languageName(file.language, locale),
    formatFileSize(file.filesize, locale),
  ]
    .filter(Boolean)
    .join(' · ');
  return { href, meta };
}

export const PUBLICATION_TYPE_KEYS = {
  'annual-report': 'typeAnnualReport',
  report: 'typeReport',
  brief: 'typeBrief',
} as const;
