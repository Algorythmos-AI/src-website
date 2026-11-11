'use client';

import { Mail, MapPin, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import type { SocialLink, SocialNetwork } from '@/lib/social';

const SOCIAL_ICONS: Record<SocialNetwork, typeof Facebook> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

const DEFAULT_EMAIL = 'hello@src-sudan.org';

type FooterProps = {
  /** Validated https links from Site Settings; icons without a link are hidden. */
  social?: SocialLink[];
  /** Contact email from Site Settings; falls back to the default address. */
  email?: string | null;
};

export const Footer = ({ social = [], email }: FooterProps) => {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const sections = useTranslations('sections');
  const year = new Date().getFullYear();
  const contactEmail = email?.trim() || DEFAULT_EMAIL;

  return (
    <footer className="bg-brand-footer text-brand-surface/60 pt-16 sm:pt-20 pb-10 sm:pb-12 site-footer-safe border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <img
                src="/icons/logo.webp"
                alt=""
                width={36}
                height={36}
                decoding="async"
                loading="lazy"
                className="w-9 h-9 rounded-full bg-white p-0.5"
              />
              <span className="font-serif font-bold tracking-wide text-lg text-white">SRC</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">{t('brandBlurb')}</p>
            {social.length > 0 && (
              <ul className="flex gap-3" aria-label={t('socialHeading')}>
                {social.map(({ network, href }) => {
                  const Icon = SOCIAL_ICONS[network];
                  return (
                    <li key={network}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t(network)}
                        className="inline-flex p-2 rounded-md bg-white/5 text-white/70 hover:text-brand-accent hover:bg-white/10 transition-colors"
                      >
                        <Icon size={16} aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Sitemap */}
          <div className="md:col-span-2">
            <h5 className="font-bold mb-5 text-white text-[10px] uppercase tracking-[0.2em]">
              {t('orgHeading')}
            </h5>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {nav('about')}
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-white transition-colors">
                  {nav('programs')}
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-white transition-colors">
                  {nav('impact')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  {nav('news')}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  {nav('events')}
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-white transition-colors">
                  {sections('pressTitle')}
                </Link>
              </li>
              <li>
                <Link href="/publications" className="hover:text-white transition-colors">
                  {sections('publicationsTitle')}
                </Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-white transition-colors">
                  {nav('media')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {nav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Reach */}
          <div className="md:col-span-3">
            <h5 className="font-bold mb-5 text-white text-[10px] uppercase tracking-[0.2em]">
              {t('reachHeading')}
            </h5>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0 text-brand-accent" />
                <span>
                  {t('hqLine')}
                  <br />
                  <span className="text-white/50 text-xs">{t('fieldLine')}</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="shrink-0 text-brand-accent" />
                <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
                  {contactEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h5 className="font-bold mb-5 text-white text-[10px] uppercase tracking-[0.2em]">
              {t('newsletterHeading')}
            </h5>
            <p className="text-sm mb-4 leading-relaxed">{t('newsletterBlurb')}</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-wide text-white/60">
          <p>{t('rights', { year })}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {t('terms')}
            </Link>
            <Link href="/publications" className="hover:text-white transition-colors">
              {t('annualReport')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
