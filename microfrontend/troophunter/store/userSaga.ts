import { type ApiResponse, type IUserAttributes } from '@repo/validator';
import { type AllEffect, type StrictEffect, all } from 'redux-saga/effects';

import { watchGetUserSaga, watchUpdateUserNameSaga, watchUpdateUserPasswordSaga, watchGetUserSuccessSaga, watchUpdateUserNameSuccessSaga, watchUpdateUserPasswordSuccessSaga } from './sagas/user';

export function* userSaga(): Generator<AllEffect<Generator<StrictEffect, void, ApiResponse<IUserAttributes>>>> {
  yield all([watchGetUserSaga(), watchUpdateUserNameSaga(), watchUpdateUserPasswordSaga(), watchGetUserSuccessSaga(), watchUpdateUserNameSuccessSaga(), watchUpdateUserPasswordSuccessSaga()]);
}
