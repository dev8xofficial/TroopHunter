import { createAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { IUser } from '../../types/user';

export interface ILoginPayload {
  email: string;
  password: string;
  navigate: NavigateFunction;
}

export interface ILoginSuccessPayload {
  token: string | null;
  user?: IUser;
}

export interface IRegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  navigate: NavigateFunction;
}

export const loginAction = createAction<ILoginPayload>('auth/signin');
export const loginSuccessAction = createAction<ILoginSuccessPayload>('auth/loginSuccess');
export const loginFailureAction = createAction('auth/loginFailure');

export const registerAction = createAction<IRegisterPayload>('auth/signup');
export const registerSuccessAction = createAction('auth/registerSuccess');
export const registerFailureAction = createAction('auth/registerFailure');
