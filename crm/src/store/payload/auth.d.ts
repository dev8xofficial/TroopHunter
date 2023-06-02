export interface ILoginPayload {
  email: string;
  password: string;
  navigate: NavigateFunction;
}

export interface ILoginSuccessPayload {
  token: string;
  user: any;
}

export interface IRegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  navigate: NavigateFunction;
}
