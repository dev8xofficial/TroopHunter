import { type PayloadAction, createReducer } from '@reduxjs/toolkit';
import { type IUserAttributes } from 'validator/interfaces';

import { fetchUserSuccessAction, updateUserSuccessAction, addUserLocallyAction, updateUserLocallyAction, deleteUserLocallyAction } from '../actions/userActions';

export interface IUserState {
  data: Record<string, IUserAttributes>;
}

const initialState: IUserState = { data: {} };

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUserSuccessAction, (state, action: PayloadAction<IUserAttributes>) => {
      const user = action.payload;
      const mergedUsers: Record<string, IUserAttributes> = { ...state.data, [user.id]: { ...user } };
      state.data = mergedUsers;
    })
    .addCase(updateUserSuccessAction, (state, action: PayloadAction<IUserAttributes>) => {
      const user = action.payload;
      const mergedUsers: Record<string, IUserAttributes> = { ...state.data, [user.id]: { ...user } };
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
      state.data = Object.fromEntries(Object.entries(state.data).filter(([key]) => key !== userId));
    });
});

export default userReducer;
