
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DiagnosticApp from './DiagnosticApp';
import { DiagnosticState } from '@/contexts/DiagnosticContext';

// Mock the react-router-dom hooks
vi.mock('react-router-dom', () => ({
  useSearchParams: () => [new URLSearchParams(), vi.fn()]
}));

// Mock the DiagnosticProvider and DiagnosticContext
vi.mock('@/contexts/DiagnosticContext', () => ({
  DiagnosticProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DiagnosticState: {
    LANDING: 'LANDING',
    QUESTIONS: 'QUESTIONS',
    USER_INFO: 'USER_INFO',
    RESULTS: 'RESULTS'
  },
  useDiagnostic: vi.fn()
}));

// Mock the various views
vi.mock('@/components/diagnostic/LoadingView', () => ({
  default: () => <div data-testid="loading-view">Loading...</div>
}));

vi.mock('@/components/diagnostic/ExistingSessionNotice', () => ({
  default: () => <div data-testid="existing-session-notice">Existing Session</div>
}));

vi.mock('@/components/LandingPage', () => ({
  default: () => <div data-testid="landing-page">Landing Page</div>
}));

vi.mock('@/components/diagnostic/UserInfoView', () => ({
  default: () => <div data-testid="user-info-view">User Info</div>
}));

vi.mock('@/components/diagnostic/QuestionView', () => ({
  default: () => <div data-testid="question-view">Questions</div>
}));

vi.mock('@/components/diagnostic/ResultsView', () => ({
  default: () => <div data-testid="results-view">Results</div>
}));

import { useDiagnostic } from '@/contexts/DiagnosticContext';

describe('DiagnosticApp', () => {
  it('renders DiagnosticContent inside DiagnosticProvider', () => {
    // Mock the useDiagnostic hook for the basic rendering test
    (useDiagnostic as any).mockReturnValue({
      diagnosticState: DiagnosticState.LANDING,
      hasExistingSession: false,
      isLoading: false,
      handleStartDiagnostic: vi.fn()
    });
    
    render(<DiagnosticApp />);
  });

  it('renders LoadingView when isLoading is true', () => {
    // Mock the useDiagnostic hook with loading state
    (useDiagnostic as any).mockReturnValue({
      diagnosticState: DiagnosticState.LANDING,
      hasExistingSession: false,
      isLoading: true,
      handleStartDiagnostic: vi.fn()
    });
    
    render(<DiagnosticApp />);
    
    expect(screen.getByTestId('loading-view')).toBeInTheDocument();
  });
  
  it('renders ExistingSessionNotice when hasExistingSession is true', () => {
    // Mock the useDiagnostic hook with existing session
    (useDiagnostic as any).mockReturnValue({
      diagnosticState: DiagnosticState.LANDING,
      hasExistingSession: true,
      isLoading: false,
      handleStartDiagnostic: vi.fn()
    });
    
    render(<DiagnosticApp />);
    
    expect(screen.getByTestId('existing-session-notice')).toBeInTheDocument();
  });
  
  it('renders LandingPage in LANDING state without existing session', () => {
    // Mock the useDiagnostic hook with LANDING state
    (useDiagnostic as any).mockReturnValue({
      diagnosticState: DiagnosticState.LANDING,
      hasExistingSession: false,
      isLoading: false,
      handleStartDiagnostic: vi.fn()
    });
    
    render(<DiagnosticApp />);
    
    expect(screen.getByTestId('landing-page')).toBeInTheDocument();
  });
  
  it('renders UserInfoView in USER_INFO state', () => {
    // Mock the useDiagnostic hook with USER_INFO state
    (useDiagnostic as any).mockReturnValue({
      diagnosticState: DiagnosticState.USER_INFO,
      hasExistingSession: false,
      isLoading: false,
      handleStartDiagnostic: vi.fn()
    });
    
    render(<DiagnosticApp />);
    
    expect(screen.getByTestId('user-info-view')).toBeInTheDocument();
  });
  
  it('renders QuestionView in QUESTIONS state', () => {
    // Mock the useDiagnostic hook with QUESTIONS state
    (useDiagnostic as any).mockReturnValue({
      diagnosticState: DiagnosticState.QUESTIONS,
      hasExistingSession: false,
      isLoading: false,
      handleStartDiagnostic: vi.fn()
    });
    
    render(<DiagnosticApp />);
    
    expect(screen.getByTestId('question-view')).toBeInTheDocument();
  });
  
  it('renders ResultsView in RESULTS state', () => {
    // Mock the useDiagnostic hook with RESULTS state
    (useDiagnostic as any).mockReturnValue({
      diagnosticState: DiagnosticState.RESULTS,
      hasExistingSession: false,
      isLoading: false,
      handleStartDiagnostic: vi.fn()
    });
    
    render(<DiagnosticApp />);
    
    expect(screen.getByTestId('results-view')).toBeInTheDocument();
  });
});
