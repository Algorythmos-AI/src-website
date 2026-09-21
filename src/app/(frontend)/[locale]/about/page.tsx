import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getLeadership } from '@/lib/queries';
import { mediaUrl } from '@/lib/media';
import { localeAlternates } from '@/lib/seo';
import { About, type LeadItem } from '@/views/About';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [tn, tm] = [
    await getTranslations({ locale, namespace: 'nav' }),
    await getTranslations({ locale, namespace: 'meta' }),
  ];
  return {
    title: `${tn('about')} · ${tm('title')}`,
    description: tm('description'),
    alternates: localeAlternates(locale, '/about'),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const members = await getLeadership(locale as Locale);
  const leadership: LeadItem[] = members.map((m) => ({
    name: m.name,
    role: m.role ?? '',
    image: mediaUrl(m.photo, 'card'),
  }));

  return <About leadership={leadership} />;
}
