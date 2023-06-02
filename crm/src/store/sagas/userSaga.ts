import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchUsersSuccess, fetchUsersFailure } from '../actions/userActions';
// import { getUsers } from '../../services/userService';

function* fetchUsersSaga() {
  try {
    const users = yield call(() => {});
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export function* watchUserSaga() {
  yield takeLatest('user/fetchUsers', fetchUsersSaga);
}
