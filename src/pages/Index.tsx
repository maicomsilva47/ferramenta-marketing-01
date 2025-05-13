
import React from 'react';
import DiagnosticApp from '@/components/DiagnosticApp';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto py-4 px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/3037e665-7de2-4fe8-b9d9-08eea010be72.png" 
              alt="Growth Machine" 
              className="h-10" 
            />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <DiagnosticApp />
      </main>
      
      <footer className="bg-growth-black text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <img 
            src="/lovable-uploads/186cbcb9-c7a6-4294-90b9-0f7927a6a963.png" 
            alt="Growth Machine" 
            className="h-8 mx-auto mb-3" 
          />
          <p>© {new Date().getFullYear()} Growth Machine. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
