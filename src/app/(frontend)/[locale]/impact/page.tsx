import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { localeAlternates } from '@/lib/seo';
import { Impact } from '@/views/Impact';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: `${tn('impact')} · ${tm('title')}`,
    description: tm('description'),
    alternates: localeAlternates(locale, '/impact'),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Impact />;
}
