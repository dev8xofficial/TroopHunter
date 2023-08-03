export interface UserAttributes {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'guest' | 'user' | 'admin';
}
