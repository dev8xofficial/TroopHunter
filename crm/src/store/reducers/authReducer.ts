import { createReducer } from '@reduxjs/toolkit';
import { loginSuccess, loginFailure, registerSuccess, registerFailure } from '../actions/authActions';

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
    .addCase(loginSuccess, (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.error = null;
    })
    .addCase(loginFailure, (state, action) => {
      state.token = null;
      state.userId = null;
      state.error = action.payload;
    })
    .addCase(registerSuccess, (state, action) => {
      state.userId = action.payload;
      state.error = null;
    })
    .addCase(registerFailure, (state, action) => {
      state.userId = null;
      state.error = action.payload;
    });
});

export default authReducer;
