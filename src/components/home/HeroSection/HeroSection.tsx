import { ROUTES } from '../../../app/routes';
import { enrollmentLinkProps } from '../../../constants/enrollment';
import { useCourses } from '../../../hooks/useCourses';
import { Button } from '../../ui/Button';
import { EnrollmentButton } from '../../ui/EnrollmentButton';
import { CourseSearch } from '../CourseSearch';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const { courses } = useCourses();

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
            <Button as="link" to={ROUTES.courses} variant="secondary">
              Ver todos os cursos
            </Button>
          </div>
        </div>

        <a
          {...enrollmentLinkProps}
          className={styles.vestibularCard}
          aria-label="Acessar inscrição do vestibular em vestibular2.femaf.com.br"
        >
          <span className={styles.vestibularEyebrow}>Processo seletivo 2026</span>
          <strong className={styles.vestibularTitle}>Vestibular FEMAF</strong>
          <p className={styles.vestibularText}>
            Inscrição online, gratuita e rápida para o 1º semestre de 2026.
          </p>
          <span className={styles.vestibularLink}>vestibular2.femaf.com.br →</span>
          <ul className={styles.vestibularMeta}>
            <li>
              <strong>{courses.length}</strong> cursos
            </li>
            <li>
              <strong>2</strong> modalidades
            </li>
            <li>MEC</li>
          </ul>
        </a>
      </div>

      <div className={styles.strip}>
        <div className={styles.stripInner}>
          <p className={styles.stripText}>
            <strong>Inscrições abertas</strong> — garanta sua vaga no vestibular 2026
          </p>
          <EnrollmentButton highlight variant="secondary" className={styles.stripCta}>
            Fazer inscrição agora
          </EnrollmentButton>
        </div>
      </div>
    </section>
  );
}
