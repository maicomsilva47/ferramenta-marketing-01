
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ActionButtonsProps {
  onReset: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onReset }) => {
  return (
    <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
      <Button 
        onClick={onReset}
        variant="outline"
        className="border-growth-orange text-growth-orange hover:bg-orange-50 font-bold py-2 px-6 rounded-full"
      >
        <RefreshCw size={16} className="mr-2" /> Refazer Diagnóstico
      </Button>
      
      <a 
        href="https://go.growthmachine.com.br/way/" 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={(e) => {
          // Impedir comportamento padrão e abrir em nova aba para garantir
          e.preventDefault();
          window.open("https://go.growthmachine.com.br/way/", '_blank', 'noopener,noreferrer');
        }}
      >
        <Button 
          className="bg-growth-orange hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full"
        >
          Falar com Especialista
        </Button>
      </a>
    </div>
  );
};

export default ActionButtons;
