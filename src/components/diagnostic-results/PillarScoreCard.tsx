
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
      whileHover={{ scale: 1.005 }}
      className="transform transition-all duration-300"
    >
      <Card 
        className={`overflow-hidden transition-all duration-300 hover:shadow-lg border-0 shadow ${expanded ? 'scale-[1.01]' : ''}`}
      >
        <div 
          className={`cursor-pointer bg-white relative overflow-hidden transition-all duration-300`}
          onClick={onToggle}
        >
          {/* Colored accent bars - decoration only */}
          <div className={`absolute top-0 left-0 w-full h-1 ${getProgressColor(evaluation)}`}></div>
          
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-14 h-14 rounded-full shadow-inner ${getBackgroundGradient(evaluation)} mr-4`}>
                  <span className="text-3xl" aria-hidden="true">{icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-800">{pillarName}</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 mr-4 w-32">
                      <Progress 
                        value={pillarScore} 
                        className="h-2" 
                        indicatorClassName={getProgressColor(evaluation)} 
                      />
                    </div>
                    <span className="text-sm font-semibold">{pillarScore.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className={`mr-3 py-1 px-3 rounded-full text-sm font-semibold ${getEvaluationColor(evaluation)} ${evaluation === 'high' ? 'bg-green-100' : evaluation === 'medium' ? 'bg-amber-100' : 'bg-red-100'}`}>
                  {evaluationLabels[evaluation]}
                </div>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 ${expanded ? 'bg-gray-200' : ''}`}>
                  {expanded ? 
                    <ChevronUp className="h-5 w-5 text-gray-600" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  }
                </div>
              </div>
            </div>
            
            {expanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 animate-fade-in"
              >
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h5 className="font-bold text-growth-orange text-lg mb-4">{feedback.title}</h5>
                  
                  <div className="space-y-4">
                    {feedback.paragraphs.map((paragraph, idx) => (
                      <p key={idx} className="text-gray-700">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  <div className={`mt-6 p-4 rounded-md ${getBackgroundGradient(evaluation)}`}>
                    <h6 className="font-bold text-gray-800 mb-3">Ações recomendadas:</h6>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
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
