import type { ReactNode } from 'react';
import styles from './CourseGrid.module.css';

interface CourseGridProps {
  children: ReactNode;
}

export function CourseGrid({ children }: CourseGridProps) {
  return <div className={styles.grid}>{children}</div>;
}
