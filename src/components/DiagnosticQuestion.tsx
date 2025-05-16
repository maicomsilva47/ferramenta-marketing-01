
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DiagnosticQuestion as QuestionType, OptionValue } from '@/types/diagnostic';
import { pillarNames } from '@/data/diagnosticData';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface DiagnosticQuestionProps {
  question: QuestionType;
  currentQuestion: number;
  totalQuestions: number;
  onSelectAnswer: (value: OptionValue) => void;
  onGoBack?: () => void;
  previousAnswer?: OptionValue;
}

const DiagnosticQuestion: React.FC<DiagnosticQuestionProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  onSelectAnswer,
  onGoBack,
  previousAnswer
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in border-t-4 border-t-growth-orange overflow-hidden">
        <CardContent className="pt-6 pb-6 px-4 md:pt-8 md:pb-8 md:px-6">
          <div className="mb-6">
            <div className="flex items-center mb-3 flex-wrap gap-2">
              <span className="bg-growth-orange text-white font-semibold text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded-full">
                {pillarNames[question.pillar]}
              </span>
              <span className="text-xs md:text-sm text-gray-500">
                Pergunta {currentQuestion} de {totalQuestions}
              </span>
            </div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 break-words">{question.text}</h2>
          </div>
          
          <div className="space-y-3 md:space-y-4 max-h-[50vh] md:max-h-[60vh] overflow-y-auto pr-1 pb-2">
            {question.options.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index);
              const isSelected = previousAnswer !== undefined && previousAnswer === option.value;
              
              return (
                <motion.button
                  key={index}
                  className={`w-full p-3 md:p-4 text-left border-2 rounded-lg transition-all duration-300 break-words overflow-hidden
                    ${isSelected 
                      ? 'border-growth-orange bg-orange-50 shadow-md' 
                      : 'hover:border-growth-orange hover:bg-orange-50 border-gray-200'}`}
                  onClick={() => onSelectAnswer(option.value)}
                  aria-label={`Opção ${optionLetter}: ${option.label}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start gap-3">
                    <span className={`font-medium flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full flex-shrink-0 mt-0.5 ${isSelected ? 'bg-growth-orange text-white' : 'bg-gray-100 text-gray-500'}`} aria-hidden="true">
                      {optionLetter}
                    </span>
                    <span className="text-gray-700 whitespace-normal text-sm md:text-base">
                      {option.label}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
          
          {/* Back button */}
          {onGoBack && (
            <div className="mt-6 md:mt-8 flex justify-start">
              <Button 
                variant="ghost"
                onClick={onGoBack}
                className="text-gray-600 hover:text-growth-orange hover:bg-orange-50 h-10 md:h-12 text-sm md:text-base"
                aria-label="Voltar para a pergunta anterior"
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
