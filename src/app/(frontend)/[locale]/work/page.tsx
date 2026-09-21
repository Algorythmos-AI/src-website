import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getPartners, getPrograms } from '@/lib/queries';
import { mediaUrl } from '@/lib/media';
import { localeAlternates } from '@/lib/seo';
import { Work, type ProgramCard } from '@/views/Work';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: `${tn('programs')} · ${tm('title')}`,
    description: tm('description'),
    alternates: localeAlternates(locale, '/work'),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [programs, partners] = await Promise.all([
    getPrograms(locale as Locale),
    getPartners(locale as Locale),
  ]);

  const cards: ProgramCard[] = programs.map((p) => ({
    title: p.title,
    tag: p.tag ?? undefined,
    summary: p.summary ?? undefined,
    image: mediaUrl(p.image, 'card'),
    href: `/work/${p.slug}`,
  }));

  return <Work programs={cards} partners={partners.map((p) => p.name)} />;
}
