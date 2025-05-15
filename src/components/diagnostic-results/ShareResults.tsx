
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { DiagnosticPillar, PillarScore } from '@/types/diagnostic';

interface ShareResultsProps {
  overallScore: number;
  evaluation: string;
  insights?: string[];
  pillarScores?: Record<DiagnosticPillar, PillarScore>;
  recommendations?: string[];
}

// Generate a unique ID based on timestamp and random string
const generateUniqueId = () => {
  return `diag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Set expiration time for saved diagnostics (48 hours in milliseconds)
const EXPIRATION_TIME = 48 * 60 * 60 * 1000;

const ShareResults: React.FC<ShareResultsProps> = ({ 
  overallScore, 
  evaluation, 
  insights = [], 
  pillarScores = {},
  recommendations = []
}) => {
  const [shareableLink, setShareableLink] = useState<string>('');
  const [shareId, setShareId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Clean up expired diagnostic data from localStorage
  const cleanupExpiredData = () => {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('diagnosticShare_')) {
          const storedData = localStorage.getItem(key);
          if (storedData) {
            try {
              const data = JSON.parse(storedData);
              if (data.expiresAt && Date.now() > data.expiresAt) {
                localStorage.removeItem(key);
              }
            } catch (err) {
              // Invalid JSON, remove the entry
              localStorage.removeItem(key);
            }
          }
        }
      });
    } catch (err) {
      console.error('Error cleaning up expired data:', err);
    }
  };

  const handleShareResults = () => {
    setIsGenerating(true);
    
    try {
      // Clean up expired data first
      cleanupExpiredData();
      
      // Generate unique ID for this diagnostic
      const uniqueId = generateUniqueId();
      setShareId(uniqueId);
      
      // Generate link with ID parameter
      const baseUrl = window.location.origin;
      const generatedLink = `${baseUrl}/resultados?id=${uniqueId}`;
      
      // Create a simplified version of pillar scores to reduce storage size
      const simplifiedPillarScores: Record<string, any> = {};
      
      Object.entries(pillarScores).forEach(([pillar, score]) => {
        simplifiedPillarScores[pillar] = {
          evaluation: score.evaluation,
          score: score.score,
          totalQuestions: score.totalQuestions
        };
      });
      
      // Set expiration date (48 hours from now)
      const expiresAt = Date.now() + EXPIRATION_TIME;
      
      const shareData = {
        overall: overallScore.toFixed(0),
        evaluation: evaluation,
        date: new Date().toISOString().split('T')[0],
        insights: insights.slice(0, 5), // Limit insights to reduce size
        pillarScores: simplifiedPillarScores,
        recommendations: recommendations.slice(0, 5), // Limit to top 5 recommendations
        expiresAt: expiresAt
      };
      
      // Save in localStorage
      localStorage.setItem(`diagnosticShare_${uniqueId}`, JSON.stringify(shareData));
      setShareableLink(generatedLink);
      
      // Copy to clipboard
      navigator.clipboard.writeText(generatedLink)
        .then(() => {
          toast.success("Link do diagnóstico copiado para a área de transferência!");
        })
        .catch(err => {
          console.error('Erro ao copiar: ', err);
          toast.error("Erro ao copiar link. Tente novamente.");
        })
        .finally(() => {
          setIsGenerating(false);
        });
    } catch (error) {
      console.error("Error storing diagnostic data:", error);
      toast.error("Erro ao gerar link. Tente novamente.");
      setIsGenerating(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink)
      .then(() => toast.success("Link copiado!"))
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
          placeholder="Link será gerado ao clicar no botão" 
          className="flex-grow min-w-0"
          aria-label="Link compartilhável"
        />
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button 
            onClick={handleShareResults}
            className="bg-growth-orange hover:bg-orange-700 text-white font-bold h-12 w-full"
            size="sm"
            aria-label="Gerar link para compartilhar"
            disabled={isGenerating}
          >
            <Share2 size={16} className="mr-2" aria-hidden="true" /> 
            {isGenerating ? 'Gerando...' : 'Gerar Link'}
          </Button>
          {shareableLink && (
            <Button
              onClick={handleCopyLink}
              variant="outline"
              size="sm"
              className="border-growth-orange text-growth-orange hover:bg-orange-50 h-12 w-full"
              aria-label="Copiar link"
            >
              <Copy size={16} className="mr-2" aria-hidden="true" /> Copiar
            </Button>
          )}
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-3">
        Nota: Os links compartilhados expiram após 48 horas.
      </p>
    </div>
  );
};

export default ShareResults;
