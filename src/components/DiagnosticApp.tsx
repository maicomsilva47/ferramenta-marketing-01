import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import LandingPage from '@/components/LandingPage';
import DiagnosticQuestion from '@/components/DiagnosticQuestion';
import DiagnosticResults from '@/components/DiagnosticResults';
import UserInfoForm from '@/components/UserInfoForm';
import ProgressBar from '@/components/ProgressBar';
import { DiagnosticQuestion as QuestionType, UserAnswer, DiagnosticResult, OptionValue, DiagnosticPillar, UserInfo } from '@/types/diagnostic';
import { diagnosticQuestions, pillarNames } from '@/data/diagnosticData';
import { calculateResults } from '@/utils/diagnosticCalculations';
import { generateUniqueId } from '@/utils/idGenerator';
import { sendToHubspot, UserFormData } from '@/utils/hubspotIntegration';
import { Button } from './ui/button';

enum DiagnosticState {
  LANDING,
  QUESTIONS,
  USER_INFO,
  RESULTS
}

// Storage keys
const STORAGE_KEY_SESSION = 'diagnostic_session';
const STORAGE_KEY_ANSWERS = 'diagnostic_answers';
const STORAGE_KEY_STATE = 'diagnostic_state';
const STORAGE_KEY_QUESTION_INDEX = 'diagnostic_question_index';
const STORAGE_KEY_USER_FORM = 'diagnostic_user_form';

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
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [completedAnswers, setCompletedAnswers] = useState<UserAnswer[]>([]);
  
  // New state for session persistence and processing
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [hasExistingSession, setHasExistingSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);
  const [lastAnswerTimestamp, setLastAnswerTimestamp] = useState<number | null>(null);

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

  // Check for existing session on initial load
  useEffect(() => {
    // If we have a share_id, we're loading shared results instead of a saved session
    if (shareId) {
      loadSharedResults();
      return;
    }
    
    // Check if there's a saved session
    checkForExistingSession();
  }, [shareId]);

  // Save progress to localStorage whenever answers or currentQuestionIndex change
  useEffect(() => {
    if (diagnosticState === DiagnosticState.QUESTIONS && !shareId && sessionId) {
      saveProgressToLocalStorage();
    }
  }, [answers, currentQuestionIndex, diagnosticState, sessionId]);

  // Ensure we don't proceed to the next step too quickly
  useEffect(() => {
    if (lastAnswerTimestamp) {
      const timeSinceLastAnswer = Date.now() - lastAnswerTimestamp;
      // If it's been less than our minimum processing time, stay in processing mode
      if (timeSinceLastAnswer < 1200) {
        setIsProcessingAnswer(true);
        
        // Schedule the end of processing after the time difference
        const timeoutId = setTimeout(() => {
          setIsProcessingAnswer(false);
        }, 1200 - timeSinceLastAnswer);
        
        return () => clearTimeout(timeoutId);
      } else {
        setIsProcessingAnswer(false);
      }
    }
  }, [lastAnswerTimestamp]);

  // Check for existing diagnostic session
  const checkForExistingSession = () => {
    try {
      const savedSessionId = localStorage.getItem(STORAGE_KEY_SESSION);
      const savedAnswers = localStorage.getItem(STORAGE_KEY_ANSWERS);
      const savedQuestionIndex = localStorage.getItem(STORAGE_KEY_QUESTION_INDEX);
      const savedUserForm = localStorage.getItem(STORAGE_KEY_USER_FORM);
      
      // If we have saved answers, we have an existing session
      if (savedSessionId && savedAnswers) {
        const parsedAnswers = JSON.parse(savedAnswers) as UserAnswer[];
        const questionIndex = savedQuestionIndex ? parseInt(savedQuestionIndex, 10) : 0;
        
        // Set session data
        setSessionId(savedSessionId);
        setAnswers(parsedAnswers);
        setCurrentQuestionIndex(questionIndex);
        
        // If we have saved user data
        if (savedUserForm) {
          try {
            const parsedUserData = JSON.parse(savedUserForm) as UserInfo;
            setUserData(parsedUserData);
          } catch (error) {
            console.warn("Error parsing saved user form data:", error);
          }
        }
        
        // Show user there's an existing session
        const progress = Math.round((questionIndex / diagnosticQuestions.length) * 100);
        setHasExistingSession(true);
        
        console.log(`Found existing diagnostic session: ${progress}% complete`);
      } else {
        // Create a new session
        const newSessionId = generateUniqueId();
        setSessionId(newSessionId);
        localStorage.setItem(STORAGE_KEY_SESSION, newSessionId);
        setHasExistingSession(false);
      }
      
      // End loading state
      setIsLoading(false);
    } catch (error) {
      console.error("Error checking for existing session:", error);
      // Create a new session if there was an error
      const newSessionId = generateUniqueId();
      setSessionId(newSessionId);
      localStorage.setItem(STORAGE_KEY_SESSION, newSessionId);
      setHasExistingSession(false);
      setIsLoading(false);
    }
  };
  
  // Save current progress to localStorage
  const saveProgressToLocalStorage = () => {
    try {
      if (!sessionId) return;
      
      // Save answers
      localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
      
      // Save current question index
      localStorage.setItem(STORAGE_KEY_QUESTION_INDEX, currentQuestionIndex.toString());
      
      // Save diagnostic state
      localStorage.setItem(STORAGE_KEY_STATE, diagnosticState.toString());
      
      // If we have user data, save it
      if (userData) {
        localStorage.setItem(STORAGE_KEY_USER_FORM, JSON.stringify(userData));
      }
      
      console.log(`Progress saved: Question ${currentQuestionIndex + 1}/${diagnosticQuestions.length}`);
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };
  
  // Clear saved session
  const clearSavedSession = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_SESSION);
      localStorage.removeItem(STORAGE_KEY_ANSWERS);
      localStorage.removeItem(STORAGE_KEY_QUESTION_INDEX);
      localStorage.removeItem(STORAGE_KEY_STATE);
      localStorage.removeItem(STORAGE_KEY_USER_FORM);
      console.log("Diagnostic session cleared");
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  };

  // Continue a saved session
  const continueSavedSession = () => {
    setDiagnosticState(DiagnosticState.QUESTIONS);
  };
  
  // Start a new session
  const startNewSession = () => {
    // Clear any existing session data
    clearSavedSession();
    
    // Create a new session
    const newSessionId = generateUniqueId();
    setSessionId(newSessionId);
    localStorage.setItem(STORAGE_KEY_SESSION, newSessionId);
    
    // Reset state
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setUserData(null);
    
    // Start the diagnostic
    setDiagnosticState(DiagnosticState.QUESTIONS);
  };

  // Load shared results if a share_id is provided
  const loadSharedResults = () => {
    try {
      setIsLoading(true);
      const storageKey = `diagnosticShare_${shareId}`;
      const storedData = localStorage.getItem(storageKey);
      
      if (storedData) {
        const data = JSON.parse(storedData);
        
        // Check if data has expired
        if (data.expiresAt && Date.now() > data.expiresAt) {
          localStorage.removeItem(storageKey);
          toast.error("Este link de diagnóstico expirou.");
          setDiagnosticState(DiagnosticState.LANDING);
          setIsLoading(false);
          return;
        }
        
        // Calculate the total possible score - this was missing before
        let totalPossibleScoreFromData = 100; // Default fallback
        
        // If we have pillar scores stored, calculate the actual totalPossibleScore
        if (data.pillarScores) {
          let calculatedPossibleScore = 0;
          
          Object.values(data.pillarScores).forEach((pillarScore: any) => {
            if (pillarScore.totalQuestions) {
              // Using a 1-4 scale with max of 4 points per question
              calculatedPossibleScore += pillarScore.totalQuestions * 4;
            }
          });
          
          if (calculatedPossibleScore > 0) {
            totalPossibleScoreFromData = calculatedPossibleScore;
          }
        }
        
        // Reconstruct the results object from stored data with the correct totalPossibleScore
        const loadedResults: DiagnosticResult = {
          pillarScores: data.pillarScores || {},
          totalScore: parseFloat(data.totalScore || data.overall) || 0,
          totalPossibleScore: data.totalPossibleScore || totalPossibleScoreFromData,
          overallEvaluation: data.evaluation || 'medium',
          recommendations: data.recommendations || [],
          userData: data.userData || null
        };
        
        console.log('Loaded shared diagnostic with:', { 
          totalScore: loadedResults.totalScore,
          totalPossibleScore: loadedResults.totalPossibleScore,
          shareId
        });
        
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDiagnostic = () => {
    // If there's an existing session, show the restart option
    if (hasExistingSession) {
      return;
    }
    
    // Otherwise start a new diagnostic session
    startNewSession();
  };

  // Modified function to validate if all questions have been answered
  const validateAllQuestionsAnswered = (): boolean => {
    // Check if we have an answer for each question
    const answeredQuestionIds = answers.map(a => a.questionId);
    const allQuestionIds = diagnosticQuestions.map(q => q.id);
    
    // Find which questions are unanswered
    const unansweredQuestions = allQuestionIds.filter(id => !answeredQuestionIds.includes(id));
    
    if (unansweredQuestions.length > 0) {
      toast.error(`Você precisa responder todas as ${diagnosticQuestions.length} perguntas antes de continuar.`);
      return false;
    }
    
    return true;
  };

  const handleUserInfoSubmit = async (formData: UserFormData) => {
    // Validate all questions are answered before proceeding
    if (!validateAllQuestionsAnswered()) {
      return; // Stop here if validation fails
    }

    // Show loading state
    setIsLoading(true);
    
    // Store user data
    setUserData(formData);
    
    // Save user data to localStorage for session persistence
    if (sessionId) {
      localStorage.setItem(STORAGE_KEY_USER_FORM, JSON.stringify(formData));
    }
    
    try {
      // Validate that all questions have been answered
      if (completedAnswers.length < diagnosticQuestions.length) {
        // Try to recover by using the current answers state
        if (answers.length >= diagnosticQuestions.length) {
          setCompletedAnswers(answers);
        } else {
          toast.error("Algumas perguntas não foram respondidas corretamente. Por favor, reinicie o diagnóstico.");
          setDiagnosticState(DiagnosticState.LANDING);
          setIsLoading(false);
          return;
        }
      }
      
      // Now use the completedAnswers to calculate results
      const calculatedResults = calculateResults(completedAnswers.length >= diagnosticQuestions.length ? completedAnswers : answers, diagnosticQuestions);
      
      // Add user data to results
      calculatedResults.userData = formData;
      
      // Generate a unique ID for this diagnostic result
      const uniqueId = generateUniqueId();
      setResultsId(uniqueId);
      
      // Save results immediately to localStorage
      saveResultsToLocalStorage(calculatedResults, uniqueId);
      
      setResults(calculatedResults);
      
      // Send data to HubSpot via webhook
      const success = await sendToHubspot(formData);
      
      if (!success) {
        console.warn("Failed to send data to HubSpot, but continuing with diagnostic");
      }
      
      // Now proceed to results
      setDiagnosticState(DiagnosticState.RESULTS);
      
      // Clear the in-progress session as it's now complete
      clearSavedSession();
      
    } catch (error) {
      console.error("Error in user form submission:", error);
      toast.error("Houve um erro ao processar seus dados, mas você pode continuar com o diagnóstico.");
      
      // Even if there's an error, try to proceed to results
      if (completedAnswers.length > 0 || answers.length > 0) {
        const answersToUse = completedAnswers.length >= diagnosticQuestions.length ? completedAnswers : answers;
        const calculatedResults = calculateResults(answersToUse, diagnosticQuestions);
        calculatedResults.userData = formData;
        setResults(calculatedResults);
        setDiagnosticState(DiagnosticState.RESULTS);
        clearSavedSession();
      }
    } finally {
      // End loading state
      setIsLoading(false);
    }
  };

  const handleSelectAnswer = (value: OptionValue) => {
    // If we're already processing, don't allow another answer
    if (isProcessingAnswer) {
      console.log("Ignoring answer selection because we're still processing the previous one");
      return;
    }
    
    // Start processing mode
    setIsProcessingAnswer(true);
    
    const currentQuestion = diagnosticQuestions[currentQuestionIndex];
    
    // Record the answer
    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOption: value
    };
    
    // Update answers state
    const updatedAnswers = [...answers];
    const existingAnswerIndex = answers.findIndex(a => a.questionId === currentQuestion.id);
    
    if (existingAnswerIndex !== -1) {
      updatedAnswers[existingAnswerIndex] = answer;
    } else {
      updatedAnswers.push(answer);
    }
    
    // First update the answers state
    setAnswers(updatedAnswers);
    
    // Store the timestamp of this answer
    setLastAnswerTimestamp(Date.now());
    
    // Wait a longer period to ensure the state is updated and the user sees visual feedback
    setTimeout(() => {
      // Verify the answer was saved
      const savedAnswer = updatedAnswers.find(a => a.questionId === currentQuestion.id);
      if (!savedAnswer || savedAnswer.selectedOption !== value) {
        console.error("Answer not properly saved before proceeding", {
          current: savedAnswer?.selectedOption,
          expected: value
        });
        toast.error("Houve um erro ao salvar sua resposta. Tente novamente.");
        setIsProcessingAnswer(false);
        return;
      }
      
      // Now decide whether to advance or complete
      if (currentQuestionIndex < diagnosticQuestions.length - 1) {
        // Move to next question with a longer delay
        setCurrentQuestionIndex(prev => prev + 1);
        
        // Create an artificial delay to ensure the state update propagates
        setTimeout(() => {
          setIsProcessingAnswer(false);
        }, 500);
      } else {
        // Validate that all questions have been answered before proceeding
        if (validateAllQuestionsAnswered()) {
          console.log("Completed all questions, moving to user form", { answersCount: updatedAnswers.length });
          setCompletedAnswers(updatedAnswers);
          setDiagnosticState(DiagnosticState.USER_INFO);
        } else {
          // If validation fails, stay on the current page
          console.error("Not all questions answered", { 
            questionsCount: diagnosticQuestions.length, 
            answersCount: updatedAnswers.length 
          });
          setIsProcessingAnswer(false);
          return;
        }
        
        setIsProcessingAnswer(false);
      }
    }, 1500); // Much longer delay to ensure smooth transitions
  };
  
  // Function to save results to localStorage - update to store totalPossibleScore
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
        totalScore: diagnosticResults.totalScore,
        totalPossibleScore: diagnosticResults.totalPossibleScore,
        evaluation: diagnosticResults.overallEvaluation,
        date: new Date().toISOString().split('T')[0],
        insights: [], // These will be generated in the Results component
        pillarScores: simplifiedPillarScores,
        recommendations: diagnosticResults.recommendations.slice(0, 5),
        expiresAt: expiresAt,
        userData: userData, // Store user information with the results
      };
      
      console.log('Saving diagnostic data:', {
        totalScore: diagnosticResults.totalScore,
        totalPossibleScore: diagnosticResults.totalPossibleScore
      });
      
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
    // Don't allow going back if we're processing
    if (isProcessingAnswer) return;
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Nova função para avançar para a próxima pergunta
  const handleGoForward = () => {
    // Don't allow going forward if we're processing
    if (isProcessingAnswer) return;
    
    // Só avança se não for a última pergunta e se a atual já tiver sido respondida
    if (currentQuestionIndex < diagnosticQuestions.length - 1 && getPreviousAnswer() !== undefined) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleResetDiagnostic = () => {
    // Clear URL params by replacing the current URL without the parameters
    const url = new URL(window.location.href);
    url.searchParams.delete('share_id');
    window.history.replaceState({}, '', url);
    
    // Clear any existing session
    clearSavedSession();
    
    // Reset all state
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults(null);
    setResultsId(null);
    setUserData(null);
    setCompletedAnswers([]);
    setIsProcessingAnswer(false);
    
    // Create a new session
    const newSessionId = generateUniqueId();
    setSessionId(newSessionId);
    localStorage.setItem(STORAGE_KEY_SESSION, newSessionId);
    
    // Go back to landing page
    setDiagnosticState(DiagnosticState.LANDING);
  };

  // Determine if there's a previous answer for the current question
  const getPreviousAnswer = () => {
    if (!currentQuestion) return undefined;
    
    const previousAnswer = answers.find(a => a.questionId === currentQuestion.id);
    return previousAnswer?.selectedOption;
  };

  const progressPercentage = ((currentQuestionIndex + 1) / diagnosticQuestions.length) * 100;

  // Loading indicator component
  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-growth-orange mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-12">
      {/* Existing Session Notice */}
      {hasExistingSession && diagnosticState === DiagnosticState.LANDING && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-6 bg-orange-50 border border-growth-orange rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-2">Você tem um diagnóstico em andamento</h2>
          <p className="mb-4 text-gray-700">Você já começou um diagnóstico anteriormente. Gostaria de continuar de onde parou ou iniciar um novo?</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={continueSavedSession}
              className="bg-growth-orange hover:bg-orange-600"
              disabled={isProcessingAnswer}
            >
              Continuar diagnóstico
            </Button>
            <Button 
              onClick={startNewSession}
              variant="outline"
              className="border-growth-orange text-growth-orange hover:bg-orange-50"
              disabled={isProcessingAnswer}
            >
              Iniciar novo diagnóstico
            </Button>
          </div>
        </motion.div>
      )}
      
      {diagnosticState === DiagnosticState.LANDING && !hasExistingSession && (
        <LandingPage onStartDiagnostic={handleStartDiagnostic} />
      )}
      
      {diagnosticState === DiagnosticState.USER_INFO && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <UserInfoForm 
            onSubmit={handleUserInfoSubmit} 
            isAfterQuestions={true}
            initialData={userData}
          />
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
              onGoForward={currentQuestionIndex < diagnosticQuestions.length - 1 ? handleGoForward : undefined}
              previousAnswer={getPreviousAnswer()}
              isProcessing={isProcessingAnswer}
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
