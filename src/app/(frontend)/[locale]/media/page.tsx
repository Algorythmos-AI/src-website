import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { localeAlternates } from '@/lib/seo';
import { getGalleries } from '@/lib/queries';
import { formatDate } from '@/lib/format';
import { MediaGallery } from '@/components/MediaGallery';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sections' });
  return {
    title: t('mediaTitle'),
    description: t('mediaSubtitle'),
    alternates: localeAlternates(locale, '/media'),
  };
}

export default async function MediaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('sections');
  const loc = locale as Locale;

  // Before the galleries migration has run (e.g. a preview build against an
  // older database) render the empty state rather than failing the build.
  const galleries = await getGalleries(loc).catch((err: unknown) => {
    console.error('Galleries unavailable:', err instanceof Error ? err.message : err);
    return [];
  });

  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      <section className="py-16 md:py-24 px-6 bg-brand-surface dark:bg-dark-surface/40 border-b border-brand-primary/5 dark:border-white/5">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
            {t('mediaTitle')}
          </h1>
          <p className="mt-4 text-lg text-brand-ink/70 dark:text-dark-ink/70">
            {t('mediaSubtitle')}
          </p>
        </div>
      </section>

      <div className="py-6 md:py-10 px-6">
        <div className="max-w-5xl mx-auto">
          {galleries.length === 0 ? (
            <p className="py-8 text-brand-ink/60 dark:text-dark-ink/70">{t('mediaEmpty')}</p>
          ) : (
            galleries.map((g) => (
              <MediaGallery key={g.id} gallery={g} dateLabel={formatDate(g.date, loc)} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
