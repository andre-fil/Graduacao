import { Link } from 'react-router-dom';
import { ROUTES } from '../../../app/routes';
import type { Course } from '../../../types';
import { getAreaById, getModalityById } from '../../../services';
import styles from './CourseCard.module.css';

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'featured';
}

export function CourseCard({ course, variant = 'default' }: CourseCardProps) {
  const area = getAreaById(course.areaId);
  const primaryModality = getModalityById(course.modalityIds[0]);

  return (
    <article className={[styles.card, variant === 'featured' && styles.featured].filter(Boolean).join(' ')}>
      {variant === 'featured' && (
        <span className={styles.badge}>Destaque</span>
      )}

      <header className={styles.header}>
        <p className={styles.area}>{area?.name}</p>
        <h2 className={styles.title}>
          <Link to={ROUTES.courseDetail(course.slug)}>{course.name}</Link>
        </h2>
        <p className={styles.degree}>{course.degree} · {primaryModality?.name}</p>
      </header>

      <p className={styles.summary}>{course.summary}</p>

      <dl className={styles.meta}>
        <div>
          <dt>Duração</dt>
          <dd>{course.duration}</dd>
        </div>
        <div>
          <dt>Turnos</dt>
          <dd>{course.shift.join(', ')}</dd>
        </div>
      </dl>

      <footer className={styles.footer}>
        <Link to={ROUTES.courseDetail(course.slug)} className={styles.detailLink}>
          Ver detalhes
        </Link>
        <Link to={ROUTES.ingress(course.slug)} className={styles.ingressLink}>
          Ingressar
        </Link>
      </footer>
    </article>
  );
}
