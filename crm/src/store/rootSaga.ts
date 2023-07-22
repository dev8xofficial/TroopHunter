import { all } from 'redux-saga/effects';
import { watchLoginSaga, watchRegisterSaga } from './sagas/authSaga';
import { watchGetUsersSaga, watchGetUserSaga } from './sagas/userSaga';
import { watchBusinessSaga } from './sagas/businessSaga';

export default function* rootSaga() {
  yield all([watchLoginSaga(), watchRegisterSaga(), watchGetUsersSaga(), watchGetUserSaga(), watchBusinessSaga()]);
}
