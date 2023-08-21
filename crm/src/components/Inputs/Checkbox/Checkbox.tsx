import React from 'react';

import { type ICheckboxProps } from './Checkbox.interfaces';
import { classNames } from '../../../utils/helpers';

export enum checkboxColors {
  indigo = 'indigo',
  green = 'green'
}

const Checkbox: React.FC<ICheckboxProps> = ({ id, name, defaultChecked, checked, onChange, className, color = checkboxColors.indigo }: ICheckboxProps): JSX.Element => {
  const combinedClassName = classNames(className, `h-4 w-4 rounded border-gray-300 text-${color}-600 focus:outline-none focus:ring-2 focus:ring-${color}-600 focus:ring-offset-2 focus:ring-offset-gray-50`, checked != null && checked ? `bg-${color}-600` : '');

  return <input id={id} name={name} type="checkbox" defaultChecked={defaultChecked} checked={checked} onChange={onChange} className={combinedClassName} />;
};

export default Checkbox;
