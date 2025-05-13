/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';

import styles from './index.module.css';

type InputProps = {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const Input: React.FC<InputProps> = ({ type, id, name, placeholder, value, onChange }): JSX.Element => {
  return (
    <>
      <div className={styles['input-wrapper']}>
        <input className={styles['input']} placeholder={placeholder} id={id} aria-invalid="false" aria-required="false" aria-describedby=":rp:-help :rp:-error " type={type} name={name} />
      </div>
    </>
  );
};
