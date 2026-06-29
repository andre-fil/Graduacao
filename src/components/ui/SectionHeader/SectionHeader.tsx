import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  titleId?: string;
  description?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

export function SectionHeader({
  title,
  titleId,
  description,
  align = 'left',
  children,
}: SectionHeaderProps) {
  return (
    <header className={[styles.header, styles[align]].join(' ')}>
      <div className={styles.text}>
        <h2 id={titleId} className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {children && <div className={styles.actions}>{children}</div>}
    </header>
  );
}
