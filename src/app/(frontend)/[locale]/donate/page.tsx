import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getDonateSettings } from '@/lib/queries';
import { stripeEnabled } from '@/lib/donate/stripe';
import { localeAlternates } from '@/lib/seo';
import { Donate, type Tier } from '@/views/Donate';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: `${tn('donate')} · ${tm('title')}`,
    description: tm('description'),
    alternates: localeAlternates(locale, '/donate'),
  };
}

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

  return (
    <Donate
      tiers={tiers}
      monthlyEnabled={settings.monthlyEnabled ?? true}
      stripeEnabled={stripeEnabled}
    />
  );
}
