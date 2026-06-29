import { Navigate, useParams } from 'react-router-dom';
import { NotFoundPage } from '../NotFound/NotFoundPage';
import { ROUTES } from '../../app/routes';
import { CourseBanners } from '../../components/course/CourseBanners';
import { CourseCurriculum } from '../../components/course/CourseCurriculum';
import { CourseHero } from '../../components/course/CourseHero';
import { CourseInfoGrid } from '../../components/course/CourseInfoGrid';
import { CourseSection } from '../../components/course/CourseSection';
import { CourseStickyCard } from '../../components/course/CourseStickyCard';
import { Container } from '../../components/layout/Container';
import { Accordion } from '../../components/ui/Accordion';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { useCourse } from '../../hooks/useCourses';
import styles from './CourseDetailPage.module.css';

export function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { course } = useCourse(slug);

  if (!slug) {
    return <Navigate to={ROUTES.courses} replace />;
  }

  if (!course) {
    return <NotFoundPage />;
  }

  const faqItems = course.faq.map((item, index) => ({
    id: `faq-${course.slug}-${index}`,
    question: item.question,
    answer: item.answer,
  }));

  return (
    <div className={styles.page}>
      <Container as="article">
        <Breadcrumb
          items={[
            { label: 'Início', to: ROUTES.home },
            { label: 'Cursos', to: ROUTES.courses },
            { label: course.name },
          ]}
        />

        <CourseHero course={course} />

        <div className={styles.layout}>
          <div className={styles.main}>
            <CourseSection id="about-course" title="Sobre o curso" justify>
              {course.description.split(/\n\n+/).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </CourseSection>

            <CourseSection id="course-info" title="Informações do curso">
              <CourseInfoGrid course={course} />
            </CourseSection>

            <CourseBanners banners={course.banners} />

            <CourseSection id="graduate-profile" title="Perfil do egresso">
              <p>{course.graduateProfile}</p>
            </CourseSection>

            <CourseSection id="job-market" title="Mercado de trabalho">
              <p>{course.jobMarket}</p>
              <ul>
                {course.careerPaths.map((path) => (
                  <li key={path}>{path}</li>
                ))}
              </ul>
            </CourseSection>

            <CourseSection id="curriculum" title="Matriz curricular">
              <CourseCurriculum curriculum={course.curriculum} />
            </CourseSection>

            <CourseSection id="faq" title="Perguntas frequentes">
              <Accordion items={faqItems} />
            </CourseSection>
          </div>

          <div className={styles.sidebar}>
            <CourseStickyCard course={course} />
          </div>
        </div>
      </Container>
    </div>
  );
}
