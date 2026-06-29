import { useMemo } from 'react';
import {
  getIngressEnrollmentUrl,
  getIngressGeneralInfo,
  getIngressMethods,
} from '../services';

export function useIngress() {
  const methods = useMemo(() => getIngressMethods(), []);
  const generalInfo = useMemo(() => getIngressGeneralInfo(), []);
  const enrollmentUrl = useMemo(() => getIngressEnrollmentUrl(), []);

  return { methods, generalInfo, enrollmentUrl };
}
