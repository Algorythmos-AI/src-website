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
  return { title: t('privacyTitle'), alternates: localeAlternates(locale, '/privacy') };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal');
  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 markdown-body text-brand-ink/80 dark:text-dark-ink/80">
        <h1 className="text-brand-primary dark:text-dark-primary">{t('privacyTitle')}</h1>
        {locale !== 'en' && (
          <p className="text-sm opacity-70">
            <em>{t('prevails')}</em>
          </p>
        )}
        <p>{t('privacyIntro')}</p>
        <h2>{t('privacyCollectH')}</h2>
        <p>{t('privacyCollectB')}</p>
        <h2>{t('privacyUseH')}</h2>
        <p>{t('privacyUseB')}</p>
        <h2>{t('privacyPayH')}</h2>
        <p>{t('privacyPayB')}</p>
        <h2>{t('privacyRetH')}</h2>
        <p>{t('privacyRetB')}</p>
        <p>
          <em>{t('privacyNote')}</em>
        </p>
      </div>
    </div>
  );
}
