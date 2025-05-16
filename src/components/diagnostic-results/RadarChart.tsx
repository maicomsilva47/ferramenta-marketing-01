
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
import { useIsMobile } from '@/hooks/use-mobile';

interface RadarChartProps {
  pillarScores: Record<DiagnosticPillar, PillarScore>;
}

interface ChartData {
  subject: string;
  value: number;
  fullMark: number;
}

const RadarChart: React.FC<RadarChartProps> = ({ pillarScores }) => {
  const isMobile = useIsMobile();
  
  const formatData = (): ChartData[] => {
    return Object.entries(pillarScores).map(([pillar, data]) => {
      const pillarKey = pillar as DiagnosticPillar;
      const pillarName = pillarNames[pillarKey] || pillarKey;
      
      // Fixed calculation: score is out of max 4 points per question
      const maxScore = data.totalQuestions * 4;
      const percentScore = Math.min(100, (data.score / maxScore) * 100);

      return {
        subject: pillarName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
        value: Math.round(percentScore),
        fullMark: 100
      };
    });
  };

  const chartData = formatData();

  return (
    <div className="w-full h-96 md:h-[500px] mt-4 mb-8">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius={isMobile ? "60%" : "70%"} data={chartData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ 
              fill: '#4b5563', 
              fontSize: isMobile ? 9 : 12, 
              fontFamily: 'Montserrat' 
            }} 
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
