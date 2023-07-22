import { createAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

export interface ILoginPayload {
  email: string;
  password: string;
  navigate: NavigateFunction;
}

export interface ILoginSuccessPayload {
  token: string | null;
  userId: string | null;
}

export interface IRegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  navigate: NavigateFunction;
}

export const login = createAction<ILoginPayload>('auth/signin');
export const loginSuccess = createAction<ILoginSuccessPayload>('auth/loginSuccess');
export const loginFailure = createAction('auth/loginFailure');

export const register = createAction<IRegisterPayload>('auth/signup');
export const registerSuccess = createAction('auth/registerSuccess');
export const registerFailure = createAction('auth/registerFailure');
