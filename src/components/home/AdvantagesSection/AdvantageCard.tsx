import type { Advantage } from '../../../types';
import {
  AwardIcon,
  BriefcaseIcon,
  BuildingIcon,
  CalendarIcon,
  SupportIcon,
  UsersIcon,
} from '../../ui/icons';
import styles from './AdvantageCard.module.css';

const advantageIcons: Record<string, typeof AwardIcon> = {
  mec: AwardIcon,
  infraestrutura: BuildingIcon,
  mercado: BriefcaseIcon,
  flexibilidade: CalendarIcon,
  'corpo-docente': UsersIcon,
  suporte: SupportIcon,
};

interface AdvantageCardProps {
  advantage: Advantage;
}

export function AdvantageCard({ advantage }: AdvantageCardProps) {
  const Icon = advantageIcons[advantage.id] ?? AwardIcon;

  return (
    <article className={styles.card}>
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </div>
      <h3 className={styles.title}>{advantage.title}</h3>
      <p className={styles.description}>{advantage.description}</p>
    </article>
  );
}
