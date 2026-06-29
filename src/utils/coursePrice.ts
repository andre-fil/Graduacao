import type { Course, CoursePrice } from '../types';

export function getCoursePriceEntries(
  course: Course,
): { modalityId: string; price: CoursePrice }[] {
  return course.modalityIds.map((modalityId) => ({
    modalityId,
    price: course.pricesByModality?.[modalityId] ?? course.price,
  }));
}

export function getCatalogDisplayPrice(course: Course): CoursePrice {
  const entries = getCoursePriceEntries(course);
  return entries.reduce(
    (lowest, entry) =>
      entry.price.punctualityDiscount < lowest.punctualityDiscount ? entry.price : lowest,
    entries[0]?.price ?? course.price,
  );
}

export function getCoursePriceForModality(
  course: Course,
  modalityId?: string,
): CoursePrice {
  if (modalityId && course.modalityIds.includes(modalityId)) {
    return course.pricesByModality?.[modalityId] ?? course.price;
  }

  return getCatalogDisplayPrice(course);
}

export function shouldShowFromPrice(course: Course, modalityId?: string): boolean {
  if (modalityId) return false;
  return Boolean(course.pricesByModality && course.modalityIds.length > 1);
}

export const EAD_NAME_SUFFIX = ' -ead';

export function getCourseDisplayName(course: Course, modalityId?: string): string {
  const isEadOnly = course.modalityIds.length === 1 && course.modalityIds[0] === 'ead';
  if (isEadOnly) return course.name;

  if (modalityId === 'ead' && course.modalityIds.includes('ead')) {
    return `${course.name}${EAD_NAME_SUFFIX}`;
  }

  return course.name;
}

export function formatDiscountPercent(percent: number): string {
  return Number.isInteger(percent) ? String(percent) : percent.toFixed(2).replace('.', ',');
}
