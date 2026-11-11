import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FileDown } from 'lucide-react';
import { routing, type Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { getPublicationBySlug, getPublicationSlugs } from '@/lib/queries';
import { mediaUrl } from '@/lib/media';
import { localeAlternates } from '@/lib/seo';
import { PUBLICATION_TYPE_KEYS, publicationDownload } from '@/lib/publication';

export async function generateStaticParams() {
  // A DB outage at build time must not fail the build; pages render on demand.
  const slugs = await getPublicationSlugs().catch(() => [] as string[]);
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const pub = await getPublicationBySlug(slug, locale as Locale);
  if (!pub) return {};
  const img = mediaUrl(pub.cover, 'card');
  return {
    title: pub.title,
    description: pub.summary ?? undefined,
    alternates: localeAlternates(locale, `/publications/${slug}`),
    openGraph: img ? { images: [img] } : undefined,
  };
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('sections');
  const loc = locale as Locale;

  const pub = await getPublicationBySlug(slug, loc);
  if (!pub) notFound();

  const cover = mediaUrl(pub.cover, 'card');
  const download = publicationDownload(pub, loc);
  const typeKey = pub.type ? PUBLICATION_TYPE_KEYS[pub.type] : undefined;
  const eyebrow = [typeKey ? t(typeKey) : '', pub.year ? String(pub.year) : '']
    .filter(Boolean)
    .join(' · ');

  return (
    <article className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <Link
          href="/publications"
          className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] hover:underline"
        >
          <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
            ←
          </span>{' '}
          {t('publicationsTitle')}
        </Link>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 md:gap-14 items-start">
          <div className="relative aspect-[3/4] w-full max-w-[14rem] md:max-w-sm rounded-xl overflow-hidden bg-brand-surface dark:bg-dark-surface shadow-sm">
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt="" decoding="async" className="w-full h-full object-cover" />
            ) : (
              <div
                aria-hidden="true"
                className="w-full h-full bg-gradient-to-br from-brand-primary/15 to-brand-secondary/15 dark:from-dark-primary/25 dark:to-dark-secondary/25"
              />
            )}
          </div>

          <div>
            {eyebrow && (
              <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em]">
                {eyebrow}
              </p>
            )}
            <h1 className="mt-3 text-3xl md:text-5xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
              {pub.title}
            </h1>
            {pub.summary && (
              <p className="mt-6 text-lg text-brand-ink/75 dark:text-dark-ink/75 leading-relaxed whitespace-pre-line">
                {pub.summary}
              </p>
            )}

            {download ? (
              <div className="mt-10">
                <a
                  href={download.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-brand-primary dark:bg-dark-primary text-white dark:text-dark-bg px-6 py-3.5 rounded-md font-bold text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
                >
                  <FileDown size={18} aria-hidden="true" />
                  {t('download')}
                </a>
                {download.meta && (
                  <p className="mt-3 text-sm text-brand-ink/60 dark:text-dark-ink/70">
                    {download.meta}
                  </p>
                )}
              </div>
            ) : (
              <p className="mt-10 text-sm text-brand-ink/60 dark:text-dark-ink/70">
                {t('publicationNoFile')}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
