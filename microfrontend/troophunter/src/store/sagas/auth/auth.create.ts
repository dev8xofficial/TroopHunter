import { type ISendVerificationTokenAttributes, type ApiResponse, type IUserAttributes, type IUserCreateRequestAttributes } from '@repo/validator';
import { type NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { takeLatest, take, put, type StrictEffect } from 'redux-saga/effects';

import { logEvent } from '../../../utils/analytics';
import { removeEmptyStringValues } from '../../../utils/helpers';
import { ApiRequestAction, type IApiRequestAttributes } from '../../actions/apiActions';
import { authRegisterAction, authSendVerificationTokenAction } from '../../actions/authActions';

export interface IAuthRegisterPayload extends IUserCreateRequestAttributes {
  navigate: NavigateFunction;
}

function* registerSaga({ payload }: { payload: IAuthRegisterPayload }): Generator<StrictEffect, void, void> {
  try {
    const { firstName, lastName, email, password, navigate } = payload;

    const apiPayload = {
      url: '/auth/signup',
      method: 'POST',
      data: removeEmptyStringValues({ firstName, lastName, email, password }),
      payload: { navigate },
      onSuccess: 'auth/authRegisterSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
    yield take('auth/authRegisterSuccessAction');
    logEvent('User', 'Signup', 'User signed up successfully.');

    yield put(authSendVerificationTokenAction({ email }));
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export interface IAuthRegisterSuccessPayload {
  request: IApiRequestAttributes<IUserCreateRequestAttributes, undefined, undefined, { navigate: NavigateFunction }>;
  response: ApiResponse<IUserAttributes>;
}

export interface IAuthSendVerificationTokenPayload extends ISendVerificationTokenAttributes {}

function* sendVerificationTokenSaga({ payload }: { payload: IAuthSendVerificationTokenPayload }): Generator<StrictEffect, void, void> {
  try {
    const { email } = payload;

    const apiPayload = {
      url: '/auth/verify',
      method: 'POST',
      data: removeEmptyStringValues({ email }),
      onSuccess: 'auth/authSendVerificationTokenSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
    logEvent('User', 'Email Verification', 'Email sent for verification.');
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export interface IAuthSendVerificationTokenSuccessPayload {
  response: ApiResponse<null>;
}

// function* registerSuccessSaga({ payload }: { payload: IAuthRegisterSuccessPayload }): Generator<StrictEffect, void, void> {
//   try {
//     const { request, response } = payload;

//     if (response.success && request.payload !== undefined) {
//       request.payload.navigate(LOGIN_URL);

//       toast.success(response.message);
//     } else {
//       toast.error(response.error);
//     }
//   } catch (error) {
//     toast.error((error as Error).message);
//   }
// }

export function* watchRegisterSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(authRegisterAction, registerSaga);
}

// export function* watchRegisterSuccessSaga(): Generator<StrictEffect, void, void> {
//   yield takeLatest(authRegisterSuccessAction, registerSuccessSaga);
// }

export function* watchSendVerificationTokenSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(authSendVerificationTokenAction, sendVerificationTokenSaga);
}
