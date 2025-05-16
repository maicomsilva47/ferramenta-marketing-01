
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SpecialistConsultationForm from './SpecialistConsultationForm';
import { UserFormData } from '@/utils/hubspotIntegration';

interface ConsultationCTAProps {
  userData: UserFormData | null;
  resultsId: string | null;
}

const ConsultationCTA: React.FC<ConsultationCTAProps> = ({ userData, resultsId }) => {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Quer um diagnóstico mais preciso?</h3>
      <Card className="shadow-md border-0 overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-growth-orange to-orange-600 p-6 md:p-8 text-white">
              <h4 className="text-xl md:text-2xl font-bold mb-4">
                Diagnóstico especializado gratuito
              </h4>
              <p className="mb-4 text-white/90">
                Vá além do autodiagnóstico e converse com um de nossos especialistas para uma análise personalizada da sua máquina de vendas.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">✓</span>
                  <span>Análise aprofundada do seu processo comercial</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">✓</span>
                  <span>Identificação dos gargalos críticos específicos do seu negócio</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">✓</span>
                  <span>Recomendações táticas personalizadas para crescimento acelerado</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 md:p-8 bg-white">
              <SpecialistConsultationForm userData={userData} resultsId={resultsId} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationCTA;
