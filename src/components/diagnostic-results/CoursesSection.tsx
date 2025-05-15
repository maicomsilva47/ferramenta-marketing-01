
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

const courses: Course[] = [
  {
    id: 'growth-framework',
    title: 'Growth Framework',
    description: 'Aprenda a estruturar processos de crescimento previsíveis para sua empresa.',
    imageUrl: '/placeholder.svg',
    url: 'https://go.growthmachine.com.br/way/'
  },
  {
    id: 'sales-mastery',
    title: 'Sales Mastery',
    description: 'Técnicas avançadas de vendas e negociação para conquistar mais clientes.',
    imageUrl: '/placeholder.svg',
    url: 'https://go.growthmachine.com.br/way/'
  },
  {
    id: 'conversion-optimization',
    title: 'Otimização de Conversão',
    description: 'Maximize suas taxas de conversão com estratégias comprovadas.',
    imageUrl: '/placeholder.svg',
    url: 'https://go.growthmachine.com.br/way/'
  }
];

const CoursesSection: React.FC = () => {
  return (
    <div className="my-10">
      <h3 className="text-2xl font-bold mb-6 text-center">Aprofunde seus conhecimentos</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-growth-orange">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="bg-gray-100 h-40 mb-4 rounded-md flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-growth-orange" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{course.title}</h4>
                <p className="text-gray-600 mb-4 flex-grow">{course.description}</p>
                <Button 
                  variant="outline" 
                  className="mt-auto border-growth-orange text-growth-orange hover:bg-growth-orange hover:text-white transition-all"
                  onClick={() => window.open(course.url, '_blank', 'noopener,noreferrer')}
                >
                  Ver detalhes
                  <ChevronRight className="ml-1 h-4 w-4" />
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
