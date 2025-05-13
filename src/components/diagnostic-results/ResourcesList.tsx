
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export interface Resource {
  id: string;
  title: string;
  description: string;
  pillars: string[];
  url: string;
}

interface ResourcesListProps {
  resources: Resource[];
}

const ResourcesList: React.FC<ResourcesListProps> = ({ resources }) => {
  if (resources.length === 0) {
    return null;
  }
  
  // Define the correct URLs for each resource
  const resourceUrls: { [key: string]: string } = {
    'sales-model-canvas': 'https://blog.growthmachine.com.br/o-que-e-sales-model-canvas',
    'social-selling-bible': 'https://lp.growthmachine.com.br/biblia-do-social-selling',
    'prospecting-guide': 'https://lp.growthmachine.com.br/guia-da-prospeccao',
    'kanban-prospect': 'https://blog.growthmachine.com.br/o-que-e-kanban-prospect/',
    'cold-mail-template': 'https://lp.growthmachine.com.br/templates-de-cold-mail'
  };

  // Handle the external link opening with window.open
  const handleExternalLink = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <h3 className="font-bold text-lg mb-4">Materiais Recomendados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {resources.map((resource) => {
          // Get the correct URL for this resource
          const correctUrl = resourceUrls[resource.id] || resource.url;
          
          return (
            <Card key={resource.id} className="flex flex-col border border-gray-200 hover:border-growth-orange transition-colors">
              <CardContent className="p-4 flex flex-col h-full">
                <h4 className="font-bold text-growth-orange mb-1">{resource.title}</h4>
                <p className="text-sm text-gray-600 flex-grow">{resource.description}</p>
                <a 
                  href={correctUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => handleExternalLink(e, correctUrl)}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-12 px-4 py-2 w-full text-growth-orange border border-growth-orange hover:bg-orange-50"
                >
                  Saiba Mais <ExternalLink size={14} className="ml-1" />
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default ResourcesList;
