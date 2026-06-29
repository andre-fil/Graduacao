import type { ReactNode } from 'react';
import styles from './CourseSection.module.css';

interface CourseSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  justify?: boolean;
}

export function CourseSection({ id, title, children, justify = false }: CourseSectionProps) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      <div className={`${styles.content} ${justify ? styles.justified : ''}`}>{children}</div>
    </section>
  );
}
