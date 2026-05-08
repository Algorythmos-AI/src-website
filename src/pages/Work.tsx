import React from 'react';
import { motion } from 'motion/react';
import { CauseCard } from '../components/CauseCard';

export const Work = () => {
  const allCauses = [
    {
      title: "Resilient Peacebuilding",
      tag: "Social Stability",
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=2070&auto=format&fit=crop",
      description: "Restoring communal harmony through traditional mediation and youth-led dialogue programs across Darfur and Kordofan."
    },
    {
      title: "Rural Education Centers",
      tag: "Learning",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
      description: "Constructing tech-enabled learning spaces for children in underserved rural districts, bridging the literacy gap."
    },
    {
      title: "Emergency Water Relief",
      tag: "Vital Resources",
      image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=1974&auto=format&fit=crop",
      description: "Implementing solar-powered boreholes and sustainable water management systems for arid rural communities."
    },
    {
      title: "Agricultural Innovation",
      tag: "Food Security",
      image: "https://images.unsplash.com/photo-1592919016327-5197f0be06ed?q=80&w=2070&auto=format&fit=crop",
      description: "Training rural farmers in climate-smart irrigation and seed diversification to combat desertification."
    },
    {
      title: "Mobile Health Clinics",
      tag: "Health",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      description: "Bringing essential maternal and pediatric care to nomadic communities through solar-powered mobile units."
    },
    {
      title: "Women's Empowerment",
      tag: "Economic",
      image: "https://images.unsplash.com/photo-1489424196627-698d14d7a28e?q=80&w=1974&auto=format&fit=crop",
      description: "Micro-financing and skills training for women-led cooperatives in traditional handicrafts and agro-processing."
    }
  ];

  return (
    <div className="bg-brand-bg pt-24 leading-normal">
      {/* Header */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-brand-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
          >
            Sustainable Impact
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif font-bold mb-8 text-brand-primary leading-[0.85] tracking-tight"
          >
            Our <span className="italic text-brand-secondary">dedicated</span> <br />mission in action.
          </motion.h1>
          <p className="text-xl text-brand-ink/50 max-w-2xl font-light leading-relaxed">
            By focusing on core pillars of human dignity, we create ripples of change that transform entire regions. Explore our current focal points.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 px-6 border-t border-brand-ink/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {allCauses.map((cause, i) => (
              <CauseCard key={cause.title} {...cause} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners / Stats */}
      <section className="py-24 px-6 bg-brand-surface">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="max-w-md">
             <h2 className="text-3xl font-serif font-bold mb-4 text-brand-primary">A global collaboration for local excellence.</h2>
             <p className="text-brand-ink/60 font-medium">We partner with UN agencies, NGOs, and the Sudanese Diaspora to maximize our reach.</p>
           </div>
           <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale contrast-125">
              <span className="text-2xl font-serif font-bold text-brand-primary">UNICEF</span>
              <span className="text-2xl font-serif font-bold text-brand-primary">WFP</span>
              <span className="text-2xl font-serif font-bold text-brand-primary">OXFAM</span>
              <span className="text-2xl font-serif font-bold text-brand-primary">RED CROSS</span>
           </div>
        </div>
      </section>
    </div>
  );
};
