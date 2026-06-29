import { ROUTES } from '../../../app/routes';
import { buildWhatsAppUrl, useContact } from '../../../hooks/useContact';
import { Button } from '../../ui/Button';
import styles from './CTASection.module.css';

export function CTASection() {
  const { whatsapp } = useContact();
  const whatsappUrl = buildWhatsAppUrl(whatsapp.phone, whatsapp.message);

  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      <div className={styles.inner}>
        <div className={styles.content}>
          <h2 id="cta-heading" className={styles.title}>
            Pronto para transformar seu futuro?
          </h2>
          <p className={styles.description}>
            Explore o catálogo completo, escolha seu curso e inicie o processo
            de ingresso. Nossa equipe está pronta para ajudar você.
          </p>
        </div>

        <div className={styles.actions}>
          <Button as="link" to={ROUTES.courses} variant="secondary">
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
