import { type PayloadAction, createReducer } from '@reduxjs/toolkit';
import { type IUserAttributes } from 'validator/interfaces';

import { authLoginSuccessAction, authLoginFailureAction } from '../actions/authActions';

export interface IAuthState {
  token: string;
  userId: string;
}

export interface IAuthLoginSuccessPayload {
  token: string;
  user: IUserAttributes;
}

const initialState: IAuthState = {
  token: '',
  userId: ''
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authLoginSuccessAction, (state, action: PayloadAction<IAuthLoginSuccessPayload>) => {
      state.token = action.payload.token;
      state.userId = action.payload.user.id;
    })
    .addCase(authLoginFailureAction, (state) => {
      state.token = '';
      state.userId = '';
    });
});

export default authReducer;
