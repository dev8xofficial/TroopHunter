import { type NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { takeLatest, put, call, type StrictEffect } from 'redux-saga/effects';
import { type ApiResponse, type IUserAttributes, type ILoginRequestAttributes, type IUserCreateRequestAttributes } from 'validator/interfaces';

import { loginService, registerService } from '../../services/authService';
import { authLoginSuccessAction, authLoginFailureAction, authLoginAction, authRegisterAction } from '../actions/authActions';
import { addUserLocallyAction } from '../actions/userActions';
import { type IAuthLoginSuccessPayload } from '../reducers/authReducer';

export interface IAuthLoginPayload extends ILoginRequestAttributes {
  navigate: NavigateFunction;
}

function* loginSaga({ payload }: { payload: IAuthLoginPayload }): Generator<StrictEffect, void, ApiResponse<IAuthLoginSuccessPayload>> {
  try {
    const { email, password, navigate } = payload;
    const response: ApiResponse<IAuthLoginSuccessPayload> = yield call(loginService, { email, password });

    if (response.success && response.data !== undefined) {
      const loginResponse: IAuthLoginSuccessPayload = response.data;
      yield put(addUserLocallyAction(loginResponse.user));

      navigate('/');

      toast.success(response.message);

      // Perform type check using type assertion
      const loginSuccessPayload = response.data;
      yield put(authLoginSuccessAction(loginSuccessPayload));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
    yield put(authLoginFailureAction());
  }
}

export interface IAuthRegisterPayload extends IUserCreateRequestAttributes {
  navigate: NavigateFunction;
}

function* registerSaga({ payload }: { payload: IAuthRegisterPayload }): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  try {
    const { firstName, lastName, email, password, navigate } = payload;
    const response: ApiResponse<IUserAttributes> = yield call(registerService, { firstName, lastName, email, password });

    if (response.success) {
      navigate('/signin');

      toast.success(response.message);
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export function* watchLoginSaga(): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  yield takeLatest(authLoginAction, loginSaga);
}

export function* watchRegisterSaga(): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  yield takeLatest(authRegisterAction, registerSaga);
}
