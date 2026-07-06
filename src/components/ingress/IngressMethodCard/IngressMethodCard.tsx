import type { IngressMethod } from '../../../types';
import { Button } from '../../ui/Button';
import styles from './IngressMethodCard.module.css';

interface IngressMethodCardProps {
  method: IngressMethod;
  enrollmentUrl: string;
}

export function IngressMethodCard({ method, enrollmentUrl }: IngressMethodCardProps) {
  const hasDocuments = method.requiredDocuments.length > 0;

  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{method.name}</h2>
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
            Lista de documentos em atualização.
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
        Fazer inscrição
      </Button>
    </article>
  );
}
