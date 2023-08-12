import { type NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { takeLatest, put, type ForkEffect } from 'redux-saga/effects';
import { type ILoginRequestAttributes, type IUserCreateRequestAttributes } from 'validator/interfaces';

import { loginService, registerService } from '../../services/authService';
import { authLoginSuccessAction, authLoginFailureAction, authLoginAction, authRegisterAction } from '../actions/authActions';
import { addUserLocallyAction } from '../actions/userActions';
import { type IAuthLoginSuccessPayload } from '../reducers/authReducer';

export interface IAuthLoginPayload extends ILoginRequestAttributes {
  navigate: NavigateFunction;
}

function* loginSaga({ payload }: { payload: IAuthLoginPayload }): any {
  try {
    const { email, password, navigate } = payload;
    const response = yield loginService({ email, password });

    if (response.success === true) {
      yield put(addUserLocallyAction(response.data.user));

      navigate('/');

      toast.success(response.message);

      // Perform type check using type assertion
      const loginSuccessPayload = response.data as IAuthLoginSuccessPayload;
      yield put(authLoginSuccessAction(loginSuccessPayload));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
    yield put(authLoginFailureAction());
  }
}

export interface IAuthRegisterPayload extends Omit<IUserCreateRequestAttributes, 'Leads'> {
  navigate: NavigateFunction;
}

function* registerSaga({ payload }: { payload: IAuthRegisterPayload }): any {
  try {
    const { firstName, lastName, email, password, navigate } = payload;
    const response = yield registerService({ firstName, lastName, email, password });

    if (response.success === true) {
      navigate('/signin');

      toast.success(response.message);
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export function* watchLoginSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(authLoginAction, loginSaga);
}

export function* watchRegisterSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(authRegisterAction, registerSaga);
}
