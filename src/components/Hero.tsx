import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] md:h-screen flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Hero Left Text */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 text-white relative overflow-hidden bg-brand-primary dark:bg-dark-primary pt-32 pb-16 md:py-0 transition-colors duration-500">
        {/* Abstract background shape */}
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full opacity-10 pointer-events-none bg-brand-footer"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight mb-8 font-serif font-bold">
            Sudanese Rural <br/>
            Community is <br/>
            <span className="relative inline-block italic font-normal">
              creating peace
              <svg className="absolute left-0 -bottom-2 w-full h-3 text-brand-accent opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" />
              </svg>
            </span> <br/>
            from villages
          </h1>
          <p className="text-lg opacity-80 max-w-md mb-10 leading-relaxed font-light">
            Empowering the heart of Sudan through sustainable development, humanitarian aid, and dedicated peacebuilding efforts.
          </p>
          <Link
            to="/donate"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-md text-white font-bold transition-all shadow-xl bg-brand-secondary dark:bg-dark-secondary hover:bg-opacity-90 transform hover:-translate-y-1 uppercase tracking-widest text-xs"
          >
            Join us Today
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      {/* Hero Right Visuals */}
      <div className="flex-1 relative bg-brand-surface dark:bg-dark-surface flex items-center justify-center p-8 md:p-16 overflow-hidden min-h-[400px] transition-colors duration-500">
        {/* Decorative accents */}
        <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-brand-accent rounded-tr-3xl hidden md:block"></div>
        <div className="absolute bottom-20 left-10 w-12 h-12 flex flex-wrap gap-2 hidden md:flex">
          <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
          <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
          <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
          <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
        </div>

        {/* Main Large Rounded Image Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-full max-h-[600px] overflow-hidden rounded-[40px] shadow-2xl bg-brand-primary dark:bg-dark-primary shadow-brand-primary/20 dark:shadow-black/50"
        >
          <img 
            src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=2070&auto=format&fit=crop"
            alt="Sudanese Community"
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          
          {/* Floating Video Inset */}
          <div className="absolute bottom-8 -left-8 w-40 h-40 md:w-48 md:h-48 bg-brand-footer dark:bg-black rounded-3xl border-4 border-brand-surface dark:border-dark-surface overflow-hidden hidden sm:flex flex-col items-center justify-center shadow-2xl transition-colors">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-brand-primary dark:border-l-dark-primary border-b-8 border-b-transparent ml-1"></div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white opacity-80 font-bold">Play Mission</span>
          </div>

          {/* Overlapping Badge */}
          <div className="absolute top-10 right-10 bg-brand-accent text-brand-footer px-4 py-2 rounded-full font-bold text-xs tracking-tighter shadow-lg rotate-12">
            EST. 2015
          </div>
        </motion.div>
      </div>
    </section>
  );
};
