
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FileText, Video, ExternalLink } from 'lucide-react';
import { Resource } from './ResourcesList';
import { DiagnosticPillar } from '@/types/diagnostic';
import { pillarNames } from '@/data/diagnosticData';
import { toast } from 'sonner';

interface CoursesSectionProps {
  resources: Resource[];
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ resources }) => {
  // Debug log to see what resources we're receiving
  useEffect(() => {
    console.log('CoursesSection received resources:', resources);
  }, [resources]);
  
  // Check if resources array is empty
  if (!resources || resources.length === 0) {
    console.log('No resources available to display');
    return (
      <div className="my-8">
        <h3 className="text-2xl font-bold mb-6">Aprofunde seus conhecimentos</h3>
        <p className="text-center text-gray-500">Nenhum material disponível no momento.</p>
      </div>
    );
  }
  
  // Map resources to their specific URLs based on title
  const enhancedResources = resources.map(resource => {
    let customUrl = "https://go.growthmachine.com.br/way/"; // fallback
    
    switch (resource.title.toLowerCase()) {
      case 'sales model canvas':
        customUrl = 'https://blog.growthmachine.com.br/o-que-e-sales-model-canvas';
        break;
      case 'a bíblia do social selling':
        customUrl = 'https://lp.growthmachine.com.br/biblia-do-social-selling';
        break;
      case 'guia essencial de prospecção':
        customUrl = 'https://lp.growthmachine.com.br/guia-da-prospeccao';
        break;
      case 'kanban prospect':
        customUrl = 'https://blog.growthmachine.com.br/o-que-e-kanban-prospect/';
        break;
      case 'template de cold mail':
        customUrl = 'https://lp.growthmachine.com.br/templates-de-cold-mail';
        break;
    }
    
    console.log(`Resource "${resource.title}" mapped to URL: ${customUrl}`);
    
    return {
      ...resource,
      url: customUrl,
      id: resource.id.replace("course-", "").replace("ebook-", "").replace("video-", "")
    };
  });
  
  const getIconForResource = (id: string) => {
    if (id.includes('video')) {
      return <Video className="h-10 w-10 text-white" />;
    }
    return <FileText className="h-10 w-10 text-white" />;
  };
  
  const getBackgroundStyle = (index: number) => {
    const patterns = [
      'bg-gradient-to-br from-orange-400 to-red-500',
      'bg-gradient-to-br from-blue-400 to-purple-500',
      'bg-gradient-to-br from-green-400 to-teal-500',
      'bg-gradient-to-br from-yellow-400 to-orange-500',
      'bg-gradient-to-br from-pink-400 to-purple-500'
    ];
    
    return patterns[index % patterns.length];
  };
  
  const handleAccessMaterial = (url: string, title: string) => {
    console.log(`Opening material: ${title} with URL: ${url}`);
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
      toast.success(`Acessando ${title}`);
    } catch (error) {
      console.error('Error opening URL:', error);
      toast.error('Erro ao abrir o material. Tente novamente.');
    }
  };
  
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Aprofunde seus conhecimentos</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {enhancedResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Card className="h-full transition-all duration-300 hover:shadow-lg border-0 shadow overflow-hidden flex flex-col">
              <div className={`h-32 ${getBackgroundStyle(index)} flex items-center justify-center p-6`}>
                <div className="bg-black bg-opacity-20 p-4 rounded-full">
                  {getIconForResource(resource.id)}
                </div>
              </div>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700 font-medium">
                    {resource.id.includes('video') ? 'Vídeo' : 'E-book'}
                  </span>
                  {resource.pillars.slice(0, 2).map(pillar => (
                    <span 
                      key={`${resource.id}-${pillar}`} 
                      className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
                    >
                      {pillarNames[pillar as DiagnosticPillar]}
                    </span>
                  ))}
                </div>
                <h4 className="text-lg font-semibold mb-2">{resource.title}</h4>
                <p className="text-gray-600 mb-4 flex-grow">{resource.description}</p>
                <Button 
                  className="mt-auto w-full bg-growth-orange hover:bg-orange-700 transition-all flex items-center justify-center text-white"
                  onClick={() => handleAccessMaterial(resource.url, resource.title)}
                >
                  Acessar Material
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CoursesSection;
