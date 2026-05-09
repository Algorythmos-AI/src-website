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
import { ThemeProvider } from './context/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ScrollToTop } from './components/ScrollToTop';

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

  const partners = ['UNICEF', 'WFP', 'OCHA', 'OXFAM', 'IRC', 'UNHCR'];

  return (
    <main className="bg-brand-bg dark:bg-dark-bg transition-colors duration-300">
      <Hero />

      <ImpactStats />

      {/* Mission */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">Our mission</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-brand-primary dark:text-dark-primary">
              Locally led. Globally supported.
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg text-brand-ink/75 dark:text-dark-ink/75 leading-relaxed mb-6">
              The Sudanese Rural Community (SRC) works alongside community advisory boards in fifteen states to deliver education, water, health, and peacebuilding programs designed by Sudanese communities themselves.
            </p>
            <p className="text-lg text-brand-ink/75 dark:text-dark-ink/75 leading-relaxed mb-8">
              Our methodology is grounded in three principles: local ownership of every project, transparent reporting to donors and beneficiaries, and durable partnerships with traditional leaders, women's cooperatives, and youth councils.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-brand-primary dark:text-dark-primary font-bold text-sm uppercase tracking-widest border-b border-brand-primary/30 dark:border-dark-primary/40 pb-1 hover:border-brand-primary dark:hover:border-dark-primary transition-colors">
              Read our founding story
            </Link>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 md:py-28 px-6 bg-brand-surface dark:bg-dark-surface/40 border-y border-brand-primary/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
            <div className="max-w-xl">
              <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">Our programs</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-brand-primary dark:text-dark-primary">
                Where your support goes.
              </h2>
            </div>
            <Link to="/work" className="inline-flex items-center gap-2 bg-brand-primary dark:bg-dark-primary text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all">
              View all programs
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {causes.map((cause, i) => (
              <CauseCard key={cause.title} {...cause} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Voice / Testimonial */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-6 text-center">From our leadership</p>
          <blockquote className="text-2xl md:text-3xl font-serif leading-snug text-brand-primary dark:text-dark-primary text-center mb-10">
            “Dignity is the foundation of peace. We don't deliver aid — we partner with rural communities to build the tools they need for their own prosperity.”
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-primary dark:bg-dark-primary text-white flex items-center justify-center font-serif font-bold text-lg" aria-hidden="true">
              AO
            </div>
            <div>
              <p className="font-serif font-bold text-brand-primary dark:text-dark-primary">Dr. Amel Osman</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-ink/50 dark:text-dark-ink/50 font-bold">Executive Director, SRC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 px-6 border-y border-brand-primary/10 dark:border-white/5 bg-brand-surface/60 dark:bg-dark-surface/30">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink/50 dark:text-dark-ink/50 mb-8">In partnership with</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {partners.map(p => (
              <span key={p} className="font-serif font-bold text-xl md:text-2xl text-brand-primary/40 dark:text-dark-primary/50 tracking-wide">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency / Annual Report */}
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-primary dark:bg-dark-primary rounded-2xl p-10 md:p-12 text-white">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent mb-3">Transparency</p>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 leading-tight">Annual Report 2024</h3>
            <p className="text-white/80 leading-relaxed mb-6 text-sm md:text-base">
              A complete breakdown of programs, finances, and impact across all fifteen states where SRC operates.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-brand-primary px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand-surface transition-colors"
            >
              Read the report
            </a>
          </div>
          <div className="bg-brand-surface dark:bg-dark-surface rounded-2xl p-10 md:p-12 border border-brand-primary/10 dark:border-white/5">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-secondary dark:text-dark-secondary mb-3">Get involved</p>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-brand-primary dark:text-dark-primary leading-tight">
              Stand with rural Sudan.
            </h3>
            <p className="text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed mb-6 text-sm md:text-base">
              Your support funds clean water, classrooms, and community-led peace councils where they're needed most.
            </p>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-brand-primary dark:bg-dark-primary text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-colors"
            >
              Donate to SRC
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

const NotFound = () => (
  <div className="h-screen flex items-center justify-center bg-brand-bg dark:bg-dark-bg px-6 text-center transition-colors">
    <div>
      <h1 className="text-9xl font-serif font-bold text-brand-primary/10 dark:text-dark-primary/20">404</h1>
      <p className="text-xl font-serif mb-8 text-brand-ink dark:text-dark-ink">The horizon you seek is not here.</p>
      <Link to="/" className="bg-brand-primary dark:bg-dark-primary text-white px-8 py-4 rounded-full text-sm font-medium">Return Home</Link>
    </div>
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <ErrorBoundary>
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
        </ErrorBoundary>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
