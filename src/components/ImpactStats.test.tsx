import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ImpactStats } from './ImpactStats';

const stats = [
  { value: '125,000+', label: 'People reached' },
  { value: '45', label: 'Active programs' },
  { value: '18', label: 'Field sites' },
  { value: '800+', label: 'Volunteers' },
];

describe('ImpactStats', () => {
  it('renders the provided stats with labels and values', () => {
    render(<ImpactStats stats={stats} />);
    expect(screen.getByText('People reached')).toBeInTheDocument();
    expect(screen.getByText('125,000+')).toBeInTheDocument();
    expect(screen.getByText('Active programs')).toBeInTheDocument();
    expect(screen.getByText('Volunteers')).toBeInTheDocument();
  });

  it('renders nothing when there are no stats', () => {
    const { container } = render(<ImpactStats stats={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
