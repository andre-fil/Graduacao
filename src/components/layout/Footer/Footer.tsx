import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>
          &copy; André Barreto. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
