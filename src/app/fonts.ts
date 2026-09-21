import { Inter, Playfair_Display, IBM_Plex_Sans_Arabic, Amiri } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

// Body face for Arabic locale (--font-arabic under [dir=rtl]).
// Playfair has no Arabic glyphs, so we swap the whole serif/sans stack.
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

// Display serif for Arabic headings — Amiri is a classical Naskh face that
// carries the same editorial weight as Playfair Display does for Latin.
export const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-arabic-serif',
  display: 'swap',
});
