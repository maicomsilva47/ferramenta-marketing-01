
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface ActionButtonsProps {
  onReset: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onReset }) => {
  return (
    <div className="flex justify-center">
      <Button
        onClick={onReset}
        variant="outline"
        size="lg"
        className="border-growth-orange text-growth-orange hover:bg-orange-50 h-12 px-6"
      >
        <ChevronLeft size={16} className="mr-2" />
        Refazer Diagnóstico
      </Button>
    </div>
  );
};

export default ActionButtons;
