
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resultsId = searchParams.get('results_id');
  
  const handleBackToResults = () => {
    if (resultsId) {
      navigate(`/?share_id=${resultsId}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <Card className="w-full shadow-lg overflow-hidden border-0">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3"></div>
        <CardContent className="p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              Obrigado por se inscrever! 🚀
            </h1>
            
            <div className="space-y-4 text-gray-600 max-w-2xl mx-auto mb-8">
              <p className="text-lg">
                Agora que temos suas informações, nosso time de especialistas vai analisá-las com carinho.
              </p>
              
              <p className="text-lg">
                Se o seu perfil for compatível com o que buscamos neste momento, um dos nossos consultores entrará em contato em breve para conversar mais sobre como podemos te ajudar a alcançar seus objetivos.
              </p>
              
              <p className="text-lg">
                Enquanto isso, fique de olho no seu e-mail — sempre tem novidade boa chegando por lá. 😉
              </p>
              
              <p className="text-lg font-medium">
                Nos vemos em breve!
              </p>
            </div>
            
            <Button 
              onClick={handleBackToResults} 
              variant="outline"
              className="mt-6 px-6 py-2 text-lg h-auto"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar para o resultado do diagnóstico
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYouPage;
