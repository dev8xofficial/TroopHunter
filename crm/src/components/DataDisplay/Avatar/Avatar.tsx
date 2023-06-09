import { IAvatarProps } from './Avatar.interfaces';

const sizeClasses = {
  xsmall: 'avatar-x-small',
  small: 'avatar-small',
  large: 'avatar-large',
  xlarge: 'avatar-x-large',
};

const Avatar = ({ image, firstName, size = 'avatar-small', border, className }: IAvatarProps): JSX.Element => {
  return image ? (
    <>
      <img className={`${sizeClasses[size as keyof typeof sizeClasses]} rounded-full ${className}`} src={image} alt={firstName} />
    </>
  ) : (
    <div className={`${sizeClasses[size as keyof typeof sizeClasses]} flex items-center justify-center rounded-full ${border} ${className}`}>
      <span className="capitalize"> {firstName ? firstName[0] : ''} </span>
    </div>
  );
};

export default Avatar;
