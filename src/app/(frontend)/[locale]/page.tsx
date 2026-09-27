import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: localeAlternates(locale, '') };
}
import type { Locale } from '@/i18n/routing';
import { Hero } from '@/components/Hero';
import { ImpactStats } from '@/components/ImpactStats';
import { CauseCard } from '@/components/CauseCard';
import { getImpact, getPartners, getPrograms } from '@/lib/queries';
import { mediaUrl } from '@/lib/media';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tMeta = await getTranslations('meta');

  const [programs, partnerDocs, impact] = await Promise.all([
    getPrograms(locale as Locale),
    getPartners(locale as Locale),
    getImpact(locale as Locale),
  ]);

  const causes = programs.slice(0, 3);
  const partners = partnerDocs.map((p) => p.name);
  const stats = (impact.stats ?? [])
    .filter((s): s is { value: string; label: string; id?: string | null } => Boolean(s.value))
    .map((s) => ({ value: s.value, label: s.label }));

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Sudanese Rural Community (SRC)',
    alternateName: 'SRC',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.src-rural.org',
    description: tMeta('description'),
    inLanguage: locale,
    areaServed: 'SD',
    location: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
    },
  };

  return (
    <div className="bg-brand-bg dark:bg-dark-bg transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Hero />

      <ImpactStats stats={stats} />

      {/* Mission */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {t('missionEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-brand-primary dark:text-dark-primary">
              {t('missionHeading')}
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg text-brand-ink/75 dark:text-dark-ink/75 leading-relaxed mb-6">
              {t('missionBody1')}
            </p>
            <p className="text-lg text-brand-ink/75 dark:text-dark-ink/75 leading-relaxed mb-8">
              {t('missionBody2')}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-brand-primary dark:text-dark-primary font-bold text-sm uppercase tracking-widest border-b border-brand-primary/30 dark:border-dark-primary/40 pb-1 hover:border-brand-primary dark:hover:border-dark-primary transition-colors"
            >
              {t('storyLink')}
            </Link>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 md:py-28 px-6 bg-brand-surface dark:bg-dark-surface/40 border-y border-brand-primary/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
            <div className="max-w-xl">
              <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
                {t('programsEyebrow')}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-brand-primary dark:text-dark-primary">
                {t('programsHeading')}
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 bg-brand-primary dark:bg-dark-primary text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
            >
              {t('viewAll')}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {causes.map((cause, i) => (
              <CauseCard
                key={cause.slug}
                title={cause.title}
                tag={cause.tag ?? undefined}
                description={cause.summary ?? ''}
                image={mediaUrl(cause.image, 'card')}
                href={`/work/${cause.slug}`}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Voice / Testimonial */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-6 text-center">
            {t('quoteEyebrow')}
          </p>
          <blockquote className="text-2xl md:text-3xl font-serif leading-snug text-brand-primary dark:text-dark-primary text-center mb-10">
            &ldquo;{t('quote')}&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div
              className="w-12 h-12 rounded-full bg-brand-primary dark:bg-dark-primary text-white flex items-center justify-center font-serif font-bold text-lg"
              aria-hidden="true"
            >
              OH
            </div>
            <div>
              <p className="font-serif font-bold text-brand-primary dark:text-dark-primary">
                Obeid HASSAN
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-ink/70 dark:text-dark-ink/70 font-bold">
                {t('quoteRole')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 px-6 border-y border-brand-primary/10 dark:border-white/5 bg-brand-surface/60 dark:bg-dark-surface/30">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink/70 dark:text-dark-ink/70 mb-8">
            {t('partners')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {partners.map((p) => (
              <span
                key={p}
                className="font-serif font-bold text-xl md:text-2xl text-brand-primary/70 dark:text-dark-primary/70 tracking-wide"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency / Annual Report */}
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-primary dark:bg-dark-primary rounded-2xl p-10 md:p-12 text-white">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent mb-3">
              {t('reportEyebrow')}
            </p>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 leading-tight">
              {t('reportTitle')}
            </h3>
            <p className="text-white/80 leading-relaxed mb-6 text-sm md:text-base">
              {t('reportBody')}
            </p>
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 bg-white text-brand-primary px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand-surface transition-colors"
            >
              {t('reportCta')}
            </Link>
          </div>
          <div className="bg-brand-surface dark:bg-dark-surface rounded-2xl p-10 md:p-12 border border-brand-primary/10 dark:border-white/5">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-secondary dark:text-dark-secondary mb-3">
              {t('ctaEyebrow')}
            </p>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-brand-primary dark:text-dark-primary leading-tight">
              {t('ctaTitle')}
            </h3>
            <p className="text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed mb-6 text-sm md:text-base">
              {t('ctaBody')}
            </p>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-brand-primary dark:bg-dark-primary text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-colors"
            >
              {t('ctaButton')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
