
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface DiagnosticIntroProps {
  onStartDiagnostic: () => void;
}

const DiagnosticIntro: React.FC<DiagnosticIntroProps> = ({ onStartDiagnostic }) => {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg border-t-4 border-t-growth-orange">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-extrabold text-center text-growth-black">
          Diagnóstico Comercial Growth Machine
        </CardTitle>
        <CardDescription className="text-center text-lg">
          Avalie a maturidade da sua operação comercial
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center font-medium text-gray-700">
          Olá! Este diagnóstico avaliará a maturidade da sua operação comercial em 7 pilares estratégicos.
        </p>

        <div className="space-y-3 mt-4">
          <p className="text-gray-700">
            Pesquisas mostram que as empresas de alto crescimento seguem um padrão comum: processos comerciais bem estruturados, time dividido em pré-vendas e vendas, máquina de vendas para gerar demanda e alto uso de tecnologia.
          </p>
          
          <p className="text-gray-700">
            Inspirados nisso, dividimos este diagnóstico em 7 pilares estratégicos:
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
              <span><strong>Conversão e Follow-up</strong> – Abordagem para converter leads em clientes e persistência no acompanhamento.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-growth-orange font-bold">6.</span>
              <span><strong>Pós-venda e Retenção</strong> – Estratégias para fidelizar clientes, upsell/cross-sell e evitar churn.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-growth-orange font-bold">7.</span>
              <span><strong>Ferramentas e Stack Comercial</strong> – Tecnologias e ferramentas (CRM, automação, IA) suportando o time de vendas.</span>
            </li>
          </ul>

          <p className="text-gray-700 mt-4">
            Para cada pilar, faremos perguntas diretas e profundas. Responda com a opção que mais se aproxima da sua realidade.
          </p>
          
          <p className="text-gray-700">
            Ao final, você receberá um relatório estratégico com recomendações específicas para melhorar seus processos comerciais.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-2 pb-6">
        <Button
          onClick={onStartDiagnostic}
          className="bg-growth-orange hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full text-lg"
        >
          Iniciar Diagnóstico
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DiagnosticIntro;
