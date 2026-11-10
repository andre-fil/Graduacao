export interface IngressMethod {
  id: string;
  name: string;
  description: string;
  requiredDocuments: string[];
}

export interface VestibularInfo {
  editalNumber: string;
  processName: string;
  ingressSemester: string;
  editalUrl: string;
  enrollmentPeriod: string;
  enrollmentFee: string;
  enrollmentSite: string;
  examFormat: string;
  examModes: string;
  enemYears: string;
  cumulativeSelection: string;
  vacancies: string;
  approvedEnrollmentPeriod: string;
  specialNeedsEmail: string;
  phone: string;
  whatsapp: string;
  agentGuidance?: string[];
}

export interface MatriculaInfo {
  documents: string[];
  delivery: {
    ead: string;
    presencial: string;
  };
  deadlines: {
    presencial: string;
    ead: string;
  };
  academicSector: {
    name: string;
    days: string;
    hours: string;
    address: string;
  };
  agentGuidance?: string[];
}

export interface IngressConfig {
  generalInfo: string;
  enrollmentUrl: string;
  methods: IngressMethod[];
  vestibular?: VestibularInfo;
  matricula?: MatriculaInfo;
}
