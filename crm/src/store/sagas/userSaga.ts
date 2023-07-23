import { takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { fetchUsersSuccess, fetchUsersFailure, fetchUserSuccess, fetchUserFailure } from '../actions/userActions';
import { getUsers, getUserWithInclude } from '../../services/userService';

function* fetchUsersSaga({ payload }: any): any {
  try {
    const { token } = payload;
    const response = yield getUsers(token);

    if (response.success) {
      yield put(fetchUsersSuccess(response.data));
    } else {
      toast.error(response.error);
      yield put(fetchUsersFailure(response.message));
    }
  } catch (error) {
    toast.error(error.message);
    yield put(fetchUsersFailure(error.message));
  }
}

function* fetchUserSaga({ payload }: any): any {
  try {
    const { userId, token } = payload;
    const params = {
      include: '["Leads"]',
    };
    const response = yield getUserWithInclude(userId, token, params);

    if (response.success) {
      yield put(fetchUserSuccess(response.data));
    } else {
      toast.error(response.error);
      yield put(fetchUserFailure(response.message));
    }
  } catch (error) {
    toast.error(error.message);
    yield put(fetchUserFailure(error.message));
  }
}

export function* watchGetUsersSaga() {
  yield takeLatest('user/fetchUsers', fetchUsersSaga);
}

export function* watchGetUserSaga() {
  yield takeLatest('user/fetchUser', fetchUserSaga);
}
