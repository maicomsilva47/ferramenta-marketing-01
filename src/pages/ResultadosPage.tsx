
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  DiagnosticResult, 
  UserInfo,
  UserAnswer 
} from '@/types/diagnostic';
import { toast } from 'sonner';
import ConsultationCTA from '@/components/diagnostic-results/ConsultationCTA';
import DiagnosticResults from '@/components/DiagnosticResults';
import { calculateResults } from '@/utils/diagnosticCalculations';

const ResultadosPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState<DiagnosticResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [resultsId, setResultsId] = useState<string | null>(null);

  useEffect(() => {
    // Get share_id from URL
    const shareId = searchParams.get('id');
    setResultsId(shareId);
    
    if (!shareId) {
      toast.error("Link de resultados inválido");
      navigate('/');
      return;
    }
    
    // Logic to fetch results based on shareId would go here
    // For now, we'll just simulate loading
    setLoading(true);
    
    // Simulate fetching data
    setTimeout(() => {
      try {
        // Here you would fetch the actual data from your backend
        // For now, we'll just set some placeholder data
        setResults({
          pillarScores: {
            'revenue-strategy': {
              pillar: 'revenue-strategy',
              score: 30,
              totalQuestions: 5,
              evaluation: 'medium'
            },
            'value-proposition': {
              pillar: 'value-proposition',
              score: 28,
              totalQuestions: 5,
              evaluation: 'medium'
            },
            'commercial-intelligence': {
              pillar: 'commercial-intelligence',
              score: 35,
              totalQuestions: 5,
              evaluation: 'medium'
            },
            'prospecting': {
              pillar: 'prospecting',
              score: 32,
              totalQuestions: 5,
              evaluation: 'medium'
            },
            'conversion': {
              pillar: 'conversion',
              score: 29,
              totalQuestions: 5,
              evaluation: 'medium'
            },
            'retention': {
              pillar: 'retention',
              score: 31,
              totalQuestions: 5,
              evaluation: 'medium'
            },
            'tools': {
              pillar: 'tools',
              score: 36,
              totalQuestions: 5,
              evaluation: 'high'
            }
          },
          totalScore: 221,
          totalPossibleScore: 350,
          overallEvaluation: 'medium',
          recommendations: [
            "Refinar sua estratégia comercial",
            "Otimizar processos de conversão",
            "Investir em retenção de clientes"
          ],
          userData: {
            name: "Usuário Compartilhado",
            email: "usuario@exemplo.com",
            company: "Empresa Exemplo",
            phone: "11999999999"
          }
        });
        
        setUserData({
          name: "Usuário Compartilhado",
          email: "usuario@exemplo.com",
          company: "Empresa Exemplo",
          phone: "11999999999"
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching results:", error);
        toast.error("Erro ao carregar resultados");
        setLoading(false);
      }
    }, 1000);
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-growth-orange mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Carregando resultados...</h2>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="text-xl font-semibold mb-2">Resultados não encontrados</h2>
          <p>Não foi possível encontrar os resultados solicitados.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 bg-growth-orange hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      {results && (
        <>
          <DiagnosticResults result={results} />
          <ConsultationCTA userData={userData} resultsId={resultsId} />
        </>
      )}
    </div>
  );
};

export default ResultadosPage;
