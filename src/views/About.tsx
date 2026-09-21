'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'motion/react';
import { Target, Users, ShieldCheck, Globe, ArrowRight } from 'lucide-react';

export type LeadItem = { name: string; role: string; image?: string };

export const About = ({ leadership }: { leadership: LeadItem[] }) => {
  const t = useTranslations('about');
  const ta = useTranslations('a11y');
  const values = [
    { icon: <Target size={22} />, title: t('value1Title'), desc: t('value1Desc') },
    { icon: <Users size={22} />, title: t('value2Title'), desc: t('value2Desc') },
    { icon: <ShieldCheck size={22} />, title: t('value3Title'), desc: t('value3Desc') },
    { icon: <Globe size={22} />, title: t('value4Title'), desc: t('value4Desc') },
  ];

  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 bg-brand-surface dark:bg-dark-surface/40 border-b border-brand-primary/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-brand-secondary dark:text-dark-secondary text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.3em] mb-4"
          >
            {t('eyebrow')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-balance text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-6 text-brand-primary dark:text-dark-primary leading-tight"
          >
            {t('heading')}
          </motion.h1>
          <p className="text-base sm:text-lg md:text-xl text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed max-w-3xl">
            {t('intro')}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1596895307394-1d15bf597744?q=80&w=2070&auto=format&fit=crop"
                alt={t('storyImageAlt')}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div>
            <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {t('storyEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-brand-primary dark:text-dark-primary leading-tight">
              {t('storyHeading')}
            </h2>
            <div className="space-y-5 text-brand-ink/75 dark:text-dark-ink/75 leading-relaxed">
              <p>{t('storyP1')}</p>
              <p>{t('storyP2')}</p>
              <p>{t('storyP3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 px-6 bg-brand-footer text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {t('valuesEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
              {t('valuesHeading')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-6 border border-white/10 rounded-xl hover:border-brand-accent/40 transition-colors"
              >
                <div className="text-brand-accent mb-4">{v.icon}</div>
                <h3 className="text-lg font-serif font-bold mb-3 text-white">{v.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International engagement */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5">
            <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {t('intlEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-brand-primary dark:text-dark-primary">
              {t('intlHeading')}
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-brand-ink/75 dark:text-dark-ink/75 leading-relaxed">
            <p>{t('intlP1')}</p>
            <p>{t('intlP2')}</p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 md:py-28 px-6 bg-brand-surface dark:bg-dark-surface/40 border-t border-brand-primary/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {t('leadEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-brand-primary dark:text-dark-primary">
              {t('leadHeading')}
            </h2>
            <p className="mt-6 text-brand-ink/65 dark:text-dark-ink/65 leading-relaxed max-w-xl">
              {t('leadIntro')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {leadership.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.06 }}
                className="group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-brand-surface dark:bg-dark-surface shadow-sm group-hover:shadow-md transition-shadow">
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={ta('portrait', { name: person.name, role: person.role })}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="w-full h-full flex items-center justify-center font-serif font-bold text-3xl text-brand-primary/30 dark:text-dark-primary/40"
                    >
                      {person.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                  )}
                </div>
                <p className="font-serif font-bold text-base md:text-lg text-brand-primary dark:text-dark-primary leading-tight">
                  {person.name}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/70 dark:text-dark-ink/70 mt-1.5">
                  {person.role}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-brand-primary dark:text-dark-primary font-bold text-sm uppercase tracking-widest border-b border-brand-primary/30 dark:border-dark-primary/40 pb-1 hover:border-brand-primary dark:hover:border-dark-primary transition-colors"
            >
              {t('governance')}
              <ArrowRight size={14} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
