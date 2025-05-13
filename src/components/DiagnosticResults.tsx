
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DiagnosticResult, 
  DiagnosticPillar 
} from '@/types/diagnostic';
import { pillarNames, pillarFeedbacks, pillarIcons, resources } from '@/data/diagnosticData';
import { DiagnosticResultsHeader, OverallScore } from '@/components/diagnostic-results/DiagnosticResultsHeader';
import PillarScoreCard from '@/components/diagnostic-results/PillarScoreCard';
import StrategicInsights from '@/components/diagnostic-results/StrategicInsights';
import ResourcesList from '@/components/diagnostic-results/ResourcesList';
import ShareResults from '@/components/diagnostic-results/ShareResults';
import ActionButtons from '@/components/diagnostic-results/ActionButtons';
import { 
  getTotalScore, 
  generateStrategicInsights,
  getResourceUrl 
} from '@/components/diagnostic-results/utils';
import { Resource } from '@/components/diagnostic-results/ResourcesList';

interface DiagnosticResultsProps {
  results: DiagnosticResult;
  onReset: () => void;
}

const DiagnosticResults: React.FC<DiagnosticResultsProps> = ({ results, onReset }) => {
  const [expandedPillar, setExpandedPillar] = useState<DiagnosticPillar | null>(null);
  
  const totalScorePercentage = getTotalScore(results.totalScore, results.totalPossibleScore);
  
  // Generate strategic insights
  const strategicInsights = generateStrategicInsights(results.pillarScores, totalScorePercentage);
  
  // Toggle pillar details
  const togglePillarDetails = (pillar: DiagnosticPillar) => {
    setExpandedPillar(expandedPillar === pillar ? null : pillar);
  };
  
  // Filter and prepare resources
  const relevantResources = Object.keys(results.pillarScores)
    .filter(pillar => {
      const pillarScore = results.pillarScores[pillar as DiagnosticPillar];
      return pillarScore.evaluation === 'low' || pillarScore.evaluation === 'medium';
    })
    .flatMap(pillar => resources.filter(resource => resource.pillars.includes(pillar as DiagnosticPillar)))
    .filter((resource, index, self) => 
      index === self.findIndex((t) => t.id === resource.id)
    )
    .slice(0, 5)
    .map(resource => ({
      ...resource,
      url: getResourceUrl(resource.id)
    })) as Resource[];

  return (
    <div className="flex flex-col items-center w-full mx-auto animate-fade-in px-2 sm:px-4">
      <DiagnosticResultsHeader 
        totalScore={totalScorePercentage} 
        overallEvaluation={results.overallEvaluation}
      />
      
      <Card className="w-full max-w-4xl mx-auto mb-6 shadow-lg border-t-4 border-t-growth-orange">
        <CardContent className="pb-6">
          <OverallScore 
            totalScore={totalScorePercentage} 
            overallEvaluation={results.overallEvaluation}
          />
          
          <Separator className="my-6" />
          
          <h3 className="font-bold text-xl mb-4">Análise por Pilar</h3>
          
          <div className="space-y-6">
            {Object.entries(results.pillarScores).map(([pillar, score]) => {
              const pillarKey = pillar as DiagnosticPillar;
              const isExpanded = expandedPillar === pillarKey;
              const icon = pillarIcons[pillarKey] || '📊';
              const feedback = pillarFeedbacks?.[pillarKey]?.[score.evaluation] || {
                title: "Análise",
                paragraphs: ["Não há feedback específico disponível para este pilar."]
              };
              
              return (
                <PillarScoreCard
                  key={pillar}
                  pillarKey={pillarKey}
                  pillarName={pillarNames[pillarKey]}
                  evaluation={score.evaluation}
                  score={score.score}
                  totalQuestions={score.totalQuestions}
                  expanded={isExpanded}
                  icon={icon}
                  feedback={feedback}
                  onToggle={() => togglePillarDetails(pillarKey)}
                />
              );
            })}
          </div>
          
          <Separator className="my-6" />

          <StrategicInsights insights={strategicInsights} />
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Recomendações Estratégicas</h3>
              <ul className="list-disc pl-5 space-y-2">
                {results.recommendations.slice(0, 5).map((recommendation, i) => (
                  <li key={i}>{recommendation}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <ShareResults 
            overallScore={totalScorePercentage} 
            evaluation={results.overallEvaluation}
          />
          
          <ResourcesList resources={relevantResources} />
          
          <ActionButtons onReset={onReset} />
        </CardContent>
      </Card>
      
      <div className="w-full text-center text-sm text-gray-500 mb-6">
        <p>© {new Date().getFullYear()} Growth Machine. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default DiagnosticResults;
