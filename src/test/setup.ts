import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom lacks IntersectionObserver, which the `motion` library uses for
// whileInView animations. Provide a no-op stub so components render in tests.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);

// jsdom does not implement matchMedia; ThemeContext and reduced-motion checks use it.
vi.stubGlobal(
  'matchMedia',
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
);
