
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import LandingPage from '@/components/LandingPage';
import DiagnosticQuestion from '@/components/DiagnosticQuestion';
import DiagnosticResults from '@/components/DiagnosticResults';
import UserInfoForm from '@/components/UserInfoForm';
import ProgressBar from '@/components/ProgressBar';
import { DiagnosticQuestion as QuestionType, UserAnswer, DiagnosticResult, OptionValue, DiagnosticPillar } from '@/types/diagnostic';
import { diagnosticQuestions, pillarNames, evaluationLabels } from '@/data/diagnosticData';
import { calculateResults } from '@/utils/diagnosticCalculations';
import { generateUniqueId } from '@/utils/idGenerator';
import { sendToHubspot, UserFormData } from '@/utils/hubspotIntegration';

enum DiagnosticState {
  LANDING,
  USER_INFO,
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
  const [userData, setUserData] = useState<UserFormData | null>(null);

  // Organize questions by pillar
  const questionsByPillar = diagnosticQuestions.reduce((acc, question) => {
    if (!acc[question.pillar]) {
      acc[question.pillar] = [];
    }
    acc[question.pillar].push(question);
    return acc;
  }, {} as Record<DiagnosticPillar, QuestionType[]>);
  
  // Get all pillar keys
  const pillarKeys = Object.keys(questionsByPillar) as DiagnosticPillar[];
  
  // Get current question info
  const currentQuestion = diagnosticQuestions[currentQuestionIndex];
  const currentPillar = currentQuestion?.pillar;
  
  // Get pillar-specific question info
  const getCurrentPillarQuestionInfo = () => {
    if (!currentQuestion) return { currentPillarQuestion: 1, totalPillarQuestions: 1 };
    
    const pillarQuestions = questionsByPillar[currentQuestion.pillar];
    const currentPillarQuestionIndex = pillarQuestions.findIndex(q => q.id === currentQuestion.id);
    
    return {
      currentPillarQuestion: currentPillarQuestionIndex + 1,
      totalPillarQuestions: pillarQuestions.length
    };
  };
  
  // Get current pillar index
  const getCurrentPillarIndex = () => {
    if (!currentQuestion) return 0;
    return pillarKeys.findIndex(key => key === currentQuestion.pillar);
  };
  
  const { currentPillarQuestion, totalPillarQuestions } = getCurrentPillarQuestionInfo();
  const currentPillarIndex = getCurrentPillarIndex();

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
          
          // Load user data if available
          if (data.userData) {
            setUserData(data.userData);
          }
          
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
    setDiagnosticState(DiagnosticState.USER_INFO);
  };

  const handleUserInfoSubmit = async (formData: UserFormData) => {
    // Store user data
    setUserData(formData);
    
    try {
      // Send data to HubSpot via webhook
      const success = await sendToHubspot(formData);
      
      if (!success) {
        console.warn("Failed to send data to HubSpot, but continuing with diagnostic");
        // We don't stop the diagnostic process if HubSpot integration fails
      }
      
      // Proceed to questions
      setDiagnosticState(DiagnosticState.QUESTIONS);
    } catch (error) {
      console.error("Error in user form submission:", error);
      toast.error("Houve um erro ao processar seus dados, mas você pode continuar com o diagnóstico.");
      setDiagnosticState(DiagnosticState.QUESTIONS);
    }
  };

  const handleSelectAnswer = (value: OptionValue) => {
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
        expiresAt: expiresAt,
        userData: userData, // Store user information with the results
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
    setUserData(null);
    setDiagnosticState(DiagnosticState.LANDING);
  };

  // Determine if there's a previous answer for the current question
  const getPreviousAnswer = () => {
    if (!currentQuestion) return undefined;
    
    const previousAnswer = answers.find(a => a.questionId === currentQuestion.id);
    return previousAnswer?.selectedOption;
  };

  const progressPercentage = ((currentQuestionIndex + 1) / diagnosticQuestions.length) * 100;

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-12">
      {diagnosticState === DiagnosticState.LANDING && (
        <LandingPage onStartDiagnostic={handleStartDiagnostic} />
      )}
      
      {diagnosticState === DiagnosticState.USER_INFO && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <UserInfoForm onSubmit={handleUserInfoSubmit} />
        </motion.div>
      )}
      
      {diagnosticState === DiagnosticState.QUESTIONS && currentQuestion && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-full max-w-3xl mb-4 md:mb-6">
            <ProgressBar 
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={diagnosticQuestions.length}
              currentPillar={pillarNames[currentPillar]}
              pillarStep={currentPillarIndex + 1}
              totalPillars={pillarKeys.length}
              pillarProgress={{
                current: currentPillarQuestion,
                total: totalPillarQuestions
              }}
            />
          </div>
          
          <div className="w-full max-w-3xl">
            <DiagnosticQuestion
              question={currentQuestion}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={diagnosticQuestions.length}
              currentPillarQuestion={currentPillarQuestion}
              totalPillarQuestions={totalPillarQuestions}
              pillarNumber={currentPillarIndex + 1}
              totalPillars={pillarKeys.length}
              onSelectAnswer={handleSelectAnswer}
              onGoBack={currentQuestionIndex > 0 ? handleGoBack : undefined}
              previousAnswer={getPreviousAnswer()}
            />
          </div>
        </motion.div>
      )}
      
      {diagnosticState === DiagnosticState.RESULTS && results && (
        <DiagnosticResults 
          results={results} 
          onReset={handleResetDiagnostic} 
          resultsId={resultsId}
          userData={userData}
        />
      )}
    </div>
  );
};

export default DiagnosticApp;
