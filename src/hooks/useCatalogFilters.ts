import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { CourseFilters } from '../types';
import { ROUTES } from '../app/routes';
import { filterCoursesList } from '../services';

const FILTER_KEYS = ['q', 'modality', 'area', 'price'] as const;

function parseFilters(searchParams: URLSearchParams): CourseFilters {
  return {
    query: searchParams.get('q') ?? '',
    modalityId: searchParams.get('modality') ?? '',
    areaId: searchParams.get('area') ?? '',
    priceRangeId: searchParams.get('price') ?? '',
  };
}

export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  const courses = useMemo(() => filterCoursesList(filters), [filters]);

  const hasActiveFilters = FILTER_KEYS.some((key) => searchParams.has(key));

  const updateFilters = useCallback(
    (partial: Partial<CourseFilters>) => {
      const next = { ...filters, ...partial };
      const params = new URLSearchParams();

      if (next.query.trim()) params.set('q', next.query.trim());
      if (next.modalityId) params.set('modality', next.modalityId);
      if (next.areaId) params.set('area', next.areaId);
      if (next.priceRangeId) params.set('price', next.priceRangeId);

      setSearchParams(params);
    },
    [filters, setSearchParams],
  );

  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const catalogPath = useCallback(
    (partial?: Partial<CourseFilters>) =>
      ROUTES.coursesWithQuery({
        q: partial?.query ?? filters.query,
        modality: partial?.modalityId ?? filters.modalityId,
        area: partial?.areaId ?? filters.areaId,
        price: partial?.priceRangeId ?? filters.priceRangeId,
      }),
    [filters],
  );

  return {
    filters,
    courses,
    hasActiveFilters,
    updateFilters,
    clearFilters,
    catalogPath,
  };
}
