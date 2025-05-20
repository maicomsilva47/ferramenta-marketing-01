
import React from 'react';
import DiagnosticApp from '@/components/DiagnosticApp';
import { Helmet } from 'react-helmet';

const Index = () => {
  const baseUrl = window.location.origin;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Diagnóstico - Growth Machine</title>
        <meta property="og:title" content="Diagnóstico - Growth Machine" />
        <meta name="twitter:title" content="Diagnóstico - Growth Machine" />
        <meta property="og:image" content={`${baseUrl}/lovable-uploads/186cbcb9-c7a6-4294-90b9-0f7927a6a963.png`} />
        <meta name="twitter:image" content={`${baseUrl}/lovable-uploads/186cbcb9-c7a6-4294-90b9-0f7927a6a963.png`} />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:description" content="Avalie a maturidade de seu negócio com nosso diagnóstico" />
        <meta name="twitter:description" content="Avalie a maturidade de seu negócio com nosso diagnóstico" />
      </Helmet>
      
      <main className="w-full">
        <DiagnosticApp />
      </main>
      
      <footer className="bg-growth-black text-white py-4 sm:py-6">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <img 
            src="/lovable-uploads/186cbcb9-c7a6-4294-90b9-0f7927a6a963.png" 
            alt="Growth Machine" 
            className="h-6 sm:h-8 max-w-[100px] sm:max-w-[120px] mx-auto mb-2 sm:mb-3 object-contain"
            loading="lazy"
          />
          <p className="text-sm sm:text-base">© {new Date().getFullYear()} Growth Machine. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
