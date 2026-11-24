import { enrollmentLinkProps } from '../../../constants/enrollment';
import { getAssetUrl } from '../../../utils/getAssetUrl';
import styles from './HomeBanner.module.css';

const BANNER_SRC = 'images/banners/hero-vestibular-2027.jpg';

export function HomeBanner() {
  return (
    <section className={styles.section} aria-label="Banner do Vestibular FEMAF 2027.1">
      <div className={styles.inner}>
        <a
          {...enrollmentLinkProps}
          className={styles.banner}
          aria-label="Inscreva-se no Vestibular FEMAF 2027.1"
        >
          <img
            src={getAssetUrl(BANNER_SRC)}
            alt="Vestibular FEMAF 2027.1 — Invista na sua graduação. Impulsione sua carreira."
            className={styles.image}
            width={1024}
            height={426}
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>
    </section>
  );
}
