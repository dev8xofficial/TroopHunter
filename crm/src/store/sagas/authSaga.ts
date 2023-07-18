import { takeLatest, put } from 'redux-saga/effects';
import { loginSuccess, loginFailure, registerSuccess, registerFailure } from '../actions/authActions';
import { toast } from 'react-toastify';
import axios from 'axios';

function* loginSaga({ payload }: any): any {
  try {
    const { email, password, navigate } = payload;
    const response = yield axios.post(`${process.env.BACKEND_URL}/auth/signin`, {
      email,
      password,
    });

    navigate('/');

    toast(response.data.data.message);
    yield put(loginSuccess(response.data.data));
  } catch (error) {
    toast(error.response.data.error);
    yield put(loginFailure(error.message));
  }
}

function* registerSaga({ payload }: any): any {
  try {
    const { firstName, lastName, email, password, navigate } = payload;
    const response = yield axios.post(`${process.env.BACKEND_URL}/auth/signup`, {
      firstName,
      lastName,
      email,
      password,
    });

    navigate('/signin');

    toast(response.data.data.message);
    yield put(registerSuccess(response.data.data.user));
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
