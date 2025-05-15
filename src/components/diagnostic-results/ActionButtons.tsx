
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ActionButtonsProps {
  onReset: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button 
        onClick={onReset}
        variant="outline"
        className="border-growth-orange text-growth-orange hover:bg-orange-50 font-bold py-2 px-6 rounded-full"
      >
        <RefreshCw size={16} className="mr-2" /> Refazer Diagnóstico
      </Button>
    </div>
  );
};

export default ActionButtons;
