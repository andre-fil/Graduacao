import { useAdvantages } from '../../../hooks/useHomeData';
import { SectionHeader } from '../../ui/SectionHeader';
import { AdvantageCard } from './AdvantageCard';
import styles from './AdvantagesSection.module.css';

export function AdvantagesSection() {
  const { advantages } = useAdvantages();

  return (
    <section className={styles.section} aria-labelledby="advantages-heading">
      <div className={styles.inner}>
        <SectionHeader
          titleId="advantages-heading"
          title="Por que estudar na FEMAF?"
          description="Uma instituição comprometida com a qualidade do ensino e a formação de profissionais preparados para o mercado."
          align="center"
        />

        <div className={styles.grid}>
          {advantages.map((advantage) => (
            <AdvantageCard key={advantage.id} advantage={advantage} />
          ))}
        </div>
      </div>
    </section>
  );
}
