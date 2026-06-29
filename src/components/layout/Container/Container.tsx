import type { ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  as?: 'div' | 'section' | 'article';
}

export function Container({ children, as: Tag = 'div' }: ContainerProps) {
  return <Tag className={styles.container}>{children}</Tag>;
}
