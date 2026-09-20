import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { getPostBySlug, getPostSlugs } from '@/lib/queries';
import { mediaUrl } from '@/lib/media';
import { formatDate } from '@/lib/format';
import { RichTextBlock } from '@/components/RichTextBlock';

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale as Locale);
  if (!post) return {};
  const img = mediaUrl(post.heroImage, 'hero');
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: img ? { images: [img] } : undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('sections');
  const loc = locale as Locale;

  const post = await getPostBySlug(slug, loc);
  if (!post) notFound();

  const hero = mediaUrl(post.heroImage, 'hero');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    datePublished: post.publishedAt ?? undefined,
    description: post.excerpt ?? undefined,
    image: hero ? [hero] : undefined,
    publisher: { '@type': 'NGO', name: 'Sudanese Rural Community (SRC)' },
  };

  return (
    <article className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link
          href="/news"
          className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] hover:underline"
        >
          ← {t('newsTitle')}
        </Link>
        {post.publishedAt && (
          <p className="mt-8 text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em]">
            {formatDate(post.publishedAt, loc)}
          </p>
        )}
        <h1 className="mt-3 text-4xl md:text-5xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-6 text-lg text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed">
            {post.excerpt}
          </p>
        )}
        {hero && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero}
            alt={post.title}
            className="mt-10 w-full rounded-2xl aspect-[16/9] object-cover"
            decoding="async"
          />
        )}
        <RichTextBlock data={post.body} className="mt-10 text-brand-ink/80 dark:text-dark-ink/80" />
      </div>
    </article>
  );
}
