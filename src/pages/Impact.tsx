import React from 'react';
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
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-brand-surface dark:bg-dark-surface p-8 rounded-[2.5rem] border border-brand-primary/5 dark:border-dark-primary/10 shadow-sm"
  >
    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 dark:bg-dark-primary/20 flex items-center justify-center text-brand-primary dark:text-dark-primary mb-6">
      <Icon size={24} />
    </div>
    <h3 className="text-4xl font-serif font-bold text-brand-primary dark:text-dark-primary mb-2">{value}</h3>
    <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-ink/80 dark:text-dark-ink/80 mb-4">{label}</p>
    <p className="text-sm text-brand-ink/60 dark:text-dark-ink/60 leading-relaxed font-medium">
      {desc}
    </p>
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
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group"
  >
    <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-xl relative">
      <img src={image} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
        <div className="bg-white/90 dark:bg-dark-surface/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl">
           <ShareButtons title={title} className="text-brand-ink dark:text-dark-ink" />
        </div>
      </div>
    </div>
    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-secondary dark:text-dark-secondary mb-3 block">{category}</span>
    <h3 className="text-3xl font-serif font-bold text-brand-primary dark:text-dark-primary mb-4 group-hover:text-brand-secondary dark:group-hover:text-dark-secondary transition-colors italic leading-tight">
      {title}
    </h3>
    <div className="pl-6 border-l-2 border-brand-primary/20 dark:border-dark-primary/20">
      <p className="text-lg text-brand-ink/70 dark:text-dark-ink/70 italic font-light leading-relaxed mb-4">
        "{quote}"
      </p>
      <p className="text-xs font-bold uppercase tracking-widest text-brand-ink/50 dark:text-dark-ink/40">— {author}</p>
    </div>
  </motion.div>
);

export const Impact = () => {
  const stats = [
    { icon: Users, value: "125,000+", label: "People Reached", desc: "Families across 15 states provided with direct educational and social support." },
    { icon: Droplets, value: "82", label: "Water Projects", desc: "Solar-powered boreholes established in drought-prone rural sectors." },
    { icon: BookOpen, value: "450+", label: "Rural Classrooms", desc: "Learning spaces renovated and equipped with modern resources and trained educators." },
    { icon: Heart, value: "12", label: "Peace Councils", desc: "Local mediation boards established to prevent communal conflicts and promote dialogue." }
  ];

  const stories = [
    {
      title: "Flowing Hope in Mayo",
      category: "Water & Sanitation",
      quote: "Before the borehole, my children walked four hours each day for water. Now, they are at the learning center and I have a garden.",
      author: "Fatima, Community Chairperson",
      image: "https://images.unsplash.com/photo-1547523199-469b3dc2a538?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Learning Without Borders",
      category: "Education",
      quote: "The digital library in our village was something we only saw on TV. SRC brought the world to our fingertips.",
      author: "Ahmed, Student (Age 14)",
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072&auto=format&fit=crop"
    }
  ];

  const locations = [
    { x: '30%', y: '40%', label: 'Al-Fashir' },
    { x: '45%', y: '25%', label: 'Dongola' },
    { x: '55%', y: '50%', label: 'Khartoum' },
    { x: '65%', y: '70%', label: 'Blue Nile' },
    { x: '40%', y: '65%', label: 'Kordofan' },
    { x: '80%', y: '55%', label: 'Port Sudan' }
  ];

  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-20 transition-colors duration-300">
      {/* Hero */}
      <section className="py-24 px-6 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.4em] mb-6 block"
          >
            Transparent Accountability
          </motion.div>
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-6xl md:text-8xl font-serif font-bold text-brand-primary dark:text-dark-primary mb-10 tracking-tight leading-[0.9]"
          >
            Measuring our <br /><span className="italic">collective</span> progress.
          </motion.h1>
          <p className="text-xl text-brand-ink/60 dark:text-dark-ink/60 font-light leading-relaxed max-w-2xl mx-auto">
            We believe in data that speaks to the heart. Every statistic represents a life changed, a community empowered, and a more peaceful Sudan.
          </p>
        </div>
      </section>

      {/* Grid Stats */}
      <section className="py-24 px-6 bg-brand-surface dark:bg-dark-surface/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Narrative Section - Success Stories */}
      <section className="py-24 px-6 md:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-primary dark:text-dark-primary mb-6">Seeds of transformational <span className="italic font-normal">change</span>.</h2>
              <p className="text-brand-ink/60 dark:text-dark-ink/60 font-medium">Beyond numbers, we measure success by the smiles and resilience of our partners in the field.</p>
            </div>
            <button className="flex items-center gap-3 text-brand-secondary dark:text-dark-secondary font-bold uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
              Explore More Stories <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
             {stories.map(story => (
               <StoryCard key={story.title} {...story} />
             ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Visual */}
      <section className="py-32 px-6 bg-brand-footer text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,#6F1E0C_1px,transparent_1px)] bg-[length:32px_32px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Presence in the Field</span>
              <h2 className="text-5xl font-serif font-bold mb-8 italic">A footprint across the heartlands.</h2>
              <p className="text-white/70 leading-relaxed text-lg font-light mb-10">
                From the bustling markets of North Kordofan to the resilient communities of Western Darfur, our reach is guided by local wisdom and global standards.
              </p>
              
              <div className="space-y-6">
                {locations.filter((_, i) => i < 3).map(loc => (
                  <div key={loc.label} className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                    <span className="text-sm font-bold uppercase tracking-widest">{loc.label} District</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-square max-w-xl mx-auto lg:mx-0 w-full bg-white/5 rounded-[4rem] border border-white/10 p-12 overflow-hidden shadow-2xl backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 transform scale-125">
                 {/* Simplified Sudan Outline Shape */}
                 <svg viewBox="0 0 100 100" className="w-[80%] fill-brand-accent">
                    <path d="M40,10 L60,15 L80,30 L85,60 L70,85 L50,95 L25,85 L10,60 L15,30 L30,15 Z" />
                 </svg>
              </div>
              
              {locations.map((loc, i) => (
                <motion.div
                  key={loc.label}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ left: loc.x, top: loc.y }}
                  className="absolute"
                >
                  <button
                    type="button"
                    aria-label={`${loc.label} field site`}
                    className="group relative block focus:outline-none"
                  >
                    <span className="block w-4 h-4 bg-brand-accent rounded-full shadow-[0_0_20px_rgba(255,208,99,0.8)] cursor-pointer ring-offset-2 ring-offset-brand-footer group-focus-visible:ring-2 group-focus-visible:ring-white" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white text-brand-ink px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {loc.label}
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="max-w-4xl mx-auto bg-brand-primary dark:bg-dark-primary rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl"
         >
           <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Join the <span className="italic font-normal">ripples</span> of progress.</h2>
           <p className="text-white/80 mb-10 max-w-md mx-auto leading-relaxed">Your support fuels the data points above. Be a part of Sudan’s sustainable growth story.</p>
           <button className="bg-white text-brand-primary dark:text-dark-primary px-10 py-5 rounded-full font-bold text-lg hover:shadow-xl transition-all">Support Our Impact</button>
         </motion.div>
      </section>
    </div>
  );
};
