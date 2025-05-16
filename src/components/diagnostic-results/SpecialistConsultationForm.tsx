
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserFormData } from '@/utils/hubspotIntegration';
import { toast } from 'sonner';
import { Building, Briefcase, DollarSign } from 'lucide-react';

// Dados para os dropdowns
const positionOptions = [
  "Sócio",
  "CEO / Presidente",
  "Diretor de vendas",
  "Diretor de marketing",
  "Diretor (outras áreas)",
  "Gerente de vendas",
  "Coordenador de vendas",
  "Coordenador de marketing", 
  "Coordenador (outras áreas)",
  "Vendedor / Consultor Comercial",
  "Analista / SDR / Sales Ops",
  "Estudante",
  "Outros"
];

const revenueOptions = [
  "Acima de 200 milhões ao ano",
  "De 50 milhões a 200 milhões ao ano",
  "De 10 milhões a 50 milhões ao ano",
  "De 5 milhões a 10 milhões ao ano",
  "De 2 milhões a 5 milhões ao ano",
  "De 1 milhão a 2 milhões ao ano",
  "De 600 mil a 1 milhão ao ano",
  "Até 600 mil ao ano",
  "Ainda não faturamos"
];

const segmentOptions = [
  "Agronegócio",
  "Agência de Marketing / Publicidade",
  "Consultoria / Treinamentos",
  "Distribuidora / Atacadista",
  "E-Commerce",
  "Educação",
  "Engenharia / Arquitetura",
  "Eventos / Entretenimento",
  "Financeiro / Contábilidade",
  "Governo / Órgãos Públicos",
  "Indústria",
  "Jurídico",
  "Mídia / Comunicação / Jornalismo",
  "Outros",
  "Recursos Humanos",
  "Saúde / Estética",
  "Serviços",
  "Software / SaaS / Cloud",
  "Telecomunicações",
  "TI / Tecnologia",
  "Varejo"
];

// Schema para validação do formulário
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

type SpecialistFormValues = z.infer<typeof formSchema>;

interface SpecialistConsultationFormProps {
  userData: UserFormData | null;
  resultsId: string | null;
}

const SpecialistConsultationForm: React.FC<SpecialistConsultationFormProps> = ({ 
  userData,
  resultsId
}) => {
  const form = useForm<SpecialistFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cargo_ocupado: "",
      faturamento_anual: "",
      segmento: "",
    },
  });

  const onSubmit = async (data: SpecialistFormValues) => {
    try {
      // Preparando os dados para enviar ao webhook
      const webhookUrl = 'https://n8n.growthmachine.com.br/webhook-test/843e1f22-7574-4681-a1ef-f43a570869ae';
      
      // Criar objeto com todos os dados do usuário + dados do formulário
      const combinedData = {
        ...userData, // Dados do primeiro formulário (nome, email, empresa, etc)
        ...data, // Dados deste formulário (cargo, faturamento, segmento)
        diagnostic_id: resultsId, // ID do diagnóstico
        timestamp: Date.now().toString()
      };
      
      // Construindo a query string
      const params = new URLSearchParams();
      
      // Adicionar todos os dados combinados à query string
      Object.entries(combinedData).forEach(([key, value]) => {
        if (value) {
          params.append(key, value.toString());
        }
      });
      
      // URL final com todos os parâmetros
      const urlWithParams = `${webhookUrl}?${params.toString()}`;
      
      // Enviar requisição GET para o webhook
      const response = await fetch(urlWithParams, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erro no envio: ${response.status}`);
      }
      
      // Sucesso
      toast.success("Solicitação enviada com sucesso! Um de nossos especialistas entrará em contato.");
      form.reset();
      
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast.error("Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.");
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Fale com um especialista</h3>
      
      <p className="text-gray-600 mb-6">
        Preencha os campos abaixo para que possamos conectá-lo com um de nossos especialistas 
        e aprofundar a análise dos resultados do seu diagnóstico comercial.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="cargo_ocupado"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-growth-orange" />
                  Cargo ocupado
                </FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione seu cargo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {positionOptions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
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
                <FormLabel className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-growth-orange" />
                  Faturamento anual
                </FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o faturamento anual" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {revenueOptions.map((revenue) => (
                      <SelectItem key={revenue} value={revenue}>
                        {revenue}
                      </SelectItem>
                    ))}
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
                <FormLabel className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-growth-orange" />
                  Segmento
                </FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o segmento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {segmentOptions.map((segment) => (
                      <SelectItem key={segment} value={segment}>
                        {segment}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full mt-6 bg-growth-orange hover:bg-orange-600"
          >
            Solicitar Consultoria Especializada
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SpecialistConsultationForm;
