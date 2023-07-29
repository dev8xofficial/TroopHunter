import { IBusinessPhoneCreationResponseAttributes } from './lead';

export interface IUserCreationRequestAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  Leads?: IBusinessPhoneCreationResponseAttributes[];
}

export interface IUserCreationResponseAttributes extends IUserCreationRequestAttributes {
  id: string;
}
