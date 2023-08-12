import { type ICheckboxProps } from './Checkbox.interfaces';
import { classNames } from '../../../utils/helpers';

const Checkbox: React.FC<ICheckboxProps> = ({ id, name, defaultChecked, checked, onChange, className }: ICheckboxProps): JSX.Element => {
  const combinedClassName = classNames(className, 'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600');

  return <input id={id} name={name} type="checkbox" defaultChecked={defaultChecked} checked={checked} onChange={onChange} className={combinedClassName} />;
};

export default Checkbox;
