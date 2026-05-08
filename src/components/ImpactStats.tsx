import React from 'react';
import { motion } from 'motion/react';

export const ImpactStats = () => {
  const stats = [
    { label: 'Lives Impacted', value: '12k+' },
    { label: 'Active Projects', value: '45' },
    { label: 'Rural Hubs', value: '18' },
    { label: 'Volunteers', value: '800+' },
  ];

  return (
    <section className="py-12 flex items-center justify-center px-6 border-y border-brand-primary/5 bg-brand-surface dark:bg-dark-surface dark:border-white/5 transition-colors">
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-[10px] md:text-sm uppercase tracking-[0.2em] font-bold text-brand-primary dark:text-dark-primary">
        {stats.map((stat, i) => (
          <React.Fragment key={stat.label}>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl md:text-3xl font-serif font-black text-brand-accent dark:text-dark-accent">{stat.value}</span>
              <span className="opacity-70 dark:text-white/70">{stat.label}</span>
            </motion.div>
            {i < stats.length - 1 && (
              <div className="hidden lg:block w-1 h-1 rounded-full bg-brand-primary/20 dark:bg-dark-primary/20"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
