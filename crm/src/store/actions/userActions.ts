import { createAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/user';

export const fetchUsers = createAction('user/fetchUsers');
export const fetchUsersSuccess = createAction<{ [key: string]: IUser }>('user/fetchUsersSuccess');
export const fetchUsersFailure = createAction('user/fetchUsersFailure');

export interface IUsersFetchUserPayload {
  token: string;
  userId: string;
}

export const fetchUserAction = createAction<IUsersFetchUserPayload>('user/fetchUser');
export const fetchUserSuccessAction = createAction<IUser>('user/fetchUserSuccess');
export const fetchUserFailureAction = createAction('user/fetchUserFailure');

export const updateUserLocallyAction = createAction<IUser>('user/updateUserLocally');
export const addUserLocallyAction = createAction<IUser>('user/addUserLocally');
export const deleteUserLocallyAction = createAction<string>('user/deleteUserLocally');
