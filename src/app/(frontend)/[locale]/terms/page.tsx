import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { localeAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });
  return { title: t('termsTitle'), alternates: localeAlternates(locale, '/terms') };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal');
  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 markdown-body text-brand-ink/80 dark:text-dark-ink/80">
        <h1 className="text-brand-primary dark:text-dark-primary">{t('termsTitle')}</h1>
        {locale !== 'en' && (
          <p className="text-sm opacity-70">
            <em>{t('prevails')}</em>
          </p>
        )}
        <p>{t('termsIntro')}</p>
        <h2>{t('termsDonH')}</h2>
        <p>{t('termsDonB')}</p>
        <h2>{t('termsUseH')}</h2>
        <p>{t('termsUseB')}</p>
        <h2>{t('termsContentH')}</h2>
        <p>{t('termsContentB')}</p>
        <p>
          <em>{t('termsNote')}</em>
        </p>
      </div>
    </div>
  );
}
