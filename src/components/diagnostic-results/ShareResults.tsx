
import React from 'react';
import { Button } from '@/components/ui/button';
import { DiagnosticPillar, PillarScore } from '@/types/diagnostic';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ShareResultsProps {
  overallScore: number;
  evaluation: string;
  insights?: string[];
  pillarScores?: Record<DiagnosticPillar, PillarScore>;
  recommendations?: string[];
  resultsId: string | null;
}

const ShareResults: React.FC<ShareResultsProps> = ({ 
  overallScore, 
  evaluation, 
  insights = [], 
  recommendations = [],
}) => {
  const baseUrl = window.location.origin;

  return (
    <>
      {/* SEO and Sharing Metadata - This ensures proper metadata for shared links */}
      <Helmet>
        <meta property="og:title" content="Diagnóstico - Growth Machine" />
        <meta property="og:description" content={`Resultado do diagnóstico: ${evaluation}. Pontuação: ${overallScore}%`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${baseUrl}/lovable-uploads/186cbcb9-c7a6-4294-90b9-0f7927a6a963.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Diagnóstico - Growth Machine" />
        <meta name="twitter:description" content={`Resultado do diagnóstico: ${evaluation}. Pontuação: ${overallScore}%`} />
        <meta name="twitter:image" content={`${baseUrl}/lovable-uploads/186cbcb9-c7a6-4294-90b9-0f7927a6a963.png`} />
      </Helmet>

      <div className="bg-orange-50 p-6 rounded-lg shadow-sm border border-orange-100 mb-6" role="region" aria-labelledby="next-steps">
        <h3 className="font-bold text-xl mb-3" id="next-steps">Próximos Passos</h3>
        <p className="text-gray-600 mb-4">Com base no seu diagnóstico, recomendamos que você agende uma consulta com um de nossos especialistas para discutir como melhorar sua operação comercial.</p>
        
        <Link to="/obrigado" className="inline-block w-full sm:w-auto">
          <Button 
            className="bg-growth-orange hover:bg-orange-700 text-white font-bold h-12 w-full sm:w-auto transition-colors flex items-center justify-center"
          >
            Falar com Especialista <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
        
        <p className="text-xs text-gray-500 mt-3">
          Nossos especialistas estão disponíveis para ajudar a implementar as recomendações do seu diagnóstico.
        </p>
      </div>
    </>
  );
};

export default ShareResults;
