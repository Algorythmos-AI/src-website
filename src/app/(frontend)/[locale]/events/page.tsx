import type { Metadata } from 'next';
import { localeAlternates } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { getEvents } from '@/lib/queries';
import { formatDateTime } from '@/lib/format';
import type { Event } from '@/payload-types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sections' });
  return { title: t('eventsTitle'), description: t('eventsSubtitle'), alternates: localeAlternates(locale, '/events') };
}

function EventRow({ event, locale }: { event: Event; locale: Locale }) {
  return (
    <li className="py-6 border-b border-brand-primary/10 dark:border-white/5">
      <Link href={`/events/${event.slug}`} className="group block">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-secondary dark:text-dark-secondary mb-2">
          {formatDateTime(event.startsAt, locale, event.timezone ?? undefined)}
        </p>
        <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-primary dark:text-dark-primary group-hover:underline">
          {event.title}
        </h3>
        {event.location && (
          <p className="mt-1 text-sm text-brand-ink/60 dark:text-dark-ink/70">{event.location}</p>
        )}
      </Link>
    </li>
  );
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('sections');
  const loc = locale as Locale;

  const [upcoming, past] = await Promise.all([getEvents(loc, 'upcoming'), getEvents(loc, 'past')]);

  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      <section className="py-16 md:py-24 px-6 bg-brand-surface dark:bg-dark-surface/40 border-b border-brand-primary/5 dark:border-white/5">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
            {t('eventsTitle')}
          </h1>
          <p className="mt-4 text-lg text-brand-ink/70 dark:text-dark-ink/70">
            {t('eventsSubtitle')}
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {upcoming.length === 0 && past.length === 0 && (
            <p className="text-brand-ink/60 dark:text-dark-ink/70">{t('eventsEmpty')}</p>
          )}
          {upcoming.length > 0 && (
            <>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-brand-ink/70 dark:text-dark-ink/70 mb-2">
                {t('eventsUpcoming')}
              </h2>
              <ul className="mb-14">
                {upcoming.map((e) => (
                  <EventRow key={e.slug} event={e} locale={loc} />
                ))}
              </ul>
            </>
          )}
          {past.length > 0 && (
            <>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-brand-ink/70 dark:text-dark-ink/70 mb-2">
                {t('eventsPast')}
              </h2>
              <ul className="opacity-70">
                {past.map((e) => (
                  <EventRow key={e.slug} event={e} locale={loc} />
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
