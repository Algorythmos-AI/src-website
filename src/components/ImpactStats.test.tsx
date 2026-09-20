import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ImpactStats } from './ImpactStats';

describe('ImpactStats', () => {
  it('renders all four headline stats with labels and values', () => {
    render(<ImpactStats />);
    expect(screen.getByText('People reached')).toBeInTheDocument();
    expect(screen.getByText('125k+')).toBeInTheDocument();
    expect(screen.getByText('Active programs')).toBeInTheDocument();
    expect(screen.getByText('Volunteers')).toBeInTheDocument();
  });
});
