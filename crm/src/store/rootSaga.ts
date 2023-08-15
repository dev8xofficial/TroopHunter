import { type AllEffect, type ForkEffect, all } from 'redux-saga/effects';

import { watchLoginSaga, watchRegisterSaga } from './sagas/authSaga';
import { watchBusinessSaga } from './sagas/businessSaga';
import { watchCreateLeadSaga, watchUpdateLeadSaga, watchDeleteLeadSaga, watchDeleteLeadsSaga } from './sagas/leadSaga';
import { watchGetUserSaga, watchUpdateUserNameSaga, watchUpdatePasswordNameSaga } from './sagas/userSaga';

export default function* rootSaga(): Generator<AllEffect<Generator<ForkEffect<never>, void, unknown>>, void, unknown> {
  yield all([watchLoginSaga(), watchRegisterSaga(), watchGetUserSaga(), watchUpdateUserNameSaga(), watchUpdatePasswordNameSaga(), watchBusinessSaga(), watchCreateLeadSaga(), watchUpdateLeadSaga(), watchDeleteLeadSaga(), watchDeleteLeadsSaga()]);
}
