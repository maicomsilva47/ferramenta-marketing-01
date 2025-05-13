
import { 
  DiagnosticQuestion, 
  DiagnosticPillar,
  OptionValue,
  PillarFeedbacks
} from '@/types/diagnostic';

// Pillar names in Portuguese
export const pillarNames: Record<DiagnosticPillar, string> = {
  'revenue-strategy': 'Estratégia de Receita',
  'value-proposition': 'Proposta de Valor',
  'commercial-intelligence': 'Inteligência Comercial',
  'prospecting': 'Prospecção',
  'conversion': 'Conversão',
  'retention': 'Retenção',
  'tools': 'Ferramentas'
};

// Icons for each pillar
export const pillarIcons: Record<DiagnosticPillar, string> = {
  'revenue-strategy': '🚀',
  'value-proposition': '💎',
  'commercial-intelligence': '🧠',
  'prospecting': '🔍',
  'conversion': '⚡',
  'retention': '🔄',
  'tools': '🔧'
};

// Labels for each evaluation level
export const evaluationLabels: Record<OptionValue, string> = {
  'high': 'Alto',
  'medium': 'Médio',
  'low': 'Baixo'
};

// Feedback texts for each pillar based on evaluation level
export const pillarFeedbacks: PillarFeedbacks = {
  'revenue-strategy': {
    high: {
      title: 'Estratégia de Receita Avançada',
      paragraphs: [
        'Sua empresa demonstra uma excelente estruturação da estratégia de receita. Você provavelmente possui metas claras, segmentação eficiente e um processo de vendas bem definido que gera resultados consistentes.',
        'Os times de Marketing e Vendas estão alinhados em torno de objetivos comuns e KPIs bem estruturados, o que permite a previsibilidade de resultados e o crescimento sustentável do negócio.',
        'Empresas com este nível de maturidade conseguem não apenas atingir as metas comerciais, mas também planejar crescimento com base em dados sólidos e prever tendências de mercado.'
      ],
      actions: [
        'Estabeleça mecanismos avançados de forecast para melhorar ainda mais a previsibilidade',
        'Implemente revisões trimestrais de estratégia para adaptar-se rapidamente às mudanças de mercado',
        'Desenvolva um sistema de compensação que incentive comportamentos alinhados com os objetivos estratégicos'
      ]
    },
    medium: {
      title: 'Estratégia de Receita em Desenvolvimento',
      paragraphs: [
        'Sua empresa já possui elementos importantes de uma estratégia de receita, como algumas metas definidas e um processo de vendas básico, mas ainda falta consistência e integração total entre as áreas.',
        'O alinhamento entre Marketing e Vendas ocorre de forma pontual, e nem sempre há clareza sobre como as ações táticas contribuem para os objetivos estratégicos maiores da empresa.',
        'Empresas neste estágio geralmente enfrentam desafios de previsibilidade e podem ter ciclos de altos e baixos nos resultados comerciais.'
      ],
      actions: [
        'Estabeleça um processo formal de definição e cascateamento de metas comerciais',
        'Implemente reuniões regulares de alinhamento entre Marketing e Vendas',
        'Desenvolva um dashboard unificado de indicadores-chave que todos acompanhem',
        'Documente seu processo comercial do início ao fim com etapas claras'
      ]
    },
    low: {
      title: 'Estratégia de Receita Incipiente',
      paragraphs: [
        'Sua empresa opera com uma estratégia de receita pouco estruturada ou inexistente. As metas, quando existem, são genéricas e não há um processo comercial claramente definido e seguido por todos.',
        'Marketing e Vendas trabalham de forma isolada, com objetivos diferentes e pouca comunicação, o que gera ineficiência e resulta em oportunidades perdidas.',
        'Empresas neste estágio geralmente dependem de esforços heroicos individuais para fechar negócios e têm grande dificuldade em prever resultados, o que compromete o planejamento financeiro e de crescimento.'
      ],
      actions: [
        'Estabeleça metas claras e específicas para as equipes comerciais',
        'Defina um processo de vendas básico com etapas bem delimitadas',
        'Crie um calendário de reuniões recorrentes entre Marketing e Vendas',
        'Implemente métricas básicas de acompanhamento comercial (leads, conversões, ticket médio)'
      ]
    }
  },
  'value-proposition': {
    high: {
      title: 'Proposta de Valor Diferenciada',
      paragraphs: [
        'Sua empresa possui uma proposta de valor clara, convincente e baseada em diferenciais reais de mercado. Você conhece profundamente seus clientes ideais e entende suas dores, contextos e objetivos.',
        'O posicionamento de mercado é bem definido e todos na empresa conseguem comunicar o valor de forma consistente e persuasiva, facilitando a venda e reduzindo a objeção de preço.',
        'Empresas com este nível de clareza na proposta de valor conseguem atrair clientes mais qualificados, têm ciclos de venda mais curtos e margens mais saudáveis.'
      ],
      actions: [
        'Revisite sua proposta de valor periodicamente para garantir que continua relevante',
        'Expande o conhecimento sobre personas para segmentos adjacentes com potencial',
        'Treine continuamente as equipes para que a comunicação de valor seja consistente em todos os pontos de contato'
      ]
    },
    medium: {
      title: 'Proposta de Valor em Evolução',
      paragraphs: [
        'Sua empresa tem uma compreensão básica de sua proposta de valor, mas pode não estar comunicando-a de forma consistente ou impactante. Você conhece alguns aspectos de seus clientes, mas faltam insights mais profundos sobre suas reais necessidades.',
        'O posicionamento existe, mas pode não estar totalmente diferenciado dos concorrentes, o que dificulta a justificativa de preço e leva a negociações mais centradas em desconto do que em valor.',
        'Empresas neste estágio geralmente conseguem vender, mas poderiam ter resultados muito melhores com uma proposta de valor mais afiada e internalizada por todos.'
      ],
      actions: [
        'Realize entrevistas aprofundadas com clientes atuais para entender melhor o valor percebido',
        'Mapeie detalhadamente as personas de clientes ideais com suas motivações e objeções',
        'Crie scripts de comunicação de valor padronizados para todos os vendedores',
        'Desenvolva materiais de vendas centrados em valor, não em recursos'
      ]
    },
    low: {
      title: 'Proposta de Valor Indefinida',
      paragraphs: [
        'Sua empresa ainda não definiu claramente sua proposta de valor ou está baseando-a principalmente em características técnicas dos produtos/serviços, sem conexão com benefícios reais para os clientes.',
        'Há pouco conhecimento estruturado sobre os clientes ideais, seus desafios e objetivos, o que resulta em abordagens comerciais genéricas que não ressoam com os prospects.',
        'Empresas neste estágio frequentemente enfrentam dificuldades para se diferenciar da concorrência, sofrem grande pressão por desconto e têm ciclos de vendas longos com taxas de conversão baixas.'
      ],
      actions: [
        'Defina quem é seu cliente ideal e por que seu produto/serviço é relevante para ele',
        'Documente as principais dores e ganhos que sua solução proporciona',
        'Crie um pitch comercial básico que todos na empresa possam usar',
        'Compare sua oferta com concorrentes para identificar diferenciais reais'
      ]
    }
  },
  'commercial-intelligence': {
    high: {
      title: 'Inteligência Comercial Avançada',
      paragraphs: [
        'Sua empresa opera com base em dados comerciais completos e confiáveis. Você monitora sistematicamente métricas-chave e utiliza análises avançadas para identificar tendências, prever resultados e tomar decisões estratégicas.',
        'Existe um processo estruturado de coleta, análise e distribuição de insights para todas as áreas envolvidas no processo comercial, permitindo ajustes rápidos e informados na estratégia.',
        'Empresas com este nível de maturidade em inteligência comercial conseguem antecipar problemas, otimizar continuamente seus processos e manter vantagem competitiva no mercado.'
      ],
      actions: [
        'Implemente análises preditivas para antecipar tendências e comportamentos de clientes',
        'Desenvolva um programa de testes A/B contínuos para otimização de abordagens comerciais',
        'Crie dashboards personalizados por nível hierárquico e função'
      ]
    },
    medium: {
      title: 'Inteligência Comercial em Desenvolvimento',
      paragraphs: [
        'Sua empresa já coleta alguns dados comerciais importantes, mas ainda há lacunas significativas na qualidade, completude ou utilização dessas informações para tomada de decisões.',
        'Existem métricas básicas sendo monitoradas, mas falta análise mais profunda e sistemática que transforme dados em insights acionáveis para direcionar a estratégia comercial.',
        'Empresas neste estágio geralmente conseguem identificar problemas após eles ocorrerem, mas têm dificuldade em antecipar tendências ou oportunidades com base em dados.'
      ],
      actions: [
        'Estabeleça um conjunto mínimo de KPIs comerciais que todos devem acompanhar',
        'Implemente um processo regular de análise de dados e compartilhamento de insights',
        'Padronize a coleta de dados em todos os pontos do funil de vendas',
        'Treine as equipes para utilizar dados na tomada de decisões cotidianas'
      ]
    },
    low: {
      title: 'Inteligência Comercial Incipiente',
      paragraphs: [
        'Sua empresa opera com pouca ou nenhuma utilização de dados para guiar decisões comerciais. As informações existentes são fragmentadas, inconsistentes ou simplesmente não são utilizadas de forma estratégica.',
        'Não há métricas claras sendo acompanhadas sistematicamente, e as decisões são tomadas principalmente com base em intuição ou experiências pessoais.',
        'Empresas neste estágio frequentemente têm dificuldade em entender as causas reais de seus sucessos ou fracassos comerciais, o que impede aprendizado sistemático e melhoria contínua.'
      ],
      actions: [
        'Defina 3-5 métricas fundamentais para começar a acompanhar imediatamente',
        'Implemente um CRM básico para registro consistente de todas as interações comerciais',
        'Estabeleça uma reunião mensal de análise de resultados comerciais',
        'Crie um relatório simples de fechamento mensal com principais indicadores'
      ]
    }
  },
  'prospecting': {
    high: {
      title: 'Prospecção Estratégica',
      paragraphs: [
        'Sua empresa possui um sistema de prospecção robusto e multicanal que gera um fluxo consistente e previsível de leads qualificados. Os esforços de geração de demanda são baseados em dados e otimizados continuamente.',
        'Há uma clara segmentação de mercado e personalização de abordagens por perfil de cliente, além de integração eficiente entre marketing inbound e ações outbound.',
        'Empresas com este nível de maturidade em prospecção conseguem escalar seu crescimento de forma previsível e raramente enfrentam "secas" no pipeline de vendas.'
      ],
      actions: [
        'Implemente testes contínuos de novas abordagens de prospecção',
        'Desenvolva modelos preditivos para identificar leads com maior propensão de compra',
        'Estabeleça processos de aprendizado contínuo entre as equipes de geração e qualificação'
      ]
    },
    medium: {
      title: 'Prospecção em Evolução',
      paragraphs: [
        'Sua empresa realiza atividades de prospecção com alguma regularidade, mas ainda enfrenta inconsistências na qualidade e quantidade de leads gerados, resultando em um pipeline irregular.',
        'Alguns canais de aquisição funcionam razoavelmente bem, mas falta diversificação estratégica e processos sistemáticos para otimizar resultados.',
        'Empresas neste estágio geralmente têm períodos bons alternados com momentos de escassez de oportunidades, o que dificulta o planejamento e crescimento sustentável.'
      ],
      actions: [
        'Estabeleça metas claras de geração de leads por canal',
        'Defina critérios objetivos de qualificação de leads (lead scoring)',
        'Implemente um calendário regular de ações de prospecção',
        'Diversifique seus canais de aquisição para reduzir dependência de fontes únicas'
      ]
    },
    low: {
      title: 'Prospecção Reativa',
      paragraphs: [
        'Sua empresa não possui um processo estruturado de prospecção, dependendo principalmente de indicações espontâneas ou esforços pontuais e não sistemáticos para gerar novas oportunidades.',
        'As atividades de captação são inconsistentes, sem métricas claras de acompanhamento, e geralmente há confusão sobre quais canais ou abordagens funcionam melhor.',
        'Empresas neste estágio frequentemente enfrentam ciclos de "montanha-russa" nas vendas, com períodos de falta aguda de leads seguidos por sobrecarga quando esforços emergenciais são realizados.'
      ],
      actions: [
        'Defina um processo básico de prospecção com atividades diárias',
        'Estabeleça uma meta mínima de novos contatos/leads por semana',
        'Escolha 2-3 canais iniciais de aquisição e foque neles',
        'Crie um script básico para abordagem inicial e qualificação'
      ]
    }
  },
  'conversion': {
    high: {
      title: 'Conversão Otimizada',
      paragraphs: [
        'Sua empresa possui um processo de vendas bem definido, documentado e seguido consistentemente por toda a equipe comercial. As etapas do funil são claras, com critérios objetivos de avanço e ações específicas em cada fase.',
        'Existe um sistema eficiente de acompanhamento de oportunidades, com previsões de fechamento precisas e análises regulares de conversão que permitem melhorias contínuas.',
        'Empresas com este nível de maturidade em conversão conseguem maximizar o valor de cada lead, têm ciclos de venda otimizados e taxas de fechamento significativamente acima da média do mercado.'
      ],
      actions: [
        'Implemente técnicas avançadas de sales enablement para elevar ainda mais as taxas de conversão',
        'Desenvolva playbooks específicos para diferentes segmentos e perfis de decisores',
        'Estabeleça programa formal de mentoria entre vendedores de alto e médio desempenho'
      ]
    },
    medium: {
      title: 'Conversão em Desenvolvimento',
      paragraphs: [
        'Sua empresa tem um processo de vendas básico estabelecido, mas nem sempre ele é seguido consistentemente ou existem lacunas importantes em alguma das etapas do funil.',
        'Há algum acompanhamento de oportunidades, mas previsões de fechamento são apenas moderadamente precisas e a análise de conversão acontece de forma reativa.',
        'Empresas neste estágio geralmente têm taxas de conversão razoáveis, mas deixam valor significativo na mesa devido a inconsistências no processo e falhas de acompanhamento.'
      ],
      actions: [
        'Documente seu processo de vendas atual, identificando gargalos e pontos de abandono',
        'Estabeleça critérios claros para cada estágio do funil',
        'Implemente reuniões semanais de pipeline review com toda a equipe',
        'Desenvolva materiais de apoio às vendas para as objeções mais comuns'
      ]
    },
    low: {
      title: 'Conversão Inconsistente',
      paragraphs: [
        'Sua empresa não tem um processo de vendas estruturado. Cada vendedor segue sua própria abordagem, resultando em experiências inconsistentes para o cliente e dificuldade em analisar ou melhorar resultados.',
        'O acompanhamento de oportunidades é precário ou inexistente, com pouca visibilidade sobre o status real do funil e previsões de fechamento altamente imprecisas.',
        'Empresas neste estágio frequentemente perdem leads valiosos por falta de acompanhamento adequado, têm ciclos de venda desnecessariamente longos e taxas de conversão significativamente abaixo do potencial.'
      ],
      actions: [
        'Defina um processo de vendas simples com 3-5 etapas principais',
        'Implemente um sistema básico de registro e acompanhamento de oportunidades',
        'Estabeleça prazos máximos para follow-up de leads e oportunidades',
        'Crie um script básico de qualificação e descoberta para todos usarem'
      ]
    }
  },
  'retention': {
    high: {
      title: 'Retenção Estratégica',
      paragraphs: [
        'Sua empresa possui uma estratégia abrangente de retenção e expansão de clientes, com processos estruturados de onboarding, sucesso do cliente e identificação de oportunidades de upsell/cross-sell.',
        'Existe monitoramento sistemático de satisfação e saúde dos clientes, com intervenções proativas para resolver problemas antes que levem à evasão.',
        'Empresas com este nível de maturidade em retenção conseguem maximizar o valor do ciclo de vida do cliente (LTV), têm taxas de renovação/continuidade elevadas e grande parte da receita vem de clientes existentes.'
      ],
      actions: [
        'Implemente modelos preditivos de propensão a cancelamento para intervenção antecipada',
        'Desenvolva programas de fidelidade ou benefícios para clientes de longo prazo',
        'Estabeleça uma verdadeira estratégia de growth através de clientes existentes'
      ]
    },
    medium: {
      title: 'Retenção em Desenvolvimento',
      paragraphs: [
        'Sua empresa realiza alguns esforços para retenção de clientes, mas nem sempre de forma sistemática ou proativa. O processo de onboarding existe, mas pode ter lacunas importantes.',
        'Há algum monitoramento de satisfação, mas intervenções tendem a ser reativas, após sinais claros de insatisfação já terem surgido.',
        'Empresas neste estágio geralmente conseguem manter uma taxa de retenção razoável, mas perdem oportunidades significativas de expansão de receita em clientes existentes.'
      ],
      actions: [
        'Estabeleça um processo estruturado de onboarding para novos clientes',
        'Implemente check-ins regulares de "saúde do cliente" em momentos estratégicos',
        'Desenvolva um programa básico de identificação de oportunidades de upsell',
        'Crie alertas para sinais de alerta de possível cancelamento'
      ]
    },
    low: {
      title: 'Retenção Reativa',
      paragraphs: [
        'Sua empresa não possui uma estratégia deliberada de retenção de clientes. O foco está principalmente na aquisição, com pouca atenção estruturada ao que acontece após a venda inicial.',
        'Não há processos consistentes de onboarding, monitoramento de satisfação ou identificação sistemática de riscos de cancelamento e oportunidades de expansão.',
        'Empresas neste estágio frequentemente enfrentam altas taxas de rotatividade de clientes (churn), desperdiçando recursos significativos na constante reposição da base e limitando seu potencial de crescimento sustentável.'
      ],
      actions: [
        'Comece a medir e acompanhar sua taxa de retenção atual',
        'Implemente pelo menos um contato estruturado pós-venda',
        'Crie um processo simples para coletar feedback de clientes',
        'Estabeleça um alerta básico para clientes sem interação recente'
      ]
    }
  },
  'tools': {
    high: {
      title: 'Stack Tecnológico Avançado',
      paragraphs: [
        'Sua empresa utiliza um conjunto integrado e bem implementado de ferramentas comerciais que automatizam processos, fornecem insights valiosos e aumentam significativamente a produtividade da equipe.',
        'As tecnologias são adotadas estrategicamente e existe um alto nível de proficiência em seu uso, com dados fluindo sem problemas entre sistemas diferentes.',
        'Empresas com este nível de maturidade tecnológica conseguem escalar operações comerciais eficientemente, tomar decisões baseadas em dados em tempo real e oferecer experiências superiores aos clientes.'
      ],
      actions: [
        'Explore soluções de IA e automação avançadas para elevar ainda mais a produtividade',
        'Implemente integrações mais profundas entre suas ferramentas atuais',
        'Estabeleça um programa contínuo de otimização e inovação tecnológica'
      ]
    },
    medium: {
      title: 'Stack Tecnológico em Evolução',
      paragraphs: [
        'Sua empresa utiliza algumas ferramentas comerciais importantes, mas pode haver lacunas significativas na integração entre elas ou na forma como são utilizadas pela equipe.',
        'As tecnologias cobrem funções básicas, mas nem sempre são exploradas em todo seu potencial ou há inconsistência na adoção por diferentes membros da equipe.',
        'Empresas neste estágio geralmente conseguem benefícios parciais da tecnologia, mas ainda enfrentam ineficiências, duplicação de esforços e perda de insights devido à fragmentação de dados e processos.'
      ],
      actions: [
        'Revise a utilização atual das ferramentas existentes para identificar recursos subutilizados',
        'Estabeleça treinamentos regulares para aumentar a adoção e proficiência',
        'Priorize a integração entre sistemas existentes antes de adicionar novas ferramentas',
        'Desenvolva processos padronizados de uso das ferramentas atuais'
      ]
    },
    low: {
      title: 'Stack Tecnológico Básico',
      paragraphs: [
        'Sua empresa utiliza poucas ou nenhuma ferramenta especializada para apoiar processos comerciais. Os sistemas existentes são básicos, fragmentados ou subutilizados.',
        'Há grande dependência de processos manuais, planilhas isoladas e comunicação não estruturada, resultando em perda de eficiência e informações importantes.',
        'Empresas neste estágio frequentemente enfrentam desafios significativos de escalabilidade, têm visibilidade limitada sobre seu pipeline e performance, e perdem oportunidades por falta de acompanhamento sistemático.'
      ],
      actions: [
        'Implemente um CRM básico como fundação para sua pilha tecnológica',
        'Identifique os 2-3 processos mais manuais que poderiam ser facilmente automatizados',
        'Estabeleça regras básicas de registro de informações para toda a equipe',
        'Escolha ferramentas com boa relação custo-benefício para começar'
      ]
    }
  }
};

export const recommendations: Record<DiagnosticPillar, string[]> = {
  'revenue-strategy': [
    "Formalize seu Plano de Receita: Estabeleça metas mensais/trimensais realistas e um plano tático para alcançá-las.",
    "Diversifique suas fontes de receita para reduzir dependência de canais únicos."
  ],
  'value-proposition': [
    "Defina seu ICP e Qualifique Rigorosamente: Desenhe com clareza o perfil do cliente dos sonhos.",
    "Refine sua proposta de valor para falar diretamente das dores específicas do seu cliente ideal."
  ],
  'commercial-intelligence': [
    "Implemente análise de métricas básicas do funil para identificar gargalos de conversão.",
    "Invista em ferramentas de inteligência comercial para orientar decisões baseadas em dados."
  ],
  'prospecting': [
    "Implemente um Processo de Prospecção Ativa com cadências de contato definidas.",
    "Estruture um time de vendas autônomo que não dependa dos sócios para fechar."
  ],
  'conversion': [
    "Melhore seu Follow-up de Vendas com um playbook estruturado e persistente.",
    "Analise a taxa de conversão em cada etapa do funil para identificar e corrigir pontos fracos."
  ],
  'retention': [
    "Fortaleça Pós-venda/Customer Success com check-ins regulares e onboarding estruturado.",
    "Monitore indicadores de retenção como churn e LTV para agir preventivamente."
  ],
  'tools': [
    "Evolua seu Stack Comercial com um CRM de verdade e ferramentas de automação.",
    "Experimente soluções de IA como o Prospct para prospecção automática e qualificação de leads."
  ]
};

export const resources = [
  {
    id: "guide1",
    title: "Guia Essencial da Prospecção",
    description: "E-book passo a passo para estruturar seu processo de prospecção do zero, gerando leads quentes consistentemente.",
    pillars: ["prospecting", "conversion"],
    url: "https://lp.growthmachine.com.br/guia-da-prospeccao",
    image: "prospection-guide.png"
  },
  {
    id: "template1",
    title: "Template Kanban Prospect",
    description: "Modelo pronto para organizar sua prospecção em formato Kanban, visualizando o fluxo de leads do primeiro contato até o fechamento.",
    pillars: ["prospecting", "conversion"],
    url: "https://blog.growthmachine.com.br/o-que-e-kanban-prospect/",
    image: "kanban-template.png"
  },
  {
    id: "template2",
    title: "Template de Cold Mail",
    description: "Exemplos de e-mails frios de alto impacto, prontos para uso em suas campanhas de prospecção, para gerar oportunidades qualificadas todos os dias.",
    pillars: ["prospecting"],
    url: "https://lp.growthmachine.com.br/templates-de-cold-mail",
    image: "cold-mail-template.png"
  },
  {
    id: "guide2",
    title: "Bíblia do Social Selling",
    description: "E-book com 20+ estratégias de Social Selling para gerar mais oportunidades usando o LinkedIn.",
    pillars: ["prospecting", "revenue-strategy"],
    url: "https://lp.growthmachine.com.br/biblia-do-social-selling",
    image: "social-selling-bible.png"
  },
  {
    id: "canvas",
    title: "Sales Model Canvas",
    description: "Ferramenta em formato canvas para prototipar seu processo de vendas completo.",
    pillars: ["revenue-strategy", "value-proposition", "commercial-intelligence", "conversion"],
    url: "https://blog.growthmachine.com.br/o-que-e-sales-model-canvas",
    image: "sales-canvas.png"
  }
];


// Sample diagnostic questions
export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "q1",
    text: "Sua empresa possui metas claras de receita e um plano para alcançá-las de forma previsível?",
    pillar: "revenue-strategy",
    options: [
      {
        label: "Sim, temos metas anuais/trimestrais bem definidas e um plano de ações detalhado para atingi-las, com pipeline previsível (sabemos de onde virão os clientes para bater a meta).",
        value: "high",
        feedback: "Ótimo, você tem um norte claro. Estratégia de receita bem definida é a base do crescimento previsível. Continue executando o plano consistentemente (um plano sem execução não passa de papel). ✔️",
        score: 3
      },
      {
        label: "Temos metas definidas, mas o planejamento é básico ou nem sempre seguido – a previsibilidade sofre e acabamos \"correndo atrás\" mês a mês.",
        value: "medium",
        feedback: "Você tem alguma direção, porém falta previsibilidade. Sem um plano sólido e disciplinado, sua receita fica vulnerável a oscilações. Navegar sem mapa pode custar caro quando a maré virar. ⛵️ Ajuste o planejamento para tornar as metas mais alcançáveis.",
        score: 2
      },
      {
        label: "Não há metas formais ou plano estruturado; as vendas acontecem de forma reativa, sem muita previsibilidade.",
        value: "low",
        feedback: "Alerta vermelho! Sem metas nem plano, você está basicamente torcendo pelo melhor. Isso é receita para estagnação – ou pior. 📉 É como pilotar um avião sem rota definida: arriscado e insustentável. Está na hora de definir metas concretas e traçar um plano de voo, ou suas vendas continuarão no improviso.",
        score: 1
      }
    ]
  },
  {
    id: "q2",
    text: "Quão diversificadas são as suas fontes de receita e geração de leads?",
    pillar: "revenue-strategy",
    options: [
      {
        label: "Bem diversificadas – combinamos múltiplos canais: inbound (marketing), prospecção outbound ativa, parcerias e indicações. Não dependemos de um canal só para bater meta.",
        value: "high",
        feedback: "Excelente, múltiplas fontes = risco diluído. Empresas de alto crescimento espalham apostas e garantem fluxo constante de oportunidades. Sua receita não fica refém de um só canal – continue assim. 🔄",
        score: 3
      },
      {
        label: "Possuímos mais de uma fonte de leads, mas ainda dependemos muito de um canal principal (ex: 80% dos leads vêm apenas de indicações ou apenas de mídia paga).",
        value: "medium",
        feedback: "Atenção: alguma diversificação existe, mas a dependência de um canal ainda é grande. Se esse canal principal sofrer (por exemplo, se indicações diminuírem ou custo de marketing aumentar), seu crescimento trava. Pense em equilibrar o mix de geração de demanda para não ficar com \"todos os ovos na mesma cesta\". 🧺",
        score: 2
      },
      {
        label: "Nossa geração de negócios é quase totalmente concentrada em um único meio ou em poucos clientes-chave. Se essa fonte falhar, as vendas despencam.",
        value: "low",
        feedback: "Crítico! Você está com receita concentrada. Se essa fonte seca ou aquele cliente principal churnar, seu comercial pode apagar as luzes. 🔌 Contar com um único canal (ou cliente) é extremamente perigoso – busque variedade urgente nas estratégias de geração de leads para não depender da sorte.",
        score: 1
      }
    ]
  },
  {
    id: "q3",
    text: "Seu produto/serviço resolve dores claras de um público-alvo bem definido? (Em outras palavras, você tem definido um ICP – Ideal Customer Profile – e uma proposta de valor sob medida para ele?)",
    pillar: "value-proposition",
    options: [
      {
        label: "Sim, conhecemos profundamente nosso cliente ideal e as dores específicas que resolvemos. Nossa proposta de valor é clara e comprovada nas conversas de vendas – o cliente rapidamente reconhece que precisa do que oferecemos.",
        value: "high",
        feedback: "Ótimo – saber exatamente quem é seu cliente ideal e sua dor torna a venda muito mais eficaz. Quando há aderência clara da sua solução ao problema do cliente, o ciclo de venda encurta e a taxa de conversão dispara. Continue alinhado ao seu ICP, isso é ouro. 🥇",
        score: 3
      },
      {
        label: "Temos alguma noção de quem é nosso público-alvo e qual problema resolvemos, mas poderia ser mais bem definido. Às vezes ajustamos o discurso conforme o cliente, ainda buscando encaixar perfeitamente o valor.",
        value: "medium",
        feedback: "Há algum alinhamento, mas falta nitidez. Se você não tem total clareza do nicho e do valor específico que entrega, sua mensagem pode estar difusa. Lembre: \"quem mira em tudo, não acerta em nada\". 🎯 Refine a definição do ICP e ajuste sua proposta de valor para falar diretamente com as dores dele – isso vai diferenciar você da concorrência.",
        score: 2
      },
      {
        label: "Vendemos de forma genérica, tentando atender \"todo mundo\". Não temos um nicho ou dor específica claramente definida – acreditamos que nosso produto serve para qualquer um que apareça.",
        value: "low",
        feedback: "Grave! Quem vende para todo mundo, na verdade não vende para ninguém. Sem ICP definido e proposta de valor específica, você vai continuar gastando energia com leads que nunca vão fechar. Provavelmente seu time está vendendo para quem nunca vai comprar – um desperdício enorme de esforços. Defina urgentemente quem é seu cliente certo e foque nele, ou você continuará dando tiro no escuro. 🔫",
        score: 1
      }
    ]
  },
  {
    id: "q4",
    text: "Você possui um processo para qualificar leads e avaliar o fit (aderência) deles à sua proposta de valor antes de investir pesado no follow-up?",
    pillar: "value-proposition",
    options: [
      {
        label: "Sim, temos critérios claros de qualificação (ex.: segmento, tamanho, necessidade, orçamento). Identificamos cedo se o lead tem fit com nosso produto e raramente perseguimos oportunidades sem potencial real.",
        value: "high",
        feedback: "Muito bom – qualificação rigorosa evita perder tempo com curiosos ou \"turistas\". 📋 Saber dizer \"não\" para leads sem fit economiza energia para focar nos alvos certos. Seu time foca onde há chance real, aumentando eficiência e moral.",
        score: 3
      },
      {
        label: "Em geral qualificamos os leads, mas às vezes acabamos insistindo em leads duvidosos (com baixo fit) na esperança de converter. Falta rigor para dizer \"não\" a quem não encaixa bem.",
        value: "medium",
        feedback: "Você procura qualificar, porém ainda há desperdício perseguindo quem não é tão aderente. Isso é queimar munição com pouco retorno. Muitos vendedores caem na armadilha de tentar salvar leads ruins – em vez disso, ajuste o processo para filtrar melhor. Um lead não qualificado deve sair do funil rapidamente, liberando espaço para oportunidades melhores.",
        score: 2
      },
      {
        label: "Não há um processo formal de qualificação por fit; tentamos vender para qualquer lead que aparece. Só descobrimos que não era cliente ideal depois de gastar tempo (ou nem isso).",
        value: "low",
        feedback: "Sem qualificação, seu time está atirando no escuro. Provavelmente estão gastando a maior parte do tempo com leads que nunca terão fit, ou seja, queimando esforços valiosos sem saber. Esse é um dos maiores vazamentos no funil de vendas: perseguir oportunidades que jamais virariam negócio. 🚱 Implemente imediatamente uma triagem de leads – vai economizar tempo, dinheiro e muita frustração.",
        score: 1
      }
    ]
  },
  {
    id: "q5",
    text: "Você acompanha e analisa regularmente as métricas-chave do seu funil de vendas (como taxa de conversão por etapa, duração média do ciclo de vendas, CAC, LTV, etc.) para tomar decisões?",
    pillar: "commercial-intelligence",
    options: [
      {
        label: "Sim, monitoramos ativamente nossos KPIs de vendas em cada etapa. Temos dashboards ou relatórios frequentes e as decisões estratégicas são baseadas nesses dados concretos.",
        value: "high",
        feedback: "Excelente – gerir por dados é fundamental para escalar com segurança. Você sabe onde ajustar o leme, pois tem inteligência para identificar gargalos e oportunidades rapidamente. Continue assim: times data-driven saem na frente. 📈",
        score: 3
      },
      {
        label: "Acompanhamos apenas o básico (por ex: número de vendas fechadas no mês versus meta) e talvez alguma métrica pontual, mas não analisamos a fundo todo o funil com regularidade.",
        value: "medium",
        feedback: "Você tem alguma visibilidade, mas pode estar perdendo insights importantes. Apenas olhar o resultado final (vendas) é como ver o placar sem assistir ao jogo. ⚠️ Sem analisar as taxas de conversão, duração de ciclo e afins, fica difícil saber por que a meta foi ou não atingida. Aprofunde-se nas métricas de cada etapa – pode descobrir pontos ocultos a otimizar.",
        score: 2
      },
      {
        label: "Praticamente não medimos nem acompanhamos métricas do processo de vendas. Tomamos decisões no feeling ou olhando só faturamento final, sem visibilidade das taxas de conversão ou eficiência do funil.",
        value: "low",
        feedback: "Você está voando às cegas. 😨 Sem métricas do funil, você não sabe o que funciona e o que não funciona. É como dirigir um carro sem painel: pode estar a 200km/h rumo a um muro sem perceber. Essa falta de inteligência de vendas provavelmente está custando caro em oportunidades perdidas. Dado é o novo petróleo – comece a coletar e analisar seus dados comerciais já, ou ficará para trás. ⛽️",
        score: 1
      }
    ]
  },
  {
    id: "q6",
    text: "Sua empresa utiliza ferramentas ou análises avançadas para orientar a estratégia comercial? (Por exemplo: lead scoring, monitoramento de concorrência/mercado, modelos de previsão de vendas, ou IA auxiliando nas decisões.)",
    pillar: "commercial-intelligence",
    options: [
      {
        label: "Sim, usamos inteligência de dados/IA para priorizar leads e prever resultados. Temos ferramentas que nos mostram insights (como probabilidade de fechar, engajamento de leads) e guiam nossa estratégia.",
        value: "high",
        feedback: "Ótimo, vocês estão alavancando a inteligência comercial para vender mais e melhor. Quem domina dados e IA hoje, dominará o mercado amanhã. 🤖💡 Continue refinando esses modelos e ferramentas para manter vantagem competitiva.",
        score: 3
      },
      {
        label: "Usamos um CRM básico e relatórios simples. Não temos análises preditivas ou avançadas – confiamos mais na experiência do que em modelos inteligentes, embora estejamos de olho em possíveis ferramentas.",
        value: "medium",
        feedback: "Há espaço para ganhar vantagem competitiva. Vocês têm o básico, mas ferramentas avançadas poderiam revelar oportunidades e gargalos que hoje passam despercebidos. Pense em implementar, por exemplo, um score de leads (priorizar quem tem mais chance) ou análise de win/loss. Pequenas melhorias em inteligência podem gerar grandes saltos em resultado. 🚀",
        score: 2
      },
      {
        label: "Não utilizamos nada além de planilhas ou anotações individuais. Não aproveitamos inteligência de mercado, automação ou IA; o processo decisório é todo manual e subjetivo.",
        value: "low",
        feedback: "Você está ignorando armas poderosas que já existem. Seus competidores provavelmente já usam automações e IA, e podem estar passando à sua frente enquanto você faz tudo manualmente. É como insistir em cartas num mundo que já usa e-mail. 📫 Considere adotar alguma tecnologia de inteligência (não precisa ser caro ou complexo) para dar suporte às decisões – sem isso, você arrisca ficar ultrapassado no jogo de vendas.",
        score: 1
      }
    ]
  },
  {
    id: "q7",
    text: "Como é estruturado o processo de prospecção na sua empresa (busca ativa de novos leads)?",
    pillar: "prospecting",
    options: [
      {
        label: "Bem definido: temos SDRs ou pré-vendedores dedicados à prospecção ativa. Usamos cadências de contato multicanal (ligações, e-mails, LinkedIn etc.) e metas claras de atividade. O processo de prospectar novos clientes é consistente diariamente.",
        value: "high",
        feedback: "Excelente – prospecção estruturada é o coração de uma Máquina de Vendas. Você tem pessoas focadas 100% em abrir oportunidades e um processo bem desenhado para isso. Isso mantém o pipeline cheio e saudável. 🎣 Continue calibrando as cadências e treinamento dos SDRs para melhorar cada vez mais a qualidade dos leads gerados.",
        score: 3
      },
      {
        label: "Fazemos prospecção, mas sem muita estrutura. Os próprios vendedores cuidam de prospectar quando dá tempo, ou realizamos algumas ações esporádicas (ex: call blitz num mês, campanha isolada noutro). Não há cadência/repetição disciplinada.",
        value: "medium",
        feedback: "Há algum esforço de prospecção, porém falta ritmo e consistência. Resultado: uma montanha-russa no pipeline – horas cheio, horas vazio. 🎢 Sem prospecção contínua, você fica refém do humor da equipe ou da sorte. É hora de organizar isso como um processo repetível e previsível (por exemplo, estabelecer cadências semanais obrigatórias, treinar discurso, separar horário só para prospectar).",
        score: 2
      },
      {
        label: "Não há um processo claro de prospecção ativa. Dependemos sobretudo de leads inbound (marketing), indicações espontâneas, ou do esforço ad hoc do dono/gestor empurrando o time às vezes. Prospecção contínua não é parte da rotina.",
        value: "low",
        feedback: "Se você não prospecta ativamente, está à mercê do acaso. ✋ Depender só de inbound e indicações é esperar o cliente cair do céu. Enquanto isso, concorrentes mais proativos estão indo atrás dos seus potenciais clientes. Isso engorda o pipeline deles – não o seu. Para reverter, você precisa implementar ontem um processo de prospecção estruturado (mesmo que comece pequeno, algum esforço constante é melhor que zero).",
        score: 1
      }
    ]
  },
  {
    id: "q8",
    text: "Quem são os principais responsáveis por fechar vendas hoje na sua empresa?",
    pillar: "prospecting",
    options: [
      {
        label: "Temos uma equipe comercial autônoma – vendedores (e/ou SDRs + closers) que tocam as vendas do início ao fim. Os sócios/CEO não precisam intervir diretamente nas negociações comuns, apenas acompanham resultados.",
        value: "high",
        feedback: "Ótimo, sua operação não depende de heróis individuais. 👥 Um time de vendas que se garante sozinho permite escala (e até que você tire férias em paz). Continue desenvolvendo a equipe e delegando – isso é sinal de um negócio maduro.",
        score: 3
      },
      {
        label: "Temos equipe de vendas, porém a liderança (CEO/diretor) ainda precisa se envolver nos negócios importantes para conseguir fechar. Em vendas mais complexas, o cliente quer falar \"com quem decide\" e o dono acaba entrando em cena.",
        value: "medium",
        feedback: "Entendo – é comum o líder fechar os maiores negócios. Mas isso mostra que o time ainda não consegue andar sem ajuda nos casos mais críticos. Para escalar de verdade, será preciso capacitar o time a fechar grandes contas sem a \"babá do chefe\". 🍼 Considere treinar porta-vozes ou vendedores sêniors que possam assumir esse papel, liberando você para pensar no estratégico.",
        score: 2
      },
      {
        label: "Os sócios ou o CEO ainda são os principais (ou únicos) vendedores de fato. A empresa depende fortemente deles para trazer clientes – sem a atuação direta da liderança, dificilmente algo fecha.",
        value: "low",
        feedback: "Sinal de alerta máximo. 😬 Se você (ou os sócios) são o motor das vendas, a empresa não é escalável e o risco é altíssimo. Imagine se você precisar se ausentar – as vendas param, o que engessa o crescimento. É urgente estruturar um time e um processo que não dependam 100% de você. Caso contrário, você continuará escravo do operacional e limita drasticamente o potencial de crescimento do negócio.",
        score: 1
      }
    ]
  },
  {
    id: "q9",
    text: "O que acontece com leads que demonstram interesse mas não fecham imediatamente? Você tem um processo de follow-up definido?",
    pillar: "conversion",
    options: [
      {
        label: "Sim, temos uma cadência de follow-up bem definida para leads em aberto. Seguimos acompanhando com persistência (vários contatos programados, envio de materiais, propostas revisitadas) até o lead tomar decisão ou ficar claro que não vai avançar. Nada fica esquecido.",
        value: "high",
        feedback: "Excelente – a maioria das vendas exige persistência. 📞📅 Um follow-up disciplinado garante que você capture vendas que outros talvez desistissem. Seus leads não ficam órfãos; assim você extrai o máximo de cada oportunidade gerada. Continue nutrindo esses relacionamentos até o sim (ou um não definitivo).",
        score: 3
      },
      {
        label: "Fazemos alguns follow-ups, mas de forma não tão consistente. Após 2 ou 3 tentativas sem resposta, geralmente partimos para novos leads quentes. Podemos deixar leads morosos esfriarem se não der retorno em algumas investidas.",
        value: "medium",
        feedback: "Você tenta acompanhar, mas pode estar deixando dinheiro na mesa com follow-ups mornos. Muitos negócios só fecham após o 5º ou 6º contato, então 2-3 tentativas podem não bastar. 🔄 Vale a pena intensificar ou prolongar um pouco mais o acompanhamento antes de desistir – às vezes o lead só precisa de mais confiança ou timing certo. Considere criar lembretes automáticos no CRM para retomar esses leads.",
        score: 2
      },
      {
        label: "Não há um acompanhamento estruturado. Se o lead não avançar logo após a proposta ou reunião, acabamos tirando o foco dele. Seguimos adiante e esse prospect \"fica para trás\" sem muita insistência. Na prática, muitos leads interessados acabam esfriando sem receber atenção.",
        value: "low",
        feedback: "Você está literalmente queimando leads valiosos sem saber. 🔥 Leads que demonstraram interesse e não receberam follow-up adequado são oportunidades escorrendo pelo ralo – e possivelmente indo fechar com um concorrente mais insistente. Esse gap de acompanhamento é um dos maiores assassinos de conversão. Implemente imediatamente um processo de follow-up pós-proposta (ex: contatos semanais, oferta de materiais ricos, entender objeções) para não perder vendas praticamente ganhas.",
        score: 1
      }
    ]
  },
  {
    id: "q10",
    text: "Qual é aproximadamente a taxa de conversão do seu funil de vendas (desde um lead qualificado até fechamento)?",
    pillar: "conversion",
    options: [
      {
        label: "Alta – >30%. (Pelo menos 1 em cada 3 leads qualificados vira cliente.)",
        value: "high",
        feedback: "Muito bom – uma conversão alta indica que sua proposta de valor é forte e o time faz um bom trabalho nas etapas finais. 💪 Provavelmente vocês qualificam bem e negociam com eficiência. Só cuide para não se acomodar: mesmo com 30%+, sempre dá para otimizar (por exemplo, buscar 35% no próximo trimestre).",
        score: 3
      },
      {
        label: "Média – entre 10% e 30%. (Algo como 1 em 10 até 1 em 4 leads qualificados fecham negócio.)",
        value: "medium",
        feedback: "Conversão ok, mas certamente dá para melhorar. Há gargalos em algum ponto – pode ser que as propostas não estejam convincentes o suficiente, ou alguma objeção frequente esteja travando os fechamentos. 🤔 Identifique onde ocorrem as perdas (ex: muitos leads param após a demonstração? Ou após receber proposta?) e ataque aquele ponto. Melhorar de, digamos, 15% para 25% de conversão pode praticamente dobrar seu faturamento com o mesmo volume de leads!",
        score: 2
      },
      {
        label: "Baixa – <10%. (Precisa de dezenas de leads para fechar 1 venda, ou sinceramente não medimos esse número com precisão.)",
        value: "low",
        feedback: "Conversão baixa é um sério alerta. Seu time pode estar gastando energia demais com leads que não avançam (falta de fit ou de follow-up?), ou sua apresentação/proposta não está convincente. 📉 De duas uma: ou a qualidade dos leads é ruim (você está falando com as pessoas erradas – lembre da aderência do ICP), ou a condução da venda está falhando em demonstrar valor e fechar. Investigue urgentemente onde está o problema. Muitos leads entrando e poucos virando clientes é como um balde furado – não adianta encher mais leads no topo se eles vazam embaixo. 🪣",
        score: 1
      }
    ]
  },
  {
    id: "q11",
    text: "Sua empresa tem estratégias ativas de pós-venda para reter e expandir clientes existentes? (Ex.: onboarding estruturado, Customer Success acompanhando, programas de upsell/cross-sell, solicitações de indicação, etc.)",
    pillar: "retention",
    options: [
      {
        label: "Sim, temos um processo de pós-venda bem definido. Acompanhamos de perto cada novo cliente (onboarding suave, treinamento), medimos satisfação (NPS/CES) e buscamos ativamente upsells, renovações e indicações. O cliente recebe atenção contínua após a venda.",
        value: "high",
        feedback: "Excelente – cuidar do cliente após a venda gera lealdade, evita cancelamentos e abre espaço para vendas adicionais. Clientes satisfeitos tendem a comprar mais e a indicar outros (virando promoters da sua empresa). 🎉 Você entende que vender não acaba no \"sim\" do cliente; isso certamente melhora seu LTV e reduz o custo de aquisição ao longo do tempo. Continue investindo no sucesso do cliente!",
        score: 3
      },
      {
        label: "Fazemos o básico pós-venda: entregamos/implementamos o produto/serviço e atendemos o cliente quando ele solicita suporte. Porém, não há iniciativas estruturadas de upsell ou relacionamento contínuo visando mais vendas – fica meio passivo.",
        value: "medium",
        feedback: "Você faz o mínimo necessário, mas está perdendo oportunidades valiosas. Sem um pós-venda proativo, você deixa dinheiro na mesa: clientes atuais poderiam gastar mais ou trazer referências, mas você depende da iniciativa deles. 🤷 Que tal surpreender positivamente seu cliente depois do onboarding? Um simples check-in de satisfação ou um oferecimento de upgrade no momento certo podem gerar receita extra e aumentar retenção. Não ignore quem já confiou em você – é muito mais fácil vender para quem já é cliente do que para desconhecidos.",
        score: 2
      },
      {
        label: "Praticamente não há pós-venda. Após fechar o contrato, partimos para caçar o próximo cliente novo. Não temos uma pessoa/time focado em sucesso do cliente ou retenção – a interação pós-venda limita-se a resolver problemas se o cliente reclamar.",
        value: "low",
        feedback: "Ignorar o pós-venda é desperdiçar um ativo enorme. 😩 Você gasta tanto para conquistar um cliente… para depois abandoná-lo? Além de arriscar churn (cancelamento) alto, perde a chance de ouro de vender mais para quem já confia em você. Essa miopia pode estar impedindo um crescimento mais rápido e constante. Estabeleça imediatamente pelo menos um contato pós-venda recorrente (mensal/trimestral) e comece a pensar em estratégias de retenção e upsell – seu faturamento vai agradecer. 💰",
        score: 1
      }
    ]
  },
  {
    id: "q12",
    text: "Como você monitora a retenção de clientes e a receita recorrente?",
    pillar: "retention",
    options: [
      {
        label: "Acompanhamos atentamente indicadores de retenção: sabemos nossa taxa de churn mensal/anual, o valor de vida do cliente (LTV) e temos metas para melhorar esses números. Há relatórios regulares sobre renovação de contratos e uso do produto/serviço pelos clientes.",
        value: "high",
        feedback: "Muito bom – quem não mede, não melhora. 📐 Acompanhar churn e LTV mostra que você está de olho na saúde da base de clientes. Assim, consegue agir rápido se a retenção cai e entender o real valor de cada cliente para o negócio. Empresas com retenção forte crescem muito mais rápido (pois empilham receita nova sobre uma base sólida).",
        score: 3
      },
      {
        label: "Sabemos quando um cliente importante cancela ou reclama, mas não monitoramos métricas de retenção formalmente. Não calculamos churn ou LTV com frequência – percebemos problemas de retenção meio que \"no feeling\" ou quando o faturamento cai.",
        value: "medium",
        feedback: "Você acaba apagando incêndios em vez de prevenir. 🔥 Sem acompanhar métricas de retenção, problemas ficam ocultos até virarem grandes demais (quando um cliente grande cancela de surpresa, por exemplo). Considere começar a medir pelo menos o básico: quantos clientes cancelam por período, motivos de cancelamento, tempo médio de contrato. Esses dados vão permitir ações proativas para segurar a receita.",
        score: 2
      },
      {
        label: "Não monitoramos retenção de forma alguma. O foco da empresa está todo em novas vendas; mal sabemos quantos clientes saem por ano ou quanto do nosso faturamento é recorrente vs. novos negócios.",
        value: "low",
        feedback: "Pode haver uma hemorragia de clientes e você nem sabe. 😵 Focar só em venda nova, sem olhar para trás, é construir um castelo na areia – eventualmente a base desmorona e você perde o esforço investido. Comece a monitorar já a quantidade de cancelamentos e renovações. Se não, corre o risco de estar enchendo um balde furado (entra cliente pela frente e sai pela torneira de trás). Feche esse furo acompanhando e melhorando a retenção! 🩹",
        score: 1
      }
    ]
  },
  {
    id: "q13",
    text: "Quais ferramentas de CRM e automação comercial sua equipe utiliza ativamente?",
    pillar: "tools",
    options: [
      {
        label: "Temos um CRM robusto (por ex: HubSpot, Salesforce) usado diariamente por toda a equipe. Além disso, usamos ferramentas de automação de vendas/cadência (ex: Apollo, Outreach, Prospct.ai) integradas ao nosso processo – agenda de contatos, follow-ups e atualização de dados são semi-automáticos.",
        value: "high",
        feedback: "Excelente – ter um stack bem montado multiplica a produtividade. 🔧 Um CRM bem utilizado evita que oportunidades sejam esquecidas e permite escalar o número de leads trabalhados sem perder qualidade. E com automação, seu time foca energia onde importa (negociar e fechar), deixando tarefas repetitivas para as ferramentas. Você está equipado para crescer rápido.",
        score: 3
      },
      {
        label: "Possuímos um CRM básico ou gratuito (ou planilhas compartilhadas) e usamos parcialmente – nem todos atualizam regularmente. Automação é mínima: a maior parte das interações (envio de e-mails, agendamentos) é feita manualmente pelos vendedores, com pouca ajuda de ferramentas além de e-mail/calendário.",
        value: "medium",
        feedback: "Você tem o básico, mas poderia turbinar o time com melhores ferramentas ou uso mais disciplinado. Um CRM subutilizado é quase tão ruim quanto nenhum – garanta treinamento e cobrance para o time atualizar tudo ali. E procure automatizar tarefas repetitivas: por exemplo, usar templates de e-mail ou um plugin que cadencie follow-ups automaticamente. Isso liberará horas semanais dos vendedores para atividades de maior valor. ⏱️",
        score: 2
      },
      {
        label: "Não usamos CRM (ou temos um que está \"encostado\"). O controle de oportunidades é informal (anotações individuais, planilhas pessoais) e não temos nenhuma ferramenta de automação comercial. Todo o acompanhamento de leads e clientes depende da memória e esforço individual.",
        value: "low",
        feedback: "Hora de sair da Idade da Pedra do comércio! 🪨 Sem CRM e automação, você está voando no \"papel e caneta\" em plena era digital. Isso significa oportunidades caindo no esquecimento, falta de histórico, zero insight sobre o funil e muita ineficiência. A concorrência agradece cada dia que você continuar assim. Comece ao menos com uma ferramenta simples (existem CRMs gratuitos) para centralizar contatos e acompanhar o pipeline. A diferença será da água para o vinho. 🍷",
        score: 1
      }
    ]
  },
  {
    id: "q14",
    text: "Seu time comercial já utiliza Inteligência Artificial em alguma etapa do processo? (Ex.: um SDR virtual para prospecção automática, chatbots de atendimento, algoritmos de recomendação ou análise de conversas de vendas.)",
    pillar: "tools",
    options: [
      {
        label: "Sim, já incorporamos ferramentas de IA – por exemplo, utilizamos um SDR virtual (IA) que prospecta leads 24h/dia ou agenda reuniões sozinho, ou usamos IA para analisar ligações/vídeos de vendas e treinar o time. A IA faz parte do nosso fluxo de trabalho.",
        value: "high",
        feedback: "Ponta de lança! 🚀 Vocês estão aproveitando o que há de mais moderno. Um SDR de IA trabalhando incansavelmente (24/7) pode gerar demanda infinita, enquanto as análises de IA refinam a qualidade. Quem adota IA cedo ganha anos-luz de vantagem em eficiência. Continue explorando novas aplicações – a IA evolui rápido e vocês estão surfando essa onda. 🌊",
        score: 3
      },
      {
        label: "Estamos experimentando algo de IA, mas de forma limitada. Talvez tenhamos um chatbot simples no site, ou testamos alguma ferramenta como o Prospct.ai em um projeto-piloto. Porém, não é algo integrado no processo principal ainda.",
        value: "medium",
        feedback: "Vocês estão de olho, o que é bom – mas não demorem para abraçar a IA de vez. A cada dia que passa, a IA fica mais acessível e poderosa. Empresas que integrarem IA ao comercial agora vão deixar os retardatários comendo poeira. 🤖 Se já testaram algo como o Prospct, avaliem expandir o uso. Considere também IA para qualificação de leads ou para personalizar abordagens em escala. Dê o próximo passo logo para não ficar para trás.",
        score: 2
      },
      {
        label: "Não utilizamos nada de IA no comercial até o momento. Nenhum chatbot, automação inteligente ou análise automatizada – tudo ainda 100% humano/manual.",
        value: "low",
        feedback: "Alerta de atraso! Ignorar IA hoje é como insistir em fax na era do e-mail. 📨 Seus concorrentes podem estar prospectando e nutrindo leads de forma automatizada enquanto você nem sabe por onde começar. Não tenha medo – há soluções simples e baratas de IA que podem ajudar muito (por exemplo, agendamento automático de reuniões, assistentes virtuais para qualificar leads). Comece pequeno, mas comece. Se não, você ficará fora do jogo enquanto o mercado inteiro adota vendas inteligentes.",
        score: 1
      }
    ]
  }
];

// Get evaluation level based on score and number of questions
export const getPillarEvaluation = (score: number, totalQuestions: number): OptionValue => {
  const maxScore = totalQuestions * 3; // 3 is the max score per question
  const percentage = (score / maxScore) * 100;
  
  if (percentage >= 75) return 'high';
  if (percentage >= 50) return 'medium';
  return 'low';
};

// Get overall evaluation based on total score and possible score
export const getOverallEvaluation = (score: number, possibleScore: number): OptionValue => {
  const percentage = (score / possibleScore) * 100;
  
  if (percentage >= 75) return 'high';
  if (percentage >= 50) return 'medium';
  return 'low';
};

