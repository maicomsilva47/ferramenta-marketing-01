
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserInfoView from '../UserInfoView';
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

// Mock UserInfoForm component
vi.mock('@/components/UserInfoForm', () => ({
  default: ({ onSubmit, isAfterQuestions, initialData }: any) => (
    <div data-testid="user-info-form">
      <button onClick={() => onSubmit({ name: 'Test User' })}>Submit</button>
      <div>Is after questions: {isAfterQuestions.toString()}</div>
      <div data-testid="initial-data">{initialData ? JSON.stringify(initialData) : 'No data'}</div>
    </div>
  )
}));

describe('UserInfoView', () => {
  it('renders the user info form with correct props', () => {
    const mockSubmitFn = vi.fn();
    const mockUserData = { name: 'John Doe', email: 'john@example.com' };
    
    // Mock the useDiagnostic hook
    (useDiagnostic as any).mockReturnValue({
      handleUserInfoSubmit: mockSubmitFn,
      userData: mockUserData
    });
    
    render(<UserInfoView />);
    
    // Check if form is rendered
    expect(screen.getByTestId('user-info-form')).toBeInTheDocument();
    
    // Check if isAfterQuestions prop is true
    expect(screen.getByText('Is after questions: true')).toBeInTheDocument();
    
    // Check if initialData is passed correctly
    expect(screen.getByTestId('initial-data').textContent).toContain('John Doe');
    
    // Test form submission
    screen.getByText('Submit').click();
    expect(mockSubmitFn).toHaveBeenCalledWith({ name: 'Test User' });
  });
  
  it('handles null userData', () => {
    // Mock the useDiagnostic hook with null userData
    (useDiagnostic as any).mockReturnValue({
      handleUserInfoSubmit: vi.fn(),
      userData: null
    });
    
    render(<UserInfoView />);
    
    // Check that form renders with no initial data
    expect(screen.getByTestId('initial-data').textContent).toBe('No data');
  });
});
