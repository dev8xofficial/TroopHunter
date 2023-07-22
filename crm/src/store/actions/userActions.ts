import { createAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/user';

export const fetchUsers = createAction('user/fetchUsers');
export const fetchUsersSuccess = createAction<{ [key: string]: IUser }>('user/fetchUsersSuccess');
export const fetchUsersFailure = createAction('user/fetchUsersFailure');

export interface IfetchUserPayload {
  token: string;
  userId: string;
}

export const fetchUser = createAction<IfetchUserPayload>('user/fetchUser');
export const fetchUserSuccess = createAction<IUser>('user/fetchUserSuccess');
export const fetchUserFailure = createAction('user/fetchUserFailure');
