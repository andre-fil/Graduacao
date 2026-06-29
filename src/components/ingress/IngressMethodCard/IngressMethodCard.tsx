import type { IngressMethod } from '../../../types';
import { ArrowRightIcon } from '../../ui/icons';
import { Button } from '../../ui/Button';
import styles from './IngressMethodCard.module.css';

interface IngressMethodCardProps {
  method: IngressMethod;
  enrollmentUrl: string;
  index: number;
}

export function IngressMethodCard({ method, enrollmentUrl, index }: IngressMethodCardProps) {
  const hasDocuments = method.requiredDocuments.length > 0;

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.badge} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className={styles.title}>{method.name}</h2>
      </div>

      <p className={styles.description}>{method.description}</p>

      <div className={styles.documents}>
        <h3 className={styles.documentsTitle}>Documentação necessária</h3>
        {hasDocuments ? (
          <ul className={styles.documentsList}>
            {method.requiredDocuments.map((document) => (
              <li key={document}>{document}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.documentsPlaceholder}>
            Lista de documentos em atualização. Em breve você encontrará aqui os requisitos
            para esta forma de ingresso.
          </p>
        )}
      </div>

      <Button
        as="a"
        href={enrollmentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cta}
      >
        Iniciar ingresso
        <ArrowRightIcon className={styles.ctaIcon} />
      </Button>
    </article>
  );
}
