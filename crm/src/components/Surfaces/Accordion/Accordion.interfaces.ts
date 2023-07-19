import { ChangeEvent } from 'react';

export interface IAccordionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  name: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
