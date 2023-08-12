import { type ChangeEvent } from 'react';

export interface ITableSortingMenuOptionAttributes {
  title: string;
  description: string;
  current: boolean;
  value: string;
  name: string;
}

export interface ITableSortingMenuAttributes {
  options: ITableSortingMenuOptionAttributes[];
  value: ITableSortingMenuOptionAttributes | undefined;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
