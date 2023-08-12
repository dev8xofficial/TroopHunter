import { createAction } from '@reduxjs/toolkit';

import { type IAuthLoginSuccessPayload } from '../reducers/authReducer';
import { type IAuthLoginPayload, type IAuthRegisterPayload } from '../sagas/authSaga';

export const authLoginAction = createAction<IAuthLoginPayload>('auth/authLoginAction');
export const authLoginSuccessAction = createAction<IAuthLoginSuccessPayload>('auth/authLoginSuccessAction');
export const authLoginFailureAction = createAction('auth/authLoginFailureAction');

export const authRegisterAction = createAction<IAuthRegisterPayload>('auth/authRegisterAction');
