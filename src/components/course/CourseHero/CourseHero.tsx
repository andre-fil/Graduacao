import type { Course } from '../../../types';
import { getCourseCoverUrl } from '../../../utils/courseCovers';
import { EnrollmentButton } from '../../ui/EnrollmentButton';
import styles from './CourseHero.module.css';

interface CourseHeroProps {
  course: Course;
}

export function CourseHero({ course }: CourseHeroProps) {
  return (
    <section className={styles.hero} aria-label={`Apresentação do curso de ${course.name}`}>
      <div className={styles.imageWrapper}>
        <img
          src={getCourseCoverUrl(course.slug)}
          alt={`Imagem principal do curso de ${course.name}`}
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>
      <div className={styles.content}>
        <p className={styles.degree}>{course.degree}</p>
        <h1 className={styles.title}>{course.name}</h1>
        <p className={styles.summary}>{course.summary}</p>
        <EnrollmentButton className={styles.enrollCta}>
          Fazer inscrição
        </EnrollmentButton>
      </div>
    </section>
  );
}
