
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Book, LayoutDashboard, Mail, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { pillarNames } from '@/data/diagnosticData';
import { getPillarBadgeColor } from './resource-utils';
import { DiagnosticPillar } from '@/types/diagnostic';
import { toast } from 'sonner';

export interface Resource {
  id: string;
  title: string;
  description: string;
  pillars: string[];
  url: string;
  icon?: string;
}

interface ResourcesListProps {
  resources: Resource[];
}

const ResourceIcon = ({ id, iconType }: { id: string; iconType?: string }) => {
  const iconSize = 24;
  
  // First try to use the explicit icon type if provided
  if (iconType) {
    switch(iconType.toLowerCase()) {
      case 'book':
        return <Book size={iconSize} className="text-orange-500" />;
      case 'dashboard':
        return <LayoutDashboard size={iconSize} className="text-emerald-500" />;
      case 'mail':
        return <Mail size={iconSize} className="text-amber-500" />;
      case 'grid':
        return <LayoutGrid size={iconSize} className="text-purple-500" />;
      case 'video':
        return <Book size={iconSize} className="text-blue-500" />;
    }
  }
  
  // Fallback to ID-based mapping if no icon type or unrecognized
  switch(id) {
    case 'sales-model-canvas':
      return <LayoutGrid size={iconSize} className="text-purple-500" />;
    case 'social-selling-bible':
    case 'prospecting-guide':
      return <Book size={iconSize} className="text-orange-500" />;
    case 'kanban-prospect':
      return <LayoutDashboard size={iconSize} className="text-emerald-500" />;
    case 'cold-mail-template':
      return <Mail size={iconSize} className="text-amber-500" />;
    default:
      return <Book size={iconSize} className="text-gray-500" />;
  }
};

const ResourcesList: React.FC<ResourcesListProps> = ({ resources }) => {
  // Debug logging
  console.log("ResourcesList - Received resources:", resources);
  
  if (!resources || resources.length === 0) {
    console.log("ResourcesList - No resources available");
    return null;
  }
  
  // Handle the external link opening - directly use the resource's URL property
  const handleExternalLink = (e: React.MouseEvent<HTMLButtonElement>, resourceUrl: string, title: string) => {
    e.preventDefault();
    console.log(`Opening resource: ${title} with URL: ${resourceUrl}`);
    if (!resourceUrl) {
      console.error("Missing URL for resource:", title);
      toast.error("O link para este recurso não está disponível no momento.");
      return;
    }
    
    try {
      window.open(resourceUrl, '_blank', 'noopener,noreferrer');
      toast.success(`Acessando ${title}`);
    } catch (error) {
      console.error('Error opening URL:', error);
      toast.error('Erro ao abrir o material. Tente novamente.');
    }
  };

  return (
    <>
      <h3 className="font-bold text-lg mb-4" id="materiais-recomendados">Materiais Recomendados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {resources.map((resource) => (
          <Card 
            key={resource.id} 
            className="group flex flex-col border border-gray-200 bg-white hover:border-orange-500 hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden"
            tabIndex={0}
            role="article"
            aria-labelledby={`resource-title-${resource.id}`}
          >
            <div className="h-2 bg-gradient-to-r from-orange-500 to-orange-600" />
            <CardContent className="p-5 flex flex-col h-full">
              <div className="flex items-start mb-3">
                <div className="mr-3 p-2 bg-orange-50 rounded-md">
                  <ResourceIcon id={resource.id} iconType={resource.icon} />
                </div>
                <div>
                  <h4 
                    id={`resource-title-${resource.id}`} 
                    className="font-bold text-gray-900 mb-1 break-words group-hover:text-orange-500 transition-colors"
                  >
                    {resource.title}
                  </h4>
                  <p className="text-sm text-gray-600 flex-grow break-words">{resource.description}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.pillars.map((pillar) => {
                  // Check if this pillar exists in pillarNames
                  const pillarName = pillarNames[pillar as DiagnosticPillar] || pillar;
                  return (
                    <span 
                      key={`${resource.id}-${pillar}`}
                      className={cn(
                        "text-xs px-2 py-1 rounded-full border",
                        getPillarBadgeColor(pillar as DiagnosticPillar)
                      )}
                    >
                      {pillarName}
                    </span>
                  );
                })}
              </div>
              
              <button 
                onClick={(e) => handleExternalLink(e, resource.url, resource.title)}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 w-full text-white bg-orange-500 hover:bg-orange-600 transition-colors"
                aria-label={`Saiba mais sobre ${resource.title}`}
              >
                Acessar Material <ExternalLink size={14} className="ml-1" aria-hidden="true" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ResourcesList;
