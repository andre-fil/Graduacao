import { buildWhatsAppUrl, useContact } from '../../../hooks/useContact';
import { WhatsAppIcon } from '../../ui/icons';
import styles from './WhatsAppButton.module.css';

export function WhatsAppButton() {
  const { whatsapp } = useContact();
  const url = buildWhatsAppUrl(whatsapp.phone, whatsapp.message);

  return (
    <a
      href={url}
      className={styles.button}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a FEMAF pelo WhatsApp — abre em nova aba"
      title="Falar no WhatsApp"
    >
      <WhatsAppIcon className={styles.icon} />
      <span className={styles.label}>WhatsApp</span>
    </a>
  );
}
