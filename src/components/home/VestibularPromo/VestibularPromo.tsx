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
          <p className={styles.eyebrow}>Processo seletivo FEMAF</p>
          <h2 id="vestibular-heading" className={styles.title}>
            Vestibular 2026 — garanta sua vaga na graduação
          </h2>
          <p className={styles.description}>
            As inscrições estão abertas em{' '}
            <a {...enrollmentLinkProps} className={styles.siteLink}>
              vestibular2.femaf.com.br
            </a>
            . Escolha seu curso, faça a inscrição em poucos minutos e comece sua
            trajetória na FEMAF.
          </p>

          <ul className={styles.list}>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className={styles.ctaPanel}>
          <p className={styles.ctaLabel}>Inscrições abertas</p>
          <p className={styles.ctaTitle}>Faça sua inscrição agora</p>
          <p className={styles.ctaHint}>Acesso direto ao sistema de inscrição do vestibular</p>
          <EnrollmentButton highlight className={styles.ctaButton}>
            Acessar vestibular2.femaf.com.br
          </EnrollmentButton>
        </aside>
      </div>
    </section>
  );
}
