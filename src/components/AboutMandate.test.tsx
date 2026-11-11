import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AboutMandate, hasRichText } from './AboutMandate';

const labels = {
  eyebrow: 'Who we are',
  mission: 'Mission',
  mandate: 'Mandate',
  whatWeDo: 'What we do',
};

const emptyEditor = { root: { children: [{ type: 'paragraph', children: [] }] } };

describe('hasRichText', () => {
  it('treats missing and blank editors as empty', () => {
    expect(hasRichText(undefined)).toBe(false);
    expect(hasRichText(null)).toBe(false);
    expect(hasRichText(emptyEditor)).toBe(false);
  });

  it('detects real content', () => {
    expect(
      hasRichText({
        root: { children: [{ type: 'paragraph', children: [{ type: 'text', text: 'x' }] }] },
      })
    ).toBe(true);
  });
});

describe('AboutMandate', () => {
  it('renders nothing when the CMS fields are empty', () => {
    const { container } = render(
      <AboutMandate mission={emptyEditor} mandate={null} whatWeDo={[]} labels={labels} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders work areas and skips blank titles', () => {
    render(
      <AboutMandate
        whatWeDo={[
          { title: 'Education', text: 'Schools in rural villages' },
          { title: '   ', text: 'ignored' },
        ]}
        labels={labels}
      />
    );
    expect(screen.getByRole('heading', { name: 'What we do' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument();
    expect(screen.queryByText('ignored')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Mission' })).not.toBeInTheDocument();
  });
});
