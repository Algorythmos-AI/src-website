import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { stripe } from '@/lib/donate/stripe';

export const dynamic = 'force-dynamic';

export default async function DonateSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { locale } = await params;
  const { session_id } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('donate');

  // Verify the session server-side; never trust query params for amounts.
  let amountLine: string | null = null;
  if (stripe && session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (session.amount_total && session.currency) {
        amountLine = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: session.currency.toUpperCase(),
        }).format(session.amount_total / 100);
      }
    } catch {
      // ignore; show generic thanks
    }
  }

  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 min-h-[70vh] flex items-center transition-colors">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
          {t('successTitle')}
        </h1>
        {amountLine && (
          <p className="mt-4 text-2xl font-serif text-brand-secondary dark:text-dark-secondary">
            {amountLine}
          </p>
        )}
        <p className="mt-6 text-lg text-brand-ink/70 dark:text-dark-ink/70">{t('successBody')}</p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 bg-brand-primary dark:bg-dark-primary text-white px-8 py-4 rounded-full text-sm font-medium"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
