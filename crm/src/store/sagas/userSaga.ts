import { takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { fetchUsersSuccess, fetchUsersFailure, fetchUserSuccess, fetchUserFailure } from '../actions/userActions';
import { getUsers, getUserWithInclude } from '../../services/userService';

function* fetchUsersSaga({ payload }: any): any {
  try {
    const { token } = payload;
    const response = yield getUsers(token);

    yield put(fetchUsersSuccess(response));
  } catch (error) {
    toast(error.response.data.error);
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

    yield put(fetchUserSuccess(response));
  } catch (error) {
    toast(error.message);
    yield put(fetchUserFailure(error.message));
  }
}

export function* watchGetUsersSaga() {
  yield takeLatest('user/fetchUsers', fetchUsersSaga);
}

export function* watchGetUserSaga() {
  yield takeLatest('user/fetchUser', fetchUserSaga);
}
