import type { Gallery } from '@/payload-types';
import { mediaAlt, mediaUrl } from '@/lib/media';
import { toVideoEmbed } from '@/lib/video';

type Props = {
  gallery: Pick<Gallery, 'id' | 'title' | 'description' | 'images' | 'videos'>;
  dateLabel?: string;
};

/**
 * One gallery on the Media page: photo grid plus public YouTube/Vimeo embeds.
 * Videos whose link no longer parses are skipped (never embedded raw), and a
 * gallery with nothing to show renders nothing.
 */
export function MediaGallery({ gallery, dateLabel }: Props) {
  const photos = (gallery.images ?? [])
    .map((row) => ({
      id: row.id ?? undefined,
      src: mediaUrl(row.image, 'card'),
      full: mediaUrl(row.image, 'hero'),
      alt: mediaAlt(row.image),
      caption:
        row.image && typeof row.image !== 'number' ? (row.image.caption ?? undefined) : undefined,
    }))
    .filter((p): p is typeof p & { src: string } => Boolean(p.src));

  const videos = (gallery.videos ?? [])
    .map((v) => ({ id: v.id ?? undefined, title: v.title, embed: toVideoEmbed(v.url) }))
    .filter((v): v is typeof v & { embed: NonNullable<typeof v.embed> } => Boolean(v.embed));

  if (photos.length === 0 && videos.length === 0) return null;

  const headingId = `gallery-${gallery.id}`;

  return (
    <section
      aria-labelledby={headingId}
      className="py-12 border-b border-brand-primary/10 dark:border-white/10 last:border-0"
    >
      {dateLabel && (
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-secondary dark:text-dark-secondary mb-2">
          {dateLabel}
        </p>
      )}
      <h2
        id={headingId}
        className="text-2xl md:text-3xl font-serif font-bold text-brand-primary dark:text-dark-primary leading-tight"
      >
        {gallery.title}
      </h2>
      {gallery.description && (
        <p className="mt-3 max-w-3xl text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed whitespace-pre-line">
          {gallery.description}
        </p>
      )}

      {videos.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((v, i) => (
            <figure key={v.id ?? i}>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-sm">
                <iframe
                  src={v.embed.embedUrl}
                  title={v.title}
                  loading="lazy"
                  allow="fullscreen; picture-in-picture; encrypted-media"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
              <figcaption className="mt-2 text-sm font-medium text-brand-ink/80 dark:text-dark-ink/80">
                {v.title}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {photos.length > 0 && (
        <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((p, i) => (
            <li key={p.id ?? i}>
              <figure>
                <a
                  href={p.full ?? p.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-[4/3] rounded-lg overflow-hidden bg-brand-surface dark:bg-dark-surface"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform"
                  />
                </a>
                {p.caption && (
                  <figcaption className="mt-1.5 text-xs text-brand-ink/60 dark:text-dark-ink/70">
                    {p.caption}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
