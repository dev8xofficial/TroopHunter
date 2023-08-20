import { type NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { takeLatest, put, type StrictEffect } from 'redux-saga/effects';
import { type IUserFetchByIdRequestAttributes, type ApiResponse, type ILoginRequestAttributes } from 'validator/interfaces';

import { LOGIN_URL } from '../../../routes/Urls';
import { removeEmptyStringValues } from '../../../utils/helpers';
import { ApiRequestAction, type IApiRequestAttributes } from '../../actions/apiActions';
import { saveAuthSuccessAction, saveAuthFailureAction, authLoginAction, authLoginSuccessAction, authSignOutAction, authSignOutSuccessAction, resetAuthAction } from '../../actions/authActions';
import { resetBusinessAction } from '../../actions/businessActions';
import { resetHomePageAction } from '../../actions/homePageActions';
import { resetLeadsPageAction } from '../../actions/leadsPageActions';
import { addUserLocallyAction, resetUserAction } from '../../actions/userActions';
import { type ISaveAuthSuccessPayload } from '../../reducers/authReducer';

export interface IAuthLoginPayload extends ILoginRequestAttributes {
  navigate: NavigateFunction;
}

function* loginSaga({ payload }: { payload: IAuthLoginPayload }): Generator<StrictEffect, void, void> {
  try {
    const { email, password, navigate } = payload;

    const apiPayload = {
      url: '/auth/signin',
      method: 'POST',
      data: removeEmptyStringValues({ email, password }),
      payload: { navigate },
      onSuccess: 'auth/authLoginSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
  } catch (error) {
    toast.error((error as Error).message);
    yield put(saveAuthFailureAction());
  }
}

export interface IAuthLoginSuccessPayload {
  request: IApiRequestAttributes<ILoginRequestAttributes, undefined, undefined, { navigate: NavigateFunction }>;
  response: ApiResponse<ISaveAuthSuccessPayload>;
}

function* loginSuccessSaga({ payload }: { payload: IAuthLoginSuccessPayload }): Generator<StrictEffect, void, ApiResponse<ISaveAuthSuccessPayload>> {
  try {
    const { request, response } = payload;

    if (response.success && response.data !== undefined && request.payload !== undefined) {
      const loginResponse: ISaveAuthSuccessPayload = response.data;
      yield put(addUserLocallyAction(loginResponse.user));

      toast.success(response.message);
      request.payload.navigate('/');

      // Perform type check using type assertion
      const loginSuccessPayload = response.data;
      yield put(saveAuthSuccessAction(loginSuccessPayload));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
    yield put(saveAuthFailureAction());
  }
}

export interface IAuthSignOutPayload extends IUserFetchByIdRequestAttributes {
  navigate: NavigateFunction;
}

function* signOutSaga({ payload }: { payload: IAuthSignOutPayload }): Generator<StrictEffect, void, void> {
  try {
    const { id, navigate } = payload;

    const apiPayload = {
      url: `/auth/signout/${id}`,
      method: 'POST',
      payload: { navigate },
      onSuccess: 'auth/authSignOutSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
  } catch (error) {
    toast.error((error as Error).message);
    yield put(saveAuthFailureAction());
  }
}

export interface IAuthSignOutSuccessPayload {
  request: IApiRequestAttributes<IUserFetchByIdRequestAttributes, undefined, undefined, { navigate: NavigateFunction }>;
  response: ApiResponse<null>;
}

function* signOutSuccessSaga({ payload }: { payload: IAuthSignOutSuccessPayload }): Generator<StrictEffect, void, ApiResponse<null>> {
  try {
    const { request, response } = payload;

    if (response.success && request.payload !== undefined) {
      toast.success(response.message);
      yield put(resetAuthAction());
      yield put(resetBusinessAction());
      yield put(resetHomePageAction());
      yield put(resetLeadsPageAction());
      yield put(resetUserAction());
      request.payload.navigate(LOGIN_URL);
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
    yield put(saveAuthFailureAction());
  }
}

export function* watchLoginSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(authLoginAction, loginSaga);
}

export function* watchLoginSuccessSaga(): Generator<StrictEffect, void, ApiResponse<ISaveAuthSuccessPayload>> {
  yield takeLatest(authLoginSuccessAction, loginSuccessSaga);
}

export function* watchSignOutSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(authSignOutAction, signOutSaga);
}

export function* watchSignOutSuccessSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(authSignOutSuccessAction, signOutSuccessSaga);
}
