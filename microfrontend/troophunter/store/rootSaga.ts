import { all, type AllEffect } from 'redux-saga/effects';

import { authSaga } from './authSaga';
import { businessSaga } from './businessSaga';
import { leadSaga } from './leadSaga';

export default function* rootSaga(): Generator<AllEffect<ReturnType<typeof authSaga>>, void, void> {
  yield all([authSaga(), businessSaga(), leadSaga()]);
}
