
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Headphones, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface PodcastEpisode {
  id: string;
  title: string;
  spotifyEmbedId: string;
  imageUrl: string;
}

const episodes: PodcastEpisode[] = [
  {
    id: '1',
    title: 'Como criar uma máquina de vendas consistente',
    spotifyEmbedId: '7lKcTLsJg6BOXta99u1FzW',
    imageUrl: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Estratégias de vendas B2B que funcionam',
    spotifyEmbedId: '7lKcTLsJg6BOXta99u1FzW',
    imageUrl: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Growth Hacking para startups',
    spotifyEmbedId: '7lKcTLsJg6BOXta99u1FzW',
    imageUrl: '/placeholder.svg'
  }
];

const GrowthcastSection: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode>(episodes[0]);

  return (
    <div className="my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-growth-orange p-2 rounded-full">
          <Headphones className="text-white h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold">🎧 Growthcast</h3>
      </div>
      
      <Card className="shadow-md border-0 overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Left side - Episode selection */}
            <div className="bg-gray-50 p-4 md:p-6 border-r border-gray-100">
              <div className="mb-4 flex justify-center md:justify-start">
                <img 
                  src="/placeholder.svg" 
                  alt="Growthcast Logo" 
                  className="h-12 object-contain"
                />
              </div>
              <p className="text-gray-700 text-sm mb-4 text-center md:text-left">
                Insights semanais sobre vendas, marketing e growth diretamente com especialistas de mercado.
              </p>
              
              <div className="space-y-3">
                {episodes.map((episode) => (
                  <motion.div
                    key={episode.id}
                    className={`p-3 rounded-md cursor-pointer transition-all ${
                      selectedEpisode.id === episode.id 
                        ? 'bg-orange-100 border-l-4 border-growth-orange' 
                        : 'bg-white hover:bg-gray-100 border-l-4 border-transparent'
                    }`}
                    onClick={() => setSelectedEpisode(episode)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{episode.title}</h4>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Right side - Player */}
            <div className="col-span-1 md:col-span-2 p-4 md:p-6">
              <h4 className="font-bold mb-4">{selectedEpisode.title}</h4>
              <div className="bg-gray-100 p-2 rounded-lg">
                <AspectRatio ratio={16/9} className="md:h-auto">
                  <iframe 
                    src={`https://open.spotify.com/embed/show/${selectedEpisode.spotifyEmbedId}`}
                    width="100%" 
                    height="152" 
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    title="Growthcast Spotify Embed"
                    className="rounded"
                  ></iframe>
                </AspectRatio>
              </div>
              
              <div className="mt-4 flex justify-end">
                <a 
                  href="https://open.spotify.com/show/7lKcTLsJg6BOXta99u1FzW" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-growth-orange hover:text-orange-700 flex items-center text-sm font-medium"
                >
                  Ver todos os episódios
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthcastSection;
