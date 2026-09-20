import { setRequestLocale } from 'next-intl/server';
import { Work } from '@/views/Work';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Work />;
}
