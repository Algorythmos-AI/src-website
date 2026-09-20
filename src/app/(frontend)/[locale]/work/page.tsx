import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getPartners, getPrograms } from '@/lib/queries';
import { mediaUrl } from '@/lib/media';
import { Work, type ProgramCard } from '@/views/Work';

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
