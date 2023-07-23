import { createReducer } from '@reduxjs/toolkit';
import { fetchUsersSuccess, fetchUsersFailure, fetchUserSuccessAction, fetchUserFailureAction, addUserLocallyAction, updateUserLocallyAction, deleteUserLocallyAction } from '../actions/userActions';
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
    .addCase(fetchUserSuccessAction, (state, action) => {
      const user = action.payload;
      const mergedUsers: { [key: string]: IUser } = { ...state.data, [user.id]: { ...user } };
      state.data = mergedUsers;
      state.error = null;
    })
    .addCase(fetchUserFailureAction, (state, action) => {
      state.data = {};
      state.error = action.payload;
    })
    // Handling local updates
    .addCase(updateUserLocallyAction, (state, action) => {
      const user = action.payload;
      // Update the user in the data object by ID
      state.data[user.id] = { ...user };
      state.error = null;
    })
    .addCase(addUserLocallyAction, (state, action) => {
      const user = action.payload;
      // Add a new user to the data object
      state.data[user.id] = { ...user };
      state.error = null;
    })
    .addCase(deleteUserLocallyAction, (state, action) => {
      const userId = action.payload;
      // Remove the user from the data object by ID
      delete state.data[userId];
      state.error = null;
    });
});

export default userReducer;
