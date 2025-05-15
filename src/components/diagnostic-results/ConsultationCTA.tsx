
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const ConsultationCTA: React.FC = () => {
  const handleExternalLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open('https://go.growthmachine.com.br/way/', '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="w-full mx-auto my-8 bg-gradient-to-r from-orange-50 to-orange-100 shadow-lg border-none overflow-hidden">
      <CardContent className="p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="bg-growth-orange p-4 rounded-full mb-4 md:mb-0">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">📞 Quer um diagnóstico mais preciso?</h3>
              <p className="text-gray-600">
                Fale com um especialista da Growth Machine e descubra como podemos acelerar sua operação comercial.
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleExternalLink}
            className="bg-growth-orange hover:bg-orange-700 transition-all duration-300 py-6 px-8 h-auto text-white font-medium rounded-lg shadow-md shadow-orange-500/20"
          >
            Falar com um Especialista
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ConsultationCTA;
