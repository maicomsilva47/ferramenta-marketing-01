
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
    imageUrl: '/lovable-uploads/3037e665-7de2-4fe8-b9d9-08eea010be72.png'
  },
  {
    id: '2',
    title: 'Estratégias de vendas B2B que funcionam',
    spotifyEmbedId: '1hkbuMtx6ROfAp6CduoVRK',
    imageUrl: '/lovable-uploads/3037e665-7de2-4fe8-b9d9-08eea010be72.png'
  },
  {
    id: '3',
    title: 'Growth Hacking para startups',
    spotifyEmbedId: '4aDIUmYN24AQEB93kTMdHu',
    imageUrl: '/lovable-uploads/3037e665-7de2-4fe8-b9d9-08eea010be72.png'
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
        <h3 className="text-2xl font-bold">🎧 Growthcast</h3>
      </div>
      
      <Card className="shadow-lg border-0 overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Left side - Episode selection */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 border-r border-gray-100">
              <div className="mb-6 flex justify-center md:justify-start">
                <img 
                  src="/lovable-uploads/3037e665-7de2-4fe8-b9d9-08eea010be72.png" 
                  alt="Growthcast Logo" 
                  className="h-16 object-contain"
                />
              </div>
              <p className="text-gray-700 text-sm mb-6 text-center md:text-left">
                Insights semanais sobre vendas, marketing e growth diretamente com especialistas de mercado.
              </p>
              
              <div className="space-y-3">
                {episodes.map((episode) => (
                  <motion.div
                    key={episode.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedEpisode.id === episode.id 
                        ? 'bg-white shadow-md border-l-4 border-growth-orange' 
                        : 'bg-orange-50 hover:bg-white hover:shadow-sm border-l-4 border-transparent'
                    }`}
                    onClick={() => setSelectedEpisode(episode)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden mr-3">
                          <img
                            src={episode.imageUrl}
                            alt={`Episódio ${episode.id}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm line-clamp-2">{episode.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">Episódio {episode.id}</p>
                        </div>
                      </div>
                      <ChevronRight className={`h-4 w-4 ${selectedEpisode.id === episode.id ? 'text-growth-orange' : 'text-gray-400'}`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Right side - Player */}
            <div className="col-span-1 md:col-span-2 p-6">
              <h4 className="font-bold text-xl mb-4">{selectedEpisode.title}</h4>
              <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                <AspectRatio ratio={16/9} className="md:h-auto">
                  <iframe 
                    src={`https://open.spotify.com/embed/episode/${selectedEpisode.spotifyEmbedId}`}
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
              
              <div className="mt-6 flex justify-end">
                <a 
                  href="https://open.spotify.com/show/7lKcTLsJg6BOXta99u1FzW" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-growth-orange hover:text-orange-700 flex items-center font-medium"
                >
                  Ver todos os episódios
                  <ChevronRight className="h-5 w-5 ml-1" />
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
