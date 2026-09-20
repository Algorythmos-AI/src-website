import React, { useState } from 'react';
import { Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
}

const fallbackCopy = (text: string): boolean => {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
};

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const resolveUrl = () => url ?? (typeof window !== 'undefined' ? window.location.href : '');

  const shareLinks = (() => {
    const target = resolveUrl();
    return [
      {
        name: 'Twitter',
        icon: Twitter,
        href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(target)}`,
        color: 'hover:text-[#1DA1F2]',
      },
      {
        name: 'LinkedIn',
        icon: Linkedin,
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(target)}`,
        color: 'hover:text-[#0077b5]',
      },
      {
        name: 'Facebook',
        icon: Facebook,
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(target)}`,
        color: 'hover:text-[#4267B2]',
      },
    ];
  })();

  const copyToClipboard = async () => {
    const target = resolveUrl();
    if (!target) return;
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(target);
        ok = true;
      } else {
        ok = fallbackCopy(target);
      }
    } catch {
      ok = fallbackCopy(target);
    }
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-[9px] uppercase tracking-[0.2em] font-black text-brand-ink/30 dark:text-dark-ink/30 mr-1">
        Share
      </span>
      {shareLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className={`text-brand-ink/40 dark:text-dark-ink/40 transition-colors ${link.color}`}
          aria-label={`Share on ${link.name}`}
          title={`Share on ${link.name}`}
        >
          <link.icon size={14} />
        </motion.a>
      ))}
      <motion.button
        type="button"
        onClick={copyToClipboard}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="text-brand-ink/40 dark:text-dark-ink/40 hover:text-brand-primary dark:hover:text-dark-primary transition-colors"
        aria-label={copied ? 'Link copied' : 'Copy link'}
        title={copied ? 'Copied!' : 'Copy Link'}
      >
        {copied ? (
          <Check size={14} className="text-brand-secondary dark:text-dark-secondary" />
        ) : (
          <Link2 size={14} />
        )}
      </motion.button>
    </div>
  );
};
