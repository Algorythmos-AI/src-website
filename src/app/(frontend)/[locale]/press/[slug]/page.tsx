import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { getPressBySlug, getPressSlugs } from '@/lib/queries';
import { fileUrl } from '@/lib/media';
import { formatDate } from '@/lib/format';
import { RichTextBlock } from '@/components/RichTextBlock';

export async function generateStaticParams() {
  const slugs = await getPressSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const release = await getPressBySlug(slug, locale as Locale);
  if (!release) return {};
  return { title: release.title };
}

export default async function PressReleasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('sections');
  const loc = locale as Locale;

  const release = await getPressBySlug(slug, loc);
  if (!release) notFound();

  const attachmentUrl = fileUrl(release.attachment);

  return (
    <article className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link
          href="/press"
          className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] hover:underline"
        >
          ← {t('pressTitle')}
        </Link>
        <p className="mt-8 text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em]">
          {formatDate(release.date, loc)}
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
          {release.title}
        </h1>
        <RichTextBlock
          data={release.body}
          className="mt-10 text-brand-ink/80 dark:text-dark-ink/80"
        />
        {attachmentUrl && (
          <a
            href={attachmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 bg-brand-primary dark:bg-dark-primary text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-colors"
          >
            {t('download')}
          </a>
        )}
        {release.contact && (
          <p className="mt-8 text-sm text-brand-ink/60 dark:text-dark-ink/70">{release.contact}</p>
        )}
      </div>
    </article>
  );
}
