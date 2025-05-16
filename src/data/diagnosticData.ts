import { DiagnosticPillar } from '@/types/diagnostic';
import { Resource } from '@/components/diagnostic-results/ResourcesList';

// Update evaluation labels with new names
export const evaluationLabels: Record<string, string> = {
  high: 'Avançado',
  medium: 'Intermediário',
  low: 'Crítico'
};

export const pillarNames: Record<DiagnosticPillar, string> = {
  'revenue-strategy': 'Estratégia de Receita',
  'value-proposition': 'Proposta de Valor',
  'commercial-intelligence': 'Inteligência Comercial',
  prospecting: 'Prospecção',
  conversion: 'Conversão',
  retention: 'Retenção',
  tools: 'Ferramentas'
};

export const pillarFeedbacks = {
  'revenue-strategy': {
    high: {
      title: "Estratégia de Receita - Avançado",
      paragraphs: [
        "Sua estratégia de receita é bem definida e eficaz, impulsionando o crescimento sustentável.",
        "Continue monitorando e adaptando sua estratégia para manter a vantagem competitiva."
      ],
      actions: [
        "Explore novos mercados e segmentos de clientes.",
        "Invista em inovação para diferenciar sua oferta."
      ]
    },
    medium: {
      title: "Estratégia de Receita - Intermediário",
      paragraphs: [
        "Sua estratégia de receita mostra potencial, mas precisa de ajustes para otimizar o desempenho.",
        "Identifique áreas de melhoria e implemente mudanças incrementais."
      ],
      actions: [
        "Refine sua segmentação de clientes.",
        "Otimize seus preços e modelos de receita."
      ]
    },
    low: {
      title: "Estratégia de Receita - Crítico",
      paragraphs: [
        "Sua estratégia de receita carece de clareza e eficácia, impactando negativamente o crescimento.",
        "Reavalie sua estratégia e implemente mudanças significativas."
      ],
      actions: [
        "Defina metas de receita claras e mensuráveis.",
        "Desenvolva uma proposta de valor diferenciada."
      ]
    }
  },
  'value-proposition': {
    high: {
      title: "Proposta de Valor - Avançado",
      paragraphs: [
        "Sua proposta de valor é clara, atraente e ressoa com seus clientes, gerando alta demanda.",
        "Continue comunicando e reforçando sua proposta de valor em todos os pontos de contato."
      ],
      actions: [
        "Colete feedback contínuo dos clientes para aprimorar sua proposta de valor.",
        "Explore novas formas de agregar valor aos seus clientes."
      ]
    },
    medium: {
      title: "Proposta de Valor - Intermediário",
      paragraphs: [
        "Sua proposta de valor é reconhecida, mas precisa ser mais clara e convincente para atrair mais clientes.",
        "Refine sua mensagem e destaque os benefícios exclusivos que você oferece."
      ],
      actions: [
        "Realize pesquisas de mercado para entender as necessidades dos clientes.",
        "Comunique sua proposta de valor de forma mais eficaz."
      ]
    },
    low: {
      title: "Proposta de Valor - Crítico",
      paragraphs: [
        "Sua proposta de valor é fraca, confusa ou não ressoa com seus clientes, resultando em baixo interesse.",
        "Reavalie sua proposta de valor e crie uma mensagem clara e atraente."
      ],
      actions: [
        "Identifique os problemas que seus clientes enfrentam.",
        "Crie uma solução que resolva esses problemas de forma eficaz."
      ]
    }
  },
  'commercial-intelligence': {
    high: {
      title: "Inteligência Comercial - Avançado",
      paragraphs: [
        "Você possui um profundo conhecimento do mercado, clientes e concorrentes, permitindo decisões estratégicas assertivas.",
        "Continue investindo em inteligência comercial para antecipar tendências e oportunidades."
      ],
      actions: [
        "Monitore continuamente o ambiente de negócios.",
        "Analise dados para identificar padrões e insights."
      ]
    },
    medium: {
      title: "Inteligência Comercial - Intermediário",
      paragraphs: [
        "Você coleta e analisa dados relevantes, mas precisa aprimorar a interpretação e aplicação das informações.",
        "Desenvolva habilidades analíticas e utilize ferramentas de inteligência comercial."
      ],
      actions: [
        "Invista em treinamento para sua equipe.",
        "Implemente um sistema de gestão de informações."
      ]
    },
    low: {
      title: "Inteligência Comercial - Crítico",
      paragraphs: [
        "Você carece de informações e análises confiáveis sobre o mercado, clientes e concorrentes, dificultando a tomada de decisões.",
        "Invista em inteligência comercial para obter insights valiosos."
      ],
      actions: [
        "Realize pesquisas de mercado para coletar dados.",
        "Analise os dados para identificar oportunidades e ameaças."
      ]
    }
  },
  'prospecting': {
    high: {
      title: "Prospecção - Avançado",
      paragraphs: [
        "Sua prospecção é eficiente e gera um fluxo constante de leads qualificados, impulsionando o crescimento das vendas.",
        "Continue otimizando suas estratégias de prospecção para maximizar os resultados."
      ],
      actions: [
        "Explore novos canais de prospecção.",
        "Personalize suas mensagens para cada lead."
      ]
    },
    medium: {
      title: "Prospecção - Intermediário",
      paragraphs: [
        "Sua prospecção gera leads, mas precisa melhorar a qualificação e o direcionamento para aumentar a taxa de conversão.",
        "Refine seus critérios de qualificação e personalize suas mensagens."
      ],
      actions: [
        "Defina um perfil de cliente ideal.",
        "Utilize ferramentas de automação de marketing."
      ]
    },
    low: {
      title: "Prospecção - Crítico",
      paragraphs: [
        "Sua prospecção é ineficaz e não gera leads qualificados, impactando negativamente as vendas.",
        "Reavalie suas estratégias de prospecção e implemente mudanças significativas."
      ],
      actions: [
        "Defina metas de prospecção claras e mensuráveis.",
        "Invista em treinamento para sua equipe de vendas."
      ]
    }
  },
  'conversion': {
    high: {
      title: "Conversão - Avançado",
      paragraphs: [
        "Seu processo de conversão é otimizado e resulta em altas taxas de fechamento, maximizando o retorno sobre o investimento.",
        "Continue monitorando e aprimorando seu processo de conversão para manter a vantagem competitiva."
      ],
      actions: [
        "Personalize a experiência do cliente.",
        "Ofereça incentivos para fechar o negócio."
      ]
    },
    medium: {
      title: "Conversão - Intermediário",
      paragraphs: [
        "Seu processo de conversão mostra potencial, mas precisa de ajustes para aumentar a taxa de fechamento.",
        "Identifique gargalos e implemente melhorias incrementais."
      ],
      actions: [
        "Qualifique os leads antes de direcioná-los para a equipe de vendas.",
        "Utilize técnicas de persuasão para influenciar a decisão de compra."
      ]
    },
    low: {
      title: "Conversão - Crítico",
      paragraphs: [
        "Seu processo de conversão é ineficaz e resulta em baixas taxas de fechamento, desperdiçando oportunidades de venda.",
        "Reavalie seu processo de conversão e implemente mudanças significativas."
      ],
      actions: [
        "Mapeie o processo de compra do cliente.",
        "Crie um funil de vendas claro e definido."
      ]
    }
  },
  'retention': {
    high: {
      title: "Retenção - Avançado",
      paragraphs: [
        "Você possui um forte relacionamento com seus clientes, resultando em alta fidelização e recompra, gerando receita recorrente.",
        "Continue investindo em programas de fidelidade e atendimento ao cliente para fortalecer o relacionamento."
      ],
      actions: [
        "Ofereça benefícios exclusivos para clientes fiéis.",
        "Crie uma comunidade online para seus clientes."
      ]
    },
    medium: {
      title: "Retenção - Intermediário",
      paragraphs: [
        "Você mantém um bom relacionamento com seus clientes, mas precisa implementar estratégias para aumentar a fidelização e recompra.",
        "Crie programas de fidelidade e ofereça um atendimento ao cliente diferenciado."
      ],
      actions: [
        "Colete feedback dos clientes para identificar áreas de melhoria.",
        "Personalize a comunicação com seus clientes."
      ]
    },
    low: {
      title: "Retenção - Crítico",
      paragraphs: [
        "Você enfrenta dificuldades em manter seus clientes satisfeitos e fiéis, resultando em alta taxa de churn e perda de receita.",
        "Reavalie suas estratégias de retenção e implemente mudanças significativas."
      ],
      actions: [
        "Identifique os motivos da perda de clientes.",
        "Crie um plano de ação para reduzir o churn."
      ]
    }
  },
  'tools': {
    high: {
      title: "Ferramentas - Avançado",
      paragraphs: [
        "Você utiliza as ferramentas certas para otimizar seus processos de vendas e marketing, impulsionando a eficiência e os resultados.",
        "Continue investindo em novas tecnologias e treinando sua equipe para maximizar o uso das ferramentas."
      ],
      actions: [
        "Explore novas ferramentas e tecnologias.",
        "Integre suas ferramentas para otimizar o fluxo de trabalho."
      ]
    },
    medium: {
      title: "Ferramentas - Intermediário",
      paragraphs: [
        "Você utiliza algumas ferramentas, mas precisa aprimorar a seleção, implementação e uso para otimizar seus processos.",
        "Invista em treinamento e consultoria para garantir o uso eficaz das ferramentas."
      ],
      actions: [
        "Avalie suas necessidades e selecione as ferramentas adequadas.",
        "Implemente um plano de treinamento para sua equipe."
      ]
    },
    low: {
      title: "Ferramentas - Crítico",
      paragraphs: [
        "Você não utiliza as ferramentas adequadas ou não as utiliza de forma eficaz, impactando negativamente a eficiência e os resultados.",
        "Invista em ferramentas e treinamento para otimizar seus processos."
      ],
      actions: [
        "Mapeie seus processos e identifique as áreas que podem ser otimizadas com ferramentas.",
        "Selecione as ferramentas que atendam às suas necessidades."
      ]
    }
  }
};

export const pillarIcons: Record<DiagnosticPillar, string> = {
  'revenue-strategy': '💰',
  'value-proposition': '🎁',
  'commercial-intelligence': '🧠',
  'prospecting': '🎯',
  'conversion': '🤝',
  'retention': '❤️',
  'tools': '🛠️'
};

export const diagnosticQuestions = [
  {
    id: 'revenue-strategy-1',
    text: 'Nossa estratégia de receita é claramente definida e comunicada a todos os membros da equipe?',
    options: [
      { label: 'Discordo totalmente', value: 1, feedback: 'Uma estratégia de receita clara é fundamental para o sucesso.', score: 1 },
      { label: 'Discordo parcialmente', value: 2, feedback: 'Considere refinar sua estratégia de receita e comunicá-la de forma mais eficaz.', score: 2 },
      { label: 'Concordo parcialmente', value: 3, feedback: 'Continue aprimorando sua estratégia de receita e garantindo que todos a compreendam.', score: 3 },
      { label: 'Concordo totalmente', value: 4, feedback: 'Excelente! Uma estratégia de receita clara é um grande trunfo.', score: 4 }
    ],
    pillar: 'revenue-strategy'
  },
  {
    id: 'revenue-strategy-2',
    text: 'Nós revisamos e atualizamos nossa estratégia de receita regularmente com base nas mudanças do mercado e no feedback dos clientes?',
    options: [
      { label: 'Discordo totalmente', value: 1, feedback: 'A adaptação é crucial em um mercado em constante mudança.', score: 1 },
      { label: 'Discordo parcialmente', value: 2, feedback: 'Considere revisar sua estratégia de receita com mais frequência.', score: 2 },
      { label: 'Concordo parcialmente', value: 3, feedback: 'Continue monitorando o mercado e adaptando sua estratégia de receita.', score: 3 },
      { label: 'Concordo totalmente', value: 4, feedback: 'Ótimo! A adaptação contínua garante relevância e sucesso.', score: 4 }
    ],
    pillar: 'revenue-strategy'
  },
  {
    id: 'value-proposition-1',
    text: 'Nossa proposta de valor é clara, concisa e convincente para nossos clientes?',
    options: [
      { label: 'Discordo totalmente', value: 1, feedback: 'Uma proposta de valor clara é essencial para atrair clientes.', score: 1 },
      { label: 'Discordo parcialmente', value: 2, feedback: 'Considere refinar sua proposta de valor e torná-la mais atraente.', score: 2 },
      { label: 'Concordo parcialmente', value: 3, feedback: 'Continue aprimorando sua proposta de valor e garantindo que ela ressoe com seus clientes.', score: 3 },
      { label: 'Concordo totalmente', value: 4, feedback: 'Excelente! Uma proposta de valor clara é um grande diferencial.', score: 4 }
    ],
    pillar: 'value-proposition'
  },
  {
    id: 'value-proposition-2',
    text: 'Nós comunicamos nossa proposta de valor de forma eficaz em todos os nossos canais de marketing e vendas?',
    options: [
      { label: 'Discordo totalmente', value: 1, feedback: 'A comunicação eficaz da proposta de valor é crucial para o sucesso.', score: 1 },
      { label: 'Discordo parcialmente', value: 2, feedback: 'Considere melhorar a comunicação da sua proposta de valor em seus canais.', score: 2 },
      { label: 'Concordo parcialmente', value: 3, feedback: 'Continue aprimorando a comunicação da sua proposta de valor e garantindo que ela seja consistente.', score: 3 },
      { label: 'Concordo totalmente', value: 4, feedback: 'Ótimo! A comunicação eficaz da proposta de valor garante que ela seja compreendida e valorizada.', score: 4 }
    ],
    pillar: 'value-proposition'
  },
  {
    id: 'commercial-intelligence-1',
    text: 'Nós coletamos e analisamos dados de mercado, clientes e concorrentes para tomar decisões estratégicas?',
    options: [
      { label: 'Discordo totalmente', value: 1, feedback: 'A inteligência comercial é fundamental para tomar decisões informadas.', score: 1 },
      { label: 'Discordo parcialmente', value: 2, feedback: 'Considere investir em inteligência comercial para obter insights valiosos.', score: 2 },
      { label: 'Concordo parcialmente', value: 3, feedback: 'Continue aprimorando sua inteligência comercial e garantindo que ela seja utilizada para tomar decisões.', score: 3 },
      { label: 'Concordo totalmente', value: 4, feedback: 'Excelente! A inteligência comercial garante que suas decisões sejam baseadas em dados e insights.', score: 4 }
    ],
    pillar: 'commercial-intelligence'
  },
  {
    id: 'commercial-intelligence-2',
    text: 'Nós utilizamos ferramentas de CRM e análise de dados para monitorar o desempenho de nossas campanhas de marketing e vendas?',
    options: [
      { label: 'Discordo totalmente', value: 1, feedback: 'As ferramentas de CRM e análise de dados são essenciais para monitorar o desempenho.', score: 1 },
      { label: 'Discordo parcialmente', value: 2, feedback: 'Considere implementar ferramentas de CRM e análise de dados para monitorar o desempenho.', score: 2 },
      { label: 'Concordo parcialmente', value: 3, feedback: 'Continue aprimorando o uso de suas ferramentas de CRM e análise de dados.', score: 3 },
      { label: 'Concordo totalmente', value: 4, feedback: 'Ótimo! As ferramentas de CRM e análise de dados garantem que você esteja monitorando o desempenho e tomando decisões informadas.', score: 4 }
    ],
    pillar: 'commercial-intelligence'
  },
  {
    id: 'prospecting-1',
    text: 'Nós temos um processo de prospecção bem definido e documentado?',
    options: [
      { label: 'Discordo totalmente', value: 1, feedback: 'Um processo de prospecção bem definido é crucial para o sucesso.', score: 1 },
      { label: 'Discordo parcialmente', value: 2, feedback: 'Considere definir e documentar seu processo de prospecção.', score: 2 },
      { label: 'Concordo parcialmente', value: 3, feedback: 'Continue aprimorando seu processo de prospecção e garantindo que ele seja seguido por todos.', score: 3 },
      { label: 'Concordo totalmente', value: 4, feedback: 'Excelente! Um processo de prospecção bem definido garante que você esteja gerando leads de forma consistente.', score: 4 }
    ],
    pillar: 'prospecting'
  },
  {
    id: 'prospecting-2',
    text: 'Nós utilizamos diferentes canais de prospecção para alcançar nosso público-alvo?',
    options: [
      { label: 'Discordo totalmente', value: 1, feedback: 'A diversificação dos canais de prospecção é importante para alcançar o público-alvo.', score: 1 },
      { label: 'Discordo parcialmente', value: 2, feedback: 'Considere diversificar seus canais de prospecção.', score: 2 },
      { label: 'Concordo parcialmente', value: 3, feedback: 'Continue aprimorando seus canais de prospecção e garantindo que você esteja alcançando seu público-alvo.', score: 3 },
      { label: 'Concordo totalmente', value: 4, feedback: 'Ótimo! A diversificação dos canais de prospecção garante que você esteja alcançando seu público-alvo de forma eficaz.', score: 4 }
    ],
    pillar: 'prospecting'
  },
  {
    id: 'conversion-1',
    text: 'Nosso processo de vendas é otimizado para converter leads em clientes?',
    options: [
      { label: 'Discordo totalmente', value: 1, feedback: 'Um processo de vendas otimizado é crucial para o sucesso.', score: 1 },
      { label: 'Discordo parcialmente', value: 2, feedback: 'Considere otimizar seu processo de vendas para converter leads em clientes.', score: 2 },
      { label: 'Concordo parcialmente', value: 3, feedback: 'Continue aprimorando seu processo de vendas e garantindo que ele seja eficaz.', score: 3 },
      { label: 'Concordo totalmente', value: 4, feedback: 'Excelente! Um processo de vendas otimizado garante que você esteja convertendo leads em clientes de forma eficaz.', score: 4 }
    ],
    pillar: 'conversion'
  },
  {
    id: 'conversion-2',
    text: 'Nós utilizamos técnicas de persuasão e negociação para fechar negócios?',
    options: [
      { label: 'Discordo totalmente', value: 1, feedback: 'As técnicas de persuasão e negociação são importantes para fechar negócios.', score: 1 },
      { label: 'Discordo parcialmente', value: 2, feedback: 'Considere investir em treinamento em técnicas de persuasão e negociação.', score: 2 },
      { label: 'Concordo parcialmente', value: 3, feedback: 'Continue aprimorando suas técnicas de persuasão e negociação.', score: 3 },
      { label: 'Concordo totalmente', value: 4, feedback: 'Ótimo! As técnicas de persuasão e negociação garantem que você esteja fechando negócios de forma eficaz.', score: 4 }
    ],
    pillar: 'conversion'
  },
  {
    id: 'retention-1',
    text: 'Nós temos um programa de fidelidade para recompensar nossos clientes mais fiéis?',
    options: [
      { label: 'Discordo totalmente', value: 1, feedback: 'Um programa de fidelidade é importante para recompensar os clientes fiéis.', score: 1 },
      { label: 'Discordo parcialmente', value: 2, feedback: 'Considere implementar um programa de fidelidade.', score: 2 },
      { label: 'Concordo parcialmente', value: 3, feedback: 'Continue aprimorando seu programa de fidelidade.', score: 3 },
      { label: 'Concordo totalmente', value: 4, feedback: 'Excelente! Um programa de fidelidade garante que você esteja recompensando seus clientes fiéis.', score: 4 }
    ],
    pillar: 'retention'
  },
  {
    id: 'retention-2',
    text: 'Nós coletamos feedback dos clientes regularmente para melhorar nossos produtos e serviços?',
    options: [
      { label: 'Discordo totalmente', value: 1, feedback: 'O feedback dos clientes é essencial para melhorar os produtos e serviços.', score: 1 },
      { label: 'Discordo parcialmente', value: 2, feedback: 'Considere coletar feedback dos clientes regularmente.', score: 2 },
      { label: 'Concordo parcialmente', value: 3, feedback: 'Continue aprimorando a coleta de feedback dos clientes.', score: 3 },
      { label: 'Concordo totalmente', value: 4, feedback: 'Ótimo! O feedback dos clientes garante que você esteja melhorando seus produtos e serviços de forma contínua.', score: 4 }
    ],
    pillar: 'retention'
  },
  {
    id: 'tools-1',
    text: 'Nós utilizamos as ferramentas de CRM e automação de marketing para otimizar nossos processos de vendas e marketing?',
    options: [
      { label: 'Discordo totalmente', value: 1, feedback: 'As ferramentas de CRM e automação de marketing são essenciais para otimizar os processos.', score: 1 },
      { label: 'Discordo parcialmente', value: 2, feedback: 'Considere implementar ferramentas de CRM e automação de marketing.', score: 2 },
      { label: 'Concordo parcialmente', value: 3, feedback: 'Continue aprimorando o uso de suas ferramentas de CRM e automação de marketing.', score: 3 },
      { label: 'Concordo totalmente', value: 4, feedback: 'Excelente! As ferramentas de CRM e automação de marketing garantem que você esteja otimizando seus processos de forma eficaz.', score: 4 }
    ],
    pillar: 'tools'
  },
  {
    id: 'tools-2',
    text: 'Nossa equipe está treinada para utilizar as ferramentas de vendas e marketing de forma eficaz?',
    options: [
      { label: 'Discordo totalmente', value: 1, feedback: 'O treinamento da equipe é essencial para o uso eficaz das ferramentas.', score: 1 },
      { label: 'Discordo parcialmente', value: 2, feedback: 'Considere investir em treinamento para sua equipe.', score: 2 },
      { label: 'Concordo parcialmente', value: 3, feedback: 'Continue aprimorando o treinamento de sua equipe.', score: 3 },
      { label: 'Concordo totalmente', value: 4, feedback: 'Ótimo! O treinamento da equipe garante que as ferramentas sejam utilizadas de forma eficaz.', score: 4 }
    ],
    pillar: 'tools'
  }
];

export const resources: Resource[] = [
  {
    id: 'ebook-1',
    title: 'Sales Model Canvas',
    description: 'O Sales Model Canvas é uma ferramenta de gestão estratégica que permite analisar e otimizar o modelo de vendas de uma empresa.',
    type: 'ebook',
    url: 'https://blog.growthmachine.com.br/o-que-e-sales-model-canvas',
    pillars: ['revenue-strategy', 'value-proposition', 'commercial-intelligence']
  },
  {
    id: 'ebook-2',
    title: 'Bíblia do Social Selling',
    description: 'A Bíblia do Social Selling é um guia completo para implementar uma estratégia de vendas sociais eficaz.',
    type: 'ebook',
    url: 'https://lp.growthmachine.com.br/biblia-do-social-selling',
    pillars: ['prospecting', 'conversion', 'retention']
  },
  {
    id: 'ebook-3',
    title: 'Guia Essencial da Prospecção',
    description: 'O Guia Essencial da Prospecção é um guia prático para prospectar clientes de forma eficaz.',
    type: 'ebook',
    url: 'https://lp.growthmachine.com.br/guia-da-prospeccao',
    pillars: ['prospecting', 'conversion']
  },
  {
    id: 'course-1',
    title: 'Template Kanban Prospect',
    description: 'O Template Kanban Prospect é uma ferramenta para organizar e gerenciar seus leads de forma visual.',
    type: 'course',
    url: 'https://blog.growthmachine.com.br/o-que-e-kanban-prospect/',
    pillars: ['prospecting', 'conversion', 'tools']
  },
  {
    id: 'course-2',
    title: 'Template de Cold Mail',
    description: 'O Template de Cold Mail é um modelo de e-mail para abordar leads de forma eficaz.',
    type: 'course',
    url: 'https://lp.growthmachine.com.br/templates-de-cold-mail',
    pillars: ['prospecting', 'conversion', 'tools']
  },
  {
    id: 'video-1',
    title: 'Como usar o LinkedIn para gerar leads',
    description: 'Aprenda a usar o LinkedIn para gerar leads qualificados para o seu negócio.',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    pillars: ['prospecting', 'tools']
  },
  {
    id: 'video-2',
    title: 'Como criar uma proposta de valor irresistível',
    description: 'Aprenda a criar uma proposta de valor que atraia seus clientes.',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    pillars: ['value-proposition', 'revenue-strategy']
  },
  {
    id: 'article-1',
    title: 'O que é Growth Hacking?',
    description: 'Descubra o que é Growth Hacking e como ele pode ajudar sua empresa a crescer.',
    type: 'article',
    url: 'https://www.growthmachine.com.br/blog/o-que-e-growth-hacking/',
    pillars: ['revenue-strategy', 'commercial-intelligence']
  },
  {
    id: 'article-2',
    title: 'Como criar um funil de vendas eficaz',
    description: 'Aprenda a criar um funil de vendas que gere resultados.',
    type: 'article',
    url: 'https://www.growthmachine.com.br/blog/funil-de-vendas/',
    pillars: ['conversion', 'revenue-strategy']
  }
];
