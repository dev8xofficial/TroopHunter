import { takeLatest, put } from 'redux-saga/effects';
import { loginSuccessAction, loginFailureAction } from '../actions/authActions';
import { toast } from 'react-toastify';
import { loginService, registerService } from '../../services/authService';
import { addUserLocallyAction } from '../actions/userActions';

function* loginSaga({ payload }: any): any {
  try {
    const { email, password, navigate } = payload;
    const response = yield loginService({ email, password, include: '["Leads"]' });

    if (response.success) {
      yield put(addUserLocallyAction(response.data.user));

      navigate('/');

      toast.success(response.message);
      yield put(loginSuccessAction(response.data));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error(error.response.error);
    yield put(loginFailureAction(error.message));
  }
}

function* registerSaga({ payload }: any): any {
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
  yield takeLatest('auth/signin', loginSaga);
}

export function* watchRegisterSaga() {
  yield takeLatest('auth/signup', registerSaga);
}
