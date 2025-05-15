import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DiagnosticResult, 
  DiagnosticPillar 
} from '@/types/diagnostic';
import { pillarNames, pillarFeedbacks, pillarIcons, resources } from '@/data/diagnosticData';
import { OverallScore } from '@/components/diagnostic-results/DiagnosticResultsHeader';
import PillarScoreCard from '@/components/diagnostic-results/PillarScoreCard';
import StrategicInsights from '@/components/diagnostic-results/StrategicInsights';
import { Resource } from '@/components/diagnostic-results/ResourcesList';
import RadarChart from '@/components/diagnostic-results/RadarChart';
import GrowthcastSection from '@/components/diagnostic-results/GrowthcastSection';
import CoursesSection from '@/components/diagnostic-results/CoursesSection';
import ConsultationCTA from '@/components/diagnostic-results/ConsultationCTA';
import { motion } from 'framer-motion';
import ShareResults from '@/components/diagnostic-results/ShareResults';
import ActionButtons from '@/components/diagnostic-results/ActionButtons';
import { 
  getTotalScore, 
  generateStrategicInsights,
  getResourceUrl 
} from '@/components/diagnostic-results/utils';

interface DiagnosticResultsProps {
  results: DiagnosticResult;
  onReset: () => void;
  resultsId: string | null;
}

const DiagnosticResults: React.FC<DiagnosticResultsProps> = ({ results, onReset, resultsId }) => {
  const [expandedPillar, setExpandedPillar] = useState<DiagnosticPillar | null>(null);
  
  const totalScorePercentage = getTotalScore(results.totalScore, results.totalPossibleScore);
  
  // Generate strategic insights
  const strategicInsights = generateStrategicInsights(results.pillarScores, totalScorePercentage);
  
  // Toggle pillar details
  const togglePillarDetails = (pillar: DiagnosticPillar) => {
    setExpandedPillar(expandedPillar === pillar ? null : pillar);
  };
  
  // Filter and prepare resources - DON'T override the URLs here
  const relevantResources = Object.keys(results.pillarScores)
    .filter(pillar => {
      const pillarScore = results.pillarScores[pillar as DiagnosticPillar];
      return pillarScore.evaluation === 'low' || pillarScore.evaluation === 'medium';
    })
    .flatMap(pillar => resources.filter(resource => resource.pillars.includes(pillar as DiagnosticPillar)))
    .filter((resource, index, self) => 
      index === self.findIndex((t) => t.id === resource.id)
    )
    .slice(0, 5) as Resource[];
  
  // Add a debug log to check resources
  useEffect(() => {
    console.log("Filtered relevant resources:", relevantResources);
    // If no resources were found through filtering, include some defaults
    if (relevantResources.length === 0) {
      console.log("No resources met the criteria, using default resources");
    }
  }, [relevantResources]);

  // Count evaluations
  const evaluationCounts = {
    low: Object.values(results.pillarScores).filter(score => score.evaluation === 'low').length,
    medium: Object.values(results.pillarScores).filter(score => score.evaluation === 'medium').length,
    high: Object.values(results.pillarScores).filter(score => score.evaluation === 'high').length,
  };

  // If we don't have any resources, include some defaults to ensure content shows
  const resourcesForDisplay = relevantResources.length > 0 ? relevantResources : resources.slice(0, 3) as Resource[];

  return (
    <div className="w-full mx-auto animate-fade-in bg-gradient-to-b from-white to-gray-50">
      <Card className="w-full mx-auto mb-6 shadow-lg border-t-4 border-t-growth-orange bg-white">
        <CardContent className="p-6 sm:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Overall Score */}
            <OverallScore 
              totalScore={totalScorePercentage} 
              overallEvaluation={results.overallEvaluation}
            />
            
            {/* Status summary */}
            <div className="grid grid-cols-3 gap-4 my-6">
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <span className="text-2xl font-bold text-red-600">{evaluationCounts.low}</span>
                <p className="text-xs text-gray-700 mt-1">Críticos</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg text-center">
                <span className="text-2xl font-bold text-amber-600">{evaluationCounts.medium}</span>
                <p className="text-xs text-gray-700 mt-1">Em Desenvolvimento</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <span className="text-2xl font-bold text-green-600">{evaluationCounts.high}</span>
                <p className="text-xs text-gray-700 mt-1">Acelerando</p>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            {/* Radar Chart - Visão Geral dos Pilares */}
            <div className="my-8">
              <h3 className="font-bold text-2xl text-center mb-4">Visão Geral dos Pilares</h3>
              <p className="text-center text-gray-600 mb-6">Análise de maturidade por pilar estratégico</p>
              <RadarChart pillarScores={results.pillarScores} />
            </div>
            
            <Separator className="my-8" />
            
            {/* Análise Detalhada por Pilar */}
            <h3 className="font-bold text-2xl mb-6">Análise Detalhada por Pilar</h3>
            
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
            
            <Separator className="my-8" />

            {/* Principais Insights */}
            <StrategicInsights insights={strategicInsights} />
            
            <Separator className="my-8" />
            
            {/* Recomendações Estratégicas */}
            <div className="mb-8">
              <h3 className="font-bold text-2xl mb-4">Recomendações Estratégicas</h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <ul className="list-disc pl-5 space-y-3">
                  {results.recommendations.slice(0, 5).map((recommendation, i) => (
                    <li key={i} className="text-gray-800">{recommendation}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <Separator className="my-8" />

            {/* Consultation CTA - Quer um diagnóstico mais preciso? */}
            <ConsultationCTA />
            
            <Separator className="my-8" />
            
            {/* Courses Section - Aprofunde seus conhecimentos */}
            <CoursesSection resources={resourcesForDisplay} />

            <Separator className="my-8" />

            {/* Growthcast Section */}
            <GrowthcastSection />
            
            <Separator className="my-8" />
            
            <div className="mt-8">
              <ShareResults 
                overallScore={totalScorePercentage} 
                evaluation={results.overallEvaluation}
                insights={strategicInsights}
                pillarScores={results.pillarScores}
                recommendations={results.recommendations}
                resultsId={resultsId}
              />
              
              <div className="mt-6">
                <ActionButtons onReset={onReset} />
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticResults;
