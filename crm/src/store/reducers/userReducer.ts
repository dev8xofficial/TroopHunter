import { createReducer } from '@reduxjs/toolkit';
import { fetchUsersSuccess, fetchUsersFailure, fetchUserSuccessAction, fetchUserFailureAction, addUserLocallyAction, updateUserLocallyAction, deleteUserLocallyAction } from '../actions/userActions';
import { IUser } from '../../types/user';

export interface UserState {
  data: { [key: string]: IUser };
}

const initialState: UserState = { data: {} };

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUsersSuccess, (state, action) => {
      state.data = { ...state.data, ...action.payload };
    })
    .addCase(fetchUsersFailure, (state, action) => {
      state.data = {};
    })
    .addCase(fetchUserSuccessAction, (state, action) => {
      const user = action.payload;
      const mergedUsers: { [key: string]: IUser } = { ...state.data, [user.id]: { ...user } };
      state.data = mergedUsers;
    })
    .addCase(fetchUserFailureAction, (state, action) => {
      state.data = {};
    })
    // Handling local updates
    .addCase(updateUserLocallyAction, (state, action) => {
      const user = action.payload;
      // Update the user in the data object by ID
      state.data[user.id] = { ...user };
    })
    .addCase(addUserLocallyAction, (state, action) => {
      const user = action.payload;
      // Add a new user to the data object
      state.data[user.id] = { ...user };
    })
    .addCase(deleteUserLocallyAction, (state, action) => {
      const userId = action.payload;
      // Remove the user from the data object by ID
      delete state.data[userId];
    });
});

export default userReducer;
