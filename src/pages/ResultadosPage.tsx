
import React from 'react';
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

const ResultadosPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const diagnosticoParam = searchParams.get('diagnostico');

  let diagnosticoData: {
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
  } | null = null;
  let error = false;

  try {
    if (diagnosticoParam) {
      diagnosticoData = JSON.parse(decodeURIComponent(diagnosticoParam));
    } else {
      error = true;
    }
  } catch (e) {
    console.error("Erro ao parsear dados do diagnóstico:", e);
    error = true;
  }

  const getEvaluationLabel = (evaluation: string) => {
    switch (evaluation) {
      case 'high': return 'Avançado';
      case 'medium': return 'Em Desenvolvimento';
      case 'low': return 'Iniciante';
      default: return 'N/A';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };

  const getEvaluationColor = (evaluation: string): string => {
    switch (evaluation) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressColor = (evaluation: string): string => {
    switch (evaluation) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getBorderColor = (evaluation: string): string => {
    switch (evaluation) {
      case 'high': return 'border-green-300';
      case 'medium': return 'border-amber-300';
      case 'low': return 'border-red-300';
      default: return 'border-gray-300';
    }
  };

  const getBackgroundGradient = (evaluation: string): string => {
    switch (evaluation) {
      case 'high': return 'bg-gradient-to-r from-green-50 to-green-100';
      case 'medium': return 'bg-gradient-to-r from-amber-50 to-amber-100';
      case 'low': return 'bg-gradient-to-r from-red-50 to-red-100';
      default: return 'bg-gradient-to-r from-gray-50 to-gray-100';
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
        <div className="container py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/3037e665-7de2-4fe8-b9d9-08eea010be72.png" 
              alt="Growth Machine" 
              className="h-10 max-w-[120px] object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </header>

      <main className="flex-grow w-full py-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <div className="w-full max-w-4xl mx-auto fade-in">
            <Link to="/" className="inline-flex items-center text-growth-orange hover:text-orange-700 mb-6">
              <ChevronLeft size={16} aria-hidden="true" />
              <span>Voltar</span>
            </Link>

            <Card className="w-full shadow-lg border-t-4 border-t-growth-orange mb-6 bg-white">
              <CardContent className="p-4 sm:p-6">
                {error || !diagnosticoData ? (
                  <div className="text-center p-4">
                    <h2 className="text-xl font-semibold text-red-600 mb-2">Dados inválidos</h2>
                    <p className="mb-4">O link para os resultados compartilhados é inválido ou expirou.</p>
                    <Link to="/">
                      <Button className="bg-growth-orange hover:bg-orange-700 h-12 w-full sm:w-auto">
                        Fazer um diagnóstico
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    {/* Pontuação Geral */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-xl">Pontuação Geral</h3>
                        <span className={`font-bold ${getEvaluationColor(diagnosticoData.evaluation)}`}>
                          {getEvaluationLabel(diagnosticoData.evaluation)}
                        </span>
                      </div>
                      <Progress 
                        value={parseInt(diagnosticoData.overall)} 
                        className="h-3" 
                        indicatorClassName={getProgressColor(diagnosticoData.evaluation)} 
                      />
                      <div className="bg-gray-50 p-4 rounded-lg mt-4">
                        <p className="text-center text-sm text-gray-600">
                          Diagnóstico realizado em <span className="font-semibold">{formatDate(diagnosticoData.date)}</span>
                        </p>
                      </div>
                    </div>
                    
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

                    <Separator className="my-6" />
                    
                    {diagnosticoData.pillarScores && Object.keys(diagnosticoData.pillarScores).length > 0 && (
                      <>
                        <h3 className="font-bold text-xl mb-4">Análise por Pilar</h3>
                        <div className="space-y-4 mb-6">
                          {Object.entries(diagnosticoData.pillarScores).map(([pillar, data]) => {
                            const pillarKey = pillar as DiagnosticPillar;
                            const pillarName = pillarNames[pillarKey] || pillarKey;
                            const score = (data.score / (data.totalQuestions * 3)) * 100;
                            
                            return (
                              <Card key={pillar} className={`border-l-4 ${getBorderColor(data.evaluation)}`}>
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                      <h4 className="font-bold">{pillarName}</h4>
                                    </div>
                                    <span className={`font-bold px-3 py-1 rounded-full text-sm ${getEvaluationColor(data.evaluation)} ${data.evaluation === 'high' ? 'bg-green-100' : data.evaluation === 'medium' ? 'bg-amber-100' : 'bg-red-100'}`}>
                                      {getEvaluationLabel(data.evaluation)}
                                    </span>
                                  </div>
                                  <div className="mt-3">
                                    <div className="flex items-center justify-between mb-1 text-sm">
                                      <span className="text-gray-600">Pontuação</span>
                                      <span className="font-semibold">{score.toFixed(0)}%</span>
                                    </div>
                                    <Progress 
                                      value={score} 
                                      className="h-2" 
                                      indicatorClassName={getProgressColor(data.evaluation)} 
                                    />
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </>
                    )}
                    
                    {diagnosticoData.insights && diagnosticoData.insights.length > 0 && (
                      <>
                        <Separator className="my-6" />
                        <StrategicInsights insights={diagnosticoData.insights} />
                      </>
                    )}
                    
                    {diagnosticoData.recommendations && diagnosticoData.recommendations.length > 0 && (
                      <>
                        <Separator className="my-6" />
                        <div>
                          <h3 className="font-bold text-lg mb-2">Recomendações Estratégicas</h3>
                          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-sm">
                            <ul className="list-disc pl-5 space-y-2">
                              {diagnosticoData.recommendations.map((recommendation, i) => (
                                <li key={i}>{recommendation}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </>
                    )}

                    <Separator className="my-6" />
                    
                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg shadow-sm border border-orange-200 mb-6">
                      <h3 className="font-bold text-lg mb-2">📞 Quer um diagnóstico mais detalhado?</h3>
                      <p className="mb-4 text-gray-700">
                        Fale com um especialista da Growth Machine e descubra como podemos acelerar sua operação comercial.
                      </p>
                      <div className="text-center">
                        <a
                          href="https://go.growthmachine.com.br/way/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-growth-orange hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg"
                          onClick={handleExternalLink}
                        >
                          Falar com Especialista
                        </a>
                      </div>
                    </div>

                    <div className="mt-8 text-center">
                      <Link to="/">
                        <Button className="bg-growth-orange hover:bg-orange-700 text-white h-12 mb-4 w-full sm:w-auto">
                          Fazer meu diagnóstico
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-growth-black text-white py-6 mt-auto">
        <div className="container text-center">
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
