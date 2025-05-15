
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { OptionValue } from '@/types/diagnostic';
import { evaluationLabels } from '@/data/diagnosticData';

interface DiagnosticResultsHeaderProps {
  totalScore: number;
  overallEvaluation: OptionValue;
}

const getEvaluationColor = (evaluation: OptionValue): string => {
  switch (evaluation) {
    case 'high': return 'text-green-600';
    case 'medium': return 'text-yellow-600';
    case 'low': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

const getProgressColor = (evaluation: OptionValue): string => {
  switch (evaluation) {
    case 'high': return 'bg-green-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export const OverallScore: React.FC<DiagnosticResultsHeaderProps> = ({
  totalScore,
  overallEvaluation
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-xl">Pontuação Geral</h3>
        <span className={`font-bold ${getEvaluationColor(overallEvaluation)}`}>
          {evaluationLabels[overallEvaluation]}
        </span>
      </div>
      <Progress 
        value={totalScore} 
        className="h-3" 
        indicatorClassName={getProgressColor(overallEvaluation)} 
      />
      <p className="mt-4 text-gray-700">
        {totalScore >= 80 ? (
          <span>Sua empresa demonstra excelência nas práticas comerciais, superando desafios com estratégias bem estruturadas e processos otimizados.</span>
        ) : totalScore >= 50 ? (
          <span>Sua empresa possui boas práticas comerciais, mas ainda há oportunidades significativas para melhorar processos e resultados.</span>
        ) : (
          <span>Sua empresa apresenta desafios estruturais importantes na área comercial e precisa de atenção imediata para melhorar resultados.</span>
        )}
      </p>
    </div>
  );
};
