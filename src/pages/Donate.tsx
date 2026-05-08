import React from 'react';
import { motion } from 'motion/react';
import { Heart, CreditCard, Landmark, ArrowRight, Zap, Globe, Shield } from 'lucide-react';

export const Donate = () => {
  const amounts = ['$25', '$50', '$100', '$250', '$500', 'Custom'];
  
  return (
    <div className="bg-brand-bg pt-24 min-h-screen leading-normal font-sans">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-brand-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
          >
            Direct Support
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-8 text-brand-primary leading-tight"
          >
            Be the <span className="italic text-brand-secondary">spark</span> for someone's future.
          </motion.h1>
          <p className="text-xl text-brand-ink/70 font-light leading-relaxed mb-12">
            Your generous contribution empowers rural Sudanese communities with clean water, quality education, and resilient peace. Every dollar is a seed for prosperity.
          </p>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
               <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
                 <Zap size={24} />
               </div>
               <div>
                 <h4 className="font-serif font-bold text-lg mb-1 text-brand-primary uppercase tracking-wide">Immediate Impact</h4>
                 <p className="text-sm text-brand-ink/50 font-medium">92% of every dollar goes directly to rural field programs and local project teams.</p>
               </div>
            </div>
            <div className="flex gap-6 items-start">
               <div className="p-3 bg-brand-accent/20 rounded-2xl text-brand-primary">
                 <Globe size={24} />
               </div>
               <div>
                 <h4 className="font-serif font-bold text-lg mb-1 text-brand-primary uppercase tracking-wide">Global Transparency</h4>
                 <p className="text-sm text-brand-ink/50 font-medium">Monthly reports and project updates sent directly to your inbox so you can see the change.</p>
               </div>
            </div>
            <div className="flex gap-6 items-start">
               <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
                 <Shield size={24} />
               </div>
               <div>
                 <h4 className="font-serif font-bold text-lg mb-1 text-brand-primary uppercase tracking-wide">Secure Giving</h4>
                 <p className="text-sm text-brand-ink/50 font-medium">Industry-standard encryption and secure payment processing for your peace of mind.</p>
               </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-brand-footer p-10 md:p-16 rounded-[3rem] text-white shadow-2xl relative"
        >
          <div className="absolute -top-10 -left-10 bg-brand-secondary w-20 h-20 rounded-full flex items-center justify-center animate-bounce shadow-xl">
            <Heart size={32} className="fill-white" />
          </div>

          <h3 className="text-3xl font-serif font-bold mb-8 italic">Choose your impact</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
            {amounts.map(amt => (
              <button 
                key={amt} 
                className="py-4 border border-white/20 rounded-2xl hover:bg-brand-secondary hover:border-brand-secondary transition-all text-lg font-bold uppercase tracking-widest text-xs"
              >
                {amt}
              </button>
            ))}
          </div>

          <div className="space-y-6 mb-10">
            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest font-bold text-brand-surface/40 mb-2 block">Card Information</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-surface/30" size={18} />
                <input 
                  type="text" 
                  placeholder="Card Number" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest focus:ring-1 focus:ring-brand-accent outline-none uppercase"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-xs font-bold tracking-widest focus:ring-1 focus:ring-brand-accent outline-none uppercase"
                />
                <input 
                  type="text" 
                  placeholder="CVC" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-xs font-bold tracking-widest focus:ring-1 focus:ring-brand-accent outline-none uppercase"
                />
            </div>
          </div>

          <button className="w-full bg-brand-secondary py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all shadow-xl shadow-black/20">
            Complete Donation
            <ArrowRight size={18} />
          </button>

          <div className="mt-12 flex justify-center items-center gap-6 opacity-20">
            <Landmark size={24} />
            <div className="h-4 w-px bg-white"></div>
            <span className="font-black text-[10px] tracking-widest uppercase">Secure SSL</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
