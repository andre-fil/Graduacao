import { enrollmentLinkProps } from '../../../constants/enrollment';
import { EnrollmentButton } from '../../ui/EnrollmentButton';
import styles from './VestibularPromo.module.css';

const highlights = [
  'Inscrição 100% online e gratuita',
  'Vestibular, ENEM, transferência e segunda graduação',
  'Vagas para o 1º semestre de 2026',
];

export function VestibularPromo() {
  return (
    <section className={styles.section} aria-labelledby="vestibular-heading">
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Processo seletivo</p>
          <h2 id="vestibular-heading" className={styles.title}>
            Inscrição no vestibular
          </h2>
          <p className={styles.description}>
            A inscrição é feita em{' '}
            <a {...enrollmentLinkProps} className={styles.siteLink}>
              vestibular2.femaf.com.br
            </a>
            . O mesmo endereço vale para todas as formas de ingresso.
          </p>

          <ul className={styles.list}>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className={styles.ctaPanel}>
          <p className={styles.ctaLabel}>Inscrições abertas</p>
          <p className={styles.ctaTitle}>Acesse o sistema de inscrição</p>
          <p className={styles.ctaHint}>Vestibular, ENEM, transferência e segunda graduação</p>
          <EnrollmentButton className={styles.ctaButton}>
            Ir para vestibular2.femaf.com.br
          </EnrollmentButton>
        </aside>
      </div>
    </section>
  );
}
