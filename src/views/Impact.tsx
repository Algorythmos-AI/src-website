'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { motion } from 'motion/react';
import { Users, Droplets, BookOpen, Heart, ArrowRight, type LucideIcon } from 'lucide-react';
import { ShareButtons } from '../components/ShareButtons';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  desc: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-brand-surface dark:bg-dark-surface p-7 rounded-2xl border border-brand-primary/10 dark:border-white/10"
  >
    <div className="w-11 h-11 rounded-lg bg-brand-primary/10 dark:bg-dark-primary/20 flex items-center justify-center text-brand-primary dark:text-dark-primary mb-5">
      <Icon size={20} />
    </div>
    <p className="text-3xl md:text-4xl font-serif font-bold text-brand-primary dark:text-dark-primary mb-2">
      {value}
    </p>
    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/70 dark:text-dark-ink/70 mb-3">
      {label}
    </p>
    <p className="text-sm text-brand-ink/65 dark:text-dark-ink/65 leading-relaxed">{desc}</p>
  </motion.div>
);

interface StoryCardProps {
  image: string;
  title: string;
  category: string;
  quote: string;
  author: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ image, title, category, quote, author }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    className="group"
  >
    <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 shadow-sm group-hover:shadow-md transition-shadow relative">
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100 transition-opacity">
        <div className="bg-white/95 dark:bg-dark-surface/95 px-3 py-2 rounded-full shadow-sm">
          <ShareButtons title={title} className="text-brand-ink dark:text-dark-ink" />
        </div>
      </div>
    </div>
    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-secondary dark:text-dark-secondary mb-2 block">
      {category}
    </span>
    <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-primary dark:text-dark-primary mb-4 leading-tight">
      {title}
    </h3>
    <div className="pl-5 border-l-2 border-brand-primary/15 dark:border-dark-primary/20">
      <p className="text-base md:text-lg text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed mb-3">
        “{quote}”
      </p>
      <p className="text-xs font-bold uppercase tracking-widest text-brand-ink/70 dark:text-dark-ink/40">
        — {author}
      </p>
    </div>
  </motion.article>
);

export const Impact = () => {
  const stats = [
    {
      icon: Users,
      value: '125,000+',
      label: 'People reached',
      desc: 'Families across 15 states supported with education and social services.',
    },
    {
      icon: Droplets,
      value: '82',
      label: 'Water projects',
      desc: 'Solar-powered boreholes serving drought-prone rural districts.',
    },
    {
      icon: BookOpen,
      value: '450+',
      label: 'Rural classrooms',
      desc: 'Learning spaces renovated, equipped, and staffed with trained teachers.',
    },
    {
      icon: Heart,
      value: '12',
      label: 'Peace councils',
      desc: 'Local mediation boards established to prevent and resolve communal conflicts.',
    },
  ];

  const stories = [
    {
      title: 'Water in Mayo',
      category: 'Water & sanitation',
      quote:
        'Before the borehole, my children walked four hours each day for water. Now they are at the learning center, and I have a garden.',
      author: 'Fatima, community chairperson',
      image:
        'https://images.unsplash.com/photo-1633215357805-310e47d9c72e?q=80&w=2070&auto=format&fit=crop',
    },
    {
      title: 'Learning without borders',
      category: 'Education',
      quote:
        'The digital library in our village was something we only saw on television. SRC brought the world to our fingertips.',
      author: 'Ahmed, student (age 14)',
      image:
        'https://images.unsplash.com/photo-1608317544280-9e9916b8c54d?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  const locations = [
    { x: '30%', y: '40%', label: 'Al-Fashir' },
    { x: '45%', y: '25%', label: 'Dongola' },
    { x: '55%', y: '50%', label: 'Khartoum' },
    { x: '65%', y: '70%', label: 'Blue Nile' },
    { x: '40%', y: '65%', label: 'Kordofan' },
    { x: '80%', y: '55%', label: 'Port Sudan' },
  ];

  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 bg-brand-surface dark:bg-dark-surface/40 border-b border-brand-primary/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Transparency & accountability
          </p>
          <h1 className="text-balance text-4xl md:text-6xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight mb-6">
            Our impact, audited and reported.
          </h1>
          <p className="text-lg md:text-xl text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed max-w-3xl">
            Every figure on this page is verified by an independent auditor and published in our
            annual report. Numbers reflect cumulative results from 2015 through the latest reporting
            period.
          </p>
        </div>
      </section>

      {/* Stats grid */}
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Stories */}
      <section className="py-20 md:py-24 px-6 bg-brand-surface dark:bg-dark-surface/40 border-y border-brand-primary/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
            <div className="max-w-xl">
              <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-3">
                From the field
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
                Stories behind the numbers.
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-brand-primary dark:text-dark-primary font-bold text-xs uppercase tracking-widest border-b border-brand-primary/30 dark:border-dark-primary/40 pb-1 hover:border-brand-primary dark:hover:border-dark-primary transition-colors"
            >
              See all programs
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {stories.map((story) => (
              <StoryCard key={story.title} {...story} />
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 md:py-28 px-6 bg-brand-footer text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,#FFD063_1px,transparent_1px)] bg-[length:28px_28px]" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">
                Where we work
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight">
                Fifteen states. One commitment.
              </h2>
              <p className="text-white/70 leading-relaxed mb-8 text-base md:text-lg">
                From North Kordofan to the Blue Nile and the highlands around Port Sudan, our reach
                is guided by local advisory boards and global humanitarian standards.
              </p>
              <ul className="space-y-3">
                {locations.slice(0, 4).map((loc) => (
                  <li key={loc.label} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    <span className="text-sm uppercase tracking-widest font-bold">{loc.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-square max-w-xl mx-auto lg:mx-0 w-full bg-white/[0.04] rounded-2xl border border-white/10 p-10">
              <div className="absolute inset-0 flex items-center justify-center opacity-15">
                <svg viewBox="0 0 100 100" className="w-[78%] fill-brand-accent">
                  <path d="M40,10 L60,15 L80,30 L85,60 L70,85 L50,95 L25,85 L10,60 L15,30 L30,15 Z" />
                </svg>
              </div>
              {locations.map((loc, i) => (
                <motion.div
                  key={loc.label}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  style={{ left: loc.x, top: loc.y }}
                  className="absolute"
                >
                  <button
                    type="button"
                    aria-label={`${loc.label} field site`}
                    className="group relative block focus:outline-none"
                  >
                    <span className="block w-3 h-3 bg-brand-accent rounded-full shadow-[0_0_16px_rgba(255,208,99,0.7)] ring-offset-2 ring-offset-brand-footer group-focus-visible:ring-2 group-focus-visible:ring-white" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-brand-ink px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {loc.label}
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-4xl mx-auto bg-brand-primary dark:bg-dark-primary rounded-2xl p-10 md:p-14 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">
            Add to the next report.
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
            Every donation funds a project that's tracked, reported, and audited.
          </p>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 bg-white text-brand-primary px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-[0.2em] hover:bg-brand-surface transition-colors"
          >
            Support our impact
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};
