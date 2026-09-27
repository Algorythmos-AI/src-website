import type { Metadata } from 'next';
import { localeAlternates } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getPublications } from '@/lib/queries';
import { fileUrl, mediaUrl } from '@/lib/media';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sections' });
  return {
    title: t('publicationsTitle'),
    description: t('publicationsSubtitle'),
    alternates: localeAlternates(locale, '/publications'),
  };
}

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('sections');
  const loc = locale as Locale;

  const publications = await getPublications(loc);

  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      <section className="py-16 md:py-24 px-6 bg-brand-surface dark:bg-dark-surface/40 border-b border-brand-primary/5 dark:border-white/5">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
            {t('publicationsTitle')}
          </h1>
          <p className="mt-4 text-lg text-brand-ink/70 dark:text-dark-ink/70">
            {t('publicationsSubtitle')}
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {publications.length === 0 ? (
            <p className="text-brand-ink/60 dark:text-dark-ink/70">{t('publicationsEmpty')}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {publications.map((pub) => {
                const cover = mediaUrl(pub.cover, 'card');
                const file = fileUrl(pub.file);
                return (
                  <div key={pub.slug} className="flex flex-col">
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-brand-surface dark:bg-dark-surface shadow-sm">
                      {cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cover}
                          alt={pub.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="w-full h-full bg-gradient-to-br from-brand-primary/15 to-brand-secondary/15 dark:from-dark-primary/25 dark:to-dark-secondary/25"
                        />
                      )}
                    </div>
                    {pub.year && (
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-secondary dark:text-dark-secondary mb-1">
                        {pub.year}
                      </p>
                    )}
                    <h2 className="text-lg font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
                      {pub.title}
                    </h2>
                    {pub.summary && (
                      <p className="mt-2 text-sm text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed">
                        {pub.summary}
                      </p>
                    )}
                    {file && (
                      <a
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-brand-primary dark:text-dark-primary font-bold text-xs uppercase tracking-widest hover:underline"
                      >
                        {t('download')} →
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
