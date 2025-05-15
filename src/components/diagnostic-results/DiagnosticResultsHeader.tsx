
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { OptionValue } from '@/types/diagnostic';
import { evaluationLabels } from '@/data/diagnosticData';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

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

const getRadialProgress = (score: number): string => {
  return `${Math.min(359, Math.max(0, (score * 3.6)))}deg`;
};

export const OverallScore: React.FC<DiagnosticResultsHeaderProps> = ({
  totalScore,
  overallEvaluation
}) => {
  return (
    <div className="mb-8">
      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-bold text-growth-orange mb-2">Relatório de Diagnóstico Comercial</h2>
          <p className="text-gray-600">Análise detalhada da maturidade do seu negócio em 7 pilares estratégicos</p>
        </div>
        
        <div className="flex items-center">
          <div className="relative mr-4">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center relative">
              <div className="absolute top-0 left-0 w-24 h-24 rounded-full" style={{
                  background: `conic-gradient(${getProgressColor(overallEvaluation)} ${getRadialProgress(totalScore)}, transparent 0)`,
                  mask: 'radial-gradient(transparent 55%, black 56%)',
                  WebkitMask: 'radial-gradient(transparent 55%, black 56%)'
              }}></div>
              <span className="text-3xl font-bold">{Math.round(totalScore)}</span>
            </div>
          </div>
          <div>
            <span className={`font-bold text-lg ${getEvaluationColor(overallEvaluation)}`}>
              {evaluationLabels[overallEvaluation]}
            </span>
            <p className="text-sm text-gray-500">Pontuação Geral</p>
          </div>
        </div>
      </motion.div>

      <Card className="p-5 border border-gray-200 shadow-sm bg-gray-50">
        <p className="text-gray-700">
          {totalScore >= 80 ? (
            <span>Sua empresa demonstra excelência nas práticas comerciais, superando desafios com estratégias bem estruturadas e processos otimizados.</span>
          ) : totalScore >= 50 ? (
            <span>Sua empresa possui boas práticas comerciais, mas ainda há oportunidades significativas para melhorar processos e resultados.</span>
          ) : (
            <span>Sua empresa apresenta desafios estruturais importantes na área comercial e precisa de atenção imediata para melhorar resultados.</span>
          )}
        </p>
      </Card>
    </div>
  );
};
