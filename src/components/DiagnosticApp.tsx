
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import LandingPage from '@/components/LandingPage';
import DiagnosticQuestion from '@/components/DiagnosticQuestion';
import DiagnosticResults from '@/components/DiagnosticResults';
import ProgressBar from '@/components/ProgressBar';
import { DiagnosticQuestion as QuestionType, UserAnswer, DiagnosticResult } from '@/types/diagnostic';
import { diagnosticQuestions } from '@/data/diagnosticData';
import { calculateResults } from '@/utils/diagnosticCalculations';
import { generateUniqueId } from '@/utils/idGenerator';

enum DiagnosticState {
  LANDING,
  QUESTIONS,
  RESULTS
}

const DiagnosticApp: React.FC = () => {
  const [searchParams] = useSearchParams();
  const shareId = searchParams.get('share_id');
  
  const [diagnosticState, setDiagnosticState] = useState<DiagnosticState>(
    shareId ? DiagnosticState.RESULTS : DiagnosticState.LANDING
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [results, setResults] = useState<DiagnosticResult | null>(null);
  const [resultsId, setResultsId] = useState<string | null>(shareId);

  // Load shared results if a share_id is provided
  useEffect(() => {
    if (shareId) {
      try {
        const storageKey = `diagnosticShare_${shareId}`;
        const storedData = localStorage.getItem(storageKey);
        
        if (storedData) {
          const data = JSON.parse(storedData);
          
          // Check if data has expired
          if (data.expiresAt && Date.now() > data.expiresAt) {
            localStorage.removeItem(storageKey);
            toast.error("Este link de diagnóstico expirou.");
            setDiagnosticState(DiagnosticState.LANDING);
            return;
          }
          
          // Reconstruct the results object from stored data
          const loadedResults: DiagnosticResult = {
            pillarScores: data.pillarScores || {},
            totalScore: parseFloat(data.overall) || 0,
            totalPossibleScore: 100,
            overallEvaluation: data.evaluation || 'medium',
            recommendations: data.recommendations || []
          };
          
          setResults(loadedResults);
          setResultsId(shareId);
        } else {
          toast.error("Não foi possível encontrar os resultados compartilhados.");
          setDiagnosticState(DiagnosticState.LANDING);
        }
      } catch (error) {
        console.error("Error loading shared diagnostic:", error);
        toast.error("Ocorreu um erro ao carregar o diagnóstico compartilhado.");
        setDiagnosticState(DiagnosticState.LANDING);
      }
    }
  }, [shareId]);

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
        
        // Generate a unique ID for this diagnostic result
        const uniqueId = generateUniqueId();
        setResultsId(uniqueId);
        
        // Save results immediately to localStorage
        saveResultsToLocalStorage(calculatedResults, uniqueId);
        
        setResults(calculatedResults);
        setDiagnosticState(DiagnosticState.RESULTS);
      }
    }, 400); // Short delay for visual feedback
  };
  
  // Function to save results to localStorage
  const saveResultsToLocalStorage = (diagnosticResults: DiagnosticResult, id: string) => {
    try {
      // Clean up expired data first
      cleanupExpiredData();
      
      // Set expiration date (48 hours from now)
      const EXPIRATION_TIME = 48 * 60 * 60 * 1000;
      const expiresAt = Date.now() + EXPIRATION_TIME;
      
      // Create a simplified version of pillar scores to reduce storage size
      const simplifiedPillarScores: Record<string, any> = {};
      
      Object.entries(diagnosticResults.pillarScores).forEach(([pillar, score]) => {
        simplifiedPillarScores[pillar] = {
          evaluation: score.evaluation,
          score: score.score,
          totalQuestions: score.totalQuestions
        };
      });
      
      const shareData = {
        overall: diagnosticResults.totalScore.toFixed(0),
        evaluation: diagnosticResults.overallEvaluation,
        date: new Date().toISOString().split('T')[0],
        insights: [], // These will be generated in the Results component
        pillarScores: simplifiedPillarScores,
        recommendations: diagnosticResults.recommendations.slice(0, 5),
        expiresAt: expiresAt
      };
      
      // Save in localStorage
      localStorage.setItem(`diagnosticShare_${id}`, JSON.stringify(shareData));
      
    } catch (error) {
      console.error("Error storing diagnostic data:", error);
    }
  };

  // Clean up expired diagnostic data from localStorage
  const cleanupExpiredData = () => {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('diagnosticShare_')) {
          const storedData = localStorage.getItem(key);
          if (storedData) {
            try {
              const data = JSON.parse(storedData);
              if (data.expiresAt && Date.now() > data.expiresAt) {
                localStorage.removeItem(key);
              }
            } catch (err) {
              // Invalid JSON, remove the entry
              localStorage.removeItem(key);
            }
          }
        }
      });
    } catch (err) {
      console.error('Error cleaning up expired data:', err);
    }
  };

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleResetDiagnostic = () => {
    // Clear URL params by replacing the current URL without the parameters
    const url = new URL(window.location.href);
    url.searchParams.delete('share_id');
    window.history.replaceState({}, '', url);
    
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults(null);
    setResultsId(null);
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
        <DiagnosticResults results={results} onReset={handleResetDiagnostic} resultsId={resultsId} />
      )}
    </div>
  );
};

export default DiagnosticApp;
