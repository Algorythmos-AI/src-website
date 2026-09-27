import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, rtlLocales, type Locale } from '@/i18n/routing';
import { inter, playfair, plexArabic, amiri } from '@/app/fonts';
import { ThemeProvider } from '@/context/ThemeContext';
import { ThemeScript } from '@/app/theme-script';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '@/app/globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.src-rural.org';
  return {
    metadataBase: new URL(siteUrl),
    title: t('title'),
    description: t('description'),
    icons: {
      icon: [
        { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icons/favicon-64.png', sizes: '64x64', type: 'image/png' },
      ],
      apple: '/icons/apple-touch-icon.png',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: ['/icons/icon-512.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/icons/icon-512.png'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations('a11y');
  const dir = rtlLocales.includes(locale as Locale) ? 'rtl' : 'ltr';
  const fontVars = `${inter.variable} ${playfair.variable} ${plexArabic.variable} ${amiri.variable}`;

  return (
    <html lang={locale} dir={dir} className={fontVars} suppressHydrationWarning>
      <body>
        <ThemeScript />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:start-3 focus:z-[100] focus:rounded-md focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-white"
            >
              {t('skipToContent')}
            </a>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
