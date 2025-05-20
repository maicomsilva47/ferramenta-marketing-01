
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader } from 'lucide-react';
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
  onGoForward?: () => void;
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
  onGoForward,
  previousAnswer,
  isProcessing = false
}) => {
  const isMobile = useIsMobile();
  const [selectedValue, setSelectedValue] = useState<OptionValue | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  
  // Reset state when question changes and handle previous answers
  useEffect(() => {
    // Reset selection state when question changes
    setSelectedValue(undefined);
    setIsSubmitting(false);
    
    // Only show loading for new questions (not previously answered)
    if (previousAnswer === undefined) {
      setContentLoaded(false);
      // Brief loading state for new questions only
      const loadTimer = setTimeout(() => {
        setContentLoaded(true);
      }, 300);
      
      return () => clearTimeout(loadTimer);
    } else {
      // If question was previously answered, show content immediately
      setContentLoaded(true);
    }
  }, [question.id, previousAnswer]);
  
  // Handle option selection
  const handleOptionSelect = (value: OptionValue) => {
    // Prevent selection during processing
    if (isProcessing || isSubmitting) {
      return;
    }
    
    // Set local state immediately for UI feedback
    setSelectedValue(value);
    setIsSubmitting(true);
    
    // Call parent handler immediately, with minimal visual delay
    setTimeout(() => {
      onSelectAnswer(value);
    }, 300);
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] px-2 mt-24 sm:mt-28">
      <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in border-t-4 border-t-growth-orange">
        <CardContent className="pt-6 pb-6 px-4 md:pt-8 md:pb-8 md:px-6">
          {!contentLoaded ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader className="animate-spin text-growth-orange mb-4" size={32} />
              <p className="text-gray-600">Carregando próxima pergunta...</p>
            </div>
          ) : (
            <>
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
              
              <div className="space-y-3 md:space-y-4 max-h-[55vh] md:max-h-[60vh] overflow-y-auto pr-3 pb-4 pt-1 pl-1">
                {question.options.map((option, index) => {
                  const optionLetter = String.fromCharCode(65 + index);
                  const isSelected = selectedValue !== undefined && selectedValue === option.value;
                  const isPreviouslySelected = previousAnswer === option.value && selectedValue === undefined;
                  
                  return (
                    <motion.button
                      key={index}
                      className={`w-full p-3 sm:p-4 md:p-4 text-left border-2 rounded-lg transition-all duration-300 break-words
                        ${isSelected 
                          ? 'border-growth-orange bg-orange-50 shadow-md' 
                          : isPreviouslySelected
                            ? 'border-orange-200 bg-orange-50/50 border-dashed'
                            : 'hover:border-growth-orange hover:bg-orange-50 border-gray-200'}`}
                      onClick={() => handleOptionSelect(option.value)}
                      aria-label={`Opção ${optionLetter}: ${option.label}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting || isProcessing}
                    >
                      <div className="flex items-start gap-2 md:gap-3">
                        <span className={`font-medium flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full flex-shrink-0 mt-0.5 
                          ${isSelected ? 'bg-growth-orange text-white' : 
                            isPreviouslySelected ? 'bg-orange-100 text-orange-500 border border-orange-300' : 
                            'bg-gray-100 text-gray-500'}`} 
                          aria-hidden="true"
                        >
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
                    {isSubmitting ? "Salvando resposta..." : "Processando..."}
                  </span>
                </div>
              )}
              
              {/* Navigation buttons */}
              <div className="mt-4 md:mt-6 flex justify-between">
                {/* Back button */}
                {onGoBack && (
                  <Button 
                    variant="ghost"
                    onClick={onGoBack}
                    className="text-gray-600 hover:text-growth-orange hover:bg-orange-50 h-8 md:h-10 text-xs md:text-sm"
                    aria-label="Voltar para a pergunta anterior"
                    disabled={isSubmitting || isProcessing}
                  >
                    <ArrowLeft size={16} className="mr-2" aria-hidden="true" /> Voltar
                  </Button>
                )}
                
                {/* Forward button */}
                {onGoForward && previousAnswer !== undefined && (
                  <Button 
                    variant="ghost"
                    onClick={onGoForward}
                    className="text-gray-600 hover:text-growth-orange hover:bg-orange-50 h-8 md:h-10 text-xs md:text-sm"
                    aria-label="Avançar para a próxima pergunta"
                    disabled={isSubmitting || isProcessing}
                  >
                    Avançar <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticQuestion;
