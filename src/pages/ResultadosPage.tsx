
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import DiagnosticResults from '@/components/DiagnosticResults';
import { DiagnosticResult, UserInfo } from '@/types/diagnostic';
import ConsultationCTA from '@/components/diagnostic-results/ConsultationCTA';

const ResultadosPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const shareId = searchParams.get('id');
  
  const [results, setResults] = useState<DiagnosticResult | null>(null);
  const [resultsId, setResultsId] = useState<string | null>(shareId);
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadSharedResults();
  }, [shareId]);
  
  const loadSharedResults = () => {
    try {
      setIsLoading(true);
      
      if (!shareId) {
        toast.error("ID de diagnóstico não encontrado.");
        navigate('/');
        setIsLoading(false);
        return;
      }
      
      console.log(`Tentando carregar resultados com ID: ${shareId}`);
      const storageKey = `diagnosticShare_${shareId}`;
      const storedData = localStorage.getItem(storageKey);
      
      if (storedData) {
        const data = JSON.parse(storedData);
        console.log("Dados de diagnóstico encontrados:", data);
        
        // Verificar se expirou
        if (data.expiresAt && Date.now() > data.expiresAt) {
          localStorage.removeItem(storageKey);
          toast.error("Este link de diagnóstico expirou.");
          navigate('/');
          setIsLoading(false);
          return;
        }
        
        // Calcular pontuação total possível
        let totalPossibleScoreFromData = 0;
        
        if (data.pillarScores) {
          Object.values(data.pillarScores).forEach((pillarScore: any) => {
            if (pillarScore.totalQuestions) {
              totalPossibleScoreFromData += pillarScore.totalQuestions * 4;
            }
          });
        }
        
        if (totalPossibleScoreFromData === 0) {
          totalPossibleScoreFromData = 100;
        }
        
        // Reconstruir objeto de resultados
        const loadedResults: DiagnosticResult = {
          pillarScores: data.pillarScores || {},
          totalScore: data.totalScore !== undefined ? data.totalScore : parseFloat(data.overall || "0"),
          totalPossibleScore: data.totalPossibleScore || totalPossibleScoreFromData,
          overallEvaluation: data.evaluation || 'medium',
          recommendations: data.recommendations || [],
          userData: data.userData || null
        };
        
        console.log('Diagnóstico carregado com sucesso:', { 
          totalScore: loadedResults.totalScore,
          totalPossibleScore: loadedResults.totalPossibleScore,
          shareId
        });
        
        setResults(loadedResults);
        setResultsId(shareId);
        setUserData(loadedResults.userData);
      } else {
        console.error(`Nenhum dado encontrado para o ID: ${shareId}`);
        toast.error("Não foi possível encontrar os resultados compartilhados.");
        navigate('/');
      }
    } catch (error) {
      console.error("Erro ao carregar diagnóstico:", error);
      toast.error("Ocorreu um erro ao carregar o diagnóstico compartilhado.");
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResetDiagnostic = () => {
    navigate('/');
  };
  
  // Indicador de carregamento
  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-growth-orange mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-12">
      {results ? (
        <>
          <DiagnosticResults 
            results={results} 
            onReset={handleResetDiagnostic} 
            resultsId={resultsId} 
          />
          <ConsultationCTA 
            userData={userData}
            resultsId={resultsId}
          />
        </>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">Resultados não encontrados</h2>
          <p className="mb-4">Não foi possível encontrar os resultados deste diagnóstico.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-growth-orange hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Voltar para início
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultadosPage;
