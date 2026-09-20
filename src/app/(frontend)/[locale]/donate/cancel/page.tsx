import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function DonateCancelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('donate');

  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 min-h-[70vh] flex items-center transition-colors">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
          {t('cancelTitle')}
        </h1>
        <p className="mt-6 text-lg text-brand-ink/70 dark:text-dark-ink/70">{t('cancelBody')}</p>
        <Link
          href="/donate"
          className="mt-10 inline-flex items-center gap-2 bg-brand-primary dark:bg-dark-primary text-white px-8 py-4 rounded-full text-sm font-medium"
        >
          {t('backToDonate')}
        </Link>
      </div>
    </div>
  );
}
