import { createReducer } from '@reduxjs/toolkit';
import { fetchUsersSuccess, fetchUsersFailure } from '../actions/userActions';
import { IUser } from '../../types/user';

export interface UserState {
  users: IUser[];
  error: string | null;
}

const initialState: UserState = {
  users: [],
  error: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUsersSuccess, (state, action) => {
      state.users = action.payload;
      state.error = null;
    })
    .addCase(fetchUsersFailure, (state, action) => {
      state.users = [];
      state.error = action.payload;
    });
});

export default userReducer;
