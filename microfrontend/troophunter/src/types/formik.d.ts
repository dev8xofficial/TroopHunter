export interface ISignInFormmValues {
  email: string;
  password: string;
}

export interface ISignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IResetPasswordFormmValues {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IForgotPasswordFormmValues {
  email: string;
}
