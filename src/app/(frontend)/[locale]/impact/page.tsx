import { setRequestLocale } from 'next-intl/server';
import { Impact } from '@/views/Impact';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Impact />;
}
