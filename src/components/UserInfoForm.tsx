
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { UserInfo } from "@/types/diagnostic";
import { Loader } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  company: z.string().min(2, { message: "O nome da empresa deve ter pelo menos 2 caracteres" }),
  phone: z.string().min(14, { message: "Telefone inválido" })
    .max(16, { message: "Telefone inválido" })
    .refine((val) => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(val), {
      message: "Formato inválido. Use: (XX) XXXXX-XXXX",
    }),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface UserInfoFormProps {
  onSubmit: (data: FormValues) => void;
  isAfterQuestions?: boolean;
  initialData?: UserInfo | null;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit, isAfterQuestions = false, initialData = null }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      company: initialData?.company || "",
      phone: initialData?.phone || "",
      utm_source: initialData?.utm_source || getUtmParameter("utm_source"),
      utm_medium: initialData?.utm_medium || getUtmParameter("utm_medium"),
      utm_campaign: initialData?.utm_campaign || getUtmParameter("utm_campaign"),
      utm_term: initialData?.utm_term || getUtmParameter("utm_term"),
      utm_content: initialData?.utm_content || getUtmParameter("utm_content"),
    },
  });

  function getUtmParameter(param: string): string {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || "";
  }

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    
    if (digits.length === 0) return "";
    
    // Format as (XX) XXXXX-XXXX
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.substring(0, 2)}) ${digits.substring(2)}`;
    return `(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7, 11)}`;
  };

  const handleSubmit = (data: FormValues) => {
    try {
      // Prevent multiple submissions
      if (isSubmitting) return;
      
      // Set submitting state
      setIsSubmitting(true);
      
      // Submit the form data after a small delay
      setTimeout(() => {
        onSubmit(data);
        
        // Reset submitting state after a delay
        setTimeout(() => {
          setIsSubmitting(false);
        }, 500);
      }, 200);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Erro ao enviar o formulário. Por favor, tente novamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {isAfterQuestions ? "Último passo: seus dados para receber o diagnóstico" : "Conte-nos sobre você"}
      </h2>
      
      <p className="text-gray-600 mb-6 text-center">
        {isAfterQuestions 
          ? "Preencha suas informações para visualizar os resultados do diagnóstico personalizado."
          : "Precisamos de algumas informações antes de iniciar seu diagnóstico personalizado."}
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="João Silva" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="joao@empresa.com" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da empresa</FormLabel>
                <FormControl>
                  <Input placeholder="Growth Machine" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(XX) XXXXX-XXXX"
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      onChange(formatted);
                    }}
                    {...rest}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Hidden UTM fields */}
          <input type="hidden" {...form.register("utm_source")} />
          <input type="hidden" {...form.register("utm_medium")} />
          <input type="hidden" {...form.register("utm_campaign")} />
          <input type="hidden" {...form.register("utm_term")} />
          <input type="hidden" {...form.register("utm_content")} />
          
          <Button
            type="submit"
            className="w-full bg-growth-orange hover:bg-orange-600 h-12 mt-4 relative"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin mr-2" size={18} />
                <span>Processando...</span>
              </span>
            ) : (
              isAfterQuestions ? "Ver Resultados" : "Iniciar Diagnóstico"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserInfoForm;
