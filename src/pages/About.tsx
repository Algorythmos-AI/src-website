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

  const leadership = [
    { name: 'Obeid NAEIM', role: 'President', image: '/Our-Leadership/Obeid-NAEIM.png' },
    { name: 'Elzubier MOHAMED', role: 'Secretary General', image: '/Our-Leadership/Elzubier-MOHAMED.png' },
    { name: 'Nasradine Ibrahim', role: 'Treasurer', image: '/Our-Leadership/Nasradine-Ibrahim.png' },
    { name: 'Musab ALALIM', role: 'Project Manager & Awareness Officer', image: '/Our-Leadership/Musab-ALALIM.png' },
    { name: 'Assamani BASHIR', role: 'Official Spokesperson', image: '/Our-Leadership/Assamani-BASHIR.png' },
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
            Founded 2015 · Headquartered in Paris · Operating in North Sudan
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6 text-brand-primary dark:text-dark-primary leading-tight"
          >
            A decade of resilience and rural reform.
          </motion.h1>
          <p className="text-lg md:text-xl text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed max-w-3xl">
            Founded by the Sudanese diaspora in Paris and rooted in North Sudan's rural heartlands, SRC delivers education, water, health, and peacebuilding programs in partnership with local communities — and represents their voices at United Nations forums in Geneva and beyond.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1596895307394-1d15bf597744?q=80&w=2070&auto=format&fit=crop"
                alt="Community gathering in North Sudan"
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

      {/* International engagement */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5">
            <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">International engagement</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-brand-primary dark:text-dark-primary">
              From rural Sudan to the United Nations in Geneva.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-brand-ink/75 dark:text-dark-ink/75 leading-relaxed">
            <p>
              Operating from our Paris headquarters, SRC carries the priorities of rural Sudanese communities into international policy spaces. We attend the UN Human Rights Council and humanitarian coordination meetings in Geneva, working alongside member states and partner NGOs to advocate for sustained funding, civilian protection, and dignified humanitarian access.
            </p>
            <p>
              Our delegation regularly participates in UNHCR pledging conferences, OCHA humanitarian roundtables, and side events at the UN General Assembly — bringing field-verified data and the testimony of community advisors directly into the rooms where policy is shaped.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 md:py-28 px-6 bg-brand-surface dark:bg-dark-surface/40 border-t border-brand-primary/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">Our leadership</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-brand-primary dark:text-dark-primary">
              The team behind SRC.
            </h2>
            <p className="mt-6 text-brand-ink/65 dark:text-dark-ink/65 leading-relaxed max-w-xl">
              Elected officers and senior staff guide the organization's mission, finances, and field operations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {leadership.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.06 }}
                className="group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-brand-surface dark:bg-dark-surface shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={person.image}
                    alt={`Portrait of ${person.name}, ${person.role}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="font-serif font-bold text-base md:text-lg text-brand-primary dark:text-dark-primary leading-tight">
                  {person.name}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/55 dark:text-dark-ink/55 mt-1.5">
                  {person.role}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14">
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
