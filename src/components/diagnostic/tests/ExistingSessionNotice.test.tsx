
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ExistingSessionNotice from '../ExistingSessionNotice';
import { useDiagnostic } from '@/contexts/DiagnosticContext';
import userEvent from '@testing-library/user-event';

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

describe('ExistingSessionNotice', () => {
  it('renders with correct text', () => {
    // Mock the useDiagnostic hook
    (useDiagnostic as any).mockReturnValue({
      continueSavedSession: vi.fn(),
      startNewSession: vi.fn(),
      isProcessingAnswer: false
    });
    
    render(<ExistingSessionNotice />);
    
    // Check if the component renders with the expected text
    expect(screen.getByText('Você tem um diagnóstico em andamento')).toBeInTheDocument();
    expect(screen.getByText(/Você já começou um diagnóstico anteriormente/)).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByText('Continuar diagnóstico')).toBeInTheDocument();
    expect(screen.getByText('Iniciar novo diagnóstico')).toBeInTheDocument();
  });
  
  it('calls continueSavedSession when continue button is clicked', async () => {
    const continueMock = vi.fn();
    
    // Mock the useDiagnostic hook
    (useDiagnostic as any).mockReturnValue({
      continueSavedSession: continueMock,
      startNewSession: vi.fn(),
      isProcessingAnswer: false
    });
    
    render(<ExistingSessionNotice />);
    
    // Click the continue button
    await userEvent.click(screen.getByText('Continuar diagnóstico'));
    
    // Check if the continueSavedSession function was called
    expect(continueMock).toHaveBeenCalledTimes(1);
  });
  
  it('calls startNewSession when new session button is clicked', async () => {
    const startNewMock = vi.fn();
    
    // Mock the useDiagnostic hook
    (useDiagnostic as any).mockReturnValue({
      continueSavedSession: vi.fn(),
      startNewSession: startNewMock,
      isProcessingAnswer: false
    });
    
    render(<ExistingSessionNotice />);
    
    // Click the new session button
    await userEvent.click(screen.getByText('Iniciar novo diagnóstico'));
    
    // Check if the startNewSession function was called
    expect(startNewMock).toHaveBeenCalledTimes(1);
  });
  
  it('disables buttons when isProcessingAnswer is true', () => {
    // Mock the useDiagnostic hook with isProcessingAnswer set to true
    (useDiagnostic as any).mockReturnValue({
      continueSavedSession: vi.fn(),
      startNewSession: vi.fn(),
      isProcessingAnswer: true
    });
    
    render(<ExistingSessionNotice />);
    
    // Check if buttons are disabled
    const continueButton = screen.getByText('Continuar diagnóstico');
    const newButton = screen.getByText('Iniciar novo diagnóstico');
    
    expect(continueButton).toBeDisabled();
    expect(newButton).toBeDisabled();
  });
});
