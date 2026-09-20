'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';

export const LanguageSwitcher = () => {
  const t = useTranslations('language');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const switchTo = (next: Locale) => {
    setOpen(false);
    if (next !== locale) router.replace(pathname, { locale: next });
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 p-2 rounded-md hover:bg-white/10 transition-colors text-white"
        aria-label={t('label')}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Globe size={18} />
        <span className="text-xs font-bold uppercase tracking-wider">{locale}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute end-0 mt-2 min-w-[9rem] rounded-lg bg-white dark:bg-dark-surface border border-black/10 dark:border-white/10 shadow-lg py-1 z-50"
          >
            {locales.map((l) => (
              <li key={l} role="none">
                <button
                  role="menuitemradio"
                  aria-checked={l === locale}
                  onClick={() => switchTo(l)}
                  className="w-full flex items-center justify-between gap-3 px-3 py-2 text-sm text-brand-ink dark:text-dark-ink hover:bg-brand-bg dark:hover:bg-white/5 transition-colors"
                >
                  <span>{t(l)}</span>
                  {l === locale && (
                    <Check size={14} className="text-brand-primary dark:text-dark-primary" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
