import React, { useState } from 'react';
import { UserInfo } from '@/types/diagnostic';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader, Mail } from 'lucide-react';

interface ConsultationCTAProps {
  userData: UserInfo | null | undefined;
  resultsId: string | null;
}

const ConsultationCTA: React.FC<ConsultationCTAProps> = ({ userData, resultsId }) => {
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    company: userData?.company || '',
    phone: userData?.phone || '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user updates it
    if (formErrors[name]) {
      setFormErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = "Nome é obrigatório";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email inválido";
    }
    
    if (!formData.company.trim()) {
      errors.company = "Empresa é obrigatória";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Telefone é obrigatório";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleExternalLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    
    setIsSubmitting(true);
    
    // Prepare data for submission
    const utm_source = new URLSearchParams(window.location.search).get('utm_source') || 'diagnostic';
    const utm_medium = new URLSearchParams(window.location.search).get('utm_medium') || 'website';
    const utm_campaign = new URLSearchParams(window.location.search).get('utm_campaign') || 'consultation';
    
    const diagnosticLink = resultsId ? 
      `${window.location.origin}/?share_id=${resultsId}` : 
      'No diagnostic link';
    
    // Build the URL with parameters
    const baseUrl = 'https://api.whatsapp.com/send?phone=5511972884001&text=';
    const message = encodeURIComponent(
      `Olá! Acabei de fazer o diagnóstico comercial da Growth Machine e gostaria de uma consultoria gratuita.\n\n` +
      `Nome: ${formData.name}\n` +
      `Empresa: ${formData.company}\n` +
      `Email: ${formData.email}\n` +
      `Telefone: ${formData.phone}\n\n` +
      `${formData.message ? `Mensagem: ${formData.message}\n\n` : ''}` +
      `Link do diagnóstico: ${diagnosticLink}\n\n` +
      `UTM: ${utm_source} / ${utm_medium} / ${utm_campaign}`
    );
    
    const whatsappUrl = `${baseUrl}${message}`;
    
    // Log success for diagnostic purposes
    console.log("Opening WhatsApp with consultation request:", {
      formData,
      diagnostic: diagnosticLink,
      utm: { utm_source, utm_medium, utm_campaign }
    });
    
    // Minimum delay to show loading state
    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, '_blank');
      
      // Reset message field but keep other data
      setFormData(prev => ({ ...prev, message: '' }));
      
      // Success message
      toast.success("Obrigado! Abrindo WhatsApp para você entrar em contato.");
    }, 800);
  };

  return (
    <div className="bg-growth-orange bg-opacity-10 p-6 rounded-lg shadow-sm mb-6">
      <div className="text-center mb-6">
        <h3 className="font-bold text-2xl mb-2">Agende uma Consultoria Gratuita</h3>
        <p className="text-gray-600">Receba uma análise personalizada do seu diagnóstico e descubra como otimizar sua máquina de vendas.</p>
      </div>
      
      <form onSubmit={handleExternalLink} className="space-y-4">
        <div>
          <Input 
            name="name"
            placeholder="Seu nome *"
            value={formData.name} 
            onChange={handleChange}
            className={`${formErrors.name ? 'border-red-500' : ''}`}
            required
          />
          {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
        </div>
        
        <div>
          <Input 
            name="email"
            type="email"
            placeholder="Seu email *" 
            value={formData.email} 
            onChange={handleChange}
            className={`${formErrors.email ? 'border-red-500' : ''}`}
            required
          />
          {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input 
              name="company"
              placeholder="Empresa *" 
              value={formData.company} 
              onChange={handleChange}
              className={`${formErrors.company ? 'border-red-500' : ''}`}
              required
            />
            {formErrors.company && <p className="text-red-500 text-xs mt-1">{formErrors.company}</p>}
          </div>
          
          <div>
            <Input 
              name="phone"
              placeholder="Telefone/WhatsApp *" 
              value={formData.phone} 
              onChange={handleChange}
              className={`${formErrors.phone ? 'border-red-500' : ''}`}
              required
            />
            {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
          </div>
        </div>
        
        <Textarea 
          name="message"
          placeholder="O que você gostaria de saber sobre seu diagnóstico?" 
          value={formData.message} 
          onChange={handleChange}
          rows={3}
        />
        
        <div className="text-center pt-2">
          <Button 
            type="submit" 
            className="bg-growth-orange hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-md h-auto w-full md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin mr-2" size={16} />
                Processando...
              </>
            ) : (
              <>
                <Mail className="mr-2" size={16} />
                Agendar Consultoria Gratuita
              </>
            )}
          </Button>
        </div>
        
        <div className="text-center text-xs text-gray-500 mt-2">
          * Campos obrigatórios
        </div>
      </form>
    </div>
  );
};

export default ConsultationCTA;
