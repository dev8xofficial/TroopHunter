import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchBusinessesSuccess, fetchBusinessesFailure } from '../actions/businessActions';
// import { getBusinesses } from '../../services/businessService';

function* fetchBusinessesSaga() {
  try {
    const businesses = yield call(() => {});
    yield put(fetchBusinessesSuccess(businesses));
  } catch (error) {
    yield put(fetchBusinessesFailure(error.message));
  }
}

export function* watchBusinessSaga() {
  yield takeLatest('business/fetchBusinesses', fetchBusinessesSaga);
}
