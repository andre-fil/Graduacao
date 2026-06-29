import type { CourseCurriculumSemester } from '../../../types';
import styles from './CourseCurriculum.module.css';

interface CourseCurriculumProps {
  curriculum: CourseCurriculumSemester[];
}

export function CourseCurriculum({ curriculum }: CourseCurriculumProps) {
  return (
    <div className={styles.curriculum}>
      {curriculum.map((semester) => (
        <details key={semester.semester} className={styles.semester}>
          <summary className={styles.summary}>
            {semester.semester}º semestre
            <span className={styles.count}>
              {semester.disciplines.length} disciplinas
            </span>
          </summary>
          <ul className={styles.list}>
            {semester.disciplines.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}
