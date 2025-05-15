
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Users, ExternalLink } from 'lucide-react';

const ConsultationCTA: React.FC = () => {
  const handleExternalLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open('https://go.growthmachine.com.br/way/', '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="w-full mx-auto my-8 overflow-hidden border-0 shadow-lg">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-growth-orange to-orange-500 text-white p-1">
          <div className="bg-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="bg-growth-orange p-5 rounded-full">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Quer um diagnóstico mais preciso?</h3>
                  <p className="text-gray-700 text-lg mb-6 md:mb-0">
                    Fale com um especialista da Growth Machine e descubra como podemos acelerar sua operação comercial através de um programa de diagnóstico completo e personalizado.
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <Button 
                    onClick={handleExternalLink}
                    className="bg-growth-orange hover:bg-orange-700 transition-all duration-300 py-6 px-8 h-auto text-white text-lg font-medium rounded-lg shadow-lg hover:shadow-xl"
                  >
                    Falar com Especialista
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsultationCTA;
