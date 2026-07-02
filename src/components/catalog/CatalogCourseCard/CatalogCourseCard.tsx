import { ROUTES } from '../../../app/routes';
import type { Course } from '../../../types';
import { getModalityById } from '../../../services';
import { getCourseCoverUrl } from '../../../utils/courseCovers';
import {
  formatDiscountPercent,
  getCourseDisplayName,
  getCoursePriceForModality,
  shouldShowFromPrice,
} from '../../../utils/coursePrice';
import { formatCurrency } from '../../../utils/formatCurrency';
import { Button } from '../../ui/Button';
import styles from './CatalogCourseCard.module.css';

interface CatalogCourseCardProps {
  course: Course;
  modalityId?: string;
}

export function CatalogCourseCard({ course, modalityId }: CatalogCourseCardProps) {
  const modalities = course.modalityIds
    .map((id) => getModalityById(id)?.name)
    .filter(Boolean);

  const catalogPrice = getCoursePriceForModality(course, modalityId);
  const hasDiscount = catalogPrice.punctualityDiscount < catalogPrice.original;
  const displayPrice = hasDiscount ? catalogPrice.punctualityDiscount : catalogPrice.original;
  const fromPrice = shouldShowFromPrice(course, modalityId);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={getCourseCoverUrl(course.slug)}
          alt={`Imagem do curso de ${course.name}`}
          className={styles.image}
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.modalities}>
          {modalities.map((name) => (
            <span key={name} className={styles.modalityBadge}>
              {name}
            </span>
          ))}
        </div>

        <h2 className={styles.title}>{getCourseDisplayName(course, modalityId)}</h2>

        <div className={styles.priceBlock}>
          {fromPrice && <span className={styles.fromLabel}>a partir de</span>}
          {hasDiscount && (
            <span className={styles.originalPrice}>
              {formatCurrency(catalogPrice.original)}
              <span className={styles.priceLabel}>/mês</span>
            </span>
          )}
          <p className={styles.promotionalPrice}>
            {formatCurrency(displayPrice)}
            <span className={styles.priceLabel}>/mês</span>
          </p>
          {hasDiscount && (
            <span className={styles.punctualityHint}>
              com pontualidade ({formatDiscountPercent(catalogPrice.punctualityPercent)}%)
            </span>
          )}
        </div>

        <p className={styles.summary}>{course.summary}</p>

        <Button as="link" to={ROUTES.courseDetail(course.slug)} className={styles.cta}>
          Saiba mais
        </Button>
      </div>
    </article>
  );
}
