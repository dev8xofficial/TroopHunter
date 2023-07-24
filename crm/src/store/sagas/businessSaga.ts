import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest, put } from 'redux-saga/effects';
import { fetchBusinessesSuccessAction, fetchBusinessesFailureAction } from '../actions/businessActions';
import { getBusinessesBySearchService } from '../../services/businessService';
import { getLocationsBySearchService } from '../../services/locationService';
import { setLeadFilterLoadingFailureAction, setLeadFilterLoadingSuccessAction } from '../actions/leadPageActions';

function* fetchBusinessesSaga({ payload }: any): any {
  try {
    const { name, businessDomain, address, location, phone, email, website, sponsoredAd, token } = payload;
    const params = {
      name,
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
      const locationResponse = yield getLocationsBySearchService(locationParams, token);
      params['locationId'] = locationResponse[0].id;
    }

    const response = yield getBusinessesBySearchService(params, token);

    // Check if the response contains the 'success' property
    if (response.success) {
      yield put(fetchBusinessesSuccessAction({ data: response.data }));
      yield put(setLeadFilterLoadingSuccessAction());
    } else {
      toast.error(response.error);
      yield put(fetchBusinessesFailureAction(response.error));
      yield put(setLeadFilterLoadingFailureAction());
    }
  } catch (error) {
    // Display toast message for error
    toast.error(error.message);
    yield put(fetchBusinessesFailureAction(error.message));
  }
}

export function* watchBusinessSaga() {
  yield takeLatest('business/fetchBusinesses', fetchBusinessesSaga);
}
