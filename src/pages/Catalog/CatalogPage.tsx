import { Link } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { CatalogCourseCard } from '../../components/catalog/CatalogCourseCard';
import { CatalogFilters } from '../../components/catalog/CatalogFilters';
import { CourseGrid } from '../../components/course/CourseGrid';
import { CourseSearch } from '../../components/home/CourseSearch';
import { Container } from '../../components/layout/Container';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { PageHeader } from '../../components/ui/PageHeader';
import { useCatalogFilters } from '../../hooks/useCatalogFilters';
import styles from './CatalogPage.module.css';

export function CatalogPage() {
  const {
    filters,
    courses,
    hasActiveFilters,
    updateFilters,
    clearFilters,
  } = useCatalogFilters();

  return (
    <Container>
      <Breadcrumb
        items={[
          { label: 'Início', to: ROUTES.home },
          { label: 'Cursos' },
        ]}
      />

      <PageHeader
        title="Catálogo de Cursos"
        description="Encontre a graduação ideal neste vestibular. Pesquise por nome e refine os resultados com os filtros abaixo."
      />

      <div className={styles.search}>
        <CourseSearch
          defaultQuery={filters.query}
          placeholder="Buscar curso por nome..."
          onSearch={(query) => updateFilters({ query })}
        />
      </div>

      <div className={styles.layout}>
        <CatalogFilters
          filters={filters}
          onFilterChange={updateFilters}
          onClear={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <section className={styles.results} aria-label="Resultados da busca">
          <div className={styles.resultsHeader}>
            <p className={styles.count}>
              {courses.length}{' '}
              {courses.length === 1 ? 'curso encontrado' : 'cursos encontrados'}
            </p>

            {filters.query && (
              <p className={styles.queryTag}>
                Busca: &ldquo;{filters.query}&rdquo;
              </p>
            )}
          </div>

          {courses.length > 0 ? (
            <CourseGrid>
              {courses.map((course) => (
                <CatalogCourseCard
                  key={course.id}
                  course={course}
                  modalityId={filters.modalityId || undefined}
                />
              ))}
            </CourseGrid>
          ) : (
            <div className={styles.empty}>
              <p>Nenhum curso encontrado com os filtros selecionados.</p>
              <button type="button" className={styles.clearLink} onClick={clearFilters}>
                Limpar filtros
              </button>
              <p>
                ou <Link to={ROUTES.home}>voltar para o início</Link>
              </p>
            </div>
          )}
        </section>
      </div>
    </Container>
  );
}
