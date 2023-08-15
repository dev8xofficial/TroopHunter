import { createAction } from '@reduxjs/toolkit';
import { type IUserAttributes } from 'validator/interfaces';

import { type IUserUpdatePasswordRequestPayloadAttributes, type IUserUpdateNameRequestPayloadAttributes, type IUsersFetchUserPayload } from '../sagas/userSaga';

export const fetchUserAction = createAction<IUsersFetchUserPayload>('user/fetchUserAction');
export const fetchUserSuccessAction = createAction<IUserAttributes>('user/fetchUserSuccessAction');

export const updateUserNameAction = createAction<IUserUpdateNameRequestPayloadAttributes>('user/updateUserNameAction');
export const updateUserPasswordAction = createAction<IUserUpdatePasswordRequestPayloadAttributes>('user/updateUserPasswordAction');
export const updateUserSuccessAction = createAction<IUserAttributes>('user/updateUserSuccessAction');

export const updateUserLocallyAction = createAction<IUserAttributes>('user/updateUserLocallyAction');
export const addUserLocallyAction = createAction<IUserAttributes>('user/addUserLocallyAction');
export const deleteUserLocallyAction = createAction<string>('user/deleteUserLocallyAction');
