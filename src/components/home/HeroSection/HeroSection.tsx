import { ROUTES } from '../../../app/routes';
import { editalLinkProps, enrollmentLinkProps } from '../../../constants/enrollment';
import { useCourses } from '../../../hooks/useCourses';
import { getVestibularInfo } from '../../../services';
import { Button } from '../../ui/Button';
import { EnrollmentButton } from '../../ui/EnrollmentButton';
import { CourseSearch } from '../CourseSearch';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const { courses } = useCourses();
  const vestibular = getVestibularInfo();

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.pattern} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.badge}>Vestibular — inscrições abertas</span>
          <h1 id="hero-heading" className={styles.title}>
            Sua vaga na graduação FEMAF começa aqui
          </h1>
          <p className={styles.description}>
            Inscreva-se no vestibular, explore os cursos disponíveis e dê o
            primeiro passo rumo à sua carreira profissional.
          </p>

          <CourseSearch size="large" className={styles.search} />

          <div className={styles.actions}>
            <EnrollmentButton highlight className={styles.enrollCta}>
              Inscreva-se no vestibular
            </EnrollmentButton>
            <Button as="a" {...editalLinkProps} variant="secondary" className={styles.editalCta}>
              Acessar edital
            </Button>
            <Button as="link" to={ROUTES.courses} variant="secondary">
              Ver todos os cursos
            </Button>
          </div>
        </div>

        <div className={styles.vestibularCard}>
          <span className={styles.vestibularEyebrow}>
            {vestibular?.processName ?? 'Processo seletivo 2027.1'}
          </span>
          <strong className={styles.vestibularTitle}>Vestibular FEMAF</strong>
          <p className={styles.vestibularText}>
            {vestibular
              ? `Inscrição online e gratuita. Período: ${vestibular.enrollmentPeriod}.`
              : 'Inscrição online, gratuita e rápida para o 1º semestre de 2027.'}
          </p>
          <div className={styles.vestibularActions}>
            <a {...enrollmentLinkProps} className={styles.vestibularLink}>
              Inscreva-se →
            </a>
            <a {...editalLinkProps} className={styles.vestibularEdital}>
              Acessar edital
            </a>
          </div>
          <ul className={styles.vestibularMeta}>
            <li>
              <strong>{courses.length}</strong> cursos
            </li>
            <li>
              <strong>2</strong> modalidades
            </li>
            <li>MEC</li>
          </ul>
        </div>
      </div>

      <div className={styles.strip}>
        <div className={styles.stripInner}>
          <p className={styles.stripText}>
            <strong>Inscrições abertas</strong> — garanta sua vaga no vestibular 2027.1
          </p>
          <EnrollmentButton highlight variant="secondary" className={styles.stripCta}>
            Fazer inscrição agora
          </EnrollmentButton>
        </div>
      </div>
    </section>
  );
}
