
import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DiagnosticProvider, useDiagnostic, DiagnosticState } from './DiagnosticContext';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    store
  };
})();

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn()
  }
}));

// Mock the hooks used by DiagnosticContext
vi.mock('@/utils/idGenerator', () => ({
  generateUniqueId: vi.fn(() => 'test-id-123')
}));

// Simple test component that uses the diagnostic context
const TestComponent = ({ onContextReady }: { onContextReady: (context: any) => void }) => {
  const context = useDiagnostic();
  onContextReady(context);
  return <div>Test Component</div>;
};

describe('DiagnosticContext', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('creates a new session if none exists', () => {
    const contextCallback = vi.fn();
    
    render(
      <DiagnosticProvider shareId={null}>
        <TestComponent onContextReady={contextCallback} />
      </DiagnosticProvider>
    );
    
    // Wait for any async operations to complete
    act(() => {});
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'diagnostic_session',
      'test-id-123'
    );
    
    const context = contextCallback.mock.calls[1][0]; // The second call contains the initialized context
    expect(context.diagnosticState).toBe(DiagnosticState.LANDING);
    expect(context.hasExistingSession).toBe(false);
  });
  
  it('continues an existing session', () => {
    // Set up localStorage with existing session data
    localStorageMock.getItem.mockImplementationOnce(() => 'existing-session-id');
    localStorageMock.getItem.mockImplementationOnce(() => JSON.stringify([{ questionId: 'q1', selectedOption: 1 }]));
    localStorageMock.getItem.mockImplementationOnce(() => '2'); // Current question index
    
    const contextCallback = vi.fn();
    
    render(
      <DiagnosticProvider shareId={null}>
        <TestComponent onContextReady={contextCallback} />
      </DiagnosticProvider>
    );
    
    // Wait for any async operations to complete
    act(() => {});
    
    // The final context should include the continued session data
    const finalContext = contextCallback.mock.calls[1][0];
    expect(finalContext.hasExistingSession).toBe(true);
    expect(finalContext.currentQuestionIndex).toBe(2);
    expect(finalContext.answers.length).toBe(1);
  });
  
  it('loads shared results when shareId is provided', () => {
    const contextCallback = vi.fn();
    
    render(
      <DiagnosticProvider shareId="shared-result-id-123">
        <TestComponent onContextReady={contextCallback} />
      </DiagnosticProvider>
    );
    
    // Wait for any async operations to complete
    act(() => {});
    
    // The context should be in RESULTS state with the shared ID
    const finalContext = contextCallback.mock.calls[0][0]; // Initial call has the setup values due to mocking
    expect(finalContext.diagnosticState).toBe(DiagnosticState.RESULTS);
    expect(finalContext.resultsId).toBe("shared-result-id-123");
  });
  
  it('provides methods to interact with the diagnostic', () => {
    const contextCallback = vi.fn();
    
    render(
      <DiagnosticProvider shareId={null}>
        <TestComponent onContextReady={contextCallback} />
      </DiagnosticProvider>
    );
    
    // Wait for any async operations to complete
    act(() => {});
    
    const context = contextCallback.mock.calls[1][0];
    
    // Verify that all expected methods are provided
    expect(typeof context.startNewSession).toBe('function');
    expect(typeof context.continueSavedSession).toBe('function');
    expect(typeof context.handleSelectAnswer).toBe('function');
    expect(typeof context.handleUserInfoSubmit).toBe('function');
    expect(typeof context.handleResetDiagnostic).toBe('function');
    expect(typeof context.handleGoBack).toBe('function');
    expect(typeof context.handleGoForward).toBe('function');
  });
  
  // You would typically have many more tests covering the various methods and behaviors
  // of DiagnosticContext, but these examples cover the core functionality
});
