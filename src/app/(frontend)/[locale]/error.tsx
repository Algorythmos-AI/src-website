'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    // TODO(phase-8): report to Sentry once a DSN is configured.
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-bg dark:bg-dark-bg px-6 text-center transition-colors">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary dark:text-dark-primary mb-4">
          {t('title')}
        </h1>
        <p className="text-brand-ink/70 dark:text-dark-ink/70 mb-8">{t('message')}</p>
        <button
          onClick={reset}
          className="bg-brand-primary dark:bg-dark-primary text-white px-8 py-4 rounded-full text-sm font-medium"
        >
          {t('retry')}
        </button>
      </div>
    </div>
  );
}
