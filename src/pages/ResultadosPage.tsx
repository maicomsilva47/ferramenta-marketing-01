
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import StrategicInsights from '@/components/diagnostic-results/StrategicInsights';

const ResultadosPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const diagnosticoParam = searchParams.get('diagnostico');

  let diagnosticoData: { overall: string; evaluation: string; date: string; insights?: string[] } | null = null;
  let error = false;

  try {
    if (diagnosticoParam) {
      diagnosticoData = JSON.parse(decodeURIComponent(diagnosticoParam));
    } else {
      error = true;
    }
  } catch (e) {
    console.error("Erro ao parsear dados do diagnóstico:", e);
    error = true;
  }

  const getEvaluationLabel = (evaluation: string) => {
    switch (evaluation) {
      case 'high': return 'Avançado';
      case 'medium': return 'Em Desenvolvimento';
      case 'low': return 'Iniciante';
      default: return 'N/A';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };

  const getEvaluationColor = (evaluation: string): string => {
    switch (evaluation) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressColor = (evaluation: string): string => {
    switch (evaluation) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleExternalLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open('https://go.growthmachine.com.br/way/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/3037e665-7de2-4fe8-b9d9-08eea010be72.png" 
              alt="Growth Machine" 
              className="h-10 max-w-[120px] object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </header>

      <main className="flex-grow w-full py-6">
        <div className="container">
          <div className="w-full sm:max-w-3xl mx-auto fade-in">
            <Link to="/" className="inline-flex items-center text-growth-orange hover:text-orange-700 mb-6">
              <ChevronLeft size={16} aria-hidden="true" />
              <span>Voltar</span>
            </Link>

            <Card className="w-full shadow-lg border-t-4 border-t-growth-orange mb-6">
              <CardContent className="p-4 sm:p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Resultado Compartilhado</h1>

                {error || !diagnosticoData ? (
                  <div className="text-center p-4">
                    <h2 className="text-xl font-semibold text-red-600 mb-2">Dados inválidos</h2>
                    <p className="mb-4">O link para os resultados compartilhados é inválido ou expirou.</p>
                    <Link to="/">
                      <Button className="bg-growth-orange hover:bg-orange-700 h-12 w-full sm:w-auto">
                        Fazer um diagnóstico
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center mb-8">
                      <div className="w-32 sm:w-40 h-32 sm:h-40 rounded-full flex items-center justify-center border-8 border-growth-orange mb-4" aria-label={`Pontuação: ${diagnosticoData.overall}%`}>
                        <div className="text-3xl sm:text-4xl font-bold">{diagnosticoData.overall}%</div>
                      </div>
                      <h2 className={`text-xl font-bold ${getEvaluationColor(diagnosticoData.evaluation)}`}>
                        {getEvaluationLabel(diagnosticoData.evaluation)}
                      </h2>
                    </div>

                    <div className="mb-6">
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2" role="progressbar" aria-valuenow={parseInt(diagnosticoData.overall)} aria-valuemin={0} aria-valuemax={100}>
                        <div 
                          className={`${getProgressColor(diagnosticoData.evaluation)} h-3 rounded-full`}
                          style={{ width: `${diagnosticoData.overall}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <p className="text-center text-sm text-gray-600">
                        Diagnóstico realizado em <span className="font-semibold">{formatDate(diagnosticoData.date)}</span>
                      </p>
                    </div>

                    {diagnosticoData.insights && diagnosticoData.insights.length > 0 && (
                      <StrategicInsights insights={diagnosticoData.insights} />
                    )}

                    <div className="mt-8 text-center">
                      <Link to="/">
                        <Button className="bg-growth-orange hover:bg-orange-700 text-white h-12 mb-4 w-full sm:w-auto">
                          Fazer meu diagnóstico
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="text-center">
              <a
                href="https://go.growthmachine.com.br/way/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-growth-orange hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg h-12 w-full sm:w-auto"
                onClick={handleExternalLink}
                aria-label="Falar com um especialista em Growth Machine"
              >
                Falar com Especialista
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-growth-black text-white py-6 mt-auto">
        <div className="container text-center">
          <img 
            src="/lovable-uploads/186cbcb9-c7a6-4294-90b9-0f7927a6a963.png" 
            alt="Growth Machine" 
            className="h-8 max-w-[120px] mx-auto mb-3 object-contain"
            loading="lazy"
          />
          <p>© {new Date().getFullYear()} Growth Machine. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default ResultadosPage;
