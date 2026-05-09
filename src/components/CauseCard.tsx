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
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-brand-surface dark:bg-dark-surface shadow-sm group-hover:shadow-md transition-shadow">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/95 dark:bg-dark-surface/95 text-brand-primary dark:text-dark-primary rounded-full text-[10px] font-bold uppercase tracking-widest">
            {tag}
          </span>
        </div>
        <div className="absolute top-4 right-4 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100 transition-opacity">
          <div className="bg-white/95 dark:bg-dark-surface/95 px-3 py-2 rounded-full shadow-sm">
            <ShareButtons title={title} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-serif font-bold mb-3 text-brand-primary dark:text-dark-primary leading-tight">
            {title}
          </h3>
          <p className="text-brand-ink/70 dark:text-dark-ink/70 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        <button
          type="button"
          aria-label={`Read more about ${title}`}
          className="shrink-0 p-3 rounded-full border border-brand-primary/15 dark:border-dark-primary/25 text-brand-primary dark:text-dark-primary group-hover:bg-brand-primary group-hover:text-white dark:group-hover:bg-dark-primary transition-colors"
        >
          <ArrowUpRight size={18} />
        </button>
      </div>
    </motion.article>
  );
};
