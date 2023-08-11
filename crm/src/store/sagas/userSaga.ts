import { takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { fetchUsersSuccessAction, fetchUsersFailureAction, fetchUserSuccessAction, fetchUsersAction, fetchUserAction } from '../actions/userActions';
import { getUsersService, getUserWithIncludeService } from '../../services/userService';
import { IUserAttributes } from 'validator/interfaces/User';
import { IUserState } from '../reducers/userReducer';

export interface IUsersFetchPayload {
  token: string;
}

function* fetchUsersSaga({ payload }: { payload: IUsersFetchPayload }): any {
  try {
    const { token } = payload;
    const response = yield getUsersService(token);

    if (response.success) {
      // Perform type check using type assertion
      const loginSuccessPayload = response.data as IUserState;
      yield put(fetchUsersSuccessAction(loginSuccessPayload));
    } else {
      toast.error(response.error);
      yield put(fetchUsersFailureAction(response.message));
    }
  } catch (error) {
    toast.error(error.message);
    yield put(fetchUsersFailureAction(error.message));
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
      include: '["Leads"]',
    };
    const response = yield getUserWithIncludeService(userId, token, params);

    if (response.success) {
      // Perform type check using type assertion
      const loginSuccessPayload = response.data as IUserAttributes;
      yield put(fetchUserSuccessAction(loginSuccessPayload));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export function* watchGetUsersSaga() {
  yield takeLatest(fetchUsersAction, fetchUsersSaga);
}

export function* watchGetUserSaga() {
  yield takeLatest(fetchUserAction, fetchUserSaga);
}
