
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DiagnosticPillar, OptionValue, PillarFeedback } from '@/types/diagnostic';
import { evaluationLabels } from '@/data/diagnosticData';

interface PillarScoreCardProps {
  pillarKey: DiagnosticPillar;
  pillarName: string;
  evaluation: OptionValue;
  score: number;
  totalQuestions: number;
  expanded: boolean;
  icon: string;
  feedback: PillarFeedback;
  onToggle: () => void;
}

// These functions are duplicated from DiagnosticResults, but it's better to have them local to this component
const getEvaluationColor = (evaluation: OptionValue): string => {
  switch (evaluation) {
    case 'high': return 'text-green-600';
    case 'medium': return 'text-amber-600';
    case 'low': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

const getProgressColor = (evaluation: OptionValue): string => {
  switch (evaluation) {
    case 'high': return 'bg-green-500';
    case 'medium': return 'bg-amber-500';
    case 'low': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getPillarScore = (score: number, totalQuestions: number): number => {
  return (score / (totalQuestions * 3)) * 100;
};

const PillarScoreCard: React.FC<PillarScoreCardProps> = ({
  pillarKey,
  pillarName,
  evaluation,
  score,
  totalQuestions,
  expanded,
  icon,
  feedback,
  onToggle
}) => {
  return (
    <Card 
      className={`border transition-all duration-300 
        ${expanded ? 'shadow-md border-orange-500' : 'hover:border-orange-500 cursor-pointer'}`}
      onClick={onToggle}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-2xl mr-3" aria-hidden="true">{icon}</span>
            <div>
              <h4 className="font-bold text-gray-800">{pillarName}</h4>
            </div>
          </div>
          <span className={`font-bold ${getEvaluationColor(evaluation)}`}>
            {evaluationLabels[evaluation]}
          </span>
        </div>
        
        <Progress 
          value={getPillarScore(score, totalQuestions)} 
          className="h-2 mb-3" 
          indicatorClassName={getProgressColor(evaluation)} 
        />
        
        {expanded && (
          <div className="mt-4 animate-fade-in">
            <h5 className="font-bold text-orange-500 mb-2">{feedback.title}</h5>
            {feedback.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="text-gray-700 mb-3">
                {paragraph}
              </p>
            ))}
            
            <div className="bg-gray-50 p-3 rounded-md mt-2">
              <h6 className="font-semibold text-sm text-gray-700 mb-2">Ações recomendadas:</h6>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                {feedback.actions?.map((action, idx) => (
                  <li key={idx}>{action}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <div className="text-sm text-orange-500 mt-2 text-center">
          {!expanded ? 'Clique para ver análise detalhada' : 'Clique para recolher'}
        </div>
      </CardContent>
    </Card>
  );
};

export default PillarScoreCard;
