
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResultsView from '../ResultsView';
import { useDiagnostic } from '@/contexts/DiagnosticContext';

// Mock the diagnostic context
vi.mock('@/contexts/DiagnosticContext', () => ({
  useDiagnostic: vi.fn()
}));

// Mock the DiagnosticResults component
vi.mock('@/components/DiagnosticResults', () => ({
  default: ({ results, onReset, resultsId }: any) => (
    <div data-testid="diagnostic-results">
      <div data-testid="results-data">{JSON.stringify(results)}</div>
      <button onClick={onReset}>Reset</button>
      <div>ID: {resultsId}</div>
    </div>
  )
}));

describe('ResultsView', () => {
  it('renders the DiagnosticResults component when results exist', () => {
    // Setup mock data
    const mockResults = {
      totalScore: 50,
      totalPossibleScore: 100,
      overallEvaluation: 'medium' as const,
      pillarScores: {},
      recommendations: []
    };
    
    const handleResetMock = vi.fn();
    
    // Mock the useDiagnostic hook
    (useDiagnostic as any).mockReturnValue({
      results: mockResults,
      handleResetDiagnostic: handleResetMock,
      resultsId: 'test-id'
    });
    
    render(<ResultsView />);
    
    // Check if DiagnosticResults is rendered
    expect(screen.getByTestId('diagnostic-results')).toBeInTheDocument();
    
    // Check if the results data is passed correctly
    expect(screen.getByTestId('results-data').textContent).toContain('50');
    
    // Check if the resultsId is passed
    expect(screen.getByText('ID: test-id')).toBeInTheDocument();
  });
  
  it('returns null when no results exist', () => {
    // Mock the useDiagnostic hook with no results
    (useDiagnostic as any).mockReturnValue({
      results: null,
      handleResetDiagnostic: vi.fn(),
      resultsId: null
    });
    
    const { container } = render(<ResultsView />);
    
    // Container should be empty
    expect(container).toBeEmptyDOMElement();
  });
});
