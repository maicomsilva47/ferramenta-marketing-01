
import { DiagnosticQuestion, DiagnosticResult, DiagnosticPillar, UserAnswer, PillarScore, OptionValue } from '@/types/diagnostic';

export function calculateResults(answers: UserAnswer[], questions: DiagnosticQuestion[]): DiagnosticResult {
  const pillarScores: Record<DiagnosticPillar, PillarScore> = {} as Record<DiagnosticPillar, PillarScore>;
  let totalScore = 0;
  let totalPossibleScore = 0;

  // Group questions by pillar
  const pillarQuestions: Record<DiagnosticPillar, DiagnosticQuestion[]> = {} as Record<DiagnosticPillar, DiagnosticQuestion[]>;
  
  questions.forEach(question => {
    if (!pillarQuestions[question.pillar]) {
      pillarQuestions[question.pillar] = [];
    }
    pillarQuestions[question.pillar].push(question);
  });

  // Calculate score for each pillar
  Object.entries(pillarQuestions).forEach(([pillar, questions]) => {
    const pillarKey = pillar as DiagnosticPillar;
    let pillarScore = 0;
    let answeredQuestions = 0;

    questions.forEach(question => {
      const answer = answers.find(a => a.questionId === question.id);
      if (answer) {
        const selectedOption = question.options.find(opt => opt.value === answer.selectedOption);
        if (selectedOption) {
          pillarScore += selectedOption.score;
          answeredQuestions++;
        }
      }
    });

    // Calculate possible score (max score per question * number of questions)
    const maxScorePerQuestion = 4; // Using a 1-4 scale
    const possibleScore = questions.length * maxScorePerQuestion;
    totalPossibleScore += possibleScore;
    
    // Calculate actual score
    totalScore += pillarScore;
    
    // Calculate evaluation based on percentage
    const percentageScore = (pillarScore / possibleScore) * 100;
    let evaluation: 'high' | 'medium' | 'low'; 
    
    // Adjust evaluation thresholds to match UI expectations
    if (percentageScore >= 75) {
      evaluation = 'high';
    } else if (percentageScore <= 45) { // Lowered threshold to better match UI representation
      evaluation = 'low';
    } else {
      evaluation = 'medium';
    }

    pillarScores[pillarKey] = {
      pillar: pillarKey,
      score: pillarScore,
      totalQuestions: questions.length,
      evaluation
    };
  });

  // Calculate overall evaluation
  const overallPercentage = totalPossibleScore > 0 ? (totalScore / totalPossibleScore) * 100 : 0;
  let overallEvaluation: 'high' | 'medium' | 'low';
  
  // Adjust overall evaluation thresholds to match UI expectations
  if (overallPercentage >= 75) {
    overallEvaluation = 'high';
  } else if (overallPercentage <= 45) { // Lowered threshold for low evaluation
    overallEvaluation = 'low';
  } else {
    overallEvaluation = 'medium';
  }

  // Generate recommendations based on scores
  const recommendations = generateRecommendations(pillarScores);

  return {
    pillarScores,
    totalScore: overallPercentage, // Store as percentage score for easier display
    totalPossibleScore,
    overallEvaluation,
    recommendations
  };
}

function generateRecommendations(pillarScores: Record<DiagnosticPillar, PillarScore>): string[] {
  const recommendations: string[] = [];

  // Get lowest scoring pillars
  const sortedPillars = Object.entries(pillarScores)
    .sort(([, scoreA], [, scoreB]) => {
      const percentA = scoreA.score / (scoreA.totalQuestions * 4); // Using 4 as max score per question
      const percentB = scoreB.score / (scoreB.totalQuestions * 4);
      return percentA - percentB;
    });

  // Generate recommendations based on low scores
  const lowScorePillars = sortedPillars.filter(([, score]) => score.evaluation === 'low');
  
  if (lowScorePillars.length > 0) {
    lowScorePillars.forEach(([pillar, score]) => {
      switch (pillar as DiagnosticPillar) {
        case 'revenue-strategy':
          recommendations.push("Defina metas claras de receita e crie um plano de crescimento com KPIs específicos para cada etapa do funil de vendas.");
          break;
        case 'value-proposition':
          recommendations.push("Revise sua proposta de valor e identifique claramente seu cliente ideal (ICP), adaptando o discurso comercial para resolver problemas específicos.");
          break;
        case 'commercial-intelligence':
          recommendations.push("Implemente ferramentas e processos para coletar e analisar dados do ciclo de vendas, estabelecendo métricas-chave para tomada de decisão.");
          break;
        case 'prospecting':
          recommendations.push("Estruture um time dedicado à prospecção ativa com processos claros e métricas de desempenho para geração de leads qualificados.");
          break;
        case 'conversion':
          recommendations.push("Desenvolva um processo de vendas estruturado com etapas claras e scripts de abordagem para aumentar taxas de conversão.");
          break;
        case 'retention':
          recommendations.push("Crie um programa formal de sucesso do cliente com processos de onboarding, check-ins regulares e estratégias proativas de retenção.");
          break;
        case 'tools':
          recommendations.push("Implemente um CRM e ferramentas de automação de marketing para aumentar a eficiência e a produtividade do time comercial.");
          break;
      }
    });
  }

  // Add general recommendations if needed
  const mediumScorePillars = sortedPillars.filter(([, score]) => score.evaluation === 'medium');
  
  if (mediumScorePillars.length > 0) {
    mediumScorePillars.slice(0, 2).forEach(([pillar, score]) => {
      switch (pillar as DiagnosticPillar) {
        case 'revenue-strategy':
          recommendations.push("Refine sua estratégia de receita com forecasts mensais e trimestrais baseados em dados históricos e tendências de mercado.");
          break;
        case 'value-proposition':
          recommendations.push("Valide sua proposta de valor com pesquisas de mercado e feedback de clientes para garantir alinhamento com necessidades reais.");
          break;
        case 'commercial-intelligence':
          recommendations.push("Evolua sua inteligência comercial implementando dashboards para análise de pipeline e conversão em tempo real.");
          break;
        case 'prospecting':
          recommendations.push("Otimize seus processos de prospecção com técnicas multi-canal e personalização baseada em segmentos de clientes.");
          break;
        case 'conversion':
          recommendations.push("Aumente suas taxas de conversão com treinamentos regulares para a equipe e metodologias de venda consultiva.");
          break;
        case 'retention':
          recommendations.push("Desenvolva estratégias proativas de expansão de contas e identificação precoce de riscos de churn.");
          break;
        case 'tools':
          recommendations.push("Conecte suas ferramentas comerciais criando um ecossistema integrado com automações e insights para a equipe.");
          break;
      }
    });
  }

  // Add general recommendation if we don't have enough
  if (recommendations.length < 3) {
    recommendations.push("Invista em capacitação contínua da equipe comercial com treinamentos específicos para cada função e etapa do processo de vendas.");
    recommendations.push("Estabeleça uma cultura de feedback e melhoria contínua com revisões regulares de desempenho e ajustes em processos comerciais.");
  }

  return recommendations;
}
