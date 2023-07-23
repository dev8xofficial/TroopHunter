import { takeLatest, put } from 'redux-saga/effects';
import { loginSuccess, loginFailure, registerSuccess, registerFailure } from '../actions/authActions';
import { toast } from 'react-toastify';
import { login, register } from '../../services/authService';
import { addUserLocally } from '../actions/userActions';

function* loginSaga({ payload }: any): any {
  try {
    const { email, password, navigate } = payload;
    const response = yield login({ email, password, include: '["Leads"]' });

    if (response.success) {
      yield put(addUserLocally(response.data.user));

      navigate('/');

      toast.success(response.message);
      yield put(loginSuccess(response.data));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error(error.response.error);
    yield put(loginFailure(error.message));
  }
}

function* registerSaga({ payload }: any): any {
  try {
    const { firstName, lastName, email, password, navigate } = payload;
    const response = yield register({ firstName, lastName, email, password });

    if (response.success) {
      navigate('/signin');

      toast.success(response.message);
      yield put(registerSuccess(response.data.user));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error(error.response.error);
    yield put(registerFailure(error.message));
  }
}

export function* watchLoginSaga() {
  yield takeLatest('auth/signin', loginSaga);
}

export function* watchRegisterSaga() {
  yield takeLatest('auth/signup', registerSaga);
}
