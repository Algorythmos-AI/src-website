'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLocale } from 'next-intl';
import { Heart, Globe, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export interface Tier {
  amount: number;
  label: string;
  description: string;
  recommended?: boolean;
}

export const Donate = ({
  tiers,
  monthlyEnabled,
  stripeEnabled,
}: {
  tiers: Tier[];
  monthlyEnabled: boolean;
  stripeEnabled: boolean;
}) => {
  const locale = useLocale();
  const TIERS = tiers;
  const recommended = TIERS.find((t) => t.recommended) ?? TIERS[1] ?? TIERS[0];
  const [selectedAmount, setSelectedAmount] = useState<number | null>(recommended?.amount ?? null);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [status, setStatus] = useState<'idle' | 'redirecting' | 'error'>('idle');

  const finalAmount = customAmount ? Number(customAmount) || 0 : (selectedAmount ?? 0);

  const handleDonate = async () => {
    if (finalAmount <= 0 || status === 'redirecting') return;
    setStatus('redirecting');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ amount: finalAmount, currency: 'usd', mode: frequency, locale }),
      });
      const data = (await res.json()) as { url?: string };
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setStatus('error');
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
            Support our work
          </p>
          <h1 className="text-balance text-4xl md:text-6xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight mb-6">
            Stand with rural Sudan.
          </h1>
          <p className="text-lg md:text-xl text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed max-w-3xl">
            Your contribution funds clean water, classrooms, and community-led peace councils —
            delivered by Sudanese teams in fifteen states.
          </p>
        </div>
      </section>

      {/* Giving section */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: principles */}
          <div className="lg:col-span-5">
            <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Why give to SRC
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary dark:text-dark-primary mb-10 leading-tight">
              Direct impact, fully accounted for.
            </h2>

            <ul className="space-y-8">
              <li className="flex gap-5 items-start">
                <span className="shrink-0 w-11 h-11 rounded-lg bg-brand-primary/10 dark:bg-dark-primary/20 text-brand-primary dark:text-dark-primary flex items-center justify-center">
                  <Heart size={20} />
                </span>
                <div>
                  <h3 className="font-bold text-brand-primary dark:text-dark-primary mb-1">
                    92% to programs
                  </h3>
                  <p className="text-sm text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed">
                    Of every dollar received, $0.92 reaches the field. The remaining $0.08 covers
                    compliance, audit, and oversight.
                  </p>
                </div>
              </li>
              <li className="flex gap-5 items-start">
                <span className="shrink-0 w-11 h-11 rounded-lg bg-brand-primary/10 dark:bg-dark-primary/20 text-brand-primary dark:text-dark-primary flex items-center justify-center">
                  <Globe size={20} />
                </span>
                <div>
                  <h3 className="font-bold text-brand-primary dark:text-dark-primary mb-1">
                    Quarterly reporting
                  </h3>
                  <p className="text-sm text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed">
                    Every donor receives quarterly impact updates with project-level financials and
                    beneficiary stories.
                  </p>
                </div>
              </li>
              <li className="flex gap-5 items-start">
                <span className="shrink-0 w-11 h-11 rounded-lg bg-brand-primary/10 dark:bg-dark-primary/20 text-brand-primary dark:text-dark-primary flex items-center justify-center">
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <h3 className="font-bold text-brand-primary dark:text-dark-primary mb-1">
                    Independently audited
                  </h3>
                  <p className="text-sm text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed">
                    SRC's accounts are audited annually by an independent firm; the full report is
                    published on this site.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: giving widget */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-surface dark:bg-dark-surface rounded-2xl p-6 sm:p-8 md:p-10 border border-brand-primary/10 dark:border-white/10 shadow-sm"
            >
              {/* Frequency */}
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/70 dark:text-dark-ink/70 mb-3">
                  Frequency
                </p>
                <div className="inline-flex p-1 rounded-lg bg-brand-bg dark:bg-dark-bg/60 border border-brand-primary/10 dark:border-white/10">
                  {(monthlyEnabled
                    ? (['one-time', 'monthly'] as const)
                    : (['one-time'] as const)
                  ).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFrequency(f)}
                      className={`px-5 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-colors ${
                        frequency === f
                          ? 'bg-brand-primary dark:bg-dark-primary text-white'
                          : 'text-brand-ink/60 dark:text-dark-ink/70 hover:text-brand-primary dark:hover:text-dark-primary'
                      }`}
                      aria-pressed={frequency === f}
                    >
                      {f === 'one-time' ? 'One-time' : 'Monthly'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tiers */}
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/70 dark:text-dark-ink/70 mb-3">
                  Choose an amount (USD)
                </p>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {TIERS.map((tier) => {
                    const isSelected = !customAmount && selectedAmount === tier.amount;
                    return (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(tier.amount);
                          setCustomAmount('');
                        }}
                        aria-pressed={isSelected}
                        className={`relative text-start p-3.5 sm:p-4 rounded-lg border transition-all ${
                          isSelected
                            ? 'border-brand-primary dark:border-dark-primary bg-brand-primary/5 dark:bg-dark-primary/10'
                            : 'border-brand-primary/15 dark:border-white/10 hover:border-brand-primary/40 dark:hover:border-dark-primary/40'
                        }`}
                      >
                        {tier.recommended && (
                          <span className="absolute top-2 end-2 text-[8px] uppercase tracking-widest font-bold text-brand-secondary dark:text-dark-secondary">
                            Suggested
                          </span>
                        )}
                        <p className="text-xl sm:text-2xl font-serif font-bold text-brand-primary dark:text-dark-primary mb-1">
                          ${tier.amount}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/60 dark:text-dark-ink/70 mb-1">
                          {tier.label}
                        </p>
                        <p className="text-xs text-brand-ink/60 dark:text-dark-ink/70 leading-snug">
                          {tier.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom amount */}
              <div className="mb-8">
                <label
                  htmlFor="custom-amount"
                  className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/70 dark:text-dark-ink/70 mb-2 block"
                >
                  Or enter a custom amount
                </label>
                <div className="relative">
                  <span className="absolute start-4 top-1/2 -translate-y-1/2 text-brand-ink/40 dark:text-dark-ink/40 font-medium">
                    $
                  </span>
                  <input
                    id="custom-amount"
                    type="number"
                    inputMode="decimal"
                    min="1"
                    placeholder="500"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="w-full bg-brand-bg dark:bg-dark-bg/60 border border-brand-primary/15 dark:border-white/10 rounded-lg ps-9 pe-4 py-3 text-base font-medium text-brand-ink dark:text-dark-ink focus:ring-2 focus:ring-brand-accent outline-none"
                  />
                </div>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={handleDonate}
                disabled={!stripeEnabled || finalAmount <= 0 || status === 'redirecting'}
                className={`w-full inline-flex items-center justify-center gap-3 py-4 rounded-lg font-bold text-xs uppercase tracking-[0.2em] transition-colors ${
                  stripeEnabled && finalAmount > 0
                    ? 'bg-brand-primary dark:bg-dark-primary text-white hover:bg-opacity-90'
                    : 'bg-brand-primary/30 dark:bg-dark-primary/30 text-white/70 cursor-not-allowed'
                }`}
              >
                {status === 'redirecting'
                  ? 'Redirecting…'
                  : `Continue with $${finalAmount > 0 ? finalAmount : '0'} ${frequency === 'monthly' ? '/ month' : ''}`}
                <ArrowRight size={16} />
              </button>

              {status === 'error' && (
                <p
                  aria-live="polite"
                  className="mt-3 text-center text-sm text-red-700 dark:text-red-400"
                >
                  Something went wrong starting checkout. Please try again.
                </p>
              )}

              <p className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-ink/70 dark:text-dark-ink/70">
                <Lock size={12} />
                {stripeEnabled ? 'Secure checkout via Stripe' : 'Secure online giving coming soon'}
              </p>

              {stripeEnabled ? (
                <p className="mt-6 text-xs text-brand-ink/70 dark:text-dark-ink/70 text-center leading-relaxed">
                  SRC is a registered nonprofit. Donations are tax-deductible where allowed by law.
                  You&apos;ll receive a receipt by email.
                </p>
              ) : (
                <p className="mt-6 text-xs text-brand-ink/70 dark:text-dark-ink/70 text-center leading-relaxed">
                  SRC is a registered nonprofit. Donations are tax-deductible where allowed by law.
                  The secure payment portal is currently being finalized — please{' '}
                  <Link
                    href="/contact"
                    className="underline hover:text-brand-primary dark:hover:text-dark-primary"
                  >
                    contact us
                  </Link>{' '}
                  for wire transfer or partner-organization donations.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
