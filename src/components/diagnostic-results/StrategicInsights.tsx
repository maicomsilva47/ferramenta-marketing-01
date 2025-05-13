
import React from 'react';
import { Lightbulb } from 'lucide-react';

interface StrategicInsightsProps {
  insights: string[];
}

const StrategicInsights: React.FC<StrategicInsightsProps> = ({ insights }) => {
  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <div className="bg-orange-50 p-4 sm:p-5 rounded-lg border border-orange-200 mb-6 overflow-hidden">
      <div className="flex items-center mb-3">
        <Lightbulb size={24} className="text-growth-orange mr-2" aria-hidden="true" />
        <h3 className="font-bold text-lg text-growth-black">📌 Principais Insights</h3>
      </div>
      <ul className="list-disc pl-4 sm:pl-5 space-y-2 sm:space-y-3 text-gray-800 break-words">
        {insights.map((insight, i) => (
          <li key={i} className="font-medium">
            {insight}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StrategicInsights;
