
import React from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from 'recharts';
import { DiagnosticPillar, PillarScore } from '@/types/diagnostic';
import { pillarNames } from '@/data/diagnosticData';
import { getPillarScore } from './utils';

interface RadarChartProps {
  pillarScores: Record<DiagnosticPillar, PillarScore>;
}

interface ChartData {
  subject: string;
  value: number;
  fullMark: number;
}

const RadarChart: React.FC<RadarChartProps> = ({ pillarScores }) => {
  const formatData = (): ChartData[] => {
    return Object.entries(pillarScores).map(([pillar, data]) => {
      const pillarKey = pillar as DiagnosticPillar;
      const pillarName = pillarNames[pillarKey] || pillarKey;
      
      // Use the standardized getPillarScore utility function
      const percentScore = getPillarScore(data);

      return {
        subject: pillarName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
        value: percentScore,
        fullMark: 100
      };
    });
  };

  const chartData = formatData();

  return (
    <div className="w-full h-72 md:h-[500px] mt-4 mb-8">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ 
              fill: '#4b5563', 
              fontSize: '10px', 
              fontFamily: 'Montserrat',
              dy: 3
            }}
            style={{ fontSize: '10px' }}
          />
          <Radar 
            name="Pontuação" 
            dataKey="value" 
            stroke="#FF6600" 
            fill="#FF6600" 
            fillOpacity={0.3}
            animationDuration={1000}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;
