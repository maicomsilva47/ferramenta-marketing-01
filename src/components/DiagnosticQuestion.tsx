
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DiagnosticQuestion as QuestionType, OptionValue } from '@/types/diagnostic';
import { pillarNames } from '@/data/diagnosticData';

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
    <Card className="w-full max-w-3xl mx-auto shadow-md animate-fade-in">
      <CardContent className="pt-6 pb-6">
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="text-growth-orange font-semibold text-sm">
              {pillarNames[question.pillar]}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              • Pergunta {currentQuestion} de {totalQuestions}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 break-words">{question.text}</h2>
        </div>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-4 text-left border rounded-lg transition-colors duration-200 break-words overflow-hidden
                ${previousAnswer === option.value 
                  ? 'border-growth-orange bg-orange-50' 
                  : 'hover:border-growth-orange hover:bg-orange-50 border-gray-200'}`}
              onClick={() => onSelectAnswer(option.value)}
            >
              <div className="flex">
                <span className="font-medium text-gray-500 mr-3 pt-0.5">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-gray-700 whitespace-normal">
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Back button */}
        {onGoBack && (
          <div className="mt-6">
            <Button 
              variant="ghost"
              onClick={onGoBack}
              className="text-gray-600 hover:text-growth-orange hover:bg-orange-50"
            >
              <ArrowLeft size={16} className="mr-2" /> Voltar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiagnosticQuestion;
