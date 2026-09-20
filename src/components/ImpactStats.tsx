'use client';

import { motion } from 'motion/react';

export type Stat = { value: string; label: string };

export const ImpactStats = ({ stats }: { stats: Stat[] }) => {
  if (stats.length === 0) return null;
  return (
    <section className="py-12 md:py-14 px-6 border-y border-brand-primary/10 dark:border-white/5 bg-brand-surface/70 dark:bg-dark-surface/30 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <p className="text-3xl md:text-4xl font-serif font-bold text-brand-primary dark:text-dark-primary mb-1">
              {stat.value}
            </p>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-brand-ink/55 dark:text-dark-ink/60">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
