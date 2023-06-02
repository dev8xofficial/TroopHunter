import { createAction } from '@reduxjs/toolkit';
import { ILoginPayload, ILoginSuccessPayload, IRegisterPayload } from '../payload/auth';

export const login = createAction<ILoginPayload>('auth/login');
export const loginSuccess = createAction<ILoginSuccessPayload>('auth/loginSuccess');
export const loginFailure = createAction('auth/loginFailure');

export const register = createAction<IRegisterPayload>('auth/register');
export const registerSuccess = createAction('auth/registerSuccess');
export const registerFailure = createAction('auth/registerFailure');
