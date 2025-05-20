
import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers as any);

// Add the necessary type definitions for jest-dom
declare global {
  namespace Vi {
    interface AsExpected {
      // Extending with jest-dom matchers
      toBeInTheDocument(): void;
      toHaveClass(...classNames: string[]): void;
      toBeDisabled(): void;
      toBeEmptyDOMElement(): void;
      toBeVisible(): void;
      toContainElement(element: HTMLElement | null): void;
      toContainHTML(html: string): void;
      toHaveFocus(): void;
      toHaveAttribute(attr: string, value?: string): void;
      toHaveStyle(css: Record<string, any>): void;
      toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): void;
      toHaveValue(value?: string | string[] | number): void;
      toBeChecked(): void;
      toBePartiallyChecked(): void;
      toHaveDisplayValue(value: string | RegExp | Array<string | RegExp>): void;
      toBeRequired(): void;
      toBeValid(): void;
      toBeInvalid(): void;
      toHaveDescription(text?: string | RegExp): void;
    }
  }
}

// Setup global test environment
beforeAll(() => {
  // Mock window.matchMedia which is used by some components
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});
