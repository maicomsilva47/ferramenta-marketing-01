
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

const ShareResults: React.FC<ShareResultsProps> = ({ 
  overallScore, 
  evaluation, 
  insights = [], 
  pillarScores = {},
  recommendations = []
}) => {
  const [shareableLink, setShareableLink] = useState<string>('');
  const [shareId, setShareId] = useState<string>('');

  const handleShareResults = () => {
    // Generate unique ID for this diagnostic
    const uniqueId = generateUniqueId();
    setShareId(uniqueId);
    
    // Generate link with ID parameter
    const baseUrl = window.location.origin;
    const generatedLink = `${baseUrl}/resultados?id=${uniqueId}`;
    
    // In a real implementation, we would store the data in a database
    // using the uniqueId as the key
    
    // Create a simplified version of pillar scores to reduce URL size
    const shareData = {
      overall: overallScore.toFixed(0),
      evaluation: evaluation,
      date: new Date().toISOString().split('T')[0],
      insights: insights,
      pillarScores: pillarScores,
      recommendations: recommendations.slice(0, 5) // Limit to top 5 recommendations
    };
    
    // For now, we'll simulate storing in localStorage (in a real app this would go to a backend)
    try {
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
        });
    } catch (error) {
      console.error("Error storing diagnostic data:", error);
      toast.error("Erro ao gerar link. Tente novamente.");
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
          >
            <Share2 size={16} className="mr-2" aria-hidden="true" /> Gerar Link
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
    </div>
  );
};

export default ShareResults;
