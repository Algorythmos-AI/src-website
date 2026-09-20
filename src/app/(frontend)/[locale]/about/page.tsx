import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getLeadership } from '@/lib/queries';
import { mediaUrl } from '@/lib/media';
import { About, type LeadItem } from '@/views/About';

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
