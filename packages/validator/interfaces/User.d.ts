import { ILeadResponseAttributes } from './Lead';

export interface IUserRequestAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'guest' | 'user' | 'admin';
  Leads: ILeadResponseAttributes[];
}

export interface IUserResponseAttributes extends IUserRequestAttributes {
  id: string;
}
