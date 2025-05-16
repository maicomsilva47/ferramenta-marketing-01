import { DiagnosticPillar, PillarFeedbacks } from '@/types/diagnostic';
import { Resource } from '@/components/diagnostic-results/ResourcesList';

// Adicionar labels de avaliação (Crítico, Intermediário, Avançado)
export const evaluationLabels: Record<string, string> = {
  high: 'Avançado',
  medium: 'Intermediário',
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

export const pillarFeedbacks: PillarFeedbacks = {
  'revenue-strategy': {
    high: {
      title: "Estratégia de Receita",
      paragraphs: [
        "Sua estratégia de receita é bem definida e está alinhada com seus objetivos de crescimento. Você tem uma compreensão clara de seus mercados-alvo e está investindo em iniciativas que geram resultados positivos."
      ],
      actions: [
        "Continue monitorando seus resultados e ajustando sua estratégia conforme necessário.",
        "Explore novas oportunidades de crescimento, como novos mercados ou produtos.",
        "Invista em tecnologia e automação para melhorar a eficiência de suas operações."
      ]
    },
    medium: {
      title: "Estratégia de Receita",
      paragraphs: [
        "Sua estratégia de receita está em desenvolvimento e precisa de mais foco e clareza. Você pode não ter uma compreensão clara de seus mercados-alvo ou pode não estar investindo em iniciativas que geram resultados positivos."
      ],
      actions: [
        "Defina metas claras de receita e crie um plano de ação para alcançá-las.",
        "Identifique seus mercados-alvo e desenvolva uma proposta de valor que ressoe com eles.",
        "Invista em iniciativas de marketing e vendas que gerem leads qualificados."
      ]
    },
    low: {
      title: "Estratégia de Receita",
      paragraphs: [
        "Sua estratégia de receita é inexistente ou ineficaz. Você não tem uma compreensão clara de seus mercados-alvo e não está investindo em iniciativas que geram resultados positivos."
      ],
      actions: [
        "Comece definindo metas claras de receita e criando um plano de ação para alcançá-las.",
        "Realize pesquisas de mercado para identificar seus mercados-alvo e desenvolver uma proposta de valor que ressoe com eles.",
        "Invista em iniciativas de marketing e vendas que gerem leads qualificados."
      ]
    }
  },
  'value-proposition': {
    high: {
      title: "Proposta de Valor",
      paragraphs: [
        "Sua proposta de valor é clara, concisa e convincente. Você entende as necessidades de seus clientes e oferece uma solução que atende às suas expectativas. Seus clientes estão satisfeitos com seus produtos ou serviços e estão dispostos a recomendá-los a outros."
      ],
      actions: [
        "Continue monitorando a satisfação de seus clientes e ajustando sua proposta de valor conforme necessário.",
        "Explore novas maneiras de agregar valor aos seus clientes, como novos produtos ou serviços.",
        "Invista em marketing e comunicação para promover sua proposta de valor."
      ]
    },
    medium: {
      title: "Proposta de Valor",
      paragraphs: [
        "Sua proposta de valor está em desenvolvimento e precisa de mais clareza e foco. Você pode não ter uma compreensão clara das necessidades de seus clientes ou pode não estar oferecendo uma solução que atenda às suas expectativas."
      ],
      actions: [
        "Realize pesquisas de mercado para entender as necessidades de seus clientes.",
        "Desenvolva uma proposta de valor que seja clara, concisa e convincente.",
        "Comunique sua proposta de valor de forma eficaz aos seus clientes."
      ]
    },
    low: {
      title: "Proposta de Valor",
      paragraphs: [
        "Sua proposta de valor é inexistente ou ineficaz. Você não entende as necessidades de seus clientes e não está oferecendo uma solução que atenda às suas expectativas."
      ],
      actions: [
        "Comece realizando pesquisas de mercado para entender as necessidades de seus clientes.",
        "Desenvolva uma proposta de valor que seja clara, concisa e convincente.",
        "Comunique sua proposta de valor de forma eficaz aos seus clientes."
      ]
    }
  },
  'commercial-intelligence': {
    high: {
      title: "Inteligência Comercial",
      paragraphs: [
        "Sua inteligência comercial é excelente. Você coleta e analisa dados de forma eficaz para tomar decisões estratégicas. Você tem uma compreensão clara de seus concorrentes e está usando essas informações para obter uma vantagem competitiva."
      ],
      actions: [
        "Continue monitorando seus concorrentes e ajustando sua estratégia conforme necessário.",
        "Explore novas fontes de dados para obter insights ainda mais profundos.",
        "Invista em tecnologia e automação para melhorar a eficiência de sua inteligência comercial."
      ]
    },
    medium: {
      title: "Inteligência Comercial",
      paragraphs: [
        "Sua inteligência comercial está em desenvolvimento e precisa de mais foco e clareza. Você pode não estar coletando dados suficientes ou pode não estar analisando-os de forma eficaz."
      ],
      actions: [
        "Defina metas claras para sua inteligência comercial.",
        "Identifique as fontes de dados mais relevantes para seus negócios.",
        "Invista em ferramentas e técnicas de análise de dados."
      ]
    },
    low: {
      title: "Inteligência Comercial",
      paragraphs: [
        "Sua inteligência comercial é inexistente ou ineficaz. Você não está coletando dados ou não está analisando-os para tomar decisões estratégicas."
      ],
      actions: [
        "Comece definindo metas claras para sua inteligência comercial.",
        "Identifique as fontes de dados mais relevantes para seus negócios.",
        "Invista em ferramentas e técnicas de análise de dados."
      ]
    }
  },
  'prospecting': {
    high: {
      title: "Prospecção",
      paragraphs: [
        "Sua prospecção é altamente eficaz. Você está gerando leads qualificados de forma consistente e está convertendo esses leads em clientes pagantes. Você tem um processo de prospecção bem definido e está usando as ferramentas e técnicas certas."
      ],
      actions: [
        "Continue monitorando seus resultados de prospecção e ajustando sua estratégia conforme necessário.",
        "Explore novas maneiras de gerar leads qualificados.",
        "Invista em tecnologia e automação para melhorar a eficiência de sua prospecção."
      ]
    },
    medium: {
      title: "Prospecção",
      paragraphs: [
        "Sua prospecção está em desenvolvimento e precisa de mais foco e clareza. Você pode não estar gerando leads qualificados suficientes ou pode não estar convertendo esses leads em clientes pagantes."
      ],
      actions: [
        "Defina metas claras para sua prospecção.",
        "Identifique seus mercados-alvo e desenvolva uma proposta de valor que ressoe com eles.",
        "Invista em ferramentas e técnicas de prospecção."
      ]
    },
    low: {
      title: "Prospecção",
      paragraphs: [
        "Sua prospecção é inexistente ou ineficaz. Você não está gerando leads qualificados ou não está convertendo esses leads em clientes pagantes."
      ],
      actions: [
        "Comece definindo metas claras para sua prospecção.",
        "Identifique seus mercados-alvo e desenvolva uma proposta de valor que ressoe com eles.",
        "Invista em ferramentas e técnicas de prospecção."
      ]
    }
  },
  'conversion': {
    high: {
      title: "Conversão",
      paragraphs: [
        "Sua conversão é excelente. Você está convertendo leads em clientes pagantes de forma eficaz. Você tem um processo de vendas bem definido e está usando as ferramentas e técnicas certas."
      ],
      actions: [
        "Continue monitorando seus resultados de conversão e ajustando sua estratégia conforme necessário.",
        "Explore novas maneiras de melhorar sua conversão.",
        "Invista em tecnologia e automação para melhorar a eficiência de sua conversão."
      ]
    },
    medium: {
      title: "Conversão",
      paragraphs: [
        "Sua conversão está em desenvolvimento e precisa de mais foco e clareza. Você pode não estar convertendo leads em clientes pagantes de forma eficaz."
      ],
      actions: [
        "Defina metas claras para sua conversão.",
        "Analise seu processo de vendas e identifique áreas para melhoria.",
        "Invista em treinamento de vendas e ferramentas de conversão."
      ]
    },
    low: {
      title: "Conversão",
      paragraphs: [
        "Sua conversão é inexistente ou ineficaz. Você não está convertendo leads em clientes pagantes."
      ],
      actions: [
        "Comece definindo metas claras para sua conversão.",
        "Analise seu processo de vendas e identifique áreas para melhoria.",
        "Invista em treinamento de vendas e ferramentas de conversão."
      ]
    }
  },
  'retention': {
    high: {
      title: "Retenção",
      paragraphs: [
        "Sua retenção é excelente. Você está retendo clientes de forma eficaz e está construindo relacionamentos duradouros com eles. Você tem um programa de fidelidade bem definido e está oferecendo um excelente atendimento ao cliente."
      ],
      actions: [
        "Continue monitorando seus resultados de retenção e ajustando sua estratégia conforme necessário.",
        "Explore novas maneiras de melhorar sua retenção.",
        "Invista em tecnologia e automação para melhorar a eficiência de sua retenção."
      ]
    },
    medium: {
      title: "Retenção",
      paragraphs: [
        "Sua retenção está em desenvolvimento e precisa de mais foco e clareza. Você pode não estar retendo clientes de forma eficaz ou pode não estar construindo relacionamentos duradouros com eles."
      ],
      actions: [
        "Defina metas claras para sua retenção.",
        "Analise seu programa de fidelidade e identifique áreas para melhoria.",
        "Invista em treinamento de atendimento ao cliente e ferramentas de retenção."
      ]
    },
    low: {
      title: "Retenção",
      paragraphs: [
        "Sua retenção é inexistente ou ineficaz. Você não está retendo clientes ou não está construindo relacionamentos duradouros com eles."
      ],
      actions: [
        "Comece definindo metas claras para sua retenção.",
        "Analise seu programa de fidelidade e identifique áreas para melhoria.",
        "Invista em treinamento de atendimento ao cliente e ferramentas de retenção."
      ]
    }
  },
  'tools': {
    high: {
      title: "Ferramentas",
      paragraphs: [
        "O uso de ferramentas é excelente. Você está utilizando as ferramentas certas para cada etapa do processo de vendas e está obtendo o máximo delas. Você tem uma equipe bem treinada e está usando as ferramentas de forma eficaz."
      ],
      actions: [
        "Continue monitorando seus resultados e ajustando sua estratégia de ferramentas conforme necessário.",
        "Explore novas ferramentas e tecnologias para melhorar a eficiência de suas operações.",
        "Invista em treinamento e desenvolvimento para garantir que sua equipe esteja usando as ferramentas de forma eficaz."
      ]
    },
    medium: {
      title: "Ferramentas",
      paragraphs: [
        "O uso de ferramentas está em desenvolvimento e precisa de mais foco e clareza. Você pode não estar utilizando as ferramentas certas para cada etapa do processo de vendas ou pode não estar obtendo o máximo delas."
      ],
      actions: [
        "Defina metas claras para o uso de ferramentas.",
        "Analise seu processo de vendas e identifique as ferramentas mais adequadas para cada etapa.",
        "Invista em treinamento e desenvolvimento para garantir que sua equipe esteja usando as ferramentas de forma eficaz."
      ]
    },
    low: {
      title: "Ferramentas",
      paragraphs: [
        "O uso de ferramentas é inexistente ou ineficaz. Você não está utilizando as ferramentas certas para cada etapa do processo de vendas ou não está obtendo o máximo delas."
      ],
      actions: [
        "Comece definindo metas claras para o uso de ferramentas.",
        "Analise seu processo de vendas e identifique as ferramentas mais adequadas para cada etapa.",
        "Invista em treinamento e desenvolvimento para garantir que sua equipe esteja usando as ferramentas de forma eficaz."
      ]
    }
  }
};

export const pillarIcons: Record<DiagnosticPillar, string> = {
  'revenue-strategy': '📈',
  'value-proposition': '💡',
  'commercial-intelligence': '🔍',
  'prospecting': '🎯',
  'conversion': '🤝',
  'retention': '🔒',
  'tools': '🛠️'
};

// Resources list (simplified - now all resources will be available regardless of results)
export const resources: Resource[] = [
  {
    id: "course-01",
    title: "Sales Model Canvas",
    description: "Aprenda a estruturar sua estratégia de vendas com este framework completo.",
    url: "https://blog.growthmachine.com.br/o-que-e-sales-model-canvas",
    pillars: ["revenue-strategy", "value-proposition"]
  },
  {
    id: "ebook-01",
    title: "Bíblia do Social Selling",
    description: "Técnicas avançadas para gerar leads e construir relacionamentos nas redes sociais.",
    url: "https://lp.growthmachine.com.br/biblia-do-social-selling",
    pillars: ["prospecting", "conversion"]
  },
  {
    id: "ebook-02",
    title: "Guia Essencial da Prospecção",
    description: "Um guia completo para transformar sua estratégia de prospecção B2B.",
    url: "https://lp.growthmachine.com.br/guia-da-prospeccao",
    pillars: ["prospecting"]
  },
  {
    id: "ebook-03",
    title: "Template Kanban Prospect",
    description: "Organize sua prospecção e aumente a produtividade do time comercial.",
    url: "https://blog.growthmachine.com.br/o-que-e-kanban-prospect/",
    pillars: ["prospecting", "commercial-intelligence", "tools"]
  },
  {
    id: "ebook-04",
    title: "Template de Cold Mail",
    description: "Modelos prontos para criar emails de prospecção com alta taxa de resposta.",
    url: "https://lp.growthmachine.com.br/templates-de-cold-mail",
    pillars: ["prospecting", "conversion"]
  }
];

export const diagnosticQuestions = [
  {
    id: "q1",
    text: "Sua empresa possui metas de receita claras e documentadas para os próximos 12 meses?",
    options: [
      { label: "Não temos metas definidas", value: 1, feedback: "Definir metas é o primeiro passo para o sucesso.", score: 1 },
      { label: "Temos metas não documentadas", value: 2, feedback: "Documentar as metas ajuda a manter o foco.", score: 2 },
      { label: "Temos metas documentadas, mas não as monitoramos", value: 3, feedback: "Monitorar as metas é essencial para o sucesso.", score: 3 },
      { label: "Temos metas claras, documentadas e as monitoramos regularmente", value: 4, feedback: "Excelente! Continue monitorando e ajustando as metas conforme necessário.", score: 4 }
    ],
    pillar: "revenue-strategy"
  },
  {
    id: "q2",
    text: "Sua empresa possui um plano de ação detalhado para alcançar suas metas de receita?",
    options: [
      { label: "Não temos um plano de ação", value: 1, feedback: "Um plano de ação é essencial para alcançar suas metas.", score: 1 },
      { label: "Temos um plano de ação não documentado", value: 2, feedback: "Documentar o plano de ação ajuda a manter o foco.", score: 2 },
      { label: "Temos um plano de ação documentado, mas não o seguimos", value: 3, feedback: "Seguir o plano de ação é essencial para o sucesso.", score: 3 },
      { label: "Temos um plano de ação claro, documentado e o seguimos rigorosamente", value: 4, feedback: "Excelente! Continue seguindo o plano de ação e ajustando-o conforme necessário.", score: 4 }
    ],
    pillar: "revenue-strategy"
  },
  {
    id: "q3",
    text: "Sua empresa investe em pesquisa de mercado para entender as necessidades de seus clientes?",
    options: [
      { label: "Não investimos em pesquisa de mercado", value: 1, feedback: "A pesquisa de mercado é essencial para entender as necessidades de seus clientes.", score: 1 },
      { label: "Investimos em pesquisa de mercado de forma esporádica", value: 2, feedback: "Investir em pesquisa de mercado de forma consistente é mais eficaz.", score: 2 },
      { label: "Investimos em pesquisa de mercado regularmente, mas não usamos os resultados", value: 3, feedback: "Usar os resultados da pesquisa de mercado é essencial para o sucesso.", score: 3 },
      { label: "Investimos em pesquisa de mercado regularmente e usamos os resultados para tomar decisões", value: 4, feedback: "Excelente! Continue investindo em pesquisa de mercado e usando os resultados para tomar decisões.", score: 4 }
    ],
    pillar: "commercial-intelligence"
  },
  {
    id: "q4",
    text: "Sua empresa monitora seus concorrentes para identificar oportunidades e ameaças?",
    options: [
      { label: "Não monitoramos nossos concorrentes", value: 1, feedback: "Monitorar seus concorrentes é essencial para identificar oportunidades e ameaças.", score: 1 },
      { label: "Monitoramos nossos concorrentes de forma esporádica", value: 2, feedback: "Monitorar seus concorrentes de forma consistente é mais eficaz.", score: 2 },
      { label: "Monitoramos nossos concorrentes regularmente, mas não usamos os resultados", value: 3, feedback: "Usar os resultados do monitoramento dos concorrentes é essencial para o sucesso.", score: 3 },
      { label: "Monitoramos nossos concorrentes regularmente e usamos os resultados para tomar decisões", value: 4, feedback: "Excelente! Continue monitorando seus concorrentes e usando os resultados para tomar decisões.", score: 4 }
    ],
    pillar: "commercial-intelligence"
  },
  {
    id: "q5",
    text: "Sua empresa tem uma proposta de valor clara e concisa que diferencia seus produtos ou serviços dos da concorrência?",
    options: [
      { label: "Não temos uma proposta de valor clara", value: 1, feedback: "Uma proposta de valor clara é essencial para atrair clientes.", score: 1 },
      { label: "Temos uma proposta de valor, mas não é concisa", value: 2, feedback: "Uma proposta de valor concisa é mais eficaz.", score: 2 },
      { label: "Temos uma proposta de valor clara e concisa, mas não a comunicamos de forma eficaz", value: 3, feedback: "Comunicar a proposta de valor de forma eficaz é essencial para o sucesso.", score: 3 },
      { label: "Temos uma proposta de valor clara, concisa e a comunicamos de forma eficaz", value: 4, feedback: "Excelente! Continue comunicando sua proposta de valor de forma eficaz.", score: 4 }
    ],
    pillar: "value-proposition"
  },
  {
    id: "q6",
    text: "Sua empresa adapta sua proposta de valor para diferentes segmentos de clientes?",
    options: [
      { label: "Não adaptamos nossa proposta de valor", value: 1, feedback: "Adaptar a proposta de valor para diferentes segmentos de clientes é mais eficaz.", score: 1 },
      { label: "Adaptamos nossa proposta de valor de forma esporádica", value: 2, feedback: "Adaptar a proposta de valor de forma consistente é mais eficaz.", score: 2 },
      { label: "Adaptamos nossa proposta de valor regularmente, mas não vemos resultados", value: 3, feedback: "Analisar os resultados da adaptação da proposta de valor é essencial para o sucesso.", score: 3 },
      { label: "Adaptamos nossa proposta de valor regularmente e vemos resultados positivos", value: 4, feedback: "Excelente! Continue adaptando sua proposta de valor e analisando os resultados.", score: 4 }
    ],
    pillar: "value-proposition"
  },
  {
    id: "q7",
    text: "Sua empresa utiliza ferramentas de CRM (Customer Relationship Management) para gerenciar seus leads e clientes?",
    options: [
      { label: "Não utilizamos ferramentas de CRM", value: 1, feedback: "Ferramentas de CRM são essenciais para gerenciar leads e clientes.", score: 1 },
      { label: "Utilizamos ferramentas de CRM de forma inadequada", value: 2, feedback: "Utilizar ferramentas de CRM de forma adequada é mais eficaz.", score: 2 },
      { label: "Utilizamos ferramentas de CRM, mas não as integramos com outras ferramentas", value: 3, feedback: "Integrar as ferramentas de CRM com outras ferramentas é essencial para o sucesso.", score: 3 },
      { label: "Utilizamos ferramentas de CRM de forma integrada e eficaz", value: 4, feedback: "Excelente! Continue utilizando as ferramentas de CRM de forma integrada e eficaz.", score: 4 }
    ],
    pillar: "tools"
  },
  {
    id: "q8",
    text: "Sua empresa utiliza automação de marketing para nutrir seus leads e clientes?",
    options: [
      { label: "Não utilizamos automação de marketing", value: 1, feedback: "Automação de marketing é essencial para nutrir leads e clientes.", score: 1 },
      { label: "Utilizamos automação de marketing de forma inadequada", value: 2, feedback: "Utilizar automação de marketing de forma adequada é mais eficaz.", score: 2 },
      { label: "Utilizamos automação de marketing, mas não a personalizamos", value: 3, feedback: "Personalizar a automação de marketing é essencial para o sucesso.", score: 3 },
      { label: "Utilizamos automação de marketing de forma personalizada e eficaz", value: 4, feedback: "Excelente! Continue utilizando automação de marketing de forma personalizada e eficaz.", score: 4 }
    ],
    pillar: "tools"
  },
  {
    id: "q9",
    text: "Sua empresa possui um processo de prospecção bem definido e documentado?",
    options: [
      { label: "Não temos um processo de prospecção definido", value: 1, feedback: "Um processo de prospecção bem definido é essencial para gerar leads qualificados.", score: 1 },
      { label: "Temos um processo de prospecção não documentado", value: 2, feedback: "Documentar o processo de prospecção ajuda a manter o foco.", score: 2 },
      { label: "Temos um processo de prospecção documentado, mas não o seguimos", value: 3, feedback: "Seguir o processo de prospecção é essencial para o sucesso.", score: 3 },
      { label: "Temos um processo de prospecção claro, documentado e o seguimos rigorosamente", value: 4, feedback: "Excelente! Continue seguindo o processo de prospecção e ajustando-o conforme necessário.", score: 4 }
    ],
    pillar: "prospecting"
  },
  {
    id: "q10",
    text: "Sua empresa utiliza diferentes canais de prospecção para alcançar seus clientes em potencial?",
    options: [
      { label: "Utilizamos apenas um canal de prospecção", value: 1, feedback: "Utilizar diferentes canais de prospecção é mais eficaz.", score: 1 },
      { label: "Utilizamos alguns canais de prospecção, mas não os integramos", value: 2, feedback: "Integrar os canais de prospecção é essencial para o sucesso.", score: 2 },
      { label: "Utilizamos diferentes canais de prospecção, mas não os monitoramos", value: 3, feedback: "Monitorar os resultados dos diferentes canais de prospecção é essencial para o sucesso.", score: 3 },
      { label: "Utilizamos diferentes canais de prospecção de forma integrada e monitoramos os resultados", value: 4, feedback: "Excelente! Continue utilizando diferentes canais de prospecção de forma integrada e monitorando os resultados.", score: 4 }
    ],
    pillar: "prospecting"
  },
  {
    id: "q11",
    text: "Sua empresa possui um processo de vendas bem definido e documentado?",
    options: [
      { label: "Não temos um processo de vendas definido", value: 1, feedback: "Um processo de vendas bem definido é essencial para converter leads em clientes.", score: 1 },
      { label: "Temos um processo de vendas não documentado", value: 2, feedback: "Documentar o processo de vendas ajuda a manter o foco.", score: 2 },
      { label: "Temos um processo de vendas documentado, mas não o seguimos", value: 3, feedback: "Seguir o processo de vendas é essencial para o sucesso.", score: 3 },
      { label: "Temos um processo de vendas claro, documentado e o seguimos rigorosamente", value: 4, feedback: "Excelente! Continue seguindo o processo de vendas e ajustando-o conforme necessário.", score: 4 }
    ],
    pillar: "conversion"
  },
  {
    id: "q12",
    text: "Sua empresa treina seus vendedores regularmente para melhorar suas habilidades de vendas?",
    options: [
      { label: "Não treinamos nossos vendedores", value: 1, feedback: "Treinar os vendedores é essencial para melhorar suas habilidades de vendas.", score: 1 },
      { label: "Treinamos nossos vendedores de forma esporádica", value: 2, feedback: "Treinar os vendedores de forma consistente é mais eficaz.", score: 2 },
      { label: "Treinamos nossos vendedores regularmente, mas não vemos resultados", value: 3, feedback: "Analisar os resultados do treinamento dos vendedores é essencial para o sucesso.", score: 3 },
      { label: "Treinamos nossos vendedores regularmente e vemos resultados positivos", value: 4, feedback: "Excelente! Continue treinando seus vendedores e analisando os resultados.", score: 4 }
    ],
    pillar: "conversion"
  },
  {
    id: "q13",
    text: "Sua empresa possui um programa de fidelidade para recompensar seus clientes fiéis?",
    options: [
      { label: "Não temos um programa de fidelidade", value: 1, feedback: "Um programa de fidelidade é essencial para recompensar os clientes fiéis.", score: 1 },
      { label: "Temos um programa de fidelidade, mas não é eficaz", value: 2, feedback: "Um programa de fidelidade eficaz é essencial para o sucesso.", score: 2 },
      { label: "Temos um programa de fidelidade eficaz, mas não o comunicamos de forma eficaz", value: 3, feedback: "Comunicar o programa de fidelidade de forma eficaz é essencial para o sucesso.", score: 3 },
      { label: "Temos um programa de fidelidade eficaz e o comunicamos de forma eficaz", value: 4, feedback: "Excelente! Continue comunicando seu programa de fidelidade de forma eficaz.", score: 4 }
    ],
    pillar: "retention"
  },
  {
    id: "q14",
    text: "Sua empresa mede a satisfação de seus clientes regularmente?",
    options: [
      { label: "Não medimos a satisfação de nossos clientes", value: 1, feedback: "Medir a satisfação dos clientes é essencial para melhorar a retenção.", score: 1 },
      { label: "Medimos a satisfação de nossos clientes de forma esporádica", value: 2, feedback: "Medir a satisfação dos clientes de forma consistente é mais eficaz.", score: 2 },
      { label: "Medimos a satisfação de nossos clientes regularmente, mas não usamos os resultados", value: 3, feedback: "Usar os resultados da medição da satisfação dos clientes é essencial para o sucesso.", score: 3 },
      { label: "Medimos a satisfação de nossos clientes regularmente e usamos os resultados para tomar decisões", value: 4, feedback: "Excelente! Continue medindo a satisfação de seus clientes e usando os resultados para tomar decisões.", score: 4 }
    ],
    pillar: "retention"
  }
];
