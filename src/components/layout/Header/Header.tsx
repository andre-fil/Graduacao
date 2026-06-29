import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../app/routes';
import { logoAlt, logoSrc } from '../../../utils/logo';
import styles from './Header.module.css';

const navItems = [
  { to: ROUTES.home, label: 'Início' },
  { to: ROUTES.courses, label: 'Cursos' },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to={ROUTES.home} className={styles.logo} aria-label="FEMAF Graduação — Início">
          <img src={logoSrc} alt={logoAlt} className={styles.logoImage} />
        </NavLink>

        <nav className={styles.nav} aria-label="Navegação principal">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                  }
                  end={item.to === ROUTES.home}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink to={ROUTES.courses} className={styles.ingressLink}>
          Fazer ingresso
        </NavLink>
      </div>
    </header>
  );
}
