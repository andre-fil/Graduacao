export interface CoursePrice {
  /** Mensalidade integral (reajuste 2026) */
  original: number;
  /** Valor com desconto de pagamento em dias (pontualidade) */
  punctualityDiscount: number;
  /** Percentual de desconto por pontualidade */
  punctualityPercent: number;
}

export interface CourseSchedule {
  shift: string;
  time: string;
}

export interface CourseBanner {
  id: string;
  image: string;
  alt: string;
  href?: string;
}

export interface CourseFaqItem {
  question: string;
  answer: string;
}

export interface CourseCurriculumSemester {
  semester: number;
  disciplines: string[];
}

export interface CourseIngress {
  vestibular: boolean;
  enem: boolean;
  transferencia: boolean;
  segundaGraduacao: boolean;
  prouni: boolean;
  fies: boolean;
  reabertura: boolean;
  enrollmentUrl: string;
  notes: Record<string, string>;
}

export interface Course {
  id: string;
  slug: string;
  name: string;
  degree: string;
  areaId: string;
  modalityIds: string[];
  featured: boolean;
  tags: string[];
  duration: string;
  workload: string;
  shift: string[];
  schedules: CourseSchedule[];
  mecRecognition: string;
  emecProcess: string;
  image: string;
  price: CoursePrice;
  /** Preços por modalidade quando o curso é ofertado em mais de uma (ex.: presencial e EAD) */
  pricesByModality?: Partial<Record<string, CoursePrice>>;
  summary: string;
  description: string;
  highlights: string[];
  graduateProfile: string;
  jobMarket: string;
  careerPaths: string[];
  ingress: CourseIngress;
  curriculum: CourseCurriculumSemester[];
  faq: CourseFaqItem[];
  banners: CourseBanner[];
}
