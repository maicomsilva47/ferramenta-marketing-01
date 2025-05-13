
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DiagnosticOption, OptionValue } from '@/types/diagnostic';

interface FeedbackCardProps {
  feedback: string;
  optionValue: OptionValue;
  onContinue: () => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ 
  feedback, 
  optionValue, 
  onContinue 
}) => {
  const getFeedbackColor = (value: OptionValue) => {
    switch (value) {
      case 'high':
        return 'bg-green-50 border-green-500';
      case 'medium':
        return 'bg-yellow-50 border-yellow-500';
      case 'low':
        return 'bg-red-50 border-red-500';
      default:
        return 'bg-gray-50 border-gray-300';
    }
  };

  const getFeedbackTitle = (value: OptionValue) => {
    switch (value) {
      case 'high': return 'Ótimo trabalho!';
      case 'medium': return 'Há espaço para melhorar!'; 
      case 'low': return 'Atenção: ponto crítico!';
      default: return 'Feedback';
    }
  };

  const getFeedbackIcon = (value: OptionValue) => {
    switch (value) {
      case 'high':
        return (
          <div className="bg-green-100 rounded-full p-2 text-green-700" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'medium':
        return (
          <div className="bg-yellow-100 rounded-full p-2 text-yellow-700" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'low':
        return (
          <div className="bg-red-100 rounded-full p-2 text-red-700" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const feedbackClass = getFeedbackColor(optionValue);
  const title = getFeedbackTitle(optionValue);

  return (
    <Card 
      className={`w-full mx-auto shadow-lg animate-fade-in border-l-4 ${feedbackClass}`}
      role="alert"
      aria-live="polite"
    >
      <CardHeader className="pb-2 px-4">
        <div className="flex items-center gap-3">
          {getFeedbackIcon(optionValue)}
          <h3 className="font-bold text-xl break-words">
            {title}
          </h3>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-gray-700 break-words" dangerouslySetInnerHTML={{ __html: feedback }}></p>
      </CardContent>
      <CardFooter className="flex justify-end pt-2 px-4">
        <Button 
          onClick={onContinue} 
          className="bg-growth-orange hover:bg-orange-700 text-white font-bold h-12 px-6 rounded-full"
          aria-label="Continuar para a próxima pergunta"
        >
          Continuar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeedbackCard;
