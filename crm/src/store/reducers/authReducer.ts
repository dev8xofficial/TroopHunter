import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { authLoginSuccessAction, authLoginFailureAction } from '../actions/authActions';
import { IUserCreationResponseAttributes } from '../../types/user';

export interface IAuthState {
  token: string;
  userId: string;
}

export interface IAuthLoginSuccessPayload {
  token: string;
  user: IUserCreationResponseAttributes;
}

const initialState: IAuthState = {
  token: null,
  userId: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authLoginSuccessAction, (state, action: PayloadAction<IAuthLoginSuccessPayload>) => {
      state.token = action.payload.token;
      state.userId = action.payload.user.id;
    })
    .addCase(authLoginFailureAction, (state) => {
      state.token = null;
      state.userId = null;
    });
});

export default authReducer;
