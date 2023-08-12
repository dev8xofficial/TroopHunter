import { toast } from 'react-toastify';
import { takeLatest, put, type ForkEffect } from 'redux-saga/effects';
import { type IUserAttributes } from 'validator/interfaces';

import { getUsersService, getUserWithIncludeService } from '../../services/userService';
import { fetchUsersSuccessAction, fetchUsersFailureAction, fetchUserSuccessAction, fetchUsersAction, fetchUserAction } from '../actions/userActions';
import { type IUserState } from '../reducers/userReducer';

export interface IUsersFetchPayload {
  token: string;
}

function* fetchUsersSaga({ payload }: { payload: IUsersFetchPayload }): any {
  try {
    const { token } = payload;
    const response = yield getUsersService(token);

    if (response.success === true) {
      // Perform type check using type assertion
      const loginSuccessPayload = response.data as IUserState;
      yield put(fetchUsersSuccessAction(loginSuccessPayload));
    } else {
      toast.error(response.error);
      yield put(fetchUsersFailureAction(response.message));
    }
  } catch (error) {
    toast.error((error as Error).message);
    yield put(fetchUsersFailureAction());
  }
}

export interface IUsersFetchUserPayload {
  token: string;
  userId: string;
}

function* fetchUserSaga({ payload }: { payload: IUsersFetchUserPayload }): any {
  try {
    const { userId, token } = payload;
    const params = {
      include: '["Leads"]'
    };
    const response = yield getUserWithIncludeService(userId, token, params);

    if (response.success === true) {
      // Perform type check using type assertion
      const loginSuccessPayload = response.data as IUserAttributes;
      yield put(fetchUserSuccessAction(loginSuccessPayload));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export function* watchGetUsersSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(fetchUsersAction, fetchUsersSaga);
}

export function* watchGetUserSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(fetchUserAction, fetchUserSaga);
}
