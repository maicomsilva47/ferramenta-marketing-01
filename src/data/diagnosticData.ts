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
  const percentage = (score / (questionCount * 3)) * 100;
  
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

// Sample diagnostic questions
export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "q1",
    text: "Sua empresa possui metas claras de receita e um plano para alcançá-las de forma previsível?",
    pillar: "revenue-strategy",
    options: [
      {
        label: "Sim, temos metas anuais/trimestrais bem definidas e um plano de ações detalhado para atingi-las, com pipeline previsível (sabemos de onde virão os clientes para bater a meta).",
        value: 3,
        feedback: "Ótimo, você tem um norte claro. Estratégia de receita bem definida é a base do crescimento previsível. Continue executando o plano consistentemente (um plano sem execução não passa de papel). ✔️",
        score: 3
      },
      {
        label: "Temos metas definidas, mas o planejamento é básico ou nem sempre seguido – a previsibilidade sofre e acabamos \"correndo atrás\" mês a mês.",
        value: 2,
        feedback: "Você tem alguma direção, porém falta previsibilidade. Sem um plano sólido e disciplinado, sua receita fica vulnerável a oscilações. Navegar sem mapa pode custar caro quando a maré virar. ⛵️ Ajuste o planejamento para tornar as metas mais alcançáveis.",
        score: 2
      },
      {
        label: "Não há metas formais ou plano estruturado; as vendas acontecem de forma reativa, sem muita previsibilidade.",
        value: 1,
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
        value: 3,
        feedback: "Excelente, múltiplas fontes = risco diluído. Empresas de alto crescimento espalham apostas e garantem fluxo constante de oportunidades. Sua receita não fica refém de um só canal – continue assim. 🔄",
        score: 3
      },
      {
        label: "Possuímos mais de uma fonte de leads, mas ainda dependemos muito de um canal principal (ex: 80% dos leads vêm apenas de indicações ou apenas de mídia paga).",
        value: 2,
        feedback: "Atenção: alguma diversificação existe, mas a dependência de um canal ainda é grande. Se esse canal principal sofrer (por exemplo, se indicações diminuírem ou custo de marketing aumentar), seu crescimento trava. Pense em equilibrar o mix de geração de demanda para não ficar com \"todos os ovos na mesma cesta\". 🧺",
        score: 2
      },
      {
        label: "Nossa geração de negócios é quase totalmente concentrada em um único meio ou em poucos clientes-chave. Se essa fonte falhar, as vendas despencam.",
        value: 1,
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
        value: 3,
        feedback: "Ótimo – saber exatamente quem é seu cliente ideal e sua dor torna a venda muito mais eficaz. Quando há aderência clara da sua solução ao problema do cliente, o ciclo de venda encurta e a taxa de conversão dispara. Continue alinhado ao seu ICP, isso é ouro. 🥇",
        score: 3
      },
      {
        label: "Temos alguma noção de quem é nosso público-alvo e qual problema resolvemos, mas poderia ser mais bem definido. Às vezes ajustamos o discurso conforme o cliente, ainda buscando encaixar perfeitamente o valor.",
        value: 2,
        feedback: "Há algum alinhamento, mas falta nitidez. Se você não tem total clareza do nicho e do valor específico que entrega, sua mensagem pode estar difusa. Lembre: \"quem mira em tudo, não acerta em nada\". 🎯 Refine a definição do ICP e ajuste sua proposta de valor para falar diretamente com as dores dele – isso vai diferenciar você da concorrência.",
        score: 2
      },
      {
        label: "Vendemos de forma genérica, tentando atender \"todo mundo\". Não temos um nicho ou dor específica claramente definida – acreditamos que nosso produto serve para qualquer um que apareça.",
        value: 1,
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
        value: 3,
        feedback: "Muito bom – qualificação rigorosa evita perder tempo com curiosos ou \"turistas\". 📋 Saber dizer \"não\" para leads sem fit economiza energia para focar nos alvos certos. Seu time foca onde há chance real, aumentando eficiência e moral.",
        score: 3
      },
      {
        label: "Em geral qualificamos os leads, mas às vezes acabamos insistindo em leads duvidosos (com baixo fit) na esperança de converter. Falta rigor para dizer \"não\" a quem não encaixa bem.",
        value: 2,
        feedback: "Você procura qualificar, porém ainda há desperdício perseguindo quem não é tão aderente. Isso é queimar munição com pouco retorno. Muitos vendedores caem na armadilha de tentar salvar leads ruins – em vez disso, ajuste o processo para filtrar melhor. Um lead não qualificado deve sair do funil rapidamente, liberando espaço para oportunidades melhores.",
        score: 2
      },
      {
        label: "Não há um processo formal de qualificação por fit; tentamos vender para qualquer lead que aparece. Só descobrimos que não era cliente ideal depois de gastar tempo (ou nem isso).",
        value: 1,
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
        value: 3,
        feedback: "Excelente – gerir por dados é fundamental para escalar com segurança. Você sabe onde ajustar o leme, pois tem inteligência para identificar gargalos e oportunidades rapidamente. Continue assim.",
        score: 3
      },
      {
        label: "Monitoramos algumas métricas básicas, mas a análise não é sistemática ou frequente. Às vezes as decisões são mais baseadas em percepção do que em dados.",
        value: 2,
        feedback: "Você está no caminho certo ao coletar dados, mas sem uma análise disciplinada, pode estar deixando oportunidades importantes na mesa. Transformar dados em insights acionáveis é a diferença entre empresas que crescem acidentalmente e as que crescem por design. 📊 Invista tempo para entender realmente o que seus números dizem.",
        score: 2
      },
      {
        label: "Não acompanhamos métricas de forma sistemática. Temos uma visão geral de fechamentos, mas pouca ou nenhuma análise do funil, conversão ou eficiência.",
        value: 1,
        feedback: "Você está vendando no escuro. Como otimizar o que não é medido? 📏 Sem métricas claras, você está condenado a repetir erros e deixar passar oportunidades. Se os números te assustam, comece com o básico: quantos leads entram, quantos avançam e quantos fecham, e quanto tempo leva cada etapa. Só isso já seria um salto quântico para orientar suas decisões.",
        score: 1
      }
    ]
  },
  {
    id: "q6",
    text: "Como é o processo de prospecção da sua empresa?",
    pillar: "prospecting",
    options: [
      {
        label: "Temos um processo estruturado, multicanal e consistente de prospecção. Nossa equipe executa ações planejadas diariamente e geramos um fluxo previsível de leads qualificados.",
        value: 3,
        feedback: "Parabéns! Um motor de prospecção bem azeitado é a base do crescimento sustentável. Você não depende da sorte para gerar oportunidades – seu sistema cria resultados previsíveis. Continue refinando e testando novos canais e abordagens para manter a máquina evoluindo. 🔍",
        score: 3
      },
      {
        label: "Fazemos algumas ações de prospecção com alguma regularidade, mas não de forma totalmente sistemática ou consistente. O fluxo de leads tem altos e baixos.",
        value: 2,
        feedback: "Você está no meio do caminho – já reconhece a importância da prospecção ativa, mas ainda falta consistência. Lembre-se: prospecção é como exercício físico, precisa ser regular para dar resultados. Transforme ações pontuais em processos diários, e você verá seu pipeline se estabilizar. 📅",
        score: 2
      },
      {
        label: "Nossa geração de leads é principalmente reativa/passiva. Dependemos muito de indicações ou contatos espontâneos, sem um processo estruturado de busca ativa por novos clientes.",
        value: 1,
        feedback: "Atenção! Depender apenas de leads passivos é arriscar o futuro do negócio. É como um agricultor que só espera a chuva, sem sistema de irrigação. Quando a fonte secar (e em algum momento vai), você estará vulnerável. Estabeleça urgentemente um processo mínimo de prospecção ativa diária – mesmo que simples no início – para garantir um fluxo constante de oportunidades. 🚰",
        score: 1
      }
    ]
  },
  {
    id: "q7",
    text: "Como funciona o processo de follow-up na sua empresa após o primeiro contato com um potencial cliente?",
    pillar: "conversion",
    options: [
      {
        label: "Temos um processo sistemático de follow-up, com cadências de contato bem definidas e utilizamos diversas formas de abordar (e-mail, telefone, mensagens). Raramente perdemos uma oportunidade por falta de acompanhamento.",
        value: 3,
        feedback: "Excelente! O follow-up persistente e sistemático é um grande diferencial competitivo. A maioria das vendas acontece após a quinta tentativa de contato, mas poucos vendedores chegam até lá. Continue com essa disciplina de acompanhamento e você continuará convertendo oportunidades que seus concorrentes deixariam escapar. 🏆",
        score: 3
      },
      {
        label: "Fazemos follow-up, mas sem um processo muito estruturado. Dependemos do vendedor lembrar de retomar contato, e às vezes demoramos para dar sequência ou acabamos abandonando leads potencialmente viáveis.",
        value: 2,
        feedback: "Você reconhece a importância do follow-up, mas a falta de processo estruturado está certamente deixando dinheiro na mesa. A memória humana é falível – vendedores ocupados inevitavelmente deixarão leads cair no esquecimento sem um sistema robusto. Implemente uma cadência formal de follow-up e veja sua taxa de conversão subir significativamente. 📈",
        score: 2
      },
      {
        label: "Nosso follow-up é frágil ou quase inexistente. Frequentemente esperamos o cliente retomar contato após a primeira interação, e muitos leads acabam esfriando por falta de acompanhamento adequado.",
        value: 1,
        feedback: "Alerta crítico! Sem follow-up adequado, você está literalmente jogando dinheiro no lixo. Leads que você já pagou para adquirir estão escapando por entre os dedos. Estudos mostram que 80% das vendas requerem pelo menos 5 contatos, mas 44% dos vendedores desistem após apenas 1 tentativa. Implemente imediatamente um processo básico de acompanhamento – é provavelmente o ajuste de menor esforço e maior retorno que você pode fazer no seu processo comercial hoje. 🚨",
        score: 1
      }
    ]
  },
  {
    id: "q8",
    text: "Como é o processo de pós-venda e retenção de clientes na sua empresa?",
    pillar: "retention",
    options: [
      {
        label: "Temos um processo estruturado de onboarding, sucesso do cliente e relacionamento contínuo. Monitoramos ativamente a satisfação e identificamos riscos de cancelamento e oportunidades de expansão.",
        value: 3,
        feedback: "Parabéns por valorizar a retenção! Empresas que mantêm alto foco em pós-venda crescem mais rápido e de forma mais sustentável. Com clientes satisfeitos e bem atendidos, você provavelmente já colhe os frutos em forma de menor CAC (via indicações), maior LTV e receita mais previsível. Continue investindo no relacionamento de longo prazo. 🌱",
        score: 3
      },
      {
        label: "Temos alguns pontos de contato pós-venda, mas o processo não é totalmente estruturado. Oferecemos algum suporte e atenção, mas poderia ser mais sistemático e proativo.",
        value: 2,
        feedback: "Você está no caminho certo ao dedicar alguma atenção ao pós-venda, mas há espaço para melhorias significativas. Lembre-se que é 5 a 25 vezes mais caro adquirir um novo cliente do que manter um existente. Estruture melhor seu processo de sucesso do cliente, com pontos de contato programados em momentos estratégicos do ciclo de vida – o retorno sobre esse investimento tende a ser extraordinário. ⏱️",
        score: 2
      },
      {
        label: "Não temos um processo formal de pós-venda ou retenção. Após a compra, o contato é principalmente reativo (quando há problemas) ou para tentar renovar/vender mais apenas próximo ao fim do contrato.",
        value: 1,
        feedback: "Atenção! Negligenciar o pós-venda é como encher um balde com um grande furo – por mais que você venda, a água escapa. Alto churn exige muito mais esforço de aquisição apenas para manter o negócio estável. Estabeleça urgentemente ao menos um processo básico de onboarding e check-in periódico com clientes – isso já reduziria significativamente sua taxa de cancelamento e abriria oportunidades de expansão que você provavelmente está perdendo. 🚽",
        score: 1
      }
    ]
  },
  {
    id: "q9",
    text: "Qual o nível de suporte tecnológico para seus processos comerciais?",
    pillar: "tools",
    options: [
      {
        label: "Utilizamos tecnologias integradas que automatizam grande parte do nosso processo comercial. Temos CRM bem implementado, automação de marketing, ferramentas de comunicação e análise que aumentam significativamente nossa produtividade.",
        value: 3,
        feedback: "Excelente! Um stack tecnológico robusto é um multiplicador de força para equipes comerciais. Com as ferramentas certas, sua equipe consegue focar no que realmente importa: relacionamentos e conversões, enquanto o trabalho manual fica com os robôs. Continue investindo em tecnologia e avaliando regularmente se as ferramentas estão realmente sendo utilizadas em seu potencial máximo. 🤖",
        score: 3
      },
      {
        label: "Usamos algumas ferramentas básicas (como um CRM simples), mas muitos processos ainda são manuais. Falta integração entre sistemas ou utilizamos apenas parcialmente as funcionalidades disponíveis.",
        value: 2,
        feedback: "Você deu os primeiros passos com tecnologia comercial, mas ainda está deixando muito valor na mesa. Sistemas fragmentados ou subutilizados criam ineficiências e fazem sua equipe perder tempo com tarefas que poderiam ser automatizadas. Avalie se está aproveitando completamente as ferramentas que já possui antes de adicionar novas, e busque integrar melhor seus sistemas para eliminar trabalho manual desnecessário. 🔄",
        score: 2
      },
      {
        label: "Temos pouca ou nenhuma tecnologia de apoio comercial. Usamos principalmente planilhas, e-mails e métodos manuais para gerenciar nosso pipeline e processos de vendas.",
        value: 1,
        feedback: "Alerta! Operar processos comerciais sem tecnologia adequada hoje é como tentar competir em uma corrida de Fórmula 1 com um carro de passeio. Por mais talentosa que seja sua equipe, há um teto de eficiência que só será superado com ferramentas adequadas. Comece implementando um CRM básico e gradualmente adicione automações para os processos mais repetitivos e demorados. O investimento se paga rapidamente em produtividade e leads que não caem mais nas rachaduras do processo manual. 🔧",
        score: 1
      }
    ]
  }
];
