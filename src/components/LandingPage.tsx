
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const LandingPage: React.FC<{ onStartDiagnostic: () => void }> = ({ 
  onStartDiagnostic 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1c35] to-[#081325] text-white overflow-hidden relative">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTMwIDBhMzAgMzAgMCAxIDAgNjAgMCAzMCAzMCAwIDEgMC02MCAwIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMzAgMzBtLTI1IDBhMjUgMjUgMCAxIDAgNTAgMCAyNSAyNSAwIDEgMC01MCAwIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMzAgMzBtLTIwIDBhMjAgMjAgMCAxIDAgNDAgMCAyMCAyMCAwIDEgMC00MCAwIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-10"></div>

      {/* Animated Shapes */}
      <motion.div 
        className="absolute left-0 top-1/3 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10"
        initial={{ x: -100, opacity: 0.05 }}
        animate={{ x: 0, opacity: 0.1 }}
        transition={{ duration: 1.5 }}
      />
      
      <motion.div 
        className="absolute right-0 bottom-1/4 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl opacity-10"
        initial={{ x: 100, opacity: 0.05 }}
        animate={{ x: 0, opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      <div className="container max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img 
            src="/lovable-uploads/3037e665-7de2-4fe8-b9d9-08eea010be72.png" 
            alt="Growth Machine" 
            className="h-12 max-w-[180px] object-contain"
            loading="lazy"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
          {/* Left Column - Geometric Shape */}
          <div className="hidden lg:flex justify-center items-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg transform rotate-45 opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold text-white opacity-90">7</div>
                <div className="absolute bottom-6 right-6 text-sm text-white opacity-90">PILARES</div>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              DIAGNÓSTICO COMERCIAL
            </h1>
            <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-orange-500">
              Growth Machine
            </h2>
            <p className="text-lg mb-8 text-gray-300 leading-relaxed">
              Avalie a maturidade da sua operação comercial em 7 pilares estratégicos. Descubra os gargalos que impedem sua empresa de crescer mais.
            </p>
            <p className="mb-10 text-gray-400">
              As empresas que mais crescem têm algo em comum: processos comerciais bem estruturados, tecnologia no centro e uma máquina de vendas previsível. 
              Este diagnóstico vai te mostrar onde estão os gargalos e onde você deve focar.
            </p>
            <Button 
              onClick={onStartDiagnostic}
              className="bg-growth-orange hover:bg-orange-700 text-white px-8 py-6 h-auto text-lg font-medium rounded-lg animate-pulse-slow shadow-lg shadow-orange-500/20"
            >
              Fazer diagnóstico gratuito agora
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
