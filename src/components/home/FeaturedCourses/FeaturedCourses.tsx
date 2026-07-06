import { Link } from 'react-router-dom';
import { ROUTES } from '../../../app/routes';
import { CourseCard } from '../../course/CourseCard';
import { CourseGrid } from '../../course/CourseGrid';
import { Button } from '../../ui/Button';
import { SectionHeader } from '../../ui/SectionHeader';
import { useFeaturedCourses } from '../../../hooks/useCourses';
import styles from './FeaturedCourses.module.css';

export function FeaturedCourses() {
  const { courses } = useFeaturedCourses();

  return (
    <section className={styles.section} aria-labelledby="featured-heading">
      <div className={styles.inner}>
        <SectionHeader
          titleId="featured-heading"
          title="Cursos em destaque"
          description="Algumas das graduações disponíveis neste vestibular."
        >
          <Button as="link" to={ROUTES.courses} variant="outline">
            Ver catálogo completo
          </Button>
        </SectionHeader>

        <CourseGrid>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} variant="featured" />
          ))}
        </CourseGrid>

        <p className={styles.mobileLink}>
          <Link to={ROUTES.courses}>Ver todos os cursos</Link>
        </p>
      </div>
    </section>
  );
}
