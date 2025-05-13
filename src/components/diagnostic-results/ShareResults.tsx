
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface ShareResultsProps {
  overallScore: number;
  evaluation: string;
}

const ShareResults: React.FC<ShareResultsProps> = ({ overallScore, evaluation }) => {
  const [shareableLink, setShareableLink] = useState<string>('');

  const handleShareResults = () => {
    // Generate link for the /resultados page
    const baseUrl = window.location.origin;
    const generatedLink = `${baseUrl}/resultados?diagnostico=${encodeURIComponent(JSON.stringify({
      overall: overallScore.toFixed(0),
      evaluation: evaluation,
      date: new Date().toISOString().split('T')[0]
    }))}`;
    
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
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink)
      .then(() => toast.success("Link copiado!"))
      .catch(() => toast.error("Erro ao copiar link"));
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-6">
      <h3 className="font-bold mb-2">Compartilhar Resultados</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input 
          value={shareableLink} 
          readOnly 
          placeholder="Link será gerado ao clicar no botão" 
          className="flex-grow"
        />
        <div className="flex gap-2">
          <Button 
            onClick={handleShareResults}
            className="bg-growth-orange hover:bg-orange-700 text-white font-bold h-12"
            size="sm"
          >
            <Share2 size={16} className="mr-1" /> Gerar Link
          </Button>
          {shareableLink && (
            <Button
              onClick={handleCopyLink}
              variant="outline"
              size="sm"
              className="border-growth-orange text-growth-orange hover:bg-orange-50 h-12"
            >
              <Copy size={16} className="mr-1" /> Copiar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareResults;
