import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ShareButtons } from './ShareButtons';

interface CauseCardProps {
  title: string;
  description: string;
  image: string;
  tag: string;
  index: number;
}

export const CauseCard: React.FC<CauseCardProps> = ({ title, description, image, tag, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 bg-brand-surface dark:bg-dark-surface shadow-xl group-hover:shadow-2xl transition-all duration-500">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-primary/20 dark:bg-dark-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 bg-brand-accent text-brand-footer rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
            {tag}
          </span>
        </div>
        
        {/* Share Buttons Overlay */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
          <div className="bg-white/90 dark:bg-dark-surface/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl">
             <ShareButtons title={title} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start gap-4 px-2">
        <div>
          <h3 className="text-2xl font-serif font-bold mb-3 text-brand-primary dark:text-dark-primary group-hover:text-brand-secondary dark:group-hover:text-dark-secondary transition-colors leading-tight italic">
            {title}
          </h3>
          <p className="text-brand-ink/70 dark:text-dark-ink/70 text-sm leading-relaxed max-w-xs font-medium">
            {description}
          </p>
        </div>
        <button className="p-4 bg-brand-surface dark:bg-dark-surface text-brand-primary dark:text-dark-primary rounded-2xl group-hover:bg-brand-secondary dark:group-hover:bg-dark-secondary group-hover:text-white dark:group-hover:text-white transition-all transform shadow-md hover:shadow-lg">
          <ArrowUpRight size={22} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </motion.div>
  );
};
