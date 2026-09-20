import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getDonateSettings } from '@/lib/queries';
import { Donate, type Tier } from '@/views/Donate';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const settings = await getDonateSettings(locale as Locale);
  const tiers: Tier[] = (settings.tiers ?? [])
    .filter((t): t is NonNullable<typeof t> => typeof t.amount === 'number')
    .map((t) => ({
      amount: t.amount as number,
      label: t.label ?? `$${t.amount}`,
      description: t.impact ?? '',
    }));

  return <Donate tiers={tiers} monthlyEnabled={settings.monthlyEnabled ?? true} />;
}
