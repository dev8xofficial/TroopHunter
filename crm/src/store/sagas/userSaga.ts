import { toast } from 'react-toastify';
import { takeLatest, put, type StrictEffect, call } from 'redux-saga/effects';
import { type ApiResponse, type IUserAttributes } from 'validator/interfaces';

import { getUserWithIncludeService } from '../../services/userService';
import { fetchUserSuccessAction, fetchUserAction } from '../actions/userActions';

export interface IUsersFetchUserPayload {
  token: string;
  userId: string;
}

function* fetchUserSaga({ payload }: { payload: IUsersFetchUserPayload }): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  try {
    const { userId, token } = payload;
    const params = {
      include: '["Leads"]'
    };
    const response: ApiResponse<IUserAttributes> = yield call(getUserWithIncludeService, userId, token, params);

    if (response.success) {
      // Perform type check using type assertion
      const loginSuccessPayload = response.data as IUserAttributes;
      yield put(fetchUserSuccessAction(loginSuccessPayload));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export function* watchGetUserSaga(): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  yield takeLatest(fetchUserAction, fetchUserSaga);
}
