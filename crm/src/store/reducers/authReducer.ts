import { createReducer } from '@reduxjs/toolkit';
import { loginSuccessAction, loginFailureAction, registerSuccessAction, registerFailureAction } from '../actions/authActions';
import { IUser } from '../../types/user';

export interface AuthState {
  token: string | null;
  userId: string | null;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  error: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginSuccessAction, (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload?.user?.id;
      state.error = null;
    })
    .addCase(loginFailureAction, (state, action) => {
      state.token = null;
      state.userId = null;
      state.error = action.payload;
    })
    .addCase(registerSuccessAction, (state, action) => {
      state.userId = action.payload;
      state.error = null;
    })
    .addCase(registerFailureAction, (state, action) => {
      state.userId = null;
      state.error = action.payload;
    });
});

export default authReducer;
