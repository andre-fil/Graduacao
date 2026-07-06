import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { CatalogPage } from '../pages/Catalog/CatalogPage';
import { CourseDetailPage } from '../pages/CourseDetail/CourseDetailPage';
import { HomePage } from '../pages/Home/HomePage';
import { IngressPage } from '../pages/Ingress/IngressPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';

function getRouterBasename(): string | undefined {
  const base = import.meta.env.BASE_URL;
  if (!base || base === '/') return undefined;
  return base.replace(/\/$/, '');
}

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'cursos', element: <CatalogPage /> },
        { path: 'cursos/:slug', element: <CourseDetailPage /> },
        { path: 'ingresso/:slug', element: <IngressPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: getRouterBasename() },
);
