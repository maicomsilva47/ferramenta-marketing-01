
import { DiagnosticPillar } from '@/types/diagnostic';

export const getPillarBadgeColor = (pillar: DiagnosticPillar): string => {
  switch (pillar) {
    case 'revenue-strategy':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'value-proposition':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'commercial-intelligence':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'prospecting':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'conversion':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'retention':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'tools':
      return 'bg-gray-50 text-gray-700 border-gray-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};
