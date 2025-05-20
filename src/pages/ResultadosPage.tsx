import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  DiagnosticResult,
  DiagnosticPillar,
  PillarScore,
  EvaluationType,
  OptionValue
} from '@/types/diagnostic';
import { getEvaluationColor, getProgressColor } from '@/components/diagnostic-results/utils';

const ResultadosPage: React.FC = () => {
  const { score, evaluation } = useParams<{ score?: string; evaluation?: string }>();
  const navigate = useNavigate();
  const [loadedResults, setLoadedResults] = useState<DiagnosticResult | null>(null);

  useEffect(() => {
    // Simulate loading results from URL parameters
    if (score && evaluation) {
      const scoreFromUrl = parseInt(score, 10);
      const evaluationFromUrl = evaluation as EvaluationType;

      // Simulate pillar scores (replace with actual logic if needed)
      const simulatedPillarScores: Record<DiagnosticPillar, PillarScore> = {
        'revenue-strategy': { pillar: 'revenue-strategy', score: 75, totalQuestions: 10, evaluation: 'medium' },
        'value-proposition': { pillar: 'value-proposition', score: 60, totalQuestions: 10, evaluation: 'medium' },
        'commercial-intelligence': { pillar: 'commercial-intelligence', score: 90, totalQuestions: 10, evaluation: 'high' },
        'prospecting': { pillar: 'prospecting', score: 40, totalQuestions: 10, evaluation: 'low' },
        'conversion': { pillar: 'conversion', score: 70, totalQuestions: 10, evaluation: 'medium' },
        'retention': { pillar: 'retention', score: 80, totalQuestions: 10, evaluation: 'high' },
        'tools': { pillar: 'tools', score: 50, totalQuestions: 10, evaluation: 'medium' },
      };
        
        const loadedResults: DiagnosticResult = {
          pillarScores: simulatedPillarScores,
          totalScore: scoreFromUrl || 70,
          totalPossibleScore: 100,
          overallEvaluation: evaluationFromUrl as EvaluationType || 'medium', // Fix here - cast to EvaluationType
          recommendations: [
            "Defina metas claras de receita e crie um plano de crescimento com KPIs específicos.",
            "Revise sua proposta de valor e identifique claramente seu cliente ideal (ICP).",
            "Implemente ferramentas e processos para coletar e analisar dados do ciclo de vendas."
          ]
        };

      setLoadedResults(loadedResults);
    }
  }, [score, evaluation]);

  if (!loadedResults) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600">Carregando resultados...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => navigate('/')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Diagnóstico
      </Button>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Resultados do Diagnóstico</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Pontuação Geral: {loadedResults.totalScore}%</h3>
            <Progress value={loadedResults.totalScore} className="mb-2" />
            <p>Avaliação: <span className={getEvaluationColor(loadedResults.overallEvaluation)}>{loadedResults.overallEvaluation}</span></p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Recomendações:</h3>
            <ul>
              {loadedResults.recommendations.map((recommendation, index) => (
                <li key={index} className="list-disc ml-5">{recommendation}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultadosPage;
