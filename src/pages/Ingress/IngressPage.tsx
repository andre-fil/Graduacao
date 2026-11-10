import { Link, Navigate, useParams } from 'react-router-dom';
import { NotFoundPage } from '../NotFound/NotFoundPage';
import { ROUTES } from '../../app/routes';
import { IngressMethodCard } from '../../components/ingress/IngressMethodCard';
import { Container } from '../../components/layout/Container';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { editalLinkProps } from '../../constants/enrollment';
import { EnrollmentButton } from '../../components/ui/EnrollmentButton';
import { Button } from '../../components/ui/Button';
import { ChevronLeftIcon } from '../../components/ui/icons';
import { useCourse } from '../../hooks/useCourses';
import { useIngress } from '../../hooks/useIngress';
import styles from './IngressPage.module.css';

export function IngressPage() {
  const { slug } = useParams<{ slug: string }>();
  const { course } = useCourse(slug);
  const { methods, generalInfo, enrollmentUrl, vestibular } = useIngress();

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
        <p className={styles.heroLabel}>
          {vestibular?.processName ?? 'Processo seletivo'}
        </p>
        <h1 className={styles.heroTitle}>Formas de ingresso — {course.name}</h1>
        <p className={styles.heroDescription}>{generalInfo}</p>
        {vestibular && (
          <ul className={styles.heroDates}>
            <li>
              <strong>Inscrições:</strong> {vestibular.enrollmentPeriod}
            </li>
            <li>
              <strong>Taxa:</strong> {vestibular.enrollmentFee}
            </li>
            <li>
              <strong>Matrícula dos aprovados:</strong> {vestibular.approvedEnrollmentPeriod}
            </li>
          </ul>
        )}
        <div className={styles.heroActions}>
          <EnrollmentButton highlight className={styles.heroCta}>
            Inscreva-se agora em vestibular2.femaf.com.br
          </EnrollmentButton>
          <Button as="a" {...editalLinkProps} variant="secondary" className={styles.editalCta}>
            Acessar edital
          </Button>
        </div>
      </header>

      {vestibular && (
        <section className={styles.editalPanel} aria-labelledby="edital-heading">
          <h2 id="edital-heading" className={styles.editalTitle}>
            Datas e regras do {vestibular.processName}
          </h2>
          <dl className={styles.editalGrid}>
            <div>
              <dt>Edital</dt>
              <dd>{vestibular.editalNumber}</dd>
            </div>
            <div>
              <dt>Ingresso</dt>
              <dd>{vestibular.ingressSemester}</dd>
            </div>
            <div>
              <dt>Período de inscrição</dt>
              <dd>{vestibular.enrollmentPeriod}</dd>
            </div>
            <div>
              <dt>Prova</dt>
              <dd>{vestibular.examFormat}</dd>
            </div>
            <div>
              <dt>Agendamento</dt>
              <dd>{vestibular.examModes}</dd>
            </div>
            <div>
              <dt>ENEM</dt>
              <dd>{vestibular.enemYears}</dd>
            </div>
            <div>
              <dt>Matrícula dos aprovados</dt>
              <dd>{vestibular.approvedEnrollmentPeriod}</dd>
            </div>
            <div>
              <dt>Vagas</dt>
              <dd>{vestibular.vacancies}</dd>
            </div>
          </dl>
        </section>
      )}

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
