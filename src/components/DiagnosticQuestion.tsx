
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader } from 'lucide-react';
import { DiagnosticQuestion as QuestionType, OptionValue } from '@/types/diagnostic';
import { pillarNames } from '@/data/diagnosticData';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface DiagnosticQuestionProps {
  question: QuestionType;
  currentQuestion: number;
  totalQuestions: number;
  currentPillarQuestion?: number;
  totalPillarQuestions?: number;
  pillarNumber?: number;
  totalPillars?: number;
  onSelectAnswer: (value: OptionValue) => void;
  onGoBack?: () => void;
  previousAnswer?: OptionValue;
  isProcessing?: boolean;
}

const DiagnosticQuestion: React.FC<DiagnosticQuestionProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  currentPillarQuestion,
  totalPillarQuestions,
  pillarNumber,
  totalPillars,
  onSelectAnswer,
  onGoBack,
  previousAnswer,
  isProcessing = false
}) => {
  const isMobile = useIsMobile();
  const [selectedValue, setSelectedValue] = useState<OptionValue | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  
  // Reset processing state when question changes, but only set selectedValue to previousAnswer if it exists
  useEffect(() => {
    if (previousAnswer !== undefined) {
      setSelectedValue(previousAnswer);
    } else {
      setSelectedValue(undefined);
    }
    
    setIsSubmitting(false);
    setProcessingComplete(false);
  }, [question.id, previousAnswer]);
  
  // Handle option selection with improved debounce
  const handleOptionSelect = (value: OptionValue) => {
    // Don't allow selection while submitting or if parent component is processing
    if (isSubmitting || isProcessing) return;
    
    // Set local state immediately for UI feedback
    setSelectedValue(value);
    
    // Show loading state
    setIsSubmitting(true);
    
    // Delay to ensure state is updated and provide visual feedback
    // Using a longer timeout to ensure the answer is properly recorded
    setTimeout(() => {
      // Mark processing as complete
      setProcessingComplete(true);
      
      // Call the parent handler to record the answer
      onSelectAnswer(value);
      
      // Keep the loading state visible for a short while
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500); // Extend this slightly for better user feedback
    }, 1500); // Longer delay to ensure state is updated and to prevent rapid clicks
  };
  
  return (
    <div className="flex justify-center items-center min-h-[60vh] px-2">
      <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in border-t-4 border-t-growth-orange">
        <CardContent className="pt-6 pb-6 px-4 md:pt-8 md:pb-8 md:px-6">
          <div className="mb-4 md:mb-6">
            <div className="flex items-center mb-2 md:mb-3 flex-wrap gap-2">
              <span className="bg-growth-orange text-white font-semibold text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded-full">
                {pillarNames[question.pillar]}
              </span>
              
              <div className="text-xs md:text-sm text-gray-500">
                {pillarNumber && totalPillars && (
                  <span>Pilar {pillarNumber} de {totalPillars}{' '}</span>
                )}
                
                {currentPillarQuestion && totalPillarQuestions && (
                  <span>
                    (Pergunta {currentPillarQuestion} de {totalPillarQuestions})
                  </span>
                )}
              </div>
            </div>
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 break-words">{question.text}</h2>
          </div>
          
          {/* Removing overflow-hidden to prevent cut-off during scaling */}
          <div className="space-y-3 md:space-y-4 max-h-[55vh] md:max-h-[60vh] overflow-y-auto pr-1 pb-2">
            {question.options.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index);
              const isSelected = selectedValue !== undefined && selectedValue === option.value;
              
              return (
                <motion.button
                  key={index}
                  className={`w-full p-3 sm:p-4 md:p-4 text-left border-2 rounded-lg transition-all duration-300 break-words
                    ${isSelected 
                      ? 'border-growth-orange bg-orange-50 shadow-md' 
                      : 'hover:border-growth-orange hover:bg-orange-50 border-gray-200'}`}
                  onClick={() => handleOptionSelect(option.value)}
                  aria-label={`Opção ${optionLetter}: ${option.label}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isSubmitting || isProcessing}
                >
                  <div className="flex items-start gap-2 md:gap-3">
                    <span className={`font-medium flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full flex-shrink-0 mt-0.5 ${isSelected ? 'bg-growth-orange text-white' : 'bg-gray-100 text-gray-500'}`} aria-hidden="true">
                      {optionLetter}
                    </span>
                    <span className="text-gray-700 whitespace-normal text-xs sm:text-sm md:text-sm lg:text-base">
                      {option.label}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
          
          {/* Loading indicator */}
          {(isSubmitting || isProcessing) && (
            <div className="mt-4 flex items-center justify-center">
              <Loader className="animate-spin text-growth-orange mr-2" size={20} />
              <span className="text-sm text-gray-600">
                {processingComplete ? "Avançando para próxima pergunta..." : "Salvando resposta..."}
              </span>
            </div>
          )}
          
          {/* Back button */}
          {onGoBack && (
            <div className="mt-4 md:mt-6 flex justify-start">
              <Button 
                variant="ghost"
                onClick={onGoBack}
                className="text-gray-600 hover:text-growth-orange hover:bg-orange-50 h-8 md:h-10 text-xs md:text-sm"
                aria-label="Voltar para a pergunta anterior"
                disabled={isSubmitting || isProcessing}
              >
                <ArrowLeft size={16} className="mr-2" aria-hidden="true" /> Voltar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticQuestion;
