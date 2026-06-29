import { Link } from 'react-router-dom';
import { ROUTES } from '../../../app/routes';
import { Button } from '../../ui/Button';
import { CourseSearch } from '../CourseSearch';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.pattern} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.badge}>Graduação FEMAF</span>
          <h1 id="hero-heading" className={styles.title}>
            Sua graduação começa com a escolha certa
          </h1>
          <p className={styles.description}>
            Encontre o curso ideal, conheça as modalidades de ensino e dê o
            primeiro passo rumo à sua carreira profissional.
          </p>

          <CourseSearch size="large" className={styles.search} />

          <div className={styles.actions}>
            <Button as="link" to={ROUTES.courses} variant="secondary">
              Ver todos os cursos
            </Button>
          </div>
        </div>

        <aside className={styles.stats} aria-label="Números da instituição">
          <div className={styles.statCard}>
            <strong>10</strong>
            <span>Cursos de graduação</span>
          </div>
          <div className={styles.statCard}>
            <strong>2</strong>
            <span>Modalidades de ensino</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statText}>Cursos reconhecidos pelo MEC</span>
          </div>
        </aside>
      </div>

      <div className={styles.strip}>
        <p>
          Processo seletivo aberto —{' '}
          <Link to={ROUTES.courses}>Confira os cursos disponíveis</Link>
        </p>
      </div>
    </section>
  );
}
