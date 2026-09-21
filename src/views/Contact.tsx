'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export const Contact = () => {
  const locale = useLocale();
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>('idle');
  const startedAt = useRef(Date.now());

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          subject: fd.get('subject'),
          message: fd.get('message'),
          company: fd.get('company'),
          startedAt: startedAt.current,
          locale,
        }),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 bg-brand-surface dark:bg-dark-surface/40 border-b border-brand-primary/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
            {t('eyebrow')}
          </p>
          <h1 className="text-balance text-4xl md:text-6xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight mb-6">
            {t('heading')}
          </h1>
          <p className="text-lg md:text-xl text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed max-w-3xl">
            {t('intro')}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Contact details */}
          <div className="lg:col-span-5">
            <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {t('reachEyebrow')}
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight mb-10">
              {t('reachHeading')}
            </h2>

            <ul className="space-y-7">
              <li className="flex gap-5 items-start">
                <span className="shrink-0 w-11 h-11 rounded-lg bg-brand-primary/10 dark:bg-dark-primary/20 text-brand-primary dark:text-dark-primary flex items-center justify-center">
                  <Mail size={18} />
                </span>
                <div>
                  <h3 className="font-bold text-brand-primary dark:text-dark-primary mb-1">
                    {t('email')}
                  </h3>
                  <a
                    href="mailto:hello@src-sudan.org"
                    dir="ltr"
                    className="text-sm text-brand-ink/70 dark:text-dark-ink/70 hover:text-brand-primary dark:hover:text-dark-primary transition-colors inline-block"
                  >
                    hello@src-sudan.org
                  </a>
                </div>
              </li>
              <li className="flex gap-5 items-start">
                <span className="shrink-0 w-11 h-11 rounded-lg bg-brand-primary/10 dark:bg-dark-primary/20 text-brand-primary dark:text-dark-primary flex items-center justify-center">
                  <Phone size={18} />
                </span>
                <div>
                  <h3 className="font-bold text-brand-primary dark:text-dark-primary mb-1">
                    {t('phone')}
                  </h3>
                  <a
                    href="tel:+249112345678"
                    dir="ltr"
                    className="text-sm text-brand-ink/70 dark:text-dark-ink/70 hover:text-brand-primary dark:hover:text-dark-primary transition-colors inline-block"
                  >
                    +249 112 345 678
                  </a>
                </div>
              </li>
              <li className="flex gap-5 items-start">
                <span className="shrink-0 w-11 h-11 rounded-lg bg-brand-primary/10 dark:bg-dark-primary/20 text-brand-primary dark:text-dark-primary flex items-center justify-center">
                  <MapPin size={18} />
                </span>
                <div>
                  <h3 className="font-bold text-brand-primary dark:text-dark-primary mb-1">
                    {t('hq')}
                  </h3>
                  <p className="text-sm text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed">
                    {t('hqValue')}
                  </p>
                  <p className="text-xs text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed mt-1">
                    {t('fieldValue')}
                  </p>
                </div>
              </li>
              <li className="flex gap-5 items-start">
                <span className="shrink-0 w-11 h-11 rounded-lg bg-brand-primary/10 dark:bg-dark-primary/20 text-brand-primary dark:text-dark-primary flex items-center justify-center">
                  <Clock size={18} />
                </span>
                <div>
                  <h3 className="font-bold text-brand-primary dark:text-dark-primary mb-1">
                    {t('hours')}
                  </h3>
                  <p className="text-sm text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed">
                    {t('hoursDays')}
                    <br />
                    {t('hoursTime')}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 bg-brand-surface dark:bg-dark-surface rounded-2xl border border-brand-primary/10 dark:border-white/10 p-8 md:p-10 shadow-sm"
          >
            <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-primary dark:text-dark-primary mb-8 leading-tight">
              {t('formHeading')}
            </h2>
            <form className="space-y-5" onSubmit={onSubmit}>
              {/* Honeypot: hidden from users, tempting to bots */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/70 dark:text-dark-ink/70"
                  >
                    {t('fullName')}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder={t('namePlaceholder')}
                    className="w-full bg-brand-bg dark:bg-dark-bg/60 border border-brand-primary/15 dark:border-white/10 px-4 py-3 rounded-lg text-sm text-brand-ink dark:text-dark-ink focus:ring-2 focus:ring-brand-accent outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/70 dark:text-dark-ink/70"
                  >
                    {t('emailLabel')}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    dir="ltr"
                    placeholder={t('emailPlaceholder')}
                    className="w-full bg-brand-bg dark:bg-dark-bg/60 border border-brand-primary/15 dark:border-white/10 px-4 py-3 rounded-lg text-sm text-brand-ink dark:text-dark-ink focus:ring-2 focus:ring-brand-accent outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-subject"
                  className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/70 dark:text-dark-ink/70"
                >
                  {t('subject')}
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  className="w-full bg-brand-bg dark:bg-dark-bg/60 border border-brand-primary/15 dark:border-white/10 px-4 py-3 rounded-lg text-sm text-brand-ink dark:text-dark-ink focus:ring-2 focus:ring-brand-accent outline-none"
                >
                  <option value="Partnership inquiry">{t('subjectPartnership')}</option>
                  <option value="Volunteer application">{t('subjectVolunteer')}</option>
                  <option value="Media & press">{t('subjectMedia')}</option>
                  <option value="Donation question">{t('subjectDonation')}</option>
                  <option value="Other">{t('subjectOther')}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/70 dark:text-dark-ink/70"
                >
                  {t('message')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder={t('messagePlaceholder')}
                  className="w-full bg-brand-bg dark:bg-dark-bg/60 border border-brand-primary/15 dark:border-white/10 px-4 py-3 rounded-lg text-sm text-brand-ink dark:text-dark-ink focus:ring-2 focus:ring-brand-accent outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center gap-3 bg-brand-primary dark:bg-dark-primary text-white px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-[0.2em] hover:bg-opacity-90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? t('sending') : t('send')}
                <Send size={14} className="rtl:-scale-x-100" />
              </button>
              <p aria-live="polite" className="min-h-[1.25rem] text-sm font-medium">
                {status === 'success' && (
                  <span className="text-green-700 dark:text-green-400">{t('success')}</span>
                )}
                {status === 'error' && (
                  <span className="text-red-700 dark:text-red-400">{t('error')}</span>
                )}
              </p>
              <p className="text-xs text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed pt-2">
                {t('privacyNote')}
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
