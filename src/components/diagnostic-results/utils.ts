
import { DiagnosticPillar, OptionValue, PillarScore } from '@/types/diagnostic';
import { Resource } from './ResourcesList';

export const getEvaluationColor = (evaluation: OptionValue): string => {
  switch (evaluation) {
    case 'high': return 'text-green-600';
    case 'medium': return 'text-yellow-600';
    case 'low': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

export const getProgressColor = (evaluation: OptionValue): string => {
  switch (evaluation) {
    case 'high': return 'bg-green-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export const getPillarScore = (pillar: PillarScore): number => {
  return (pillar.score / (pillar.totalQuestions * 3)) * 100;
};

export const getTotalScore = (totalScore: number, totalPossibleScore: number): number => {
  return (totalScore / totalPossibleScore) * 100;
};

// Função para retornar diretamente as URLs externas fixas
export const getResourceUrl = (resourceId: string): string => {
  switch(resourceId) {
    case "sales-model-canvas":
      return "https://blog.growthmachine.com.br/o-que-e-sales-model-canvas";
    case "social-selling-bible":
      return "https://lp.growthmachine.com.br/biblia-do-social-selling";
    case "prospecting-guide":
      return "https://lp.growthmachine.com.br/guia-da-prospeccao";
    case "kanban-prospect":
      return "https://blog.growthmachine.com.br/o-que-e-kanban-prospect/";
    case "cold-mail-template":
      return "https://lp.growthmachine.com.br/templates-de-cold-mail";
    default:
      return "#";
  }
};

// Função para gerar insights estratégicos baseados nos resultados
export const generateStrategicInsights = (pillarScores: Record<DiagnosticPillar, PillarScore>, totalScore: number): string[] => {
  const insights: string[] = [];
  
  // Verifica os pilares problemáticos (low e medium) e gera insights específicos
  if (pillarScores.prospecting?.evaluation === 'low') {
    insights.push("Sua empresa está à mercê do acaso. Sem um processo estruturado de prospecção, você depende da sorte para conquistar novos clientes.");
  }
  
  if (pillarScores['value-proposition']?.evaluation === 'low' || pillarScores['value-proposition']?.evaluation === 'medium') {
    insights.push("Seu time comercial está desperdiçando tempo e recursos vendendo para quem nunca vai comprar. A falta de clareza na proposta de valor está minando sua taxa de conversão.");
  }
  
  if (pillarScores.conversion?.evaluation === 'low') {
    insights.push("Você está queimando leads valiosos sem perceber. Oportunidades estão escorrendo pelos dedos por falta de processo de vendas estruturado e follow-up adequado.");
  }
  
  if (pillarScores.retention?.evaluation === 'low') {
    insights.push("Sua empresa tem um 'balde furado': entra cliente pela frente e sai pela torneira de trás sem que você perceba o impacto no crescimento sustentável.");
  }
  
  if (pillarScores['commercial-intelligence']?.evaluation === 'low' || pillarScores['commercial-intelligence']?.evaluation === 'medium') {
    insights.push("Enquanto seus concorrentes usam dados para tomar decisões, você ainda opera no feeling. A falta de inteligência comercial está impedindo seu crescimento escalável.");
  }
  
  if (pillarScores.tools?.evaluation === 'low' || pillarScores.tools?.evaluation === 'medium') {
    insights.push("Seus competidores estão usando ferramentas e IA que multiplicam a produtividade comercial enquanto você perde tempo com processos manuais e ineficientes.");
  }
  
  if (pillarScores['revenue-strategy']?.evaluation === 'low' || pillarScores['revenue-strategy']?.evaluation === 'medium') {
    insights.push("Sua estratégia de receita está vulnerável a oscilações do mercado. A ausência de previsibilidade comercial coloca em risco o fluxo de caixa e o crescimento do negócio.");
  }

  // Se houver poucos insights, adiciona alguns genéricos
  if (insights.length < 3) {
    if (getTotalScore(totalScore, 100) < 60) {
      insights.push("Sua operação comercial precisa de uma reestruturação profunda para alcançar resultados consistentes e escaláveis.");
    }
    insights.push("A falta de processos claros está limitando seu crescimento. Estruturar a operação comercial é essencial para escalar seu negócio.");
  }
  
  // Limita a 5 insights no máximo
  return insights.slice(0, 5);
};
