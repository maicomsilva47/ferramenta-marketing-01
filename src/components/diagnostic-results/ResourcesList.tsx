
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { getResourceUrl } from './utils';

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
  
  // Handle the external link opening with window.open
  const handleExternalLink = (e: React.MouseEvent<HTMLButtonElement>, resourceId: string) => {
    e.preventDefault();
    const url = getResourceUrl(resourceId);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <h3 className="font-bold text-lg mb-4" id="materiais-recomendados">Materiais Recomendados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {resources.map((resource) => (
          <Card 
            key={resource.id} 
            className="flex flex-col border border-gray-200 hover:border-growth-orange transition-colors"
            tabIndex={0}
            role="article"
            aria-labelledby={`resource-title-${resource.id}`}
          >
            <CardContent className="p-4 flex flex-col h-full">
              <h4 
                id={`resource-title-${resource.id}`} 
                className="font-bold text-growth-orange mb-1 break-words"
              >
                {resource.title}
              </h4>
              <p className="text-sm text-gray-600 flex-grow break-words">{resource.description}</p>
              <button 
                onClick={(e) => handleExternalLink(e, resource.id)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-12 px-4 py-2 w-full text-growth-orange border border-growth-orange hover:bg-orange-50"
                aria-label={`Saiba mais sobre ${resource.title}`}
              >
                Saiba Mais <ExternalLink size={14} className="ml-1" aria-hidden="true" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ResourcesList;
