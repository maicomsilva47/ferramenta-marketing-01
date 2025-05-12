
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  DiagnosticResult, 
  PillarScore, 
  OptionValue,
  DiagnosticPillar 
} from '@/types/diagnostic';
import { pillarNames, evaluationLabels, resources } from '@/data/diagnosticData';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface DiagnosticResultsProps {
  results: DiagnosticResult;
  onReset: () => void;
}

const DiagnosticResults: React.FC<DiagnosticResultsProps> = ({ results, onReset }) => {
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

  const getPillarScore = (pillar: PillarScore): number => {
    return (pillar.score / (pillar.totalQuestions * 3)) * 100;
  };

  const getTotalScore = (): number => {
    return (results.totalScore / results.totalPossibleScore) * 100;
  };

  const relevantResources = Object.keys(results.pillarScores)
    .filter(pillar => {
      const pillarScore = results.pillarScores[pillar as DiagnosticPillar];
      return pillarScore.evaluation === 'low' || pillarScore.evaluation === 'medium';
    })
    .flatMap(pillar => resources.filter(resource => resource.pillars.includes(pillar as DiagnosticPillar)))
    .filter((resource, index, self) => 
      index === self.findIndex((t) => t.id === resource.id)
    )
    .slice(0, 5);

  const handleShareResults = () => {
    // In a real implementation, this would generate a shareable link or PDF
    toast.success("Link para compartilhar o diagnóstico copiado para a área de transferência!");
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto animate-fade-in">
      <Card className="w-full mb-6 shadow-lg border-t-4 border-t-growth-orange">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-growth-black">
            Relatório Final - Diagnóstico Estratégico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg">Pontuação Geral</h3>
              <span className={`font-bold ${getEvaluationColor(results.overallEvaluation)}`}>
                {evaluationLabels[results.overallEvaluation]}
              </span>
            </div>
            <Progress 
              value={getTotalScore()} 
              className="h-3" 
              indicatorClassName={getProgressColor(results.overallEvaluation)} 
            />
          </div>
          
          <Separator className="my-6" />
          
          <h3 className="font-bold text-lg mb-4">Análise por Pilar</h3>
          <div className="space-y-6">
            {Object.entries(results.pillarScores).map(([pillar, score]) => (
              <div key={pillar}>
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium">{pillarNames[pillar as DiagnosticPillar]}</div>
                  <span className={`font-medium ${getEvaluationColor(score.evaluation)}`}>
                    {evaluationLabels[score.evaluation]}
                  </span>
                </div>
                <Progress 
                  value={getPillarScore(score)} 
                  className="h-2" 
                  indicatorClassName={getProgressColor(score.evaluation)} 
                />
              </div>
            ))}
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Principais Insights</h3>
              <ul className="list-disc pl-5 space-y-2">
                {results.pillarScores.prospecting.evaluation === 'low' && (
                  <li>Você está à mercê do acaso. Sem prospecção ativa e estruturada, você depende da sorte para novos clientes.</li>
                )}
                {results.pillarScores['value-proposition'].evaluation === 'low' && (
                  <li>Seu time está vendendo para quem nunca vai comprar. A falta de foco no cliente ideal está gastando energia com leads sem potencial.</li>
                )}
                {results.pillarScores.conversion.evaluation === 'low' && (
                  <li>Você está queimando leads valiosos sem saber. Oportunidades estão escorrendo pelo ralo por falta de follow-up adequado.</li>
                )}
                {results.pillarScores.retention.evaluation === 'low' && (
                  <li>Você pode estar com um balde furado. Entra cliente pela frente e sai pela torneira de trás sem que você perceba.</li>
                )}
                {(results.pillarScores.tools.evaluation === 'low' || results.pillarScores.tools.evaluation === 'medium') && (
                  <li>Seus competidores estão aproveitando ferramentas e IA que podem multiplicar a produtividade comercial enquanto você opera manualmente.</li>
                )}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">Recomendações Estratégicas</h3>
              <ul className="list-disc pl-5 space-y-2">
                {results.recommendations.slice(0, 5).map((recommendation, i) => (
                  <li key={i}>{recommendation}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {relevantResources.length > 0 && (
            <>
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-bold text-lg mb-4">Recursos Recomendados</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relevantResources.map((resource) => (
                    <Card key={resource.id} className="flex flex-col border border-gray-200 hover:border-growth-orange transition-colors">
                      <CardContent className="p-4 flex flex-col h-full">
                        <h4 className="font-bold text-growth-orange mb-1">{resource.title}</h4>
                        <p className="text-sm text-gray-600 flex-grow">{resource.description}</p>
                        <Button variant="outline" className="mt-3 text-growth-orange border-growth-orange hover:bg-orange-50">
                          Baixar Material
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleShareResults}
              className="bg-growth-orange hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full"
            >
              Compartilhar Resultados
            </Button>
            <Button 
              onClick={onReset}
              variant="outline"
              className="border-growth-orange text-growth-orange hover:bg-orange-50 font-bold py-2 px-6 rounded-full"
            >
              Refazer Diagnóstico
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticResults;
