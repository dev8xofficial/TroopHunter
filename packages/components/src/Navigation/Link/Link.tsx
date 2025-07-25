/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Magnet } from '../../Animations/Magnet';

import ContactFormModalStyles from '../../Modals/ContactFormModal/index.module.css';
import styles from './index.module.css';

type LinkVariant = 'primary' | 'secondary' | 'white' | 'transparent';
type LinkSize = 'default' | 'large';
type Page = 'contact';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: LinkVariant;
  size?: LinkSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  context?: Page;
  fullWidth?: boolean;
  anchorClassName?: string;
  spanClassName?: string;
  href?: string;
}

export const Link: React.FC<LinkProps> = ({ children, variant, size, startIcon, endIcon, context, fullWidth, anchorClassName, spanClassName, href }): JSX.Element => {
  const buttonWrapperClassNames = clsx(styles['button-wrapper'], fullWidth && 'col-full', anchorClassName);
  const spanClassNames = clsx(styles.button, (startIcon || endIcon) && styles['button--icon'], styles[`button--bg-${variant}`], context === 'contact' && ContactFormModalStyles['contact-button'], size === 'large' && ContactFormModalStyles['large-button'], spanClassName);
  const isExternal = href?.startsWith('http');

  return (
    <a className={buttonWrapperClassNames} href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>
      <Magnet className={spanClassNames} disabled={fullWidth}>
        {startIcon && startIcon}
        {children}
        {endIcon && endIcon}
      </Magnet>
    </a>
  );
};
