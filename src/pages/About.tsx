import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, ShieldCheck, Globe } from 'lucide-react';

export const About = () => {
  const values = [
    { icon: <Target className="text-brand-secondary" />, title: "Precision Aid", desc: "We direct resources specifically to the most isolated rural sectors where impact is needed most." },
    { icon: <Users className="text-brand-secondary" />, title: "Community First", desc: "Every project is led by community advisory boards to ensure local ownership and sustainability." },
    { icon: <ShieldCheck className="text-brand-secondary" />, title: "Integrity", desc: "Transparent reporting and absolute accountability to both our beneficiaries and donors." },
    { icon: <Globe className="text-brand-secondary" />, title: "Localization", desc: "We believe Sudanese problems are best solved by Sudanese minds, empowered with global resources." },
  ];

  return (
    <div className="bg-brand-bg pt-24">
      {/* Header */}
      <section className="py-24 px-6 bg-brand-surface">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-brand-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
          >
            Since 2018
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-8 text-brand-primary"
          >
            A legacy of <span className="italic text-brand-secondary">resilience</span> and hope.
          </motion.h1>
          <p className="text-xl text-brand-ink/70 font-light leading-relaxed">
            Born from a grassroots initiative in North Kordofan, SRC has grown into a nationwide trust dedicated to the prosperity of Sudan's rural heartlands.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                alt="Community Meeting"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-brand-primary text-white p-8 rounded-3xl hidden md:block shadow-2xl">
              <p className="text-4xl font-serif font-bold mb-1">15+</p>
              <p className="text-xs uppercase font-bold tracking-widest text-brand-accent">Active States</p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-serif font-bold mb-8 text-brand-primary">Rooted in local wisdom.</h2>
            <div className="space-y-6 text-brand-ink/70 leading-relaxed font-medium">
              <p>
                The Sudanese Rural Community (SRC) was founded on a simple premise: those closest to the challenges of rural life are best equipped to design the solutions. In Sudan, rural areas often face multi-layered crises—from climate-induced water scarcity to the fragmentation of peace.
              </p>
              <p>
                Our approach is holistic. We don't just build schools; we build community centers that serve as hubs for peace mediation. We don't just provide water; we empower local committees to manage and maintain their own natural resources.
              </p>
              <p>
                Today, SRC stands as a beacon of stability, working with international partners to bridge the gap between global humanitarian standards and local cultural nuances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 px-6 bg-brand-footer text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
             <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Core Philosophy</h2>
             <div className="h-1 w-24 bg-brand-accent mx-auto opacity-50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div 
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors"
              >
                <div className="mb-6 p-4 bg-white/5 rounded-2xl inline-block">
                  {v.icon}
                </div>
                <h3 className="text-xl font-serif font-bold mb-4 text-white">{v.title}</h3>
                <p className="text-sm text-brand-surface/60 leading-relaxed font-medium uppercase tracking-wider">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-serif font-bold mb-4 text-brand-primary">Our Leadership</h2>
          <p className="text-brand-ink/50 max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold">A diverse team of experts, elders, and innovators dedicated to rural reform.</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-12">
          {[1,2,3].map(i => (
            <div key={i} className="group text-center">
              <div className="aspect-square rounded-full overflow-hidden mb-6 bg-brand-surface border-4 border-brand-surface grayscale group-hover:grayscale-0 transition-all transform group-hover:scale-105 shadow-xl">
                 <img src={`https://i.pravatar.cc/300?u=src-${i}`} alt="Leader" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-serif font-bold text-lg text-brand-primary">Trustee Member {i}</h4>
              <p className="text-[10px] text-brand-secondary font-bold tracking-widest uppercase mt-1">Expert Counsel</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
