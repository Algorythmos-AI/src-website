import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-bg dark:bg-dark-bg px-6 text-center transition-colors">
      <div>
        <h1 className="text-9xl font-serif font-bold text-brand-primary/10 dark:text-dark-primary/20">
          {t('code')}
        </h1>
        <p className="text-xl font-serif mb-8 text-brand-ink dark:text-dark-ink">{t('message')}</p>
        <Link
          href="/"
          className="bg-brand-primary dark:bg-dark-primary text-white px-8 py-4 rounded-full text-sm font-medium"
        >
          {t('returnHome')}
        </Link>
      </div>
    </div>
  );
}
