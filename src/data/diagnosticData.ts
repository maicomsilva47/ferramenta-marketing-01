
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
export const evaluationLabels: Record<string, string> = {
  'high': 'Alto',
  'medium': 'Médio',
  'low': 'Baixo'
};

// Functions to evaluate pillar and overall scores
export const getPillarEvaluation = (score: number, questionCount: number): 'high' | 'medium' | 'low' => {
  const percentage = (score / (questionCount * 4)) * 100; // Updated to use 4 as max score
  
  if (percentage >= 70) return 'high';
  if (percentage >= 40) return 'medium';
  return 'low';
};

export const getOverallEvaluation = (totalScore: number, totalPossibleScore: number): 'high' | 'medium' | 'low' => {
  const percentage = (totalScore / totalPossibleScore) * 100;
  
  if (percentage >= 70) return 'high';
  if (percentage >= 40) return 'medium';
  return 'low';
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
        'Sua empresa possui um processo de vendas bem definido, documentado e seguido consistente por toda a equipe comercial. As etapas do funil são claras, com critérios objetivos de avanço e ações específicas em cada fase.',
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
        'Sua empresa tem um processo de vendas básico estabelecido, mas nem sempre ele é seguido consistente ou existem lacunas importantes em alguma das etapas do funil.',
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

// Resources needed for DiagnosticResults.tsx to avoid the build error
export const resources = {
  videos: [],
  podcasts: [],
  articles: []
};

// Diagnostic questions (updated based on the provided content)
export const diagnosticQuestions: DiagnosticQuestion[] = [
  // Pilar 1: Estratégia de Receita
  {
    id: "q1",
    text: "Sua empresa realmente possui uma estratégia de receita clara e focada ou está \"atirando para todos os lados\" sem rumo?",
    pillar: "revenue-strategy",
    options: [
      {
        label: "Nenhuma estratégia definida: Metas e planos de receita praticamente não existem; perseguimos oportunidades conforme aparecem, sem foco claro.",
        value: 1,
        feedback: "Sem estratégia, você está navegando sem bússola. Defina direção clara para seu time comercial imediatamente.",
        score: 1
      },
      {
        label: "Metas sem plano detalhado: Temos objetivos genéricos de faturamento, mas sem um plano concreto de como alcançá-los (é mais um desejo do que uma estratégia).",
        value: 2,
        feedback: "Objetivos sem plano de execução são apenas aspirações. Detalhe o caminho para alcançar suas metas.",
        score: 2
      },
      {
        label: "Estratégia parcial: Há uma estratégia de receita definida, porém não é seguida rigorosamente nem revisada com frequência – acaba ficando no papel.",
        value: 3,
        feedback: "Uma estratégia que não é seguida vale pouco. Estabeleça check-ins regulares e responsabilize o time pelo cumprimento.",
        score: 3
      },
      {
        label: "Estratégia clara e acompanhada: Temos uma estratégia de receita sólida, com metas realistas baseadas em dados e um plano acompanhado de perto pela liderança.",
        value: 4,
        feedback: "Excelente! Uma estratégia clara e monitorada é a base do crescimento previsível. Continue refinando conforme os resultados aparecem.",
        score: 4
      }
    ]
  },
  {
    id: "q2",
    text: "Quão diversificada e previsível é sua geração de receita: vocês dependem de poucos clientes/produtos ou têm múltiplas fontes bem distribuídas?",
    pillar: "revenue-strategy",
    options: [
      {
        label: "Extremamente concentrada: Dependemos de 1 ou 2 clientes-chave ou de um único produto/serviço; alto risco de \"colocar todos os ovos na mesma cesta\".",
        value: 1,
        feedback: "Risco crítico! Alta concentração deixa seu negócio vulnerável. Diversifique urgentemente sua base de clientes e ofertas.",
        score: 1
      },
      {
        label: "Pouco diversificada: A maior parte da receita vem de alguns poucos clientes ou um único segmento de mercado, com pouca margem de segurança.",
        value: 2,
        feedback: "Ainda existe concentração perigosa. Inicie planos de expansão para novos segmentos ou canais antes que seja tarde.",
        score: 2
      },
      {
        label: "Moderadamente diversificada: Temos várias fontes de receita (diversos clientes, produtos ou segmentos), mas algumas dominam bem mais que as outras.",
        value: 3,
        feedback: "Você está no caminho certo, mas pode melhorar. Continue distribuindo o risco entre mais fontes de receita.",
        score: 3
      },
      {
        label: "Altamente diversificada: Nossa receita vem de múltiplos canais, produtos ou segmentos, sem depender excessivamente de um único cliente – fluxo de receita mais equilibrado e previsível.",
        value: 4,
        feedback: "Perfeito! Uma receita bem diversificada é mais resiliente a crises e mudanças de mercado. Mantenha essa diversificação.",
        score: 4
      }
    ]
  },
  {
    id: "q3",
    text: "Suas metas de vendas são baseadas em um funil bem calculado ou vocês \"jogam a meta na parede e rezam para bater\"?",
    pillar: "revenue-strategy",
    options: [
      {
        label: "Chute total: Definimos metas sem qualquer base concreta de funil ou conversões – é praticamente um palpite e depois torcemos para dar certo.",
        value: 1,
        feedback: "Metas sem fundamentação são apenas fantasias. Comece a analisar seu funil e taxas de conversão para definir objetivos realistas.",
        score: 1
      },
      {
        label: "Pouco embasamento: Consideramos alguns números do passado para as metas, mas não fazemos um cálculo sério de funil (taxa de conversão, volume de leads necessário etc.).",
        value: 2,
        feedback: "Ainda há muito 'achismo'. Analise mais profundamente as métricas de conversão em cada etapa do funil para fundamentar suas metas.",
        score: 2
      },
      {
        label: "Parcialmente baseado em funil: Usamos dados históricos de conversão para guiar metas, porém sem muito rigor; acompanhamos de longe se o funil condiz com o objetivo.",
        value: 3,
        feedback: "Você está no caminho certo. Refine seu modelo de funil e acompanhe mais de perto as conversões entre etapas.",
        score: 3
      },
      {
        label: "Totalmente orientado por funil: As metas de receita derivam de um funil estruturado (sabemos quantos leads, propostas e negociações precisamos) e monitoramos constantemente o progresso para ajustar o plano.",
        value: 4,
        feedback: "Excelente! Metas baseadas em um funil bem calculado são realistas e acionáveis. Continue monitorando e refinando seu modelo.",
        score: 4
      }
    ]
  },
  {
    id: "q4",
    text: "Vocês definiram estratégias claras de preço baseadas em valor e mercado, ou cobram \"o que dá\" e pronto?",
    pillar: "revenue-strategy",
    options: [
      {
        label: "Preço no improviso: Não temos uma estratégia de precificação definida; os preços são definidos meio no \"feeling\" ou copiando o que o concorrente cobra, sem entender muito o valor para o cliente.",
        value: 1,
        feedback: "Precificação sem estratégia é receita para margens baixas. Defina uma abordagem estruturada imediatamente.",
        score: 1
      },
      {
        label: "Preço básico: Temos preços fixados, mas sem grande análise de valor percebido ou pesquisas de mercado aprofundadas – é um básico \"custo + margem\" e olhe lá.",
        value: 2,
        feedback: "Você está deixando dinheiro na mesa. Estude o valor percebido pelo cliente para definir preços mais estratégicos.",
        score: 2
      },
      {
        label: "Preço orientado parcialmente ao valor: Consideramos custo e algum valor para o cliente na precificação, talvez com ajustes para alguns segmentos, mas não revisamos isso com frequência ou fineza.",
        value: 3,
        feedback: "Bom caminho! Continue refinando sua compreensão do valor percebido por diferentes segmentos para otimizar preços.",
        score: 3
      },
      {
        label: "Precificação estratégica: Nossos preços são definidos estrategicamente com base no valor que entregamos e em estudos de mercado/concorrentes, e revisitamos a estratégia de preço periodicamente para manter competitividade e margem.",
        value: 4,
        feedback: "Excelente! Uma estratégia de preço baseada em valor maximiza suas margens e posicionamento. Continue revisando periodicamente.",
        score: 4
      }
    ]
  },
  {
    id: "q5",
    text: "Sua estratégia de crescimento de receita para os próximos 12 meses está bem delineada ou vocês confiam no \"vamos ver no que dá\" e reagem ao sabor do vento?",
    pillar: "revenue-strategy",
    options: [
      {
        label: "Nenhum plano de crescimento: Não existe um plano claro de como crescer; vamos tocando as vendas mês a mês e se crescer, cresceu.",
        value: 1,
        feedback: "Sem plano de crescimento, você está à deriva. Estabeleça objetivos claros e estratégias para os próximos 12 meses urgentemente.",
        score: 1
      },
      {
        label: "Intenção sem detalhamento: Temos um objetivo de crescer (ex: \"dobrar de tamanho\"), porém sem um plano detalhado de iniciativas ou investimentos para viabilizar isso.",
        value: 2,
        feedback: "Ambição sem planejamento raramente se concretiza. Detalhe as iniciativas específicas que levarão ao crescimento desejado.",
        score: 2
      },
      {
        label: "Plano de alto nível: Existe um plano de crescimento com iniciativas definidas (novos mercados, contratações, produto etc.), mas faltam detalhes finos ou acompanhamento estruturado de cada iniciativa.",
        value: 3,
        feedback: "Bom início! Agora detalhe melhor cada iniciativa com responsáveis, prazos e indicadores de sucesso para garantir execução.",
        score: 3
      },
      {
        label: "Estratégia de crescimento sólida: Possuímos um roadmap claro de crescimento, com iniciativas prioritárias, responsáveis designados e checkpoints ao longo do ano – e executamos/ajustamos esse plano ativamente.",
        value: 4,
        feedback: "Perfeito! Um plano detalhado com acompanhamento ativo maximiza suas chances de atingir os objetivos de crescimento.",
        score: 4
      }
    ]
  },
  {
    id: "q6",
    text: "A estratégia de receita está alinhada entre Vendas e Marketing ou cada área puxa para um lado diferente?",
    pillar: "revenue-strategy",
    options: [
      {
        label: "Desalinhado total: Vendas e Marketing parecem empresas distintas – não há plano unificado. Marketing faz ações que não geram leads qualificados e Vendas reclama, enquanto cada um culpa o outro pelos resultados.",
        value: 1,
        feedback: "Times desalinhados desperdiçam recursos e oportunidades. Estabeleça reuniões de alinhamento e objetivos comuns imediatamente.",
        score: 1
      },
      {
        label: "Alinhamento fraco: Até existe comunicação entre Vendas e Marketing (reuniões ocasionais), mas as estratégias não são realmente construídas juntas. Cada um tem suas metas e iniciativas sem muita coordenação.",
        value: 2,
        feedback: "Comunicação não é suficiente sem alinhamento estratégico. Defina metas compartilhadas e planeje campanhas em conjunto.",
        score: 2
      },
      {
        label: "Alinhamento moderado: Algumas campanhas de Marketing são planejadas considerando as metas de Vendas e há diálogo para ajustar mensagens e público, porém ainda ocorrem desencontros ou prioridades conflitantes entre os times.",
        value: 3,
        feedback: "Você está no caminho certo. Formalize mais o alinhamento com rituais regulares e métricas compartilhadas entre os times.",
        score: 3
      },
      {
        label: "Total sintonia: Vendas e Marketing atuam como um só time. Há planejamento integrado – desde definição de ICP, mensagens-chave, calendário de campanhas – tudo voltado às metas de receita comuns, com feedback constante entre as áreas.",
        value: 4,
        feedback: "Excelente! Times alinhados multiplicam resultados. Continue mantendo essa integração e feedback constante entre as áreas.",
        score: 4
      }
    ]
  },
  {
    id: "q7",
    text: "Vocês revisam e adaptam a estratégia de receita conforme os resultados e mudanças de mercado, ou definem no início do ano e \"deixam na gaveta\"?",
    pillar: "revenue-strategy",
    options: [
      {
        label: "Engessada/ausente: Praticamente não revisamos a estratégia depois de definida; traçamos metas no início do ano e só vamos ver o que aconteceu no final (quando muito).",
        value: 1,
        feedback: "Estratégias estáticas são ineficazes em mercados dinâmicos. Implemente revisões trimestrais imediatamente.",
        score: 1
      },
      {
        label: "Revisão tardia: Só repensamos a estratégia quando a água bate no pescoço – se meses passam longe da meta, aí corremos atrás de alguma mudança emergencial.",
        value: 2,
        feedback: "Reagir apenas a crises é arriscado. Estabeleça checkpoints regulares para avaliar e ajustar antes dos problemas crescerem.",
        score: 2
      },
      {
        label: "Ajustes pontuais: Revisamos a estratégia em alguns intervalos (por exemplo, trimestralmente) ou quando identificamos desvios significativos, mas podemos pecar em velocidade de reação a mudanças rápidas.",
        value: 3,
        feedback: "Bom ritmo de revisão. Considere adicionar monitoramento contínuo de alguns indicadores-chave para reagir ainda mais rapidamente.",
        score: 3
      },
      {
        label: "Ágil e dinâmica: Mantemos a estratégia \"viva\": acompanhamos indicadores-chave de receita continuamente e fazemos ajustes rápidos assim que necessário – sem medo de pivotar se o mercado mudar ou se as iniciativas não derem resultado.",
        value: 4,
        feedback: "Perfeito! Uma abordagem ágil de estratégia permite adaptação rápida às mudanças de mercado, maximizando oportunidades.",
        score: 4
      }
    ]
  },

  // Pilar 2: Proposta de Valor
  {
    id: "q8",
    text: "Sua proposta de valor está claramente definida e documentada ou cada vendedor vende \"do seu jeito\", contando uma história diferente?",
    pillar: "value-proposition",
    options: [
      {
        label: "Nada definido: Não temos uma proposta de valor formalizada. Cada vendedor improvisa a própria abordagem e valor que acha que entregamos, resultando em mensagens desencontradas.",
        value: 1,
        feedback: "Mensagens inconsistentes confundem clientes. Defina e documente sua proposta de valor imediatamente.",
        score: 1
      },
      {
        label: "Genérica e pouco usada: Temos uma frase genérica de proposta de valor escrita em algum lugar, mas ela não é realmente utilizada no dia a dia e muitos no time nem lembram direito.",
        value: 2,
        feedback: "Uma proposta de valor ignorada não tem utilidade. Revise-a para torná-la relevante e treine sua equipe para utilizá-la consistentemente.",
        score: 2
      },
      {
        label: "Clara mas não unânime: Possuímos uma proposta de valor clara e documentada, e boa parte do time a conhece, embora nem todos a utilizem ou acreditem nela 100%.",
        value: 3,
        feedback: "Bom início! Agora trabalhe na adoção completa pela equipe - talvez seja hora de revisitar e validá-la com o feedback do time.",
        score: 3
      },
      {
        label: "Nítida e consistente: Nossa proposta de valor está cristalina e difundida. Todo o time sabe exatamente qual problema do cliente resolvemos e o benefício único que entregamos – e comunica isso de forma consistente.",
        value: 4,
        feedback: "Excelente! Uma mensagem clara e consistente fortalece seu posicionamento e facilita as vendas. Continue reforçando-a regularmente.",
        score: 4
      }
    ]
  },
  {
    id: "q9",
    text: "Você conhece profundamente as dores e necessidades do cliente ideal ou assume que sabe (sem nunca ter perguntado diretamente)?",
    pillar: "value-proposition",
    options: [
      {
        label: "Achismo total: Nunca fizemos pesquisa ou conversas estruturadas para entender dores do cliente. Vendemos baseado em suposições do que achamos que ele precisa, na base do \"achômetro\".",
        value: 1,
        feedback: "Vender baseado em suposições é um tiro no escuro. Inicie hoje mesmo conversas com clientes para entender suas verdadeiras necessidades.",
        score: 1
      },
      {
        label: "Visão superficial: Temos uma noção básica das dores do cliente (baseada na experiência de vendas), mas nada muito detalhado ou validado – não há documentação ou atualização frequente.",
        value: 2,
        feedback: "Conhecimento não estruturado é facilmente perdido. Documente e aprofunde o entendimento das necessidades específicas de seus clientes.",
        score: 2
      },
      {
        label: "Conhecimento razoável: Entendemos as principais dores e necessidades do nosso cliente ideal e colhemos feedback informalmente com certa regularidade, embora possamos aprofundar mais ou atualizar algumas percepções.",
        value: 3,
        feedback: "Bom entendimento! Considere tornar mais sistemática a coleta de insights, talvez com pesquisas periódicas estruturadas.",
        score: 3
      },
      {
        label: "Intimidade com o cliente: Mapeamos de forma contínua as dores, desafios e necessidades dos clientes ideais através de pesquisas, entrevistas ou feedback estruturado. Sabemos exatamente o que mantém nosso cliente acordado à noite – e nossa solução foca nisso.",
        value: 4,
        feedback: "Excelente! Conhecimento profundo do cliente é uma vantagem competitiva poderosa. Continue atualizando esse entendimento regularmente.",
        score: 4
      }
    ]
  },
  {
    id: "q10",
    text: "Sua solução se diferencia claramente da concorrência ou, sinceramente, seria difícil notar diferença se comparar lado a lado?",
    pillar: "value-proposition",
    options: [
      {
        label: "\"Mais do mesmo\": Nosso produto/serviço é praticamente igual a muitos concorrentes; não temos diferenciais claros e competimos só em preço ou relacionamento.",
        value: 1,
        feedback: "Commoditização leva à guerra de preços. Identifique ou desenvolva diferenciais reais urgentemente.",
        score: 1
      },
      {
        label: "Diferenciais fracos: Temos um ou outro ponto diferente, mas nada gritante. O mercado não percebe muito valor único – talvez um atendimento melhor, ou alguns recursos a mais, porém sem destaque forte.",
        value: 2,
        feedback: "Diferenciais sutis são facilmente ignorados. Trabalhe para tornar suas vantagens mais evidentes e valorizadas pelo mercado.",
        score: 2
      },
      {
        label: "Bom diferencial, mal explorado: Temos diferenciais relevantes em relação à concorrência, porém admitimos que não estamos comunicando ou posicionando esses diferenciais de forma efetiva nas vendas.",
        value: 3,
        feedback: "Diferenciais não comunicados são oportunidades perdidas. Treine sua equipe para destacá-los melhor durante o processo de vendas.",
        score: 3
      },
      {
        label: "Proposta única de valor: Nossa oferta tem um diferencial inegável e marcante que nos separa dos demais, e fazemos questão de enfatizar isso em toda oportunidade – o cliente entende claramente por que nos escolher e não o concorrente.",
        value: 4,
        feedback: "Perfeito! Um diferencial claro e bem comunicado é a base para evitar competição por preço e aumentar margens.",
        score: 4
      }
    ]
  },
  {
    id: "q11",
    text: "A mensagem de vendas é adaptada para diferentes perfis de cliente ou vocês reciclam o mesmo discurso genérico para todo mundo?",
    pillar: "value-proposition",
    options: [
      {
        label: "One-size-fits-all: Usamos praticamente o mesmo discurso padrão para qualquer prospect, independentemente do porte, segmento ou persona.",
        value: 1,
        feedback: "Mensagens genéricas não ressoam com ninguém. Comece a segmentar seu discurso por tipo de cliente imediatamente.",
        score: 1
      },
      {
        label: "Adaptação mínima: Segmentamos muito pouco. Talvez mudemos uma coisinha ou outra se o cliente for muito diferente, mas na essência a abordagem é igual para todos.",
        value: 2,
        feedback: "Ajustes superficiais não são suficientes. Desenvolva mensagens específicas para cada segmento importante do seu mercado.",
        score: 2
      },
      {
        label: "Customização moderada: Adaptamos a mensagem de vendas para alguns segmentos ou perfis principais – por exemplo, temos versões diferentes da apresentação para setores distintos – porém ainda podemos refiná-las e torná-las mais específicas.",
        value: 3,
        feedback: "Bom começo! Continue refinando e especializando suas mensagens para ressoar ainda melhor com cada público-alvo.",
        score: 3
      },
      {
        label: "Discurso segmentado: Temos discursos de vendas diferentes para cada perfil/segmento relevante. Abordamos um diretor de tecnologia de uma indústria de forma diferente de um gerente de RH de serviços, pois entendemos que as dores e linguagem são outras – e isso está mapeado e treinado no time.",
        value: 4,
        feedback: "Excelente! Mensagens altamente segmentadas demonstram entendimento profundo e aumentam dramaticamente a eficácia da comunicação.",
        score: 4
      }
    ]
  },
  {
    id: "q12",
    text: "Você valida e ajusta sua proposta de valor com feedback real do mercado ou assume que \"está tudo ok\" porque ninguém reclamou diretamente?",
    pillar: "value-proposition",
    options: [
      {
        label: "Nunca validada: Nunca buscamos feedback estruturado sobre nossa proposta de valor. Se os clientes compram, assumimos que está boa; se não compram, culpamos preço ou equipe, mas não revisitamos a proposta em si.",
        value: 1,
        feedback: "Ausência de feedback deixa você operando às cegas. Inicie um programa de coleta de insights imediatamente.",
        score: 1
      },
      {
        label: "Pouco feedback: Ocasionalmente recebemos algum feedback de clientes ou lost deals e fazemos pequenos ajustes na mensagem, mas não há um processo ativo de validação – só reagimos quando um problema grande aparece.",
        value: 2,
        feedback: "Feedback reativo é insuficiente. Estabeleça um processo proativo de coleta de insights de clientes e prospects.",
        score: 2
      },
      {
        label: "Aprende ocasionalmente: Já coletamos feedback de alguns clientes/leads sobre nossa proposta de valor e fizemos ajustes importantes ao longo do tempo, embora não seja algo contínuo e sistemático.",
        value: 3,
        feedback: "Bom início! Agora torne esse processo mais sistemático e frequente para refinar continuamente sua proposta de valor.",
        score: 3
      },
      {
        label: "Melhoria contínua: Temos um ciclo ativo de feedback – pesquisamos clientes e prospects regularmente sobre o que eles valorizam, por que compraram/não compraram – e refinamos nossa proposta de valor e discurso constantemente a partir desses insights.",
        value: 4,
        feedback: "Excelente! Um ciclo constante de feedback mantém sua proposta de valor sempre relevante e impactante. Continue esse trabalho.",
        score: 4
      }
    ]
  },
  {
    id: "q13",
    text: "Seus materiais de marketing e vendas (site, apresentações, conteúdo) refletem claramente a sua proposta de valor ou são genéricos e confusos?",
    pillar: "value-proposition",
    options: [
      {
        label: "Genéricos/confusos: Nosso site e apresentações falam muito de nós (características, \"líder no mercado\" etc.) mas pouco do valor para o cliente. Quem lê não entende direito qual problema resolvemos ou diferencial oferecido.",
        value: 1,
        feedback: "Materiais autocentrados não vendem. Refaça urgentemente focando nos problemas do cliente e como você os resolve.",
        score: 1
      },
      {
        label: "Meio a meio: Nossos materiais mencionam alguns benefícios e valor, mas ainda trazem muita informação genérica e jargões vazios. Dá para entender o que fazemos, mas não fica tão claro o valor único nem por que somos diferentes.",
        value: 2,
        feedback: "Mensagens nebulosas dificultam conversões. Simplifique e deixe mais evidente o valor específico que você entrega.",
        score: 2
      },
      {
        label: "Alinhados em boa parte: Já ajustamos nossos materiais para focar mais no cliente e seu benefício. A proposta de valor aparece, embora possamos deixá-la ainda mais destacada ou explicada de forma mais simples.",
        value: 3,
        feedback: "Bom trabalho! Continue refinando para tornar o valor ainda mais evidente e impactante em todos os materiais.",
        score: 3
      },
      {
        label: "Valor na veia: Todo nosso material deixa explícito o valor para o cliente. Do site às propostas comerciais, o foco está nas dores do cliente e como as resolvemos, sem lenga-lenga. Qualquer prospect que olhar rapidamente já entende o benefício de trabalhar conosco.",
        value: 4,
        feedback: "Perfeito! Materiais centrados no cliente e seu valor demonstram maturidade comercial e geram mais conversões.",
        score: 4
      }
    ]
  },
  {
    id: "q14",
    text: "Sua equipe comercial sabe, sem enrolar, explicar em poucos segundos por que o cliente deve escolher vocês? (O famoso \"elevator pitch\" afiado.)",
    pillar: "value-proposition",
    options: [
      {
        label: "Cada um fala uma coisa: Se você perguntar a 5 vendedores diferentes por que nossa empresa é a melhor opção, vai ouvir 5 respostas diferentes – e nenhuma muito convincente.",
        value: 1,
        feedback: "Mensagens inconsistentes minam credibilidade. Desenvolva um elevator pitch padrão e treine toda a equipe imediatamente.",
        score: 1
      },
      {
        label: "Conhecem o básico: A equipe sabe apontar 1 ou 2 motivos genéricos (\"temos qualidade\", \"atendimento bom\"), mas nada que realmente destaque valor de forma impactante ou diferenciada.",
        value: 2,
        feedback: "Argumentos genéricos não convencem. Refine seu pitch para destacar benefícios específicos e mensuráveis.",
        score: 2
      },
      {
        label: "Boa parte sabe vender o peixe: A maioria do time consegue articular nosso diferencial e proposta de valor razoavelmente, embora alguns ainda se percam em detalhes ou usem um discurso menos polido.",
        value: 3,
        feedback: "Bom progresso! Faça exercícios de pitch regularmente para nivelar e aprimorar a comunicação de toda a equipe.",
        score: 3
      },
      {
        label: "Pitch na ponta da língua: Todo vendedor na empresa tem um pitch direto e poderoso. Se alguém pergunta \"por que vocês?\", eles respondem de bate-pronto com uma proposição de valor clara e atrativa que cala qualquer objeção inicial.",
        value: 4,
        feedback: "Excelente! Um pitch afiado e consistente é uma arma poderosa de vendas. Continue praticando e refinando-o.",
        score: 4
      }
    ]
  },

  // Pilar 3: Inteligência Comercial
  {
    id: "q15",
    text: "As decisões e ações comerciais são guiadas por dados e análises ou pelo famoso \"achismo\" e intuição do time?",
    pillar: "commercial-intelligence",
    options: [
      {
        label: "100% achismo: Praticamente decidimos com base em feeling. Raramente analisamos dados de vendas ou mercado – vamos do jeito que a experiência/intuição manda.",
        value: 1,
        feedback: "Decisões baseadas em intuição são arriscadas. Comece a coletar e analisar dados básicos de vendas imediatamente.",
        score: 1
      },
      {
        label: "Mais achismo do que dado: Às vezes olhamos um número ou outro (por exemplo, resultado do mês passado) para decidir algo, mas no geral a intuição e opinião pessoal de líderes prevalece sobre análises objetivas.",
        value: 2,
        feedback: "Dados ocasionais são insuficientes. Estabeleça um conjunto mínimo de métricas a serem analisadas regularmente.",
        score: 2
      },
      {
        label: "Parcialmente orientado a dados: Usamos dados para decisões importantes (ex: definir meta anual, avaliar desempenho trimestral) e acompanhamos algumas métricas, porém ainda existem muitas decisões tomadas sem uma análise rigorosa de informação.",
        value: 3,
        feedback: "Bom progresso! Agora expanda o uso de dados para decisões táticas e operacionais do dia a dia.",
        score: 3
      },
      {
        label: "Cultura data-driven: Quase todas as decisões comerciais são baseadas em dados concretos. Temos cultura de medir, analisar e decidir – do nível estratégico até ajustes táticos – minimizando achismos.",
        value: 4,
        feedback: "Excelente! Uma cultura orientada a dados leva a decisões mais acertadas e resultados previsíveis. Continue aprimorando suas análises.",
        score: 4
      }
    ]
  },
  {
    id: "q16",
    text: "Vocês monitoram métricas-chave do funil de vendas (taxa de conversão por etapa, tempo de ciclo, CAC etc.) ou operam \"no escuro\"?",
    pillar: "commercial-intelligence",
    options: [
      {
        label: "No escuro: Não acompanhamos indicadores de funil. Para ser franco, não sabemos ao certo nossas taxas de conversão em cada etapa, custo de aquisição de cliente (CAC) ou tempo médio de venda. Vamos pelo resultado final e olhe lá.",
        value: 1,
        feedback: "Sem métricas, você está dirigindo vendado. Comece a medir urgentemente as taxas básicas de conversão por etapa.",
        score: 1
      },
      {
        label: "Pouca visibilidade: Acompanhamos uma métrica ou outra – por exemplo, sabemos quantos leads viram propostas ou quantos fechamentos tivemos – mas não temos uma visão completa e quantificada de cada etapa do pipeline.",
        value: 2,
        feedback: "Visão parcial limita otimização. Expanda seu monitoramento para cobrir todo o funil de vendas, do topo ao fundo.",
        score: 2
      },
      {
        label: "Acompanhamento básico: Temos algumas métricas de funil estabelecidas e registradas (como conversão de proposta para fechamento, tempo médio de fechamento, CAC aproximado), porém a análise pode não ser tão frequente ou aprofundada.",
        value: 3,
        feedback: "Bom conjunto de métricas! Agora aprofunde a análise e use-a mais ativamente para ajustar estratégias e táticas.",
        score: 3
      },
      {
        label: "Métricas na mão: Monitoramos rigorosamente nosso funil: sabemos as taxas de conversão de cada fase, tempo médio de venda, CAC, LTV e outros indicadores relevantes. E mais importante – analisamos ativamente esses números para otimizar o processo.",
        value: 4,
        feedback: "Excelente! Monitoramento completo permite identificar gargalos e oportunidades de melhoria com precisão. Continue essa prática.",
        score: 4
      }
    ]
  },
  {
    id: "q17",
    text: "Seu Perfil de Cliente Ideal (ICP) está claramente definido com base em dados (ex.: análise de clientes que mais dão certo) ou é vago – \"quem pagar, tá valendo\"?",
    pillar: "commercial-intelligence",
    options: [
      {
        label: "ICP inexistente: Não temos um ICP definido. Vendemos para qualquer um que demonstre interesse e tenha dinheiro, sem critérios claros – depois lidamos com quem não encaixa.",
        value: 1,
        feedback: "Sem foco, você desperdiça recursos. Defina urgentemente quem são seus clientes ideais com base nos melhores casos atuais.",
        score: 1
      },
      {
        label: "ICP \"palpite\": Temos uma ideia de que tipo de cliente queremos, mas não foi baseada em análise e sim na percepção da liderança ou dos vendedores. Não está formalizado nem validado por dados de sucesso de clientes.",
        value: 2,
        feedback: "Percepções podem ser enganosas. Analise sua base de clientes para identificar padrões objetivos de sucesso e fit.",
        score: 2
      },
      {
        label: "ICP definido basicamente: Definimos um ICP com alguns critérios (porte, setor, cargo) baseado em observações de bons clientes atuais, mas talvez falte aprofundar (por exemplo, olhar quais têm maior lifetime value, menor churn) para refinar esse perfil.",
        value: 3,
        feedback: "Bom início! Agora refine com análises mais profundas, considerando métricas como LTV, custo de aquisição e satisfação.",
        score: 3
      },
      {
        label: "ICP bem mapeado: Temos claros os perfis ideais de cliente – definidos analisando nossa base (clientes que geram mais valor, permanecem mais tempo, têm menor custo de aquisição). Esse ICP guia nossas decisões de prospecção e marketing, e é revisitado conforme novos dados surgem.",
        value: 4,
        feedback: "Excelente! Um ICP bem definido e baseado em dados direciona recursos para os clientes mais rentáveis e adequados. Continue refinando-o.",
        score: 4
      }
    ]
  },
  {
    id: "q18",
    text: "Vocês estudam ativamente os concorrentes e o mercado ou só ficam sabendo das tendências quando perdem uma venda para alguém?",
    pillar: "commercial-intelligence",
    options: [
      {
        label: "Zero inteligência de mercado: Não realizamos pesquisas nem acompanhamos concorrentes. Só descobrimos o que concorrentes estão fazendo quando um cliente comenta ou quando perdemos negócio – estamos sempre atrasados nessas informações.",
        value: 1,
        feedback: "Ignorar o mercado é perigoso. Comece imediatamente um programa básico de monitoramento de concorrentes e tendências.",
        score: 1
      },
      {
        label: "Conhecimento superficial: Conhecemos de nome os principais concorrentes e talvez suas ofertas, mas não acompanhamos novidades nem temos uma análise estruturada. O mercado em geral acompanhamos meio por alto, lendo algo esporádico.",
        value: 2,
        feedback: "Conhecimento casual é insuficiente. Estabeleça um processo para coletar e analisar informações de mercado regularmente.",
        score: 2
      },
      {
        label: "Olho no mercado: Acompanhamos notícias do setor e movimentações de concorrentes principais (lançamentos, mudanças de preço, estratégias), mas de forma reativa – não há um processo formal, é mais interesse do time do que inteligência estruturada.",
        value: 3,
        feedback: "Bom acompanhamento! Agora formalize o processo e garanta que os insights sejam compartilhados e utilizados estrategicamente.",
        score: 3
      },
      {
        label: "Inteligência competitiva ativa: Mantemos um monitoramento ativo: sabemos o posicionamento e oferta de cada concorrente relevante, coletamos feedback dos clientes sobre comparações, e usamos essas informações para afinar nossa estratégia e treinamento de vendas. Em resumo, ninguém pega nossa equipe de surpresa sobre \"o que o concorrente faz\".",
        value: 4,
        feedback: "Excelente! Inteligência competitiva robusta permite antecipar movimentos e adaptar estratégias proativamente. Continue esse trabalho valioso.",
        score: 4
      }
    ]
  },
  {
    id: "q19",
    text: "Existe uma priorização inteligente de leads/contas para prospectar (usando critérios ou scoring) ou os vendedores escolhem onde gastar energia totalmente no aleatório?",
    pillar: "commercial-intelligence",
    options: [
      {
        label: "Aleatório/quem grita mais: Não há priorização formal. Cada vendedor decide quem prospectar conforme preferência, leads que chegam primeiro na lista, ou focam em quem responde mais fácil – não há método.",
        value: 1,
        feedback: "Esforço aleatório é desperdiçado. Implemente critérios básicos de priorização imediatamente para focar recursos.",
        score: 1
      },
      {
        label: "Critério mínimo: Definimos superficialmente alguns alvos (por exemplo, \"empresas acima de X funcionários\"), mas na prática essa priorização não é seguida estritamente e muitos leads fora do perfil acabam tomando tempo do time.",
        value: 2,
        feedback: "Critérios ignorados são inúteis. Refine seus parâmetros e garanta que sejam seguidos consistentemente pelo time.",
        score: 2
      },
      {
        label: "Alguma priorização: Temos uma lista de contas-chave ou segmentos prioritários e direcionamos certo esforço extra neles. Talvez usemos um ranking simples (tipo contas A/B/C por porte), mas ainda sem um scoring ou pontuação sofisticada.",
        value: 3,
        feedback: "Boa priorização básica! Considere evoluir para um modelo de scoring mais detalhado para otimizar ainda mais a alocação de recursos.",
        score: 3
      },
      {
        label: "Foco cirúrgico: Usamos inteligência comercial para pontuar e priorizar leads/contas. Seja via sistema de lead scoring, seja lista de \"target accounts\" muito bem selecionadas, o time sabe exatamente onde focar primeiro – em leads com mais fit e potencial – em vez de gastar bala com low chance.",
        value: 4,
        feedback: "Excelente! Priorização inteligente maximiza o ROI dos esforços comerciais e aumenta significativamente as taxas de conversão.",
        score: 4
      }
    ]
  },
  {
    id: "q20",
    text: "Quando vocês perdem uma venda importante, fazem uma análise profunda do motivo (\"autópsia\" do deal perdido) ou simplesmente seguem em frente sem aprender nada?",
    pillar: "commercial-intelligence",
    options: [
      {
        label: "Sem pós-morte: Perdeu, perdeu. Não temos o hábito de dissecar oportunidades perdidas. A única discussão é talvez um \"que pena, vamos pro próximo\" – nenhuma lição extraída.",
        value: 1,
        feedback: "Sem análise, erros se repetem. Comece a realizar revisões pós-mortem de negócios perdidos imediatamente.",
        score: 1
      },
      {
        label: "Discussão superficial: Dependendo do negócio perdido, até comentamos entre a equipe os motivos aparentes, mas não existe um processo formal ou registro dessas razões para gerar melhoria.",
        value: 2,
        feedback: "Conversas informais raramente geram mudanças. Formalize o processo de análise e documentação de oportunidades perdidas.",
        score: 2
      },
      {
        label: "Aprendizado casual: Analisamos causas de perda em algumas situações (especialmente as grandes), tiramos lições e já fizemos ajustes no nosso discurso ou oferta a partir disso, mas admitimos que nem todos os casos são aproveitados ou documentados.",
        value: 3,
        feedback: "Bom início! Agora estabeleça um processo consistente para todos os negócios relevantes, documentando e compartilhando os aprendizados.",
        score: 3
      },
      {
        label: "Feedback loop ativo: Temos um processo consistente de análise de perdas: para cada oportunidade relevante perdida, levantamos internamente (ou perguntamos ao prospect) os motivos – preço, features, timing, concorrência etc. – e registramos isso. Aprendizados são compartilhados e usados para afinar produto, proposta de valor ou abordagem de vendas continuamente.",
        value: 4,
        feedback: "Excelente! Um ciclo de feedback robusto transforma perdas em oportunidades de melhoria contínua. Continue esse trabalho valioso.",
        score: 4
      }
    ]
  },
  {
    id: "q21",
    text: "A previsão de vendas (forecast) da sua empresa é confiável ou muda toda hora igual previsão do tempo?",
    pillar: "commercial-intelligence",
    options: [
      {
        label: "Forecast fictício: Nosso forecast é praticamente para constar – erramos feio quase todo mês. A previsão raramente bate com a realidade, então ninguém confia muito.",
        value: 1,
        feedback: "Previsões imprecisas comprometem toda a operação. Estabeleça critérios objetivos para estágios do pipeline imediatamente.",
        score: 1
      },
      {
        label: "Muito variável: Tentamos prever, mas a cada semana o número muda drasticamente. Acabamos ajustando a previsão o tempo todo porque vários deals avançam ou somem inesperadamente (indicando problemas na estimativa inicial).",
        value: 2,
        feedback: "Volatilidade alta sugere critérios inconsistentes. Refine seu processo de qualificação de oportunidades e estágios do funil.",
        score: 2
      },
      {
        label: "Razoavelmente acurado: Nosso forecast de vendas acerta na maioria das vezes ou pelo menos fica perto, embora surpresas aconteçam ocasionalmente (tanto positivas quanto negativas).",
        value: 3,
        feedback: "Boa precisão! Continue refinando os critérios para cada estágio e ponderando probabilidades de fechamento adequadamente.",
        score: 3
      },
      {
        label: "Alta precisão: Temos um processo robusto de forecast. Os vendedores estimam com critérios claros (chance %, data de fechamento) e a liderança revisa. O resultado é uma previsão confiável, com margem de erro pequena – e quando há desvios, investigamos o porquê para melhorar o modelo.",
        value: 4,
        feedback: "Excelente! Previsões precisas permitem planejamento financeiro e operacional confiável. Continue aprimorando seu modelo.",
        score: 4
      }
    ]
  },

  // Pilar 4: Prospecção
  {
    id: "q22",
    text: "A prospecção de novos leads é proativa e constante ou só acontece quando as vendas caem e bate o desespero de correr atrás?",
    pillar: "prospecting",
    options: [
      {
        label: "Reativa de última hora: Não há prospecção contínua. Só lembramos de prospectar quando o pipeline está seco ou a meta está ameaçada – aí começa a correria atrás de leads, mas fora isso há longos períodos de inércia.",
        value: 1,
        feedback: "Prospecção emergencial é ineficiente. Estabeleça imediatamente atividades diárias consistentes para gerar leads.",
        score: 1
      },
      {
        label: "Espasmos de prospecção: Prospeção acontece de vez em quando, mas sem consistência. Alguns meses fazemos bastante, em outros quase nada, dependendo do humor do time ou da folga na agenda.",
        value: 2,
        feedback: "Inconsistência gera pipeline imprevisível. Defina metas mínimas semanais de prospecção, independente do momento do mês.",
        score: 2
      },
      {
        label: "Quase contínua: Mantemos uma cadência de prospecção relativamente constante, porém não é sagrada – vez ou outra o time negligencia prospecção quando está ocupado demais fechando negócios ou em outras tarefas.",
        value: 3,
        feedback: "Bom ritmo! Agora torne a prospecção inegociável, mesmo em períodos de alta atividade de fechamento, para evitar ciclos de escassez.",
        score: 3
      },
      {
        label: "Motor sempre ligado: Prospecção é uma rotina sagrada e diária. Nunca paramos de alimentar o topo do funil – mesmo em meses bons, o time continua buscando novas oportunidades ativamente, sem pausa.",
        value: 4,
        feedback: "Excelente! Prospecção constante é o segredo para crescimento sustentável e previsível. Continue mantendo essa disciplina.",
        score: 4
      }
    ]
  },
  {
    id: "q23",
    text: "Existe um processo estruturado de prospecção (cadência de contatos, abordagens definidas) ou cada vendedor faz do seu jeito, sem padrão?",
    pillar: "prospecting",
    options: [
      {
        label: "Cada um por si: Não há processo nenhum. Cada vendedor decide como e quando prospectar, usando seu próprio método (ou falta de método). Resultado: falta de padrão e imprevisibilidade total.",
        value: 1,
        feedback: "Métodos aleatórios geram resultados imprevisíveis. Defina urgentemente um processo básico que todos sigam.",
        score: 1
      },
      {
        label: "Algumas diretrizes soltas: Temos dicas ou um script básico, mas nada formal. A cadência (quantos contatos, com que frequência) não é definida centralmente – uns disparam 3 emails, outros ligam 1 vez e desistem, etc.",
        value: 2,
        feedback: "Diretrizes vagas são facilmente ignoradas. Documente um processo completo de cadência e abordagem para toda a equipe.",
        score: 2
      },
      {
        label: "Processo definido (nem sempre seguido): Há um processo de prospecção documentado com cadências de contato (ex.: 5 tentativas em 3 semanas, via diferentes canais) e modelos de abordagem, porém nem todo vendedor segue à risca ou a liderança não fiscaliza de perto.",
        value: 3,
        feedback: "Bom processo! Agora foque em garantir a adesão de 100% da equipe através de treinamento e monitoramento regular.",
        score: 3
      },
      {
        label: "Operação padronizada: Temos um processo de prospecção bem estruturado e seguido por todos. Existem cadências de contato multicanal definidas, scripts/ templates eficientes, e monitoramos o cumprimento desse processo. A prospecção funciona quase como uma \"máquina\" calibrada.",
        value: 4,
        feedback: "Excelente! Um processo padronizado e seguido por todos garante resultados previsíveis e permite otimizações baseadas em dados.",
        score: 4
      }
    ]
  },
  {
    id: "q24",
    text: "Vocês utilizam múltiplos canais de prospecção (telefone, e-mail, LinkedIn, networking etc.) ou ficam presos em um canal só até saturá-lo?",
    pillar: "prospecting",
    options: [
      {
        label: "Canal único: Usamos praticamente apenas um canal de prospecção. Por exemplo, só cold call telefônica ou só emails massivos, sem diversificar – se aquele canal está ruim, ficamos sem saída.",
        value: 1,
        feedback: "Dependência de canal único é arriscada. Comece imediatamente a testar pelo menos um canal adicional complementar.",
        score: 1
      },
      {
        label: "Pouco diversificado: Utilizamos 2 canais no máximo (por ex., e-mail + telefone), mas não de maneira integrada. Geralmente exaurimos o principal antes de tentar outro, e não exploramos redes sociais ou outras vias.",
        value: 2,
        feedback: "Diversificação limitada reduz alcance. Experimente novos canais e integre-os em uma abordagem coordenada.",
        score: 2
      },
      {
        label: "Multicanal mediano: Já prospectamos em diversos canais (ligação, email, LinkedIn, eventos etc.), porém poderíamos coordenar melhor esses canais. Às vezes é mais uma soma de esforços individuais do que uma estratégia multicanal unificada.",
        value: 3,
        feedback: "Boa variedade de canais! Agora foque em coordená-los melhor em uma estratégia integrada e sequencial.",
        score: 3
      },
      {
        label: "Multicanal avançado: Nossa prospecção é realmente multicanal e estratégica. Combinamos ligações, e-mails, social selling, eventos e o que mais fizer sentido, de forma coordenada conforme o perfil do prospect. Estamos presentes onde o lead estiver, sem depender de um único meio.",
        value: 4,
        feedback: "Excelente! Uma estratégia multicanal coordenada maximiza alcance e eficácia. Continue refinando as abordagens específicas para cada canal.",
        score: 4
      }
    ]
  },
  {
    id: "q25",
    text: "Quem é responsável pela prospecção? Vocês têm um time ou função dedicada (SDR/BDR) ou os vendedores só prospectam \"quando sobra tempo\"?",
    pillar: "prospecting",
    options: [
      {
        label: "Responsabilidade difusa (quase ninguém): Não há ninguém especificamente dedicado a prospectar. Os vendedores teoricamente deveriam fazer isso além de vender, mas na prática, prospecção fica em último lugar e quase não acontece.",
        value: 1,
        feedback: "Responsabilidade de todos acaba sendo responsabilidade de ninguém. Designe alguém especificamente para liderar esforços de prospecção.",
        score: 1
      },
      {
        label: "Vendedores sobrecarregados: Não temos SDR/BDR. Os próprios vendedores fazem a prospecção, porém sem muita organização – alguns se disciplinam, outros não. Muitas leads potenciais morrem na praia por falta de acompanhamento inicial, já que o foco do vendedor é fechar quem já está no pipeline.",
        value: 2,
        feedback: "Vendedores sempre priorizarão fechamento sobre prospecção. Estabeleça tempos protegidos ou papéis específicos para garantir consistência.",
        score: 2
      },
      {
        label: "Papel parcialmente dedicado: Temos alguma pessoa que ajuda na prospecção (por exemplo, um estagiário ou marketeiro gerando listas, ou vendedores juniores que prospectam), mas eles acumulam outras funções e não conseguem focar 100%.",
        value: 3,
        feedback: "Bom início! Considere evoluir para uma função 100% dedicada à prospecção para maximizar resultados.",
        score: 3
      },
      {
        label: "Time de prospecção dedicado: Temos um time ou pelo menos profissionais focados exclusivamente em gerar novos leads (SDRs/BDRs). Eles acordam todos os dias pensando em abrir oportunidades para o time de vendas, sem dividir atenção com fechamento de negócios.",
        value: 4,
        feedback: "Excelente! Especialização de funções aumenta dramaticamente a eficiência e consistência da geração de oportunidades.",
        score: 4
      }
    ]
  },
  {
    id: "q26",
    text: "Sua lista de leads é construída de forma estratégica (com base no ICP, pesquisas e uso de ferramentas) ou é só um \"catadão\" de contatos aleatórios?",
    pillar: "prospecting",
    options: [
      {
        label: "Lista improvisada: Nossa base de leads é basicamente um apanhado de contatos que conseguimos aqui e ali, sem muito critério. Vale tudo: lista comprada, cartão de visita, indicação aleatória – torcendo para alguém querer.",
        value: 1,
        feedback: "Listas aleatórias geram baixíssima conversão. Comece imediatamente a filtrar leads com base em critérios de fit.",
        score: 1
      },
      {
        label: "Critério mínimo: Fazemos uma filtragem simples (por exemplo, região ou setor) ao montar listas, mas nada muito profundo. Ainda vem muito contato que claramente não é nosso perfil ideal, desperdiçando esforço.",
        value: 2,
        feedback: "Filtros básicos são insuficientes. Refine sua segmentação usando múltiplos critérios alinhados ao seu ICP.",
        score: 2
      },
      {
        label: "Lista semi-qualificada: Construímos listas direcionadas em boa parte para nosso público-alvo (seguindo critérios de ICP como setor, tamanho, cargo), usando LinkedIn ou bases setoriais. Porém, pode haver contatos não tão qualificados misturados, ou as listas não são atualizadas com frequência.",
        value: 3,
        feedback: "Boa direção! Agora refine ainda mais seus critérios e mantenha as listas atualizadas e higienizadas regularmente.",
        score: 3
      },
      {
        label: "Lista cirúrgica: Nossas listas de prospecção são altamente direcionadas. Cada lead é selecionado com base em perfil ideal e pesquisas específicas (usamos ferramentas e inteligência para encontrar os contatos certos). Quase não perdemos tempo com quem não encaixa no alvo.",
        value: 4,
        feedback: "Excelente! Listas altamente qualificadas multiplicam suas taxas de conversão e economizam tempo valioso da equipe.",
        score: 4
      }
    ]
  },
  {
    id: "q27",
    text: "Qual é a velocidade de contato com leads recém-gerados? Vocês respondem rápido ou deixam o lead esfriar até esquecer quem são vocês?",
    pillar: "prospecting",
    options: [
      {
        label: "Lentos demais: Demoramos dias (às vezes semanas!) para entrar em contato com um lead novo. Quando vamos falar, o lead já esfriou completamente ou nem lembra que mostrou interesse.",
        value: 1,
        feedback: "Leads são perecíveis! Implemente um processo para contato em no máximo 24 horas com qualquer novo lead.",
        score: 1
      },
      {
        label: "Inconsistente: Às vezes contatamos no mesmo dia, mas em outras demoram vários dias, dependendo da bagunça/agenda. Não há um SLA claro de tempo de resposta – fica ao acaso do responsável notar e agir.",
        value: 2,
        feedback: "Inconsistência gera oportunidades perdidas. Estabeleça um SLA claro de tempo máximo de resposta para todos os leads.",
        score: 2
      },
      {
        label: "Relativamente ágil: Geralmente conseguimos contatar leads novos dentro de 1 a 2 dias úteis, o que é aceitável, embora não imediato. Na maioria dos casos o lead ainda está quente, mas sabemos que poderíamos ser mais rápidos sempre.",
        value: 3,
        feedback: "Tempo razoável, mas há margem para melhoria. Busque reduzir para contato no mesmo dia com todos os leads qualificados.",
        score: 3
      },
      {
        label: "Resposta relâmpago: Qualquer lead novo que aparece é contato imediatamente – muitas vezes em minutos ou poucas horas. Temos processos (e.g. alertas do CRM, responsável definido) para garantir velocidade máxima de reação, aumentando muito a chance de engajamento enquanto o interesse está fresco.",
        value: 4,
        feedback: "Excelente! Resposta imediata aumenta dramaticamente as taxas de conversão. Continue mantendo essa agilidade.",
        score: 4
      }
    ]
  },
  {
    id: "q28",
    text: "Vocês medem os resultados da prospecção (taxa de resposta, reuniões agendadas, conversão de leads prospectados) para otimizar, ou nem sabem se está funcionando?",
    pillar: "prospecting",
    options: [
      {
        label: "Zero métricas de prospecção: Não mensuramos praticamente nada específico da prospecção. Não saberíamos dizer qual % dos contatos vira reunião, ou quantos e-mails em média geram uma resposta. Vamos no escuro.",
        value: 1,
        feedback: "Impossível melhorar o que não se mede. Comece imediatamente a acompanhar taxa de resposta e conversão básica.",
        score: 1
      },
      {
        label: "Acompanhamento superficial: Olhamos só resultados brutos, tipo número de reuniões agendadas no mês, mas não analisamos as taxas (quantas tentativas por reunião, % de resposta por canal etc.). Temos algum resultado, mas sem ter certeza do que deu certo ou errado.",
        value: 2,
        feedback: "Números brutos ocultam insights valiosos. Comece a calcular taxas de conversão por etapa e por canal de prospecção.",
        score: 2
      },
      {
        label: "Métricas básicas acompanhadas: Medimos sim alguns indicadores de prospecção – ex.: taxa de abertura/click dos emails, percentual de retornos, número de reuniões por quantidade de leads contactados – e usamos esses números para ter uma ideia de eficiência, embora nem sempre façamos ajustes finos baseados neles.",
        value: 3,
        feedback: "Bom conjunto de métricas! Agora utilize-as mais ativamente para testar e otimizar abordagens diferentes.",
        score: 3
      },
      {
        label: "Otimização orientada a dados: A prospecção é gerenciada com métricas claras e meta-métricas. Sabemos a taxa de conversão de cada etapa (envio -> resposta -> reunião -> oportunidade) e identificamos gargalos rapidamente, ajustando abordagem, mensagens ou público conforme o que os dados mostram.",
        value: 4,
        feedback: "Excelente! Otimização baseada em dados leva a melhorias contínuas de performance. Continue testando e refinando.",
        score: 4
      }
    ]
  },

  // Pilar 5: Conversão
  {
    id: "q29",
    text: "Seu processo de vendas está claramente mapeado, com etapas bem definidas, ou cada vendedor improvisa o caminho até o fechamento?",
    pillar: "conversion",
    options: [
      {
        label: "Improviso total: Não temos um processo de vendas definido. Cada vendedor faz do seu jeito, segue sua intuição, sem etapas claras ou critérios para avançar a venda.",
        value: 1,
        feedback: "Vendas improvisadas são imprevisíveis. Defina imediatamente um processo básico com 3-5 etapas que todos devem seguir.",
        score: 1
      },
      {
        label: "Processo vago: Existe alguma noção de processo (ex.: prospectar → reunião → proposta → fechamento), mas sem detalhamento ou critérios claros. Na prática, cada um conduz a venda como acha melhor.",
        value: 2,
        feedback: "Processos vagos são frequentemente ignorados. Documente com mais detalhe as ações e entregas esperadas em cada etapa.",
        score: 2
      },
      {
        label: "Processo definido, nem sempre seguido: Temos um processo de vendas documentado com etapas claras, mas nem todo vendedor segue à risca. Alguns pulam etapas ou não cumprem todos os critérios antes de avançar um deal no pipeline.",
        value: 3,
        feedback: "Bom processo! Agora foque em garantir adesão consistente através de treinamento e validação das etapas.",
        score: 3
      },
      {
        label: "Metodologia estruturada e seguida: Nosso processo de vendas é bem definido, com etapas claras e critérios objetivos para avançar de uma fase para outra. A equipe foi treinada e segue essa metodologia disciplinadamente, o que nos dá previsibilidade e consistência.",
        value: 4,
        feedback: "Excelente! Um processo bem definido e seguido é a base para previsibilidade e escala em vendas. Continue refinando-o.",
        score: 4
      }
    ]
  },
  {
    id: "q30",
    text: "Como funciona o follow-up na sua empresa após o primeiro contato com um potencial cliente?",
    pillar: "conversion",
    options: [
      {
        label: "Fraco/inexistente: Nosso follow-up é precário. Muitos leads caem no esquecimento após o primeiro contato. Se o cliente não responde logo, raramente insistimos – partimos para o próximo.",
        value: 1,
        feedback: "Falta de follow-up é a maior causa de oportunidades perdidas. Estabeleça imediatamente um processo de múltiplos contatos.",
        score: 1
      },
      {
        label: "Básico/inconsistente: Fazemos algum follow-up, mas sem um processo estruturado. Alguns vendedores são persistentes, outros desistem rápido. Não temos um padrão de quantas tentativas fazer ou quando parar.",
        value: 2,
        feedback: "Follow-up inconsistente gera resultados imprevisíveis. Defina uma cadência padrão com número mínimo de tentativas.",
        score: 2
      },
      {
        label: "Razoavelmente estruturado: Temos diretrizes de follow-up (ex.: tentar 3-5 vezes) e a maioria dos vendedores as segue. Usamos lembretes ou tarefas no CRM para não esquecer, embora possa haver falhas ocasionais de acompanhamento.",
        value: 3,
        feedback: "Bom sistema de follow-up! Considere automatizar parte do processo para garantir que nenhuma oportunidade seja esquecida.",
        score: 3
      },
      {
        label: "Processo rigoroso e multicanal: Temos um processo de follow-up extremamente disciplinado. Cada lead recebe múltiplas tentativas de contato, através de diferentes canais (email, telefone, LinkedIn), seguindo uma cadência predefinida. Praticamente nenhuma oportunidade cai no esquecimento por falta de insistência adequada.",
        value: 4,
        feedback: "Excelente! Follow-up persistente e multicanal maximiza conversões e demonstra profissionalismo. Continue com essa disciplina.",
        score: 4
      }
    ]
  },
  {
    id: "q31",
    text: "Vocês realmente qualificam oportunidades no meio do funil ou empurram qualquer lead que respira para a fase de proposta?",
    pillar: "conversion",
    options: [
      {
        label: "Zero qualificação: Praticamente não filtramos. Qualquer lead que demonstre o mínimo de interesse é tratado como oportunidade e avança no pipeline. Só descobrimos que não era qualificado quando perdemos tempo com reuniões ou propostas inúteis.",
        value: 1,
        feedback: "Falta de qualificação desperdiça recursos preciosos. Implemente imediatamente critérios básicos de qualificação no meio do funil.",
        score: 1
      },
      {
        label: "Qualificação superficial: Fazemos perguntas básicas, mas muitas vezes avançamos com leads sem entender completamente sua situação, orçamento ou processo de compra. Acabamos com muitas propostas 'no escuro' e taxas baixas de fechamento.",
        value: 2,
        feedback: "Qualificação inadequada leva a propostas desperdiçadas. Aprofunde seu processo de descoberta antes de avançar para propostas.",
        score: 2
      },
      {
        label: "Boa qualificação, nem sempre rigorosa: Temos um framework de qualificação (tipo BANT ou similar) e o usamos na maioria dos casos, embora às vezes, com pressão de meta, acabemos avançando algumas oportunidades que não estão totalmente qualificadas.",
        value: 3,
        feedback: "Bom processo! Agora seja mais rigoroso na aplicação, mesmo sob pressão de meta - isso economizará tempo a longo prazo.",
        score: 3
      },
      {
        label: "Qualificação rigorosa e consistente: Seguimos um processo estruturado de qualificação com critérios claros (ex.: BANT, MEDDICC). Não avançamos oportunidades sem confirmar dor real, orçamento, autoridade de decisão e timing. Preferimos ter menos oportunidades no funil, mas com alta probabilidade de fechamento.",
        value: 4,
        feedback: "Excelente! Qualificação rigorosa resulta em taxas de fechamento mais altas e ciclos de venda mais eficientes.",
        score: 4
      }
    ]
  },
  {
    id: "q32",
    text: "Como é a gestão de objeções na sua equipe? Os vendedores sabem lidar com resistências comuns ou empacam quando o cliente diz \"vou pensar\" ou \"está caro\"?",
    pillar: "conversion",
    options: [
      {
        label: "Despreparados para objeções: Os vendedores frequentemente não sabem como responder objeções. Quando ouvem \"está caro\" ou \"preciso pensar\", geralmente aceitam sem questionar ou oferecem desconto imediato. Não há preparo para lidar com resistências.",
        value: 1,
        feedback: "Ceder a objeções sem questioná-las é fatal. Desenvolva imediatamente respostas padrão para as objeções mais comuns.",
        score: 1
      },
      {
        label: "Respostas improvisadas: Cada vendedor lida com objeções do seu jeito, alguns melhor que outros. Não temos respostas padronizadas ou treinamento específico para as objeções mais frequentes. Muitos acabam baixando preço como primeira alternativa.",
        value: 2,
        feedback: "Improvisação gera inconsistência. Mapeie as 5-10 objeções mais frequentes e desenvolva contra-argumentos eficazes para todas.",
        score: 2
      },
      {
        label: "Preparo razoável: A maioria do time sabe lidar com objeções comuns, temos algumas respostas padrão ou técnicas ensinadas. Ainda assim, objeções avançadas ou inesperadas podem pegar alguns vendedores desprevenidos.",
        value: 3,
        feedback: "Bom preparo básico! Agora expanda seu arsenal para objeções mais complexas e pratique regularmente em simulações.",
        score: 3
      },
      {
        label: "Mestres em superar objeções: Nossa equipe é treinada para antecipar e neutralizar objeções. Temos scripts bem desenvolvidos para cada resistência comum, técnicas de questionamento para desvendar a real preocupação por trás da objeção, e alternativas além de desconto. Raramente uma objeção encerra uma venda para nós.",
        value: 4,
        feedback: "Excelente! Habilidade em lidar com objeções é uma das competências mais valiosas em vendas. Continue praticando e refinando.",
        score: 4
      }
    ]
  },
  {
    id: "q33",
    text: "Suas propostas comerciais são personalizadas e focadas em valor ou são genéricas e centradas em preço/features?",
    pillar: "conversion",
    options: [
      {
        label: "Propostas genéricas/templates: Usamos praticamente o mesmo modelo para todos os clientes, mudando só nome/valor. São propostas centradas mais em nós (nossos serviços, features) do que no cliente específico e seus resultados esperados.",
        value: 1,
        feedback: "Propostas genéricas são facilmente ignoradas ou comparadas apenas por preço. Comece a personalizá-las imediatamente.",
        score: 1
      },
      {
        label: "Personalização superficial: Fazemos algumas adaptações básicas nas propostas (além do nome/valor), mas ainda são bastante padronizadas. Mencionamos benefícios gerais, sem muito aprofundamento no caso específico daquele cliente.",
        value: 2,
        feedback: "Personalização limitada reduz impacto. Inclua mais elementos específicos sobre a situação e objetivos únicos de cada cliente.",
        score: 2
      },
      {
        label: "Bom nível de customização: Nossas propostas têm boa personalização, incluindo informações sobre o negócio do cliente e seus principais objetivos. Procuramos mostrar valor e ROI, embora nem sempre com cálculos detalhados ou totalmente adaptados ao caso.",
        value: 3,
        feedback: "Boa abordagem! Agora refine ainda mais a demonstração de ROI específico e conecte cada solução diretamente aos objetivos declarados.",
        score: 3
      },
      {
        label: "Propostas totalmente consultivas: Cada proposta é uma peça única e consultiva. Refletem profundo entendimento do cliente, seus desafios específicos e objetivos de negócio. Demonstramos claramente o ROI esperado, caso de uso específico, e valor único da nossa solução para aquele cliente particular. O preço é apresentado no contexto do valor entregue, não como foco principal.",
        value: 4,
        feedback: "Excelente! Propostas altamente personalizadas e centradas em valor demonstram profissionalismo e aumentam significativamente taxas de fechamento.",
        score: 4
      }
    ]
  },
  {
    id: "q34",
    text: "Ao fechar uma venda, vocês têm um processo estruturado ou improvisam o encerramento na esperança do cliente dizer sim?",
    pillar: "conversion",
    options: [
      {
        label: "Fechamento improvisado: Não temos técnicas de fechamento definidas. Os vendedores apresentam a proposta e basicamente esperam o cliente decidir, sem um plano para conduzir à decisão ou superar últimas hesitações.",
        value: 1,
        feedback: "Fechamento passivo resulta em decisões adiadas. Implemente imediatamente técnicas básicas de fechamento para toda a equipe.",
        score: 1
      },
      {
        label: "Técnicas básicas/inconsistentes: Alguns vendedores usam técnicas de fechamento, outros não. Não há um processo estruturado para conduzir o prospect à decisão – depende muito da habilidade individual de cada vendedor.",
        value: 2,
        feedback: "Inconsistência gera resultados imprevisíveis. Defina algumas técnicas de fechamento que todos devem dominar e praticar.",
        score: 2
      },
      {
        label: "Abordagem de fechamento definida: Temos algumas técnicas de fechamento que ensinamos aos vendedores (ex.: criar urgência, oferecer opções em vez de sim/não, resumir valor). A maioria utiliza, embora a execução varie em qualidade.",
        value: 3,
        feedback: "Boas técnicas! Agora refine a execução através de mais prática e role-plays até que todos dominem completamente.",
        score: 3
      },
      {
        label: "Processo de fechamento estruturado: Nosso time domina múltiplas técnicas de fechamento e sabe quando usar cada uma. Não deixamos nada ao acaso: treinamos continuamente como superar objeções finais, criar senso de urgência legítimo, e conduzir à decisão. Sabemos exatamente como articular o próximo passo e raramente saímos de uma reunião sem um compromisso claro.",
        value: 4,
        feedback: "Excelente! Técnicas avançadas de fechamento, aplicadas corretamente, são diferenciais competitivos poderosos. Continue aprimorando.",
        score: 4
      }
    ]
  },
  {
    id: "q35",
    text: "Como vocês lidam com negociação e descontos? Existe um processo estruturado ou é basicamente \"aceitar o que o cliente pede para não perder\"?",
    pillar: "conversion",
    options: [
      {
        label: "Sem estratégia de negociação: Não temos diretrizes claras para negociação. Os vendedores frequentemente cedem a pedidos de desconto sem muita resistência ou estratégia, com medo de perder o negócio.",
        value: 1,
        feedback: "Ceder facilmente destrói margens. Estabeleça imediatamente limites de desconto e exija aprovações para exceções.",
        score: 1
      },
      {
        label: "Negociação fraca: Temos alguns limites de desconto definidos, mas na prática acabamos cedendo bastante. Faltam aos vendedores técnicas de negociação para defender o valor sem recorrer logo ao desconto.",
        value: 2,
        feedback: "Limites são inúteis sem habilidades de negociação. Treine sua equipe em técnicas para defender valor e explorar moedas de troca.",
        score: 2
      },
      {
        label: "Processo moderado: Temos um processo de aprovação de descontos e algumas estratégias de negociação (ex.: oferecer algo em troca, escalonar por volume). A maioria dos vendedores tenta defender o valor antes de oferecer desconto, embora alguns ainda cedam muito facilmente.",
        value: 3,
        feedback: "Boa estrutura! Agora reforce o treinamento para que todos os vendedores defendam o valor com confiança e consistência.",
        score: 3
      },
      {
        label: "Negociação estratégica: Temos um processo sofisticado de negociação. Os vendedores são treinados para defender valor, oferecer alternativas a desconto, usar concessões estratégicas e sempre pedir algo em troca. Cada desconto tem aprovação e justificativa. Resultado: mantemos margens saudáveis mesmo em ambientes competitivos.",
        value: 4,
        feedback: "Excelente! Negociação estratégica protege margens e posicionamento de valor. Continue reforçando essa disciplina.",
        score: 4
      }
    ]
  },

  // Pilar 6: Retenção 
  {
    id: "q36",
    text: "Vocês têm um processo de onboarding estruturado para novos clientes ou é só \"vendeu, tchau, boa sorte\"?",
    pillar: "retention",
    options: [
      {
        label: "Onboarding inexistente: Não temos um processo formal de onboarding. Após a venda, o cliente é basicamente deixado por conta própria para descobrir como usar nosso produto/serviço. Se tiver problemas, ele que nos procure.",
        value: 1,
        feedback: "Ausência de onboarding é receita para churn. Implemente imediatamente pelo menos uma reunião de boas-vindas estruturada.",
        score: 1
      },
      {
        label: "Onboarding básico: Temos algumas iniciativas de onboarding (talvez um email de boas-vindas ou uma ligação), mas nada muito estruturado ou consistente. Varia conforme o cliente ou quem está responsável.",
        value: 2,
        feedback: "Onboarding inconsistente gera experiências desiguais. Documente um processo padrão que todos os clientes recebam.",
        score: 2
      },
      {
        label: "Processo definido, com falhas: Desenvolvemos um processo de onboarding com etapas claras (ex.: reunião inicial, treinamento básico), mas a execução nem sempre é perfeita. Alguns clientes recebem menos atenção do que deveriam, especialmente em períodos de pico.",
        value: 3,
        feedback: "Bom processo! Agora garanta execução consistente para todos os clientes, independentemente do tamanho ou momento.",
        score: 3
      },
      {
        label: "Onboarding exemplar: Temos um processo de onboarding altamente estruturado e personalizado. Inclui múltiplos pontos de contato, material de treinamento, reuniões de kickoff, definição clara de objetivos e métricas de sucesso. Acompanhamos de perto os primeiros dias/semanas para garantir adoção rápida e solucionar qualquer obstáculo inicial. Nenhum cliente é deixado à deriva.",
        value: 4,
        feedback: "Excelente! Um onboarding excepcional estabelece as bases para relacionamentos duradouros e reduz drasticamente o churn inicial.",
        score: 4
      }
    ]
  },
  {
    id: "q37",
    text: "Como vocês acompanham a saúde e satisfação dos clientes atuais? Existe um processo proativo ou só descobrem problemas quando o cliente já decidiu sair?",
    pillar: "retention",
    options: [
      {
        label: "Zero monitoramento: Não medimos ativamente satisfação nem temos indicadores de saúde de cliente. Só descobrimos que algo está errado quando o cliente reclama ou anuncia que vai cancelar – aí já é tarde demais.",
        value: 1,
        feedback: "Monitoramento reativo é fatal para retenção. Implemente imediatamente pelo menos uma pesquisa básica de satisfação.",
        score: 1
      },
      {
        label: "Acompanhamento casual: Perguntamos informalmente de vez em quando se está tudo bem, mas não temos métricas consistentes ou processo estruturado para captar insatisfação incipiente. Acabamos sendo surpreendidos por alguns cancelamentos.",
        value: 2,
        feedback: "Conversas informais são insuficientes. Estabeleça indicadores objetivos de saúde de cliente e monitore-os regularmente.",
        score: 2
      },
      {
        label: "Monitoramento regular: Temos algumas métricas de satisfação (ex.: pesquisas ocasionais de NPS) e pontos de contato definidos para acompanhar clientes. Conseguimos identificar alguns problemas antes que escalem, embora ainda haja surpresas às vezes.",
        value: 3,
        feedback: "Bom sistema básico! Agora torne-o mais proativo e abrangente, incorporando mais indicadores de saúde e uso.",
        score: 3
      },
      {
        label: "Sistema avançado de health score: Mantemos um acompanhamento rigoroso da saúde de cada cliente. Combinamos múltiplos indicadores (NPS, uso do produto, interações com suporte, engajamento) para criar um health score que monitoramos continuamente. Temos alertas para queda de indicadores e processos de intervenção antes que a insatisfação se torne crítica. Praticamente nunca somos pegos de surpresa por um cancelamento.",
        value: 4,
        feedback: "Excelente! Monitoramento sofisticado permite intervenções precoces e maximiza retenção. Continue refinando seus indicadores.",
        score: 4
      }
    ]
  },
  {
    id: "q38",
    text: "Existe um time ou pessoa dedicada ao sucesso e retenção de clientes, ou isso é tarefa de \"qualquer um\" (ou seja, de ninguém)?",
    pillar: "retention",
    options: [
      {
        label: "Ninguém responsável: Não temos ninguém especificamente designado para cuidar da retenção ou sucesso dos clientes. Depois que a venda é feita, o cliente fica meio à deriva, contatando suporte quando tem problemas.",
        value: 1,
        feedback: "Responsabilidade difusa significa negligência. Designe imediatamente alguém para liderar esforços de retenção.",
        score: 1
      },
      {
        label: "Responsabilidade vaga: Os próprios vendedores ou gerentes devem manter contato com seus clientes, mas não é prioridade e acaba ficando para segundo plano. Não há métricas claras de retenção ou processo estruturado.",
        value: 2,
        feedback: "Vendedores focam em novas vendas, não retenção. Considere criar um papel específico para gerenciamento de contas.",
        score: 2
      },
      {
        label: "Papel parcial/emergente: Temos alguém que dedica parte do tempo ao sucesso de clientes (talvez acumulando com outras funções), com alguns processos básicos de acompanhamento. Estamos evoluindo nisso, mas ainda não é uma operação totalmente estruturada.",
        value: 3,
        feedback: "Bom início! Considere expandir para uma função totalmente dedicada com processos e métricas mais robustos.",
        score: 3
      },
      {
        label: "Time dedicado a sucesso: Temos profissionais específicos (CSMs) cuja única responsabilidade é garantir que os clientes atinjam seus objetivos e permaneçam conosco. Eles seguem processos estruturados de acompanhamento, têm metas claras de retenção/expansão, e são treinados para identificar riscos e oportunidades. O cliente sempre tem alguém olhando exclusivamente por ele.",
        value: 4,
        feedback: "Excelente! Um time dedicado a sucesso do cliente demonstra compromisso com relacionamentos de longo prazo e maximiza retenção.",
        score: 4
      }
    ]
  },
  {
    id: "q39",
    text: "Sua empresa ativamente busca expandir receita em clientes existentes (upsell/cross-sell) ou foca apenas em manter o que já tem?",
    pillar: "retention",
    options: [
      {
        label: "Foco zero em expansão: Não temos estratégia para crescer receita em clientes atuais. No máximo, renovamos no mesmo valor – e olhe lá. Toda energia vai para aquisição de novos clientes.",
        value: 1,
        feedback: "Ignorar expansão é deixar dinheiro na mesa. Comece imediatamente a identificar oportunidades em seus clientes mais satisfeitos.",
        score: 1
      },
      {
        label: "Expansão oportunista: Ocasionalmente vendemos mais para clientes existentes, mas geralmente quando eles pedem ou surge uma oportunidade óbvia. Não há um processo proativo estruturado para detectar potencial de expansão.",
        value: 2,
        feedback: "Abordagem reativa limita potencial. Desenvolva um processo para avaliar sistematicamente oportunidades de upsell em cada cliente.",
        score: 2
      },
      {
        label: "Algum foco em expansão: Temos algumas iniciativas para aumentar receita em clientes existentes (talvez um programa de upsell básico ou sugestões de produtos complementares), mas não é tão sofisticado ou consistente quanto poderia ser.",
        value: 3,
        feedback: "Bom início! Agora formalize um programa completo de expansão com momentos ideais, gatilhos e pacotes específicos.",
        score: 3
      },
      {
        label: "Estratégia sofisticada de expansão: Temos um processo estruturado e proativo para crescer receita em clientes existentes. Mapeamos oportunidades de upsell/cross-sell para cada perfil de cliente, identificamos momentos ideais no ciclo de vida, e treinamos o time para reconhecer e capitalizar sobre esses gatilhos. A expansão é uma fonte significativa e previsível de nossa receita.",
        value: 4,
        feedback: "Excelente! Uma estratégia sofisticada de expansão é geralmente a fonte de receita mais eficiente e rentável. Continue refinando.",
        score: 4
      }
    ]
  },
  {
    id: "q40",
    text: "O quanto vocês conhecem os motivos reais de cancelamento e trabalham para reduzir churn?",
    pillar: "retention",
    options: [
      {
        label: "Zero análise de churn: Não investigamos sistematicamente por que os clientes saem. Quando alguém cancela, registramos a perda e seguimos em frente, sem entender o motivo raiz ou padrões de evasão.",
        value: 1,
        feedback: "Ignorar causas de churn é condenar-se a repetir erros. Implemente imediatamente entrevistas de saída com todos os cancelamentos.",
        score: 1
      },
      {
        label: "Conhecimento superficial: Temos alguma ideia dos motivos de cancelamento (o cliente geralmente diz algo), mas não estruturamos essa informação nem a analisamos profundamente para identificar tendências ou problemas sistêmicos.",
        value: 2,
        feedback: "Insights casuais são insuficientes. Estabeleça categorias claras para motivos de cancelamento e analise-os regularmente.",
        score: 2
      },
      {
        label: "Análise básica de churn: Registramos e categorizamos os motivos de saída em nosso sistema e revisamos periodicamente para identificar problemas recorrentes. Às vezes implementamos mudanças com base nessas descobertas, embora nem sempre de forma sistemática.",
        value: 3,
        feedback: "Bom processo! Agora torne mais completo o ciclo de feedback, garantindo que insights de churn sempre levem a ações concretas.",
        score: 3
      },
      {
        label: "Programa avançado de redução de churn: Realizamos análises detalhadas de cada cancelamento e identificamos padrões com precisão (ex.: por segmento, uso, ciclo de vida). Temos um processo formal para transformar esses insights em ações – seja ajuste de produto, mudanças no onboarding ou treinamento da equipe. Além disso, temos alertas preditivos para identificar clientes em risco antes que decidam sair.",
        value: 4,
        feedback: "Excelente! Um programa sofisticado de análise e prevenção de churn é crucial para crescimento sustentável. Continue refinando seus modelos preditivos.",
        score: 4
      }
    ]
  },
  {
    id: "q41",
    text: "Sua empresa trata renovações como uma nova venda, com processo estruturado, ou assume que o cliente vai renovar automaticamente (e só percebe quando não renova)?",
    pillar: "retention",
    options: [
      {
        label: "Abordagem passiva: Não temos um processo para renovações. Simplesmente enviamos uma fatura ou esperamos o cliente manifestar interesse em continuar. Só percebemos problema quando o cliente não renova ou questiona.",
        value: 1,
        feedback: "Passividade resulta em renovações perdidas. Implemente imediatamente um processo proativo de preparação para renovações.",
        score: 1
      },
      {
        label: "Lembretes básicos: Enviamos um lembrete de renovação perto do vencimento, mas sem muito planejamento antecipado ou estratégia. Não há um processo estruturado para maximizar chances de renovação.",
        value: 2,
        feedback: "Lembretes tardios são insuficientes. Desenvolva um processo que comece meses antes, com revisão de resultados e valor entregue.",
        score: 2
      },
      {
        label: "Processo moderado: Iniciamos conversas sobre renovação com alguma antecedência e talvez façamos uma revisão básica da conta. Temos certa estrutura, embora nem sempre seja executada perfeitamente para todos os clientes.",
        value: 3,
        feedback: "Bom processo inicial! Agora torne-o mais completo com revisões de sucesso, planejamento futuro e demonstração clara de ROI.",
        score: 3
      },
      {
        label: "Renovação como nova venda: Tratamos cada renovação como uma oportunidade de revenda. Começamos o processo com meses de antecedência, preparamos business reviews detalhados mostrando o valor entregue, discutimos planos futuros, e revisitamos ROI. Nosso time é treinado especificamente em táticas de renovação e expansão. Resultado: altas taxas de renovação e frequente aumento de escopo.",
        value: 4,
        feedback: "Excelente! Um processo sofisticado de renovação protege sua receita recorrente e cria oportunidades de expansão. Continue refinando.",
        score: 4
      }
    ]
  },
  {
    id: "q42",
    text: "Como vocês aproveitam clientes satisfeitos para geração de referências e casos de sucesso? Existe um programa estruturado ou é algo ocasional?",
    pillar: "retention",
    options: [
      {
        label: "Zero programa de referências: Não temos nenhuma iniciativa estruturada para obter referências ou casos de sucesso. Se acontece, é por acaso quando um cliente muito satisfeito menciona nosso nome sem que pedíssemos.",
        value: 1,
        feedback: "Ignorar referências é desperdiçar seus melhores vendedores: seus clientes atuais. Comece a solicitar ativamente referências.",
        score: 1
      },
      {
        label: "Abordagem ad hoc: Ocasionalmente pedimos referências a clientes que parecem satisfeitos, mas não há um processo definido, momentos ideais ou incentivos. É mais uma iniciativa individual de alguns vendedores do que uma estratégia da empresa.",
        value: 2,
        feedback: "Solicitações ocasionais são subótimas. Estabeleça um processo sistemático para identificar e abordar clientes promotores.",
        score: 2
      },
      {
        label: "Programa básico: Temos algumas iniciativas para obter referências (talvez um incentivo ou momento definido para pedir), e ocasionalmente criamos casos de sucesso. Há certa estrutura, embora ainda possamos ser mais sistemáticos.",
        value: 3,
        feedback: "Bom início! Agora formalize completamente o programa com incentivos claros, metas e processo de acompanhamento.",
        score: 3
      },
      {
        label: "Programa robusto de referências: Temos um processo altamente estruturado para gerar referências. Identificamos sistematicamente clientes promotores (via NPS ou outra metodologia), temos momentos ideais no ciclo de cliente para solicitar referências, oferecemos incentivos claros, e acompanhamos meticulosamente os resultados. Produzimos regularmente casos de sucesso de alta qualidade. As referências são uma fonte significativa e previsível de novos negócios.",
        value: 4,
        feedback: "Excelente! Um programa sofisticado de referências é geralmente a fonte de leads de mais alta qualidade e menor CAC. Continue refinando.",
        score: 4
      }
    ]
  },

  // Pilar 7: Ferramentas e Stack Comercial
  {
    id: "q43",
    text: "Sua equipe usa um CRM de vendas de forma consistente ou ainda se perde em planilhas e contatos espalhados?",
    pillar: "tools",
    options: [
      {
        label: "Nada de CRM: Não utilizamos nenhum CRM de verdade. O controle de leads, clientes e atividades é feito em planilhas, cadernos ou na cabeça de cada vendedor – um caos propenso a erros e informações perdidas.",
        value: 1,
        feedback: "Operar sem CRM é como dirigir vendado. Implemente imediatamente uma solução básica, mesmo que gratuita inicialmente.",
        score: 1
      },
      {
        label: "CRM subutilizado: Temos um CRM contratado, porém o uso é falho. Nem todos os vendedores atualizam, muitos negócios ficam desatualizados lá, e ainda mantemos paralelamente planilhas ou controles manuais. O CRM está mais para enfeite do que ferramenta ativa.",
        value: 2,
        feedback: "CRM não usado é dinheiro jogado fora. Estabeleça regras claras de uso e monitore consistência de atualização.",
        score: 2
      },
      {
        label: "CRM utilizado regularmente: A equipe utiliza o CRM para registrar oportunidades e contatos, sem dúvidas. Talvez ainda não aproveitemos todas as funcionalidades (automação de tarefas, relatórios avançados), mas ao menos a informação básica de pipeline está lá e visível.",
        value: 3,
        feedback: "Bom uso básico! Agora explore recursos mais avançados como automação de tarefas e análise de dados para extrair mais valor.",
        score: 3
      },
      {
        label: "CRM como fonte central: Nosso CRM é o coração da operação comercial – todo mundo atualiza em tempo real, todas as informações de clientes, interações e deals estão registradas. Ele é indispensável para o dia a dia, e a liderança extrai relatórios confiáveis dali para tomada de decisão.",
        value: 4,
        feedback: "Excelente! Um CRM plenamente utilizado é a espinha dorsal de uma operação comercial escalável e data-driven. Continue refinando.",
        score: 4
      }
    ]
  },
  {
    id: "q44",
    text: "Além do CRM, vocês utilizam ferramentas de automação (marketing e vendas) ou tudo é manual?",
    pillar: "tools",
    options: [
      {
        label: "Zero automação: Não usamos nenhuma ferramenta de automação de marketing ou prospecção. Cada e-mail é escrito manualmente, follow-up é lembrado no caderninho, e tarefas repetitivas consomem tempo que poderia ser automatizado – estamos operando no braço.",
        value: 1,
        feedback: "Processos manuais limitam escala. Comece com uma ferramenta básica de automação de e-mails para sua prospecção.",
        score: 1
      },
      {
        label: "Automação mínima: Implementamos alguma coisa, por exemplo uma plataforma de disparo de e-mail marketing ou uma ferramenta simples de sequências de prospecção, mas é limitado. A maior parte do processo ainda depende de esforço manual do time.",
        value: 2,
        feedback: "Automação limitada é apenas o começo. Expanda gradualmente para cobrir mais pontos do funil de vendas.",
        score: 2
      },
      {
        label: "Uso moderado de automação: Já adotamos ferramentas de automação em alguns pontos – como um software de e-mail sequencial para prospecção, algum fluxo automatizado de nutrição de leads de marketing, etc. Vemos ganhos de produtividade, porém ainda há etapas manuais significativas ou integrações não aproveitadas.",
        value: 3,
        feedback: "Bom progresso! Agora busque integrar melhor suas ferramentas e expandir automação para mais etapas do processo comercial.",
        score: 3
      },
      {
        label: "Stack bem automatizado: Temos um stack completo de automação. Usamos automação de marketing (nutrição de leads, pontuação), ferramentas de sales engagement (sequenciadores de e-mail/chamadas), chatbots no site, etc. O time foca onde agrega valor humano e deixa tarefas repetitivas para as máquinas – aumentando escala sem perder toque pessoal onde importa.",
        value: 4,
        feedback: "Excelente! Automação avançada multiplica a produtividade da equipe e permite escala sem crescimento proporcional de custos.",
        score: 4
      }
    ]
  },
  {
    id: "q45",
    text: "As ferramentas do seu stack conversam entre si (integrações de dados) ou cada uma é isolada, virando uma torre de Babel de informações desconectadas?",
    pillar: "tools",
    options: [
      {
        label: "Ilhas desconexas: Nossas ferramentas são totalmente isoladas. Temos dados em diversos lugares (CRM, planilha, sistema de marketing), mas eles não se integram automaticamente. Conseguir uma visão unificada do funil exige esforço manual, quando conseguimos.",
        value: 1,
        feedback: "Sistemas isolados criam silos de informação. Priorize pelo menos uma integração crítica entre suas ferramentas principais.",
        score: 1
      },
      {
        label: "Integração básica apenas: Fizemos algumas integrações simples – por exemplo, leads do site entram no CRM automaticamente – mas ainda há vários sistemas que não conversam. Precisamos exportar/importar dados entre ferramentas ou consultar múltiplas plataformas para juntar as peças.",
        value: 2,
        feedback: "Integrações limitadas ainda exigem muito trabalho manual. Expanda gradualmente suas integrações para os fluxos mais críticos.",
        score: 2
      },
      {
        label: "Integrações em boa parte: Integramos as principais ferramentas do stack. CRM, automação de marketing, suporte e talvez ERP já compartilham dados importantes (lead entrou, virou oportunidade, cliente abriu chamado etc.). Há ainda algumas integrações desejáveis faltando ou pequenas duplicidades de informação, mas no geral temos um fluxo de dados decente.",
        value: 3,
        feedback: "Boa integração básica! Agora refine as conexões existentes e complete as integrações faltantes para um ecossistema mais coeso.",
        score: 3
      },
      {
        label: "Ecossistema integrado: Todas as ferramentas-chave do nosso processo comercial e de marketing estão bem integradas. Informações fluem automaticamente de uma etapa a outra (marketing -> vendas -> pós-venda). Temos um dashboard unificado que puxa dados de múltiplas fontes sem esforço manual. A equipe não perde tempo redigitando informação; o sistema funciona como um todo coeso.",
        value: 4,
        feedback: "Excelente! Um ecossistema totalmente integrado elimina retrabalho, reduz erros e fornece visão completa da jornada do cliente.",
        score: 4
      }
    ]
  },
  {
    id: "q46",
    text: "Você investe em inteligência de dados para vendas (ex.: dashboards, BI, análises avançadas) ou toma decisões sem um painel decente para consultar?",
    pillar: "tools",
    options: [
      {
        label: "Nada de BI: Não temos nenhum dashboard ou ferramenta de BI de vendas. As poucas análises que fazemos são montando planilhas manuais quando precisamos. Basicamente, a gestão decide sem um painel consolidado – falta visibilidade em tempo real.",
        value: 1,
        feedback: "Decisões sem dados são apostas arriscadas. Comece com um dashboard básico dos principais indicadores comerciais.",
        score: 1
      },
      {
        label: "Relatórios básicos apenas: Temos alguns relatórios nativos do CRM ou planilhas mensais que o time puxa. Eles ajudam a entender o básico (como está a meta vs realizado, por exemplo), mas não há uma visualização robusta ou análise mais sofisticada de tendências, cohort de clientes, etc.",
        value: 2,
        feedback: "Relatórios simples oferecem visão limitada. Evolua para dashboards mais completos com KPIs e tendências históricas.",
        score: 2
      },
      {
        label: "Algum dashboard disponível: Possuímos pelo menos um dashboard ou conjunto de relatórios que dá visibilidade ao funil (talvez via CRM ou Google Data Studio/Excel). A liderança consegue ver os principais indicadores e fazer algumas análises, embora não seja perfeito ou totalmente em tempo real.",
        value: 3,
        feedback: "Bom progresso! Agora refine seus dashboards para incluir análises mais avançadas e indicadores preditivos do negócio.",
        score: 3
      },
      {
        label: "BI incorporado: Temos um sistema de Business Intelligence de vendas implantado. Indicadores-chave estão disponíveis em dashboards interativos atualizados (quase) em tempo real – seja em ferramentas especializadas ou integrando CRM com planilhas inteligentes/BI. Conseguimos fatiar dados, identificar gargalos e oportunidades com facilidade visual, servindo de base para decisões rápidas e embasadas.",
        value: 4,
        feedback: "Excelente! Inteligência de dados avançada permite identificar tendências antes dos concorrentes e tomar decisões baseadas em evidências.",
        score: 4
      }
    ]
  },
  {
    id: "q47",
    text: "Sua equipe foi treinada para usar plenamente as ferramentas disponíveis ou vocês pagam por tecnologia que mal é usada?",
    pillar: "tools",
    options: [
      {
        label: "Ferramenta encostada: Muitas ferramentas que temos são subutilizadas porque o time não sabe usar ou não vê valor. Demos pouco ou nenhum treinamento. Na prática, pagamos por coisas que viraram enfeite caro, enquanto o processo segue manual ou mal feito.",
        value: 1,
        feedback: "Tecnologia sem treinamento é investimento desperdiçado. Priorize capacitação imediata para as ferramentas existentes.",
        score: 1
      },
      {
        label: "Onboarding raso: Quando implementamos as ferramentas, teve algum treinamento inicial, mas nada profundo. Alguns colaboradores aprenderam na marra, outros usam o básico e ignoram o resto. Não reforçamos treinamentos com frequência e não checamos se todos estão realmente aptos.",
        value: 2,
        feedback: "Treinamento superficial leva a adoção parcial. Estabeleça um programa contínuo de capacitação e reciclagem.",
        score: 2
      },
      {
        label: "Treinamento ok, uso variável: Treinamos a equipe nas principais ferramentas e funcionalidades quando elas foram adotadas. A maioria sabe usar relativamente bem o que precisa no dia a dia. Ainda assim, novas features ou updates nem sempre são formalmente apresentados, e usuários novos recebem treinamento informal, o que pode deixar algumas lacunas.",
        value: 3,
        feedback: "Bom treinamento inicial! Agora implemente capacitação contínua e monitoramento de uso para maximizar retorno sobre investimento.",
        score: 3
      },
      {
        label: "Maestria em ferramentas: Investimos seriamente em capacitação para aproveitar nosso stack ao máximo. Todo membro novo do time passa por treinamento completo nas ferramentas. Realizamos reciclagens ou compartilhamento de boas práticas periodicamente. Assim, evitamos \"shelfware\" (ferramenta comprada e encostada) – se pagamos por uma tecnologia, extraímos valor dela.",
        value: 4,
        feedback: "Excelente! Treinamento contínuo e profundo maximiza o ROI em tecnologia e potencializa a produtividade da equipe.",
        score: 4
      }
    ]
  },
  {
    id: "q48",
    text: "Vocês já utilizam Inteligência Artificial ou automação avançada (ex.: chatbots inteligentes, respostas automáticas, scoring preditivo) no processo comercial ou nem chegaram nesse assunto ainda?",
    pillar: "tools",
    options: [
      {
        label: "Ainda na idade da pedra: Não aplicamos nada de IA ou automação avançada em vendas. Nenhum chatbot, nenhum algoritmo de previsão – nossa operação é totalmente tradicional/manual.",
        value: 1,
        feedback: "O futuro já chegou na venda B2B. Comece a explorar pelo menos uma aplicação de IA, mesmo que básica.",
        score: 1
      },
      {
        label: "Começando a explorar: Estamos experimentando algo pontual de IA/automação. Talvez um chatbot simples no site ou usamos alguma função de IA do CRM (como sugestão de próxima atividade), mas é iniciante e não integrado ao processo principal ainda.",
        value: 2,
        feedback: "Bom começo exploratório! Agora busque casos de uso mais impactantes e integre as soluções ao seu processo principal.",
        score: 2
      },
      {
        label: "Uso pontual de IA: Implementamos algumas coisas com IA/automação avançada: por exemplo, um chatbot mais elaborado para qualificar leads no site, ou um modelo que prioriza leads quentes baseado em comportamento. Não está amplamente difundido, mas já tiramos proveito em certos pontos.",
        value: 3,
        feedback: "Boas aplicações iniciais! Continue expandindo para mais áreas do processo comercial e refinando os algoritmos existentes.",
        score: 3
      },
      {
        label: "IA no dia a dia: Alavancamos IA/automação em vários aspectos: chatbot qualifica e agenda reuniões, algoritmos analisam probabilidade de fechamento ou recomendam ações, ferramentas automáticas de enriquecimento de lead, etc. Nossa equipe abraçou essas tecnologias para ganhar eficiência e insight – estamos na fronteira do que há de mais moderno em enablement de vendas.",
        value: 4,
        feedback: "Excelente! Adoção avançada de IA representa vantagem competitiva significativa em eficiência e precisão comercial.",
        score: 4
      }
    ]
  },
  {
    id: "q49",
    text: "Seu stack comercial cobre todo o processo (prospecção, CRM, nurturing, pós-venda) ou existem lacunas onde tudo vira trabalho manual?",
    pillar: "tools",
    options: [
      {
        label: "Vários pontos cegos: Temos grandes lacunas no nosso stack. Há partes do ciclo de venda/pós-venda sem nenhuma ferramenta de suporte – por exemplo, geramos leads mas não temos ferramenta de e-mail marketing, ou vendemos mas não temos um sistema de suporte pós-venda decente. Essas brechas geram muito esforço manual e perda de eficiência.",
        value: 1,
        feedback: "Lacunas críticas comprometem todo o processo. Identifique o elo mais fraco da cadeia e priorize essa ferramenta.",
        score: 1
      },
      {
        label: "Cobertura básica, faltam peças: O stack cobre o essencial (temos CRM e talvez uma ferramenta de marketing), mas algumas etapas do ciclo não têm ferramentas dedicadas. Podemos até improvisar com planilhas ou usar ferramentas genéricas para certas tarefas, mas reconhecemos pontos onde uma solução específica faria diferença e ainda não temos.",
        value: 2,
        feedback: "Ferramentas improvisadas limitam produtividade. Planeje um roadmap para preencher gradualmente as lacunas mais críticas.",
        score: 2
      },
      {
        label: "Quase completo: Temos ferramentas para quase todos os estágios do funil – geração de leads, CRM, acompanhamento de propostas, suporte pós-venda etc. – porém talvez não as melhores ou não totalmente integradas. As lacunas são pequenas e estamos cientes delas, buscando preencher conforme possível.",
        value: 3,
        feedback: "Bom conjunto de ferramentas! Agora foque em preencher as pequenas lacunas restantes e melhorar a integração entre os sistemas.",
        score: 3
      },
      {
        label: "Stack completo fim a fim: Dispomos de um ecossistema de ferramentas cobrindo toda jornada: software de prospecção/marketing na entrada, CRM para pipeline, ferramentas de proposta/contrato, plataforma de suporte e sucesso para pós-venda, tudo operado pelo time. Nenhuma etapa depende exclusivamente de controles manuais porque nosso stack foi planejado para ser abrangente.",
        value: 4,
        feedback: "Excelente! Um stack completo e integrado permite uma experiência fluida para clientes e colaboradores em todo o ciclo comercial.",
        score: 4
      }
    ]
  }
];
