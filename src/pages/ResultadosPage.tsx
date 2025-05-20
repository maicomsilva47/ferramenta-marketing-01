import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { toast } from 'sonner';
import { 
  DiagnosticResult, 
  UserInfo,
  UserAnswer 
} from '@/types/diagnostic';
import { calculateResults } from '@/utils/calculateResults';
import DiagnosticForm from '@/components/DiagnosticForm';
import DiagnosticResults from '@/components/DiagnosticResults';
import ConsultationCTA from '@/components/diagnostic-results/ConsultationCTA';

const ResultadosPage: React.FC = () => {
  const [results, setResults] = useState<DiagnosticResult | null>(null);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [loading, setLoading] = useState(false);
  const
