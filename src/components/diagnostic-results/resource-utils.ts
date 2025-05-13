
import { DiagnosticPillar } from '@/types/diagnostic';

// Map of pillar to gradient classes
export const pillarGradients: Record<DiagnosticPillar, string> = {
  'revenue-strategy': 'bg-gradient-to-r from-purple-500 to-indigo-600',
  'value-proposition': 'bg-gradient-to-r from-pink-500 to-rose-500',
  'commercial-intelligence': 'bg-gradient-to-r from-blue-500 to-cyan-400',
  'prospecting': 'bg-gradient-to-r from-emerald-500 to-teal-400',
  'conversion': 'bg-gradient-to-r from-amber-500 to-orange-400',
  'retention': 'bg-gradient-to-r from-violet-500 to-purple-400',
  'tools': 'bg-gradient-to-r from-blue-600 to-indigo-500',
};

// Map resource types to icon names
export const resourceIconMap: Record<string, string> = {
  'guide': 'book',
  'template': 'file-text',
  'canvas': 'layout-grid',
  'ebook': 'book',
  'tool': 'tool',
  'default': 'file-text'
};

// Get a relevant icon based on resource ID or type
export const getResourceIconName = (resourceId: string): string => {
  if (resourceId.includes('guide') || resourceId.includes('bible')) return 'book';
  if (resourceId.includes('template') || resourceId.includes('mail')) return 'mail';
  if (resourceId.includes('kanban')) return 'layout-dashboard';
  if (resourceId.includes('canvas')) return 'layout-grid';
  return 'file-text';
};

// Get a badge color based on pillar
export const getPillarBadgeColor = (pillar: DiagnosticPillar): string => {
  switch(pillar) {
    case 'revenue-strategy': return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'value-proposition': return 'bg-pink-100 text-pink-800 border-pink-300';
    case 'commercial-intelligence': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'prospecting': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    case 'conversion': return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'retention': return 'bg-violet-100 text-violet-800 border-violet-300';
    case 'tools': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};
