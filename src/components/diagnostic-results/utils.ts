import { DiagnosticPillar, OptionValue, PillarScore } from '@/types/diagnostic';
import { Resource } from './ResourcesList';

export const getEvaluationColor = (evaluation: OptionValue): string => {
  switch (evaluation) {
    case 'high': return 'text-green-600';
    case 'medium': return 'text-amber-600';
    case 'low': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

export const getProgressColor = (evaluation: OptionValue): string => {
  switch (evaluation) {
    case 'high': return 'bg-green-500';
    case 'medium': return 'bg-amber-500';
    case 'low': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

// Consistent function for calculating pillar scores as percentages
export const getPillarScore = (pillar: PillarScore): number => {
  // Using a 1-4 scale with max of 4 points per question
  const maxPossibleScore = pillar.totalQuestions * 4;
  if (maxPossibleScore === 0) return 0;
  return Math.min(100, Math.round((pillar.score / maxPossibleScore) * 100));
};

// Consistent function for calculating total score as percentage
export const getTotalScore = (totalScore: number, totalPossibleScore: number): number => {
  // Prevent division by zero and ensure we return a valid percentage
  if (totalPossibleScore <= 0) return 0;
  return Math.min(100, Math.round((totalScore / totalPossibleScore) * 100));
};

// Updated function to ensure consistent mapping between resource IDs and URLs
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
      // As a fallback, return the main site with the resource ID as a path segment
      return `https://growthmachine.com.br/resources/${resourceId}`;
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

// New utility function for computing evaluation from score percentage
export const getEvaluationFromScore = (scorePercentage: number): OptionValue => {
  if (scorePercentage >= 75) {
    return 'high';
  } else if (scorePercentage <= 45) {
    return 'low';
  } else {
    return 'medium';
  }
};
