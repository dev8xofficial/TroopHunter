import { IBusinessPhoneCreationResponseAttributes, ILeadCreationResponseAttributes } from './lead';

export interface IUserCreationRequestAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  Leads: ILeadCreationResponseAttributes[];
}

export interface IUserCreationResponseAttributes extends IUserCreationRequestAttributes {
  id: string;
}
