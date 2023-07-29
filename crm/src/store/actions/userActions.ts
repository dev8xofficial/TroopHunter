import { createAction } from '@reduxjs/toolkit';
import { IUsersFetchPayload, IUsersFetchUserPayload } from '../sagas/userSaga';
import { IUserCreationResponseAttributes } from '../../types/user';
import { IUserState } from '../reducers/userReducer';

export const fetchUsersAction = createAction<IUsersFetchPayload>('user/fetchUsersAction');
export const fetchUsersSuccessAction = createAction<IUserState>('user/fetchUsersSuccessAction');
export const fetchUsersFailureAction = createAction('user/fetchUsersFailureAction');

export const fetchUserAction = createAction<IUsersFetchUserPayload>('user/fetchUserAction');
export const fetchUserSuccessAction = createAction<IUserCreationResponseAttributes>('user/fetchUserSuccessAction');

export const updateUserLocallyAction = createAction<IUserCreationResponseAttributes>('user/updateUserLocallyAction');
export const addUserLocallyAction = createAction<IUserCreationResponseAttributes>('user/addUserLocallyAction');
export const deleteUserLocallyAction = createAction<string>('user/deleteUserLocallyAction');
