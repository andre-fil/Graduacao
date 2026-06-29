import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>FEMAF</p>
        <p className={styles.text}>
          Faculdade de Educação Memorial Adelaide Franco — Catálogo de Cursos de Graduação
        </p>
        <p className={styles.copyright}>
          &copy; {year} André Barreto. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
