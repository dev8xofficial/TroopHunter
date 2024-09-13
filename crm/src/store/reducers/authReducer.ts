import { type PayloadAction, createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { type IUserAttributes } from 'validator/interfaces';

import { LOGIN_URL } from '../../routes/Urls';
import { type IAuthSendVerificationTokenSuccessPayload, type IAuthRegisterSuccessPayload, type IAuthForgotPasswordSuccessPayload, type IAuthResetPasswordSuccessPayload, type IAuthResetPasswordVerifiedSuccessPayload } from '../../store/sagas/auth';
import { saveAuthSuccessAction, saveAuthFailureAction, refreshTokenSuccessAction, resetAuthAction, authRegisterSuccessAction, authSendVerificationTokenSuccessAction, authForgotPasswordSuccessAction, authResetPasswordSuccessAction, authResetPasswordVerfiedSuccessAction } from '../actions/authActions';

export interface IAuthState {
  accessToken: string;
  refreshToken: string;
  userId: string;
  loggedIn: boolean;
  isResetPasswordVerified: boolean;
}

export interface ISaveAuthSuccessPayload {
  accessToken: string;
  refreshToken: string;
  user: IUserAttributes;
  loggedIn: boolean;
  isResetPasswordVerified: boolean;
}

const initialState: IAuthState = {
  accessToken: '',
  refreshToken: '',
  userId: '',
  loggedIn: false,
  isResetPasswordVerified: false
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(refreshTokenSuccessAction, (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    })
    .addCase(saveAuthSuccessAction, (state, action: PayloadAction<ISaveAuthSuccessPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.user.id;
      state.loggedIn = true;
      state.isResetPasswordVerified = false;
    })
    .addCase(saveAuthFailureAction, (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.userId = '';
      state.loggedIn = false;
      state.isResetPasswordVerified = false;
    })
    .addCase(authRegisterSuccessAction, (_state, action: PayloadAction<IAuthRegisterSuccessPayload>) => {
      const { request, response } = action.payload;
      if (response.success && request.payload !== undefined) {
        request.payload.navigate(LOGIN_URL);

        toast.success(response.message);
      } else {
        toast.error(response.error);
      }
    })
    .addCase(authSendVerificationTokenSuccessAction, (_state, action: PayloadAction<IAuthSendVerificationTokenSuccessPayload>) => {
      const { response } = action.payload;
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.error);
      }
    })
    .addCase(authForgotPasswordSuccessAction, (_state, action: PayloadAction<IAuthForgotPasswordSuccessPayload>) => {
      const { response } = action.payload;
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.error);
      }
    })
    .addCase(authResetPasswordVerfiedSuccessAction, (state, action: PayloadAction<IAuthResetPasswordVerifiedSuccessPayload>) => {
      const { request } = action.payload;
      if (request.payload !== undefined) {
        state.isResetPasswordVerified = request.payload.isResetPasswordVerified;
      }
    })
    .addCase(authResetPasswordSuccessAction, (_state, action: PayloadAction<IAuthResetPasswordSuccessPayload>) => {
      const { request, response } = action.payload;
      if (response.success && request.payload !== undefined) {
        request.payload.navigate(LOGIN_URL);

        toast.success(response.message);
      } else {
        toast.error(response.error);
      }
    })
    .addCase(resetAuthAction, (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.userId = '';
      state.loggedIn = false;
      state.isResetPasswordVerified = false;
    });
});

export default authReducer;
