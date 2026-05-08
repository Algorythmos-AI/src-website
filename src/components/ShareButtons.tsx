import React from 'react';
import { Twitter, Linkedin, Facebook, Link2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url = window.location.href, className = "" }) => {
  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'hover:text-[#1DA1F2]'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:text-[#0077b5]'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:text-[#4267B2]'
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    // Optional: Add a toast notification here
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-[9px] uppercase tracking-[0.2em] font-black text-brand-ink/30 dark:text-dark-ink/30 mr-1">Share</span>
      {shareLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className={`text-brand-ink/40 dark:text-dark-ink/40 transition-colors ${link.color}`}
          title={`Share on ${link.name}`}
        >
          <link.icon size={14} />
        </motion.a>
      ))}
      <motion.button
        onClick={copyToClipboard}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="text-brand-ink/40 dark:text-dark-ink/40 hover:text-brand-primary dark:hover:text-dark-primary transition-colors"
        title="Copy Link"
      >
        <Link2 size={14} />
      </motion.button>
    </div>
  );
};
