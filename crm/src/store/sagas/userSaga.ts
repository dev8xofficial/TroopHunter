import { takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { fetchUsersSuccess, fetchUsersFailure, fetchUserSuccessAction, fetchUserFailureAction } from '../actions/userActions';
import { getUsersService, getUserWithIncludeService } from '../../services/userService';

function* fetchUsersSaga({ payload }: any): any {
  try {
    const { token } = payload;
    const response = yield getUsersService(token);

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
    const response = yield getUserWithIncludeService(userId, token, params);

    if (response.success) {
      yield put(fetchUserSuccessAction(response.data));
    } else {
      toast.error(response.error);
      yield put(fetchUserFailureAction(response.message));
    }
  } catch (error) {
    toast.error(error.message);
    yield put(fetchUserFailureAction(error.message));
  }
}

export function* watchGetUsersSaga() {
  yield takeLatest('user/fetchUsers', fetchUsersSaga);
}

export function* watchGetUserSaga() {
  yield takeLatest('user/fetchUser', fetchUserSaga);
}
