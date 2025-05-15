
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DiagnosticPillar, OptionValue, PillarFeedback } from '@/types/diagnostic';
import { evaluationLabels } from '@/data/diagnosticData';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

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

const getBackgroundGradient = (evaluation: OptionValue): string => {
  switch (evaluation) {
    case 'high': return 'bg-gradient-to-r from-green-50 to-green-100';
    case 'medium': return 'bg-gradient-to-r from-amber-50 to-amber-100';
    case 'low': return 'bg-gradient-to-r from-red-50 to-red-100';
    default: return 'bg-gradient-to-r from-gray-50 to-gray-100';
  }
};

const getBorderColor = (evaluation: OptionValue): string => {
  switch (evaluation) {
    case 'high': return 'border-green-300';
    case 'medium': return 'border-amber-300';
    case 'low': return 'border-red-300';
    default: return 'border-gray-300';
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
  const pillarScore = getPillarScore(score, totalQuestions);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card 
        className={`overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 ${expanded ? getBorderColor(evaluation) : 'border-l-growth-orange'}`}
      >
        <div 
          className={`cursor-pointer ${expanded ? getBackgroundGradient(evaluation) : 'bg-white hover:bg-gray-50'}`}
          onClick={onToggle}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center bg-white w-10 h-10 rounded-full shadow-sm mr-3">
                  <span className="text-2xl" aria-hidden="true">{icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{pillarName}</h4>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className={`font-bold px-3 py-1 rounded-full text-sm ${getEvaluationColor(evaluation)} bg-opacity-10 ${evaluation === 'high' ? 'bg-green-100' : evaluation === 'medium' ? 'bg-amber-100' : 'bg-red-100'}`}>
                  {evaluationLabels[evaluation]}
                </span>
                <span className="ml-2">
                  {expanded ? 
                    <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  }
                </span>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1 text-sm">
                <span className="text-gray-600">Pontuação</span>
                <span className="font-semibold">{pillarScore.toFixed(0)}%</span>
              </div>
              <Progress 
                value={pillarScore} 
                className="h-2" 
                indicatorClassName={getProgressColor(evaluation)} 
              />
            </div>
            
            {expanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 animate-fade-in"
              >
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h5 className="font-bold text-growth-orange mb-3">{feedback.title}</h5>
                  {feedback.paragraphs.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-700 mb-3">
                      {paragraph}
                    </p>
                  ))}
                  
                  <div className="bg-gray-50 p-4 rounded-md mt-4 border-l-2 border-growth-orange">
                    <h6 className="font-semibold text-sm text-gray-700 mb-2">Ações recomendadas:</h6>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                      {feedback.actions?.map((action, idx) => (
                        <li key={idx}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default PillarScoreCard;
