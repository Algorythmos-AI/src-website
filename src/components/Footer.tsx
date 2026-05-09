import React from 'react';
import { Mail, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-brand-footer text-brand-surface/60 pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img
                src="/icon.png"
                alt=""
                width={36}
                height={36}
                decoding="async"
                loading="lazy"
                className="w-9 h-9 rounded-full bg-white p-0.5"
              />
              <span className="font-serif font-bold tracking-wide text-lg text-white">SRC</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              The Sudanese Rural Community works alongside local leaders to advance education, water access, and community-led peacebuilding across rural Sudan.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="p-2 rounded-md bg-white/5 text-white/70 hover:text-brand-accent hover:bg-white/10 transition-colors"><Instagram size={16} /></a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-md bg-white/5 text-white/70 hover:text-brand-accent hover:bg-white/10 transition-colors"><Twitter size={16} /></a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-md bg-white/5 text-white/70 hover:text-brand-accent hover:bg-white/10 transition-colors"><Linkedin size={16} /></a>
            </div>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-2">
            <h5 className="font-bold mb-5 text-white text-[10px] uppercase tracking-[0.2em]">Organization</h5>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/work" className="hover:text-white transition-colors">Programs</Link></li>
              <li><Link to="/impact" className="hover:text-white transition-colors">Impact</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Reach */}
          <div className="md:col-span-3">
            <h5 className="font-bold mb-5 text-white text-[10px] uppercase tracking-[0.2em]">Reach us</h5>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0 text-brand-accent" />
                <span>Headquarters · Paris, France<br /><span className="text-white/50 text-xs">Field operations · North Sudan</span></span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="shrink-0 text-brand-accent" />
                <a href="mailto:hello@src-sudan.org" className="hover:text-white transition-colors">hello@src-sudan.org</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h5 className="font-bold mb-5 text-white text-[10px] uppercase tracking-[0.2em]">Stay informed</h5>
            <p className="text-sm mb-4 leading-relaxed">Receive our quarterly impact report.</p>
            <form
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 px-3 py-2.5 rounded-md text-xs focus:ring-1 focus:ring-brand-accent outline-none text-white placeholder:text-white/30"
              />
              <button
                type="submit"
                className="mt-3 w-full bg-brand-secondary text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2.5 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-wide text-white/40">
          <p>© 2025 Sudanese Rural Community (SRC). Registered nonprofit · Paris, France.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Annual report</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
