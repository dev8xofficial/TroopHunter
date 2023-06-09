import { ICheckboxProps } from './Checkbox.interfaces';

const Checkbox: React.FC<ICheckboxProps> = ({ id, name, defaultChecked, checked, onChange }: ICheckboxProps): JSX.Element => {
  return <input id={id} name={name} type="checkbox" defaultChecked={defaultChecked} checked={checked} onChange={onChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />;
};

export default Checkbox;
