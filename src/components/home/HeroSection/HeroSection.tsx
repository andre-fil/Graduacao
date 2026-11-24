import { ROUTES } from '../../../app/routes';
import { editalLinkProps } from '../../../constants/enrollment';
import { getVestibularInfo } from '../../../services';
import { getAssetUrl } from '../../../utils/getAssetUrl';
import { Button } from '../../ui/Button';
import { EnrollmentButton } from '../../ui/EnrollmentButton';
import { CourseSearch } from '../CourseSearch';
import styles from './HeroSection.module.css';

const HERO_BANNER = 'images/banners/hero-vestibular-2027.jpg';

export function HeroSection() {
  const vestibular = getVestibularInfo();

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <h1 id="hero-heading" className={styles.srOnly}>
        Vestibular FEMAF 2027.1 — invista na sua graduação
      </h1>

      <div className={styles.bannerFrame}>
        <img
          src={getAssetUrl(HERO_BANNER)}
          alt="Vestibular FEMAF 2027.1 — Invista na sua graduação. Impulsione sua carreira."
          className={styles.bannerImage}
          width={1024}
          height={426}
          decoding="async"
          fetchPriority="high"
        />
      </div>

      <div className={styles.panel}>
        <div className={styles.panelInner}>
          <p className={styles.panelText}>
            {vestibular
              ? `${vestibular.processName}: inscrição gratuita. ${vestibular.enrollmentPeriod}.`
              : 'Vestibular 2027.1: inscrição gratuita e online.'}
          </p>

          <div className={styles.actions}>
            <EnrollmentButton highlight className={styles.enrollCta}>
              Inscreva-se no vestibular
            </EnrollmentButton>
            <Button as="a" {...editalLinkProps} variant="secondary" className={styles.editalCta}>
              Acessar edital
            </Button>
            <Button as="link" to={ROUTES.courses} variant="secondary" className={styles.coursesCta}>
              Ver todos os cursos
            </Button>
          </div>

          <CourseSearch size="large" className={styles.search} />
        </div>
      </div>
    </section>
  );
}
