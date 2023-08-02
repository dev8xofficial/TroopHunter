import { takeLatest, put } from 'redux-saga/effects';
import { authLoginSuccessAction, authLoginFailureAction, authLoginAction, authRegisterAction } from '../actions/authActions';
import { toast } from 'react-toastify';
import { loginService, registerService } from '../../services/authService';
import { addUserLocallyAction } from '../actions/userActions';
import { NavigateFunction } from 'react-router-dom';
import { IUserCreationRequestAttributes } from '../../types/user';
import { IAuthLoginSuccessPayload } from '../reducers/authReducer';

export interface IAuthLoginPayload {
  email: string;
  password: string;
  navigate: NavigateFunction;
}

function* loginSaga({ payload }: { payload: IAuthLoginPayload }): any {
  try {
    const { email, password, navigate } = payload;
    const response = yield loginService({ email, password });

    if (response.success) {
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
    toast.error(error.response.error);
    yield put(authLoginFailureAction(error.message));
  }
}

export interface IAuthRegisterPayload extends IUserCreationRequestAttributes {
  navigate: NavigateFunction;
}

function* registerSaga({ payload }: { payload: IAuthRegisterPayload }): any {
  try {
    const { firstName, lastName, email, password, navigate } = payload;
    const response = yield registerService({ firstName, lastName, email, password });

    if (response.success) {
      navigate('/signin');

      toast.success(response.message);
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error(error.response.error);
  }
}

export function* watchLoginSaga() {
  yield takeLatest(authLoginAction, loginSaga);
}

export function* watchRegisterSaga() {
  yield takeLatest(authRegisterAction, registerSaga);
}
