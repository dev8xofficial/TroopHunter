/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';

import styles from './index.module.css';

type TextareaProps = {
  id: string;
  name: string;
};

export const Textarea: React.FC<TextareaProps> = ({ id, name }): JSX.Element => {
  return (
    <>
      <textarea className={styles['textarea']} id={id} aria-invalid="false" aria-required="false" aria-describedby=":rm:-help :rm:-error" name={name}></textarea>
    </>
  );
};
