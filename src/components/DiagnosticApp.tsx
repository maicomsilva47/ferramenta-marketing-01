import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { DiagnosticProvider, DiagnosticState, useDiagnostic } from '@/contexts/DiagnosticContext';
import LandingPage from '@/components/LandingPage';
import LoadingView from '@/components/diagnostic/LoadingView';
import ExistingSessionNotice from '@/components/diagnostic/ExistingSessionNotice';
import QuestionView from '@/components/diagnostic/QuestionView';
import UserInfoView from '@/components/diagnostic/UserInfoView';
import ResultsView from '@/components/diagnostic/ResultsView';

// DiagnosticContent component handles displaying the right view based on state
const DiagnosticContent: React.FC = () => {
  const { 
    diagnosticState, 
    hasExistingSession, 
    isLoading,
    handleStartDiagnostic
  } = useDiagnostic();
  
  // Show loading indicator if loading
  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-12">
      {/* Existing Session Notice */}
      {hasExistingSession && diagnosticState === DiagnosticState.LANDING && (
        <ExistingSessionNotice />
      )}
      
      {/* Landing Page */}
      {diagnosticState === DiagnosticState.LANDING && !hasExistingSession && (
        <LandingPage onStartDiagnostic={handleStartDiagnostic} />
      )}
      
      {/* User Info Form */}
      {diagnosticState === DiagnosticState.USER_INFO && (
        <UserInfoView />
      )}
      
      {/* Questions */}
      {diagnosticState === DiagnosticState.QUESTIONS && (
        <QuestionView />
      )}
      
      {/* Results */}
      {diagnosticState === DiagnosticState.RESULTS && (
        <ResultsView />
      )}
    </div>
  );
};

// Main DiagnosticApp component - only responsible for setting up context
const DiagnosticApp: React.FC = () => {
  const [searchParams] = useSearchParams();
  const shareId = searchParams.get('share_id');
  
  return (
    <DiagnosticProvider shareId={shareId}>
      <DiagnosticContent />
    </DiagnosticProvider>
  );
};

export default DiagnosticApp;
