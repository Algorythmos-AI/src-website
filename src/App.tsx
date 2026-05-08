/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { CauseCard } from './components/CauseCard';
import { ImpactStats } from './components/ImpactStats';
import { motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load pages
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Work = lazy(() => import('./pages/Work').then(m => ({ default: m.Work })));
const Impact = lazy(() => import('./pages/Impact').then(m => ({ default: m.Impact })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Donate = lazy(() => import('./pages/Donate').then(m => ({ default: m.Donate })));

// Home Page Component
const Home = () => {
  const causes = [
    {
      title: "Resilient Peacebuilding",
      tag: "Initiative",
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=2070&auto=format&fit=crop",
      description: "Restoring communal harmony through traditional mediation and youth-led dialogue programs across Darfur and Kordofan."
    },
    {
      title: "Rural Education Centers",
      tag: "Development",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
      description: "Constructing tech-enabled learning spaces for children in underserved rural districts, bridging the literacy gap."
    },
    {
      title: "Emergency Water Relief",
      tag: "Humanitarian",
      image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=1974&auto=format&fit=crop",
      description: "Implementing solar-powered boreholes and sustainable water management systems for arid rural communities."
    }
  ];

  return (
    <main className="bg-brand-bg dark:bg-dark-bg transition-colors duration-300">
      <Hero />
      
      {/* Intro Section */}
      <section className="py-24 px-6 md:py-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight text-brand-primary dark:text-dark-primary"
            >
              For every <span className="italic font-normal">soul</span> in the heart of rural Sudan.
            </motion.h2>
          </div>
          <div>
            <p className="text-lg text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed font-light mb-8">
              The Sudanese Rural Community (SRC) is more than an organization—it's a movement born from a deep love for our lands and its people. We work alongside local leaders to solve the most pressing challenges of our time.
            </p>
            <Link to="/about" className="text-brand-secondary dark:text-dark-secondary font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform">
              Our Founding Story →
            </Link>
          </div>
        </div>
      </section>

      <ImpactStats />

      {/* Causes Section */}
      <section className="py-24 px-6 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 px-2 text-brand-ink dark:text-dark-ink">
            <div className="max-w-xl">
              <span className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Key Initiatives</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold leading-[0.9]">Where your <span className="italic text-brand-secondary dark:text-dark-secondary font-normal">impact</span> flows.</h2>
            </div>
            <Link to="/work" className="bg-brand-primary dark:bg-dark-primary text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-xl shadow-brand-primary/10 dark:shadow-black/30">
              View All Work
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {causes.map((cause, i) => (
              <CauseCard key={cause.title} {...cause} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote / Narrative Section */}
      <section className="py-32 bg-brand-surface dark:bg-dark-surface/50 overflow-hidden relative border-y border-brand-primary/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <span className="text-[12rem] font-serif text-brand-primary/5 dark:text-dark-primary/5 absolute -top-16 left-0 select-none">"</span>
          <motion.h3 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-3xl md:text-5xl font-serif italic font-light leading-snug mb-12 text-brand-primary dark:text-dark-primary relative z-10"
          >
            Dignity is the foundation of peace. We don't just provide aid; we partner with rural communities to build the tools they need for their own prosperity.
          </motion.h3>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border-2 border-brand-primary/10 dark:border-dark-primary/20 p-1 mb-4 shadow-xl">
              <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop" alt="Director" className="w-full h-full rounded-full object-cover grayscale brightness-90" />
            </div>
            <p className="font-serif font-bold text-xl text-brand-primary dark:text-dark-primary">Dr. Amel Osman</p>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-ink/50 dark:text-dark-ink/50 font-bold mt-1">Executive Director, SRC</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 text-center">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto bg-brand-primary rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden"
         >
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
           <div className="relative z-10">
             <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Invest in Sudan's <span className="italic">Resilience</span>.</h2>
             <p className="text-white/80 mb-10 max-w-lg mx-auto leading-relaxed">
               Your support goes directly to rural projects that promote education, clean water, and community-led peace processes.
             </p>
             <Link to="/donate" className="inline-block bg-white text-brand-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-surface transition-all shadow-lg">
               Donate to SRC
             </Link>
           </div>
         </motion.div>
      </section>
    </main>
  );
};

const NotFound = () => (
  <div className="h-screen flex items-center justify-center bg-brand-bg px-6 text-center">
    <div>
      <h1 className="text-9xl font-serif font-bold text-brand-primary/10">404</h1>
      <p className="text-xl font-serif mb-8 text-brand-ink">The horizon you seek is not here.</p>
      <Link to="/" className="bg-brand-primary text-white px-8 py-4 rounded-full text-sm font-medium">Return Home</Link>
    </div>
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<div className="h-screen flex items-center justify-center bg-brand-bg dark:bg-dark-bg transition-colors">
          <div className="w-12 h-12 border-4 border-brand-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin" />
        </div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
