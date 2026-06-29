export interface IngressMethod {
  id: string;
  name: string;
  description: string;
  requiredDocuments: string[];
}

export interface IngressConfig {
  generalInfo: string;
  enrollmentUrl: string;
  methods: IngressMethod[];
}
