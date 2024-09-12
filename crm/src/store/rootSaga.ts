import { type AllEffect, type StrictEffect, all } from 'redux-saga/effects';

import { watchLoginSaga, watchLoginSuccessSaga, watchRegisterSaga, watchSendVerificationTokenSaga, watchSignOutSaga, watchSignOutSuccessSaga } from './sagas/auth';
import { watchBusinessSaga, watchBusinessSuccessSaga } from './sagas/business';
import { watchCreateLeadSaga, watchUpdateLeadSaga, watchDeleteLeadSaga, watchDeleteLeadsSaga, watchCreateLeadSuccessSaga, watchUpdateSuccessLeadSaga, watchDeleteLeadsSuccessSaga, watchDeleteLeadSuccessSaga } from './sagas/lead';
import { watchGetUserSaga, watchUpdateUserNameSaga, watchUpdateUserPasswordSaga, watchGetUserSuccessSaga, watchUpdateUserNameSuccessSaga, watchUpdateUserPasswordSuccessSaga } from './sagas/user';

export default function* rootSaga(): Generator<AllEffect<Generator<StrictEffect, void, void>>> {
  yield all([watchLoginSaga(), watchLoginSuccessSaga(), watchSignOutSaga(), watchSignOutSuccessSaga(), watchRegisterSaga(), watchSendVerificationTokenSaga(), watchGetUserSaga(), watchGetUserSuccessSaga(), watchUpdateUserNameSaga(), watchUpdateUserNameSuccessSaga(), watchUpdateUserPasswordSaga(), watchUpdateUserPasswordSuccessSaga(), watchBusinessSaga(), watchBusinessSuccessSaga(), watchCreateLeadSaga(), watchCreateLeadSuccessSaga(), watchUpdateLeadSaga(), watchUpdateSuccessLeadSaga(), watchDeleteLeadSaga(), watchDeleteLeadSuccessSaga(), watchDeleteLeadsSaga(), watchDeleteLeadsSuccessSaga()]);
}
