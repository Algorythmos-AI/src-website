'use client';

import { motion } from 'motion/react';
import { CauseCard } from '../components/CauseCard';

export type ProgramCard = {
  title: string;
  tag?: string;
  summary?: string;
  image?: string;
  href: string;
};

export const Work = ({ programs, partners }: { programs: ProgramCard[]; partners: string[] }) => {
  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 bg-brand-surface dark:bg-dark-surface/40 border-b border-brand-primary/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4"
          >
            Our programs
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-balance text-4xl md:text-6xl font-serif font-bold mb-6 text-brand-primary dark:text-dark-primary leading-tight"
          >
            How we work in rural Sudan.
          </motion.h1>
          <p className="text-lg md:text-xl text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed max-w-3xl">
            Each program is designed and operated in partnership with local advisory boards. Every
            program is reviewed annually and budgets are published quarterly.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          {programs.length === 0 ? (
            <p className="text-center text-brand-ink/60 dark:text-dark-ink/60">
              Programs will be published here soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 md:gap-y-16">
              {programs.map((p, i) => (
                <CauseCard
                  key={p.href}
                  title={p.title}
                  tag={p.tag}
                  description={p.summary ?? ''}
                  image={p.image}
                  href={p.href}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Partners */}
      {partners.length > 0 && (
        <section className="py-16 md:py-20 px-6 bg-brand-surface dark:bg-dark-surface/40 border-y border-brand-primary/10 dark:border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-4">
                <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-3">
                  Partnerships
                </p>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
                  Global standards, local execution.
                </h2>
              </div>
              <div className="md:col-span-8">
                <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                  {partners.map((p) => (
                    <span
                      key={p}
                      className="font-serif font-bold text-xl md:text-2xl text-brand-primary/40 dark:text-dark-primary/50 tracking-wide"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
