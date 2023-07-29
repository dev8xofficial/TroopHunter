import { createAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

export interface IAuthLoginPayload {
  email: string;
  password: string;
  navigate: NavigateFunction;
}

export interface IAuthRegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  navigate: NavigateFunction;
}

export const loginAction = createAction<IAuthLoginPayload>('auth/signin');
export const loginSuccessAction = createAction('auth/loginSuccess');
export const loginFailureAction = createAction('auth/loginFailure');

export const registerAction = createAction<IAuthRegisterPayload>('auth/signup');
