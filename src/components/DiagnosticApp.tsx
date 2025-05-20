
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState<boolean>(false);

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

  // Function to find unanswered questions - improved version
  const findUnansweredQuestions = (): number[] => {
    const answeredQuestionIds = new Set(answers.map(a => a.questionId));
    
    const unansweredIndexes = diagnosticQuestions
      .map((q, index) => ({ id: q.id, index }))
      .filter(q => !answeredQuestionIds.has(q.id))
      .map(q => q.index);
    
    console.log("Unanswered questions:", unansweredIndexes.length, 
                "Answered:", answeredQuestionIds.size, 
                "Total:", diagnosticQuestions.length);
    
    return unansweredIndexes;
  };
  
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

  // Enhanced function to load shared results using the share_id
  const loadSharedResults = () => {
    try {
      setIsLoading(true);
      if (!shareId) {
        setDiagnosticState(DiagnosticState.LANDING);
        setIsLoading(false);
        return;
      }
      
      console.log(`Attempting to load shared results with ID: ${shareId}`);
      const storageKey = `diagnosticShare_${shareId}`;
      const storedData = localStorage.getItem(storageKey);
      
      if (storedData) {
        const data = JSON.parse(storedData);
        console.log("Found shared diagnostic data:", data);
        
        // Check if data has expired
        if (data.expiresAt && Date.now() > data.expiresAt) {
          localStorage.removeItem(storageKey);
          toast.error("Este link de diagnóstico expirou.");
          setDiagnosticState(DiagnosticState.LANDING);
          setIsLoading(false);
          return;
        }
        
        // Calculate the total possible score
        let totalPossibleScoreFromData = 0;
        
        // If we have pillar scores stored, calculate the actual totalPossibleScore
        if (data.pillarScores) {
          Object.values(data.pillarScores).forEach((pillarScore: any) => {
            if (pillarScore.totalQuestions) {
              // Using a 1-4 scale with max of 4 points per question
              totalPossibleScoreFromData += pillarScore.totalQuestions * 4;
            }
          });
        }
        
        // If calculation failed, use a default
        if (totalPossibleScoreFromData === 0) {
          totalPossibleScoreFromData = 100;
        }
        
        // Reconstruct the results object from stored data
        const loadedResults: DiagnosticResult = {
          pillarScores: data.pillarScores || {},
          totalScore: data.totalScore !== undefined ? data.totalScore : parseFloat(data.overall || "0"),
          totalPossibleScore: data.totalPossibleScore || totalPossibleScoreFromData,
          overallEvaluation: data.evaluation || 'medium',
          recommendations: data.recommendations || [],
          userData: data.userData || null
        };
        
        console.log('Successfully loaded shared diagnostic with:', { 
          totalScore: loadedResults.totalScore,
          totalPossibleScore: loadedResults.totalPossibleScore,
          shareId
        });
        
        setResults(loadedResults);
        setResultsId(shareId);
        setDiagnosticState(DiagnosticState.RESULTS);
      } else {
        console.error(`No data found for share_id: ${shareId}`);
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
  
  // Improved validation function
  const validateAllQuestionsAnswered = (): boolean => {
    const unanswered = findUnansweredQuestions();
    setAllQuestionsAnswered(unanswered.length === 0);
    
    if (unanswered.length > 0) {
      setUnansweredQuestions(unanswered);
      return false;
    }
    
    return true;
  };

  // Improved function to go to first unanswered question
  const goToUnansweredQuestion = () => {
    const unanswered = findUnansweredQuestions();
    
    if (unanswered.length > 0) {
      // Set the diagnostic state first
      setDiagnosticState(DiagnosticState.QUESTIONS);
      
      // Use a timeout to ensure state change completes
      setTimeout(() => {
        const firstUnanswered = unanswered[0];
        setCurrentQuestionIndex(firstUnanswered);
        
        // Find the question for better error messaging
        const questionText = diagnosticQuestions[firstUnanswered]?.text || "uma pergunta";
        toast.error(`Por favor, responda: ${questionText}`);
      }, 100);
    } else {
      // All questions are answered
      setAllQuestionsAnswered(true);
    }
  };

  // Improved user info form submission
  const handleUserInfoSubmit = async (formData: UserFormData) => {
    // Validate all questions are answered before proceeding
    if (!validateAllQuestionsAnswered()) {
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
      // Final check that all questions are answered
      const unanswered = findUnansweredQuestions();
      if (unanswered.length > 0) {
        toast.error("Algumas perguntas não foram respondidas corretamente.");
        setIsLoading(false);
        goToUnansweredQuestion();
        return;
      }
      
      // Use the answers to calculate results
      const calculatedResults = calculateResults(answers, diagnosticQuestions);
      
      // Add user data to results
      calculatedResults.userData = formData;
      
      // Generate a unique ID for this diagnostic result
      const uniqueId = generateUniqueId();
      setResultsId(uniqueId);
      
      // Save results to localStorage with the unique ID
      saveResultsToLocalStorage(calculatedResults, uniqueId);
      
      // Set results in state
      setResults(calculatedResults);
      
      // Send data to HubSpot via webhook if form integration is enabled
      try {
        const success = await sendToHubspot(formData);
        if (!success) {
          console.warn("Failed to send data to HubSpot, but continuing with diagnostic");
        }
      } catch (error) {
        console.error("Error sending data to HubSpot:", error);
      }
      
      // Redirect to results with the result ID in the URL for sharing
      updateUrlWithResultId(uniqueId);
      
      // Set state to results
      setDiagnosticState(DiagnosticState.RESULTS);
      
      // Clear the in-progress session as it's now complete
      clearSavedSession();
      
    } catch (error) {
      console.error("Error in user form submission:", error);
      toast.error("Houve um erro ao processar seus dados, mas você pode continuar com o diagnóstico.");
      
      // Even if there's an error, try to proceed to results
      if (answers.length > 0) {
        try {
          const calculatedResults = calculateResults(answers, diagnosticQuestions);
          calculatedResults.userData = formData;
          setResults(calculatedResults);
          setDiagnosticState(DiagnosticState.RESULTS);
          clearSavedSession();
        } catch (innerError) {
          console.error("Error calculating results:", innerError);
          toast.error("Erro ao calcular resultados. Tente novamente.");
        }
      }
    } finally {
      // End loading state
      setIsLoading(false);
    }
  };

  // Function to update URL with result ID for sharing
  const updateUrlWithResultId = (id: string) => {
    // Update the URL with the result ID without reloading the page
    const url = new URL(window.location.href);
    url.searchParams.set('share_id', id);
    navigate(`/?share_id=${id}`, { replace: true });
  };

  // Improved handle select answer function
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
    
    // Create a new answer array to avoid mutation issues
    let updatedAnswers = [...answers];
    const existingAnswerIndex = updatedAnswers.findIndex(a => a.questionId === currentQuestion.id);
    
    if (existingAnswerIndex !== -1) {
      // Replace existing answer
      updatedAnswers[existingAnswerIndex] = answer;
    } else {
      // Add new answer
      updatedAnswers.push(answer);
    }
    
    // Update the answers state synchronously
    setAnswers(updatedAnswers);
    
    // Short delay for visual feedback, then move to the next question
    setTimeout(() => {
      // Verify the answer was saved properly
      const verifyAnswers = [...updatedAnswers];
      const savedAnswer = verifyAnswers.find(a => a.questionId === currentQuestion.id);
      
      if (!savedAnswer || savedAnswer.selectedOption !== value) {
        console.error("Answer not properly saved before proceeding", {
          expected: value,
          actual: savedAnswer?.selectedOption,
          answers: verifyAnswers
        });
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
        // Final check for unanswered questions using the updated answers array
        const missing = diagnosticQuestions.filter(q => 
          !verifyAnswers.some(a => a.questionId === q.id)
        ).map((q, i) => diagnosticQuestions.findIndex(dq => dq.id === q.id));
        
        if (missing.length === 0) {
          // All done, move to user form
          setCompletedAnswers(verifyAnswers);
          setDiagnosticState(DiagnosticState.USER_INFO);
        } else {
          // There are unanswered questions, go to the first one
          toast.error("Algumas perguntas não foram respondidas. Vamos para a primeira não respondida.");
          
          // Small delay to ensure state changes are processed
          setTimeout(() => {
            const firstUnanswered = missing[0];
            if (firstUnanswered >= 0 && firstUnanswered < diagnosticQuestions.length) {
              setCurrentQuestionIndex(firstUnanswered);
            }
          }, 100);
        }
      }
    }, 400); // Short delay for visual feedback only
  };
  
  // Save results to localStorage - improved function
  const saveResultsToLocalStorage = (diagnosticResults: DiagnosticResult, id: string) => {
    try {
      console.log(`Saving diagnostic results with ID: ${id}`);
      
      // Clean up expired data first
      cleanupExpiredData();
      
      // Set expiration date (7 days from now for better sharing)
      const EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days
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
      
      // Data structure for sharing
      const shareData = {
        // Essential values
        totalScore: diagnosticResults.totalScore,
        totalPossibleScore: diagnosticResults.totalPossibleScore,
        evaluation: diagnosticResults.overallEvaluation,
        date: new Date().toISOString().split('T')[0],
        pillarScores: simplifiedPillarScores,
        recommendations: diagnosticResults.recommendations.slice(0, 5),
        expiresAt: expiresAt,
        userData: diagnosticResults.userData,
        
        // Flags and metadata
        isPublic: true,
        sharedAt: new Date().toISOString(),
        version: '1.1' // Version tracking for future compatibility
      };
      
      // Save in localStorage with the unique ID
      const storageKey = `diagnosticShare_${id}`;
      localStorage.setItem(storageKey, JSON.stringify(shareData));
      console.log(`Results saved with ID ${id}, expires: ${new Date(expiresAt).toLocaleString()}`);
      
    } catch (error) {
      console.error("Error storing diagnostic data:", error);
      toast.error("Erro ao salvar resultados para compartilhamento.");
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
    navigate('/', { replace: true });
    
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
