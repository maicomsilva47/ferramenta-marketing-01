
import React from 'react';
import { DiagnosticQuestion as QuestionType, DiagnosticOption, OptionValue } from '../types/diagnostic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { pillarNames } from '@/data/diagnosticData';

interface DiagnosticQuestionProps {
  question: QuestionType;
  currentQuestion: number;
  totalQuestions: number;
  onSelectAnswer: (value: OptionValue) => void;
}

const DiagnosticQuestion: React.FC<DiagnosticQuestionProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  onSelectAnswer
}) => {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg border-t-4 border-t-growth-orange animate-fade-in">
      <CardHeader className="space-y-1">
        <div className="text-sm font-medium text-growth-orange mb-2">
          {pillarNames[question.pillar]} • Pergunta {currentQuestion} de {totalQuestions}
        </div>
        <CardTitle className="text-2xl font-bold text-growth-black">
          {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onSelectAnswer(option.value)}
              variant="outline"
              className="w-full justify-start text-left p-4 h-auto border border-gray-200 hover:border-growth-orange hover:bg-orange-50"
            >
              <div className="flex items-start">
                <div className="bg-gray-100 text-gray-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosticQuestion;
