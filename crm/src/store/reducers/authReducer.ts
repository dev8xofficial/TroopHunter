import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { loginSuccessAction, loginFailureAction } from '../actions/authActions';
import { IUser } from '../../types/user';

export interface AuthState {
  token: string;
  userId: string;
}

export interface IAuthLoginSuccessPayload {
  token: string;
  user?: IUser;
}

const initialState: AuthState = {
  token: null,
  userId: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginSuccessAction, (state, action: PayloadAction<IAuthLoginSuccessPayload>) => {
      state.token = action.payload.token;
      state.userId = action.payload.user.id;
    })
    .addCase(loginFailureAction, (state, action) => {
      state.token = null;
      state.userId = null;
    });
});

export default authReducer;
