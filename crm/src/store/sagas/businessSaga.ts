import { toast } from 'react-toastify';
import { takeLatest, put, select } from 'redux-saga/effects';
import { fetchBusinessesSuccessAction, fetchBusinessesFailureAction, fetchBusinessesAction } from '../actions/businessActions';
import { getBusinessesBySearchService } from '../../services/businessService';
import { getLocationsBySearchService } from '../../services/locationService';
import { setHomePageLoadingFailureAction, setHomePageLoadingSuccessAction } from '../actions/homePageActions';
import { IBusinessCreationRequestAttributes, IBusinessCreationResponseAttributes } from '../../types/business';
import { IBusinessState } from '../reducers/businessReducer';

export interface IBusinessesFetchPayload extends Omit<IBusinessCreationRequestAttributes, 'name' | 'sponsoredAd'> {
  name?: string; // converting name property from required to optional
  token: string;
  location?: string;
  phone?: string;
  sponsoredAd?: string;
  page: number;
  limit: number;
}

function* fetchBusinessesSaga({ payload }: { payload: IBusinessesFetchPayload }): any {
  try {
    const { name, businessDomain, address, location, phone, email, website, sponsoredAd, token, page, limit } = payload;
    const params = { name, businessDomain, address, phone, email, website, page, limit, include: ['BusinessPhone'] };
    const { businesses }: { businesses: IBusinessState } = yield select((state: { businesses: IBusinessState }) => state);
    const businessesDataBusinesses: { [key: string]: IBusinessCreationResponseAttributes } = businesses.data.businesses;

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

    if (response.success) {
      if (page === 1) {
        const { data }: IBusinessState = response as IBusinessState;
        yield put(fetchBusinessesSuccessAction({ data }));
        yield put(setHomePageLoadingSuccessAction());
      } else {
        const totalRecords = response.data.totalRecords;
        const totalPages = response.data.totalPages;
        const mergedBusinesses = { ...businessesDataBusinesses, ...response.data.businesses };
        const state: IBusinessState = {
          data: { businesses: mergedBusinesses, totalPages, totalRecords },
        };

        yield put(fetchBusinessesSuccessAction(state));
        yield put(setHomePageLoadingSuccessAction());
      }
    } else {
      toast.error(response.error);
      yield put(fetchBusinessesFailureAction(response.error));
      yield put(setHomePageLoadingFailureAction());
    }
  } catch (error) {
    // Display toast message for error
    toast.error(error.message);
    yield put(fetchBusinessesFailureAction(error.message));
  }
}

export function* watchBusinessSaga() {
  yield takeLatest(fetchBusinessesAction, fetchBusinessesSaga);
}
