import { setRequestLocale } from 'next-intl/server';
import { About } from '@/views/About';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <About />;
}
