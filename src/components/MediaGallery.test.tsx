import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Media } from '@/payload-types';
import { MediaGallery } from './MediaGallery';

const image = (id: number, alt: string): Media => ({
  id,
  alt,
  caption: `Caption ${id}`,
  url: `/api/media/file/${id}.webp`,
  sizes: { card: { url: `/api/media/file/${id}-card.webp` } },
  updatedAt: '',
  createdAt: '',
});

describe('MediaGallery', () => {
  it('renders nothing when the gallery has no usable photos or videos', () => {
    const { container } = render(
      <MediaGallery
        gallery={{
          id: 1,
          title: 'Empty',
          images: [{ image: 5 }], // unpopulated relation
          videos: [{ title: 'Bad', url: 'https://evil.example/x' }],
        }}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders photos with alt text and captions', () => {
    render(
      <MediaGallery
        gallery={{ id: 2, title: 'Field visit', images: [{ image: image(1, 'Well site') }] }}
        dateLabel="12 March 2026"
      />
    );
    expect(screen.getByRole('heading', { name: 'Field visit' })).toBeInTheDocument();
    const img = screen.getByRole('img', { name: 'Well site' });
    expect(img).toHaveAttribute('src', '/api/media/file/1-card.webp');
    expect(screen.getByText('Caption 1')).toBeInTheDocument();
    expect(screen.getByText('12 March 2026')).toBeInTheDocument();
  });

  it('embeds only valid YouTube/Vimeo links via privacy-friendly players', () => {
    const { container } = render(
      <MediaGallery
        gallery={{
          id: 3,
          title: 'Videos',
          videos: [
            { title: 'Launch', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
            { title: 'Talk', url: 'https://vimeo.com/76979871' },
            { title: 'Injected', url: 'javascript:alert(1)' },
          ],
        }}
      />
    );
    const frames = [...container.querySelectorAll('iframe')];
    expect(frames.map((f) => f.getAttribute('src'))).toEqual([
      'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      'https://player.vimeo.com/video/76979871?dnt=1',
    ]);
    expect(frames[0]).toHaveAttribute('title', 'Launch');
    expect(screen.queryByText('Injected')).not.toBeInTheDocument();
  });
});
