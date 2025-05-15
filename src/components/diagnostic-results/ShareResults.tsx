
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { DiagnosticPillar, PillarScore } from '@/types/diagnostic';

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
  pillarScores = {},
  recommendations = [],
  resultsId
}) => {
  const [shareableLink, setShareableLink] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  // Generate the shareable link automatically when component mounts or resultsId changes
  useEffect(() => {
    if (resultsId) {
      const baseUrl = window.location.origin;
      const generatedLink = `${baseUrl}/?share_id=${resultsId}`;
      setShareableLink(generatedLink);
    }
  }, [resultsId]);

  const handleCopyLink = () => {
    if (!shareableLink) {
      toast.error("Nenhum link disponível para copiar");
      return;
    }

    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        toast.success("Link copiado!");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch(() => toast.error("Erro ao copiar link"));
  };

  return (
    <div className="bg-orange-50 p-6 rounded-lg shadow-sm border border-orange-100 mb-6" role="region" aria-labelledby="share-title">
      <h3 className="font-bold text-xl mb-3" id="share-title">Compartilhar Resultados</h3>
      <p className="text-gray-600 mb-4">Compartilhe este diagnóstico com sua equipe ou consultores para discutir as próximas ações.</p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Input 
          value={shareableLink} 
          readOnly 
          placeholder={resultsId ? "Gerando link..." : "Link indisponível"}
          className="flex-grow min-w-0"
          aria-label="Link compartilhável"
        />
        <Button 
          onClick={handleCopyLink}
          className={`${isCopied ? 'bg-green-600' : 'bg-growth-orange'} hover:${isCopied ? 'bg-green-700' : 'bg-orange-700'} text-white font-bold h-12 w-full sm:w-auto transition-colors`}
          size="sm"
          aria-label="Copiar link para compartilhar"
          disabled={!shareableLink}
        >
          {isCopied ? (
            <>
              <CheckCircle size={16} className="mr-2" aria-hidden="true" /> 
              Copiado!
            </>
          ) : (
            <>
              <Copy size={16} className="mr-2" aria-hidden="true" /> 
              Copiar Link
            </>
          )}
        </Button>
      </div>
      
      <p className="text-xs text-gray-500 mt-3">
        Nota: Os links compartilhados expiram após 48 horas.
      </p>
    </div>
  );
};

export default ShareResults;
