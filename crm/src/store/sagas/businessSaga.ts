import { takeLatest, put } from 'redux-saga/effects';
import { fetchBusinessesSuccess, fetchBusinessesFailure } from '../actions/businessActions';
// import { getBusinesses } from '../../services/businessService';
import { toast } from 'react-toastify';
import axios from 'axios';

function* fetchBusinessesSaga({ payload }: any): any {
  try {
    const { businessDomain, address, location, phone, email, website, sponsoredAd, token } = payload;
    const params = {
      businessDomain,
      address,
      location,
      phone,
      email,
      website,
      includes: ['BusinessPhone'],
    };

    // Check if sponsoredAd is not an empty string or 'false', then include it in the params object
    if (sponsoredAd !== 'false') {
      params['sponsoredAd'] = sponsoredAd === 'true';
    }

    const response = yield axios.get(`${process.env.BACKEND_URL}/businesses`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
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
