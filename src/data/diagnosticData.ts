import { DiagnosticPillar } from '@/types/diagnostic';
import { Resource } from '@/components/diagnostic-results/ResourcesList';

export const pillarNames: Record<DiagnosticPillar, string> = {
  strategy: 'Estratégia',
  process: 'Processo',
  prospection: 'Prospecção',
  communication: 'Comunicação',
  relationship: 'Relacionamento',
  reputation: 'Reputação',
};

export const pillarFeedbacks: Record<DiagnosticPillar, Record<string, { title: string; paragraphs: string[] }>> = {
  strategy: {
    low: {
      title: "Estratégia Urgente",
      paragraphs: [
        "Sua estratégia de vendas atual carece de clareza e direção. É crucial definir metas realistas e um plano de ação detalhado para alcançá-las. Sem uma estratégia sólida, seus esforços de vendas podem ser dispersos e ineficazes.",
        "Considere investir tempo na análise do seu mercado-alvo, na definição de seus diferenciais competitivos e na criação de um plano de vendas que impulsione o crescimento sustentável."
      ]
    },
    medium: {
      title: "Estratégia em Desenvolvimento",
      paragraphs: [
        "Sua estratégia de vendas mostra potencial, mas ainda precisa de refinamentos para atingir todo o seu potencial. É importante monitorar de perto seus resultados e ajustar sua abordagem conforme necessário.",
        "Explore novas táticas e tecnologias para otimizar seu processo de vendas e garantir que você esteja sempre um passo à frente da concorrência."
      ]
    },
    high: {
      title: "Estratégia Acelerada",
      paragraphs: [
        "Sua estratégia de vendas está bem definida e implementada, impulsionando o crescimento e o sucesso de sua empresa. Continue monitorando seus resultados e buscando oportunidades de melhoria contínua.",
        "Compartilhe suas melhores práticas com sua equipe e incentive a inovação para manter sua vantagem competitiva."
      ]
    }
  },
  process: {
    low: {
      title: "Processo Urgente",
      paragraphs: [
        "Seu processo de vendas atual é ineficiente e inconsistente, resultando em oportunidades perdidas e frustração da equipe. É crucial mapear e otimizar seu processo de vendas para garantir que cada etapa seja executada de forma eficaz.",
        "Invista em treinamento e ferramentas para capacitar sua equipe a seguir o processo de vendas de forma consistente e a alcançar melhores resultados."
      ]
    },
    medium: {
      title: "Processo em Desenvolvimento",
      paragraphs: [
        "Seu processo de vendas mostra potencial, mas ainda precisa de refinamentos para garantir a consistência e a eficiência. É importante monitorar de perto seus resultados e ajustar seu processo conforme necessário.",
        "Considere implementar um sistema de CRM para rastrear e gerenciar suas oportunidades de vendas de forma mais eficaz."
      ]
    },
    high: {
      title: "Processo Acelerado",
      paragraphs: [
        "Seu processo de vendas está bem definido e implementado, garantindo a consistência e a eficiência em todas as etapas. Continue monitorando seus resultados e buscando oportunidades de melhoria contínua.",
        "Automatize tarefas repetitivas e invista em tecnologia para liberar sua equipe para se concentrar em atividades de maior valor agregado."
      ]
    }
  },
  prospection: {
    low: {
      title: "Prospecção Urgente",
      paragraphs: [
        "Sua prospecção de clientes atual é ineficaz e inconsistente, resultando em um pipeline de vendas fraco e oportunidades perdidas. É crucial diversificar suas fontes de leads e implementar estratégias de prospecção mais eficazes.",
        "Invista em pesquisa de mercado e segmentação de clientes para identificar seus clientes ideais e direcionar seus esforços de prospecção de forma mais eficaz."
      ]
    },
    medium: {
      title: "Prospecção em Desenvolvimento",
      paragraphs: [
        "Sua prospecção de clientes mostra potencial, mas ainda precisa de refinamentos para garantir um fluxo constante de leads qualificados. É importante monitorar de perto seus resultados e ajustar suas estratégias de prospecção conforme necessário.",
        "Considere investir em marketing de conteúdo e SEO para atrair leads organicamente e aumentar sua visibilidade online."
      ]
    },
    high: {
      title: "Prospecção Acelerada",
      paragraphs: [
        "Sua prospecção de clientes está bem definida e implementada, garantindo um fluxo constante de leads qualificados para sua equipe de vendas. Continue monitorando seus resultados e buscando oportunidades de melhoria contínua.",
        "Explore novas tecnologias e canais de prospecção para alcançar um público ainda maior e aumentar sua taxa de conversão."
      ]
    }
  },
  communication: {
    low: {
      title: "Comunicação Urgente",
      paragraphs: [
        "Sua comunicação com os clientes é ineficaz e inconsistente, resultando em mal-entendidos e oportunidades perdidas. É crucial aprimorar suas habilidades de comunicação e adaptar sua mensagem para cada cliente.",
        "Invista em treinamento de comunicação para sua equipe e crie modelos de e-mail e scripts de vendas para garantir a consistência e a eficácia de sua mensagem."
      ]
    },
    medium: {
      title: "Comunicação em Desenvolvimento",
      paragraphs: [
        "Sua comunicação com os clientes mostra potencial, mas ainda precisa de refinamentos para garantir a clareza e a persuasão. É importante monitorar de perto seus resultados e ajustar sua abordagem de comunicação conforme necessário.",
        "Considere usar ferramentas de análise de comunicação para avaliar o impacto de sua mensagem e identificar áreas de melhoria."
      ]
    },
    high: {
      title: "Comunicação Acelerada",
      paragraphs: [
        "Sua comunicação com os clientes é clara, persuasiva e adaptada às necessidades de cada cliente, resultando em relacionamentos fortes e duradouros. Continue monitorando seus resultados e buscando oportunidades de melhoria contínua.",
        "Incentive o feedback dos clientes e use-o para aprimorar sua comunicação e garantir que você esteja sempre atendendo às suas expectativas."
      ]
    }
  },
  relationship: {
    low: {
      title: "Relacionamento Urgente",
      paragraphs: [
        "Seu relacionamento com os clientes é fraco e superficial, resultando em baixa fidelização e oportunidades perdidas de upselling e cross-selling. É crucial investir na construção de relacionamentos fortes e duradouros com seus clientes.",
        "Implemente um programa de fidelidade e ofereça um atendimento personalizado para mostrar aos seus clientes que você se importa com eles."
      ]
    },
    medium: {
      title: "Relacionamento em Desenvolvimento",
      paragraphs: [
        "Seu relacionamento com os clientes mostra potencial, mas ainda precisa de refinamentos para garantir a fidelização e o engajamento a longo prazo. É importante monitorar de perto seus resultados e ajustar sua abordagem de relacionamento conforme necessário.",
        "Considere usar ferramentas de CRM para rastrear e gerenciar suas interações com os clientes e garantir que você esteja sempre oferecendo um atendimento relevante e oportuno."
      ]
    },
    high: {
      title: "Relacionamento Acelerado",
      paragraphs: [
        "Seu relacionamento com os clientes é forte, duradouro e baseado na confiança mútua, resultando em alta fidelização e oportunidades de upselling e cross-selling. Continue monitorando seus resultados e buscando oportunidades de melhoria contínua.",
        "Incentive o feedback dos clientes e use-o para aprimorar seus produtos e serviços e garantir que você esteja sempre atendendo às suas necessidades."
      ]
    }
  },
  reputation: {
    low: {
      title: "Reputação Urgente",
      paragraphs: [
        "Sua reputação online é fraca e inconsistente, resultando em desconfiança dos clientes e oportunidades perdidas. É crucial monitorar sua reputação online e implementar estratégias para melhorá-la.",
        "Invista em marketing de conteúdo e SEO para aumentar sua visibilidade online e compartilhe depoimentos e estudos de caso para construir confiança com seus clientes."
      ]
    },
    medium: {
      title: "Reputação em Desenvolvimento",
      paragraphs: [
        "Sua reputação online mostra potencial, mas ainda precisa de refinamentos para garantir a confiança e o engajamento dos clientes. É importante monitorar de perto seus resultados e ajustar suas estratégias de reputação conforme necessário.",
        "Considere usar ferramentas de monitoramento de mídia social para rastrear menções à sua marca e responder a comentários e avaliações de forma oportuna."
      ]
    },
    high: {
      title: "Reputação Acelerada",
      paragraphs: [
        "Sua reputação online é forte, consistente e baseada na confiança dos clientes, resultando em alta credibilidade e oportunidades de crescimento. Continue monitorando seus resultados e buscando oportunidades de melhoria contínua.",
        "Incentive seus clientes a deixar avaliações e depoimentos online e use-os para promover sua marca e atrair novos clientes."
      ]
    }
  }
};

export const pillarIcons: Record<DiagnosticPillar, string> = {
  strategy: '🎯',
  process: '⚙️',
  prospection: '🔍',
  communication: '💬',
  relationship: '🤝',
  reputation: '🌟',
};

export const resources: {
  videos: Resource[];
  podcasts: Resource[];
  articles: Resource[];
} = {
  videos: [
    {
      id: 'sales-model-canvas',
      title: 'Sales Model Canvas',
      description: 'Aprenda a estruturar seu modelo de vendas de forma visual e estratégica.',
      pillars: ['process', 'strategy'],
      url: 'https://blog.growthmachine.com.br/o-que-e-sales-model-canvas',
      icon: 'video'
    },
    {
      id: 'prospecting-guide',
      title: 'Guia Essencial da Prospecção',
      description: 'Domine as principais estratégias para uma prospecção eficiente.',
      pillars: ['prospection'],
      url: 'https://lp.growthmachine.com.br/guia-da-prospeccao',
      icon: 'video'
    }
  ],
  podcasts: [],
  articles: [
    {
      id: 'social-selling-bible',
      title: 'Bíblia do Social Selling',
      description: 'Tudo o que você precisa saber para vender com inteligência nas redes sociais.',
      pillars: ['relationship', 'reputation'],
      url: 'https://lp.growthmachine.com.br/biblia-do-social-selling',
      icon: 'book'
    },
    {
      id: 'kanban-prospect',
      title: 'Template Kanban Prospect',
      description: 'Organize sua prospecção com um template visual inspirado no Kanban.',
      pillars: ['prospection', 'process'],
      url: 'https://blog.growthmachine.com.br/o-que-e-kanban-prospect/',
      icon: 'dashboard'
    },
    {
      id: 'cold-mail-template',
      title: 'Template de Cold Mail',
      description: 'Modelos prontos de e-mails frios para gerar mais respostas e oportunidades.',
      pillars: ['communication', 'prospection'],
      url: 'https://lp.growthmachine.com.br/templates-de-cold-mail',
      icon: 'mail'
    }
  ]
};
