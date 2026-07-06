import { Link } from 'react-router-dom';
import { ROUTES } from '../../../app/routes';
import type { Modality } from '../../../types';
import { ArrowRightIcon, CampusIcon, LaptopIcon } from '../../ui/icons';
import styles from './ModalityCard.module.css';

const modalityIcons: Record<string, typeof CampusIcon> = {
  presencial: CampusIcon,
  ead: LaptopIcon,
};

interface ModalityCardProps {
  modality: Modality;
}

export function ModalityCard({ modality }: ModalityCardProps) {
  const Icon = modalityIcons[modality.id] ?? CampusIcon;

  return (
    <Link
      to={ROUTES.coursesWithQuery({ modality: modality.id })}
      className={styles.card}
    >
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{modality.name}</h3>
        <p className={styles.highlight}>{modality.highlight}</p>
        <p className={styles.description}>{modality.description}</p>
        <span className={styles.link}>
          Ver cursos <ArrowRightIcon />
        </span>
      </div>
    </Link>
  );
}
