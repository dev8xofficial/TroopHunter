import { type IUserUpdatePasswordRequestAttributes, type ApiResponse, type IUserAttributes, type IUserUpdateNameRequestAttributes } from '@repo/validator';
import { toast } from 'react-toastify';
import { takeLatest, put, type StrictEffect } from 'redux-saga/effects';

import { removeEmptyStringValues } from '../../../utils/helpers';
import { ApiRequestAction, type IApiRequestAttributes } from '../../actions/apiActions';
import { updateUserNameAction, updateUserPasswordAction, updateUserSuccessAction, updateUserNameSuccessAction, updateUserPasswordSuccessAction } from '../../actions/userActions';

export interface IUserUpdateNameRequestPayloadAttributes extends IUserUpdateNameRequestAttributes {
  userId: string;
}

function* updateUserNameSaga({ payload }: { payload: IUserUpdateNameRequestPayloadAttributes }): Generator<StrictEffect, void, void> {
  try {
    const { userId, firstName, lastName } = payload;

    const apiPayload = {
      url: `/users/${userId}/update/name`,
      method: 'PUT',
      data: removeEmptyStringValues({ firstName, lastName }),
      onSuccess: 'user/updateUserNameSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export interface IUpdateUserNameSuccessPayload {
  request: IApiRequestAttributes<IUserUpdateNameRequestPayloadAttributes, undefined, undefined>;
  response: ApiResponse<IUserAttributes>;
}

function* updateUserNameSuccessSaga({ payload }: { payload: IUpdateUserNameSuccessPayload }): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  try {
    const { response } = payload;

    if (response.success && response.data !== undefined) {
      toast.success(response.message);
      yield put(updateUserSuccessAction(response.data));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export interface IUserUpdatePasswordRequestPayloadAttributes extends IUserUpdatePasswordRequestAttributes {
  userId: string;
}

function* updateUserPasswordSaga({ payload }: { payload: IUserUpdatePasswordRequestPayloadAttributes }): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  try {
    const { userId, password, newPassword, confirmPassword } = payload;

    const apiPayload = {
      url: `/users/${userId}/update/password`,
      method: 'PUT',
      data: removeEmptyStringValues({ password, newPassword, confirmPassword }),
      onSuccess: 'user/updateUserPasswordSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export interface IUpdateUserPasswordSuccessPayload {
  request: IApiRequestAttributes<IUserUpdatePasswordRequestPayloadAttributes, undefined, undefined>;
  response: ApiResponse<IUserAttributes>;
}

function* updateUserPasswordSuccessSaga({ payload }: { payload: IUpdateUserPasswordSuccessPayload }): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  try {
    const { response } = payload;

    if (response.success && response.data !== undefined) {
      toast.success(response.message);
      yield put(updateUserSuccessAction(response.data));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export function* watchUpdateUserNameSaga(): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  yield takeLatest(updateUserNameAction, updateUserNameSaga);
}

export function* watchUpdateUserNameSuccessSaga(): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  yield takeLatest(updateUserNameSuccessAction, updateUserNameSuccessSaga);
}

export function* watchUpdateUserPasswordSaga(): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  yield takeLatest(updateUserPasswordAction, updateUserPasswordSaga);
}

export function* watchUpdateUserPasswordSuccessSaga(): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  yield takeLatest(updateUserPasswordSuccessAction, updateUserPasswordSuccessSaga);
}
