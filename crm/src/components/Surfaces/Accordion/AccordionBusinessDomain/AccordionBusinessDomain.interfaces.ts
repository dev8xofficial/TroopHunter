import { ChangeEvent } from 'react';

export interface IAccordionBusinessDomainProps {
  label: string;
  name: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
