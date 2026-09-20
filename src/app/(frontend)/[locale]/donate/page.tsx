import { setRequestLocale } from 'next-intl/server';
import { Donate } from '@/views/Donate';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Donate />;
}
