import { IIconButtonProps } from './IconButton.interfaces';

const variantClasses = {
  text: 'icon-btn-text',
  contained: 'icon-btn-contained',
  outlined: 'icon-btn-outlined',
};

const colorClasses = {
  primary: 'icon-btn-primary',
  indigo: 'icon-btn-indigo',
  red: 'icon-btn-red',
};

const ringOffsetClasses = {
  white: 'icon-btn-ring-offset-white',
  gray: 'icon-btn-ring-offset-gray',
};

const IconButton: React.FC<IIconButtonProps> = ({ children, variant = 'contained', color, ringOffset, onClick, type = 'button', className, loading, disabled }: IIconButtonProps): JSX.Element => {
  return (
    <button type={type} disabled={disabled || loading} onClick={onClick} className={`icon-btn-rounded icon-btn group ${variantClasses[variant as keyof typeof variantClasses]} ${colorClasses[color as keyof typeof colorClasses]} ${ringOffsetClasses[ringOffset as keyof typeof ringOffsetClasses]} ${className} icon-btn`}>
      {loading ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform" id="button-loader">
          <svg className={`h-5 w-5 animate-spin text-${colorClasses[color as keyof typeof colorClasses]}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : null}
      <div className={`${loading && 'opacity-0'} inline-flex`} id="button-text">
        {children}
      </div>
    </button>
  );
};
export default IconButton;
