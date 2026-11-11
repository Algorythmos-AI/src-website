import { describe, expect, it } from 'vitest';
import type { Document } from '@/payload-types';
import { publicationDownload } from './publication';

const doc = (over: Partial<Document> = {}): Document => ({
  id: 1,
  title: 'Annual report',
  url: '/api/documents/file/annual.pdf',
  mimeType: 'application/pdf',
  filesize: 2.4 * 1024 * 1024,
  language: 'en',
  updatedAt: '',
  createdAt: '',
  ...over,
});

describe('publicationDownload', () => {
  it('returns null without a populated file', () => {
    expect(publicationDownload({ file: null }, 'en')).toBeNull();
    expect(publicationDownload({ file: 7 }, 'en')).toBeNull();
    expect(publicationDownload({ file: doc({ url: null }) }, 'en')).toBeNull();
  });

  it('builds the link and meta line', () => {
    expect(publicationDownload({ file: doc() }, 'en')).toEqual({
      href: '/api/documents/file/annual.pdf',
      meta: 'PDF · English · 2.4 MB',
    });
  });

  it('localizes the meta line and keeps absolute blob URLs', () => {
    const res = publicationDownload(
      { file: doc({ url: 'https://x.public.blob.vercel-storage.com/a.pdf', language: 'ar' }) },
      'fr'
    );
    expect(res?.href).toBe('https://x.public.blob.vercel-storage.com/a.pdf');
    expect(res?.meta).toMatch(/^PDF · arabe · 2,4\s?Mo$/);
  });

  it('drops unknown parts', () => {
    expect(publicationDownload({ file: doc({ language: null, filesize: null }) }, 'en')?.meta).toBe(
      'PDF'
    );
  });
});
