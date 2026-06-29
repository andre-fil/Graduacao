import { Link, Navigate, useParams } from 'react-router-dom';
import { NotFoundPage } from '../NotFound/NotFoundPage';
import { ROUTES } from '../../app/routes';
import { IngressMethodCard } from '../../components/ingress/IngressMethodCard';
import { Container } from '../../components/layout/Container';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';
import { ChevronLeftIcon } from '../../components/ui/icons';
import { useCourse } from '../../hooks/useCourses';
import { useIngress } from '../../hooks/useIngress';
import styles from './IngressPage.module.css';

export function IngressPage() {
  const { slug } = useParams<{ slug: string }>();
  const { course } = useCourse(slug);
  const { methods, generalInfo, enrollmentUrl } = useIngress();

  if (!slug) {
    return <Navigate to={ROUTES.courses} replace />;
  }

  if (!course) {
    return <NotFoundPage />;
  }

  return (
    <Container>
      <Breadcrumb
        items={[
          { label: 'Início', to: ROUTES.home },
          { label: 'Cursos', to: ROUTES.courses },
          { label: course.name, to: ROUTES.courseDetail(course.slug) },
          { label: 'Ingresso' },
        ]}
      />

      <header className={styles.hero}>
        <p className={styles.heroLabel}>Processo seletivo</p>
        <h1 className={styles.heroTitle}>Formas de ingresso — {course.name}</h1>
        <p className={styles.heroDescription}>{generalInfo}</p>
        <Button
          as="a"
          href={enrollmentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.heroCta}
        >
          Acessar inscrição online
        </Button>
      </header>

      <div className={styles.methods}>
        {methods.map((method, index) => (
          <IngressMethodCard
            key={method.id}
            method={method}
            enrollmentUrl={enrollmentUrl}
            index={index}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <Button as="link" to={ROUTES.courseDetail(course.slug)} variant="outline" className={styles.backBtn}>
          <ChevronLeftIcon />
          Voltar para o curso
        </Button>
        <p className={styles.footerNote}>
          Dúvidas sobre documentação ou prazos?{' '}
          <Link to={ROUTES.courseDetail(course.slug)}>Consulte a página do curso</Link> ou fale
          conosco pelo WhatsApp.
        </p>
      </div>
    </Container>
  );
}
