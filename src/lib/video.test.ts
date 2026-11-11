import { describe, expect, it } from 'vitest';
import { toVideoEmbed } from './video';

describe('toVideoEmbed', () => {
  it.each([
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtube.com/watch?v=dQw4w9WgXcQ&t=10s',
    'https://m.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://www.youtube.com/shorts/dQw4w9WgXcQ',
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
  ])('accepts YouTube link %s', (url) => {
    expect(toVideoEmbed(url)).toEqual({
      provider: 'youtube',
      id: 'dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    });
  });

  it.each(['https://vimeo.com/76979871', 'https://player.vimeo.com/video/76979871'])(
    'accepts Vimeo link %s',
    (url) => {
      expect(toVideoEmbed(url)).toEqual({
        provider: 'vimeo',
        id: '76979871',
        embedUrl: 'https://player.vimeo.com/video/76979871?dnt=1',
      });
    }
  );

  it.each([
    '',
    null,
    undefined,
    'not a url',
    'http://www.youtube.com/watch?v=dQw4w9WgXcQ', // not https
    'https://www.youtube.com/watch?v=short', // bad id
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ"><script>', // injection attempt
    'https://evil.example/embed/dQw4w9WgXcQ',
    'https://youtube.com.evil.example/watch?v=dQw4w9WgXcQ',
    'https://vimeo.com/channels/staffpicks',
    'javascript:alert(1)',
  ])('rejects %s', (url) => {
    expect(toVideoEmbed(url)).toBeNull();
  });
});
