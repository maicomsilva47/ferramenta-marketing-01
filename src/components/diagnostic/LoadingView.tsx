
import React from 'react';

const LoadingView: React.FC = () => {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-12 flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-growth-orange mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Carregando...</p>
      </div>
    </div>
  );
};

export default LoadingView;
