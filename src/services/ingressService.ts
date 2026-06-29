import type { IngressMethod } from '../types';
import { getIngressConfig } from './courseService';

export function getIngressMethods(): IngressMethod[] {
  return getIngressConfig().methods;
}

export function getIngressMethodById(id: string): IngressMethod | undefined {
  return getIngressConfig().methods.find((method) => method.id === id);
}

export function getIngressGeneralInfo(): string {
  return getIngressConfig().generalInfo;
}

export function getIngressEnrollmentUrl(): string {
  return getIngressConfig().enrollmentUrl;
}
