import { takeLatest, put } from 'redux-saga/effects';
import { loginSuccess, loginFailure, registerSuccess, registerFailure } from '../actions/authActions';
import { toast } from 'react-toastify';
import { login, register } from '../../services/authService';
import { addUserLocally } from '../actions/userActions';

function* loginSaga({ payload }: any): any {
  try {
    const { email, password, navigate } = payload;
    const response = yield login({ email, password, include: '["Leads"]' });

    if (response && response.data && response.data.user) yield put(addUserLocally(response.data.user));

    navigate('/');

    toast(response.data.message);
    yield put(loginSuccess(response.data));
  } catch (error) {
    toast(error.response.data.error);
    yield put(loginFailure(error.message));
  }
}

function* registerSaga({ payload }: any): any {
  try {
    const { firstName, lastName, email, password, navigate } = payload;
    const response = yield register({ firstName, lastName, email, password });

    navigate('/signin');

    toast(response.data.message);
    yield put(registerSuccess(response.data.user));
  } catch (error) {
    toast(error.response.data.error);
    yield put(registerFailure(error.message));
  }
}

export function* watchLoginSaga() {
  yield takeLatest('auth/signin', loginSaga);
}

export function* watchRegisterSaga() {
  yield takeLatest('auth/signup', registerSaga);
}
