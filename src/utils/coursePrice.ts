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

/** True quando há mais de uma modalidade com mensalidade diferente. */
export function hasDivergentModalityPrices(course: Course): boolean {
  const entries = getCoursePriceEntries(course);
  if (entries.length < 2) return false;
  const keys = new Set(
    entries.map(
      (e) =>
        `${e.price.original}|${e.price.punctualityDiscount}|${e.price.punctualityPercent}`,
    ),
  );
  return keys.size > 1;
}

/**
 * Ofertas do catálogo: curso com preços distintos por modalidade vira um card por modalidade
 * (evita badge Presencial+EAD com um único preço ambíguo).
 */
export function getCatalogCourseOffers(
  course: Course,
  modalityFilterId?: string | null,
): Array<{ course: Course; modalityId?: string }> {
  if (modalityFilterId) {
    return [{ course, modalityId: modalityFilterId }];
  }
  if (hasDivergentModalityPrices(course)) {
    return course.modalityIds.map((modalityId) => ({ course, modalityId }));
  }
  return [{ course }];
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
