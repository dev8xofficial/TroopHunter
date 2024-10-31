import { type ApiResponse, type IUserAttributes } from '@repo/validator';
import { toast } from 'react-toastify';
import { takeLatest, put, type StrictEffect } from 'redux-saga/effects';

import { ApiRequestAction, type IApiRequestAttributes } from '../../actions/apiActions';
import { saveUserSuccessAction, fetchUserAction, fetchUserSuccessAction } from '../../actions/userActions';

export interface IUsersFetchUserPayload {
  userId: string;
}

function* fetchUserSaga({ payload }: { payload: IUsersFetchUserPayload }): Generator<StrictEffect, void, void> {
  try {
    const { userId } = payload;
    const params = {
      include: '["Leads"]'
    };

    const apiPayload = {
      url: `/users/${userId}/include`,
      method: 'GET',
      params,
      onSuccess: 'user/fetchUserSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export interface IFetchUserSuccessPayload {
  request: IApiRequestAttributes<IUsersFetchUserPayload, undefined, undefined>;
  response: ApiResponse<IUserAttributes>;
}

function* fetchUserSuccessSaga({ payload }: { payload: IFetchUserSuccessPayload }): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  try {
    const { response } = payload;

    if (response.success) {
      const loginSuccessPayload = response.data as IUserAttributes;
      yield put(saveUserSuccessAction(loginSuccessPayload));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export function* watchGetUserSaga(): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  yield takeLatest(fetchUserAction, fetchUserSaga);
}

export function* watchGetUserSuccessSaga(): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  yield takeLatest(fetchUserSuccessAction, fetchUserSuccessSaga);
}
