
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Users, Check } from 'lucide-react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { UserInfo } from '@/types/diagnostic';

interface ConsultationCTAProps {
  userData?: UserInfo | null;
  resultsId?: string | null;
}

const formSchema = z.object({
  cargo_ocupado: z.string({
    required_error: "Por favor selecione seu cargo",
  }),
  faturamento_anual: z.string({
    required_error: "Por favor selecione o faturamento anual",
  }),
  segmento: z.string({
    required_error: "Por favor selecione o segmento",
  }),
});

const cargoOptions = [
  'Sócio',
  'CEO / Presidente',
  'Diretor de vendas',
  'Diretor de marketing',
  'Diretor (outras áreas)',
  'Gerente de vendas',
  'Coordenador de vendas',
  'Coordenador de marketing',
  'Coordenador (outras áreas)',
  'Vendedor / Consultor Comercial',
  'Analista / SDR / Sales Ops',
  'Estudante',
  'Outros'
];

const faturamentoOptions = [
  'Acima de 200 milhões ao ano',
  'De 50 milhões a 200 milhões ao ano',
  'De 10 milhões a 50 milhões ao ano',
  'De 5 milhões a 10 milhões ao ano',
  'De 2 milhões a 5 milhões ao ano',
  'De 1 milhão a 2 milhões ao ano',
  'De 600 mil a 1 milhão ao ano',
  'Até 600 mil ao ano',
  'Ainda não faturamos'
];

const segmentoOptions = [
  'Agronegócio',
  'Agência de Marketing / Publicidade',
  'Consultoria / Treinamentos',
  'Distribuidora / Atacadista',
  'E-Commerce',
  'Educação',
  'Engenharia / Arquitetura',
  'Eventos / Entretenimento',
  'Financeiro / Contábilidade',
  'Governo / Órgãos Públicos',
  'Indústria',
  'Jurídico',
  'Mídia / Comunicação / Jornalismo',
  'Outros',
  'Recursos Humanos',
  'Saúde / Estética',
  'Serviços',
  'Software / SaaS / Cloud',
  'Telecomunicações',
  'TI / Tecnologia',
  'Varejo'
];

const ConsultationCTA: React.FC<ConsultationCTAProps> = ({ userData, resultsId }) => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cargo_ocupado: "",
      faturamento_anual: "",
      segmento: ""
    },
  });

  const handleExternalLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!showForm) {
      setShowForm(true);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Corrected webhook URL
      const webhookUrl = 'https://webhook.n8n.growthmachine.com.br/webhook/843e1f22-7574-4681-a1ef-f43a570869ae';
      
      // Combine user data from previous form with new form data
      const params = new URLSearchParams();
      
      // Add userData from previous form if available
      if (userData) {
        Object.entries(userData).forEach(([key, value]) => {
          if (value) {
            params.append(key, value.toString());
          }
        });
      }
      
      // Add new form data
      Object.entries(data).forEach(([key, value]) => {
        params.append(key, value);
      });
      
      // Add additional data
      params.append('fonte', 'formulario_pos_diagnostico');
      params.append('timestamp', Date.now().toString());
      
      // Append query string to URL
      const urlWithParams = `${webhookUrl}?${params.toString()}`;
      
      // Send request with no-cors mode
      await fetch(urlWithParams, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'no-cors', // Add no-cors mode to handle CORS issues
      });
      
      // With no-cors, we can't check response.ok, so just assume success if no error
      toast.success("Solicitação enviada com sucesso! Entraremos em contato em breve.");
      
      // Navigate to thank you page instead of opening external link
      navigate(`/obrigado?results_id=${resultsId || ''}`);
      
    } catch (error) {
      console.error('Error sending consultation data:', error);
      toast.error("Ocorreu um erro ao enviar sua solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full mx-auto my-8 overflow-hidden border-0 shadow-xl">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 sm:p-8 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="bg-white/20 p-5 rounded-full shadow-lg">
                  <Users className="h-10 w-10 text-white" />
                </div>
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Descubra como destravar novas receitas com um plano comercial feito para sua operação</h3>
                <p className="text-white/90 text-base sm:text-lg mb-4 md:mb-0 max-w-2xl">
                  Converse com um especialista da Growth Machine e receba uma análise completa dos seus processos comerciais atuais, identificando gargalos, oportunidades não exploradas e estratégias de curto e médio prazo para acelerar seu crescimento.
                </p>
                <p className="text-white/90 text-base sm:text-lg mb-4 md:mb-0 max-w-2xl">
                  Com base em mais de 1.200 empresas atendidas e R$1,8 bilhão em vendas geradas, vamos traçar um plano estratégico sob medida para sua operação, com foco em previsibilidade, escalabilidade e geração real de receita.
                </p>
                <p className="text-white/90 text-base sm:text-lg mb-4 md:mb-0 max-w-2xl">
                  Você vai entender exatamente o que está travando seu resultado hoje e o que precisa ser ajustado para sua equipe bater meta de forma consistente nos próximos meses.
                </p>
                <p className="text-white/90 text-base sm:text-lg mb-6 md:mb-0 max-w-2xl">
                  Tudo isso em uma conversa direta com quem vive vendas B2B todos os dias e tem método testado para gerar resultado rápido, sem achismo e sem enrolação.
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <Button 
                  onClick={handleExternalLink}
                  className="bg-white hover:bg-gray-100 text-indigo-700 transition-all duration-300 py-6 px-8 h-auto text-lg font-medium rounded-lg shadow-lg hover:shadow-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : (showForm ? "Enviar" : "Falar com Especialista")}
                  {!isSubmitting && !showForm && <Check className="ml-2 h-5 w-5" />}
                </Button>
              </div>
            </div>

            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4 }}
                className="mt-8 pt-8 border-t border-white/20"
              >
                <h4 className="text-white text-xl font-medium mb-6 text-center">
                  Complete algumas informações para falar com um especialista
                </h4>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="cargo_ocupado"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Cargo ocupado</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                  <SelectValue placeholder="Selecione seu cargo" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {cargoOptions.map(option => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-200" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="faturamento_anual"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Faturamento anual</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                  <SelectValue placeholder="Selecione o faturamento" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {faturamentoOptions.map(option => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-200" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="segmento"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Segmento</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                  <SelectValue placeholder="Selecione o segmento" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {segmentoOptions.map(option => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-200" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button 
                        type="submit"
                        className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 h-auto text-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Enviando..." : "Solicitar Contato"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsultationCTA;
