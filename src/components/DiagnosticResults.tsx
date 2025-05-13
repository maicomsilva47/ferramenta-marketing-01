
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  DiagnosticResult, 
  PillarScore, 
  OptionValue,
  DiagnosticPillar 
} from '@/types/diagnostic';
import { pillarNames, evaluationLabels, resources, pillarFeedbacks, pillarIcons } from '@/data/diagnosticData';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Download, Mail, RefreshCw, Share2 } from 'lucide-react';

interface DiagnosticResultsProps {
  results: DiagnosticResult;
  onReset: () => void;
}

const DiagnosticResults: React.FC<DiagnosticResultsProps> = ({ results, onReset }) => {
  const [expandedPillar, setExpandedPillar] = useState<DiagnosticPillar | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  
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

  const togglePillarDetails = (pillar: DiagnosticPillar) => {
    setExpandedPillar(expandedPillar === pillar ? null : pillar);
  };

  const handleShareResults = () => {
    // Generate summary text
    const summaryText = generateSummaryText();
    
    // Copy to clipboard
    navigator.clipboard.writeText(summaryText)
      .then(() => {
        toast.success("Resumo do diagnóstico copiado para a área de transferência!");
      })
      .catch(err => {
        console.error('Erro ao copiar: ', err);
        toast.error("Erro ao copiar texto. Tente novamente.");
      });
  };
  
  const generateSummaryText = (): string => {
    const totalScorePercent = Math.round(getTotalScore());
    const evaluation = evaluationLabels[results.overallEvaluation];
    
    let summary = `📊 Diagnóstico Comercial Growth Machine\n\n`;
    summary += `Pontuação geral: ${totalScorePercent}% (${evaluation})\n\n`;
    
    // Add top 3 pillars by score
    const pillarEntries = Object.entries(results.pillarScores) as [DiagnosticPillar, PillarScore][];
    const sortedPillars = pillarEntries.sort((a, b) => getPillarScore(b[1]) - getPillarScore(a[1]));
    
    summary += `Pontos fortes:\n`;
    sortedPillars.slice(0, 3).forEach(([pillarKey, pillarScore]) => {
      summary += `- ${pillarNames[pillarKey]}: ${Math.round(getPillarScore(pillarScore))}%\n`;
    });
    
    summary += `\nFaça o seu diagnóstico completo em: https://growthmachine.com.br/diagnostico`;
    
    return summary;
  };
  
  const handleSendByEmail = () => {
    if (showEmailInput) {
      if (emailInput && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
        toast.success(`Relatório enviado para ${emailInput}!`);
        setShowEmailInput(false);
        setEmailInput('');
      } else {
        toast.error("Por favor, insira um e-mail válido.");
      }
    } else {
      setShowEmailInput(true);
    }
  };

  const handleDownloadPDF = () => {
    toast.success("Preparando download do relatório em PDF...");
    // In a real implementation, this would generate and download a PDF
    setTimeout(() => {
      toast.success("Relatório baixado com sucesso!");
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto animate-fade-in">
      <div className="w-full mb-4 text-center">
        <img 
          src="/lovable-uploads/3037e665-7de2-4fe8-b9d9-08eea010be72.png" 
          alt="Growth Machine" 
          className="h-16 inline-block mb-4" 
        />
      </div>
      <Card className="w-full mb-6 shadow-lg border-t-4 border-t-growth-orange">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-growth-black">
            Diagnóstico Estratégico Comercial
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
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
            <p className="mt-4 text-gray-700">
              {getTotalScore() >= 80 ? (
                <span>Sua empresa demonstra excelência nas práticas comerciais, superando desafios com estratégias bem estruturadas e processos otimizados.</span>
              ) : getTotalScore() >= 50 ? (
                <span>Sua empresa possui boas práticas comerciais, mas ainda há oportunidades significativas para melhorar processos e resultados.</span>
              ) : (
                <span>Sua empresa apresenta desafios estruturais importantes na área comercial e precisa de atenção imediata para melhorar resultados.</span>
              )}
            </p>
          </div>
          
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
                <Card 
                  key={pillar} 
                  className={`border transition-all duration-300 
                    ${isExpanded ? 'shadow-md border-growth-orange' : 'hover:border-growth-orange cursor-pointer'}`}
                  onClick={() => togglePillarDetails(pillarKey)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3" aria-hidden="true">{icon}</span>
                        <div>
                          <h4 className="font-bold text-gray-800">{pillarNames[pillarKey]}</h4>
                        </div>
                      </div>
                      <span className={`font-bold ${getEvaluationColor(score.evaluation)}`}>
                        {evaluationLabels[score.evaluation]}
                      </span>
                    </div>
                    
                    <Progress 
                      value={getPillarScore(score)} 
                      className="h-2 mb-3" 
                      indicatorClassName={getProgressColor(score.evaluation)} 
                    />
                    
                    {isExpanded && (
                      <div className="mt-4 animate-fade-in">
                        <h5 className="font-bold text-growth-orange mb-2">{feedback.title}</h5>
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
                    
                    <div className="text-sm text-growth-orange mt-2 text-center">
                      {!isExpanded ? 'Clique para ver análise detalhada' : 'Clique para recolher'}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Principais Insights</h3>
              <ul className="list-disc pl-5 space-y-2">
                {results.pillarScores.prospecting?.evaluation === 'low' && (
                  <li>Você está à mercê do acaso. Sem prospecção ativa e estruturada, você depende da sorte para novos clientes.</li>
                )}
                {results.pillarScores['value-proposition']?.evaluation === 'low' && (
                  <li>Seu time está vendendo para quem nunca vai comprar. A falta de foco no cliente ideal está gastando energia com leads sem potencial.</li>
                )}
                {results.pillarScores.conversion?.evaluation === 'low' && (
                  <li>Você está queimando leads valiosos sem saber. Oportunidades estão escorrendo pelo ralo por falta de follow-up adequado.</li>
                )}
                {results.pillarScores.retention?.evaluation === 'low' && (
                  <li>Você pode estar com um balde furado. Entra cliente pela frente e sai pela torneira de trás sem que você perceba.</li>
                )}
                {(results.pillarScores.tools?.evaluation === 'low' || results.pillarScores.tools?.evaluation === 'medium') && (
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
          
          <Separator className="my-6" />
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-bold mb-2">Compartilhar Resultados</h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded mb-3 h-24"
              value={generateSummaryText()}
              readOnly
            ></textarea>
            
            {showEmailInput ? (
              <div className="flex mb-3">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Seu e-mail"
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                <Button 
                  onClick={handleSendByEmail}
                  className="bg-growth-orange hover:bg-orange-700 rounded-l-none"
                >
                  Enviar
                </Button>
              </div>
            ) : null}
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleShareResults}
                className="bg-growth-orange hover:bg-orange-700 text-white font-bold"
                size="sm"
              >
                <Share2 size={16} className="mr-2" /> Copiar Resumo
              </Button>
              
              <Button 
                onClick={handleSendByEmail}
                variant="outline"
                className="border-growth-orange text-growth-orange hover:bg-orange-50 font-bold"
                size="sm"
              >
                <Mail size={16} className="mr-2" /> {showEmailInput ? "Cancelar" : "Enviar por E-mail"}
              </Button>
              
              <Button 
                onClick={handleDownloadPDF}
                variant="outline"
                className="border-growth-orange text-growth-orange hover:bg-orange-50 font-bold"
                size="sm"
              >
                <Download size={16} className="mr-2" /> Baixar PDF
              </Button>
            </div>
          </div>
          
          {relevantResources.length > 0 && (
            <>
              <h3 className="font-bold text-lg mb-4">Materiais Recomendados</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
            </>
          )}
          
          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onReset}
              variant="outline"
              className="border-growth-orange text-growth-orange hover:bg-orange-50 font-bold py-2 px-6 rounded-full"
            >
              <RefreshCw size={16} className="mr-2" /> Refazer Diagnóstico
            </Button>
            
            <Button 
              className="bg-growth-orange hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full"
              onClick={() => toast.success("Solicitação enviada! Um especialista entrará em contato em breve.")}
            >
              Falar com Especialista
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="w-full text-center text-sm text-gray-500 mb-6">
        <p>© {new Date().getFullYear()} Growth Machine. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default DiagnosticResults;
