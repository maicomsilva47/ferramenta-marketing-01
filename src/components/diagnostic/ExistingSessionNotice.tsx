
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useDiagnostic } from '@/contexts/DiagnosticContext';

const ExistingSessionNotice: React.FC = () => {
  const { continueSavedSession, startNewSession, isProcessingAnswer } = useDiagnostic();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8 p-6 bg-orange-50 border border-growth-orange rounded-lg"
    >
      <h2 className="text-xl font-semibold mb-2">Você tem um diagnóstico em andamento</h2>
      <p className="mb-4 text-gray-700">Você já começou um diagnóstico anteriormente. Gostaria de continuar de onde parou ou iniciar um novo?</p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={continueSavedSession}
          className="bg-growth-orange hover:bg-orange-600"
          disabled={isProcessingAnswer}
        >
          Continuar diagnóstico
        </Button>
        <Button 
          onClick={startNewSession}
          variant="outline"
          className="border-growth-orange text-growth-orange hover:bg-orange-50"
          disabled={isProcessingAnswer}
        >
          Iniciar novo diagnóstico
        </Button>
      </div>
    </motion.div>
  );
};

export default ExistingSessionNotice;
