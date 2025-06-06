
export type OptionValue = 1 | 2 | 3 | 4 | 'high' | 'medium' | 'low';

// Add a separate type for evaluation results
export type EvaluationType = 'high' | 'medium' | 'low';

export interface DiagnosticOption {
  label: string;
  value: OptionValue;
  feedback: string;
  score: number;
}

export interface DiagnosticQuestion {
  id: string;
  text: string;
  options: DiagnosticOption[];
  pillar: DiagnosticPillar;
}

export type DiagnosticPillar = 
  | 'revenue-strategy'
  | 'value-proposition'
  | 'commercial-intelligence'
  | 'prospecting'
  | 'conversion'
  | 'retention'
  | 'tools'
  | string;

export interface PillarScore {
  pillar: DiagnosticPillar;
  score: number;
  totalQuestions: number;
  evaluation: EvaluationType;
}

export interface DiagnosticResult {
  pillarScores: Record<DiagnosticPillar, PillarScore>;
  totalScore: number;
  totalPossibleScore: number;
  overallEvaluation: EvaluationType;
  recommendations: string[];
  userData?: UserInfo | null;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: OptionValue;
}

export interface PillarFeedback {
  title: string;
  paragraphs: string[];
  actions?: string[];
}

export interface PillarFeedbacks {
  [key: string]: {
    high: PillarFeedback;
    medium: PillarFeedback;
    low: PillarFeedback;
  };
}

export interface UserInfo {
  name: string;
  email: string;
  company: string;
  phone: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}
