import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative bg-brand-bg dark:bg-dark-bg pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-6">
            Sudanese Rural Community · Est. 2015
          </p>
          <h1 className="font-serif font-bold text-brand-primary dark:text-dark-primary leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8">
            Building peace and resilience across rural Sudan.
          </h1>
          <p className="text-lg md:text-xl text-brand-ink/70 dark:text-dark-ink/70 max-w-2xl leading-relaxed mb-10">
            We partner with local leaders to advance education, water access, and community-led peacebuilding — from Darfur and Kordofan to the Blue Nile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-3 bg-brand-primary dark:bg-dark-primary text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-md"
            >
              Support our work
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center justify-center gap-3 border border-brand-primary/20 dark:border-dark-primary/30 text-brand-primary dark:text-dark-primary px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-brand-primary/5 dark:hover:bg-dark-primary/10 transition-all"
            >
              See our programs
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-brand-surface dark:bg-dark-surface">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
              alt="Community gathering in rural Sudan"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-footer/90 to-transparent p-6 text-white">
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-accent mb-1">In the field</p>
              <p className="text-sm font-medium leading-snug">North Kordofan · 2024</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
