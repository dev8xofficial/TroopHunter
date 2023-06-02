import { createReducer } from '@reduxjs/toolkit';
// import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../types/authTypes';
import { loginSuccess, loginFailure, registerSuccess, registerFailure } from '../actions/authActions';
import { IUser } from '../../types/user';

export interface AuthState {
  token: string | null;
  user: IUser | null;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  error: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginSuccess, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    })
    .addCase(loginFailure, (state, action) => {
      state.token = null;
      state.user = null;
      state.error = action.payload;
    })
    .addCase(registerSuccess, (state, action) => {
      state.user = action.payload;
      state.error = null;
    })
    .addCase(registerFailure, (state, action) => {
      state.user = null;
      state.error = action.payload;
    });
});

export default authReducer;
