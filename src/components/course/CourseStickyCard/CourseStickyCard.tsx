import { useMemo, useState } from 'react';
import type { Course } from '../../../types';
import { useContact } from '../../../hooks/useContact';
import { getModalityById } from '../../../services';
import {
  buildCourseWhatsAppUrl,
} from '../../../utils/buildCourseWhatsApp';
import {
  formatDiscountPercent,
  getCoursePriceEntries,
} from '../../../utils/coursePrice';
import { formatCurrency } from '../../../utils/formatCurrency';
import { Button } from '../../ui/Button';
import { EnrollmentButton } from '../../ui/EnrollmentButton';
import styles from './CourseStickyCard.module.css';

interface CourseStickyCardProps {
  course: Course;
}

export function CourseStickyCard({ course }: CourseStickyCardProps) {
  const { whatsapp } = useContact();
  const priceEntries = useMemo(() => getCoursePriceEntries(course), [course]);
  const [selectedModalityId, setSelectedModalityId] = useState(priceEntries[0]?.modalityId ?? '');
  const [withPunctuality, setWithPunctuality] = useState(true);

  const selectedEntry =
    priceEntries.find((entry) => entry.modalityId === selectedModalityId) ?? priceEntries[0];
  const { original, punctualityDiscount, punctualityPercent } = selectedEntry.price;
  const hasMultipleModalities = priceEntries.length > 1;
  const hasPunctualityDiscount = punctualityDiscount < original;
  const displayPrice = withPunctuality && hasPunctualityDiscount ? punctualityDiscount : original;
  const savings = original - punctualityDiscount;

  const whatsappUrl = buildCourseWhatsAppUrl(whatsapp.phone, course.name);

  return (
    <aside className={styles.card} aria-label="Informações de investimento e contato">
      <p className={styles.label}>
        Investimento — mensalidade {priceEntries.length === 1 && priceEntries[0]?.modalityId === 'ead' ? 'EAD ' : ''}2026
      </p>

      {hasMultipleModalities && (
        <div className={styles.toggle} role="group" aria-label="Modalidade para simulação">
          {priceEntries.map((entry) => {
            const modalityName = getModalityById(entry.modalityId)?.name ?? entry.modalityId;
            return (
              <button
                key={entry.modalityId}
                type="button"
                className={`${styles.toggleBtn} ${selectedModalityId === entry.modalityId ? styles.toggleBtnActive : ''}`}
                aria-pressed={selectedModalityId === entry.modalityId}
                onClick={() => setSelectedModalityId(entry.modalityId)}
              >
                {modalityName}
              </button>
            );
          })}
        </div>
      )}

      {hasPunctualityDiscount && (
        <div className={styles.toggle} role="group" aria-label="Simulação de mensalidade">
          <button
            type="button"
            className={`${styles.toggleBtn} ${!withPunctuality ? styles.toggleBtnActive : ''}`}
            aria-pressed={!withPunctuality}
            onClick={() => setWithPunctuality(false)}
          >
            Valor integral
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${withPunctuality ? styles.toggleBtnActive : ''}`}
            aria-pressed={withPunctuality}
            onClick={() => setWithPunctuality(true)}
          >
            Valor com desconto (pontualidade)
          </button>
        </div>
      )}

      <div className={styles.priceBlock}>
        <p className={styles.priceLabel}>
          {withPunctuality && hasPunctualityDiscount
            ? 'Mensalidade com pagamento em dias'
            : 'Mensalidade integral'}
        </p>
        <p className={styles.price} aria-live="polite">
          {formatCurrency(displayPrice)}
          <span className={styles.priceSuffix}>/mês</span>
        </p>
        {withPunctuality && hasPunctualityDiscount && (
          <p className={styles.reference}>
            Valor integral: <s>{formatCurrency(original)}/mês</s>
          </p>
        )}
        {!withPunctuality && hasPunctualityDiscount && (
          <p className={styles.reference}>
            Com pontualidade ({formatDiscountPercent(punctualityPercent)}%):{' '}
            <strong>{formatCurrency(punctualityDiscount)}/mês</strong>
          </p>
        )}
      </div>

      {withPunctuality && hasPunctualityDiscount && (
        <p className={styles.discount}>
          <span className={styles.discountBadge}>
            {formatDiscountPercent(punctualityPercent)}% OFF
          </span>
          Economia de {formatCurrency(savings)}/mês no pagamento em dias
        </p>
      )}

      <div className={styles.actions}>
        <EnrollmentButton className={styles.action}>
          Fazer inscrição
        </EnrollmentButton>
        <Button as="a" href={whatsappUrl} variant="outline" className={styles.whatsapp}>
          Tirar dúvidas no WhatsApp
        </Button>
      </div>
    </aside>
  );
}
