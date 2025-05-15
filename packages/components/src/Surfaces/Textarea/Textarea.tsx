import React from 'react';
import styles from './index.module.css';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  name?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ id, name, ...rest }, ref): JSX.Element => {
  return <textarea className={styles['textarea']} id={id} name={name} ref={ref} aria-invalid="false" aria-required="false" aria-describedby=":rm:-help :rm:-error" {...rest} />;
});

Textarea.displayName = 'Textarea';
