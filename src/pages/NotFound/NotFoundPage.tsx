import { Link } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { Container } from '../../components/layout/Container';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <Container>
      <div className={styles.content}>
        <PageHeader
          title="Página não encontrada"
          description="O conteúdo que você procura não existe ou foi movido."
        >
          <Button as="link" to={ROUTES.home}>
            Ir para o início
          </Button>
          <Button as="link" to={ROUTES.courses} variant="outline">
            Ver cursos
          </Button>
        </PageHeader>

        <p>
          <Link to={ROUTES.courses}>Acessar o catálogo de cursos</Link>
        </p>
      </div>
    </Container>
  );
}
