import React from 'react';
import { motion } from 'motion/react';
import { CauseCard } from '../components/CauseCard';

export const Work = () => {
  const allCauses = [
    {
      title: 'Resilient peacebuilding',
      tag: 'Social stability',
      image: 'https://images.unsplash.com/photo-1608317544280-9e9916b8c54d?q=80&w=2070&auto=format&fit=crop',
      description: 'Restoring communal harmony through traditional mediation and youth-led dialogue across Darfur and Kordofan.',
    },
    {
      title: 'Rural education centers',
      tag: 'Learning',
      image: 'https://images.unsplash.com/photo-1596895307394-1d15bf597744?q=80&w=2070&auto=format&fit=crop',
      description: 'Tech-enabled learning spaces for children in underserved rural districts, with trained teachers and a digital library.',
    },
    {
      title: 'Emergency water relief',
      tag: 'Vital resources',
      image: 'https://images.unsplash.com/photo-1663876458229-4a7ac3e4be45?q=80&w=2070&auto=format&fit=crop',
      description: 'Solar-powered boreholes and sustainable water management for arid rural communities across North Sudan.',
    },
    {
      title: 'Agricultural innovation',
      tag: 'Food security',
      image: 'https://images.unsplash.com/photo-1633215357805-310e47d9c72e?q=80&w=2070&auto=format&fit=crop',
      description: 'Training rural farmers in climate-smart irrigation and seed diversification to combat desertification.',
    },
    {
      title: 'Mobile health clinics',
      tag: 'Health',
      image: 'https://images.unsplash.com/photo-1705676112042-4fb11cade8d4?q=80&w=2070&auto=format&fit=crop',
      description: 'Maternal and pediatric care delivered to nomadic communities through solar-powered mobile units.',
    },
    {
      title: "Women's cooperatives",
      tag: 'Economic',
      image: 'https://plus.unsplash.com/premium_photo-1699535657712-02fe404e916f?q=80&w=2070&auto=format&fit=crop',
      description: 'Micro-financing and skills training for women-led groups in handicrafts, agro-processing, and trade.',
    },
  ];

  const partners = ['UNICEF', 'WFP', 'OCHA', 'OXFAM', 'IRC', 'UNHCR'];

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
            className="text-4xl md:text-6xl font-serif font-bold mb-6 text-brand-primary dark:text-dark-primary leading-tight"
          >
            How we work in rural Sudan.
          </motion.h1>
          <p className="text-lg md:text-xl text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed max-w-3xl">
            Six core programs, each designed and operated in partnership with local advisory boards. Every program is reviewed annually and budgets are published quarterly.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 md:gap-y-16">
            {allCauses.map((cause, i) => (
              <CauseCard key={cause.title} {...cause} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 md:py-20 px-6 bg-brand-surface dark:bg-dark-surface/40 border-y border-brand-primary/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-4">
              <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-3">Partnerships</p>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
                Global standards, local execution.
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                {partners.map(p => (
                  <span key={p} className="font-serif font-bold text-xl md:text-2xl text-brand-primary/40 dark:text-dark-primary/50 tracking-wide">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
