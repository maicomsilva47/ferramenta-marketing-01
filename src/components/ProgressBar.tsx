
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  currentPillar?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentQuestion, 
  totalQuestions,
  currentPillar 
}) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 font-medium">
          {currentPillar && (
            <span className="text-growth-orange mr-2">{currentPillar}</span>
          )}
          <span>Pergunta {currentQuestion} de {totalQuestions}</span>
        </span>
        <span className="font-medium text-growth-orange">{Math.round(progressPercentage)}%</span>
      </div>
      <Progress 
        value={progressPercentage} 
        className="h-2 bg-gray-100" 
        indicatorClassName="bg-growth-orange transition-all duration-500 ease-in-out" 
      />
      <div className="flex justify-between mt-1 text-xs text-gray-400">
        <span>Início</span>
        <span>Fim</span>
      </div>
    </div>
  );
};

export default ProgressBar;
