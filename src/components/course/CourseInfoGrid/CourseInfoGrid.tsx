import type { Course } from '../../../types';
import { getAreaById, getModalityById } from '../../../services';
import styles from './CourseInfoGrid.module.css';

interface CourseInfoGridProps {
  course: Course;
}

export function CourseInfoGrid({ course }: CourseInfoGridProps) {
  const area = getAreaById(course.areaId);
  const modalities = course.modalityIds
    .map((id) => getModalityById(id)?.name)
    .filter(Boolean)
    .join(', ');

  const items = [
    { label: 'Área do conhecimento', value: area?.name ?? '—' },
    { label: 'Modalidade', value: modalities || '—' },
    { label: 'Duração', value: course.duration },
    { label: 'Turnos', value: course.shift.map(formatShift).join(', ') },
    {
      label: 'Horários das aulas',
      value: course.schedules.map((s) => `${formatShift(s.shift)}: ${s.time}`).join(' · '),
    },
    { label: 'Reconhecimento MEC', value: course.mecRecognition },
    ...(course.emecProcess ? [{ label: 'Portaria MEC', value: course.emecProcess }] : []),
  ];

  return (
    <dl className={styles.grid}>
      {items.map((item) => (
        <div key={item.label} className={styles.item}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function formatShift(shift: string): string {
  const labels: Record<string, string> = {
    matutino: 'Diurno',
    noturno: 'Noturno',
    ead: 'EAD',
  };
  return labels[shift] ?? shift.charAt(0).toUpperCase() + shift.slice(1);
}
