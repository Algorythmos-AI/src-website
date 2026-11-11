/**
 * Public video links (YouTube / Vimeo) for the Media page. Only these two
 * hosts are accepted, and only a strictly-validated video ID is carried into
 * the embed URL, so an editor can't inject an arbitrary iframe source.
 *
 * Evidence videos never go through here — they use the separate /v/ links.
 */

export type VideoEmbed = { provider: 'youtube' | 'vimeo'; id: string; embedUrl: string };

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const VIMEO_ID = /^\d{6,12}$/;

function youtubeId(url: URL): string | null {
  const host = url.hostname.replace(/^www\.|^m\./, '');
  let id: string | null = null;
  if (host === 'youtu.be') {
    id = url.pathname.split('/')[1] ?? null;
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (url.pathname === '/watch') id = url.searchParams.get('v');
    else {
      const [, kind, value] = url.pathname.split('/');
      if (kind === 'embed' || kind === 'shorts' || kind === 'live') id = value ?? null;
    }
  }
  return id && YOUTUBE_ID.test(id) ? id : null;
}

function vimeoId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, '');
  const parts = url.pathname.split('/').filter(Boolean);
  let id: string | undefined;
  if (host === 'vimeo.com') id = parts[0];
  else if (host === 'player.vimeo.com' && parts[0] === 'video') id = parts[1];
  return id && VIMEO_ID.test(id) ? id : null;
}

/** Parse a YouTube/Vimeo page or embed URL into a privacy-friendly embed, or null. */
export function toVideoEmbed(raw: string | null | undefined): VideoEmbed | null {
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  if (url.protocol !== 'https:') return null;

  const yt = youtubeId(url);
  if (yt) {
    return {
      provider: 'youtube',
      id: yt,
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt}`,
    };
  }
  const vm = vimeoId(url);
  if (vm) {
    return { provider: 'vimeo', id: vm, embedUrl: `https://player.vimeo.com/video/${vm}?dnt=1` };
  }
  return null;
}
