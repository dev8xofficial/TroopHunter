import { createAction } from '@reduxjs/toolkit';
import { type IUserAttributes } from 'validator/interfaces';

import { type IUserUpdatePasswordRequestPayloadAttributes, type IUserUpdateNameRequestPayloadAttributes, type IUsersFetchUserPayload, type IFetchUserSuccessPayload, type IUpdateUserNameSuccessPayload, type IUpdateUserPasswordSuccessPayload } from '../sagas/user';

export const fetchUserAction = createAction<IUsersFetchUserPayload>('user/fetchUserAction');
export const fetchUserSuccessAction = createAction<IFetchUserSuccessPayload>('user/fetchUserSuccessAction');
export const saveUserSuccessAction = createAction<IUserAttributes>('user/saveUserSuccessAction');

export const updateUserNameAction = createAction<IUserUpdateNameRequestPayloadAttributes>('user/updateUserNameAction');
export const updateUserNameSuccessAction = createAction<IUpdateUserNameSuccessPayload>('user/updateUserNameSuccessAction');
export const updateUserPasswordAction = createAction<IUserUpdatePasswordRequestPayloadAttributes>('user/updateUserPasswordAction');
export const updateUserPasswordSuccessAction = createAction<IUpdateUserPasswordSuccessPayload>('user/updateUserPasswordSuccessAction');
export const updateUserLeadsAction = createAction<{ userId: string; selectedLeadIds: string[] }>('user/updateUserLeadsAction');
export const updateUserSuccessAction = createAction<IUserAttributes>('user/updateUserSuccessAction');

export const updateUserLocallyAction = createAction<IUserAttributes>('user/updateUserLocallyAction');
export const addUserLocallyAction = createAction<IUserAttributes>('user/addUserLocallyAction');
export const deleteUserLocallyAction = createAction<string>('user/deleteUserLocallyAction');

export const resetUserAction = createAction('user/resetUserAction');
