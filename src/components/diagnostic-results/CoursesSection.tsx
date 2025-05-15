
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, FileText, Video, ExternalLink } from 'lucide-react';
import { Resource } from './ResourcesList';
import { DiagnosticPillar } from '@/types/diagnostic';
import { pillarNames } from '@/data/diagnosticData';

interface CoursesSectionProps {
  resources: Resource[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  type: 'course' | 'ebook' | 'video';
  icon: React.ReactNode;
}

const courses: Course[] = [
  {
    id: 'growth-framework',
    title: 'Growth Framework',
    description: 'Aprenda a estruturar processos de crescimento previsíveis para sua empresa.',
    imageUrl: '/placeholder.svg',
    url: 'https://go.growthmachine.com.br/way/',
    type: 'course',
    icon: <BookOpen className="h-10 w-10 text-growth-orange" />
  },
  {
    id: 'sales-mastery',
    title: 'Sales Mastery',
    description: 'Técnicas avançadas de vendas e negociação para conquistar mais clientes.',
    imageUrl: '/placeholder.svg',
    url: 'https://go.growthmachine.com.br/way/',
    type: 'course',
    icon: <Video className="h-10 w-10 text-growth-orange" />
  },
  {
    id: 'conversion-optimization',
    title: 'Guia de Otimização de Conversão',
    description: 'Maximize suas taxas de conversão com estratégias comprovadas.',
    imageUrl: '/placeholder.svg',
    url: 'https://go.growthmachine.com.br/way/',
    type: 'ebook',
    icon: <FileText className="h-10 w-10 text-growth-orange" />
  }
];

const CoursesSection: React.FC<CoursesSectionProps> = ({ resources }) => {
  const allMaterials = [...courses];
  
  // Add relevant resources to the materials list
  resources.forEach(resource => {
    let iconType = <FileText className="h-10 w-10 text-growth-orange" />;
    let type: 'course' | 'ebook' | 'video' = 'ebook';
    
    // Determine type based on resource id
    if (resource.id.includes('video')) {
      iconType = <Video className="h-10 w-10 text-growth-orange" />;
      type = 'video';
    } else if (resource.id.includes('course')) {
      iconType = <BookOpen className="h-10 w-10 text-growth-orange" />;
      type = 'course';
    }
    
    // Only add if not already in the list
    if (!allMaterials.some(m => m.title === resource.title)) {
      allMaterials.push({
        id: resource.id,
        title: resource.title,
        description: resource.description,
        imageUrl: '/placeholder.svg',
        url: resource.url,
        type,
        icon: iconType
      });
    }
  });
  
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Aprofunde seus conhecimentos</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allMaterials.map((material, index) => (
          <motion.div
            key={material.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-growth-orange">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="bg-gray-50 h-40 mb-4 rounded-md flex items-center justify-center">
                  {material.icon}
                </div>
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700">
                    {material.type === 'course' ? 'Curso' : material.type === 'video' ? 'Vídeo' : 'E-book'}
                  </span>
                  {resources.find(r => r.id === material.id) && (
                    <div className="ml-2 space-x-1">
                      {resources.find(r => r.id === material.id)?.pillars.map(pillar => (
                        <span 
                          key={`${material.id}-${pillar}`} 
                          className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
                        >
                          {pillarNames[pillar as DiagnosticPillar]}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <h4 className="text-lg font-semibold mb-2">{material.title}</h4>
                <p className="text-gray-600 mb-4 flex-grow">{material.description}</p>
                <Button 
                  variant="outline" 
                  className="mt-auto border-growth-orange text-growth-orange hover:bg-growth-orange hover:text-white transition-all flex items-center"
                  onClick={() => window.open(material.url, '_blank', 'noopener,noreferrer')}
                >
                  Acessar Material
                  <ExternalLink className="ml-1 h-4 w-4" />
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
