import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Target, Users, ShieldCheck, Globe, ArrowRight } from 'lucide-react';

export const About = () => {
  const values = [
    { icon: <Target size={22} />, title: 'Precision aid', desc: 'Resources directed to the most isolated rural sectors, where impact is highest per dollar.' },
    { icon: <Users size={22} />, title: 'Community first', desc: 'Every program is designed and approved by community advisory boards before launch.' },
    { icon: <ShieldCheck size={22} />, title: 'Transparency', desc: 'Quarterly financial reporting and open-access program data for all donors.' },
    { icon: <Globe size={22} />, title: 'Localization', desc: 'Sudanese problems are solved by Sudanese teams, supported by global standards.' },
  ];

  const board = [
    { name: 'Dr. Amel Osman', role: 'Executive Director' },
    { name: 'Tariq El-Bashir', role: 'Chair, Board of Trustees' },
    { name: 'Nadia Idris', role: 'Director of Programs' },
    { name: 'Mohamed Suleiman', role: 'Director of Finance & Compliance' },
    { name: 'Hawa Ahmed', role: 'Head of Field Operations' },
    { name: 'Yusuf Khalid', role: 'General Counsel' },
  ];

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
            Founded 2015 · Khartoum, Sudan
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6 text-brand-primary dark:text-dark-primary leading-tight"
          >
            A decade of resilience and rural reform.
          </motion.h1>
          <p className="text-lg md:text-xl text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed max-w-3xl">
            Born from a grassroots initiative in North Kordofan, SRC has grown into a Sudan-wide nonprofit dedicated to the prosperity of rural communities — operating across fifteen states with local advisory boards in each.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                alt="Community gathering"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div>
            <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">Our story</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-brand-primary dark:text-dark-primary leading-tight">
              Rooted in local wisdom.
            </h2>
            <div className="space-y-5 text-brand-ink/75 dark:text-dark-ink/75 leading-relaxed">
              <p>
                SRC was founded on a simple premise: those closest to the challenges of rural life are best equipped to design the solutions. In Sudan, rural areas face multi-layered crises — from climate-induced water scarcity to fragmented peace.
              </p>
              <p>
                Our approach is holistic. We don't just build schools; we build community centers that serve as hubs for peace mediation. We don't just provide water; we empower local committees to manage and maintain their own natural resources.
              </p>
              <p>
                Today, SRC works with international partners to bridge global humanitarian standards with local cultural context — and we publish every program budget so the communities we serve can hold us accountable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 px-6 bg-brand-footer text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">What guides us</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">Our core principles.</h2>
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

      {/* Board / Leadership */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">Leadership</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-brand-primary dark:text-dark-primary">
              Board of trustees.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {board.map(member => (
              <div
                key={member.name}
                className="p-6 rounded-xl border border-brand-primary/10 dark:border-white/10 bg-brand-surface dark:bg-dark-surface hover:border-brand-primary/30 dark:hover:border-dark-primary/40 transition-colors"
              >
                <p className="font-serif font-bold text-lg text-brand-primary dark:text-dark-primary mb-1">{member.name}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/55 dark:text-dark-ink/55">{member.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-brand-primary dark:text-dark-primary font-bold text-sm uppercase tracking-widest border-b border-brand-primary/30 dark:border-dark-primary/40 pb-1 hover:border-brand-primary dark:hover:border-dark-primary transition-colors"
            >
              Read about our governance
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
