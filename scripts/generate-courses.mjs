import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LOREM_MEC = 'Cursos reconhecidos pelo MEC';
const LOREM_EMEC = '00000';
const SCHEDULE_MATUTINO = 'De acordo com planejamento do curso';
const SCHEDULE_NOTURNO = '18:30 às 22:00';
const SCHEDULE_EAD = 'Horários flexíveis na plataforma EAD';
const LOREM_OTHER = 'Lorem ipsum — condição de desconto a confirmar';
const IMG = 'images/banners/banner-padrao.png';
const BANNER = [{ id: 'banner-padrao', image: IMG, alt: 'Banner promocional FEMAF — Graduação' }];

/** Mensalidades presencial sede 2026 (reajuste 5%) */
function presencialPrice(original, punctualityPercent, punctualityDiscount) {
  return { original, punctualityPercent, punctualityDiscount };
}

function eadPrice(punctualityDiscount, punctualityPercent) {
  const original =
    Math.round((punctualityDiscount / (1 - punctualityPercent / 100)) * 100) / 100;
  return { original, punctualityDiscount, punctualityPercent };
}
const CURRICULUM = [
  { semester: 1, disciplines: ['Lorem ipsum dolor', 'Consectetur adipiscing', 'Vestibulum ante ipsum', 'Praesent commodo'] },
  { semester: 2, disciplines: ['Magna fringilla urna', 'Mollis pretium nisl', 'Donec sed odio dui', 'Aenean lacinia bibendum'] },
];
const FAQ = [
  {
    question: 'Quais as formas de ingresso?',
    answer:
      'A FEMAF oferece Vestibular, ENEM, Transferência e Segunda Graduação. Cada forma de ingresso possui requisitos, documentação e prazos específicos. Na página do curso, acesse "Escolher forma de ingresso" ou fale com nossa equipe pelo WhatsApp para receber orientação personalizada.',
  },
  {
    question: 'Como funciona o desconto de mensalidade?',
    answer:
      'A mensalidade integral é o valor tabelado do curso em 2026. O desconto de pontualidade é concedido quando o pagamento é realizado em dias, conforme o percentual vigente para cada curso. No card de investimento, você pode alternar entre "Valor integral" e "Valor com desconto (pontualidade)" para simular a mensalidade.',
  },
  {
    question: 'A FEMAF possui laboratórios?',
    answer:
      'Sim. A Faculdade de Educação Memorial Adelaide Franco (FEMAF) conta com infraestrutura na sede presencial, incluindo laboratórios, biblioteca e espaços de convivência que apoiam a formação prática. A disponibilidade de laboratórios específicos varia conforme a área do curso.',
  },
];
const INGRESS = {
  vestibular: true,
  enem: true,
  transferencia: true,
  segundaGraduacao: true,
  prouni: false,
  fies: false,
  reabertura: false,
  enrollmentUrl: '',
  notes: { geral: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
};

/** @typedef {object} CourseSeed */

function buildCourse(c) {
  return {
    id: c.id,
    slug: c.id,
    name: c.name,
    degree: c.degree,
    areaId: c.areaId,
    modalityIds: c.modalityIds,
    featured: c.featured,
    tags: c.tags,
    duration: c.duration,
    workload: c.workload,
    shift: c.shift,
    schedules: c.schedules,
    mecRecognition: LOREM_MEC,
    emecProcess: LOREM_EMEC,
    image: IMG,
    price: {
      original: c.price.original,
      punctualityDiscount: c.price.punctualityDiscount,
      punctualityPercent: c.price.punctualityPercent,
    },
    ...(c.pricesByModality ? { pricesByModality: c.pricesByModality } : {}),
    summary: c.summary,
    description: c.description,
    highlights: c.highlights,
    graduateProfile: c.graduateProfile,
    jobMarket: c.jobMarket,
    careerPaths: c.careerPaths,
    ingress: INGRESS,
    curriculum: CURRICULUM,
    faq: FAQ,
    banners: BANNER,
  };
}

const courses = [
  {
    id: 'educacao-fisica',
    name: 'Educação Física',
    degree: 'Licenciatura / Bacharelado',
    areaId: 'educacao',
    modalityIds: ['presencial'],
    featured: false,
    tags: ['educação física', 'esporte', 'presencial', 'licenciatura'],
    duration: '4 anos',
    workload: '3.200 horas',
    shift: ['matutino', 'noturno'],
    schedules: [
      { shift: 'matutino', time: SCHEDULE_MATUTINO },
      { shift: 'noturno', time: SCHEDULE_NOTURNO },
    ],
    price: presencialPrice(445.98, 15, 379.0),
    summary: 'Formação completa para atuar na educação, saúde e esporte com base científica e prática profissional.',
    description:
      'O curso de Educação Física da FEMAF prepara profissionais para planejar, prescrever e orientar práticas corporais em escolas, academias, clubes e projetos esportivos. A formação integra fundamentos pedagógicos, científicos e biomecânicos com vivências práticas ao longo da graduação.\n\nO egresso desenvolve competências para promover saúde, qualidade de vida e desempenho motor, atuando com ética e responsabilidade social. O currículo contempla estágios supervisionados e atividades que aproximam o estudante das demandas reais do mercado.\n\nCom habilitação em licenciatura e bacharelado, o curso amplia as possibilidades de atuação em ambientes educacionais, esportivos e de promoção da saúde.',
    highlights: ['Dupla habilitação Licenciatura e Bacharelado', 'Laboratórios e práticas esportivas', 'Estágios supervisionados', 'Mercado em constante expansão'],
    graduateProfile:
      'O egresso de Educação Física da FEMAF é um profissional capacitado para planejar, implementar e avaliar programas de atividade física e esporte. Domina conhecimentos sobre anatomia, fisiologia, treinamento e didática, atuando de forma crítica e humanizada.\n\nEstá preparado para liderar grupos, orientar práticas corporais e contribuir para a saúde coletiva, respeitando a diversidade e as necessidades de cada indivíduo.',
    jobMarket:
      'O mercado para profissionais de Educação Física permanece aquecido, com oportunidades em escolas, academias, clubes esportivos, consultorias e projetos de saúde. A valorização do bem-estar e do esporte impulsiona a demanda por especialistas qualificados.\n\nEmpresas, clínicas e instituições públicas também buscam esses profissionais para programas de qualidade de vida e prevenção.',
    careerPaths: ['Professor de Educação Física', 'Personal trainer', 'Preparador físico', 'Gestor esportivo', 'Instrutor de atividades físicas', 'Consultor em saúde e condicionamento'],
  },
  {
    id: 'engenharia-civil',
    name: 'Engenharia Civil',
    degree: 'Bacharelado',
    areaId: 'engenharia',
    modalityIds: ['presencial'],
    featured: true,
    tags: ['engenharia', 'construção', 'infraestrutura', 'presencial'],
    duration: '5 anos',
    workload: '3.600 horas',
    shift: ['noturno'],
    schedules: [{ shift: 'noturno', time: SCHEDULE_NOTURNO }],
    price: presencialPrice(1249.0, 25, 936.75),
    summary: 'Projete e gerencie obras de infraestrutura com sólida formação técnica e visão sustentável.',
    description:
      'A Engenharia Civil na FEMAF forma profissionais aptos a projetar, dimensionar e gerenciar obras de construção civil, saneamento e infraestrutura urbana. A grade equilibra teoria e prática em laboratórios, projetos integradores e atividades de campo.\n\nO estudante desenvolve raciocínio analítico, domínio de normas técnicas e capacidade de liderar equipes em diferentes etapas de empreendimentos. A formação enfatiza sustentabilidade, segurança e eficiência nos processos construtivos.\n\nAo longo do curso, o aluno é preparado para atuar em empresas, órgãos públicos e escritórios de engenharia com responsabilidade técnica e ética profissional.',
    highlights: ['Laboratórios de materiais e estruturas', 'Projetos integradores', 'Foco em sustentabilidade', 'Alta empregabilidade no setor'],
    graduateProfile:
      'O engenheiro civil egresso da FEMAF domina os fundamentos de estruturas, geotecnia, hidráulica e gestão de obras. É capaz de elaborar projetos, orçamentos e cronogramas, fiscalizando a execução com critério técnico.\n\nAtua com compromisso com a segurança, o meio ambiente e a qualidade das construções, contribuindo para o desenvolvimento urbano e social.',
    jobMarket:
      'A construção civil e o setor de infraestrutura seguem entre os que mais empregam no país. Engenheiros civis encontram oportunidades em construtoras, incorporadoras, concessionárias, prefeituras e consultorias especializadas.\n\nA expansão urbana e as obras de saneamento e mobilidade mantêm a demanda por profissionais qualificados.',
    careerPaths: ['Engenheiro civil', 'Orçamentista', 'Fiscal de obras', 'Gestor de projetos', 'Consultor em estruturas', 'Empreendedor na construção civil'],
  },
  {
    id: 'farmacia',
    name: 'Farmácia',
    degree: 'Bacharelado',
    areaId: 'saude',
    modalityIds: ['presencial'],
    featured: true,
    tags: ['farmácia', 'saúde', 'medicamentos', 'presencial'],
    duration: '5 anos',
    workload: '4.000 horas',
    shift: ['matutino', 'noturno'],
    schedules: [
      { shift: 'matutino', time: SCHEDULE_MATUTINO },
      { shift: 'noturno', time: SCHEDULE_NOTURNO },
    ],
    price: presencialPrice(1311.45, 30, 918.0),
    summary: 'Atue na promoção da saúde com domínio de medicamentos, análises clínicas e atenção farmacêutica.',
    description:
      'O curso de Farmácia da FEMAF forma profissionais para desenvolver, produzir, dispensar e monitorar medicamentos com segurança e responsabilidade. A formação combina bases científicas, prática laboratorial e estágios em farmácias e instituições de saúde.\n\nO estudante aprende a atuar na atenção farmacêutica, orientando pacientes e contribuindo para o uso racional de medicamentos. O currículo abrange áreas como farmacologia, química, microbiologia e legislação sanitária.\n\nA FEMAF oferece infraestrutura de laboratórios e parcerias que aproximam o aluno da realidade profissional desde os primeiros semestres.',
    highlights: ['Laboratórios equipados', 'Estágios em farmácias e hospitais', 'Atenção farmacêutica', 'Alta demanda no setor de saúde'],
    graduateProfile:
      'O farmacêutico formado pela FEMAF é um profissional generalista, ético e tecnicamente competente. Está apto a atuar na indústria farmacêutica, em farmácias, hospitais, análises clínicas e vigilância sanitária.\n\nPossui visão crítica sobre a cadeia de medicamentos e compromisso com a saúde pública e o bem-estar dos pacientes.',
    jobMarket:
      'O setor farmacêutico e de saúde apresenta demanda constante por farmacêuticos em redes de farmácia, hospitais, indústria e órgãos reguladores. A expansão da atenção farmacêutica amplia as oportunidades de atuação.\n\nProfissionais atualizados e com perfil humanizado são especialmente valorizados pelo mercado.',
    careerPaths: ['Farmacêutico clínico', 'Farmacêutico hospitalar', 'Analista de qualidade', 'Pesquisador', 'Gestor em farmácia', 'Consultor regulatório'],
  },
  {
    id: 'direito',
    name: 'Direito',
    degree: 'Bacharelado',
    areaId: 'humanas',
    modalityIds: ['presencial'],
    featured: true,
    tags: ['direito', 'jurídico', 'advocacia', 'presencial'],
    duration: '5 anos',
    workload: '3.600 horas',
    shift: ['noturno'],
    schedules: [{ shift: 'noturno', time: SCHEDULE_NOTURNO }],
    price: presencialPrice(1382.0, 10, 1243.8),
    summary: 'Construa uma carreira sólida no universo jurídico com formação crítica, ética e atualizada.',
    description:
      'O curso de Direito da FEMAF forma bacharéis preparados para atuar em advocacia, consultoria, carreiras públicas e departamentos jurídicos empresariais. A grade contempla os fundamentos do direito público e privado com abordagem crítica e contextualizada.\n\nO núcleo de práticas jurídicas oferece vivência em peças processuais, simulações e atividades que desenvolvem argumentação e raciocínio jurídico. A formação enfatiza ética, cidadania e compromisso com a justiça social.\n\nO estudante é acompanhado por corpo docente experiente, com foco na preparação para o mercado de trabalho e para o Exame da Ordem.',
    highlights: ['Núcleo de práticas jurídicas', 'Corpo docente experiente', 'Preparação para o mercado e OAB', 'Formação ética e crítica'],
    graduateProfile:
      'O bacharel em Direito egresso da FEMAF possui domínio dos institutos jurídicos fundamentais e capacidade de analisar conflitos com rigor técnico. Desenvolve habilidades de argumentação, redação jurídica e interpretação normativa.\n\nEstá preparado para defender direitos, assessorar pessoas e organizações e contribuir para o fortalecimento do estado democrático de direito.',
    jobMarket:
      'O mercado jurídico abrange escritórios de advocacia, departamentos jurídicos de empresas, concursos públicos, defensoria, ministério público e atuação autônoma. A versatilidade da formação permite atuação em diversas áreas do direito.\n\nProfissionais com perfil analítico, comunicativo e atualizado encontram amplas oportunidades de crescimento.',
    careerPaths: ['Advogado', 'Consultor jurídico', 'Defensor público', 'Procurador', 'Analista jurídico', 'Magistratura (via concurso)'],
  },
  {
    id: 'pedagogia',
    name: 'Pedagogia',
    degree: 'Licenciatura',
    areaId: 'educacao',
    modalityIds: ['presencial', 'ead'],
    featured: true,
    tags: ['pedagogia', 'educação', 'licenciatura', 'presencial', 'ead'],
    duration: '4 anos',
    workload: '3.200 horas',
    shift: ['matutino', 'noturno', 'ead'],
    schedules: [
      { shift: 'matutino', time: SCHEDULE_MATUTINO },
      { shift: 'noturno', time: SCHEDULE_NOTURNO },
      { shift: 'ead', time: SCHEDULE_EAD },
    ],
    price: presencialPrice(254.67, 10, 229.2),
    pricesByModality: {
      ead: eadPrice(159.9, 30.78),
    },
    summary: 'Transforme vidas pela educação com formação humanista, prática e compromisso social.',
    description:
      'O curso de Pedagogia da FEMAF prepara educadores para planejar, coordenar e avaliar processos de ensino e aprendizagem na educação infantil e nos anos iniciais do ensino fundamental. A formação une teoria pedagógica, prática em sala de aula e reflexão crítica sobre a educação brasileira.\n\nDisponível nas modalidades presencial e EAD, o curso oferece flexibilidade sem abrir mão da qualidade. Estágios supervisionados e atividades práticas conectam o estudante à realidade das instituições de ensino.\n\nO egresso desenvolve sensibilidade para a diversidade, domínio de metodologias ativas e competências para a gestão educacional.',
    highlights: ['Presencial e EAD', 'Estágios supervisionados', 'Formação humanista', 'Atuação em educação infantil e anos iniciais'],
    graduateProfile:
      'O pedagogo formado pela FEMAF é um educador reflexivo, comprometido com a transformação social por meio da educação. Domina planejamento pedagógico, avaliação da aprendizagem e mediação de conflitos em ambientes escolares.\n\nEstá apto a atuar em sala de aula, coordenação pedagógica e projetos educacionais em diferentes contextos.',
    jobMarket:
      'Educadores continuam sendo essenciais para o desenvolvimento do país. Pedagogos atuam em escolas públicas e privadas, creches, ONGs, secretarias de educação e empresas de educação corporativa.\n\nA demanda por profissionais qualificados na educação infantil e na gestão escolar permanece significativa.',
    careerPaths: ['Professor', 'Coordenador pedagógico', 'Designer instrucional', 'Gestor educacional', 'Consultor pedagógico', 'Especialista em educação infantil'],
  },
  {
    id: 'servico-social',
    name: 'Serviço Social',
    degree: 'Bacharelado',
    areaId: 'humanas',
    modalityIds: ['ead'],
    featured: false,
    tags: ['serviço social', 'assistência social', 'políticas públicas', 'ead'],
    duration: '4 anos',
    workload: '3.200 horas',
    shift: ['ead'],
    schedules: [{ shift: 'ead', time: SCHEDULE_EAD }],
    price: eadPrice(179.9, 28.04),
    summary: 'Promova justiça social e defesa de direitos com formação crítica e comprometida.',
    description:
      'O curso de Serviço Social da FEMAF forma profissionais para intervenção em políticas públicas, assistência social e organizações, com foco na transformação de realidades sociais. A formação desenvolve olhar crítico sobre as desigualdades e competências para atuação junto a indivíduos, famílias e comunidades.\n\nOferecido em EAD, o curso integra teoria e prática em equipamentos sociais, estágios e projetos extensionistas. O estudante aprende a planejar, executar e avaliar ações que promovam inclusão e cidadania.\n\nA ética profissional e o compromisso com os direitos humanos orientam toda a trajetória formativa.',
    highlights: ['100% EAD', 'Estágios em equipamentos sociais', 'Formação político-social', 'Compromisso com direitos humanos'],
    graduateProfile:
      'O assistente social egresso da FEMAF é um profissional crítico, ético e engajado na defesa de direitos. Está capacitado para diagnosticar situações sociais, planejar intervenções e articular redes de proteção e assistência.\n\nAtua com sensibilidade cultural e compromisso com a transformação de condições que geram exclusão e vulnerabilidade.',
    jobMarket:
      'Assistentes sociais são fundamentais em CRAS, CREAS, hospitais, empresas, ONGs e governos. A implementação de políticas sociais e a ampliação de serviços de proteção mantêm a demanda por esses profissionais.\n\nHá também oportunidades em consultorias, responsabilidade social empresarial e pesquisa aplicada.',
    careerPaths: ['Assistente social', 'Gestor em políticas sociais', 'Consultor em responsabilidade social', 'Docente', 'Analista de projetos sociais', 'Coordenador de programas públicos'],
  },
  {
    id: 'psicologia',
    name: 'Psicologia',
    degree: 'Bacharelado',
    areaId: 'humanas',
    modalityIds: ['presencial'],
    featured: true,
    tags: ['psicologia', 'saúde mental', 'clínica', 'presencial'],
    duration: '5 anos',
    workload: '4.000 horas',
    shift: ['matutino', 'noturno'],
    schedules: [
      { shift: 'matutino', time: SCHEDULE_MATUTINO },
      { shift: 'noturno', time: SCHEDULE_NOTURNO },
    ],
    price: presencialPrice(1030.28, 20, 824.0),
    summary: 'Compreenda o comportamento humano e atue na promoção da saúde mental e do bem-estar.',
    description:
      'O curso de Psicologia da FEMAF forma profissionais para atuar em clínica, organizações, escolas e comunidades, com base científica e abordagem humanizada. O currículo abrange áreas como desenvolvimento humano, psicopatologia, avaliação psicológica e intervenções terapêuticas.\n\nEstágios supervisionados e atividades práticas em clínica-escola permitem ao estudante desenvolver escuta, análise e intervenção sob orientação de profissionais experientes. A formação enfatiza ética, reflexividade e respeito à diversidade.\n\nO egresso está preparado para compreender o comportamento humano em suas múltiplas dimensões e contribuir para a saúde mental individual e coletiva.',
    highlights: ['Clínica-escola e estágios supervisionados', 'Formação humanista e científica', 'Diversas áreas de atuação', 'Ênfase em ética profissional'],
    graduateProfile:
      'O psicólogo formado pela FEMAF domina fundamentos teóricos e métodos de intervenção psicológica. É capaz de realizar avaliações, conduzir processos terapêuticos e atuar em contextos clínicos, educacionais e organizacionais.\n\nDesenvolve postura ética, escuta qualificada e capacidade de trabalhar em equipes multidisciplinares.',
    jobMarket:
      'A demanda por psicólogos cresce em clínicas, hospitais, escolas, empresas e atendimento online. A valorização da saúde mental ampliou oportunidades em consultórios privados, programas corporativos e serviços públicos.\n\nProfissionais com formação sólida e perfil empático encontram espaço em diversos segmentos.',
    careerPaths: ['Psicólogo clínico', 'Psicólogo organizacional', 'Psicólogo escolar', 'Psicólogo hospitalar', 'Neuropsicólogo', 'Consultor em saúde mental'],
  },
  {
    id: 'ciencias-contabeis',
    name: 'Ciências Contábeis',
    degree: 'Bacharelado',
    areaId: 'gestao-negocios',
    modalityIds: ['ead'],
    featured: false,
    tags: ['contabilidade', 'finanças', 'ead'],
    duration: '4 anos',
    workload: '3.200 horas',
    shift: ['ead'],
    schedules: [{ shift: 'ead', time: SCHEDULE_EAD }],
    price: eadPrice(179.9, 28.04),
    summary: 'Domine contabilidade, finanças e auditoria com formação alinhada às exigências do mercado.',
    description:
      'O curso de Ciências Contábeis da FEMAF forma profissionais para registrar, analisar e auditar informações financeiras de organizações de todos os portes. A grade contempla contabilidade, legislação tributária, custos, auditoria e gestão financeira.\n\nOferecido em EAD, o curso permite conciliar estudos e trabalho com flexibilidade. A formação prepara o aluno para os desafios da contabilidade moderna, incluindo sistemas de informação e conformidade fiscal.\n\nO egresso desenvolve rigor técnico, visão analítica e capacidade de apoiar decisões estratégicas com base em dados confiáveis.',
    highlights: ['100% EAD', 'Foco em legislação atual', 'Flexibilidade para quem trabalha', 'Alta demanda no mercado contábil'],
    graduateProfile:
      'O contador formado pela FEMAF domina processos contábeis, fiscais e gerenciais. Está apto a elaborar demonstrações financeiras, orientar planejamento tributário e apoiar a gestão empresarial com informações precisas.\n\nAtua com ética, atualização constante e atenção às normas que regem a profissão.',
    jobMarket:
      'Toda empresa necessita de profissionais contábeis qualificados. O mercado oferece oportunidades em escritórios de contabilidade, indústrias, comércio, auditoria e consultoria fiscal. A complexidade tributária brasileira mantém alta demanda por especialistas.\n\nContadores com domínio tecnológico e visão estratégica são especialmente valorizados.',
    careerPaths: ['Contador', 'Auditor', 'Consultor fiscal', 'Controller', 'Analista financeiro', 'Perito contábil'],
  },
  {
    id: 'agronegocio',
    name: 'Tecnólogo em Agronegócio',
    degree: 'Tecnólogo',
    areaId: 'agronegocio',
    modalityIds: ['ead'],
    featured: false,
    tags: ['agronegócio', 'tecnólogo', 'gestão rural', 'ead'],
    duration: '3 anos',
    workload: '1.600 horas',
    shift: ['ead'],
    schedules: [{ shift: 'ead', time: SCHEDULE_EAD }],
    price: eadPrice(189.9, 38.75),
    summary: 'Gerencie propriedades rurais e negócios do agronegócio com visão empreendedora e sustentável.',
    description:
      'O curso Tecnólogo em Agronegócio da FEMAF forma profissionais para gestão de produção, comercialização e sustentabilidade no setor agropecuário. Em 3 anos, o estudante desenvolve competências em gestão rural, economia agrícola, marketing e logística do agronegócio.\n\nNa modalidade EAD, o curso oferece flexibilidade para quem já atua no campo ou deseja empreender no setor. A formação combina conteúdos técnicos e gerenciais alinhados às demandas do mercado agro brasileiro.\n\nO egresso está preparado para tomar decisões estratégicas em propriedades rurais, cooperativas e empresas do agronegócio.',
    highlights: ['Formação em 3 anos', '100% EAD com flexibilidade', 'Gestão rural e comercialização', 'Setor em constante crescimento'],
    graduateProfile:
      'O tecnólogo em Agronegócio egresso da FEMAF domina ferramentas de gestão aplicadas ao setor agropecuário. É capaz de planejar produção, analisar custos, comercializar produtos e implementar práticas sustentáveis.\n\nPossui visão empreendedora e capacidade de atuar em diferentes elos da cadeia produtiva do agronegócio.',
    jobMarket:
      'O agronegócio é um dos pilares da economia brasileira. Há oportunidades em fazendas, cooperativas, indústria de insumos, trading, consultoria rural e agronegócios familiares. A profissionalização da gestão rural impulsiona a demanda por tecnólogos qualificados.\n\nProfissionais que unem conhecimento técnico e visão de negócios encontram amplo mercado.',
    careerPaths: ['Gestor de propriedade rural', 'Consultor agropecuário', 'Comercializador de commodities', 'Empreendedor rural', 'Analista de agronegócio', 'Coordenador de cooperativa'],
  },
  {
    id: 'administracao',
    name: 'Administração',
    degree: 'Bacharelado',
    areaId: 'gestao-negocios',
    modalityIds: ['ead'],
    featured: true,
    tags: ['administração', 'gestão', 'negócios', 'ead'],
    duration: '4 anos',
    workload: '3.200 horas',
    shift: ['ead'],
    schedules: [{ shift: 'ead', time: SCHEDULE_EAD }],
    price: eadPrice(179.9, 28.04),
    summary: 'Forme-se para liderar equipes e gerenciar negócios com visão estratégica e empreendedora.',
    description:
      'O curso de Administração da FEMAF prepara profissionais para planejar, organizar e dirigir recursos em organizações de todos os portes. A formação generalista abrange gestão de pessoas, finanças, marketing, operações e empreendedorismo.\n\nDisponível em EAD, o curso atende quem busca flexibilidade para estudar e trabalhar. Projetos práticos e estudos de caso aproximam o aluno de situações reais de gestão.\n\nO egresso desenvolve capacidade de liderança, tomada de decisão e visão sistêmica dos negócios, competências essenciais em um mercado dinâmico e competitivo.',
    highlights: ['100% EAD', 'Formação generalista e versátil', 'Ênfase em empreendedorismo', 'Mercado em constante expansão'],
    graduateProfile:
      'O administrador formado pela FEMAF é um profissional generalista, crítico e empreendedor. Domina ferramentas de planejamento estratégico, gestão de equipes e análise de cenários para apoiar decisões organizacionais.\n\nEstá preparado para atuar em empresas privadas, órgãos públicos, startups ou empreendimentos próprios com ética e responsabilidade social.',
    jobMarket:
      'A administração é uma das formações mais versáteis do mercado. Administradores atuam em finanças, recursos humanos, marketing, operações e consultoria em praticamente todos os setores da economia.\n\nProfissionais com perfil analítico, comunicativo e adaptável encontram amplas oportunidades de crescimento.',
    careerPaths: ['Gestor administrativo', 'Empreendedor', 'Consultor de negócios', 'Analista de planejamento', 'Gestor de projetos', 'Analista de RH'],
  },
];

const output = courses.map(buildCourse);
const path = join(process.cwd(), 'src', 'data', 'courses.json');
writeFileSync(path, JSON.stringify(output, null, 2), 'utf8');
console.log(`Generated ${output.length} courses`);
