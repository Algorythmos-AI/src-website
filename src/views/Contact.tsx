'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 bg-brand-surface dark:bg-dark-surface/40 border-b border-brand-primary/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Contact us
          </p>
          <h1 className="text-balance text-4xl md:text-6xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight mb-6">
            We'd like to hear from you.
          </h1>
          <p className="text-lg md:text-xl text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed max-w-3xl">
            Whether you're a partner organization, prospective volunteer, journalist, or community
            member, our team responds to every message within two business days.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Contact details */}
          <div className="lg:col-span-5">
            <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Reach us directly
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight mb-10">
              Three ways to start a conversation.
            </h2>

            <ul className="space-y-7">
              <li className="flex gap-5 items-start">
                <span className="shrink-0 w-11 h-11 rounded-lg bg-brand-primary/10 dark:bg-dark-primary/20 text-brand-primary dark:text-dark-primary flex items-center justify-center">
                  <Mail size={18} />
                </span>
                <div>
                  <h3 className="font-bold text-brand-primary dark:text-dark-primary mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@src-sudan.org"
                    className="text-sm text-brand-ink/70 dark:text-dark-ink/70 hover:text-brand-primary dark:hover:text-dark-primary transition-colors"
                  >
                    hello@src-sudan.org
                  </a>
                </div>
              </li>
              <li className="flex gap-5 items-start">
                <span className="shrink-0 w-11 h-11 rounded-lg bg-brand-primary/10 dark:bg-dark-primary/20 text-brand-primary dark:text-dark-primary flex items-center justify-center">
                  <Phone size={18} />
                </span>
                <div>
                  <h3 className="font-bold text-brand-primary dark:text-dark-primary mb-1">
                    Phone
                  </h3>
                  <a
                    href="tel:+249112345678"
                    className="text-sm text-brand-ink/70 dark:text-dark-ink/70 hover:text-brand-primary dark:hover:text-dark-primary transition-colors"
                  >
                    +249 112 345 678
                  </a>
                </div>
              </li>
              <li className="flex gap-5 items-start">
                <span className="shrink-0 w-11 h-11 rounded-lg bg-brand-primary/10 dark:bg-dark-primary/20 text-brand-primary dark:text-dark-primary flex items-center justify-center">
                  <MapPin size={18} />
                </span>
                <div>
                  <h3 className="font-bold text-brand-primary dark:text-dark-primary mb-1">
                    Headquarters
                  </h3>
                  <p className="text-sm text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed">
                    Paris, France
                  </p>
                  <p className="text-xs text-brand-ink/50 dark:text-dark-ink/50 leading-relaxed mt-1">
                    Field operations · North Sudan
                  </p>
                </div>
              </li>
              <li className="flex gap-5 items-start">
                <span className="shrink-0 w-11 h-11 rounded-lg bg-brand-primary/10 dark:bg-dark-primary/20 text-brand-primary dark:text-dark-primary flex items-center justify-center">
                  <Clock size={18} />
                </span>
                <div>
                  <h3 className="font-bold text-brand-primary dark:text-dark-primary mb-1">
                    Office hours
                  </h3>
                  <p className="text-sm text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed">
                    Monday – Friday
                    <br />
                    09:00 – 18:00 (CET, UTC+1)
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 bg-brand-surface dark:bg-dark-surface rounded-2xl border border-brand-primary/10 dark:border-white/10 p-8 md:p-10 shadow-sm"
          >
            <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-primary dark:text-dark-primary mb-8 leading-tight">
              Send us a message
            </h2>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/55 dark:text-dark-ink/60"
                  >
                    Full name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Jane Doe"
                    className="w-full bg-brand-bg dark:bg-dark-bg/60 border border-brand-primary/15 dark:border-white/10 px-4 py-3 rounded-lg text-sm text-brand-ink dark:text-dark-ink focus:ring-2 focus:ring-brand-accent outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/55 dark:text-dark-ink/60"
                  >
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="jane@example.com"
                    className="w-full bg-brand-bg dark:bg-dark-bg/60 border border-brand-primary/15 dark:border-white/10 px-4 py-3 rounded-lg text-sm text-brand-ink dark:text-dark-ink focus:ring-2 focus:ring-brand-accent outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-subject"
                  className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/55 dark:text-dark-ink/60"
                >
                  Subject
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  className="w-full bg-brand-bg dark:bg-dark-bg/60 border border-brand-primary/15 dark:border-white/10 px-4 py-3 rounded-lg text-sm text-brand-ink dark:text-dark-ink focus:ring-2 focus:ring-brand-accent outline-none"
                >
                  <option>Partnership inquiry</option>
                  <option>Volunteer application</option>
                  <option>Media &amp; press</option>
                  <option>Donation question</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink/55 dark:text-dark-ink/60"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us how we can help."
                  className="w-full bg-brand-bg dark:bg-dark-bg/60 border border-brand-primary/15 dark:border-white/10 px-4 py-3 rounded-lg text-sm text-brand-ink dark:text-dark-ink focus:ring-2 focus:ring-brand-accent outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 bg-brand-primary dark:bg-dark-primary text-white px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-[0.2em] hover:bg-opacity-90 transition-colors"
              >
                Send message
                <Send size={14} />
              </button>
              <p className="text-xs text-brand-ink/55 dark:text-dark-ink/55 leading-relaxed pt-2">
                By submitting, you agree to receive a response from our team. We never share your
                contact information with third parties.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
