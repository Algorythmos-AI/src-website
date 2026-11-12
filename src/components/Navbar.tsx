'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useTheme } from '@/context/ThemeContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export const Navbar = () => {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  // Start unscrolled on both server and client; the effect syncs the real position after hydration.
  const [scrolled, setScrolled] = useState(false);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('about'), path: '/about' },
    { name: t('programs'), path: '/work' },
    { name: t('impact'), path: '/impact' },
    { name: t('news'), path: '/news' },
    { name: t('publications'), path: '/publications' },
    { name: t('media'), path: '/media' },
    { name: t('events'), path: '/events' },
    { name: t('contact'), path: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`fixed top-0 start-0 w-full z-50 transition-all duration-300 text-white ${
        scrolled
          ? 'bg-brand-primary/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-brand-primary dark:bg-dark-bg py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3" aria-label={t('srcHome')}>
          <img
            src="/icons/logo.webp"
            alt=""
            width={36}
            height={36}
            decoding="async"
            className="w-9 h-9 rounded-full bg-white p-0.5 shadow-sm"
          />
          <span className="font-serif font-bold tracking-wide text-lg">SRC</span>
        </Link>

        {/* Desktop Nav — xl and up: 8 links + language + donate overflow below ~1200px in French. */}
        <div className="hidden xl:flex items-center gap-2">
          <div className="flex items-center gap-1 me-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={`px-3 py-2 text-sm font-medium whitespace-nowrap rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'bg-white/10 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <LanguageSwitcher />

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-white/10 transition-colors text-white"
            aria-label={t('toggleTheme')}
          >
            {/* Icon follows the .dark class set before hydration, so server and client markup match. */}
            <Moon size={18} className="dark:hidden" aria-hidden="true" />
            <Sun size={18} className="hidden dark:block" aria-hidden="true" />
          </button>

          <Link
            href="/donate"
            className="ms-2 bg-white text-brand-primary px-5 py-2.5 rounded-md font-bold text-xs uppercase tracking-[0.15em] hover:bg-brand-surface transition-colors"
          >
            {t('donate')}
          </Link>
        </div>

        {/* Mobile Toggle & Mobile Theme Toggle */}
        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-md hover:bg-white/10 transition-colors text-white touch-manipulation"
            aria-label={t('toggleTheme')}
          >
            {/* Icon follows the .dark class set before hydration, so server and client markup match. */}
            <Moon size={20} className="dark:hidden" aria-hidden="true" />
            <Sun size={20} className="hidden dark:block" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="text-white p-2.5 rounded-md hover:bg-white/10 transition-colors touch-manipulation"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full start-0 w-full bg-brand-primary dark:bg-dark-bg border-t border-white/10 px-6 py-4 flex flex-col xl:hidden shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={`block py-3 text-base font-medium transition-colors border-b border-white/5 last:border-0 ${
                  isActive(link.path) ? 'text-brand-accent' : 'text-white hover:text-brand-accent'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex justify-center items-center gap-2 bg-white text-brand-primary px-5 py-3.5 rounded-md text-sm font-bold uppercase tracking-[0.15em]"
            >
              {t('donate')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
