import React from 'react';

import styles from './index.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  id?: string;
  name?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, id, name, ...rest }, ref): JSX.Element => {
  return (
    <div className={styles['input-wrapper']}>
      <input className={styles['input']} type={type} id={id} name={name} ref={ref} aria-invalid="false" aria-required="false" aria-describedby=":rp:-help :rp:-error " {...rest} />
    </div>
  );
});

Input.displayName = 'Input';
