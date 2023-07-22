import { HTMLInputTypeAttribute } from 'react';

export interface ITextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  noring?: boolean;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  type?: HTMLInputTypeAttribute | undefined;
  value?: any;
  max?: any;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  style?: React.CSSProperties;
  name?: string;
  noShadow?: boolean;
  helperText?: string;
}
