
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface PillarProgressProps {
  current: number;
  total: number;
}

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  currentPillar?: string;
  pillarStep?: number;
  totalPillars?: number;
  pillarProgress?: PillarProgressProps;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentQuestion, 
  totalQuestions,
  currentPillar,
  pillarStep,
  totalPillars,
  pillarProgress
}) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="w-full max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
      {/* Main progress info */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center mb-1 sm:mb-0 break-words overflow-hidden">
          {/* Overall progress */}
          {pillarStep && totalPillars && (
            <span className="font-semibold text-gray-700 mb-1 sm:mb-0 sm:mr-3">
              Etapa {pillarStep} de {totalPillars}
            </span>
          )}
          
          {/* Current pillar */}
          {currentPillar && (
            <>
              {pillarStep && totalPillars && <span className="hidden sm:inline text-gray-400 mr-3" aria-hidden="true">•</span>}
              <span className="text-growth-orange font-medium mb-1 sm:mb-0 break-words">
                {currentPillar}
                
                {/* Pillar-specific question counter */}
                {pillarProgress && (
                  <span className="text-gray-500 ml-2 text-sm font-normal">
                    (Pergunta {pillarProgress.current} de {pillarProgress.total})
                  </span>
                )}
              </span>
            </>
          )}
        </div>
        
        {/* Percentage */}
        <span className="font-medium text-growth-orange" aria-live="polite" aria-atomic="true">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      
      {/* Progress bar */}
      <Progress 
        value={progressPercentage} 
        className="h-2 bg-gray-100" 
        indicatorClassName="bg-growth-orange transition-all duration-500 ease-in-out"
        aria-label={`Progresso: ${Math.round(progressPercentage)}%`}
      />
      
      {/* Start/End labels */}
      <div className="flex justify-between mt-1 text-xs text-gray-400">
        <span>Início</span>
        <span>Fim</span>
      </div>
    </div>
  );
};

export default ProgressBar;
