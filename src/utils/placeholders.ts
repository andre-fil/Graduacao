export const LOREM_SHORT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.';

export const LOREM_PARAGRAPH =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac odio ante. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';

export const LOREM_MEC = 'Cursos reconhecidos pelo MEC';

export const SCHEDULE_MATUTINO = 'De acordo com planejamento do curso';
export const SCHEDULE_NOTURNO = '18:30 às 22:00';
export const SCHEDULE_EAD = 'Horários flexíveis na plataforma EAD';

/** @deprecated Use SCHEDULE_MATUTINO, SCHEDULE_NOTURNO ou SCHEDULE_EAD */
export const LOREM_SCHEDULE = SCHEDULE_NOTURNO;

export const LOREM_OTHER_DISCOUNT = 'Lorem ipsum — condição de desconto a confirmar';

export const DEFAULT_BANNER_PATH = 'course-cover';

export const DEFAULT_BANNER_ALT = 'Banner promocional FEMAF — Graduação';

export const LOREM_FAQ = [
  {
    question: 'Quais as formas de ingresso?',
    answer:
      'A FEMAF oferece Vestibular, ENEM, Transferência e Segunda Graduação. A inscrição é feita online em vestibular2.femaf.com.br. Em caso de dúvidas, fale com nossa equipe pelo WhatsApp.',
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

export const DEFAULT_INGRESS = {
  vestibular: true,
  enem: true,
  transferencia: true,
  segundaGraduacao: true,
  prouni: false,
  fies: false,
  reabertura: false,
  enrollmentUrl: 'https://vestibular2.femaf.com.br',
};
