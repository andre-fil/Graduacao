import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type ButtonAsLink = BaseProps &
  LinkProps & { as: 'link' };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

function getClassName(variant: ButtonVariant, className?: string) {
  return [styles.button, styles[variant], className].filter(Boolean).join(' ');
}

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', className, as = 'button', ...rest } = props;

  if (as === 'link') {
    const { as: _, ...linkProps } = rest as ButtonAsLink;
    return (
      <Link className={getClassName(variant, className)} {...linkProps}>
        {children}
      </Link>
    );
  }

  if (as === 'a') {
    const { as: _, ...anchorProps } = rest as ButtonAsAnchor;
    return (
      <a className={getClassName(variant, className)} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { as: _, ...buttonProps } = rest as ButtonAsButton;
  return (
    <button type="button" className={getClassName(variant, className)} {...buttonProps}>
      {children}
    </button>
  );
}
