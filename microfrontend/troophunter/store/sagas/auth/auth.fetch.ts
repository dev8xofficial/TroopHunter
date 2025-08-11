import { type IUserFetchByIdRequestAttributes, type ApiResponse, type ILoginRequestAttributes, type IForgotPasswordAttributes, type IResetPasswordAttributes, type IResetPasswordVerificationAttributes, type IVerifyUserAttributes } from '@repo/validator';
import type { NextRouter } from 'next/router';
import { toast } from 'react-toastify';
import { takeLatest, put, type StrictEffect } from 'redux-saga/effects';

// import { LOGIN_URL } from '../../../routes/Urls';
import { logEvent } from '../../../utils/analytics';
import { removeEmptyStringValues } from '../../../utils/helpers';
import { ApiRequestAction, type IApiRequestAttributes } from '../../actions/apiActions';
import { saveAuthSuccessAction, saveAuthFailureAction, authLoginAction, authLoginSuccessAction, authSignOutAction, authSignOutSuccessAction, resetAuthAction, authForgotPasswordAction, authResetPasswordAction, authResetPasswordVerificationAction, authVerifyUserAction } from '../../actions/authActions';
import { resetBusinessAction } from '../../actions/businessActions';
import { resetHomePageAction } from '../../actions/homePageActions';
import { resetLeadsPageAction } from '../../actions/leadsPageActions';
import { addUserLocallyAction, resetUserAction } from '../../actions/userActions';
import { type ISaveAuthSuccessPayload } from '../../reducers/authReducer';

export interface IAuthLoginPayload extends ILoginRequestAttributes {
  navigate: NextRouter['push'];
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
    logEvent('User', 'Signin', 'User signed in successfully.');
  } catch (error) {
    toast.error((error as Error).message);
    yield put(saveAuthFailureAction());
  }
}

export interface IAuthLoginSuccessPayload {
  request: IApiRequestAttributes<ILoginRequestAttributes, undefined, undefined, { navigate: NextRouter['push'] }>;
  response: ApiResponse<ISaveAuthSuccessPayload>;
}

function* loginSuccessSaga({ payload }: { payload: IAuthLoginSuccessPayload }): Generator<StrictEffect, void, void> {
  try {
    const { request, response } = payload;

    if (response.success && response.data !== undefined && request.payload !== undefined) {
      const loginResponse: ISaveAuthSuccessPayload = response.data;
      yield put(addUserLocallyAction(loginResponse.user));

      toast.success(response.message);
      void request.payload.navigate('/lead');

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
  navigate: NextRouter['push'];
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
    logEvent('User', 'Signout', 'User signed out successfully.');
  } catch (error) {
    toast.error((error as Error).message);
    yield put(saveAuthFailureAction());
  }
}

export interface IAuthSignOutSuccessPayload {
  request: IApiRequestAttributes<IUserFetchByIdRequestAttributes, undefined, undefined, { navigate: NextRouter['push'] }>;
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
      // request.payload.navigate(LOGIN_URL);
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
    yield put(saveAuthFailureAction());
  }
}

export type IAuthForgotPasswordPayload = IForgotPasswordAttributes;

function* forgotPasswordSaga({ payload }: { payload: IAuthForgotPasswordPayload }): Generator<StrictEffect, void, void> {
  try {
    const { email } = payload;

    const apiPayload = {
      url: '/auth/forgot-password',
      method: 'POST',
      data: removeEmptyStringValues({ email }),
      onSuccess: 'auth/authForgotPasswordSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
    logEvent('User', 'Forgot Password', 'User applied to forgot password.');
  } catch (error) {
    toast.error((error as Error).message);
    yield put(saveAuthFailureAction());
  }
}

export interface IAuthForgotPasswordSuccessPayload {
  response: ApiResponse<null>;
}

export interface IAuthResetPasswordPayload extends IResetPasswordAttributes {
  navigate: NextRouter['push'];
}

function* resetPasswordSaga({ payload }: { payload: IAuthResetPasswordPayload }): Generator<StrictEffect, void, void> {
  try {
    const { id, token, password, newPassword, confirmPassword, navigate } = payload;

    const apiPayload = {
      url: '/auth/reset-password',
      method: 'POST',
      data: removeEmptyStringValues({ id, token, password, newPassword, confirmPassword }),
      payload: { navigate },
      onSuccess: 'auth/authResetPasswordSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
    logEvent('User', 'Reset Password', 'User received reset password email.');
  } catch (error) {
    toast.error((error as Error).message);
    yield put(saveAuthFailureAction());
  }
}

export interface IAuthResetPasswordSuccessPayload {
  request: IApiRequestAttributes<IResetPasswordAttributes, undefined, undefined, { navigate: NextRouter['push'] }>;
  response: ApiResponse<null>;
}

export type IAuthResetPasswordVerificationPayload = IResetPasswordVerificationAttributes;

function* resetPasswordVerificationSaga({ payload }: { payload: IAuthResetPasswordVerificationPayload }): Generator<StrictEffect, void, void> {
  try {
    const { id, token } = payload;

    const apiPayload = {
      url: `/auth/reset-password/${id}/${token}`,
      method: 'GET',
      payload: { isResetPasswordVerified: true },
      onSuccess: 'auth/authResetPasswordVerfiedSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
    logEvent('User', 'Reset Password', 'User reset password successfully.');
  } catch (error) {
    toast.error((error as Error).message);
    yield put(saveAuthFailureAction());
  }
}

export interface IAuthResetPasswordVerifiedSuccessPayload {
  request: IApiRequestAttributes<IResetPasswordAttributes, undefined, undefined, { isResetPasswordVerified: boolean }>;
  response: ApiResponse<null>;
}

export type IAuthVerifyUserPayload = IVerifyUserAttributes;

function* verifyUserSaga({ payload }: { payload: IAuthVerifyUserPayload }): Generator<StrictEffect, void, void> {
  try {
    const { id, token } = payload;

    const apiPayload = {
      url: `/auth/verify/${id}/${token}`,
      method: 'GET',
      payload: { isUserVerified: true },
      onSuccess: 'auth/authVerifyUserSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
    logEvent('User', 'User Verified', 'User verified successfully.');
  } catch (error) {
    toast.error((error as Error).message);
    yield put(saveAuthFailureAction());
  }
}

export interface IAuthVerifyUserSuccessPayload {
  request: IApiRequestAttributes<IVerifyUserAttributes, undefined, undefined, { isUserVerified: boolean }>;
  response: ApiResponse<null>;
}

export function* watchLoginSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(authLoginAction, loginSaga);
}

export function* watchLoginSuccessSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(authLoginSuccessAction, loginSuccessSaga);
}

export function* watchSignOutSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(authSignOutAction, signOutSaga);
}

export function* watchSignOutSuccessSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(authSignOutSuccessAction, signOutSuccessSaga);
}

export function* watchVerifyUserSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(authVerifyUserAction, verifyUserSaga);
}

export function* watchForgotPasswordSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(authForgotPasswordAction, forgotPasswordSaga);
}

export function* watchResetPasswordSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(authResetPasswordAction, resetPasswordSaga);
}

export function* watchResetPasswordVerificationSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(authResetPasswordVerificationAction, resetPasswordVerificationSaga);
}
