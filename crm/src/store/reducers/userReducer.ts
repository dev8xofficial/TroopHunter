import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { fetchUsersSuccessAction, fetchUsersFailureAction, fetchUserSuccessAction, addUserLocallyAction, updateUserLocallyAction, deleteUserLocallyAction } from '../actions/userActions';
import { IUserAttributes } from 'validator/interfaces';

export interface IUserState {
  data: { [key: string]: IUserAttributes };
}

const initialState: IUserState = { data: {} };

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUsersSuccessAction, (state, action: PayloadAction<IUserState>) => {
      state.data = { ...state.data, ...action.payload.data };
    })
    .addCase(fetchUsersFailureAction, (state) => {
      state.data = {};
    })
    .addCase(fetchUserSuccessAction, (state, action: PayloadAction<IUserAttributes>) => {
      const user = action.payload;
      const mergedUsers: { [key: string]: IUserAttributes } = { ...state.data, [user.id]: { ...user } };
      state.data = mergedUsers;
    })
    // Handling local updates
    .addCase(updateUserLocallyAction, (state, action: PayloadAction<IUserAttributes>) => {
      const user = action.payload;
      state.data[user.id] = { ...user };
    })
    .addCase(addUserLocallyAction, (state, action: PayloadAction<IUserAttributes>) => {
      const user = action.payload;
      state.data[user.id] = { ...user };
    })
    .addCase(deleteUserLocallyAction, (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      delete state.data[userId];
    });
});

export default userReducer;
