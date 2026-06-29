interface CatalogQueryParams {
  q?: string;
  modality?: string;
  area?: string;
  price?: string;
}

function buildCatalogPath(params?: CatalogQueryParams): string {
  if (!params) return '/cursos';

  const search = new URLSearchParams();
  if (params.q?.trim()) search.set('q', params.q.trim());
  if (params.modality) search.set('modality', params.modality);
  if (params.area) search.set('area', params.area);
  if (params.price) search.set('price', params.price);

  const query = search.toString();
  return query ? `/cursos?${query}` : '/cursos';
}

export const ROUTES = {
  home: '/',
  courses: '/cursos',
  coursesWithQuery: buildCatalogPath,
  courseDetail: (slug: string) => `/cursos/${slug}`,
  ingress: (slug: string) => `/ingresso/${slug}`,
} as const;

export type { CatalogQueryParams };
