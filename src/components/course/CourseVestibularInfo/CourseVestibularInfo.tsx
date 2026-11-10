import { editalLinkProps } from '../../../constants/enrollment';
import { getMatriculaInfo, getVestibularInfo } from '../../../services';
import { Button } from '../../ui/Button';
import { EnrollmentButton } from '../../ui/EnrollmentButton';
import styles from './CourseVestibularInfo.module.css';

export function CourseVestibularInfo() {
  const vestibular = getVestibularInfo();
  const matricula = getMatriculaInfo();

  if (!vestibular) return null;

  const items = [
    { label: 'Processo seletivo', value: vestibular.processName },
    { label: 'Edital', value: vestibular.editalNumber },
    { label: 'Ingresso', value: vestibular.ingressSemester },
    { label: 'Período de inscrição', value: vestibular.enrollmentPeriod },
    { label: 'Taxa de inscrição', value: vestibular.enrollmentFee },
    { label: 'Formato da prova', value: vestibular.examFormat },
    { label: 'Modalidade e agendamento', value: vestibular.examModes },
    { label: 'ENEM — anos aceitos', value: vestibular.enemYears },
    { label: 'Matrícula dos aprovados', value: vestibular.approvedEnrollmentPeriod },
    { label: 'Vagas', value: vestibular.vacancies },
    ...(matricula
      ? [
          {
            label: 'Documentos para matrícula',
            value: matricula.documents.join('; '),
          },
          {
            label: 'Setor Acadêmico',
            value: `${matricula.academicSector.name} — ${matricula.academicSector.days}, ${matricula.academicSector.hours}. ${matricula.academicSector.address}`,
          },
        ]
      : []),
    { label: 'WhatsApp', value: vestibular.whatsapp },
    { label: 'Telefone', value: vestibular.phone },
    { label: 'E-mail acadêmico', value: vestibular.specialNeedsEmail },
  ];

  return (
    <div className={styles.panel}>
      <p className={styles.intro}>
        Informações do {vestibular.processName} conforme o {vestibular.editalNumber}. A
        inscrição é feita em{' '}
        <a
          href={vestibular.enrollmentSite}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {vestibular.enrollmentSite.replace(/^https?:\/\//, '')}
        </a>
        .
      </p>

      <dl className={styles.grid}>
        {items.map((item) => (
          <div key={item.label} className={styles.item}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.actions}>
        <EnrollmentButton highlight>Inscreva-se no vestibular</EnrollmentButton>
        <Button as="a" {...editalLinkProps} variant="outline">
          Acessar edital
        </Button>
      </div>
    </div>
  );
}
