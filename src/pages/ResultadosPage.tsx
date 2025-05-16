
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { DiagnosticResult } from '@/types/diagnostic';
import DiagnosticResults from '@/components/DiagnosticResults';
import ConsultationCTA from '@/components/diagnostic-results/ConsultationCTA';
import { UserFormData } from '@/utils/hubspotIntegration';

const ResultadosPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [results, setResults] = useState<DiagnosticResult | null>(null);
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!id) {
      setError("ID do diagnóstico não fornecido");
      setIsLoading(false);
      return;
    }
    
    try {
      const storageKey = `diagnosticShare_${id}`;
      const storedData = localStorage.getItem(storageKey);
      
      if (storedData) {
        const data = JSON.parse(storedData);
        
        // Check if data has expired
        if (data.expiresAt && Date.now() > data.expiresAt) {
          localStorage.removeItem(storageKey);
          setError("Este link de diagnóstico expirou.");
          setIsLoading(false);
          return;
        }
        
        // Reconstruct the results object from stored data
        const loadedResults: DiagnosticResult = {
          pillarScores: data.pillarScores || {},
          totalScore: parseFloat(data.overall) || 0,
          totalPossibleScore: 100,
          overallEvaluation: data.evaluation || 'medium',
          recommendations: data.recommendations || []
        };
        
        // Load user data if available
        if (data.userData) {
          setUserData(data.userData);
        }
        
        setResults(loadedResults);
        setIsLoading(false);
      } else {
        setError("Não foi possível encontrar os resultados compartilhados.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error loading shared diagnostic:", error);
      setError("Ocorreu um erro ao carregar o diagnóstico compartilhado.");
      setIsLoading(false);
    }
  }, [id]);
  
  const handleReset = () => {
    navigate('/');
  };
  
  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-growth-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando resultados do diagnóstico...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
            <p>{error}</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-growth-orange hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }
  
  if (!results) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-amber-100 text-amber-800 p-4 rounded-lg mb-4">
            <p>Resultados não encontrados</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-growth-orange hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-12">
      <DiagnosticResults 
        results={results} 
        onReset={handleReset} 
        resultsId={id}
        userData={userData}
      />
      
      <ConsultationCTA 
        userData={userData}
        resultsId={id}
      />
    </div>
  );
};

export default ResultadosPage;
