import { takeLatest, put } from 'redux-saga/effects';
import { fetchBusinessesSuccess, fetchBusinessesFailure } from '../actions/businessActions';
// import { getBusinesses } from '../../services/businessService';
import { toast } from 'react-toastify';
import axios from 'axios';

function* fetchBusinessesSaga({ payload }: any): any {
  try {
    const { name, token } = payload;
    const response = yield axios.get(`${process.env.BACKEND_URL}/businesses`, {
      params: {
        name,
        includes: ['BusinessPhone'],
      },
      headers: {
        Authorization: `Bearer ${token}`, // Attach the JWT token to the request
      },
    });

    yield put(fetchBusinessesSuccess({ data: response.data }));
  } catch (error) {
    toast(error.message);
    yield put(fetchBusinessesFailure(error.message));
  }
}

export function* watchBusinessSaga() {
  yield takeLatest('business/fetchBusinesses', fetchBusinessesSaga);
}
