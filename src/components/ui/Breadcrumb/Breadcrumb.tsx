import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className={styles.breadcrumb} aria-label="Navegação da página">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {item.to && !isLast ? (
                <Link to={item.to} className={styles.link}>
                  <ChevronLeftIcon className={styles.linkIcon} />
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className={isLast ? styles.current : styles.static} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRightIcon className={styles.separator} aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
