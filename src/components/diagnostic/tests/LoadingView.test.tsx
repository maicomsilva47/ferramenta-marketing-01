
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingView from '../LoadingView';

describe('LoadingView', () => {
  it('renders loading spinner and text', () => {
    render(<LoadingView />);
    
    // Check for loading spinner element
    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toBeInTheDocument();
    
    // Check for loading text
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });
  
  it('applies correct styling', () => {
    render(<LoadingView />);
    
    // Check container styling
    const container = screen.getByText('Carregando...').parentElement?.parentElement;
    expect(container).toHaveClass('container');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('justify-center');
    
    // Check loading spinner styling
    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toHaveClass('border-b-2');
    expect(loadingSpinner).toHaveClass('border-growth-orange');
  });
});
