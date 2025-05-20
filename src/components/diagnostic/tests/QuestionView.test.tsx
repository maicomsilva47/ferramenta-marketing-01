
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import QuestionView from '../QuestionView';
import { useDiagnostic } from '@/contexts/DiagnosticContext';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

// Mock the context
vi.mock('@/contexts/DiagnosticContext', () => ({
  useDiagnostic: vi.fn()
}));

// Mock ProgressBar component
vi.mock('@/components/ProgressBar', () => ({
  default: (props: any) => (
    <div data-testid="progress-bar">
      <div>Current: {props.currentQuestion}</div>
      <div>Total: {props.totalQuestions}</div>
      <div>Pillar: {props.currentPillar}</div>
    </div>
  )
}));

// Mock DiagnosticQuestion component
vi.mock('@/components/DiagnosticQuestion', () => ({
  default: (props: any) => (
    <div data-testid="diagnostic-question">
      <div>Question: {props.question.text}</div>
      <button onClick={() => props.onSelectAnswer(1)}>Select Answer</button>
      {props.onGoBack && <button onClick={props.onGoBack}>Go Back</button>}
      {props.onGoForward && <button onClick={props.onGoForward}>Go Forward</button>}
    </div>
  )
}));

describe('QuestionView', () => {
  const mockQuestion = {
    id: 'q1',
    text: 'Test Question',
    pillar: 'test-pillar',
    options: []
  };
  
  it('renders null when no current question', () => {
    // Mock the useDiagnostic hook with no currentQuestion
    (useDiagnostic as any).mockReturnValue({
      currentQuestion: null
    });
    
    const { container } = render(<QuestionView />);
    
    // Container should be empty
    expect(container).toBeEmptyDOMElement();
  });
  
  it('renders the question view when question exists', () => {
    // Mock the required context values
    (useDiagnostic as any).mockReturnValue({
      currentQuestion: mockQuestion,
      currentQuestionIndex: 2,
      handleSelectAnswer: vi.fn(),
      handleGoBack: vi.fn(),
      handleGoForward: vi.fn(),
      getPreviousAnswer: vi.fn(() => undefined),
      isProcessingAnswer: false,
      currentPillar: 'test-pillar',
      currentPillarIndex: 1,
      pillarKeys: ['pillar1', 'pillar2'],
      currentPillarQuestion: 3,
      totalPillarQuestions: 5,
      pillarNames: { 'test-pillar': 'Test Pillar' }
    });
    
    render(<QuestionView />);
    
    // Check if both components are rendered
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    expect(screen.getByTestId('diagnostic-question')).toBeInTheDocument();
    
    // Check if question text is displayed
    expect(screen.getByText('Question: Test Question')).toBeInTheDocument();
  });
  
  it('calls handleSelectAnswer when answer is selected', () => {
    const handleSelectAnswerMock = vi.fn();
    
    // Mock the useDiagnostic hook
    (useDiagnostic as any).mockReturnValue({
      currentQuestion: mockQuestion,
      currentQuestionIndex: 0,
      handleSelectAnswer: handleSelectAnswerMock,
      handleGoBack: vi.fn(),
      handleGoForward: vi.fn(),
      getPreviousAnswer: vi.fn(() => undefined),
      isProcessingAnswer: false,
      currentPillar: 'test-pillar',
      currentPillarIndex: 0,
      pillarKeys: ['test-pillar'],
      currentPillarQuestion: 1,
      totalPillarQuestions: 3,
      pillarNames: { 'test-pillar': 'Test Pillar' }
    });
    
    render(<QuestionView />);
    
    // Click the select answer button
    screen.getByText('Select Answer').click();
    
    // Check if handleSelectAnswer was called with the correct value
    expect(handleSelectAnswerMock).toHaveBeenCalledWith(1);
  });
  
  it('renders navigation buttons correctly based on question index', () => {
    // Scenario: First question (no back button)
    (useDiagnostic as any).mockReturnValue({
      currentQuestion: mockQuestion,
      currentQuestionIndex: 0, // First question
      handleSelectAnswer: vi.fn(),
      handleGoBack: vi.fn(),
      handleGoForward: vi.fn(),
      getPreviousAnswer: vi.fn(() => undefined),
      isProcessingAnswer: false,
      currentPillar: 'test-pillar',
      currentPillarIndex: 0,
      pillarKeys: ['test-pillar'],
      currentPillarQuestion: 1,
      totalPillarQuestions: 3,
      pillarNames: { 'test-pillar': 'Test Pillar' }
    });
    
    render(<QuestionView />);
    
    // Back button should not be rendered for first question
    expect(screen.queryByText('Go Back')).not.toBeInTheDocument();
    expect(screen.getByText('Go Forward')).toBeInTheDocument();
  });
  
  it('handles middle question with both navigation buttons', () => {
    // Scenario: Middle question (both back and forward buttons)
    (useDiagnostic as any).mockReturnValue({
      currentQuestion: mockQuestion,
      currentQuestionIndex: 1, // Middle question
      handleSelectAnswer: vi.fn(),
      handleGoBack: vi.fn(),
      handleGoForward: vi.fn(),
      getPreviousAnswer: vi.fn(() => 2),
      isProcessingAnswer: false,
      currentPillar: 'test-pillar',
      currentPillarIndex: 0,
      pillarKeys: ['test-pillar'],
      currentPillarQuestion: 2,
      totalPillarQuestions: 3,
      pillarNames: { 'test-pillar': 'Test Pillar' }
    });
    
    render(<QuestionView />);
    
    // Both navigation buttons should be present
    expect(screen.getByText('Go Back')).toBeInTheDocument();
    expect(screen.getByText('Go Forward')).toBeInTheDocument();
  });
});
