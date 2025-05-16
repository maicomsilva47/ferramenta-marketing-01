
import { DiagnosticPillar } from '@/types/diagnostic';
import { Resource } from '@/components/diagnostic-results/ResourcesList';

// Add evaluationLabels export
export const evaluationLabels: Record<string, string> = {
  high: 'Acelerando',
  medium: 'Em Desenvolvimento',
  low: 'Crítico'
};

export const pillarNames: Record<DiagnosticPillar, string> = {
  'revenue-strategy': 'Estratégia',
  'value-proposition': 'Proposta de Valor',
  'commercial-intelligence': 'Inteligência Comercial',
  'prospecting': 'Prospecção',
  'conversion': 'Conversão',
  'retention': 'Retenção',
  'tools': 'Ferramentas'
};

export const pillarFeedbacks: Record<DiagnosticPillar, Record<string, { title: string; paragraphs: string[] }>> = {
  'revenue-strategy': {
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
  'value-proposition': {
    low: {
      title: "Proposta de Valor Urgente",
      paragraphs: [
        "Sua proposta de valor atual não está claramente definida ou comunicada, resultando em dificuldades para diferenciar sua oferta no mercado.",
        "Trabalhe na articulação clara do problema que você resolve e por que sua solução é única e valiosa para seus clientes ideais."
      ]
    },
    medium: {
      title: "Proposta de Valor em Desenvolvimento",
      paragraphs: [
        "Sua proposta de valor tem potencial, mas precisa ser mais claramente comunicada e diferenciada.",
        "Continue refinando sua mensagem para garantir que ela ressoe com seu público-alvo e se destaque da concorrência."
      ]
    },
    high: {
      title: "Proposta de Valor Acelerada",
      paragraphs: [
        "Sua proposta de valor é clara, convincente e altamente diferenciada no mercado.",
        "Continue monitorando as mudanças no mercado e nas necessidades dos clientes para garantir que sua proposta de valor permaneça relevante e impactante."
      ]
    }
  },
  'commercial-intelligence': {
    low: {
      title: "Inteligência Comercial Urgente",
      paragraphs: [
        "Sua abordagem atual para coletar e usar dados comerciais é insuficiente, resultando em decisões baseadas em intuição em vez de fatos.",
        "Estabeleça processos para coletar, analisar e agir com base em dados de vendas, desempenho do mercado e feedback dos clientes."
      ]
    },
    medium: {
      title: "Inteligência Comercial em Desenvolvimento",
      paragraphs: [
        "Você está começando a usar dados para informar suas decisões comerciais, mas ainda há oportunidades significativas para melhorar.",
        "Invista em ferramentas e treinamento para análise de dados mais avançada e use esses insights para otimizar seu processo de vendas."
      ]
    },
    high: {
      title: "Inteligência Comercial Acelerada",
      paragraphs: [
        "Sua empresa utiliza dados de forma eficaz para informar decisões comerciais e identificar oportunidades de crescimento.",
        "Continue refinando seus processos de análise e considere integrar tecnologias avançadas como IA para obter insights ainda mais valiosos."
      ]
    }
  },
  'prospecting': {
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
  'conversion': {
    low: {
      title: "Conversão Urgente",
      paragraphs: [
        "Seu processo de conversão de leads em clientes está falhando, com taxas de conversão significativamente abaixo do ideal.",
        "Revise seu processo de vendas para identificar gargalos e desenvolva uma abordagem estruturada para nutrir e converter leads."
      ]
    },
    medium: {
      title: "Conversão em Desenvolvimento",
      paragraphs: [
        "Suas taxas de conversão são razoáveis, mas há espaço significativo para melhoria.",
        "Concentre-se em refinar suas técnicas de qualificação de leads e aprimorar suas habilidades de negociação e fechamento."
      ]
    },
    high: {
      title: "Conversão Acelerada",
      paragraphs: [
        "Seu processo de conversão é altamente eficaz, resultando em taxas de fechamento acima da média do setor.",
        "Continue afinando sua abordagem e compartilhe as melhores práticas entre sua equipe para manter esse alto nível de desempenho."
      ]
    }
  },
  'retention': {
    low: {
      title: "Retenção Urgente",
      paragraphs: [
        "Você está perdendo clientes em um ritmo alarmante, indicando problemas significativos com seu produto, serviço ou suporte ao cliente.",
        "Priorize a compreensão dos motivos pelos quais os clientes estão saindo e desenvolva um plano de ação para abordar esses problemas fundamentais."
      ]
    },
    medium: {
      title: "Retenção em Desenvolvimento",
      paragraphs: [
        "Sua retenção de clientes está na média, mas você poderia fazer mais para construir relacionamentos duradouros e aumentar o valor do cliente ao longo do tempo.",
        "Desenvolva programas de fidelidade e estratégias de upsell/cross-sell para fortalecer seus relacionamentos com os clientes."
      ]
    },
    high: {
      title: "Retenção Acelerada",
      paragraphs: [
        "Sua empresa excele em manter clientes e maximizar seu valor ao longo do tempo.",
        "Continue investindo em excelente atendimento ao cliente e encontrando novas maneiras de agregar valor aos seus relacionamentos existentes."
      ]
    }
  },
  'tools': {
    low: {
      title: "Ferramentas Urgente",
      paragraphs: [
        "Sua equipe carece das ferramentas necessárias para vender eficientemente, resultando em processos manuais e ineficientes.",
        "Investir em tecnologia básica de vendas, como um CRM, pode melhorar significativamente sua produtividade e resultados."
      ]
    },
    medium: {
      title: "Ferramentas em Desenvolvimento",
      paragraphs: [
        "Você possui ferramentas básicas de vendas, mas não está aproveitando todo o seu potencial ou está faltando tecnologia em áreas-chave.",
        "Considere adicionar ferramentas especializadas para áreas como automação de marketing, inteligência de vendas ou gerenciamento de pipeline."
      ]
    },
    high: {
      title: "Ferramentas Aceleradas",
      paragraphs: [
        "Sua empresa está bem equipada com tecnologia de vendas avançada e sua equipe está aproveitando efetivamente essas ferramentas.",
        "Continue avaliando novas tecnologias que possam oferecer vantagens competitivas adicionais."
      ]
    }
  }
};

export const pillarIcons: Record<DiagnosticPillar, string> = {
  'revenue-strategy': '🎯',
  'value-proposition': '💰',
  'commercial-intelligence': '📊',
  'prospecting': '🔍',
  'conversion': '🔄',
  'retention': '🤝',
  'tools': '🛠️'
};

// Add diagnostic questions with correct OptionValue types
export const diagnosticQuestions = [
  {
    id: "q1",
    text: "Como você avalia a clareza da sua estratégia de receita?",
    options: [
      { 
        label: "Não temos uma estratégia clara", 
        value: "low" as const, // Using 'as const' to ensure TypeScript knows this is a literal type
        feedback: "A falta de estratégia clara afeta diretamente seus resultados",
        score: 1 
      },
      { 
        label: "Temos alguma estratégia, mas não está bem documentada", 
        value: "medium" as const,
        feedback: "Uma estratégia parcial é um começo, mas precisa ser aprimorada",
        score: 2 
      },
      { 
        label: "Nossa estratégia é clara e bem documentada", 
        value: "high" as const,
        feedback: "Excelente! Uma estratégia clara é fundamental para o sucesso",
        score: 4 
      }
    ],
    pillar: "revenue-strategy" as DiagnosticPillar
  },
  {
    id: "q2",
    text: "Como você descreve sua proposta de valor para os clientes?",
    options: [
      { 
        label: "Temos dificuldade em articular nossa proposta de valor", 
        value: "low" as const,
        feedback: "Definir claramente sua proposta de valor é essencial",
        score: 1 
      },
      { 
        label: "Temos uma proposta de valor, mas nem todos conseguem explicá-la", 
        value: "medium" as const,
        feedback: "Uma proposta de valor consistente deve ser compreendida por todos",
        score: 2 
      },
      { 
        label: "Nossa proposta de valor é clara e todos na empresa sabem comunicá-la", 
        value: "high" as const,
        feedback: "Excelente! Isso dá uma vantagem competitiva significativa",
        score: 4 
      }
    ],
    pillar: "value-proposition" as DiagnosticPillar
  },
  // Adicionando mais perguntas para cada pilar
  {
    id: "q3",
    text: "Como você avalia a qualidade dos dados comerciais que você coleta?",
    options: [
      { 
        label: "Coletamos poucos ou nenhum dado relevante", 
        value: "low" as const,
        feedback: "A falta de dados prejudica suas decisões comerciais",
        score: 1 
      },
      { 
        label: "Coletamos alguns dados, mas não os utilizamos efetivamente", 
        value: "medium" as const,
        feedback: "É importante não apenas coletar dados, mas também analisá-los",
        score: 2 
      },
      { 
        label: "Coletamos e utilizamos dados de forma estratégica", 
        value: "high" as const,
        feedback: "Excelente! Decisões baseadas em dados são mais eficazes",
        score: 4 
      }
    ],
    pillar: "commercial-intelligence" as DiagnosticPillar
  },
  {
    id: "q4",
    text: "Como é o processo de prospecção de novos clientes na sua empresa?",
    options: [
      { 
        label: "Não temos um processo consistente de prospecção", 
        value: "low" as const,
        feedback: "A falta de um processo estruturado limita seu crescimento",
        score: 1 
      },
      { 
        label: "Temos um processo básico, mas não é muito eficiente", 
        value: "medium" as const,
        feedback: "Seu processo pode ser aprimorado para gerar melhores resultados",
        score: 2 
      },
      { 
        label: "Nosso processo de prospecção é bem definido e eficaz", 
        value: "high" as const,
        feedback: "Parabéns! Um processo eficaz de prospecção é fundamental",
        score: 4 
      }
    ],
    pillar: "prospecting" as DiagnosticPillar
  },
  {
    id: "q5",
    text: "Como você avalia sua taxa de conversão de leads em clientes?",
    options: [
      { 
        label: "Nossa taxa de conversão é baixa comparada ao mercado", 
        value: "low" as const,
        feedback: "Melhorar sua conversão pode trazer resultados rápidos",
        score: 1 
      },
      { 
        label: "Nossa taxa de conversão é razoável, mas poderia melhorar", 
        value: "medium" as const,
        feedback: "Há oportunidades para otimizar seu processo de conversão",
        score: 2 
      },
      { 
        label: "Nossa taxa de conversão é alta e consistente", 
        value: "high" as const,
        feedback: "Excelente! Sua abordagem de conversão está funcionando bem",
        score: 4 
      }
    ],
    pillar: "conversion" as DiagnosticPillar
  },
  {
    id: "q6",
    text: "Como é a taxa de retenção de clientes na sua empresa?",
    options: [
      { 
        label: "Perdemos clientes com frequência", 
        value: "low" as const,
        feedback: "A alta rotatividade de clientes afeta seu crescimento",
        score: 1 
      },
      { 
        label: "Conseguimos reter alguns clientes, mas perdemos outros", 
        value: "medium" as const,
        feedback: "Há espaço para melhorar sua estratégia de retenção",
        score: 2 
      },
      { 
        label: "Temos alta taxa de retenção e clientes fiéis", 
        value: "high" as const,
        feedback: "Parabéns! Clientes fiéis são a base de um negócio sólido",
        score: 4 
      }
    ],
    pillar: "retention" as DiagnosticPillar
  },
  {
    id: "q7",
    text: "Quão bem equipada é sua equipe com ferramentas de vendas?",
    options: [
      { 
        label: "Usamos poucas ou nenhuma ferramenta especializada", 
        value: "low" as const,
        feedback: "Investir em ferramentas pode aumentar sua produtividade",
        score: 1 
      },
      { 
        label: "Temos algumas ferramentas básicas, mas faltam recursos avançados", 
        value: "medium" as const,
        feedback: "Considere complementar seu stack tecnológico",
        score: 2 
      },
      { 
        label: "Possuímos um conjunto completo de ferramentas modernas", 
        value: "high" as const,
        feedback: "Excelente! Boas ferramentas potencializam sua equipe",
        score: 4 
      }
    ],
    pillar: "tools" as DiagnosticPillar
  }
];

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
      pillars: ['revenue-strategy', 'commercial-intelligence'],
      url: 'https://blog.growthmachine.com.br/o-que-e-sales-model-canvas',
      icon: 'video'
    },
    {
      id: 'prospecting-guide',
      title: 'Guia Essencial da Prospecção',
      description: 'Domine as principais estratégias para uma prospecção eficiente.',
      pillars: ['prospecting'],
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
      pillars: ['retention', 'conversion'],
      url: 'https://lp.growthmachine.com.br/biblia-do-social-selling',
      icon: 'book'
    },
    {
      id: 'kanban-prospect',
      title: 'Template Kanban Prospect',
      description: 'Organize sua prospecção com um template visual inspirado no Kanban.',
      pillars: ['prospecting', 'tools'],
      url: 'https://blog.growthmachine.com.br/o-que-e-kanban-prospect/',
      icon: 'dashboard'
    },
    {
      id: 'cold-mail-template',
      title: 'Template de Cold Mail',
      description: 'Modelos prontos de e-mails frios para gerar mais respostas e oportunidades.',
      pillars: ['prospecting', 'commercial-intelligence'],
      url: 'https://lp.growthmachine.com.br/templates-de-cold-mail',
      icon: 'mail'
    }
  ]
};
