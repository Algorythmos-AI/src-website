import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VideoModal } from './VideoModal';

const HERO_IMAGE =
  'https://plus.unsplash.com/premium_photo-1699535657712-02fe404e916f?q=80&w=2070&auto=format&fit=crop';

// Placeholder mission video — swap with the real SRC mission video URL when available.
const MISSION_VIDEO_SRC =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

export const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="relative bg-brand-bg dark:bg-dark-bg pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <p className="text-brand-secondary dark:text-dark-secondary text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6">
              Sudanese Rural Community · Est. 2015
            </p>
            <h1 className="font-serif font-bold text-brand-primary dark:text-dark-primary leading-[1.05] text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8">
              Building peace and resilience across rural Sudan.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-brand-ink/70 dark:text-dark-ink/70 max-w-2xl leading-relaxed mb-10">
              We partner with local leaders to advance education, water access, and community-led
              peacebuilding — from Darfur and Kordofan to the Blue Nile.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/donate"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-brand-primary dark:bg-dark-primary text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-md"
              >
                Support our work
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/work"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-3 border border-brand-primary/20 dark:border-dark-primary/30 text-brand-primary dark:text-dark-primary px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-brand-primary/5 dark:hover:bg-dark-primary/10 transition-all"
              >
                See our programs
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-brand-surface dark:bg-dark-surface group">
              <img
                src={HERO_IMAGE}
                alt="A rural village in North Sudan"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Play mission button */}
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                aria-label="Play our mission video"
                className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 focus-visible:bg-black/30 transition-colors focus:outline-none"
              >
                <span className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full pl-4 pr-5 py-2.5 shadow-lg group-hover:scale-105 transition-transform">
                  <span className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center">
                    <Play size={14} className="ml-0.5 fill-current" />
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-primary">
                    Play mission
                  </span>
                </span>
              </button>

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-footer/90 to-transparent p-6 text-white pointer-events-none">
                <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-accent mb-1">
                  In the field
                </p>
                <p className="text-sm font-medium leading-snug">North Sudan · 2025</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <VideoModal
        open={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        src={MISSION_VIDEO_SRC}
        poster={HERO_IMAGE}
        title="SRC mission video"
      />
    </>
  );
};
