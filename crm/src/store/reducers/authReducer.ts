import { type PayloadAction, createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { type IUserAttributes } from 'validator/interfaces';

import { LOGIN_URL } from '../../routes/Urls';
import { type IAuthSendVerificationTokenSuccessPayload, type IAuthRegisterSuccessPayload } from '../../store/sagas/auth';
import { saveAuthSuccessAction, saveAuthFailureAction, refreshTokenSuccessAction, resetAuthAction, authRegisterSuccessAction, authSendVerificationTokenSuccessAction } from '../actions/authActions';

export interface IAuthState {
  accessToken: string;
  refreshToken: string;
  userId: string;
  loggedIn: boolean;
}

export interface ISaveAuthSuccessPayload {
  accessToken: string;
  refreshToken: string;
  user: IUserAttributes;
  loggedIn: boolean;
}

const initialState: IAuthState = {
  accessToken: '',
  refreshToken: '',
  userId: '',
  loggedIn: false
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
    })
    .addCase(saveAuthFailureAction, (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.userId = '';
      state.loggedIn = false;
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
    .addCase(resetAuthAction, (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.userId = '';
      state.loggedIn = false;
    });
});

export default authReducer;
