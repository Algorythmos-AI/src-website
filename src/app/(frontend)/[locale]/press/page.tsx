import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { getPressReleases } from '@/lib/queries';
import { formatDate } from '@/lib/format';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sections' });
  return { title: t('pressTitle'), description: t('pressSubtitle') };
}

export default async function PressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('sections');
  const loc = locale as Locale;

  const releases = await getPressReleases(loc);

  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      <section className="py-16 md:py-24 px-6 bg-brand-surface dark:bg-dark-surface/40 border-b border-brand-primary/5 dark:border-white/5">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
            {t('pressTitle')}
          </h1>
          <p className="mt-4 text-lg text-brand-ink/70 dark:text-dark-ink/70">
            {t('pressSubtitle')}
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {releases.length === 0 ? (
            <p className="text-brand-ink/60 dark:text-dark-ink/60">{t('pressEmpty')}</p>
          ) : (
            <ul>
              {releases.map((r) => (
                <li
                  key={r.slug}
                  className="py-6 border-b border-brand-primary/10 dark:border-white/5"
                >
                  <Link href={`/press/${r.slug}`} className="group block">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-secondary dark:text-dark-secondary mb-2">
                      {formatDate(r.date, loc)}
                    </p>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-primary dark:text-dark-primary group-hover:underline">
                      {r.title}
                    </h2>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
