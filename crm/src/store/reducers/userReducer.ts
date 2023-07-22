import { createReducer } from '@reduxjs/toolkit';
import { fetchUsersSuccess, fetchUsersFailure, fetchUserSuccess, fetchUserFailure } from '../actions/userActions';
import { IUser } from '../../types/user';

export interface UserState {
  data: { [key: string]: IUser };
  error: string | null;
}

const initialState: UserState = { data: {}, error: null };

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUsersSuccess, (state, action) => {
      state.data = { ...state.data, ...action.payload };
      state.error = null;
    })
    .addCase(fetchUsersFailure, (state, action) => {
      state.data = {};
      state.error = action.payload;
    })
    .addCase(fetchUserSuccess, (state, action) => {
      const user = action.payload;
      const mergedUsers: { [key: string]: IUser } = { ...state.data, [user.id]: { ...user } };
      state.data = mergedUsers;
      state.error = null;
    })
    .addCase(fetchUserFailure, (state, action) => {
      state.data = {};
      state.error = action.payload;
    });
});

export default userReducer;
