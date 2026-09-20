import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { getEventBySlug, getEventSlugs } from '@/lib/queries';
import { mediaUrl } from '@/lib/media';
import { formatDateTime } from '@/lib/format';
import { RichTextBlock } from '@/components/RichTextBlock';

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = await getEventBySlug(slug, locale as Locale);
  if (!event) return {};
  return { title: event.title };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('sections');
  const loc = locale as Locale;

  const event = await getEventBySlug(slug, loc);
  if (!event) notFound();

  const hero = mediaUrl(event.image, 'hero');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.startsAt ?? undefined,
    endDate: event.endsAt ?? undefined,
    eventAttendanceMode: event.online
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: event.online
      ? { '@type': 'VirtualLocation', url: event.registrationUrl ?? undefined }
      : event.location
        ? { '@type': 'Place', name: event.location }
        : undefined,
    image: hero ? [hero] : undefined,
  };

  return (
    <article className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link
          href="/events"
          className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] hover:underline"
        >
          ← {t('eventsTitle')}
        </Link>
        <p className="mt-8 text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em]">
          {formatDateTime(event.startsAt, loc, event.timezone ?? undefined)}
          {event.online ? ` · ${t('online')}` : event.location ? ` · ${event.location}` : ''}
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
          {event.title}
        </h1>
        {hero && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero}
            alt={event.title}
            className="mt-10 w-full rounded-2xl aspect-[16/9] object-cover"
            decoding="async"
          />
        )}
        <RichTextBlock
          data={event.body}
          className="mt-10 text-brand-ink/80 dark:text-dark-ink/80"
        />
        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 bg-brand-primary dark:bg-dark-primary text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-colors"
          >
            {t('register')}
          </a>
        )}
      </div>
    </article>
  );
}
