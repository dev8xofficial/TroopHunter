import { type AllEffect, type StrictEffect, all } from 'redux-saga/effects';

import { watchCreateLeadSaga, watchUpdateLeadSaga, watchDeleteLeadSaga, watchDeleteLeadsSaga, watchCreateLeadSuccessSaga, watchUpdateSuccessLeadSaga, watchDeleteLeadsSuccessSaga, watchDeleteLeadSuccessSaga } from './sagas/lead';

export function* leadSaga(): Generator<AllEffect<Generator<StrictEffect, void, void>>> {
  yield all([watchCreateLeadSaga(), watchUpdateLeadSaga(), watchDeleteLeadSaga(), watchDeleteLeadsSaga(), watchCreateLeadSuccessSaga(), watchUpdateSuccessLeadSaga(), watchDeleteLeadsSuccessSaga(), watchDeleteLeadSuccessSaga()]);
}
