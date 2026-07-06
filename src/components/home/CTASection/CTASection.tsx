import { ROUTES } from '../../../app/routes';
import { buildWhatsAppUrl, useContact } from '../../../hooks/useContact';
import { Button } from '../../ui/Button';
import { EnrollmentButton } from '../../ui/EnrollmentButton';
import styles from './CTASection.module.css';

export function CTASection() {
  const { whatsapp } = useContact();
  const whatsappUrl = buildWhatsAppUrl(whatsapp.phone, whatsapp.message);

  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      <div className={styles.inner}>
        <div className={styles.content}>
          <h2 id="cta-heading" className={styles.title}>
            Próximo passo
          </h2>
          <p className={styles.description}>
            Escolha o curso e conclua a inscrição em vestibular2.femaf.com.br.
          </p>
        </div>

        <div className={styles.actions}>
          <EnrollmentButton variant="secondary" className={styles.enrollBtn}>
            Fazer inscrição
          </EnrollmentButton>
          <Button as="link" to={ROUTES.courses} variant="outline" className={styles.catalogBtn}>
            Explorar cursos
          </Button>
          <Button as="a" href={whatsappUrl} variant="outline" className={styles.whatsappBtn}>
            Falar com atendimento
          </Button>
        </div>
      </div>
    </section>
  );
}
