
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestion, totalQuestions }) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="w-full max-w-3xl mx-auto mb-4">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>Progresso</span>
        <span>{Math.round(progressPercentage)}%</span>
      </div>
      <Progress value={progressPercentage} className="h-2" indicatorClassName="bg-growth-orange" />
    </div>
  );
};

export default ProgressBar;
