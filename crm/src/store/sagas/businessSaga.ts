import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest, put } from 'redux-saga/effects';
import { fetchBusinessesSuccess, fetchBusinessesFailure } from '../actions/businessActions';
import { getBusinessesBySearch } from '../../services/businessService';
import { getLocationsBySearch } from '../../services/locationService';

function* fetchBusinessesSaga({ payload }: any): any {
  try {
    const { businessDomain, address, location, phone, email, website, sponsoredAd, token } = payload;
    const params = {
      businessDomain,
      address,
      phone,
      email,
      website,
      includes: ['BusinessPhone'],
    };

    // Check if sponsoredAd is not an empty string or 'false', then include it in the params object
    if (sponsoredAd !== 'false') {
      params['sponsoredAd'] = sponsoredAd && sponsoredAd === 'true';
    }

    if (location) {
      const locationParams = {
        city: location.split(', ')[0],
        state: location.split(', ')[1],
        country: location.split(', ')[2],
      };
      const locationResponse = yield getLocationsBySearch(locationParams, token);
      params['locationId'] = locationResponse[0].id;
    }

    const response = yield getBusinessesBySearch(params, token);

    yield put(fetchBusinessesSuccess({ data: response }));
  } catch (error) {
    toast(error.message);
    yield put(fetchBusinessesFailure(error.message));
  }
}

export function* watchBusinessSaga() {
  yield takeLatest('business/fetchBusinesses', fetchBusinessesSaga);
}
