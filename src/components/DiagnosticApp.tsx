
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LandingPage from '@/components/LandingPage';
import DiagnosticQuestion from '@/components/DiagnosticQuestion';
import DiagnosticResults from '@/components/DiagnosticResults';
import ProgressBar from '@/components/ProgressBar';
import { DiagnosticQuestion as QuestionType, UserAnswer, DiagnosticResult } from '@/types/diagnostic';
import { diagnosticQuestions } from '@/data/diagnosticData';
import { calculateResults } from '@/utils/diagnosticCalculations';

enum DiagnosticState {
  LANDING,
  QUESTIONS,
  RESULTS
}

const DiagnosticApp: React.FC = () => {
  const [diagnosticState, setDiagnosticState] = useState<DiagnosticState>(DiagnosticState.LANDING);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [results, setResults] = useState<DiagnosticResult | null>(null);

  const handleStartDiagnostic = () => {
    setDiagnosticState(DiagnosticState.QUESTIONS);
  };

  const handleSelectAnswer = (value: 'high' | 'medium' | 'low') => {
    const currentQuestion = diagnosticQuestions[currentQuestionIndex];
    
    // Record the answer
    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOption: value
    };
    
    const updatedAnswers = [...answers];
    const existingAnswerIndex = answers.findIndex(a => a.questionId === currentQuestion.id);
    
    if (existingAnswerIndex !== -1) {
      updatedAnswers[existingAnswerIndex] = answer;
    } else {
      updatedAnswers.push(answer);
    }
    
    setAnswers(updatedAnswers);
    
    // Automatically advance to the next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < diagnosticQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        const calculatedResults = calculateResults(updatedAnswers, diagnosticQuestions);
        setResults(calculatedResults);
        setDiagnosticState(DiagnosticState.RESULTS);
      }
    }, 400); // Short delay for visual feedback
  };

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleResetDiagnostic = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults(null);
    setDiagnosticState(DiagnosticState.LANDING);
  };

  // Determine if there's a previous answer for the current question
  const getPreviousAnswer = () => {
    const currentQuestion = diagnosticQuestions[currentQuestionIndex];
    const previousAnswer = answers.find(a => a.questionId === currentQuestion.id);
    return previousAnswer?.selectedOption;
  };

  const progressPercentage = ((currentQuestionIndex + 1) / diagnosticQuestions.length) * 100;

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-12">
      {diagnosticState === DiagnosticState.LANDING && (
        <LandingPage onStartDiagnostic={handleStartDiagnostic} />
      )}
      
      {diagnosticState === DiagnosticState.QUESTIONS && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-full max-w-3xl mb-6">
            <ProgressBar 
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={diagnosticQuestions.length}
            />
          </div>
          
          <div className="w-full max-w-3xl">
            <DiagnosticQuestion
              question={diagnosticQuestions[currentQuestionIndex]}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={diagnosticQuestions.length}
              onSelectAnswer={handleSelectAnswer}
              onGoBack={currentQuestionIndex > 0 ? handleGoBack : undefined}
              previousAnswer={getPreviousAnswer()}
            />
          </div>
        </motion.div>
      )}
      
      {diagnosticState === DiagnosticState.RESULTS && results && (
        <DiagnosticResults results={results} onReset={handleResetDiagnostic} />
      )}
    </div>
  );
};

export default DiagnosticApp;
