export interface IUserRequestAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'guest' | 'user' | 'admin';
}

export interface IUserResponseAttributes extends IUserRequestAttributes {
  id: string;
}
