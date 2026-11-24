import { AdvantagesSection } from '../../components/home/AdvantagesSection';
import { CTASection } from '../../components/home/CTASection';
import { FeaturedCourses } from '../../components/home/FeaturedCourses';
import { HeroSection } from '../../components/home/HeroSection';
import { ModalityCards } from '../../components/home/ModalityCards';
import { VestibularPromo } from '../../components/home/VestibularPromo';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <VestibularPromo />
      <ModalityCards />
      <FeaturedCourses />
      <AdvantagesSection />
      <CTASection />
    </div>
  );
}
