import type { Course, CourseFilters, PriceRange } from '../types';
import { getCoursePriceForModality } from '../utils/coursePrice';
import { normalizeText } from '../utils/normalizeText';
import { getAllCourses, getPriceRangeById } from './courseService';

function matchesQuery(course: Course, query: string): boolean {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return true;

  const searchable = normalizeText(
    [course.name, course.summary, course.degree, ...course.tags].join(' '),
  );
  return searchable.includes(normalizedQuery);
}

function matchesModality(course: Course, modalityId: string): boolean {
  if (!modalityId) return true;
  return course.modalityIds.includes(modalityId);
}

function matchesArea(course: Course, areaId: string): boolean {
  if (!areaId) return true;
  return course.areaId === areaId;
}

function matchesPriceRange(
  course: Course,
  priceRange: PriceRange | undefined,
  modalityId: string,
): boolean {
  if (!priceRange) return true;

  const price = getCoursePriceForModality(course, modalityId || undefined).punctualityDiscount;
  const withinMin = price >= priceRange.min;
  const withinMax = priceRange.max === null || price <= priceRange.max;

  return withinMin && withinMax;
}

export function filterCoursesList(filters: CourseFilters): Course[] {
  const priceRange = filters.priceRangeId
    ? getPriceRangeById(filters.priceRangeId)
    : undefined;

  return getAllCourses().filter(
    (course) =>
      matchesQuery(course, filters.query) &&
      matchesModality(course, filters.modalityId) &&
      matchesArea(course, filters.areaId) &&
      matchesPriceRange(course, priceRange, filters.modalityId),
  );
}

// Mantido para compatibilidade com links existentes da Home
export function filterCourses(query: string, modalityId?: string): Course[] {
  return filterCoursesList({
    query,
    modalityId: modalityId ?? '',
    areaId: '',
    priceRangeId: '',
  });
}

export function searchCourses(query: string): Course[] {
  return filterCoursesList({
    query,
    modalityId: '',
    areaId: '',
    priceRangeId: '',
  });
}
