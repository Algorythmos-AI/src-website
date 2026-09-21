import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { routing, type Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { getProgramBySlug, getProgramSlugs } from '@/lib/queries';
import { mediaUrl } from '@/lib/media';

export async function generateStaticParams() {
  const slugs = await getProgramSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const program = await getProgramBySlug(slug, locale as Locale);
  if (!program) return {};
  return { title: program.title, description: program.summary ?? undefined };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const program = await getProgramBySlug(slug, locale as Locale);
  if (!program) notFound();

  const t = await getTranslations('sections');
  const hero = mediaUrl(program.image, 'hero');

  return (
    <article className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] hover:underline"
        >
          <ArrowLeft size={14} className="rtl:-scale-x-100" />
          {t('allPrograms')}
        </Link>
        {program.tag && (
          <p className="mt-8 text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em]">
            {program.tag}
          </p>
        )}
        <h1 className="mt-3 text-4xl md:text-5xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
          {program.title}
        </h1>
        {program.summary && (
          <p className="mt-6 text-lg text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed">
            {program.summary}
          </p>
        )}
        {hero && (
          <img
            src={hero}
            alt={program.title}
            className="mt-10 w-full rounded-2xl aspect-[16/9] object-cover"
            decoding="async"
          />
        )}
        {program.body && (
          <div className="markdown-body mt-10 text-brand-ink/80 dark:text-dark-ink/80">
            <RichText data={program.body as SerializedEditorState} />
          </div>
        )}
      </div>
    </article>
  );
}
