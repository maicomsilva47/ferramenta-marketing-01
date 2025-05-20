
import React from 'react';
import { motion } from 'framer-motion';
import DiagnosticQuestion from '@/components/DiagnosticQuestion';
import ProgressBar from '@/components/ProgressBar';
import { useDiagnostic } from '@/contexts/DiagnosticContext';
import { pillarNames } from '@/data/diagnosticData';

const QuestionView: React.FC = () => {
  const { 
    currentQuestion,
    currentQuestionIndex,
    handleSelectAnswer,
    handleGoBack,
    handleGoForward,
    getPreviousAnswer,
    isProcessingAnswer,
    currentPillar,
    currentPillarIndex,
    pillarKeys,
    currentPillarQuestion,
    totalPillarQuestions
  } = useDiagnostic();

  // Safety check - if no question is available, don't render
  if (!currentQuestion) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="w-full max-w-3xl mb-4 md:mb-6">
        <ProgressBar 
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalPillarQuestions}
          currentPillar={pillarNames[currentPillar || '']}
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
          totalQuestions={totalPillarQuestions}
          currentPillarQuestion={currentPillarQuestion}
          totalPillarQuestions={totalPillarQuestions}
          pillarNumber={currentPillarIndex + 1}
          totalPillars={pillarKeys.length}
          onSelectAnswer={handleSelectAnswer}
          onGoBack={currentQuestionIndex > 0 ? handleGoBack : undefined}
          onGoForward={currentQuestionIndex < totalPillarQuestions - 1 ? handleGoForward : undefined}
          previousAnswer={getPreviousAnswer()}
          isProcessing={isProcessingAnswer}
        />
      </div>
    </motion.div>
  );
};

export default QuestionView;
