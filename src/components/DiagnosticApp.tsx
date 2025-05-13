import React, { useState } from 'react';
import DiagnosticIntro from './DiagnosticIntro';
import DiagnosticQuestion from './DiagnosticQuestion';
import FeedbackCard from './FeedbackCard';
import ProgressBar from './ProgressBar';
import DiagnosticResults from './DiagnosticResults';
import { 
  diagnosticQuestions, 
  pillarNames, 
  evaluationLabels, 
  getPillarEvaluation,
  getOverallEvaluation,
  recommendations
} from '@/data/diagnosticData';
import { 
  DiagnosticQuestion as QuestionType, 
  DiagnosticOption, 
  OptionValue, 
  DiagnosticPillar,
  UserAnswer,
  DiagnosticResult,
  PillarScore
} from '@/types/diagnostic';

enum DiagnosticState {
  INTRO = 'intro',
  QUESTION = 'question',
  FEEDBACK = 'feedback',
  RESULTS = 'results'
}

const DiagnosticApp: React.FC = () => {
  const [currentState, setCurrentState] = useState<DiagnosticState>(DiagnosticState.INTRO);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentFeedback, setCurrentFeedback] = useState<string>('');
  const [currentOptionValue, setCurrentOptionValue] = useState<OptionValue>('medium');
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResult | null>(null);

  const handleStartDiagnostic = () => {
    setCurrentState(DiagnosticState.QUESTION);
  };

  const handleSelectAnswer = (value: OptionValue) => {
    const currentQuestion = diagnosticQuestions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(option => option.value === value);
    
    if (selectedOption) {
      setCurrentFeedback(selectedOption.feedback);
      setCurrentOptionValue(value);
      
      // Save the answer
      setUserAnswers(prev => [
        ...prev, 
        { questionId: currentQuestion.id, selectedOption: value }
      ]);
      
      setCurrentState(DiagnosticState.FEEDBACK);
    }
  };

  const handleContinueAfterFeedback = () => {
    if (currentQuestionIndex < diagnosticQuestions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentState(DiagnosticState.QUESTION);
    } else {
      // Calculate and show final results
      calculateResults();
      setCurrentState(DiagnosticState.RESULTS);
    }
  };

  const handleReset = () => {
    setCurrentState(DiagnosticState.INTRO);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setDiagnosticResults(null);
  };

  const calculateResults = () => {
    // Group questions by pillar
    const pillarQuestions: Record<DiagnosticPillar, QuestionType[]> = {} as Record<DiagnosticPillar, QuestionType[]>;
    
    diagnosticQuestions.forEach(question => {
      if (!pillarQuestions[question.pillar]) {
        pillarQuestions[question.pillar] = [];
      }
      pillarQuestions[question.pillar].push(question);
    });

    // Calculate score for each pillar
    const pillarScores: Record<DiagnosticPillar, PillarScore> = {} as Record<DiagnosticPillar, PillarScore>;
    let totalScore = 0;
    let totalPossibleScore = 0;

    Object.entries(pillarQuestions).forEach(([pillar, questions]) => {
      const pillarAnswers = userAnswers.filter(answer => 
        questions.some(q => q.id === answer.questionId)
      );

      let score = 0;
      pillarAnswers.forEach(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        if (question) {
          const option = question.options.find(o => o.value === answer.selectedOption);
          if (option) {
            score += option.score;
          }
        }
      });

      const pillarPossibleScore = questions.length * 3; // 3 is the max score per question
      const evaluation = getPillarEvaluation(score, questions.length);

      pillarScores[pillar as DiagnosticPillar] = {
        pillar: pillar as DiagnosticPillar,
        score,
        totalQuestions: questions.length,
        evaluation
      };

      totalScore += score;
      totalPossibleScore += pillarPossibleScore;
    });

    // Get overall evaluation
    const overallEvaluation = getOverallEvaluation(totalScore, totalPossibleScore);

    // Get recommendations based on low/medium scores
    const relevantRecommendations = Object.entries(pillarScores)
      .filter(([_, score]) => score.evaluation === 'low' || score.evaluation === 'medium')
      .flatMap(([pillar, _]) => recommendations[pillar as DiagnosticPillar])
      .slice(0, 6); // Limit to top 6 recommendations

    const results: DiagnosticResult = {
      pillarScores,
      totalScore,
      totalPossibleScore,
      overallEvaluation,
      recommendations: relevantRecommendations
    };

    setDiagnosticResults(results);
  };

  // Get current question's pillar name
  const getCurrentPillarName = () => {
    if (currentQuestionIndex < diagnosticQuestions.length) {
      const currentPillar = diagnosticQuestions[currentQuestionIndex].pillar;
      return pillarNames[currentPillar];
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        {currentState === DiagnosticState.INTRO && (
          <DiagnosticIntro onStartDiagnostic={handleStartDiagnostic} />
        )}

        {currentState === DiagnosticState.QUESTION && (
          <>
            <ProgressBar 
              currentQuestion={currentQuestionIndex + 1} 
              totalQuestions={diagnosticQuestions.length} 
              currentPillar={getCurrentPillarName()}
            />
            <DiagnosticQuestion 
              question={diagnosticQuestions[currentQuestionIndex]} 
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={diagnosticQuestions.length}
              onSelectAnswer={handleSelectAnswer} 
            />
          </>
        )}

        {currentState === DiagnosticState.FEEDBACK && (
          <FeedbackCard 
            feedback={currentFeedback} 
            optionValue={currentOptionValue}
            onContinue={handleContinueAfterFeedback} 
          />
        )}

        {currentState === DiagnosticState.RESULTS && diagnosticResults && (
          <DiagnosticResults 
            results={diagnosticResults} 
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default DiagnosticApp;
