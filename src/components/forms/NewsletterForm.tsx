'use client';

import React, { useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export const NewsletterForm = () => {
  const t = useTranslations('footer');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const startedAt = useRef(Date.now());

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: fd.get('email'),
          consent: fd.get('consent') === 'on',
          company: fd.get('company'),
          startedAt: startedAt.current,
          locale,
        }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <p aria-live="polite" className="text-sm text-brand-accent">
        {t('subscribeSuccess')}
      </p>
    );
  }

  return (
    <form className="relative" onSubmit={onSubmit}>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <label htmlFor="newsletter-email" className="sr-only">
        {t('emailLabel')}
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder={t('emailPlaceholder')}
        className="w-full bg-white/5 border border-white/10 px-3 py-2.5 rounded-md text-xs focus:ring-1 focus:ring-brand-accent outline-none text-white placeholder:text-white/30"
      />
      <label className="mt-3 flex items-start gap-2 text-[11px] leading-snug text-white/50">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        <span>{t('consent')}</span>
      </label>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-3 w-full bg-brand-secondary text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2.5 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-60"
      >
        {status === 'submitting' ? '…' : t('subscribe')}
      </button>
      {status === 'error' && (
        <p aria-live="polite" className="mt-2 text-[11px] text-red-300">
          {t('subscribeError')}
        </p>
      )}
    </form>
  );
};
