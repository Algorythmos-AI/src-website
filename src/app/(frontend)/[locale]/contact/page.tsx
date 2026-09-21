import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { localeAlternates } from '@/lib/seo';
import { Contact } from '@/views/Contact';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: `${tn('contact')} · ${tm('title')}`,
    description: tm('description'),
    alternates: localeAlternates(locale, '/contact'),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Contact />;
}
