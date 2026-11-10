import { editalLinkProps, enrollmentLinkProps } from '../../../constants/enrollment';
import { getVestibularInfo } from '../../../services';
import { Button } from '../../ui/Button';
import { EnrollmentButton } from '../../ui/EnrollmentButton';
import styles from './VestibularPromo.module.css';

export function VestibularPromo() {
  const vestibular = getVestibularInfo();
  const highlights = [
    'Inscrição 100% online e gratuita',
    'Vestibular, ENEM, transferência e segunda graduação',
    vestibular
      ? `Inscrições: ${vestibular.enrollmentPeriod}`
      : 'Vagas para o 1º semestre de 2027',
    vestibular
      ? `Matrícula dos aprovados: ${vestibular.approvedEnrollmentPeriod}`
      : 'Consulte o edital para prazos de matrícula',
  ];

  return (
    <section className={styles.section} aria-labelledby="vestibular-heading">
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Processo seletivo FEMAF</p>
          <h2 id="vestibular-heading" className={styles.title}>
            {vestibular?.processName ?? 'Vestibular 2027.1'} — garanta sua vaga na graduação
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
          <Button as="a" {...editalLinkProps} variant="secondary" className={styles.editalButton}>
            Acessar edital
          </Button>
        </aside>
      </div>
    </section>
  );
}
