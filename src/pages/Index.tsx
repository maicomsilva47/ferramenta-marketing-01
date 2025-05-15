
import React from 'react';
import DiagnosticApp from '@/components/DiagnosticApp';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full">
        <DiagnosticApp />
      </main>
      
      <footer className="bg-growth-black text-white py-6">
        <div className="container max-w-6xl mx-auto px-4 text-center">
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

export default Index;
