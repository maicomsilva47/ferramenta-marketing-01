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
  imageUrl: string;
}

const episodes: PodcastEpisode[] = [
  {
    id: '1',
    title: 'Pedro Sobral revela qual é o pior erro dos empresários ao investir em TRÁFEGO PAGO',
    spotifyEmbedId: '1XVNcXvNpcjrVSDeXL2rul',
    spotifyUrl: 'https://open.spotify.com/episode/1XVNcXvNpcjrVSDeXL2rul',
    imageUrl: '/lovable-uploads/growthcast-cover.png'
  },
  {
    id: '2',
    title: 'Como MULTIPLICAR as suas vendas B2B vendendo MAIS CARO',
    spotifyEmbedId: '4BkxwdEwGKRmDMnGsgY2Fh',
    spotifyUrl: 'https://open.spotify.com/episode/4BkxwdEwGKRmDMnGsgY2Fh',
    imageUrl: '/lovable-uploads/growthcast-cover.png'
  },
  {
    id: '3',
    title: 'Como usar arquétipos para fazer sua marca faturar milhões',
    spotifyEmbedId: '0mwq1nZ8bc0Q1Lnytozxx5',
    spotifyUrl: 'https://open.spotify.com/episode/0mwq1nZ8bc0Q1Lnytozxx5',
    imageUrl: '/lovable-uploads/growthcast-cover.png'
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
      
      <Card className="shadow-lg border-0 overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Episódios */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 border-r border-gray-100">
              <div className="mb-6 flex justify-center md:justify-start">
                <img 
                  src="/lovable-uploads/growthcast-cover.png" 
                  alt="Growthcast Logo" 
                  className="h-16 object-contain"
                />
              </div>
              <p className="text-gray-700 text-sm mb-6 text-center md:text-left">
                Insights semanais sobre vendas, marketing e growth com especialistas de mercado.
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
            
            {/* Player */}
            <div className="col-span-1 md:col-span-2 p-6 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-xl mb-4">{selectedEpisode.title}</h4>
                <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm">
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
                  className="text-growth-orange hover:text-orange-700 flex items-center font-medium"
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
