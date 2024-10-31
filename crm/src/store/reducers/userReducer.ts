import { type PayloadAction, createReducer } from '@reduxjs/toolkit';
import { type ILeadAttributes, type IUserAttributes } from 'validator/interfaces';

import { saveUserSuccessAction, updateUserSuccessAction, addUserLocallyAction, updateUserLocallyAction, deleteUserLocallyAction, updateUserLeadsAction, resetUserAction } from '../actions/userActions';

export interface IUserState {
  data: Record<string, IUserAttributes>;
}

const initialState: IUserState = { data: {} };

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(saveUserSuccessAction, (state, action: PayloadAction<IUserAttributes>) => {
      const user = action.payload;
      const mergedUsers: Record<string, IUserAttributes> = { ...state.data, [user.id]: { ...user } };
      state.data = mergedUsers;
    })
    .addCase(updateUserLeadsAction, (state, action: PayloadAction<{ userId: string; selectedLeadIds: string[] }>) => {
      const { userId, selectedLeadIds } = action.payload;
      const user = state.data[userId];
      const updatedUser: IUserAttributes = {
        ...user,
        Leads: user.Leads.filter((lead: ILeadAttributes) => !selectedLeadIds.includes(lead.id))
      };
      const mergedUsers: Record<string, IUserAttributes> = { ...state.data, [user.id]: { ...updatedUser } };
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
    })
    .addCase(resetUserAction, (state) => {
      state.data = {};
    });
});

export default userReducer;
