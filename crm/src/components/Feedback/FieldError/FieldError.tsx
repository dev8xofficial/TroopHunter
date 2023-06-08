import { IFieldErrorProps } from './FieldError.interfaces';

const FieldError = ({ children, className }: IFieldErrorProps): JSX.Element => {
  return <span className={`mb-1 text-xs text-red-500 inline-block${className ? ` ${className}` : ''}`}>{children}</span>;
};

export default FieldError;
