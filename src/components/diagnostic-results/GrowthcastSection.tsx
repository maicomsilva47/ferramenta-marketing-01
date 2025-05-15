
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Headphones, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface PodcastEpisode {
  id: string;
  title: string;
  spotifyEmbedId: string;
  spotifyUrl: string;
}

const episodes: PodcastEpisode[] = [
  {
    id: '1',
    title: 'Pedro Sobral revela qual é o pior erro dos empresários ao investir em TRÁFEGO PAGO',
    spotifyEmbedId: '7lKcTLsJg6BOXta99u1FzW',
    spotifyUrl: 'https://open.spotify.com/episode/7lKcTLsJg6BOXta99u1FzW',
  },
  {
    id: '2',
    title: 'Como MULTIPLICAR as suas vendas B2B vendendo MAIS CARO',
    spotifyEmbedId: '1hkbuMtx6ROfAp6CduoVRK',
    spotifyUrl: 'https://open.spotify.com/episode/1hkbuMtx6ROfAp6CduoVRK',
  },
  {
    id: '3',
    title: 'Como usar arquétipos para fazer sua marca faturar milhões',
    spotifyEmbedId: '4aDIUmYN24AQEB93kTMdHu',
    spotifyUrl: 'https://open.spotify.com/episode/4aDIUmYN24AQEB93kTMdHu',
  }
];

const GrowthcastSection: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode>(episodes[0]);

  return (
    <div className="my-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-growth-orange p-2 rounded-full">
          <Headphones className="text-white h-5 w-5" />
        </div>
        <h3 className="text-2xl font-bold">🎧 Growthcast</h3>
      </div>
      
      <Card className="shadow-lg border-0 overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Episódios */}
            <div className="bg-growth-black p-6 border-r border-gray-800">
              <div className="mb-6 flex justify-center md:justify-start">
                <img 
                  src="/lovable-uploads/f523db17-5f85-42a2-b79c-75f29004f2fd.png" 
                  alt="Growthcast Logo" 
                  className="h-16 object-contain"
                />
              </div>
              <p className="text-gray-300 text-sm mb-6 text-center md:text-left">
                Insights semanais sobre vendas, marketing e growth com especialistas de mercado.
              </p>
              
              <div className="space-y-3">
                {episodes.map((episode) => (
                  <motion.div
                    key={episode.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedEpisode.id === episode.id 
                        ? 'bg-gray-800 shadow-md border-l-4 border-growth-orange' 
                        : 'bg-gray-900 hover:bg-gray-800 hover:shadow-sm border-l-4 border-transparent'
                    }`}
                    onClick={() => setSelectedEpisode(episode)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className={`font-medium text-sm line-clamp-2 ${
                          selectedEpisode.id === episode.id ? 'text-white' : 'text-gray-300'
                        }`}>
                          {episode.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">Episódio {episode.id}</p>
                      </div>
                      <ChevronRight className={`h-4 w-4 ${selectedEpisode.id === episode.id ? 'text-growth-orange' : 'text-gray-400'}`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Player */}
            <div className="col-span-1 md:col-span-2 p-6 bg-gray-900 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-xl mb-4 text-white">{selectedEpisode.title}</h4>
                <div className="rounded-lg overflow-hidden border border-gray-800 shadow-sm">
                  <AspectRatio ratio={16 / 9}>
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
              </div>
              
              <div className="mt-6 self-end">
                <a 
                  href={selectedEpisode.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-growth-orange hover:text-orange-400 flex items-center font-medium"
                >
                  Ouvir no Spotify
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
