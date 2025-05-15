
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const LandingPage: React.FC<{ onStartDiagnostic: () => void }> = ({ 
  onStartDiagnostic 
}) => {
  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col justify-center items-center bg-white overflow-hidden relative">
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

      <div className="max-w-6xl mx-auto px-4 py-10 relative z-10 w-full">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <img 
            src="/lovable-uploads/3037e665-7de2-4fe8-b9d9-08eea010be72.png" 
            alt="Growth Machine" 
            className="h-16 max-w-[220px] object-contain"
            loading="lazy"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
          {/* Left Column - Geometric Shape */}
          <div className="hidden lg:flex justify-center items-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="w-80 h-80 bg-gradient-to-br from-growth-orange to-orange-400 rounded-lg shadow-xl transform -rotate-6 p-8 flex flex-col justify-between">
                <div className="text-white text-6xl font-bold">7</div>
                <div className="text-white font-bold text-3xl self-end">PILARES</div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-10 w-80 h-80 rounded-lg transform rotate-6 -z-1"></div>
            </motion.div>
          </div>
          
          {/* Right Column - Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              DIAGNÓSTICO <span className="text-growth-orange">COMERCIAL</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-growth-orange">
              Growth Machine
            </h2>
            <p className="text-lg mb-8 text-gray-700 leading-relaxed">
              Avalie a maturidade da sua operação comercial em 7 pilares estratégicos. Descubra os gargalos que impedem sua empresa de crescer mais.
            </p>
            
            <div className="space-y-4 mb-8 text-gray-700">
              <p>
                As empresas que mais crescem têm algo em comum: processos comerciais bem estruturados, time dividido em pré-vendas e vendas, máquina de vendas para gerar demanda e alto uso de tecnologia.
              </p>
              
              <p>
                Inspirados nisso, dividimos este diagnóstico em 7 pilares estratégicos que vão avaliar a maturidade do seu negócio:
              </p>
              
              <ul className="list-none space-y-2 mt-3">
                <li className="flex items-start">
                  <span className="mr-2 text-growth-orange font-bold">1.</span>
                  <span><strong>Estratégia de Receita</strong> – Planejamento e previsibilidade do crescimento.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-growth-orange font-bold">2.</span>
                  <span><strong>Aderência da Proposta de Valor</strong> – Clareza do ICP (cliente ideal) e do problema que você resolve.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-growth-orange font-bold">3.</span>
                  <span><strong>Inteligência Comercial</strong> – Uso de dados, métricas e insights para guiar decisões.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-growth-orange font-bold">4.</span>
                  <span><strong>Operação de Prospecção</strong> – Processos e pessoas dedicados à geração de novas oportunidades.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-growth-orange font-bold">5.</span>
                  <span><strong>Conversão e Follow-up</strong> – Abordagem para converter leads em clientes.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-growth-orange font-bold">6.</span>
                  <span><strong>Pós-venda e Retenção</strong> – Estratégias para fidelizar clientes e evitar churn.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-growth-orange font-bold">7.</span>
                  <span><strong>Ferramentas e Stack Comercial</strong> – Tecnologias suportando o time de vendas.</span>
                </li>
              </ul>
            </div>
            
            <Button 
              onClick={onStartDiagnostic}
              className="bg-growth-orange hover:bg-orange-700 text-white px-8 py-6 h-auto text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Iniciar diagnóstico gratuito
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
