/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';
import clsx from 'clsx';

import ContactFormModalStyles from '../ContactFormModal/index.module.css';
import styles from './index.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'white' | 'transparent';
type ButtonSize = 'default' | 'large';
type Page = 'contact';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  context?: Page;
  fullWidth?: boolean;
  buttonClassName?: string;
  spanClassName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant, size, startIcon, endIcon, context, fullWidth, buttonClassName, spanClassName, onClick, type = 'button', disabled }): JSX.Element => {
  const buttonWrapperClassNames = clsx(styles['button-wrapper'], fullWidth && 'col-full', buttonClassName);
  const spanClassNames = clsx(styles.button, (startIcon || endIcon) && styles['button--icon'], styles[`button--bg-${variant}`], context === 'contact' && (type === 'submit' ? ContactFormModalStyles['contact-submit'] : ContactFormModalStyles['contact-button']), size === 'large' && ContactFormModalStyles['large-button'], spanClassName);

  return (
    <button className={buttonWrapperClassNames} onClick={onClick} type={type} disabled={disabled}>
      <span className={spanClassNames}>
        {startIcon && startIcon}
        {children}
        {endIcon && endIcon}
      </span>
    </button>
  );
};
