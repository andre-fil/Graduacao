import { useModalities } from '../../../hooks/useHomeData';
import { SectionHeader } from '../../ui/SectionHeader';
import { ModalityCard } from './ModalityCard';
import styles from './ModalityCards.module.css';

export function ModalityCards() {
  const { modalities } = useModalities();

  return (
    <section className={styles.section} aria-labelledby="modalities-heading">
      <div className={styles.inner}>
        <SectionHeader
          titleId="modalities-heading"
          title="Como você quer estudar?"
          description="Escolha a modalidade que combina com a sua rotina e conheça os cursos disponíveis."
          align="center"
        />

        <div className={styles.grid}>
          {modalities.map((modality) => (
            <ModalityCard key={modality.id} modality={modality} />
          ))}
        </div>
      </div>
    </section>
  );
}
