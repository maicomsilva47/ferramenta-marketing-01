
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { UserFormData } from '@/utils/hubspotIntegration';

// Form schema
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

const SpecialistConsultationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get user data from localStorage
  const getUserData = (): UserFormData | null => {
    try {
      const userDataStr = localStorage.getItem('diagnosticUserData');
      if (userDataStr) {
        return JSON.parse(userDataStr);
      }
    } catch (error) {
      console.error("Error retrieving user data from localStorage:", error);
    }
    return null;
  };
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cargo_ocupado: "",
      faturamento_anual: "",
      segmento: "",
    },
  });
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Get previously stored user data
      const userData = getUserData();
      
      if (!userData) {
        toast.error("Não foi possível recuperar seus dados. Por favor, tente novamente.");
        setIsSubmitting(false);
        return;
      }
      
      // Webhook URL for n8n
      const webhookUrl = 'https://n8n.growthmachine.com.br/webhook-test/843e1f22-7574-4681-a1ef-f43a570869ae';
      
      // Create combined data
      const combinedData = {
        ...userData,
        ...data,
        consultation_requested: true,
        request_date: new Date().toISOString(),
      };
      
      // Create query string from combined data
      const params = new URLSearchParams();
      
      // Add all data to query params
      Object.entries(combinedData).forEach(([key, value]) => {
        if (value) {
          params.append(key, value.toString());
        }
      });
      
      // Add timestamp to avoid caching
      params.append('timestamp', Date.now().toString());
      
      // Append query string to URL
      const urlWithParams = `${webhookUrl}?${params.toString()}`;
      
      // Make GET request to the webhook
      const response = await fetch(urlWithParams, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.error('Failed to send consultation request:', response.status, response.statusText);
        toast.error("Houve um erro ao enviar sua solicitação. Por favor, tente novamente.");
      } else {
        toast.success("Sua solicitação foi enviada com sucesso! Logo entraremos em contato.");
        form.reset();
      }
    } catch (error) {
      console.error("Error sending consultation request:", error);
      toast.error("Houve um erro ao enviar sua solicitação. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-8 bg-gradient-to-br from-gray-50 to-orange-50 p-6 sm:p-8 rounded-lg border border-orange-100">
      <h3 className="font-bold text-2xl mb-2 text-gray-800">Fale com um especialista</h3>
      <p className="text-gray-600 mb-6">
        Quer aprofundar sua análise e receber recomendações personalizadas? Preencha as informações abaixo para agendar uma consulta com um de nossos especialistas.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="cargo_ocupado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cargo ocupado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu cargo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Sócio">Sócio</SelectItem>
                    <SelectItem value="CEO / Presidente">CEO / Presidente</SelectItem>
                    <SelectItem value="Diretor de vendas">Diretor de vendas</SelectItem>
                    <SelectItem value="Diretor de marketing">Diretor de marketing</SelectItem>
                    <SelectItem value="Diretor (outras áreas)">Diretor (outras áreas)</SelectItem>
                    <SelectItem value="Gerente de vendas">Gerente de vendas</SelectItem>
                    <SelectItem value="Coordenador de vendas">Coordenador de vendas</SelectItem>
                    <SelectItem value="Coordenador de marketing">Coordenador de marketing</SelectItem>
                    <SelectItem value="Coordenador (outras áreas)">Coordenador (outras áreas)</SelectItem>
                    <SelectItem value="Vendedor / Consultor Comercial">Vendedor / Consultor Comercial</SelectItem>
                    <SelectItem value="Analista / SDR / Sales Ops">Analista / SDR / Sales Ops</SelectItem>
                    <SelectItem value="Estudante">Estudante</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="faturamento_anual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faturamento anual</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o faturamento anual" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Acima de 200 milhões ao ano">Acima de 200 milhões ao ano</SelectItem>
                    <SelectItem value="De 50 milhões a 200 milhões ao ano">De 50 milhões a 200 milhões ao ano</SelectItem>
                    <SelectItem value="De 10 milhões a 50 milhões ao ano">De 10 milhões a 50 milhões ao ano</SelectItem>
                    <SelectItem value="De 5 milhões a 10 milhões ao ano">De 5 milhões a 10 milhões ao ano</SelectItem>
                    <SelectItem value="De 2 milhões a 5 milhões ao ano">De 2 milhões a 5 milhões ao ano</SelectItem>
                    <SelectItem value="De 1 milhão a 2 milhões ao ano">De 1 milhão a 2 milhões ao ano</SelectItem>
                    <SelectItem value="De 600 mil a 1 milhão ao ano">De 600 mil a 1 milhão ao ano</SelectItem>
                    <SelectItem value="Até 600 mil ao ano">Até 600 mil ao ano</SelectItem>
                    <SelectItem value="Ainda não faturamos">Ainda não faturamos</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="segmento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segmento</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o segmento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Agronegócio">Agronegócio</SelectItem>
                    <SelectItem value="Agência de Marketing / Publicidade">Agência de Marketing / Publicidade</SelectItem>
                    <SelectItem value="Consultoria / Treinamentos">Consultoria / Treinamentos</SelectItem>
                    <SelectItem value="Distribuidora / Atacadista">Distribuidora / Atacadista</SelectItem>
                    <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                    <SelectItem value="Educação">Educação</SelectItem>
                    <SelectItem value="Engenharia / Arquitetura">Engenharia / Arquitetura</SelectItem>
                    <SelectItem value="Eventos / Entretenimento">Eventos / Entretenimento</SelectItem>
                    <SelectItem value="Financeiro / Contábilidade">Financeiro / Contábilidade</SelectItem>
                    <SelectItem value="Governo / Órgãos Públicos">Governo / Órgãos Públicos</SelectItem>
                    <SelectItem value="Indústria">Indústria</SelectItem>
                    <SelectItem value="Jurídico">Jurídico</SelectItem>
                    <SelectItem value="Mídia / Comunicação / Jornalismo">Mídia / Comunicação / Jornalismo</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                    <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                    <SelectItem value="Saúde / Estética">Saúde / Estética</SelectItem>
                    <SelectItem value="Serviços">Serviços</SelectItem>
                    <SelectItem value="Software / SaaS / Cloud">Software / SaaS / Cloud</SelectItem>
                    <SelectItem value="Telecomunicações">Telecomunicações</SelectItem>
                    <SelectItem value="TI / Tecnologia">TI / Tecnologia</SelectItem>
                    <SelectItem value="Varejo">Varejo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full mt-4 py-6 text-base bg-growth-orange hover:bg-orange-600 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Solicitar Consulta com Especialista"}
          </Button>
          
          <p className="text-gray-500 text-xs mt-3 text-center">
            Ao solicitar a consulta, você concorda em receber comunicações relacionadas aos serviços da Growth Machine.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SpecialistConsultationForm;
