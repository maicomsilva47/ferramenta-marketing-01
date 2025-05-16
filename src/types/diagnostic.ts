
export type OptionValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'high' | 'medium' | 'low' | number;

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
  | string; // Add string as a fallback to accept any string value

export interface PillarScore {
  pillar: DiagnosticPillar;
  score: number;
  totalQuestions: number;
  evaluation: 'high' | 'medium' | 'low';
}

export interface DiagnosticResult {
  pillarScores: Record<DiagnosticPillar, PillarScore>;
  totalScore: number;
  totalPossibleScore: number;
  overallEvaluation: 'high' | 'medium' | 'low';
  recommendations: string[];
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
