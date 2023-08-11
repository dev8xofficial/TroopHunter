import { createAction } from '@reduxjs/toolkit';
import { IUsersFetchPayload, IUsersFetchUserPayload } from '../sagas/userSaga';
import { IUserAttributes } from 'validator/interfaces';
import { IUserState } from '../reducers/userReducer';

export const fetchUsersAction = createAction<IUsersFetchPayload>('user/fetchUsersAction');
export const fetchUsersSuccessAction = createAction<IUserState>('user/fetchUsersSuccessAction');
export const fetchUsersFailureAction = createAction('user/fetchUsersFailureAction');

export const fetchUserAction = createAction<IUsersFetchUserPayload>('user/fetchUserAction');
export const fetchUserSuccessAction = createAction<IUserAttributes>('user/fetchUserSuccessAction');

export const updateUserLocallyAction = createAction<IUserAttributes>('user/updateUserLocallyAction');
export const addUserLocallyAction = createAction<IUserAttributes>('user/addUserLocallyAction');
export const deleteUserLocallyAction = createAction<string>('user/deleteUserLocallyAction');
