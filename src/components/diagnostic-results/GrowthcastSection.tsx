
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Headphones } from 'lucide-react';

const GrowthcastSection: React.FC = () => {
  return (
    <Card className="w-full mx-auto my-8 shadow-md border-l-4 border-l-growth-orange bg-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-growth-orange p-3 rounded-full">
            <Headphones className="text-white h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">🎧 Acompanhe o Growthcast!</h3>
        </div>
        
        <p className="text-gray-700 mb-4">
          Insights semanais sobre vendas, marketing e growth diretamente com especialistas de mercado.
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md">
          <iframe 
            src="https://open.spotify.com/embed/show/7lKcTLsJg6BOXta99u1FzW" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title="Growthcast Spotify Embed"
            className="rounded"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthcastSection;
