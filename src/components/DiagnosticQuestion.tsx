
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DiagnosticQuestion as QuestionType, OptionValue } from '@/types/diagnostic';
import { pillarNames } from '@/data/diagnosticData';
import { motion } from 'framer-motion';

interface DiagnosticQuestionProps {
  question: QuestionType;
  currentQuestion: number;
  totalQuestions: number;
  onSelectAnswer: (value: 'high' | 'medium' | 'low') => void;
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
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-3xl mx-auto shadow-lg animate-fade-in border-t-4 border-t-growth-orange">
        <CardContent className="pt-8 pb-8 px-6">
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <span className="bg-growth-orange text-white font-semibold text-sm px-3 py-1 rounded-full">
                {pillarNames[question.pillar]}
              </span>
              <span className="text-sm text-gray-500 ml-3">
                Pergunta {currentQuestion} de {totalQuestions}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 break-words">{question.text}</h2>
          </div>
          
          <div className="space-y-4">
            {question.options.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index);
              const isSelected = previousAnswer === option.value;
              
              return (
                <motion.button
                  key={index}
                  className={`w-full p-5 text-left border-2 rounded-lg transition-all duration-300 break-words overflow-hidden min-h-[70px] hover:shadow-md
                    ${isSelected 
                      ? 'border-growth-orange bg-orange-50 shadow-md' 
                      : 'hover:border-growth-orange hover:bg-orange-50 border-gray-200'}`}
                  onClick={() => onSelectAnswer(option.value)}
                  aria-label={`Opção ${optionLetter}: ${option.label}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex">
                    <span className={`font-medium mr-3 flex items-center justify-center w-7 h-7 rounded-full ${isSelected ? 'bg-growth-orange text-white' : 'bg-gray-100 text-gray-500'}`} aria-hidden="true">
                      {optionLetter}
                    </span>
                    <span className="text-gray-700 whitespace-normal text-lg">
                      {option.label}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
          
          {/* Back button */}
          {onGoBack && (
            <div className="mt-8 flex justify-start">
              <Button 
                variant="ghost"
                onClick={onGoBack}
                className="text-gray-600 hover:text-growth-orange hover:bg-orange-50 h-12"
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
