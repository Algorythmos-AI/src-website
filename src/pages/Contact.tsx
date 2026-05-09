import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="bg-brand-bg pt-24 leading-normal font-sans">
      <section className="py-24 px-6 md:py-32">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2">
            <motion.span 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-brand-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
            >
              Get in Touch
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif font-bold mb-8 text-brand-primary leading-tight"
            >
              Let’s <span className="italic text-brand-secondary">connect</span> the dots.
            </motion.h1>
            <p className="text-xl text-brand-ink/50 font-light leading-relaxed mb-12">
              Whether you are looking to partner, volunteer, or simply have a question about our rural focal points, our team is ready to hear from you.
            </p>

            <div className="space-y-10">
              <div className="flex gap-6 items-start group">
                 <div className="p-4 bg-brand-surface rounded-2xl text-brand-primary shadow-sm group-hover:shadow-md transition-shadow">
                   <Mail size={24} />
                 </div>
                 <div>
                   <h4 className="font-serif font-bold text-lg mb-1 text-brand-primary">Email us</h4>
                   <p className="text-brand-ink/60 italic font-medium">hello@src-sudan.org</p>
                 </div>
              </div>
              <div className="flex gap-6 items-start group">
                 <div className="p-4 bg-brand-surface rounded-2xl text-brand-primary shadow-sm group-hover:shadow-md transition-shadow">
                   <Phone size={24} />
                 </div>
                 <div>
                   <h4 className="font-serif font-bold text-lg mb-1 text-brand-primary">Call our HQ</h4>
                   <p className="text-brand-ink/60 italic font-medium">+249 112 345 678</p>
                 </div>
              </div>
              <div className="flex gap-6 items-start group">
                 <div className="p-4 bg-brand-surface rounded-2xl text-brand-primary shadow-sm group-hover:shadow-md transition-shadow">
                   <MapPin size={24} />
                 </div>
                 <div>
                   <h4 className="font-serif font-bold text-lg mb-1 text-brand-primary">Visit Khartoum Office</h4>
                   <p className="text-brand-ink/60 italic font-medium">SRC Tower, North Kordofan District, Sudan</p>
                 </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:w-1/2 bg-brand-surface border border-brand-primary/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            
            <form
              className="space-y-6 relative z-10"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-[10px] uppercase tracking-widest font-bold text-brand-primary/40">Full Name</label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="John Doe" className="w-full bg-white/50 border border-brand-primary/10 px-6 py-4 rounded-xl text-sm focus:ring-1 focus:ring-brand-accent outline-none font-medium" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-[10px] uppercase tracking-widest font-bold text-brand-primary/40">Email Address</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="john@example.com" className="w-full bg-white/50 border border-brand-primary/10 px-6 py-4 rounded-xl text-sm focus:ring-1 focus:ring-brand-accent outline-none font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-[10px] uppercase tracking-widest font-bold text-brand-primary/40">Subject</label>
                <select id="contact-subject" name="subject" className="w-full bg-white/50 border border-brand-primary/10 px-6 py-4 rounded-xl text-sm focus:ring-1 focus:ring-brand-accent outline-none appearance-none font-medium">
                  <option>Partnership Inquiry</option>
                  <option>Volunteer Application</option>
                  <option>Media & Press</option>
                  <option>General Question</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-[10px] uppercase tracking-widest font-bold text-brand-primary/40">Your Message</label>
                <textarea id="contact-message" name="message" rows={5} required placeholder="How can we help you?" className="w-full bg-white/50 border border-brand-primary/10 px-6 py-4 rounded-xl text-sm focus:ring-1 focus:ring-brand-accent outline-none resize-none font-medium"></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all shadow-xl shadow-brand-primary/20">
                Send Message
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
