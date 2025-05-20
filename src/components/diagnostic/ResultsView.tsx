
import React from 'react';
import DiagnosticResults from '@/components/DiagnosticResults';
import { useDiagnostic } from '@/contexts/DiagnosticContext';

const ResultsView: React.FC = () => {
  const { results, handleResetDiagnostic, resultsId } = useDiagnostic();
  
  // Safety check - if no results are available, don't render
  if (!results) return null;

  return (
    <DiagnosticResults 
      results={results} 
      onReset={handleResetDiagnostic} 
      resultsId={resultsId}
    />
  );
};

export default ResultsView;
