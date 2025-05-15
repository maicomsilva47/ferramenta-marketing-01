
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const LandingPage: React.FC<{ onStartDiagnostic: () => void }> = ({ 
  onStartDiagnostic 
}) => {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMCAwaDJsMzggMzhWMHpNNDAgMHYyTDIgNDBINDB6IiBzdHJva2U9IiNmMGYwZjAiIHN0cm9rZS13aWR0aD0iMS41Ii8+PC9nPjwvc3ZnPg==')] bg-white opacity-50"></div>

      {/* Animated Shapes */}
      <motion.div 
        className="absolute left-10 top-1/4 w-64 h-64 rounded-full filter blur-3xl opacity-5"
        style={{ background: 'linear-gradient(45deg, #FF6600, #FFA366)' }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 0.05 }}
        transition={{ duration: 1.5 }}
      />
      
      <motion.div 
        className="absolute right-10 bottom-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-5"
        style={{ background: 'linear-gradient(45deg, #FF6600, #FFA366)' }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 0.05 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      <div className="container max-w-6xl mx-auto px-4 py-20 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-16">
          <img 
            src="/lovable-uploads/3037e665-7de2-4fe8-b9d9-08eea010be72.png" 
            alt="Growth Machine" 
            className="h-12 max-w-[180px] object-contain"
            loading="lazy"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          {/* Left Column - Geometric Shape */}
          <div className="hidden lg:flex justify-center items-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="w-64 h-64 bg-gradient-to-br from-growth-orange to-orange-400 rounded-lg shadow-xl transform -rotate-6 p-6 flex flex-col justify-between">
                <div className="text-white text-4xl font-bold">7</div>
                <div className="text-white font-bold text-xl self-end">PILARES</div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-10 w-64 h-64 rounded-lg transform rotate-6 -z-1"></div>
            </motion.div>
          </div>
          
          {/* Right Column - Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900">
              DIAGNÓSTICO <span className="text-growth-orange">COMERCIAL</span>
            </h1>
            <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-growth-orange">
              Growth Machine
            </h2>
            <p className="text-lg mb-8 text-gray-700 leading-relaxed">
              Avalie a maturidade da sua operação comercial em 7 pilares estratégicos. Descubra os gargalos que impedem sua empresa de crescer mais.
            </p>
            <p className="mb-10 text-gray-600">
              As empresas que mais crescem têm algo em comum: processos comerciais bem estruturados, tecnologia no centro e uma máquina de vendas previsível. 
              Este diagnóstico vai te mostrar onde estão os gargalos e onde você deve focar.
            </p>
            <Button 
              onClick={onStartDiagnostic}
              className="bg-growth-orange hover:bg-orange-700 text-white px-8 py-6 h-auto text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Fazer diagnóstico gratuito
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
