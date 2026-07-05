import type { ReactNode } from 'react';
import { enrollmentLinkProps } from '../../../constants/enrollment';
import { Button } from '../Button';
import styles from './EnrollmentButton.module.css';

type EnrollmentButtonVariant = 'primary' | 'secondary' | 'outline';

interface EnrollmentButtonProps {
  children?: ReactNode;
  variant?: EnrollmentButtonVariant;
  className?: string;
  highlight?: boolean;
}

export function EnrollmentButton({
  children = 'Inscreva-se no vestibular',
  variant = 'primary',
  className,
  highlight = false,
}: EnrollmentButtonProps) {
  return (
    <Button
      as="a"
      variant={variant}
      className={[highlight && styles.highlight, className].filter(Boolean).join(' ')}
      {...enrollmentLinkProps}
    >
      {children}
    </Button>
  );
}
