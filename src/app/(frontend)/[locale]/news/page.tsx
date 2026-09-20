import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { getCategories, getPosts } from '@/lib/queries';
import { mediaUrl } from '@/lib/media';
import { formatDate } from '@/lib/format';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sections' });
  return { title: t('newsTitle'), description: t('newsSubtitle') };
}

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { locale } = await params;
  const { page: pageParam, category } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('sections');
  const loc = locale as Locale;

  const page = Number(pageParam) || 1;
  const [list, categories] = await Promise.all([
    getPosts(loc, { page, categorySlug: category }),
    getCategories(loc),
  ]);

  const chip = (active: boolean) =>
    `px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
      active
        ? 'bg-brand-primary dark:bg-dark-primary text-white'
        : 'bg-brand-surface dark:bg-dark-surface text-brand-ink/60 dark:text-dark-ink/70 hover:text-brand-primary dark:hover:text-dark-primary'
    }`;

  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      <section className="py-16 md:py-24 px-6 bg-brand-surface dark:bg-dark-surface/40 border-b border-brand-primary/5 dark:border-white/5">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
            {t('newsTitle')}
          </h1>
          <p className="mt-4 text-lg text-brand-ink/70 dark:text-dark-ink/70">
            {t('newsSubtitle')}
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mb-10">
              <Link href="/news" className={chip(!category)}>
                {t('all')}
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={{ pathname: '/news', query: { category: c.slug ?? '' } }}
                  className={chip(category === c.slug)}
                >
                  {c.title}
                </Link>
              ))}
            </div>
          )}

          {list.docs.length === 0 ? (
            <p className="text-brand-ink/60 dark:text-dark-ink/70">{t('newsEmpty')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {list.docs.map((post) => {
                const img = mediaUrl(post.heroImage, 'card');
                return (
                  <Link key={post.slug} href={`/news/${post.slug}`} className="group flex flex-col">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-brand-surface dark:bg-dark-surface shadow-sm group-hover:shadow-md transition-shadow">
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="w-full h-full bg-gradient-to-br from-brand-primary/15 to-brand-secondary/15 dark:from-dark-primary/25 dark:to-dark-secondary/25"
                        />
                      )}
                    </div>
                    {post.publishedAt && (
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-secondary dark:text-dark-secondary mb-2">
                        {formatDate(post.publishedAt, loc)}
                      </p>
                    )}
                    <h2 className="text-xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          {list.totalPages > 1 && (
            <div className="flex justify-between items-center mt-14">
              {page > 1 ? (
                <Link
                  href={{
                    pathname: '/news',
                    query: { ...(category ? { category } : {}), page: String(page - 1) },
                  }}
                  className="text-sm font-bold uppercase tracking-widest text-brand-primary dark:text-dark-primary hover:underline"
                >
                  ← {t('previous')}
                </Link>
              ) : (
                <span />
              )}
              <span className="text-xs text-brand-ink/70 dark:text-dark-ink/70">
                {page} / {list.totalPages}
              </span>
              {page < list.totalPages ? (
                <Link
                  href={{
                    pathname: '/news',
                    query: { ...(category ? { category } : {}), page: String(page + 1) },
                  }}
                  className="text-sm font-bold uppercase tracking-widest text-brand-primary dark:text-dark-primary hover:underline"
                >
                  {t('next')} →
                </Link>
              ) : (
                <span />
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
