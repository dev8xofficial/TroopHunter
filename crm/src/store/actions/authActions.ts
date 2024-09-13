import { createAction } from '@reduxjs/toolkit';

import { type ISaveAuthSuccessPayload } from '../reducers/authReducer';
import { type IAuthRegisterSuccessPayload, type IAuthLoginSuccessPayload, type IAuthSignOutSuccessPayload, type IAuthLoginPayload, type IAuthSignOutPayload, type IAuthRegisterPayload, type IAuthSendVerificationTokenPayload, type IAuthSendVerificationTokenSuccessPayload, type IAuthForgotPasswordPayload, type IAuthResetPasswordPayload, type IAuthForgotPasswordSuccessPayload, type IAuthResetPasswordSuccessPayload, type IAuthResetPasswordVerificationPayload, type IAuthResetPasswordVerifiedSuccessPayload } from '../sagas/auth';

export const authLoginAction = createAction<IAuthLoginPayload>('auth/authLoginAction');
export const authLoginSuccessAction = createAction<IAuthLoginSuccessPayload>('auth/authLoginSuccessAction');
export const saveAuthSuccessAction = createAction<ISaveAuthSuccessPayload>('auth/saveAuthSuccessAction');
export const saveAuthFailureAction = createAction('auth/saveAuthFailureAction');

export const authForgotPasswordAction = createAction<IAuthForgotPasswordPayload>('auth/authForgotPasswordAction');
export const authForgotPasswordSuccessAction = createAction<IAuthForgotPasswordSuccessPayload>('auth/authForgotPasswordSuccessAction');

export const authResetPasswordAction = createAction<IAuthResetPasswordPayload>('auth/authResetPasswordAction');
export const authResetPasswordSuccessAction = createAction<IAuthResetPasswordSuccessPayload>('auth/authResetPasswordSuccessAction');
export const authResetPasswordVerfiedSuccessAction = createAction<IAuthResetPasswordVerifiedSuccessPayload>('auth/authResetPasswordVerfiedSuccessAction');

export const authResetPasswordVerificationAction = createAction<IAuthResetPasswordVerificationPayload>('auth/authResetPasswordVerificationAction');

export const authSignOutAction = createAction<IAuthSignOutPayload>('auth/authSignOutAction');
export const authSignOutSuccessAction = createAction<IAuthSignOutSuccessPayload>('auth/authSignOutSuccessAction');

export const authRegisterAction = createAction<IAuthRegisterPayload>('auth/authRegisterAction');
export const authRegisterSuccessAction = createAction<IAuthRegisterSuccessPayload>('auth/authRegisterSuccessAction');
export const refreshTokenSuccessAction = createAction<{ accessToken: string }>('auth/refreshTokenSuccessAction');

export const authSendVerificationTokenAction = createAction<IAuthSendVerificationTokenPayload>('auth/authSendVerificationTokenAction');
export const authSendVerificationTokenSuccessAction = createAction<IAuthSendVerificationTokenSuccessPayload>('auth/authSendVerificationTokenSuccessAction');

export const resetAuthAction = createAction('auth/resetAuthAction');
