
import React from 'react';
import DiagnosticApp from '@/components/DiagnosticApp';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto py-4 px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-growth-orange">Growth Machine</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <DiagnosticApp />
      </main>
      
      <footer className="bg-growth-black text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Growth Machine. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
