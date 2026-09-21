'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
  poster?: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ open, onClose, src, poster, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {
        // Autoplay may be blocked; user can click play manually.
      });
    }

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (video) {
        video.pause();
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-8 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Mission video'}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-3 end-3 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-colors"
        >
          <X size={18} />
        </button>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
