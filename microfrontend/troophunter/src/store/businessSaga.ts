import { type AllEffect, type StrictEffect, all } from 'redux-saga/effects';

import { type IBusinessStateData } from './reducers/businessReducer';
import { watchBusinessSaga, watchBusinessSuccessSaga } from './sagas/business';

export function* businessSaga(): Generator<AllEffect<Generator<StrictEffect, void, unknown | IBusinessStateData>>> {
  yield all([watchBusinessSaga(), watchBusinessSuccessSaga()]);
}
