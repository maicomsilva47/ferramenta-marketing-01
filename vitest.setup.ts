
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import { matchers } from '@testing-library/jest-dom/matchers';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
declare global {
  namespace Vi {
    interface Assertion<T = any> extends TestingLibraryMatchers<typeof T, void> {}
    interface AsymmetricMatchersContaining extends TestingLibraryMatchers<any, void> {}
  }
}

expect.extend(matchers);

// Setup global test environment
beforeAll(() => {
  // Mock window.matchMedia which is used by some components
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});
