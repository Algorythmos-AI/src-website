import React from 'react';
import { Mail, Github, Instagram, Twitter, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-brand-footer pt-20 pb-10 border-t border-white/5 text-brand-surface/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-footer font-bold text-lg">S</div>
              <span className="font-semibold tracking-wide text-lg text-white">SRC</span>
            </Link>
            <p className="text-xs leading-relaxed mb-8 uppercase tracking-wider">
              A commitment to the resilience and prosperity of rural Sudanese communities. Together, we rebuild with dignity.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full text-white hover:text-brand-accent transition-colors"><Instagram size={16} /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full text-white hover:text-brand-accent transition-colors"><Twitter size={16} /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full text-white hover:text-brand-accent transition-colors"><Github size={16} /></a>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-white text-xs uppercase tracking-[0.2em]">Navigation</h5>
            <ul className="space-y-4 text-[11px] uppercase tracking-widest font-medium">
              <li><Link to="/about" className="hover:text-brand-accent transition-colors">Who We Are</Link></li>
              <li><Link to="/work" className="hover:text-brand-accent transition-colors">Our Work</Link></li>
              <li><Link to="/impact" className="hover:text-brand-accent transition-colors">Our Impact</Link></li>
              <li><Link to="/careers" className="hover:text-brand-accent transition-colors">Join the Team</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-white text-xs uppercase tracking-[0.2em]">Connect</h5>
            <ul className="space-y-4 text-[11px] uppercase tracking-widest font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-brand-accent" />
                <span>Khartoum North, Sudan</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="flex-shrink-0 text-brand-accent" />
                <span>hello@src-sudan.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-white text-xs uppercase tracking-[0.2em]">Newsletter</h5>
            <p className="text-[11px] mb-4 uppercase tracking-widest leading-relaxed">Subscribe for monthly impact reports.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-sm text-[10px] focus:ring-1 focus:ring-brand-accent outline-none text-white uppercase tracking-widest"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-brand-secondary text-white text-[10px] font-bold px-4 rounded-sm hover:bg-opacity-90 transition-all uppercase tracking-widest">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-medium">
          <p>© 2025 Sudanese Rural Community (SRC). All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
