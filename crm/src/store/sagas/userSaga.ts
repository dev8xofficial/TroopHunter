import { toast } from 'react-toastify';
import { takeLatest, put, type StrictEffect, call } from 'redux-saga/effects';
import { type IUserUpdatePasswordRequestAttributes, type ApiResponse, type IUserAttributes, type IUserUpdateNameRequestAttributes } from 'validator/interfaces';

import { getUserWithIncludeService, updateUserNameService, updateUserPasswordService } from '../../services/userService';
import { fetchUserSuccessAction, fetchUserAction, updateUserNameAction, updateUserPasswordAction, updateUserSuccessAction } from '../actions/userActions';

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

export interface IUserUpdateNameRequestPayloadAttributes extends IUserUpdateNameRequestAttributes {
  id: string;
  token: string;
}

function* updateUserNameSaga({ payload }: { payload: IUserUpdateNameRequestPayloadAttributes }): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  try {
    const { id, firstName, lastName, token } = payload;
    const response: ApiResponse<IUserAttributes> = yield call(updateUserNameService, id, { firstName, lastName }, token);

    if (response.success && response.data !== undefined) {
      toast.success(response.message);
      yield put(updateUserSuccessAction(response.data));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export interface IUserUpdatePasswordRequestPayloadAttributes extends IUserUpdatePasswordRequestAttributes {
  id: string;
  token: string;
  clearPasswordFields: () => void;
}

function* updateUserPasswordSaga({ payload }: { payload: IUserUpdatePasswordRequestPayloadAttributes }): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  try {
    const { id, password, newPassword, confirmPassword, token, clearPasswordFields } = payload;
    const response: ApiResponse<IUserAttributes> = yield call(updateUserPasswordService, id, { password, newPassword, confirmPassword }, token);

    if (response.success && response.data !== undefined) {
      toast.success(response.message);
      yield put(updateUserSuccessAction(response.data));
      clearPasswordFields();
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

export function* watchUpdateUserNameSaga(): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  yield takeLatest(updateUserNameAction, updateUserNameSaga);
}

export function* watchUpdatePasswordNameSaga(): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  yield takeLatest(updateUserPasswordAction, updateUserPasswordSaga);
}
