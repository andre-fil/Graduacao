import { useMemo } from 'react';
import {
  getIngressEnrollmentUrl,
  getIngressGeneralInfo,
  getIngressMethods,
  getMatriculaInfo,
  getVestibularInfo,
} from '../services';

export function useIngress() {
  const methods = useMemo(() => getIngressMethods(), []);
  const generalInfo = useMemo(() => getIngressGeneralInfo(), []);
  const enrollmentUrl = useMemo(() => getIngressEnrollmentUrl(), []);
  const vestibular = useMemo(() => getVestibularInfo(), []);
  const matricula = useMemo(() => getMatriculaInfo(), []);

  return { methods, generalInfo, enrollmentUrl, vestibular, matricula };
}
