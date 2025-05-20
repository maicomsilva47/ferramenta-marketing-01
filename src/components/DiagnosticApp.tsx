import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import LandingPage from '@/components/LandingPage';
import DiagnosticQuestion from '@/components/DiagnosticQuestion';
import DiagnosticResults from '@/components/DiagnosticResults';
import UserInfoForm from '@/components/UserInfoForm';
import ProgressBar from '@/components/ProgressBar';
import { DiagnosticQuestion as QuestionType, UserAnswer, DiagnosticResult, OptionValue, DiagnosticPillar, UserInfo, EvaluationType } from '@/types/diagnostic';
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
  const [unansweredQuestions, setUnansweredQuestions] = useState<number[]>([]);

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
    // Use a simpler approach for loading shared results
    try {
      setIsLoading(true);
      
      // Parse the share_id to extract basic information
      if (shareId && shareId.includes('-')) {
        console.log("Attempting to parse shared result data from URL");
        
        // Reconstruct results from very minimal data
        // This is a simplified approach - in a real implementation, you'd want more robust data
        const overallScore = 70; // Default fallback value
        const evaluation = 'medium'; // Default fallback value
        
        // Create a basic result structure 
        const loadedResults: DiagnosticResult = {
          pillarScores: {}, // We don't have detailed pillar data in this approach
          totalScore: overallScore,
          totalPossibleScore: 100,
          overallEvaluation: evaluation as EvaluationType, // Fix here - cast to EvaluationType instead of using as OptionValue
          recommendations: [
            "Este é um resultado compartilhado com dados limitados. Para um diagnóstico completo, complete o questionário."
          ]
        };
        
        console.log('Loaded shared result data from URL:', { shareId });
        setResults(loadedResults);
        setResultsId(shareId);
      } else {
        toast.error("Formato de link compartilhado inválido");
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

  // Function to find unanswered questions
  const findUnansweredQuestions = (): number[] => {
    const answeredQuestionIds = answers.map(a => a.questionId);
    const allQuestions = diagnosticQuestions.map((q, index) => ({
      id: q.id,
      index
    }));
    
    // Find which questions are unanswered by index
    return allQuestions
      .filter(q => !answeredQuestionIds.includes(q.id))
      .map(q => q.index);
  };
  
  // Modified function to validate if all questions have been answered
  const validateAllQuestionsAnswered = (): boolean => {
    const unanswered = findUnansweredQuestions();
    
    if (unanswered.length > 0) {
      setUnansweredQuestions(unanswered);
      return false;
    }
    
    return true;
  };

  const handleUserInfoSubmit = async (formData: UserFormData) => {
    // Validate all questions are answered before proceeding
    if (!validateAllQuestionsAnswered()) {
      // If there are unanswered questions, go to the first one
      toast.error(`Você precisa responder todas as perguntas antes de continuar.`);
      goToUnansweredQuestion();
      return;
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
      // Double check that all questions have been answered
      if (answers.length < diagnosticQuestions.length) {
        toast.error("Algumas perguntas não foram respondidas corretamente.");
        goToUnansweredQuestion();
        setIsLoading(false);
        return;
      }
      
      // Use the answers to calculate results
      const calculatedResults = calculateResults(answers, diagnosticQuestions);
      
      // Add user data to results
      calculatedResults.userData = formData;
      
      // Generate a unique ID for this diagnostic result
      const uniqueId = generateUniqueId();
      setResultsId(uniqueId);
      
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
      if (answers.length > 0) {
        const calculatedResults = calculateResults(answers, diagnosticQuestions);
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

  // Improved handleSelectAnswer with proper state handling
  const handleSelectAnswer = (value: OptionValue) => {
    // If we're already processing, don't allow another answer
    if (isProcessingAnswer) {
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
    
    // Update answers using a callback to ensure we have the latest state
    setAnswers(prevAnswers => {
      // Create a new array to avoid mutation
      const updatedAnswers = [...prevAnswers];
      const existingAnswerIndex = updatedAnswers.findIndex(a => a.questionId === currentQuestion.id);
      
      if (existingAnswerIndex !== -1) {
        updatedAnswers[existingAnswerIndex] = answer;
      } else {
        updatedAnswers.push(answer);
      }
      
      console.log(`Answer saved for question ${currentQuestion.id}: ${value}`);
      
      // Use the updated answers to decide what to do next, but with a slight delay
      // to allow React to process the state update
      setTimeout(() => {
        console.log("Processing after answer selection");
        
        // Verify the answer was saved
        const savedAnswer = updatedAnswers.find(a => a.questionId === currentQuestion.id);
        if (!savedAnswer || savedAnswer.selectedOption !== value) {
          console.error("Answer not properly saved before proceeding");
          toast.error("Houve um erro ao salvar sua resposta. Tente novamente.");
          setIsProcessingAnswer(false);
          return;
        }
        
        // End processing mode
        setIsProcessingAnswer(false);
        
        // Now decide whether to advance or complete
        if (currentQuestionIndex < diagnosticQuestions.length - 1) {
          // Move to next question
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          // We're at the last question, check if all questions are answered
          const missingQuestions = findUnansweredQuestions();
          
          // Log this for debugging
          console.log("At last question. Missing questions:", missingQuestions);
          
          if (missingQuestions.length === 0) {
            // All done, move to user form
            setCompletedAnswers(updatedAnswers);
            setDiagnosticState(DiagnosticState.USER_INFO);
          } else {
            // There are unanswered questions, go to the first one
            toast.error("Algumas perguntas não foram respondidas. Vamos para a primeira não respondida.");
            
            // Make sure we're in the right state
            setDiagnosticState(DiagnosticState.QUESTIONS);
            
            // Set a small delay to ensure state transitions complete
            setTimeout(() => {
              const firstUnanswered = missingQuestions[0];
              if (firstUnanswered >= 0 && firstUnanswered < diagnosticQuestions.length) {
                setCurrentQuestionIndex(firstUnanswered);
              }
            }, 50);
          }
        }
      }, 400); // Short delay for visual feedback and state processing
      
      return updatedAnswers;
    });
  };

  // Improved function to navigate to unanswered questions with better error handling
  const goToUnansweredQuestion = () => {
    const unansweredQuestions = findUnansweredQuestions();
    
    console.log("Found unanswered questions:", unansweredQuestions);
    
    if (unansweredQuestions.length > 0) {
      // Make sure we're in question state before setting the index
      setDiagnosticState(DiagnosticState.QUESTIONS);
      
      // Brief delay to ensure state is updated
      setTimeout(() => {
        try {
          // Verify the question index is valid
          const firstUnanswered = unansweredQuestions[0]; 
          if (firstUnanswered >= 0 && firstUnanswered < diagnosticQuestions.length) {
            console.log(`Going to unanswered question at index ${firstUnanswered}`);
            setCurrentQuestionIndex(firstUnanswered);
          } else {
            // Fallback to first question if something went wrong
            console.error("Invalid question index", firstUnanswered);
            setCurrentQuestionIndex(0);
          }
        } catch (error) {
          console.error("Error navigating to unanswered question:", error);
          // Fallback to first question
          setCurrentQuestionIndex(0);
        }
      }, 100); // Slightly longer delay to ensure state transitions complete
    }
  };

  const handleGoBack = () => {
    // Don't allow going back if we're processing
    if (isProcessingAnswer) return;
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Function to advance to the next question
  const handleGoForward = () => {
    // Don't allow going forward if we're processing
    if (isProcessingAnswer) return;
    
    // Only advance if not the last question and current has been answered
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
      
      {/* Keep the rest of the UI components with the same structure */}
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
