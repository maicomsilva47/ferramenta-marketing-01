
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import StrategicInsights from '@/components/diagnostic-results/StrategicInsights';
import { Separator } from '@/components/ui/separator';
import { DiagnosticPillar, OptionValue, PillarScore } from '@/types/diagnostic';
import { pillarNames } from '@/data/diagnosticData';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import RadarChart from '@/components/diagnostic-results/RadarChart';
import { OverallScore } from '@/components/diagnostic-results/DiagnosticResultsHeader';
import PillarScoreCard from '@/components/diagnostic-results/PillarScoreCard';
import { pillarFeedbacks, pillarIcons } from '@/data/diagnosticData';
import ConsultationCTA from '@/components/diagnostic-results/ConsultationCTA';

interface DiagnosticShareData {
  overall: string;
  evaluation: string;
  date: string;
  insights?: string[];
  pillarScores?: Record<DiagnosticPillar, {
    evaluation: OptionValue;
    score: number;
    totalQuestions: number;
  }>;
  recommendations?: string[];
}

const ResultadosPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shareId = searchParams.get('id');
  const diagnosticoParam = searchParams.get('diagnostico'); // Legacy parameter
  
  const [diagnosticoData, setDiagnosticoData] = useState<DiagnosticShareData | null>(null);
  const [error, setError] = useState(false);
  const [expandedPillar, setExpandedPillar] = useState<DiagnosticPillar | null>(null);
  
  useEffect(() => {
    if (shareId) {
      // Attempt to get data from localStorage (in a real app this would come from a backend)
      try {
        const storedData = localStorage.getItem(`diagnosticShare_${shareId}`);
        if (storedData) {
          setDiagnosticoData(JSON.parse(storedData));
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error retrieving shared diagnostic:", err);
        setError(true);
      }
    } else if (diagnosticoParam) {
      // Legacy parameter handling
      try {
        setDiagnosticoData(JSON.parse(decodeURIComponent(diagnosticoParam)));
      } catch (e) {
        console.error("Error parsing legacy diagnostic data:", e);
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [shareId, diagnosticoParam]);

  // Toggle pillar details
  const togglePillarDetails = (pillar: DiagnosticPillar) => {
    setExpandedPillar(expandedPillar === pillar ? null : pillar);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };

  const handleExternalLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open('https://go.growthmachine.com.br/way/', '_blank', 'noopener,noreferrer');
  };

  // Count evaluations if data is available
  const evaluationCounts = diagnosticoData?.pillarScores ? {
    low: Object.values(diagnosticoData.pillarScores).filter(score => score.evaluation === 'low').length,
    medium: Object.values(diagnosticoData.pillarScores).filter(score => score.evaluation === 'medium').length,
    high: Object.values(diagnosticoData.pillarScores).filter(score => score.evaluation === 'high').length,
  } : { low: 0, medium: 0, high: 0 };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container max-w-6xl mx-auto py-4 px-4 flex justify-between items-center">
          <img 
            src="/lovable-uploads/3037e665-7de2-4fe8-b9d9-08eea010be72.png" 
            alt="Growth Machine" 
            className="h-10 max-w-[120px] object-contain"
            loading="lazy"
          />
        </div>
      </header>

      <main className="flex-grow w-full py-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="w-full max-w-6xl mx-auto fade-in">
            <Link to="/" className="inline-flex items-center text-growth-orange hover:text-orange-700 mb-6">
              <ChevronLeft size={16} aria-hidden="true" />
              <span>Voltar</span>
            </Link>

            <Card className="w-full shadow-lg border-t-4 border-t-growth-orange mb-6 bg-white">
              <CardContent className="p-6 sm:p-8">
                {error || !diagnosticoData ? (
                  <div className="text-center p-8">
                    <h2 className="text-xl font-semibold text-red-600 mb-4">Dados inválidos</h2>
                    <p className="mb-6">O link para os resultados compartilhados é inválido ou expirou.</p>
                    <Link to="/">
                      <Button className="bg-growth-orange hover:bg-orange-700 h-12 w-full sm:w-auto">
                        Fazer um diagnóstico
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Header with date */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
                      <p className="text-sm text-gray-600">
                        Diagnóstico realizado em <span className="font-semibold">{formatDate(diagnosticoData.date)}</span>
                      </p>
                    </div>
                    
                    {/* Overall Score */}
                    <OverallScore 
                      totalScore={parseInt(diagnosticoData.overall)} 
                      overallEvaluation={diagnosticoData.evaluation as OptionValue}
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
                    {diagnosticoData.pillarScores && Object.keys(diagnosticoData.pillarScores).length > 0 && (
                      <div className="my-8">
                        <h3 className="font-bold text-2xl text-center mb-4">Visão Geral dos Pilares</h3>
                        <p className="text-center text-gray-600 mb-6">Análise de maturidade por pilar estratégico</p>
                        <RadarChart pillarScores={diagnosticoData.pillarScores as any} />
                      </div>
                    )}
                    
                    <Separator className="my-8" />
                    
                    {/* Análise Detalhada por Pilar */}
                    {diagnosticoData.pillarScores && Object.keys(diagnosticoData.pillarScores).length > 0 && (
                      <>
                        <h3 className="font-bold text-2xl mb-6">Análise Detalhada por Pilar</h3>
                        <div className="space-y-6 mb-8">
                          {Object.entries(diagnosticoData.pillarScores).map(([pillar, data]) => {
                            const pillarKey = pillar as DiagnosticPillar;
                            const pillarName = pillarNames[pillarKey] || pillarKey;
                            const icon = pillarIcons[pillarKey] || '📊';
                            const isExpanded = expandedPillar === pillarKey;
                            const feedback = pillarFeedbacks?.[pillarKey]?.[data.evaluation] || {
                              title: "Análise",
                              paragraphs: ["Não há feedback específico disponível para este pilar."]
                            };
                            
                            return (
                              <PillarScoreCard
                                key={pillar}
                                pillarKey={pillarKey}
                                pillarName={pillarName}
                                evaluation={data.evaluation}
                                score={data.score}
                                totalQuestions={data.totalQuestions}
                                expanded={isExpanded}
                                icon={icon}
                                feedback={feedback}
                                onToggle={() => togglePillarDetails(pillarKey)}
                              />
                            );
                          })}
                        </div>
                      </>
                    )}
                    
                    {diagnosticoData.insights && diagnosticoData.insights.length > 0 && (
                      <>
                        <Separator className="my-8" />
                        <StrategicInsights insights={diagnosticoData.insights} />
                      </>
                    )}
                    
                    {diagnosticoData.recommendations && diagnosticoData.recommendations.length > 0 && (
                      <>
                        <Separator className="my-8" />
                        <div className="mb-8">
                          <h3 className="font-bold text-2xl mb-4">Recomendações Estratégicas</h3>
                          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                            <ul className="list-disc pl-5 space-y-3">
                              {diagnosticoData.recommendations.map((recommendation, i) => (
                                <li key={i} className="text-gray-800">{recommendation}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </>
                    )}

                    <Separator className="my-8" />
                    
                    {/* CTA Section */}
                    <ConsultationCTA />

                    <Separator className="my-8" />
                    
                    <div className="mt-6 text-center">
                      <Link to="/">
                        <Button className="bg-growth-orange hover:bg-orange-700 text-white h-12 mb-4 w-full sm:w-auto text-lg px-8">
                          Fazer meu diagnóstico
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-growth-black text-white py-6 mt-auto">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <img 
            src="/lovable-uploads/186cbcb9-c7a6-4294-90b9-0f7927a6a963.png" 
            alt="Growth Machine" 
            className="h-8 max-w-[120px] mx-auto mb-3 object-contain"
            loading="lazy"
          />
          <p>© {new Date().getFullYear()} Growth Machine. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default ResultadosPage;
