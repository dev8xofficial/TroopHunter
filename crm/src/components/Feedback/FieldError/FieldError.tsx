import { type IFieldErrorProps } from './FieldError.interfaces';

const FieldError: React.FC<IFieldErrorProps> = ({ children, className = '' }: IFieldErrorProps): JSX.Element => {
  return <span className={`text-red-500 inline-block${className.length > 0 ? ` ${className}` : ''}`}>{children}</span>;
};

export default FieldError;
