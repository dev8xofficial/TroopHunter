import { type IButtonProps } from './Button.interfaces';

const variantClasses = {
  text: 'btn-text',
  contained: 'btn-contained',
  outlined: 'btn-outlined'
};

const colorClasses = {
  primary: 'btn-primary',
  indigo: 'btn-indigo',
  red: 'btn-red',
  gray: 'btn-gray'
};

const Button: React.FC<IButtonProps> = ({ ref, rounded, type = 'button', className = '', children, loading, variant = 'contained', color, disabled, onClick, style }: IButtonProps): JSX.Element => {
  return (
    <button ref={ref} type={type} className={`btn${rounded ?? false ? ' btn-rounded' : ''} ${variantClasses[variant]} ${colorClasses[color as keyof typeof colorClasses]} ${className}`} disabled={(disabled ?? false) || loading} onClick={onClick} style={style}>
      {loading !== undefined ? (
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform ${loading ? `opacity-100` : `opacity-0`}`} id="button-loader">
          <svg className={`h-5 w-5 animate-spin text-${colorClasses[color as keyof typeof colorClasses]}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : null}
      <div className={`opacity-${loading !== undefined && loading ? '0' : '100'}`} id="button-text">
        {children}
      </div>
    </button>
  );
};

export default Button;
