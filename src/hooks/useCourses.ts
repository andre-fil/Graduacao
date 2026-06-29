import { useMemo } from 'react';
import { getAllCourses, getCourseBySlug, getFeaturedCourses } from '../services';

export function useCourses() {
  const courses = useMemo(() => getAllCourses(), []);
  return { courses };
}

export function useFeaturedCourses() {
  const courses = useMemo(() => getFeaturedCourses(), []);
  return { courses };
}

export function useCourse(slug: string | undefined) {
  const course = useMemo(
    () => (slug ? getCourseBySlug(slug) : undefined),
    [slug],
  );

  return { course };
}
