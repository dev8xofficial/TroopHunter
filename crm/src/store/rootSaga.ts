import { all } from 'redux-saga/effects';
import { watchLoginSaga, watchRegisterSaga } from './sagas/authSaga';
import { watchUserSaga } from './sagas/userSaga';
import { watchBusinessSaga } from './sagas/businessSaga';

export default function* rootSaga() {
  yield all([watchLoginSaga(), watchRegisterSaga(), watchUserSaga(), watchBusinessSaga()]);
}
