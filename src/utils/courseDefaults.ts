import type { CourseBanner, CourseIngress } from '../types';
import {
  DEFAULT_BANNER_ALT,
  DEFAULT_BANNER_PATH,
  DEFAULT_INGRESS,
} from './placeholders';

export const defaultCourseBanner: CourseBanner = {
  id: 'banner-padrao',
  image: DEFAULT_BANNER_PATH,
  alt: DEFAULT_BANNER_ALT,
};

export function createDefaultBanners(): CourseBanner[] {
  return [defaultCourseBanner];
}

export function createDefaultIngress(): CourseIngress {
  return { ...DEFAULT_INGRESS, notes: { ...DEFAULT_INGRESS.notes } };
}
