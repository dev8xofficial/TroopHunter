import { type AllEffect, type StrictEffect, all } from 'redux-saga/effects';

import { watchLoginSaga, watchLoginSuccessSaga, watchRegisterSaga, watchSendVerificationTokenSaga, watchSignOutSaga, watchSignOutSuccessSaga, watchVerifyUserSaga, watchForgotPasswordSaga, watchResetPasswordSaga, watchResetPasswordVerificationSaga } from './sagas/auth';

export function* authSaga(): Generator<AllEffect<Generator<StrictEffect, void, void>>> {
  yield all([watchLoginSaga(), watchLoginSuccessSaga(), watchSignOutSaga(), watchSignOutSuccessSaga(), watchRegisterSaga(), watchSendVerificationTokenSaga(), watchVerifyUserSaga(), watchForgotPasswordSaga(), watchResetPasswordSaga(), watchResetPasswordVerificationSaga()]);
}
